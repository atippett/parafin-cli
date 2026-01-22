#!/usr/bin/env node

const path = require('path');
const yaml = require('js-yaml');
const chalk = require('chalk');
const jsonColorizer = require('json-colorizer');

const rawArgs = process.argv.slice(2);

// Parse global format option (-f or --format) before processing other args
let outputFormat = 'yaml'; // default
const formatIndex = rawArgs.findIndex(arg => arg === '-f' || arg === '--format');
if (formatIndex !== -1 && rawArgs[formatIndex + 1]) {
  const formatValue = rawArgs[formatIndex + 1].toLowerCase();
  if (formatValue === 'yaml' || formatValue === 'json' || formatValue === 'table') {
    outputFormat = formatValue;
  }
}

// Remove format flag and value from args for command parsing
const args = rawArgs.filter((arg, index) => {
  if (arg === '-f' || arg === '--format') return false;
  if (formatIndex !== -1 && index === formatIndex + 1) return false;
  return true;
});

let command = args[0];
let id;

// Handle dot-separated commands (e.g., "capital.offer", "businesses.get")
// If command contains a dot, the ID is in args[1]
// If command doesn't contain a dot, check if args[1] is a subcommand
if (command && command.includes('.')) {
  // Command is already dot-separated (e.g., "capital.offer")
  id = args[1]; // ID is in args[1]
} else if (command && args[1] && !args[1].startsWith('--')) {
  // Command is space-separated (e.g., "capital offer")
  // Convert to dot format
  const compoundCommands = ['capital', 'business'];
  if (compoundCommands.includes(command)) {
    command = `${command}.${args[1]}`;
    id = args[2]; // ID is in args[2] for space-separated commands
  } else {
    id = args[1]; // For simple commands, args[1] might be the ID
  }
}

// Helper function to check if colors should be enabled
function shouldUseColors() {
  // Check NO_COLOR environment variable (standard way to disable colors)
  if (process.env.NO_COLOR) {
    return false;
  }
  // Check if output is a TTY (terminal)
  return process.stdout.isTTY;
}

// Helper function to colorize YAML
function colorizeYaml(yamlStr) {
  if (!shouldUseColors()) {
    return yamlStr;
  }
  
  return yamlStr
    // Color keys (text before colon)
    .replace(/^(\s*)([^\s:]+):/gm, (match, indent, key) => {
      return indent + chalk.blue(key) + ':';
    })
    // Color string values (quoted strings)
    .replace(/: ("[^"]*"|'[^']*')/g, (match, value) => {
      return ': ' + chalk.green(value);
    })
    // Color number values
    .replace(/: (\d+\.?\d*)/g, (match, value) => {
      return ': ' + chalk.yellow(value);
    })
    // Color boolean values
    .replace(/: (true|false)/g, (match, value) => {
      return ': ' + chalk.cyan(value);
    })
    // Color null values
    .replace(/: (null|~)/g, (match, value) => {
      return ': ' + chalk.gray(value);
    })
    // Color list markers
    .replace(/^(\s*)-/gm, (match, indent) => {
      return indent + chalk.gray('-');
    });
}

// Helper function to format value for table display
function formatTableValue(value, maxLength = 50) {
  if (value === null || value === undefined) {
    return shouldUseColors() ? chalk.gray('null') : 'null';
  }
  
  if (typeof value === 'object') {
    const str = JSON.stringify(value);
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    }
    return str;
  }
  
  const str = String(value);
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...';
  }
  return str;
}

// Helper function to create a table from data
function formatAsTable(data) {
  // Handle arrays of objects (most common API response format)
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return '(empty)';
    }
    
    // Check if it's an array of objects
    if (typeof data[0] === 'object' && data[0] !== null && !Array.isArray(data[0])) {
      // Get all unique keys from all objects
      const allKeys = new Set();
      data.forEach(item => {
        if (item && typeof item === 'object') {
          Object.keys(item).forEach(key => allKeys.add(key));
        }
      });
      
      const keys = Array.from(allKeys);
      if (keys.length === 0) {
        return '(no data)';
      }
      
      // Calculate column widths
      const colWidths = {};
      keys.forEach(key => {
        colWidths[key] = Math.max(key.length, 10);
        data.forEach(item => {
          const value = formatTableValue(item[key], 100);
          colWidths[key] = Math.max(colWidths[key], value.length);
        });
        // Cap at terminal width if available
        if (process.stdout.columns) {
          colWidths[key] = Math.min(colWidths[key], Math.floor(process.stdout.columns / keys.length) - 3);
        }
      });
      
      // Build table
      let table = '';
      const useColors = shouldUseColors();
      
      // Header row
      const headerRow = keys.map(key => {
        const header = key.padEnd(colWidths[key]);
        return useColors ? chalk.bold.blue(header) : header;
      }).join(' | ');
      table += headerRow + '\n';
      
      // Separator
      const separator = keys.map(key => '-'.repeat(colWidths[key])).join('-+-');
      table += separator + '\n';
      
      // Data rows
      data.forEach((item, idx) => {
        const row = keys.map(key => {
          const value = formatTableValue(item[key], colWidths[key]);
          return value.padEnd(colWidths[key]);
        }).join(' | ');
        table += row + '\n';
      });
      
      return table;
    } else {
      // Array of primitives
      return data.map(item => String(item)).join('\n');
    }
  }
  
  // Handle objects with results array (common API pagination format)
  if (data && typeof data === 'object' && data.results && Array.isArray(data.results)) {
    const metadata = Object.keys(data).filter(k => k !== 'results');
    let output = '';
    const useColors = shouldUseColors();
    
    if (metadata.length > 0) {
      output += 'Metadata:\n';
      metadata.forEach(key => {
        const value = formatTableValue(data[key]);
        if (useColors) {
          output += `  ${chalk.blue(key)}: ${value}\n`;
        } else {
          output += `  ${key}: ${value}\n`;
        }
      });
      output += '\n';
    }
    
    output += formatAsTable(data.results);
    return output;
  }
  
  // Handle single object
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return '(empty object)';
    }
    
    // Calculate max key width
    const maxKeyWidth = Math.max(...keys.map(k => k.length));
    const useColors = shouldUseColors();
    
    let output = '';
    keys.forEach(key => {
      const value = formatTableValue(data[key], 80);
      const keyStr = key.padEnd(maxKeyWidth);
      if (useColors) {
        output += `${chalk.blue(keyStr)} : ${value}\n`;
      } else {
        output += `${keyStr} : ${value}\n`;
      }
    });
    
    return output;
  }
  
  // Fallback for primitives
  return String(data);
}

// Helper function to format output
function formatOutput(data) {
  if (outputFormat === 'table') {
    return formatAsTable(data);
  }
  
  if (outputFormat === 'yaml') {
    const yamlStr = yaml.dump(data, { indent: 2, lineWidth: -1 });
    return colorizeYaml(yamlStr);
  }
  
  // JSON format
  const jsonStr = JSON.stringify(data, null, 2);
  if (shouldUseColors()) {
    return jsonColorizer.colorize(jsonStr, {
      colors: {
        StringKey: chalk.blue,
        StringLiteral: chalk.green,
        NumberLiteral: chalk.yellow,
        BooleanLiteral: chalk.cyan,
        NullLiteral: chalk.gray,
        Brace: chalk.white,
        Bracket: chalk.white,
        Colon: chalk.white,
        Comma: chalk.white,
      }
    });
  }
  return jsonStr;
}

async function main() {
  // Show help without loading API
  if (!command || command === '--help' || command === '-h' || command === 'help') {
    console.log(`
Parafin CLI - Command Line Interface for Parafin API

Usage: parafin [options] <command> [arguments]

    Global Options:
      -f, --format <format>    Output format (json|yaml|table, default: yaml)
                               Colors are automatically enabled when outputting to a terminal.
                               Set NO_COLOR=1 to disable colors.

Commands:
  business.all <id>                Get business info (offers, applications, loans, persons, bank accounts)
  business.bank <id>               Get bank accounts for a business
  business.get <id>                Get business by ID
  business.list                     List businesses
  business.persons <id>            List all people associated with a business
  capital.list                      List capital requests
  capital.offer <id>               Get capital product offer by ID
  util.generate_doc_md              Export Parafin API documentation to README.md
                                     Options: --output <file>, --limit <number>

Examples:
  parafin capital.offer capital_product_offer_id_2b52fcfa-3bfd-4531-87de-2e37e3e74a80
  parafin business.list
  parafin business.all business_a8153512-942a-41be-992d-7fb8090ae953
        `);
    return;
  }

  // Only load API when actually running a command
  const { parafinAPI } = require('../dist/api/parafin');

  try {
    switch (command) {
      case 'capital.offer':
        if (!id) {
          console.error('Error: capital product offer ID is required');
          console.error('Usage: parafin capital.offer <id>');
          process.exit(1);
        }
        const offer = await parafinAPI.getCapitalProductOffer(id);
        console.log(formatOutput(offer));
        break;

      case 'capital.list':
        const requests = await parafinAPI.getCapitalRequests();
        console.log(formatOutput(requests));
        break;

      case 'business.list':
        const businesses = await parafinAPI.getBusinesses();
        console.log(formatOutput(businesses));
        break;

      case 'business.get':
        if (!id) {
          console.error('Error: business ID is required');
          console.error('Usage: parafin business.get <id>');
          process.exit(1);
        }
        const business = await parafinAPI.getBusiness(id);
        console.log(formatOutput(business));
        break;

      case 'business.all':
        // Handle business.all command
        // The ID is in args[1] (since args[0] is "business.all")
        const businessParafinId = args[1];
        if (!businessParafinId) {
          console.error('Error: business_parafin_id is required');
          console.error('Usage: parafin business.all <business_parafin_id>');
          process.exit(1);
        }
        
        console.log(`\n📊 Fetching information for business: ${businessParafinId}\n`);
        console.log('Fetching business offers, applications, loans, persons, and bank accounts...');
        
        // Fetch relationships first
        const businessRelationships = await parafinAPI.getPersonBusinessRelationships(businessParafinId, { limit: 100 });
        const relationshipsList = businessRelationships.results || businessRelationships.data || businessRelationships || [];
        
        // Fetch all data in parallel
        const [businessOffers, businessApplications, businessLoans, bankAccounts, personsData] = await Promise.all([
          parafinAPI.getBusinessCapitalProductOffers(businessParafinId, { limit: 100 }),
          parafinAPI.getBusinessCapitalProductApplications(businessParafinId, { limit: 100 }),
          parafinAPI.getBusinessCapitalProducts(businessParafinId, { limit: 100 }),
          parafinAPI.getBusinessBankAccounts(businessParafinId, { limit: 100 }),
          // Fetch person details for each relationship
          Promise.all(
            relationshipsList.map(async (relationship) => {
              const personId = relationship.person_id || relationship.person_parafin_id;
              if (!personId) {
                return {
                  relationship: relationship,
                  person: null,
                  error: 'No person_id found in relationship'
                };
              }
              
              try {
                const person = await parafinAPI.getPerson(personId);
                return {
                  relationship: relationship,
                  person: person
                };
              } catch (error) {
                return {
                  relationship: relationship,
                  person: null,
                  error: error.message
                };
              }
            })
          )
        ]);

        const bankAccountsList = bankAccounts.results || bankAccounts.data || bankAccounts || [];
        
        const output = {
          business_parafin_id: businessParafinId,
          offers: businessOffers.results || businessOffers.data || businessOffers || [],
          applications: businessApplications.results || businessApplications.data || businessApplications || [],
          loans: businessLoans.results || businessLoans.data || businessLoans || [],
          persons: personsData || [],
          bank_accounts: bankAccountsList,
          summary: {
            total_offers: Array.isArray(businessOffers.results || businessOffers.data || businessOffers) ? (businessOffers.results || businessOffers.data || businessOffers).length : 0,
            total_applications: Array.isArray(businessApplications.results || businessApplications.data || businessApplications) ? (businessApplications.results || businessApplications.data || businessApplications).length : 0,
            total_loans: Array.isArray(businessLoans.results || businessLoans.data || businessLoans) ? (businessLoans.results || businessLoans.data || businessLoans).length : 0,
            total_persons: personsData ? personsData.length : 0,
            total_bank_accounts: Array.isArray(bankAccountsList) ? bankAccountsList.length : 0,
          },
        };

        console.log('\n📈 Summary:');
        console.log(`   Offers: ${output.summary.total_offers}`);
        console.log(`   Applications: ${output.summary.total_applications}`);
        console.log(`   Loans: ${output.summary.total_loans}`);
        console.log(`   Persons: ${output.summary.total_persons}`);
        console.log(`   Bank Accounts: ${output.summary.total_bank_accounts}\n`);

        console.log(formatOutput(output));
        break;

      case 'business.bank':
        const businessIdForBank = id;
        if (!businessIdForBank) {
          console.error('Error: business_id is required');
          console.error('Usage: parafin business.bank <business_id>');
          process.exit(1);
        }
        
        console.log(`\n🏦 Fetching bank accounts for business: ${businessIdForBank}\n`);
        const bankAccountsData = await parafinAPI.getBusinessBankAccounts(businessIdForBank, { limit: 100 });
        console.log(formatOutput(bankAccountsData));
        break;

      case 'business.persons':
        const businessIdForPersons = id;
        if (!businessIdForPersons) {
          console.error('Error: business_id is required');
          console.error('Usage: parafin business.persons <business_id>');
          process.exit(1);
        }
        
        console.log(`\n👥 Fetching persons for business: ${businessIdForPersons}\n`);
        console.log('Fetching person-business relationships...');
        
        // Get all relationships for this business
        const personsRelationships = await parafinAPI.getPersonBusinessRelationships(businessIdForPersons, { limit: 100 });
        const personsRelationshipsList = personsRelationships.results || personsRelationships.data || personsRelationships || [];
        
        console.log(`Found ${personsRelationshipsList.length} relationship(s). Fetching person details...`);
        
        // Get person details for each relationship
        const personsWithRelationships = await Promise.all(
          personsRelationshipsList.map(async (relationship) => {
            const personId = relationship.person_id || relationship.person_parafin_id;
            if (!personId) {
              return {
                relationship: relationship,
                person: null,
                error: 'No person_id found in relationship'
              };
            }
            
            try {
              const person = await parafinAPI.getPerson(personId);
              return {
                relationship: relationship,
                person: person
              };
            } catch (error) {
              return {
                relationship: relationship,
                person: null,
                error: error.message
              };
            }
          })
        );
        
        const personsOutput = {
          business_id: businessIdForPersons,
          total_relationships: personsRelationshipsList.length,
          persons: personsWithRelationships
        };
        
        console.log(`\n📊 Summary:`);
        console.log(`   Total relationships: ${personsOutput.total_relationships}\n`);
        
        console.log(formatOutput(personsOutput));
        break;

      case 'util.generate_doc_md':
        // Handle util.generate_doc_md command directly (doesn't need API or oclif)
        const puppeteer = require('puppeteer');
        const fs = require('fs');
        const path = require('path');
        
        const docsUrl = 'https://docs.parafin.com/api-reference';
        const password = 'parafindocs2021';
        const outputFile = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || 
                          (args.includes('--output') ? args[args.indexOf('--output') + 1] : null) ||
                          'README.md';
        
        // Parse limit option (default: no limit, or use --limit to set a specific limit)
        let maxPagesLimit = null;
        const limitArg = args.find(arg => arg.startsWith('--limit='));
        if (limitArg) {
          maxPagesLimit = parseInt(limitArg.split('=')[1], 10);
        } else if (args.includes('--limit') && args[args.indexOf('--limit') + 1]) {
          maxPagesLimit = parseInt(args[args.indexOf('--limit') + 1], 10);
        }

        console.log('Starting documentation export...');
        console.log(`Connecting to ${docsUrl}...`);

        let browser;
        try {
          console.log('Launching browser...');
          const launchOptions = {
            headless: 'new',
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--disable-gpu',
            ],
          };
          
          // Try to use system Chrome if available (on macOS)
          const { execSync } = require('child_process');
          try {
            const chromePath = execSync('which google-chrome-stable || which google-chrome || which chromium || which chromium-browser || echo ""', { encoding: 'utf-8' }).trim();
            if (!chromePath) {
              // Try macOS default Chrome location
              const macChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
              const fs = require('fs');
              if (fs.existsSync(macChromePath)) {
                launchOptions.executablePath = macChromePath;
                console.log('Using system Chrome installation');
              }
            } else if (chromePath) {
              launchOptions.executablePath = chromePath;
              console.log('Using system Chrome installation');
            }
          } catch (e) {
            // Ignore errors finding system Chrome, use bundled Chromium
            console.log('Using bundled Chromium');
          }
          
          browser = await puppeteer.launch(launchOptions);
          console.log('Browser launched successfully');

          const page = await browser.newPage();
          // Set longer timeout for slow connections
          page.setDefaultNavigationTimeout(60000);
          page.setDefaultTimeout(60000);
          
          // Set user agent to avoid blocking
          await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
          
          // Retry initial page load
          let loaded = false;
          let retries = 3;
          while (retries > 0 && !loaded) {
            try {
              console.log(`Attempting to load page (attempt ${4 - retries}/3)...`);
              await page.goto(docsUrl, { 
                waitUntil: 'domcontentloaded', 
                timeout: 60000 
              });
              loaded = true;
              console.log('Page loaded successfully');
            } catch (error) {
              retries--;
              console.error(`Page load error: ${error.message}`);
              if (retries > 0) {
                console.log(`Retrying in 3 seconds... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 3000));
              } else {
                throw new Error(`Failed to connect to ${docsUrl} after 3 attempts: ${error.message}`);
              }
            }
          }

          // Wait for page to load
          await page.waitForSelector('body', { timeout: 10000 });
          
          const passwordInput = await page.$('input[type="password"]');
          if (passwordInput) {
            console.log('Password protection detected. Entering password...');
            
            // Wait for input to be ready
            await passwordInput.waitForSelector('input[type="password"]', { visible: true }).catch(() => {});
            await page.waitForTimeout(500);
            
            // Clear any existing value and type password
            await passwordInput.click({ clickCount: 3 }); // Select all
            await passwordInput.type(password, { delay: 100 });
            await page.waitForTimeout(1500);
            
            // Verify password was typed
            const inputValue = await passwordInput.evaluate(el => el.value);
            if (inputValue !== password) {
              console.log('⚠️  Password not entered correctly, trying again...');
              await passwordInput.click({ clickCount: 3 });
              await passwordInput.type(password, { delay: 100 });
              await page.waitForTimeout(1000);
            }
            
            // Try multiple strategies to submit
            let submitted = false;
            
            // Strategy 1: Find submit button by type
            let submitButton = await page.$('button[type="submit"], input[type="submit"]');
            if (submitButton) {
              await submitButton.click();
              submitted = true;
            } else {
              // Strategy 2: Find button by text content
              const buttonByText = await page.evaluateHandle(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                return buttons.find(btn => {
                  const text = (btn.textContent || btn.innerText || '').toLowerCase().trim();
                  return text.includes('access') || text === 'access' || text.includes('submit') || text.includes('login');
                }) || null;
              });
              
              if (buttonByText && buttonByText.asElement()) {
                await buttonByText.asElement().click();
                submitted = true;
              }
            }
            
            // Strategy 3: Submit the form directly
            if (!submitted) {
              const form = await passwordInput.evaluateHandle(el => el.closest('form'));
              if (form && form.asElement()) {
                await form.asElement().evaluate(form => form.submit());
                submitted = true;
              }
            }
            
            // Strategy 4: Press Enter if form submit didn't work
            if (!submitted) {
              await passwordInput.focus();
              await page.keyboard.press('Enter');
            }
            
            // Wait for navigation with multiple strategies
            console.log('Waiting for page to load after password entry...');
            try {
              // Wait for navigation
              await Promise.race([
                page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 15000 }),
                page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }),
                page.waitForFunction(() => !document.querySelector('input[type="password"]'), { timeout: 15000 })
              ]);
            } catch (e) {
              console.log('Navigation timeout, checking if password was accepted...');
            }
            
            // Verify password was accepted
            await page.waitForTimeout(3000);
            const stillHasPassword = await page.$('input[type="password"]');
            if (stillHasPassword) {
              console.log('⚠️  Password form still present. Checking for error message...');
              const pageInfo = await page.evaluate(() => {
                const error = document.querySelector('.error, [class*="error"], [class*="invalid"], [class*="alert"]');
                const form = document.querySelector('form');
                const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
                  text: b.textContent?.trim(),
                  type: b.type,
                  visible: b.offsetParent !== null
                }));
                return {
                  error: error ? error.textContent : null,
                  hasForm: !!form,
                  formAction: form ? form.action : null,
                  buttons: buttons,
                  pageTitle: document.title,
                  url: window.location.href
                };
              });
              
              console.log('Page info:', JSON.stringify(pageInfo, null, 2));
              
              if (pageInfo.error) {
                console.log(`❌ Error message: ${pageInfo.error}`);
              }
              
              // Try one more time - maybe the page needs a different approach
              console.log('Retrying password submission...');
              const newPasswordInput = await page.$('input[type="password"]');
              if (newPasswordInput) {
                await newPasswordInput.click({ clickCount: 3 });
                await newPasswordInput.type(password, { delay: 50 });
                await page.waitForTimeout(500);
                
                // Try clicking the Access button more explicitly
                const accessButton = await page.evaluateHandle(() => {
                  const buttons = Array.from(document.querySelectorAll('button'));
                  return buttons.find(btn => {
                    const text = (btn.textContent || '').trim().toLowerCase();
                    return text === 'access' || text.includes('access');
                  }) || null;
                });
                
                if (accessButton && accessButton.asElement()) {
                  await accessButton.asElement().click();
                  await page.waitForTimeout(5000);
                } else {
                  await page.keyboard.press('Enter');
                  await page.waitForTimeout(5000);
                }
              }
            } else {
              console.log('✅ Password accepted, page loaded');
            }
          } else {
            await page.waitForTimeout(1000);
          }

          console.log('Extracting documentation content...');
          
          let markdown = '# Parafin API Documentation\n\n';
          markdown += `*Exported from ${docsUrl}*\n\n`;
          markdown += `*Generated on: ${new Date().toISOString()}*\n\n`;
          markdown += '---\n\n';

          // Wait for page to be fully loaded and navigation to appear
          await page.waitForSelector('body', { timeout: 10000 });
          
          // Wait for network to be idle (all resources loaded) - Puppeteer way
          try {
            await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
          } catch (e) {
            // Navigation might already be complete, continue
          }
          
          await page.waitForTimeout(5000); // Give more time for navigation to load

          // Try to wait for navigation elements or any links
          try {
            await page.waitForSelector('a[href], nav, aside, [role="navigation"]', { timeout: 10000 });
          } catch (e) {
            console.log('Navigation elements may not be visible, continuing anyway...');
          }
          
          // Scroll page to trigger lazy loading
          await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
          });
          await page.waitForTimeout(2000);
          await page.evaluate(() => {
            window.scrollTo(0, 0);
          });
          await page.waitForTimeout(2000); // Additional wait for dynamic content

          // Extract all navigation links - try multiple strategies
          console.log('Discovering documentation pages from navigation menu...');
          const allLinks = await page.evaluate(() => {
            const links = [];
            const seenUrls = new Set();
            
            // Strategy 1: Find all links on the page that match the pattern
            const allPageLinks = document.querySelectorAll('a[href]');
            allPageLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href) {
                try {
                  let fullUrl;
                  if (href.startsWith('http')) {
                    fullUrl = href;
                  } else if (href.startsWith('/')) {
                    fullUrl = window.location.origin + href;
                  } else {
                    fullUrl = new URL(href, window.location.href).href;
                  }
                  
                  // Check if it's an API reference link
                  if (fullUrl.includes('docs.parafin.com') && 
                      (fullUrl.includes('/api-reference') || fullUrl.includes('/api-reference/'))) {
                    // Skip hash links and duplicates
                    if (!fullUrl.includes('#') && !seenUrls.has(fullUrl)) {
                      seenUrls.add(fullUrl);
                      const text = link.textContent?.trim() || link.innerText?.trim() || '';
                      // Filter out empty or very short text (likely icons/spacers)
                      if (text.length > 0 && text.length < 200) {
                        links.push({ url: fullUrl, text: text });
                      }
                    }
                  }
                } catch (e) {
                  // Skip invalid URLs
                }
              }
            });
            
            // Strategy 2: Try specific navigation selectors
            const navSelectors = [
              'nav a[href]',
              'aside a[href]',
              '[role="navigation"] a[href]',
              '[data-sidebar] a[href]',
              '.sidebar a[href]',
              '[class*="sidebar"] a[href]',
              '[class*="nav"] a[href]',
              '[class*="menu"] a[href]'
            ];
            
            navSelectors.forEach(selector => {
              try {
                const navLinks = document.querySelectorAll(selector);
                navLinks.forEach((link) => {
                  const href = link.getAttribute('href');
                  if (href) {
                    try {
                      let fullUrl;
                      if (href.startsWith('http')) {
                        fullUrl = href;
                      } else if (href.startsWith('/')) {
                        fullUrl = window.location.origin + href;
                      } else {
                        fullUrl = new URL(href, window.location.href).href;
                      }
                      
                      if (fullUrl.includes('docs.parafin.com') && 
                          (fullUrl.includes('/api-reference') || fullUrl.includes('/api-reference/'))) {
                        if (!fullUrl.includes('#') && !seenUrls.has(fullUrl)) {
                          seenUrls.add(fullUrl);
                          const text = link.textContent?.trim() || link.innerText?.trim() || '';
                          if (text.length > 0 && text.length < 200) {
                            links.push({ url: fullUrl, text: text });
                          }
                        }
                      }
                    } catch (e) {
                      // Skip invalid URLs
                    }
                  }
                });
              } catch (e) {
                // Selector might not exist, continue
              }
            });
            
            return links;
          });
          
          console.log(`Found ${allLinks.length} potential links, filtering...`);

          // Remove duplicates and filter to docs.parafin.com
          const uniqueLinks = [];
          const seenUrls = new Set();
          for (const link of allLinks) {
            if (link.url.includes('docs.parafin.com') && !seenUrls.has(link.url)) {
              seenUrls.add(link.url);
              uniqueLinks.push(link);
            }
          }

          console.log(`Found ${uniqueLinks.length} documentation pages to export`);

          // If no links found, try to extract current page content
          if (uniqueLinks.length === 0) {
            console.log('No navigation links found. Attempting to extract current page content...');
            
            // Try to extract from current page
            const currentPageContent = await page.evaluate(() => {
              // Remove unwanted elements
              const unwantedSelectors = [
                'nav', 'header', 'footer', 'script', 'style',
                '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
                '.skip-link', '.sr-only', '[aria-hidden="true"]'
              ];
              unwantedSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => el.remove());
              });

              const mainContent = document.querySelector('main, article, [role="main"], .content, [data-content]') || document.body;
              const title = document.querySelector('h1')?.textContent?.trim() || 
                           document.title?.replace(' - Parafin Docs', '').trim() || 'API Reference';
              
              return { title, content: mainContent.textContent || '' };
            });
            
            if (currentPageContent.content.trim()) {
              markdown += `## ${currentPageContent.title}\n\n`;
              markdown += `${currentPageContent.content.substring(0, 5000)}\n\n`;
              markdown += '---\n\n';
            }
            
            // Also try to find links by scrolling or interacting
            console.log('Trying to discover links by examining page structure...');
            await page.waitForTimeout(2000);
            
            // Try clicking on navigation toggle if it exists
            try {
              const navToggle = await page.$('button[aria-label*="menu"], button[aria-label*="navigation"], [class*="menu-toggle"], [class*="nav-toggle"]');
              if (navToggle) {
                await navToggle.click();
                await page.waitForTimeout(1000);
                // Re-extract links after opening menu
                const newLinks = await page.evaluate(() => {
                  const links = [];
                  const seenUrls = new Set();
                  const allPageLinks = document.querySelectorAll('a[href]');
                  allPageLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href) {
                      try {
                        let fullUrl;
                        if (href.startsWith('http')) {
                          fullUrl = href;
                        } else if (href.startsWith('/')) {
                          fullUrl = window.location.origin + href;
                        } else {
                          fullUrl = new URL(href, window.location.href).href;
                        }
                        
                        if (fullUrl.includes('docs.parafin.com') && 
                            (fullUrl.includes('/api-reference') || fullUrl.includes('/api-reference/'))) {
                          if (!fullUrl.includes('#') && !seenUrls.has(fullUrl)) {
                            seenUrls.add(fullUrl);
                            const text = link.textContent?.trim() || link.innerText?.trim() || '';
                            if (text.length > 0 && text.length < 200) {
                              links.push({ url: fullUrl, text: text });
                            }
                          }
                        }
                      } catch (e) {}
                    }
                  });
                  return links;
                });
                
                if (newLinks.length > 0) {
                  console.log(`Found ${newLinks.length} links after opening navigation menu`);
                  uniqueLinks.push(...newLinks);
                }
              }
            } catch (e) {
              console.log('Could not find navigation toggle');
            }
          }

          // Visit each link and extract content
          const maxPages = maxPagesLimit !== null 
            ? Math.min(uniqueLinks.length, maxPagesLimit)
            : uniqueLinks.length;
          
          if (maxPages > 0) {
            if (maxPagesLimit !== null) {
              console.log(`Will export ${maxPages} pages (limited to ${maxPagesLimit} to prevent timeout)`);
            } else {
              console.log(`Will export all ${maxPages} pages`);
            }
          } else {
            console.log('No pages found to export. The documentation structure may have changed.');
          }
          
          let pageCount = 0;
          for (let i = 0; i < maxPages; i++) {
            const link = uniqueLinks[i];
            try {
              pageCount++;
              console.log(`[${pageCount}/${maxPages}] Extracting: ${link.text || link.url}`);
              
              // Retry logic for network issues
              let retries = 3;
              let success = false;
              while (retries > 0 && !success) {
                try {
                  await page.goto(link.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
                  success = true;
                } catch (error) {
                  retries--;
                  if (retries > 0) {
                    console.log(`  ⚠️  Retrying... (${retries} attempts left)`);
                    await page.waitForTimeout(2000);
                  } else {
                    throw error;
                  }
                }
              }
              
              await page.waitForTimeout(1000);

              // Check if password is needed again
              const passwordInputAgain = await page.$('input[type="password"]');
              if (passwordInputAgain) {
                await passwordInputAgain.type(password, { delay: 50 });
                await page.waitForTimeout(500);
                const submitButton = await page.$('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                  await submitButton.click();
                  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
                } else {
                  await page.keyboard.press('Enter');
                  await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
                }
                await page.waitForTimeout(1000);
              }
              
              // Wait for content to load
              await page.waitForSelector('body', { timeout: 5000 }).catch(() => {});
              await page.waitForTimeout(1000);

              const pageContent = await page.evaluate(() => {
                // Remove unwanted elements
                const unwantedSelectors = [
                  'nav', 'header', 'footer', 'script', 'style',
                  '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
                  '.skip-link', '.sr-only', '[aria-hidden="true"]'
                ];
                unwantedSelectors.forEach(selector => {
                  document.querySelectorAll(selector).forEach(el => el.remove());
                });

                // Find the main content area
                const mainContent = document.querySelector('main, article, [role="main"], .content, [data-content]') || document.body;
                
                // Extract title
                const title = document.querySelector('h1')?.textContent?.trim() || 
                             document.querySelector('h2')?.textContent?.trim() ||
                             document.title?.replace(' - Parafin Docs', '').trim() || 'Untitled';

                // Extract HTTP method and endpoint
                let method = '';
                let endpoint = '';
                
                // Find method from various possible selectors
                const methodSelectors = [
                  '[data-method]',
                  '.method',
                  'code',
                  'pre',
                  '[class*="method"]',
                  '[class*="http"]'
                ];
                
                for (const selector of methodSelectors) {
                  const elements = mainContent.querySelectorAll(selector);
                  for (const el of elements) {
                    const text = el.textContent || '';
                    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
                    for (const m of methods) {
                      if (text.includes(m) && text.length < 100) {
                        method = m;
                        break;
                      }
                    }
                    if (method) break;
                  }
                  if (method) break;
                }
                
                // Try to find endpoint path
                const endpointSelectors = ['code', 'pre', '[data-endpoint]', '.endpoint', '[class*="endpoint"]', '[class*="path"]'];
                for (const selector of endpointSelectors) {
                  const elements = mainContent.querySelectorAll(selector);
                  for (const el of elements) {
                    const text = el.textContent.trim();
                    // Look for API paths
                    if (text.includes('/v1/') || text.includes('/api/')) {
                      // Extract just the path part
                      const match = text.match(/(\/v1\/[^\s"'`]+|\/api\/[^\s"'`]+)/);
                      if (match) {
                        endpoint = match[0];
                        break;
                      }
                    }
                  }
                  if (endpoint) break;
                }

                // Extract description (usually first paragraph after title, before code blocks)
                let description = '';
                const descSelectors = [
                  'p:not(pre p)',
                  '[data-description]',
                  '.description',
                  '[class*="description"]',
                  'div:not(pre):not(code):not([class*="code"])'
                ];
                
                // Get all paragraphs and find the first meaningful one
                const paragraphs = mainContent.querySelectorAll('p');
                for (const p of paragraphs) {
                  let text = p.textContent.trim();
                  // Skip if it's inside a code block or too short
                  if (p.closest('pre, code') || text.length < 30) continue;
                  
                  // Skip UI text
                  if (text.includes('Skip to main content') ||
                      text.includes('Parafin Docs home page') ||
                      text.includes('Navigation') ||
                      text.includes('CopyAsk AI') ||
                      text.includes('Was this page helpful')) {
                    continue;
                  }
                  
                  // Clean up
                  text = text.replace(/\s+/g, ' ').trim();
                  if (text.length > 30 && text.length < 500) {
                    description = text;
                    break;
                  }
                }

                // Extract code examples (curl commands, JSON responses)
                const codeBlocks = [];
                const codeElements = mainContent.querySelectorAll('pre code, pre, [data-code], .code-block, .curl-example, .response-example, [class*="code"]');
                const seenCode = new Set();
                
                codeElements.forEach(el => {
                  let codeText = el.textContent.trim();
                  
                  // Skip if too short or contains UI text
                  if (codeText.length < 20) return;
                  if (codeText.includes('Skip to main content') ||
                      codeText.includes('Parafin Docs home page') ||
                      codeText.includes('Navigation') ||
                      codeText.includes('CopyAsk AI') ||
                      codeText.includes('Was this page helpful')) {
                    return;
                  }
                  
                  // Clean up common prefixes/suffixes
                  codeText = codeText.replace(/^cURLCopyAsk AI/gi, '');
                  codeText = codeText.replace(/^CopyAsk AI/gi, '');
                  codeText = codeText.replace(/defaultCopyAsk AI/gi, '');
                  
                  // Normalize whitespace in code blocks
                  codeText = codeText.replace(/\n{3,}/g, '\n\n');
                  
                  // Avoid duplicates
                  const codeHash = codeText.substring(0, 100);
                  if (!seenCode.has(codeHash) && codeText.length > 20) {
                    seenCode.add(codeHash);
                    codeBlocks.push(codeText);
                  }
                });

                // Extract parameters/request body info
                let parameters = '';
                const paramsSection = mainContent.querySelector('[data-parameters], .parameters, .request-body, .request-parameters');
                if (paramsSection) {
                  parameters = paramsSection.textContent.trim();
                }

                // Extract response info
                let response = '';
                const responseSection = mainContent.querySelector('[data-response], .response, .response-body');
                if (responseSection) {
                  response = responseSection.textContent.trim();
                }

                // Clean up the main content text
                let cleanContent = mainContent.textContent || '';
                
                // Remove common UI/navigation text patterns
                const uiPatterns = [
                  /Skip to main content/gi,
                  /Parafin Docs home page/gi,
                  /Search\.\.\./gi,
                  /⌘K/gi,
                  /Ask AI/gi,
                  /Navigation/gi,
                  /Copy/gi,
                  /Try it/gi,
                  /Was this page helpful\?/gi,
                  /YesNo/gi,
                  /Next/gi,
                  /⌘I/gi,
                  /Assistant/gi,
                  /Responses are generated using AI and may contain mistakes\./gi,
                  /OverviewProductsAPIsAboutBlog/gi,
                  /Authorizations/gi,
                  /Authorization/gi,
                  /stringheaderrequired/gi,
                  /Bodyapplication\/json/gi,
                  /Response\d+application\/json/gi,
                  /defaultCopy/gi
                ];
                
                uiPatterns.forEach(pattern => {
                  cleanContent = cleanContent.replace(pattern, '');
                });

                // Remove excessive whitespace
                cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

                return {
                  title,
                  method,
                  endpoint,
                  description,
                  codeBlocks: [...new Set(codeBlocks)], // Remove duplicates
                  parameters,
                  response,
                  cleanContent
                };
              });

              if (pageContent.title && pageContent.title !== 'Untitled') {
                // Format the markdown nicely
                markdown += `## ${pageContent.title}\n\n`;
                
                if (pageContent.method && pageContent.endpoint) {
                  markdown += `**${pageContent.method}** \`${pageContent.endpoint}\`\n\n`;
                } else if (pageContent.endpoint) {
                  markdown += `\`${pageContent.endpoint}\`\n\n`;
                }
                
                if (pageContent.description) {
                  markdown += `${pageContent.description}\n\n`;
                }
                
                // Add code examples
                if (pageContent.codeBlocks.length > 0) {
                  pageContent.codeBlocks.forEach((code, idx) => {
                    // Determine code language
                    let lang = '';
                    if (code.includes('curl') || code.includes('--request')) {
                      lang = 'bash';
                    } else if (code.includes('{') && code.includes('}')) {
                      lang = 'json';
                    } else if (code.includes('http')) {
                      lang = 'http';
                    }
                    
                    markdown += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
                  });
                }
                
                // Add parameters section if available
                if (pageContent.parameters && pageContent.parameters.length > 50) {
                  markdown += `### Parameters\n\n${pageContent.parameters}\n\n`;
                }
                
                // Add response section if available
                if (pageContent.response && pageContent.response.length > 50) {
                  markdown += `### Response\n\n${pageContent.response}\n\n`;
                }
                
                // Add source link
                markdown += `*Source: ${link.url}*\n\n`;
                markdown += '---\n\n';
              }

            } catch (error) {
              console.log(`  ⚠️  Skipping ${link.url}: ${error.message}`);
              // Continue with next page
            }
          }

          const outputPath = path.join(process.cwd(), outputFile);
          fs.writeFileSync(outputPath, markdown, 'utf-8');

          console.log(`\n✅ Documentation exported successfully to ${outputPath}`);
          console.log(`📄 File size: ${(markdown.length / 1024).toFixed(2)} KB`);
          if (uniqueLinks.length > 0) {
            console.log(`📑 Pages exported: ${pageCount} of ${uniqueLinks.length} total pages`);
            if (maxPagesLimit !== null && uniqueLinks.length > maxPages) {
              console.log(`ℹ️  Note: Limited to ${maxPages} pages. Use --limit <number> to set a different limit, or omit --limit to export all pages.`);
            }
          } else {
            console.log(`📑 Pages exported: ${pageCount > 0 ? pageCount : 1} (current page only)`);
            console.log(`ℹ️  Note: Could not find navigation links. Only current page was exported.`);
          }
        } catch (error) {
          console.error(`Failed to export documentation: ${error.message}`);
          process.exit(1);
        } finally {
          if (browser) {
            await browser.close();
          }
        }
        break;

      default:
        console.error(`Unknown command: ${command}`);
        console.error('Run "parafin --help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// docexport is now handled in the main switch statement

main();
