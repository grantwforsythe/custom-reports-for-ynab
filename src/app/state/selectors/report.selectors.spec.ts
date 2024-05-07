import { mockAccounts, mockCategoryGroups, mockTransactions } from '../../shared/utils/mocks';
import { AppState } from '../app.state';
import * as fromSelectors from './report.selectors';

const initialState: AppState = {
  report: {
    categoryGroups: [],
    accounts: [],
    transactions: [],
  },
  form: {
    start: null,
    end: null,
    account: null,
    category: null,
    chartType: null,
  },
};

describe('Report Selectors', () => {
  it('should select chartType', () => {
    const result = fromSelectors.selectChartType.projector({
      start: null,
      end: null,
      account: ['59247eac-8603-4fcd-8dab-98f7dacf23e1'],
      category: ['72f3a2d1-45f8-4def-97ad-2c75b6c21f7c'],
      chartType: 'vertical',
    });

    expect(result).toEqual('vertical');
  });

  it('should select accounts', () => {
    const result = fromSelectors.selectReportAccounts.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    expect(result).not.toHaveSize(mockAccounts.length);

    result.forEach((account) => {
      expect(account.deleted).toBeFalsy();
      expect(account.on_budget).toBeTruthy();
    });
  });

  it('should select internal categories', () => {
    const result = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    result.forEach((category) => {
      expect(category?.category_group_name).toEqual('Internal Master Category');
    });
  });

  it('should select categories', () => {
    const result = fromSelectors.selectReportCategories.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    expect(result).toBeDefined();

    expect(
      result.filter((category) => category?.category_group_name === 'Internal Master Category'),
    ).toHaveSize(0);
  });

  it('should select only valid transactions', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const result = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    result.forEach((transaction) => {
      expect(transaction.amount < 0).toBeTruthy();
      expect(transaction.deleted).toBeFalsy();
      expect(transaction.category_id).toBeDefined();
      expect(transaction.category_name).toBeDefined();
      expect(transaction.subtransactions).toHaveSize(0);
      expect(transaction.category_name).not.toEqual('Split');
    });
  });

  describe('#selectEarliestTransactionDate()', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const transactions = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    it('should return the earliest transaction date', () => {
      const result = fromSelectors.selectEarliestTransactionDate.projector(transactions);

      const expected = transactions.reduce((date, transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate <= date ? transactionDate : date;
      }, new Date());

      expect(result).toEqual(expected);
    });

    it("should return today's date if there are no transactions", () => {
      const result = fromSelectors.selectEarliestTransactionDate.projector([]);

      expect(result).toEqual(new Date());
    });
  });

  describe('#selectFilteredTransactionsByDateRange()', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const transactions = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    it('should return all transactions if start and end dates are null', () => {
      const result = fromSelectors.selectFilteredTransactionsByDateRange.projector(
        transactions,
        initialState.form,
      );

      expect(result).toEqual(transactions);
    });

    it('should return transactions with date <= end date if start date is null', () => {
      const endDate = new Date('2024-02-01');
      const filteredTransactions = transactions.filter(
        (transaction) => new Date(transaction.date) <= endDate,
      );

      expect(filteredTransactions).not.toEqual(transactions);

      const result = fromSelectors.selectFilteredTransactionsByDateRange.projector(transactions, {
        ...initialState.form,
        start: null,
        end: endDate.toDateString(),
      });

      expect(result).toEqual(filteredTransactions);
    });

    it('should return transactions with date >= start date if end date is null', () => {
      const startDate = new Date('2024-02-01');
      const filteredTransactions = transactions.filter(
        (transaction) => new Date(transaction.date) >= startDate,
      );

      expect(filteredTransactions).not.toEqual(mockTransactions);

      const result = fromSelectors.selectFilteredTransactionsByDateRange.projector(transactions, {
        ...initialState.form,
        start: startDate.toDateString(),
        end: null,
      });

      expect(result).toEqual(filteredTransactions);
    });

    it('should return transactions between start and end dates', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');
      const filteredTransactions = transactions.filter(
        (transaction) =>
          new Date(transaction.date) >= startDate && new Date(transaction.date) <= endDate,
      );

      expect(filteredTransactions).not.toEqual(mockTransactions);

      const result = fromSelectors.selectFilteredTransactionsByDateRange.projector(transactions, {
        ...initialState.form,
        start: startDate.toDateString(),
        end: endDate.toDateString(),
      });

      expect(result).toEqual(filteredTransactions);
    });
  });

  describe('#selectTransactionsByAccountAndDate()', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const transactions = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    it('should return all transactions if account is null', () => {
      const result = fromSelectors.selectTransactionsByAccountAndDate.projector(
        transactions,
        initialState.form,
      );

      expect(result).toEqual(transactions);
    });

    it('should return transactions for the specified account', () => {
      const result = fromSelectors.selectTransactionsByAccountAndDate.projector(transactions, {
        ...initialState.form,
        account: [mockAccounts[0].id],
      });

      const expected = transactions.filter(
        (transaction) => transaction.account_id === mockAccounts[0].id,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('#selectFilterTransactionsByCategory()', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const transactions = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    it('should return all transactions if category is null', () => {
      const result = fromSelectors.selectFilterTransactionsByCategory.projector(
        transactions,
        initialState.form,
      );

      expect(result).toEqual(transactions);
    });

    it('should return transactions for the specified category', () => {
      const result = fromSelectors.selectFilterTransactionsByCategory.projector(transactions, {
        ...initialState.form,
        category: [mockCategoryGroups[0].id],
      });

      const expected = transactions.filter(
        (transaction) => transaction.category_id === mockCategoryGroups[0].id,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('#selectSortedResults()', () => {
    const internalCategories = fromSelectors.selectInternalCategoryGroup.projector({
      categoryGroups: mockCategoryGroups,
      accounts: mockAccounts,
      transactions: mockTransactions,
    });

    const transactions = fromSelectors.selectTransactions.projector(
      {
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      },
      internalCategories,
    );

    const results = fromSelectors.selectReportResults.projector(transactions);

    it('should select results in ascending order', () => {
      const result = fromSelectors.selectSortedResults.projector(results, {
        ...initialState.form,
        sort: 'asc',
      });

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].value).toBeLessThanOrEqual(result[i + 1].value);
      }
    });

    it('should select results in descending order', () => {
      const result = fromSelectors.selectSortedResults.projector(results, {
        ...initialState.form,
        sort: 'desc',
      });

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].value).toBeGreaterThanOrEqual(result[i + 1].value);
      }
    });

    it('should select results without sorting', () => {
      const result = fromSelectors.selectSortedResults.projector(results, {
        ...initialState.form,
        sort: 'desc',
      });

      expect(result).toEqual(results);
    });
  });

  // TODO: Test if all inflows have been removed
  // TODO: Test if all deleted transactions have been removed
  // TODO: Test if all transaction without a category_id have been removed
  // TODO: Test if all transactions with subtransactions have been removed
  // TODO: Test if all fitlered transactions are returned
});
