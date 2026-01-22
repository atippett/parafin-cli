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
  if (formatValue === 'yaml' || formatValue === 'json') {
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

// Helper function to format output
function formatOutput(data) {
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
  -f, --format <format>    Output format (json|yaml, default: yaml)
                           Colors are automatically enabled when outputting to a terminal.
                           Set NO_COLOR=1 to disable colors.

Commands:
  balance                          Get account balance
  business.all <id>                Get business info (offers, applications, loans, persons, bank accounts)
  business.bank <id>               Get bank accounts for a business
  business.get <id>                Get business by ID
  business.list                     List businesses
  business.persons <id>            List all people associated with a business
  capital.list                      List capital requests
  capital.offer <id>               Get capital product offer by ID
  util.generate_doc_md              Export Parafin API documentation to README.md

Examples:
  parafin balance
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
      case 'balance':
        const balance = await parafinAPI.getBalance();
        console.log(formatOutput(balance));
        break;

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
            await passwordInput.type(password, { delay: 50 });
            await page.waitForTimeout(500);
            
            // Try to find and click submit button
            let submitButton = await page.$('button[type="submit"], input[type="submit"]');
            if (!submitButton) {
              // Try to find button with "Access" or "Submit" text
              submitButton = await page.evaluateHandle(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                return buttons.find(btn => {
                  const text = btn.textContent?.toLowerCase() || '';
                  return text.includes('access') || text.includes('submit') || text.includes('login');
                }) || null;
              });
            }
            if (submitButton) {
              await submitButton.click();
              await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
            } else {
              // Try pressing Enter
              await page.keyboard.press('Enter');
              await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
            }
            await page.waitForTimeout(2000);
          } else {
            await page.waitForTimeout(1000);
          }

          console.log('Extracting documentation content...');
          
          let markdown = '# Parafin API Documentation\n\n';
          markdown += `*Exported from ${docsUrl}*\n\n`;
          markdown += `*Generated on: ${new Date().toISOString()}*\n\n`;
          markdown += '---\n\n';

          // Wait for page to be fully loaded
          await page.waitForSelector('body', { timeout: 10000 });
          await page.waitForTimeout(1000);

          // Extract all navigation links
          console.log('Discovering documentation pages from navigation menu...');
          const allLinks = await page.evaluate(() => {
            const links = [];
            // Find all links in navigation menus and sidebar
            const selectors = [
              'nav a[href]',
              'aside a[href]',
              '[role="navigation"] a[href]',
              '[data-sidebar] a[href]',
              '.sidebar a[href]',
              'a[href*="/api-reference"]',
              'a[href*="/docs"]'
            ];
            
            selectors.forEach(selector => {
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
                        fullUrl.includes('/api-reference')) {
                      const text = link.textContent?.trim() || link.innerText?.trim() || '';
                      if (!links.find(l => l.url === fullUrl)) {
                        links.push({ url: fullUrl, text: text });
                      }
                    }
                  } catch (e) {
                    // Skip invalid URLs
                  }
                }
              });
            });
            return links;
          });

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

          // Extract content from main page first
          const mainContent = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script, style, nav, header, footer');
            scripts.forEach((el) => el.remove());
            const main = document.querySelector('main, article, [role="main"], .content') || document.body;
            const title = document.querySelector('h1')?.textContent?.trim() || 'Home';
            return { title, content: main.textContent || '' };
          });

          markdown += `## ${mainContent.title}\n\n`;
          markdown += `${mainContent.content}\n\n`;
          markdown += '---\n\n';

          // Visit each link and extract content (limit to first 50 pages to avoid timeout)
          const maxPages = Math.min(uniqueLinks.length, 50);
          console.log(`Will export ${maxPages} pages (limited to prevent timeout)`);
          
          let pageCount = 1;
          for (let i = 0; i < maxPages; i++) {
            const link = uniqueLinks[i];
            try {
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
                const scripts = document.querySelectorAll('script, style, nav, header, footer');
                scripts.forEach((el) => el.remove());
                const main = document.querySelector('main, article, [role="main"], .content') || document.body;
                const title = document.querySelector('h1')?.textContent?.trim() || 
                             document.querySelector('h2')?.textContent?.trim() ||
                             document.title || 'Untitled';
                return { title, content: main.textContent || '' };
              });

              if (pageContent.content.trim()) {
                markdown += `## ${pageContent.title}\n\n`;
                markdown += `*Source: ${link.url}*\n\n`;
                markdown += `${pageContent.content}\n\n`;
                markdown += '---\n\n';
              }

              pageCount++;
            } catch (error) {
              console.log(`  ⚠️  Skipping ${link.url}: ${error.message}`);
              // Continue with next page
            }
          }

          const outputPath = path.join(process.cwd(), outputFile);
          fs.writeFileSync(outputPath, markdown, 'utf-8');

          console.log(`\n✅ Documentation exported successfully to ${outputPath}`);
          console.log(`📄 File size: ${(markdown.length / 1024).toFixed(2)} KB`);
          console.log(`📑 Pages exported: ${pageCount} of ${uniqueLinks.length} total pages`);
          if (uniqueLinks.length > maxPages) {
            console.log(`ℹ️  Note: Limited to ${maxPages} pages. Run again to export more pages.`);
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
