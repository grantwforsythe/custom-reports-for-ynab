import { faker } from '@faker-js/faker';

const from = '2024-01-01T00:00:00.000Z';
const to = '2024-12-31T11:59:00.000Z';

faker.seed(1234);
faker.setDefaultRefDate(from);

export const mockBudgets: BudgetSummary[] = [
  {
    id: faker.string.uuid(),
    name: 'Budget #1',
    last_modified_on: faker.date
      .between({
        from,
        to,
      })
      .toDateString(),
    first_month: faker.date.past().toDateString(),
    last_month: faker.date.future().toDateString(),
    date_format: {
      format: 'MM/DD/YYYY',
    },
    currency_format: {
      iso_code: 'CAD',
      example_format: '123,456.78',
      decimal_digits: 2,
      decimal_separator: '.',
      symbol_first: true,
      group_separator: ',',
      currency_symbol: '$',
      display_symbol: true,
    },
  },
  {
    id: faker.string.uuid(),
    name: 'Budget #2',
    last_modified_on: faker.date
      .between({
        from,
        to,
      })
      .toDateString(),
    first_month: faker.date.past().toDateString(),
    last_month: faker.date.future().toDateString(),
    date_format: {
      format: 'MM/DD/YYYY',
    },
    currency_format: {
      iso_code: 'CAD',
      example_format: '123,456.78',
      decimal_digits: 2,
      decimal_separator: '.',
      symbol_first: true,
      group_separator: ',',
      currency_symbol: '$',
      display_symbol: true,
    },
  },
];

// TODO: Rename to mockBudgetId
export const mockId = mockBudgets[0].id;

const hiddenCategoryGroup = {
  id: faker.string.uuid(),
  name: 'Hidden Category Group',
};
const deletedCategoryGroup = {
  id: faker.string.uuid(),
  name: 'Deleted Category Group',
};
const internalMasterCategoryGroup = {
  id: faker.string.uuid(),
  name: 'Internal Master Category',
};
const regularCategoryGroup = {
  id: faker.string.uuid(),
  name: 'Regular Category Group',
};

export const mockCategoryGroups: CategoryGroup[] = [
  {
    ...hiddenCategoryGroup,
    hidden: true,
    deleted: false,
    categories: [
      {
        id: faker.string.uuid(),
        category_group_id: hiddenCategoryGroup.id,
        category_group_name: hiddenCategoryGroup.name,
        name: '💍 Wedding Ring',
        hidden: true,
        budgeted: 0,
        activity: 0,
        balance: 0,
        deleted: false,
      },
    ],
  },
  {
    ...deletedCategoryGroup,
    name: 'Deleted Category Group',
    hidden: false,
    deleted: true,
    categories: [
      {
        id: faker.string.uuid(),
        category_group_id: deletedCategoryGroup.id,
        category_group_name: deletedCategoryGroup.name,
        name: '🍕 Pizza Party',
        hidden: false,
        budgeted: 500000,
        activity: 500000,
        balance: 0,
        deleted: true,
      },
    ],
  },
  {
    ...internalMasterCategoryGroup,
    hidden: false,
    deleted: false,
    categories: [
      {
        id: faker.string.uuid(),
        category_group_id: internalMasterCategoryGroup.id,
        category_group_name: internalMasterCategoryGroup.name,
        name: 'Inflow: Ready to Assign',
        hidden: false,
        budgeted: 0,
        activity: faker.number.int({ min: 0, max: 10000000 }),
        balance: faker.number.int({ min: 0, max: 10000000 }),
        deleted: false,
      },
      {
        id: faker.string.uuid(),
        category_group_id: internalMasterCategoryGroup.id,
        category_group_name: internalMasterCategoryGroup.name,
        name: 'Uncategorized',
        hidden: false,
        budgeted: 0,
        activity: 0,
        balance: 0,
        goal_target: 0,
        deleted: false,
      },
    ],
  },
  {
    ...regularCategoryGroup,
    hidden: false,
    deleted: false,
    categories: [
      {
        id: faker.string.uuid(),
        category_group_id: regularCategoryGroup.id,
        category_group_name: regularCategoryGroup.name,
        name: '🍔 Groceries',
        hidden: false,
        budgeted: 0,
        activity: 0,
        balance: 0,
        deleted: false,
      },
      {
        id: faker.string.uuid(),
        category_group_id: regularCategoryGroup.id,
        category_group_name: regularCategoryGroup.name,
        name: '⛽️ Gas',
        hidden: false,
        budgeted: 0,
        activity: 0,
        balance: 0,
        deleted: false,
      },
      {
        id: faker.string.uuid(),
        category_group_id: regularCategoryGroup.id,
        category_group_name: regularCategoryGroup.name,
        name: '🚈 Transportation',
        hidden: false,
        budgeted: 0,
        activity: 0,
        balance: 0,
        deleted: false,
      },
    ],
  },
];

const regularTransferAccountId = faker.string.uuid();
const closedTransferAccountId = faker.string.uuid();
const deletedTransferAccountId = faker.string.uuid();

export const mockPayees: Payee[] = [
  {
    id: faker.string.uuid(),
    name: 'Employer',
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: 'Loblaws',
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: 'Shell',
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: 'Public Transit',
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: 'Block Buster',
    deleted: true,
  },
  {
    id: faker.string.uuid(),
    name: `Transfer : ${faker.finance.accountName()}`,
    transfer_account_id: regularTransferAccountId,
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: `Transfer : ${faker.finance.accountName()}`,
    transfer_account_id: closedTransferAccountId,
    deleted: false,
  },
  {
    id: faker.string.uuid(),
    name: `Transfer : ${faker.finance.accountName()}`,
    transfer_account_id: deletedTransferAccountId,
    deleted: true,
  },
];

export const mockAccounts: Account[] = [
  {
    id: regularTransferAccountId,
    name: mockPayees
      .find((payee) => payee.transfer_account_id === regularTransferAccountId)!
      .name.split(' : ')[1],
    type: 'checking',
    on_budget: true,
    closed: false,
    note: 'string',
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: mockPayees.find(
      (payee) => payee.transfer_account_id === regularTransferAccountId,
    )!.id,
    direct_import_linked: true,
    direct_import_in_error: true,
    last_reconciled_at: '2024-03-14T02:39:28.300Z',
    debt_original_balance: 0,
    debt_interest_rates: {},
    debt_minimum_payments: {},
    debt_escrow_amounts: {},
    deleted: false,
  },
  {
    id: closedTransferAccountId,
    name: mockPayees
      .find((payee) => payee.transfer_account_id === closedTransferAccountId)!
      .name.split(' : ')[1],
    type: 'checking',
    on_budget: true,
    closed: false,
    note: 'string',
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: mockPayees.find(
      (payee) => payee.transfer_account_id === closedTransferAccountId,
    )!.id,
    direct_import_linked: true,
    direct_import_in_error: true,
    last_reconciled_at: '2024-03-14T02:39:28.300Z',
    debt_original_balance: 0,
    debt_interest_rates: {},
    debt_minimum_payments: {},
    debt_escrow_amounts: {},
    deleted: false,
  },
  {
    id: deletedTransferAccountId,
    name: mockPayees
      .find((payee) => payee.transfer_account_id === deletedTransferAccountId)!
      .name.split(' : ')[1],
    type: 'checking',
    on_budget: true,
    closed: false,
    note: 'string',
    balance: 0,
    cleared_balance: 0,
    uncleared_balance: 0,
    transfer_payee_id: mockPayees.find(
      (payee) => payee.transfer_account_id === deletedTransferAccountId,
    )!.id,
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

const regularAccountName = mockAccounts.find(
  (account) => account.id === regularTransferAccountId,
)!.name;

// TODO: Add a transaction with subtransactions
export const mockTransactions: Transaction[] = [
  {
    id: faker.string.uuid(),
    date: faker.date.past().toDateString(),
    amount: 1000000,
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: regularTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Employer')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === internalMasterCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name === 'Inflow: Ready to Assign')!.id,
    deleted: false,
    account_name: regularAccountName,
    payee_name: 'Employer',
    category_name: 'Inflow: Ready to Assign',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.between({ from, to }).toDateString(),
    amount: faker.number.int({ min: -2500, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: regularTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Loblaws')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Groceries'))!.id,
    deleted: false,
    account_name: regularAccountName,
    payee_name: 'Loblaws',
    category_name: '🍔 Groceries',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.between({ from, to }).toDateString(),
    amount: faker.number.int({ min: -2000, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: regularTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Shell')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Gas'))!.id,
    deleted: false,
    account_name: regularAccountName,
    payee_name: 'Shell',
    category_name: '⛽️ Gas',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.between({ from, to }).toDateString(),
    amount: faker.number.int({ min: -5000, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: closedTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Public Transit')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Transportation'))!.id,
    deleted: false,
    account_name: mockAccounts.find((account) => account.id === closedTransferAccountId)!.name,
    payee_name: 'Public Transit',
    category_name: '🚈 Transportation',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.past().toDateString(),
    amount: faker.number.int({ min: -10000, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: regularTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Loblaws')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Groceries'))!.id,
    deleted: false,
    account_name: regularAccountName,
    payee_name: 'Loblaws',
    category_name: '🍔 Groceries',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.future().toDateString(),
    amount: faker.number.int({ min: -10000, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: regularTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Loblaws')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Groceries'))!.id,
    deleted: false,
    account_name: regularAccountName,
    payee_name: 'Loblaws',
    category_name: '🍔 Groceries',
    subtransactions: [],
  },
  {
    id: faker.string.uuid(),
    date: faker.date.between({ from, to }).toDateString(),
    amount: faker.number.int({ min: -10000, max: 0 }),
    memo: 'string',
    cleared: 'cleared',
    approved: true,
    flag_color: 'red',
    flag_name: 'string',
    account_id: closedTransferAccountId,
    payee_id: mockPayees.find((payee) => payee.name === 'Loblaws')!.id,
    category_id: mockCategoryGroups
      .filter((categoryGroup) => categoryGroup.id === regularCategoryGroup.id)
      .flatMap((categoryGroup) => categoryGroup.categories)
      .find((category) => category?.name.includes('Groceries'))!.id,
    deleted: true,
    account_name: mockAccounts.find((account) => account.id === closedTransferAccountId)!.name,
    payee_name: 'Loblaws',
    category_name: '🍔 Groceries',
    subtransactions: [],
  },
];
