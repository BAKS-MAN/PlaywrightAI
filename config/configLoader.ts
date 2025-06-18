import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

export function loadEnvironmentConfig() {
  const environment = process.env.ENVIRONMENT || "prod";
  console.log(`Loading configuration for environment: ${environment}`);

  const baseEnvPath = path.resolve(process.cwd(), ".env");
  const envFilePath = path.resolve(
    process.cwd(),
    "resources",
    `${environment}.env`,
  );

  if (!fs.existsSync(envFilePath)) {
    throw new Error(
      `Configuration file not found for environment '${environment}'. \n
      Expected at path: ${envFilePath}`,
    );
  }

  dotenv.config({ path: baseEnvPath });

  /** Load the environment-specific file, with 'override' set to true.
     This ensures that variables in uat.env or prod.env will overwrite those in .env */
  dotenv.config({ path: envFilePath, override: true });
}
