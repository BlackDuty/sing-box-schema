import { readFileSync } from "fs";

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

  const readmeMdContent = readFileSync(readmeMdPath, "utf8");
  const readmeZhMdContent = readFileSync(readmeZhMdPath, "utf8");

  const filesToCheck = [
    { name: readmeMdPath, content: readmeMdContent },
    { name: readmeZhMdPath, content: readmeZhMdContent },
  ];

  let allVersionsMatch = true;

  const versionPatterns = [
    /Version-v(\d+\.\d+\.\d+)/g, // Markdown badge
    /Sing-box v(\d+\.\d+\.\d+|\d+\.\d+\.x)/g, // Adapted Version
    /@black-duty\/sing-box-schema@(\d+\.\d+\.\d+)/g, // Unpkg JSON Schema link
    /sing-box-schema\/refs\/tags\/v(\d+\.\d+\.\d+)/g, // GitHub raw JSON Schema link
    /sing-box-schema\/releases\/download\/v(\d+\.\d+\.\d+)/g, // GitHub Release JSON Schema link
  ];

  for (const file of filesToCheck) {
    console.log(`👀 Checking versions in ${file.name}...`);
    for (const pattern of versionPatterns) {
      let match;
      while ((match = pattern.exec(file.content)) !== null) {
        const foundVersion = match[1];
        if (!foundVersion) {
          console.error(`⚠️ No version found in ${file.name}`);
          allVersionsMatch = false;
        }
        // For 'Sing-box vX.Y.x', we only check X.Y part
        else if (
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
              `❌ Mismatch in ${file.name}: Expected major.minor ${expectedMajorMinor}, found ${foundMajorMinor} (from ${foundVersion})`
            );
            allVersionsMatch = false;
          }
        } else if (foundVersion !== expectedVersion) {
          console.error(
            `❌ Mismatch in ${file.name}: Expected ${expectedVersion}, found ${foundVersion}`
          );
          allVersionsMatch = false;
        }
      }
    }
  }

  if (allVersionsMatch) {
    console.log(`✅ All version numbers match ${expectedVersion}.`);
  } else {
    console.error("❌ Version check failed. Please update the README files.");
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
