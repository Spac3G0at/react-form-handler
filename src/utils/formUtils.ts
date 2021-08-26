export const UPDATE_FORM = "UPDATE_FORM";

/**
 * Triggered every time the value of the form changes
 */
export const onInputChange = (
  name: any,
  value: any,
  dispatch: any,
  formState: any,
  validators: any
) => {
  const { hasError, error } = validators(name, value);
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: false, isFormValid },
  });
};

export const onFocusOut = (
  name: string,
  value: any,
  dispatch: any,
  formState: any,
  validators: any
) => {
  const { hasError, error } = validators(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, touched: true, isFormValid },
  });
};

/**
 * Reducer which will perform form state update
 */
export const formsReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

class FormField {
  value: any = null;
  touched = false;
  hasError = true;
  error = "";
  constructor(value: string) {
    this.value = value;
  }
}

export const initialiseFormValues = (fields: any) => {
  const state: any = { isFormValid: false };
  const keys = Object.keys(fields);
  keys.forEach((key: string) => {
    state[key] = new FormField(fields[key]);
  });

  return state;
};

export const getValuesFromState = (formState: any) => {
  const fs = { ...formState };
  delete fs.isFormValid;
  const keys = Object.keys(fs);
  const values: any = {};
  keys.forEach((key: string) => {
    values[key] = fs[key].value;
  });
  return values;
};
