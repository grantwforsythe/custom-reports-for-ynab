import { createReducer, on } from '@ngrx/store';
import { formActions } from './dashboard-form.actions';
import { FormState } from './dashboard-form.interface';

const initialState: FormState = {
  start: null,
  end: null,
  sort: null,
  account: [],
  category: [],
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
