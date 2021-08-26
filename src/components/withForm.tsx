import { useEffect, useReducer, useState } from "react";
import {
  formsReducer,
  getValuesFromState,
  initialiseFormValues,
} from "../utils/formUtils";
import useFormSubmit from "../hooks/useFormSubmit";

export interface withFormProps {
  submitted: boolean;
  setSubmitted(b: boolean): void;
  formState: any;
  dispatch: any;
  submitValue: {
    showError: boolean;
  };
}

const withForm = (Component: any) => {
  return ({ ...props }) => {
    const [submitted, setSubmitted] = useState(false);

    const [formState, dispatch] = useReducer(
      formsReducer,
      initialiseFormValues(props.baseValue)
    );

    const submitValue = useFormSubmit(
      submitted,
      () => props.onSubmit(getValuesFromState(formState)),
      dispatch,
      props.validators,
      formState
    );

    useEffect(() => {
      if (submitValue) setSubmitted(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitValue.showError]);

    return (
      <Component
        {...{ submitted, setSubmitted, formState, dispatch, submitValue }}
        {...props}
      />
    );
  };
};

export default withForm;
