import { BudgetSummary } from './budgetSummary';

export interface BudgetSummaryResponseData {
  budgets: Array<BudgetSummary>;
  defaultBudget?: BudgetSummary;
}
