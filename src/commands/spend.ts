import { Command } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class Spend extends Command {
  static description = 'Get spend card information and limits';

  static examples = [
    '$ parafin spend',
  ];

  async run(): Promise<void> {
    try {
      this.log('Fetching spend card information...');
      const spendInfo = await parafinAPI.getSpendInfo();

      this.log('\nSpend Card Information:');
      this.log(JSON.stringify(spendInfo, null, 2));
    } catch (error: any) {
      this.error(`Failed to fetch spend information: ${error.message}`, { exit: 1 });
    }
  }
}
