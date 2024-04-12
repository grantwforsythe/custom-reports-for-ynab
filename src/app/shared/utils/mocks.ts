import { Account } from '../services/ynab/interfaces/accounts/account';
import { BudgetSummary } from '../services/ynab/interfaces/budgets/summary/budgetSummary';
import { CategoryGroup } from '../services/ynab/interfaces/categories/categoryGroup';
import { Payee } from '../services/ynab/interfaces/payees/payee';
import { Transaction } from '../services/ynab/interfaces/transactions/transaction';

// TODO: Change the id for each mock

// TODO: Rename to mockBudgetId
export const mockId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export const mockBudgets: BudgetSummary[] = [
  {
    id: mockId,
    name: 'string',
    last_modified_on: '2024-04-11T20:44:53.501Z',
    first_month: '2024-04-11',
    last_month: '2024-04-11',
    date_format: {
      format: 'MM/DD/YYYY',
    },
    currency_format: {
      iso_code: 'string',
      example_format: 'string',
      decimal_digits: 0,
      decimal_separator: 'string',
      symbol_first: true,
      group_separator: 'string',
      currency_symbol: 'string',
      display_symbol: true,
    },
  },
  {
    id: '2fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    last_modified_on: '2024-04-11T20:44:53.501Z',
    first_month: '2024-04-11',
    last_month: '2024-04-11',
    date_format: {
      format: 'MM/DD/YYYY',
    },
    currency_format: {
      iso_code: 'string',
      example_format: 'string',
      decimal_digits: 0,
      decimal_separator: 'string',
      symbol_first: true,
      group_separator: 'string',
      currency_symbol: 'string',
      display_symbol: true,
    },
  },
];

export const mockCategoryGroups: CategoryGroup[] = [
  {
    id: mockId,
    name: 'string',
    hidden: true,
    deleted: true,
    categories: [
      {
        id: mockId,
        category_group_id: mockId,
        category_group_name: 'string',
        name: 'string',
        hidden: true,
        original_category_group_id: mockId,
        note: 'string',
        budgeted: 0,
        activity: 0,
        balance: 0,
        goal_type: 'TB',
        goal_day: 0,
        goal_cadence: 0,
        goal_cadence_frequency: 0,
        goal_creation_month: '2024-03-09',
        goal_target: 0,
        goal_target_month: '2024-03-09',
        goal_percentage_complete: 0,
        goal_months_to_budget: 0,
        goal_under_funded: 0,
        goal_overall_funded: 0,
        goal_overall_left: 0,
        deleted: true,
      },
    ],
  },
];

export const mockPayees: Payee[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    transfer_account_id: 'string',
    deleted: true,
  },
];

export const mockAccounts: Account[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    type: 'checking',
    on_budget: true,
    closed: true,
    note: 'string',
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    direct_import_linked: true,
    direct_import_in_error: true,
    last_reconciled_at: '2024-03-14T02:39:28.300Z',
    debt_original_balance: 0,
    debt_interest_rates: {},
    debt_minimum_payments: {},
    debt_escrow_amounts: {},
    deleted: true,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: mockId,
    date: '2024-03-09',
    amount: 0,
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: mockId,
    payee_id: mockId,
    category_id: mockId,
    transfer_account_id: mockId,
    transfer_transaction_id: mockId,
    matched_transaction_id: mockId,
    import_id: mockId,
    import_payee_name: 'string',
    import_payee_name_original: 'string',
    debt_transaction_type: 'payment',
    deleted: true,
    account_name: 'string',
    payee_name: 'string',
    category_name: 'string',
    subtransactions: [
      {
        id: mockId,
        transaction_id: mockId,
        amount: 0,
        memo: 'string',
        payee_id: mockId,
        payee_name: 'string',
        category_id: mockId,
        category_name: 'string',
        transfer_account_id: mockId,
        transfer_transaction_id: mockId,
        deleted: true,
      },
    ],
  },
];
