import axios, { AxiosInstance, AxiosError } from 'axios';
import { getConfig } from '../config';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

class ParafinAPI {
  private client: AxiosInstance;
  private config: ReturnType<typeof getConfig>;
  private tokenCache: TokenCache | null = null;

  constructor() {
    this.config = getConfig();
    this.client = axios.create({
      baseURL: this.config.apiBase,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000,
    });

    // Add request interceptor to add authentication
    this.client.interceptors.request.use(
      async (requestConfig) => {
        if (this.config.apiKey) {
          // Use API Key if available
          requestConfig.headers.Authorization = `Bearer ${this.config.apiKey}`;
        } else if (this.config.clientId && this.config.clientSecret) {
          // Try Basic Auth first (common for Client ID/Secret)
          const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');
          requestConfig.headers.Authorization = `Basic ${credentials}`;
          
          // If Basic Auth doesn't work, we'll fall back to OAuth2 in the response interceptor
          // For now, try Basic Auth as it's simpler and more common
        }
        return requestConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const message = error.response.data || error.message;
          throw new Error(
            `API Error (${error.response.status}): ${JSON.stringify(message)}`
          );
        } else if (error.request) {
          throw new Error('No response received from API');
        } else {
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  /**
   * Get OAuth2 access token using client credentials flow
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.tokenCache && this.tokenCache.expiresAt > Date.now()) {
      return this.tokenCache.accessToken;
    }

    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error('Client ID and Client Secret are required for OAuth2 authentication');
    }

    try {
      // Request token from OAuth2 endpoint
      // Try common OAuth2 endpoint patterns
      const oauthEndpoints = [
        '/v1/oauth/token',
        '/oauth/token',
        '/auth/token',
        '/oauth2/token',
      ];

      let tokenResponse;
      let lastError;

      for (const endpoint of oauthEndpoints) {
        try {
          tokenResponse = await axios.post(
            `${this.config.apiBase}${endpoint}`,
            new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: this.config.clientId,
              client_secret: this.config.clientSecret,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          break; // Success, exit loop
        } catch (error: any) {
          lastError = error;
          // Continue to next endpoint if this one fails
          if (error.response?.status !== 404) {
            // If it's not a 404, it might be a different error (auth, etc), so throw it
            throw error;
          }
        }
      }

      if (!tokenResponse) {
        throw lastError || new Error('Failed to find valid OAuth2 token endpoint');
      }

      const { access_token, expires_in } = tokenResponse.data;

      if (!access_token) {
        throw new Error('Failed to obtain access token from OAuth2 endpoint');
      }

      // Cache the token (expires_in is typically in seconds)
      const expiresIn = expires_in || 3600; // Default to 1 hour if not provided
      this.tokenCache = {
        accessToken: access_token,
        expiresAt: Date.now() + (expiresIn * 1000) - 60000, // Subtract 1 minute for safety
      };

      return access_token;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Failed to obtain OAuth2 token: ${JSON.stringify(error.response.data)}`
        );
      }
      throw new Error(`Failed to obtain OAuth2 token: ${error.message}`);
    }
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<any> {
    const response = await this.client.get('/v1/balance');
    return response.data;
  }

  /**
   * Request capital
   */
  async requestCapital(params: {
    amount: number;
    currency?: string;
    [key: string]: any;
  }): Promise<any> {
    const response = await this.client.post('/v1/capital/requests', params);
    return response.data;
  }

  /**
   * Get capital requests
   */
  async getCapitalRequests(params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }): Promise<any> {
    const response = await this.client.get('/v1/capital/requests', { params });
    return response.data;
  }

  /**
   * Get capital product offer by ID
   */
  async getCapitalProductOffer(productOfferId: string): Promise<any> {
    // Endpoint: /v1/capital_product_offers/{id}
    const response = await this.client.get(`/v1/capital_product_offers/${productOfferId}`);
    return response.data;
  }

  /**
   * Get transactions
   */
  async getTransactions(params?: {
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/transactions', { params });
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<any> {
    const response = await this.client.get(`/v1/transactions/${transactionId}`);
    return response.data;
  }

  /**
   * Get spend card information
   */
  async getSpendInfo(): Promise<any> {
    const response = await this.client.get('/v1/spend');
    return response.data;
  }

  /**
   * Get pay-over-time offers
   */
  async getPayOverTimeOffers(params?: {
    amount?: number;
    currency?: string;
  }): Promise<any> {
    const response = await this.client.get('/v1/pay-over-time/offers', { params });
    return response.data;
  }

  /**
   * List businesses
   */
  async getBusinesses(params?: {
    limit?: number;
    offset?: number;
    [key: string]: any;
  }): Promise<any> {
    const response = await this.client.get('/v1/businesses', { params });
    return response.data;
  }

  /**
   * Get business by ID
   */
  async getBusiness(businessId: string): Promise<any> {
    const response = await this.client.get(`/v1/businesses/${businessId}`);
    return response.data;
  }

  /**
   * List capital product offers for a business
   */
  async getBusinessCapitalProductOffers(businessParafinId: string, params?: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/capital_product_offers', {
      params: {
        business_parafin_id: businessParafinId,
        ...params,
      },
    });
    return response.data;
  }

  /**
   * List capital product applications for a business
   */
  async getBusinessCapitalProductApplications(businessParafinId: string, params?: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/capital_product_applications', {
      params: {
        business_parafin_id: businessParafinId,
        ...params,
      },
    });
    return response.data;
  }

  /**
   * List capital products (loans) for a business
   */
  async getBusinessCapitalProducts(businessParafinId: string, params?: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/capital_products', {
      params: {
        business_parafin_id: businessParafinId,
        ...params,
      },
    });
    return response.data;
  }

  /**
   * Get person-business relationships for a business
   */
  async getPersonBusinessRelationships(businessId: string, params?: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/person_business_relationships', {
      params: {
        business_id: businessId,
        ...params,
      },
    });
    return response.data;
  }

  /**
   * Get person by ID
   */
  async getPerson(personId: string): Promise<any> {
    const response = await this.client.get(`/v1/persons/${personId}`);
    return response.data;
  }

  /**
   * Get bank accounts for a business
   */
  async getBusinessBankAccounts(businessId: string, params?: {
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await this.client.get('/v1/bank_accounts', {
      params: {
        business_id: businessId,
        ...params,
      },
    });
    return response.data;
  }

  /**
   * Generic GET request
   */
  async get(endpoint: string, params?: any): Promise<any> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post(endpoint: string, data?: any): Promise<any> {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put(endpoint: string, data?: any): Promise<any> {
    const response = await this.client.put(endpoint, data);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint: string): Promise<any> {
    const response = await this.client.delete(endpoint);
    return response.data;
  }
}

export const parafinAPI = new ParafinAPI();
