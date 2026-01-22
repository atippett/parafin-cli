import { Command, Flags, Args } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class BusinessInfo extends Command {
  static description = 'Get comprehensive information about a business including offers, applications, and loans';

  static examples = [
    '$ parafin business.info <business_parafin_id>',
    '$ parafin business.info business_a8153512-942a-41be-992d-7fb8090ae953',
  ];

  static flags = {
    limit: Flags.integer({
      char: 'l',
      description: 'Limit number of results per category',
      default: 100,
    }),
  };

  static args = {
    businessParafinId: Args.string({
      description: 'Business Parafin ID',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(BusinessInfo);

    try {
      this.log(`\n📊 Fetching information for business: ${args.businessParafinId}\n`);

      // Fetch all data in parallel
      this.log('Fetching business offers, applications, and loans...');
      const [offers, applications, loans] = await Promise.all([
        parafinAPI.getBusinessCapitalProductOffers(args.businessParafinId, { limit: flags.limit }),
        parafinAPI.getBusinessCapitalProductApplications(args.businessParafinId, { limit: flags.limit }),
        parafinAPI.getBusinessCapitalProducts(args.businessParafinId, { limit: flags.limit }),
      ]);

      // Build output
      const output: any = {
        business_parafin_id: args.businessParafinId,
        offers: offers.results || offers.data || offers || [],
        applications: applications.results || applications.data || applications || [],
        loans: loans.results || loans.data || loans || [],
      };

      // Add summary counts
      output.summary = {
        total_offers: Array.isArray(output.offers) ? output.offers.length : 0,
        total_applications: Array.isArray(output.applications) ? output.applications.length : 0,
        total_loans: Array.isArray(output.loans) ? output.loans.length : 0,
      };

      // Display summary
      this.log('\n📈 Summary:');
      this.log(`   Offers: ${output.summary.total_offers}`);
      this.log(`   Applications: ${output.summary.total_applications}`);
      this.log(`   Loans: ${output.summary.total_loans}\n`);

      // Output full data as JSON
      this.log(JSON.stringify(output, null, 2));
    } catch (error: any) {
      this.error(`Failed to fetch business information: ${error.message}`, { exit: 1 });
    }
  }
}
