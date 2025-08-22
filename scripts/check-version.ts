import { readFileSync } from "node:fs";

function checkVersion(expectedVersion: string | undefined) {
  if (!expectedVersion) {
    console.error("Usage: bun run check-version.ts <expected-version>");
    process.exit(1);
  }
  // Strip 'v' prefix if present
  if (expectedVersion.startsWith("v")) {
    expectedVersion = expectedVersion.substring(1);
  }

  const readmeMdPath = "./README.md";
  const readmeZhMdPath = "./README_ZH.md";
  const packageJsonPath = "./package.json";
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
    /Version-v(\d+\.\d+\.\d+)/g, // Markdown badge
    /Sing-box v(\d+\.\d+\.\d+|\d+\.\d+\.x)/g, // Adapted Version
    /@black-duty\/sing-box-schema@(\d+\.\d+\.\d+)/g, // Unpkg JSON Schema link
    /sing-box-schema\/refs\/tags\/v(\d+\.\d+\.\d+)/g, // GitHub raw JSON Schema link
    /sing-box-schema\/releases\/download\/v(\d+\.\d+\.\d+)/g, // GitHub Release JSON Schema link
    /version: "(\d+\.\d+\.\d+)"/g, // Zod Schema Meta
  ];

  for (const file of filesToCheck) {
    console.log(`👀 Checking versions in ${file.name}...`);
    for (const pattern of versionPatterns) {
      const matches = file.content.matchAll(pattern);
      for (const match of matches) {
        const foundVersion = match[1];
        if (!foundVersion) {
          console.error(`⚠️ No version found in ${file.name} for pattern ${pattern}`);
          allVersionsMatch = false;
          continue;
        }
        // For 'Sing-box vX.Y.x', we only check X.Y part
        if (
          pattern.source.includes("Sing-box v") &&
          foundVersion.endsWith(".x")
        ) {
          const expectedMajorMinor = expectedVersion
            .split(".")
            .slice(0, 2)
            .join(".");
          const foundMajorMinor = foundVersion.split(".").slice(0, 2).join(".");
          if (expectedMajorMinor !== foundMajorMinor) {
            console.error(
              `❌ Mismatch in ${file.name}: Expected major.minor ${expectedMajorMinor}, found ${foundMajorMinor} (from ${foundVersion})`,
            );
            allVersionsMatch = false;
          }
        } else if (foundVersion !== expectedVersion) {
          console.error(
            `❌ Mismatch in ${file.name}: Expected ${expectedVersion}, found ${foundVersion}`,
          );
          allVersionsMatch = false;
        }
      }
    }
  }

  if (allVersionsMatch) {
    console.log(`✅ All version numbers match ${expectedVersion}.`);
  } else {
    console.error("❌ Version check failed. Please update the version numbers in the files.");
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("🔨 Usage: bun run check-version.ts <expected-version>");
  process.exit(1);
}

const expectedVersion = args[0];
checkVersion(expectedVersion);
