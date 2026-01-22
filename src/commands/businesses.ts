import { Command, Flags, Args } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class Businesses extends Command {
  static description = 'List and view businesses';

  static examples = [
    '$ parafin businesses',
    '$ parafin businesses --limit 20',
    '$ parafin businesses get <business-id>',
  ];

  static flags = {
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
      description: 'Action (list or get)',
      required: false,
      options: ['list', 'get'],
      default: 'list',
    }),
    businessId: Args.string({
      description: 'Business ID (required for get action)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Businesses);

    try {
      if (args.action === 'get' || args.businessId) {
        if (!args.businessId) {
          this.error('Business ID is required for get action.', { exit: 1 });
        }

        this.log(`Fetching business ${args.businessId}...`);
        const business = await parafinAPI.getBusiness(args.businessId);
        this.log('\nBusiness Details:');
        this.log(JSON.stringify(business, null, 2));
      } else {
        this.log('Fetching businesses...');
        const businesses = await parafinAPI.getBusinesses({
          limit: flags.limit,
          offset: flags.offset,
        });

        this.log('\nBusinesses:');
        this.log(JSON.stringify(businesses, null, 2));
      }
    } catch (error: any) {
      this.error(`Failed to fetch businesses: ${error.message}`, { exit: 1 });
    }
  }
}
