/**
 * Enhanced authentication service with refresh token support
 * Provides longer session duration and automatic token refresh
 */

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface StoredTokenData {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  scope: string;
}

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "auth_access_token";
  private static readonly REFRESH_TOKEN_KEY = "auth_refresh_token";
  private static readonly EXPIRES_AT_KEY = "auth_expires_at";
  private static readonly SCOPE_KEY = "auth_scope";

  /**
   * Store authentication tokens
   */
  static storeTokens(tokenData: TokenData): void {
    const expiresAt = Date.now() + tokenData.expires_in * 1000;

    try {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenData.access_token);
      localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt.toString());
      localStorage.setItem(this.SCOPE_KEY, tokenData.scope);

      if (tokenData.refresh_token) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokenData.refresh_token);
      }
    } catch (error) {
      console.error("Failed to store tokens:", error);
    }
  }

  /**
   * Get stored token data
   */
  static getStoredTokens(): StoredTokenData | null {
    try {
      const accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
      const scope = localStorage.getItem(this.SCOPE_KEY);

      if (!accessToken || !expiresAt) {
        return null;
      }

      return {
        accessToken,
        refreshToken: refreshToken || undefined,
        expiresAt: Number(expiresAt),
        scope: scope || "",
      };
    } catch (error) {
      console.error("Failed to retrieve tokens:", error);
      return null;
    }
  }

  /**
   * Check if access token is valid (not expired)
   */
  static isAccessTokenValid(): boolean {
    const tokens = this.getStoredTokens();
    if (!tokens) return false;

    return Date.now() < tokens.expiresAt;
  }

  /**
   * Check if access token will expire soon (within 5 minutes)
   */
  static shouldRefreshToken(): boolean {
    const tokens = this.getStoredTokens();
    if (!tokens) return false;

    const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
    return tokens.expiresAt < fiveMinutesFromNow;
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(): Promise<TokenData | null> {
    const tokens = this.getStoredTokens();

    if (!tokens?.refreshToken) {
      console.warn("No refresh token available");
      return null;
    }

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.REACT_APP_CLIENT_ID!,
          refresh_token: tokens.refreshToken,
          grant_type: "refresh_token",
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`);
      }

      const newTokenData: TokenData = await response.json();

      // Store the new access token (refresh token stays the same)
      this.storeTokens({
        ...newTokenData,
        refresh_token: tokens.refreshToken, // Keep the existing refresh token
      });

      return newTokenData;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      this.clearAllTokens();
      return null;
    }
  }

  /**
   * Get current valid access token (refreshing if necessary)
   */
  static async getValidAccessToken(): Promise<string | null> {
    // Check if current token is still valid
    if (this.isAccessTokenValid() && !this.shouldRefreshToken()) {
      const tokens = this.getStoredTokens();
      return tokens?.accessToken || null;
    }

    // Try to refresh if we should
    if (this.shouldRefreshToken()) {
      const newTokenData = await this.refreshAccessToken();
      return newTokenData?.access_token || null;
    }

    return null;
  }

  /**
   * Clear all stored tokens
   */
  static clearAllTokens(): void {
    try {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.EXPIRES_AT_KEY);
      localStorage.removeItem(this.SCOPE_KEY);
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  }

  /**
   * Get formatted authorization header
   */
  static async getAuthHeader(): Promise<string | null> {
    const token = await this.getValidAccessToken();
    return token ? `Bearer ${token}` : null;
  }
}
