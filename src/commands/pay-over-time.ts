import { Command, Flags } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class PayOverTime extends Command {
  static description = 'Get pay-over-time offers';

  static examples = [
    '$ parafin pay-over-time',
    '$ parafin pay-over-time --amount 1000 --currency USD',
  ];

  static flags = {
    amount: Flags.integer({
      char: 'a',
      description: 'Purchase amount',
    }),
    currency: Flags.string({
      char: 'c',
      description: 'Currency code (e.g., USD)',
      default: 'USD',
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(PayOverTime);

    try {
      this.log('Fetching pay-over-time offers...');
      const offers = await parafinAPI.getPayOverTimeOffers({
        amount: flags.amount,
        currency: flags.currency,
      });

      this.log('\nPay-Over-Time Offers:');
      this.log(JSON.stringify(offers, null, 2));
    } catch (error: any) {
      this.error(`Failed to fetch pay-over-time offers: ${error.message}`, { exit: 1 });
    }
  }
}
