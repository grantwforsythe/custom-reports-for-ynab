import { Category } from '../../categories/category';
import { CategoryGroup } from '../../categories/categoryGroup';
import { Payee } from '../../payees/payee';
import { PayeeLocation } from '../../payees/payeeLocation';
import { ScheduledSubTransaction } from '../../transactions/scheduledSubTransaction';
import { ScheduledTransactionSummary } from '../../transactions/scheduledTransationSummary';
import { SubTransaction } from '../../transactions/subTransaction';
import { TransactionSummary } from '../../transactions/transactionSummary';
import { BudgetSummary } from '../summary/budgetSummary';
import { MonthSummary } from './monthSummary';

export interface BudgetDetail extends BudgetSummary {
  payees?: Payee[];
  payeeLocations?: PayeeLocation[];
  categoryGroupss?: Omit<CategoryGroup[], 'categories'>;
  categories?: Category[];
  months?: MonthSummary[];
  transactions?: TransactionSummary[];
  subtransactions?: SubTransaction[];
  scheduledTransactions?: ScheduledTransactionSummary[];
  scheduledSubTransactions?: ScheduledSubTransaction[];
}
