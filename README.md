# Parafin CLI

A command-line interface tool for interacting with the Parafin API. This CLI provides easy access to business information, capital products, bank accounts, and more.

## Features

- 🚀 Simple command-line interface
- 🎨 Colorized JSON/YAML output (automatic when outputting to terminal)
- 📊 Comprehensive business information retrieval
- 🏦 Bank account management
- 👥 Person and relationship tracking
- 💰 Capital product offers, applications, and loans
- 📝 Export API documentation

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd parafin-cli
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link the CLI globally (optional):
```bash
npm link
```

## Configuration

### Authentication

The CLI supports two authentication methods:

1. **API Key** (Bearer token)
2. **Client ID and Client Secret** (OAuth2)

### Setting Up Credentials

Create a `.secret` file in the project root or current working directory:

```bash
cp .secret.example .secret
```

Edit `.secret` and add your credentials:

```bash
# Option 1: Client ID and Client Secret (recommended)
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here

# Option 2: API Key (alternative)
# PARAFIN_API_KEY=your_api_key_here

# Optional: Set environment (defaults to sandbox)
PARAFIN_ENVIRONMENT=sandbox  # or 'production'
```

The CLI will automatically:
- Look for `.secret` in the current working directory
- Fall back to `.secret` in the project root
- Also check environment variables

## Usage

### Global Options

- `-f, --format <format>` - Output format (`json` or `yaml`, default: `json`)
  - Colors are automatically enabled when outputting to a terminal
  - Set `NO_COLOR=1` to disable colors

### Commands

#### Balance
Get current account balance.

```bash
parafin balance
parafin balance -f yaml
```

#### Business Commands

**List businesses:**
```bash
parafin business.list
parafin business.list -f yaml
```

**Get business by ID:**
```bash
parafin business.get <business_id>
```

**Get comprehensive business information:**
```bash
parafin business.all <business_parafin_id>
```

This command fetches:
- Capital product offers
- Capital product applications
- Capital products (loans)
- Associated persons
- Bank accounts

**Get bank accounts for a business:**
```bash
parafin business.bank <business_id>
```

**Get persons associated with a business:**
```bash
parafin business.persons <business_id>
```

#### Capital Commands

**List capital requests:**
```bash
parafin capital.list
```

**Get capital product offer by ID:**
```bash
parafin capital.offer <product_offer_id>
```

#### Utility Commands

**Export API documentation:**
```bash
parafin util.generate_doc_md
parafin util.generate_doc_md --output api_docs.md
```

## Examples

```bash
# Get account balance in JSON format
parafin balance

# Get account balance in YAML format
parafin -f yaml balance

# Get comprehensive business information
parafin business.all business_a8153512-942a-41be-992d-7fb8090ae953

# Get business information in YAML format
parafin -f yaml business.all business_a8153512-942a-41be-992d-7fb8090ae953

# Get capital product offer
parafin capital.offer capital_product_offer_id_2b52fcfa-3bfd-4531-87de-2e37e3e74a80

# List all businesses
parafin business.list

# Get bank accounts for a business
parafin business.bank business_96e66b80-39f4-45d7-b92e-6dadee24a389

# Get persons associated with a business
parafin business.persons business_a8153512-942a-41be-992d-7fb8090ae953

# Export API documentation
parafin util.generate_doc_md --output api_docs.md
```

## Output Format

### JSON (Default)
```bash
parafin business.list
```

### YAML
```bash
parafin -f yaml business.list
```

### Color Output

Colors are automatically enabled when outputting to a terminal:
- **Keys**: Blue
- **Strings**: Green
- **Numbers**: Yellow
- **Booleans**: Cyan
- **Null values**: Gray

Colors are automatically disabled when piping output to files or other commands.

To manually disable colors:
```bash
NO_COLOR=1 parafin business.list
```

## Development

### Build
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## Project Structure

```
parafin-cli/
├── bin/
│   └── parafin-standalone.js    # Main CLI entry point
├── src/
│   ├── api/
│   │   └── parafin.ts           # API client
│   ├── commands/                 # Command implementations
│   ├── config.ts                 # Configuration management
│   └── index.ts
├── dist/                         # Compiled JavaScript
├── .secret                      # Credentials (not in git)
├── .secret.example              # Example credentials file
├── product_requirements.md       # Command specifications
└── README.md                     # This file
```

## Requirements

- Node.js >= 18.0.0
- Valid Parafin API credentials (Client ID/Secret or API Key)

## License

MIT

## Support

For API documentation, visit: https://docs.parafin.com/api-reference
