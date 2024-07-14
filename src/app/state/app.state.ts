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
