export class ConfigurationData {
  public static isUatEnvironment(): boolean {
    return process.env.ENVIRONMENT === "uat";
  }

  /**
   * Retrieves proxy url value from environment variables.
   */
  public static getProxyUrl(): string {
    const proxyUrl = process.env.PROXY_URL;
    if (!proxyUrl) {
      throw new Error("PROXY_URL is not defined in .env file.");
    }
    return proxyUrl;
  }

  /**
   * Retrieves the Jira username value from environment variables.
   */
  public static getJiraUsername(): string {
    const jiraUsername = process.env.JIRA_USERNAME;
    if (!jiraUsername) {
      throw new Error("JIRA_USERNAME is not defined in .env file.");
    }
    return jiraUsername;
  }

  /**
   * Retrieves the Jira API key from environment variables.
   */
  public static getJiraApiKey(): string {
    const jiraApiKey = process.env.JIRA_API_KEY;
    if (!jiraApiKey) {
      throw new Error("JIRA_API_KEY is not defined in .env file.");
    }
    return jiraApiKey;
  }

  /**
   * Retrieves the Jira project base url value from environment variables.
   */
  public static getJiraProjectBaseUrl(): string {
    const jiraProjectBaseUrl = process.env.JIRA_PROJECT_BASE_URL;
    if (!jiraProjectBaseUrl) {
      throw new Error("JIRA_PROJECT_BASE_URL is not defined in .env file.");
    }
    return jiraProjectBaseUrl;
  }

  /**
   * Retrieves the Gemini API key from environment variables.
   */
  public static getGeminiApiKey(): string {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not defined in .env file.");
    }
    return geminiApiKey;
  }

  /**
   * Retrieves the Environment username value from environment variables.
   */
  public static getEnvHttpAuthUsername(): string {
    const envUsername = process.env.ENV_USERNAME;
    if (!envUsername) {
      throw new Error(
        "ENV_USERNAME is not defined in the environment configuration file.",
      );
    }
    return envUsername;
  }

  /**
   * Retrieves the Environment password value from environment variables.
   */
  public static getEnvHttpAuthPassword(): string {
    const envUsername = process.env.ENV_PASSWORD;
    if (!envUsername) {
      throw new Error(
        "ENV_PASSWORD is not defined in the environment configuration file.",
      );
    }
    return envUsername;
  }

  /**
   * Retrieves the portal's customer username value from environment variables.
   */
  public static getPortalCustomerUsername(): string {
    const envUsername = process.env.PORTAL_CUSTOMER_USERNAME;
    if (!envUsername) {
      throw new Error(
        "PORTAL_CUSTOMER_USERNAME is not defined in the environment configuration file.",
      );
    }
    return envUsername;
  }

  /**
   * Retrieves the portal's customer password value from environment variables.
   */
  public static getPortalCustomerPassword(): string {
    const envUsername = process.env.PORTAL_CUSTOMER_PASSWORD;
    if (!envUsername) {
      throw new Error(
        "PORTAL_CUSTOMER_PASSWORD is not defined in the environment configuration file.",
      );
    }
    return envUsername;
  }
}
