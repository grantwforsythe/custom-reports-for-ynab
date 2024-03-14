import { SubTransaction } from './subTransaction';
import { TransactionSummary } from './transactionSummary';

export interface Transaction extends TransactionSummary {
  account_name: string;
  payee_name?: string;
  category_name?: string;
  subtransactions?: SubTransaction[];
}
