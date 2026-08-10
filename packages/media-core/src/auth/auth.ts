export interface AuthConfig {
  apiKey: string;
}

export class AuthManager {
  private readonly apiKey: string;

  constructor(config: AuthConfig) {
    if (!config.apiKey?.trim()) {
      throw new Error("Pexels API key is required.");
    }

    this.apiKey = config.apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}