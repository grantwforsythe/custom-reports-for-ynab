// TODO: Factor nulls out of states
export interface FormState {
  start: string | null;
  end: string | null;
  sort?: 'asc' | 'desc' | null;
  account: string[] | null;
  category: string[] | null;
  chartType: string | null;
}
