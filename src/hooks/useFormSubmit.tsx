import { useEffect, useState } from "react";
import { UPDATE_FORM } from "../utils/formUtils";

const useFormSubmit = (
  submited: boolean,
  callback: any,
  dispatch: any,
  validators: any,
  formState: any
) => {
  const [showError, setShowError] = useState(submited);

  useEffect(() => {
    if (submited) {
      let isFormValid = true;

      for (const name in formState) {
        const item = formState[name];
        const { value } = item;
        const { hasError, error } = validators(name, value);
        if (hasError) {
          isFormValid = false;
        }
        if (name) {
          dispatch({
            type: UPDATE_FORM,
            data: {
              name,
              value,
              hasError,
              error,
              touched: true,
              isFormValid,
            },
          });
        }
      }

      if (!isFormValid) {
        setShowError(true);
      } else {
        callback();
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submited]);

  return { showError };
};

export default useFormSubmit;
