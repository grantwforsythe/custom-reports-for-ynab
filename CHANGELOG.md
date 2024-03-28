

## [1.0.0](https://github.com/grantwforsythe/ynab-custom-reports/compare/0.0.2...1.0.0) (2024-03-28)


### ⚠ BREAKING CHANGES

* create report reducers

### Features

* add dashboard-form.component ([70b5b1f](https://github.com/grantwforsythe/ynab-custom-reports/commit/70b5b1fd39ecfcd1b8e20bf68d0d0f9f5852fc85))
* add FlagIconComponent ([2499b2a](https://github.com/grantwforsythe/ynab-custom-reports/commit/2499b2af1b2ddc7dbe80806201b6f8e0b6a750f4))
* add form controls for account and category ([e6583df](https://github.com/grantwforsythe/ynab-custom-reports/commit/e6583df8a28ee8e91b11cb137aa13d34f08dcadb))
* add getAccounts method to YNAB service ([52a75b6](https://github.com/grantwforsythe/ynab-custom-reports/commit/52a75b643c71a62f47225e5ba8a27fe892386a58))
* add horizontal bar chart component ([92ba778](https://github.com/grantwforsythe/ynab-custom-reports/commit/92ba778bf16b440a622d085ae206cc4fc6a309da))
* add logo to toolbar; remove github logo ([f30f735](https://github.com/grantwforsythe/ynab-custom-reports/commit/f30f7350ba1f638f909d657156e79f69cc7ba6b0))
* add ngrx ([2141a9b](https://github.com/grantwforsythe/ynab-custom-reports/commit/2141a9b89d2d058ce752ea537f0010df6599b4e8))
* add privacy policy ([a7eac65](https://github.com/grantwforsythe/ynab-custom-reports/commit/a7eac6574b2a31d733ec5a2540771914e85a9486))
* add privacy route in footer ([15710de](https://github.com/grantwforsythe/ynab-custom-reports/commit/15710def391c455cb8bd46408617c921d9b54906))
* create report reducers ([da681c3](https://github.com/grantwforsythe/ynab-custom-reports/commit/da681c3ba544fcdae9603e0f8e6e494f9b94e7f9))
* move login button; add home component ([125191f](https://github.com/grantwforsythe/ynab-custom-reports/commit/125191f328b345236cbd700ce257e08fed0ad8ef))
* redirect to home for invalid routes ([537a26d](https://github.com/grantwforsythe/ynab-custom-reports/commit/537a26ddd28044fdc537a69d4c3102201716e365))
* replace favicon ([#3](https://github.com/grantwforsythe/ynab-custom-reports/issues/3)) ([015a5e9](https://github.com/grantwforsythe/ynab-custom-reports/commit/015a5e9f48e1f914057a3493e6efe53ba14a5937))


### Bug Fixes

* link to budgets in sidenav ([2fe058c](https://github.com/grantwforsythe/ynab-custom-reports/commit/2fe058c1061335414e9e62d90c68ce27bc61d17f))
* remove authReducer from store provider ([38f2786](https://github.com/grantwforsythe/ynab-custom-reports/commit/38f2786abae319fd4a18881547efeb29e932bb76))
* remove unused import ([003ffef](https://github.com/grantwforsythe/ynab-custom-reports/commit/003ffef12325226b7a2a198c587b2cef103a5b77))
* unable to display graph split transactions ([a56ca57](https://github.com/grantwforsythe/ynab-custom-reports/commit/a56ca5754f75df2d6926cb916660053eef7c2742))

## [0.0.2 (2024-03-09)](https://github.com/grantwforsythe/ynab-custom-reports/compare/0.0.1...0.0.2)

### Features

- Add GitHub icon.
- Replace header with toolbar.
- Add bar-chart to budget-detail component.
- Add hover effect to budget cards.
- Vertically center login button.

### Bug Fixes

- Expired cache not being deleted.
- isLoaded not getting set in budget-details.

## [0.0.1 (2024-03-06)](https://github.com/grantwforsythe/ynab-custom-reports/commits/0.0.1)

### Features

- Get payees, categories, and transactions.
- Remove \*ResponseData interfaces.
- Add budget-detail component.
- Get individual budget.
- Add cards to budget component.
- Add YNAB service.
- Add caching functionality.
- Add authInterceptor.
- Add scope query parameter in auth service.
- Add budget component.
- Add auth.guard service.
- Add material as a dependency.
- Add auth service.
- Add login component.

### Bug Fixes

- Update client ID.
- Set maxAge to 7,200,000 from 30,000 milliseconds.
- budget-detail component not reacting to url.
- Reroute to /budgets after authenticating.
