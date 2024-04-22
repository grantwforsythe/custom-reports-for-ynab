import { Account } from '../shared/services/ynab/interfaces/accounts/account';
import { BudgetSummary } from '../shared/services/ynab/interfaces/budgets/summary/budgetSummary';
import { CategoryGroup } from '../shared/services/ynab/interfaces/categories/categoryGroup';
import { Transaction } from '../shared/services/ynab/interfaces/transactions/transaction';

export interface BudgetState {
  budgets: BudgetSummary[];
}

export interface FormState {
  start: string | null;
  end: string | null;
  sort?: 'asc' | 'desc' | null;
  account: string[] | null;
  category: string[] | null;
  chartType: string | null;
}

export interface ReportState {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
}

export interface AppState {
  form: FormState;
  report: ReportState;
}
