import { Command, Flags, Args } from '@oclif/core';
import { parafinAPI } from '../api/parafin';

export default class Transactions extends Command {
  static description = 'View transaction history';

  static examples = [
    '$ parafin transactions',
    '$ parafin transactions --from 2024-01-01 --to 2024-01-31',
    '$ parafin transactions --limit 20',
    '$ parafin transactions get <transaction-id>',
  ];

  static flags = {
    from: Flags.string({
      char: 'f',
      description: 'Start date (YYYY-MM-DD)',
    }),
    to: Flags.string({
      char: 't',
      description: 'End date (YYYY-MM-DD)',
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
      description: 'Action (list or get)',
      required: false,
      options: ['list', 'get'],
      default: 'list',
    }),
    transactionId: Args.string({
      description: 'Transaction ID (required for get action)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Transactions);

    try {
      if (args.action === 'get' || args.transactionId) {
        if (!args.transactionId) {
          this.error('Transaction ID is required for get action.', { exit: 1 });
        }

        this.log(`Fetching transaction ${args.transactionId}...`);
        const transaction = await parafinAPI.getTransaction(args.transactionId);
        this.log('\nTransaction Details:');
        this.log(JSON.stringify(transaction, null, 2));
      } else {
        this.log('Fetching transactions...');
        const transactions = await parafinAPI.getTransactions({
          from: flags.from,
          to: flags.to,
          limit: flags.limit,
          offset: flags.offset,
        });

        this.log('\nTransactions:');
        this.log(JSON.stringify(transactions, null, 2));
      }
    } catch (error: any) {
      this.error(`Failed to fetch transactions: ${error.message}`, { exit: 1 });
    }
  }
}
