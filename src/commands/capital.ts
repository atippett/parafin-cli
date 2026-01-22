import { Command, Flags, Args } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class Capital extends Command {
  static description = 'Manage capital requests';

  static examples = [
    '$ parafin capital request --amount 10000',
    '$ parafin capital list',
    '$ parafin capital list --status pending',
    '$ parafin capital offer <product-offer-id>',
  ];

  static flags = {
    amount: Flags.integer({
      char: 'a',
      description: 'Amount to request',
    }),
    currency: Flags.string({
      char: 'c',
      description: 'Currency code (e.g., USD)',
      default: 'USD',
    }),
    status: Flags.string({
      char: 's',
      description: 'Filter by status',
      options: ['pending', 'approved', 'rejected', 'completed'],
    }),
    limit: Flags.integer({
      char: 'l',
      description: 'Limit number of results',
      default: 10,
    }),
    offset: Flags.integer({
      char: 'o',
      description: 'Offset for pagination',
      default: 0,
    }),
  };

  static args = {
    action: Args.string({
      description: 'Action to perform (request, list, offer)',
      required: true,
      options: ['request', 'list', 'offer'],
    }),
    productOfferId: Args.string({
      description: 'Product offer ID (required for offer action)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Capital);

    try {
      if (args.action === 'request') {
        if (!flags.amount) {
          this.error('Amount is required for capital request. Use --amount flag.', { exit: 1 });
        }

        this.log(`Requesting capital: ${flags.amount} ${flags.currency}...`);
        const result = await parafinAPI.requestCapital({
          amount: flags.amount,
          currency: flags.currency,
        });

        this.log('\nCapital Request Created:');
        this.log(JSON.stringify(result, null, 2));
      } else if (args.action === 'list') {
        this.log('Fetching capital requests...');
        const requests = await parafinAPI.getCapitalRequests({
          status: flags.status,
          limit: flags.limit,
          offset: flags.offset,
        });

        this.log('\nCapital Requests:');
        this.log(JSON.stringify(requests, null, 2));
      } else if (args.action === 'offer') {
        if (!args.productOfferId) {
          this.error('Product offer ID is required for offer action.', { exit: 1 });
        }

        this.log(`Fetching capital product offer ${args.productOfferId}...`);
        const offer = await parafinAPI.getCapitalProductOffer(args.productOfferId);

        this.log('\nCapital Product Offer:');
        this.log(JSON.stringify(offer, null, 2));
      }
    } catch (error: any) {
      this.error(`Failed to process capital request: ${error.message}`, { exit: 1 });
    }
  }
}
