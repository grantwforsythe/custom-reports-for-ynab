import { createActionGroup, props } from '@ngrx/store';

import { FormState } from './dashboard-form.interface';

export const formActions = createActionGroup({
  source: 'Form Page',
  events: {
    'Set Form Data': props<{ form: Partial<FormState> }>(),
  },
});
