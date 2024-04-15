import { createReducer, on } from '@ngrx/store';

import { formActions } from '../actions/dashboard-form.actions';
import { FormState } from '../app.state';

const initialState: FormState = {
  start: null,
  end: null,
  account: [],
  category: [],
  chartType: 'vertical',
};

export const formReducer = createReducer(
  initialState,
  on(formActions.setFormData, (state, action): FormState => {
    return {
      ...state,
      ...action.form,
    };
  }),
);
