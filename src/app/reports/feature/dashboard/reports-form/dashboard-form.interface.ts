export interface FormState {
  start: Date | null;
  end: Date | null;
  sort?: 'asc' | 'desc' | null;
  account: string[] | null;
  category: string[] | null;
}
