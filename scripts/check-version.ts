import { readFileSync } from "node:fs";

const packageJsonPath = "./package.json";

/**
 * Resolve the expected version:
 * - If an argument is provided (e.g. from CI: `bun run check-version.ts v1.13.0`), use it.
 * - Otherwise, fall back to the version declared in package.json so the script
 *   can be run locally without arguments to verify all files are in sync.
 */
function resolveExpectedVersion(arg: string | undefined): string {
  if (arg) {
    return arg.startsWith("v") ? arg.substring(1) : arg;
  }
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  console.log(
    `ℹ️  No version argument supplied – using version from ${packageJsonPath}: ${pkg.version}`,
  );
  return pkg.version as string;
}

function checkVersion(expectedVersion: string) {
  const readmeMdPath = "./README.md";
  const readmeZhMdPath = "./README_ZH.md";
  const configSchemaPath = "./src/schema/configuration.ts";

  const readmeMdContent = readFileSync(readmeMdPath, "utf8");
  const readmeZhMdContent = readFileSync(readmeZhMdPath, "utf8");
  const packageJsonContent = readFileSync(packageJsonPath, "utf8");
  const configSchemaContent = readFileSync(configSchemaPath, "utf8");

  const filesToCheck = [
    { name: readmeMdPath, content: readmeMdContent },
    { name: readmeZhMdPath, content: readmeZhMdContent },
    { name: configSchemaPath, content: configSchemaContent },
  ];

  let allVersionsMatch = true;

  // Check package.json version
  console.log(`👀 Checking versions in ${packageJsonPath}...`);
  const packageJson = JSON.parse(packageJsonContent);
  if (packageJson.version !== expectedVersion) {
    console.error(
      `❌ Mismatch in ${packageJsonPath}: Expected ${expectedVersion}, found ${packageJson.version}`,
    );
    allVersionsMatch = false;
  }

  const versionPatterns = [
    /Version-v(\d+\.\d+\.\d+(?:--[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)(?=-[0-9A-Za-z]+(?:\?|$))/g, // Markdown badge (shields URL: prerelease '-' escaped as '--', followed by color)
    /Sing-box v(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?|\d+\.\d+\.x)/g, // Adapted Version / title / description
    /@black-duty\/sing-box-schema@(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)/g, // Unpkg JSON Schema link
    /sing-box-schema\/refs\/tags\/v(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)/g, // GitHub raw JSON Schema link
    /sing-box-schema\/releases\/download\/v(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)/g, // GitHub Release JSON Schema link
    /version: "(\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)"/g, // Zod Schema Meta version field
  ];

  const normalizeBadgeVersion = (version: string) =>
    version.replaceAll("--", "-");

  for (const file of filesToCheck) {
    console.log(`👀 Checking versions in ${file.name}...`);
    for (const pattern of versionPatterns) {
      const matches = file.content.matchAll(pattern);
      for (const match of matches) {
        const foundVersion = match[1];
        if (!foundVersion) {
          console.error(
            `⚠️ No version found in ${file.name} for pattern ${pattern}`,
          );
          allVersionsMatch = false;
          continue;
        }
        const normalizedFoundVersion = pattern.source.startsWith("Version-v(")
          ? normalizeBadgeVersion(foundVersion)
          : foundVersion;
        // For 'Sing-box vX.Y.x', we only check the X.Y major.minor part
        if (
          pattern.source.includes("Sing-box v") &&
          normalizedFoundVersion.endsWith(".x")
        ) {
          const expectedMajorMinor = expectedVersion
            .split(".")
            .slice(0, 2)
            .join(".");
          const foundMajorMinor = normalizedFoundVersion
            .split(".")
            .slice(0, 2)
            .join(".");
          if (expectedMajorMinor !== foundMajorMinor) {
            console.error(
              `❌ Mismatch in ${file.name}: Expected major.minor ${expectedMajorMinor}, found ${foundMajorMinor} (from ${normalizedFoundVersion})`,
            );
            allVersionsMatch = false;
          }
        } else if (normalizedFoundVersion !== expectedVersion) {
          console.error(
            `❌ Mismatch in ${file.name}: Expected ${expectedVersion}, found ${normalizedFoundVersion}`,
          );
          allVersionsMatch = false;
        }
      }
    }
  }

  if (allVersionsMatch) {
    console.log(`✅ All version numbers match ${expectedVersion}.`);
  } else {
    console.error(
      "❌ Version check failed. Please update the version numbers in the files.",
    );
    process.exit(1);
  }
}

const args = process.argv.slice(2);
checkVersion(resolveExpectedVersion(args[0]));
