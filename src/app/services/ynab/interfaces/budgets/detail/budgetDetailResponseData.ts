import { BudgetDetail } from './budgetDetail';

export interface BudgetDetailResponse {
  budget: BudgetDetail;
  /**
   * The knowledge of the server
   */
  server_knowledge: number;
}
