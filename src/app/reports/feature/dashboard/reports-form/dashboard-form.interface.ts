export interface FormState {
  start: Date | null;
  end: Date | null;
  sort: 'asc' | 'desc' | 'none' | null;
  account: string[] | null;
  category: string[] | null;
}
