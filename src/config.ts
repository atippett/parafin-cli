import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config();

// Load .secret file if it exists
// Try both current directory and project root (where bin file is located)
const currentDirSecret = path.join(process.cwd(), '.secret');
const projectRootSecret = path.join(__dirname, '..', '.secret');
const secretPath = fs.existsSync(currentDirSecret) ? currentDirSecret : 
                   (fs.existsSync(projectRootSecret) ? projectRootSecret : null);

if (secretPath) {
  dotenv.config({ path: secretPath });
}

export interface Config {
  apiBase: string;
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  environment: 'sandbox' | 'production';
}

export const getConfig = (): Config => {
  const apiKey = process.env.PARAFIN_API_KEY || '';
  const clientId = process.env.CLIENT_ID || '';
  const clientSecret = process.env.CLIENT_SECRET || '';
  const environment = (process.env.PARAFIN_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production';
  
  // Default to sandbox if not specified
  const apiBase = process.env.PARAFIN_API_BASE || 
    (environment === 'production' 
      ? 'https://api.parafin.com' 
      : 'https://api.sandbox.parafin.com');

  // Check if we have either API key or Client ID/Secret
  if (!apiKey && (!clientId || !clientSecret)) {
    throw new Error(
      'Authentication credentials are required. ' +
      'Please provide either:\n' +
      '  - PARAFIN_API_KEY in .env file or environment variable, OR\n' +
      '  - CLIENT_ID and CLIENT_SECRET in .secret file or environment variables.\n' +
      'You can copy .secret.example to .secret and fill in your credentials.'
    );
  }

  return {
    apiBase,
    apiKey: apiKey || undefined,
    clientId: clientId || undefined,
    clientSecret: clientSecret || undefined,
    environment,
  };
};
