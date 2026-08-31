/// <reference types="node" />

export class EnvConfig {
  private static getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(
        `Environment variable '${key}' is not defined in .env file.`,
      );
    }
    return value;
  }

  // --- Environment Flags ---
  public static get currentEnv(): string {
    return this.getEnvVariable("ENV").toLowerCase();
  }

  public static get isUatEnvironment(): boolean {
    return this.currentEnv === "uat";
  }

  public static get isProdEnvironment(): boolean {
    return this.currentEnv === "prod";
  }

  public static get isJiraReportingEnabled(): boolean {
    return process.env.ENABLE_JIRA_TICKETING === "true";
  }

  // --- Credentials & Services ---
  /**
   * Retrieves proxy url value from environment variables.
   */
  public static getProxyUrl(): string {
    return this.getEnvVariable("PROXY_URL");
  }

  /**
   * Retrieves the Jira username value from environment variables.
   */
  public static getJiraUsername(): string {
    return this.getEnvVariable("JIRA_USERNAME");
  }

  /**
   * Retrieves the Jira API key from environment variables.
   */
  public static getJiraApiKey(): string {
    return this.getEnvVariable("JIRA_API_KEY");
  }

  /**
   * Retrieves the Jira project base url value from environment variables.
   */
  public static getJiraProjectBaseUrl(): string {
    return this.getEnvVariable("JIRA_PROJECT_BASE_URL");
  }

  /**
   * Retrieves the Gemini API key from environment variables.
   */
  public static getGeminiApiKey(): string {
    return this.getEnvVariable("GEMINI_API_KEY");
  }

  /**
   * Retrieves the portal's customer username value from environment variables.
   */
  public static getPortalCustomerUsername(): string {
    return this.getEnvVariable("PORTAL_CUSTOMER_USERNAME");
  }

  /**
   * Retrieves the portal's customer password value from environment variables.
   */
  public static getPortalCustomerPassword(): string {
    return this.getEnvVariable("PORTAL_CUSTOMER_PASSWORD");
  }
}
