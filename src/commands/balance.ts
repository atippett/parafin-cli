import { Command, Flags } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class Balance extends Command {
  static description = 'Get current account balance';

  static examples = [
    '$ parafin balance',
    '$ parafin balance --format json',
  ];

  static flags = {
    format: Flags.string({
      char: 'f',
      description: 'Output format (json, table)',
      default: 'json',
      options: ['json', 'table'],
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Balance);

    try {
      this.log('Fetching balance...');
      const balance = await parafinAPI.getBalance();

      if (flags.format === 'table') {
        this.log('\nBalance Information:');
        this.log('─'.repeat(50));
        this.log(JSON.stringify(balance, null, 2));
      } else {
        this.log(JSON.stringify(balance, null, 2));
      }
    } catch (error: any) {
      this.error(`Failed to fetch balance: ${error.message}`, { exit: 1 });
    }
  }
}
