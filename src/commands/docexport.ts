import { Command, Flags } from '@oclif/core';
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

export default class DocExport extends Command {
  static description = 'Export Parafin API documentation to README.md';

  static examples = [
    '$ parafin docexport',
    '$ parafin docexport --output docs.md',
  ];

  static flags = {
    output: Flags.string({
      char: 'o',
      description: 'Output file path',
      default: 'README.md',
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(DocExport);
    const docsUrl = 'https://docs.parafin.com';
    const password = 'parafindocs2021';
    const outputFile = flags.output || 'README.md';

    this.log('Starting documentation export...');
    this.log(`Connecting to ${docsUrl}...`);

    let browser;
    try {
      // Launch browser
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      
      // Navigate to docs
      await page.goto(docsUrl, { waitUntil: 'networkidle2' });

      // Check if password prompt appears
      const passwordInput = await page.$('input[type="password"]');
      if (passwordInput) {
        this.log('Password protection detected. Entering password...');
        await passwordInput.type(password);
        
        // Try to find and click submit button
        const submitButton = await page.$('button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Login")');
        if (submitButton) {
          await submitButton.click();
        } else {
          // Try pressing Enter
          await page.keyboard.press('Enter');
        }
        
        // Wait for navigation
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {
          // Navigation might not happen, continue anyway
        });
      }

      // Wait a bit for page to load
      await page.waitForTimeout(2000);

      // Extract all documentation content
      this.log('Extracting documentation content...');
      
      let markdown = '# Parafin API Documentation\n\n';
      markdown += `*Exported from ${docsUrl}*\n\n`;
      markdown += `*Generated on: ${new Date().toISOString()}*\n\n`;
      markdown += '---\n\n';

      // Get page content
      const content = await page.evaluate(() => {
        // Remove script and style elements
        const scripts = document.querySelectorAll('script, style, nav, header, footer');
        scripts.forEach(el => el.remove());

        // Extract main content
        const main = document.querySelector('main, article, [role="main"], .content') || document.body;
        
        // Convert to markdown-like structure
        let md = '';
        
        const processElement = (el: any, depth = 0): string => {
          let result = '';
          const tagName = el.tagName.toLowerCase();
          
          if (tagName.match(/^h[1-6]$/)) {
            const level = parseInt(tagName.charAt(1));
            const text = el.textContent?.trim() || '';
            if (text) {
              result += `${'#'.repeat(level)} ${text}\n\n`;
            }
          } else if (tagName === 'p') {
            const text = el.textContent?.trim() || '';
            if (text) {
              result += `${text}\n\n`;
            }
          } else if (tagName === 'pre' || (tagName === 'code' && el.closest('pre'))) {
            const code = el.textContent || '';
            if (code.trim()) {
              result += '```\n';
              result += `${code}\n`;
              result += '```\n\n';
            }
          } else if (tagName === 'ul' || tagName === 'ol') {
            const items = el.querySelectorAll('li');
            items.forEach((li: any, index: number) => {
              const text = li.textContent?.trim() || '';
              if (text) {
                const prefix = tagName === 'ol' ? `${index + 1}. ` : '- ';
                result += `${prefix}${text}\n`;
              }
            });
            result += '\n';
          } else if (tagName === 'a' && el.getAttribute('href')) {
            const text = el.textContent?.trim() || '';
            const href = el.getAttribute('href') || '';
            if (text && href) {
              result += `[${text}](${href})`;
            } else if (text) {
              result += text;
            }
          } else {
            // Process children
            Array.from(el.children).forEach((child: any) => {
              result += processElement(child, depth + 1);
            });
          }
          
          return result;
        };
        
        return processElement(main);
      });

      markdown += content;

      // Try to get all pages by following links
      this.log('Discovering additional documentation pages...');
      const links = await page.evaluate(() => {
          const linkElements = Array.from(document.querySelectorAll('a[href]'));
          return linkElements
            .map((a: any) => {
              const href = a.getAttribute('href');
              if (!href) return null;
              try {
                const url = new URL(href, (window as any).location.href);
                if (url.hostname === (window as any).location.hostname || url.hostname === 'docs.parafin.com') {
                  return url.href;
                }
              } catch {
                // Invalid URL
              }
              return null;
            })
            .filter((url: any): url is string => url !== null && url.includes('docs.parafin.com'));
      });

      // Remove duplicates
      const uniqueLinks = Array.from(new Set(links));
      this.log(`Found ${uniqueLinks.length} documentation pages`);

      // Visit each page and extract content (limit to first 50 to avoid too many requests)
      const pagesToVisit = uniqueLinks.slice(0, 50);
      for (let i = 0; i < pagesToVisit.length; i++) {
        const link = pagesToVisit[i];
        try {
          this.log(`Extracting content from page ${i + 1}/${pagesToVisit.length}...`);
          await page.goto(link, { waitUntil: 'networkidle2', timeout: 10000 });
          await page.waitForTimeout(1000);

          const pageContent = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script, style, nav, header, footer');
            scripts.forEach((el: any) => el.remove());
            const main = document.querySelector('main, article, [role="main"], .content') || document.body;
            return (main as any).textContent || '';
          });

          if (pageContent.trim()) {
            markdown += `\n\n## Page: ${link}\n\n`;
            markdown += `${pageContent}\n\n`;
            markdown += '---\n\n';
          }
        } catch (error) {
          // Skip pages that fail to load
          this.log(`Skipping ${link} due to error`);
        }
      }

      // Save to file
      const outputPath = path.join(process.cwd(), outputFile);
      fs.writeFileSync(outputPath, markdown, 'utf-8');

      this.log(`\n✅ Documentation exported successfully to ${outputPath}`);
      this.log(`📄 File size: ${(markdown.length / 1024).toFixed(2)} KB`);
      this.log(`📑 Pages exported: ${pagesToVisit.length + 1}`);
    } catch (error: any) {
      this.error(`Failed to export documentation: ${error.message}`, { exit: 1 });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
