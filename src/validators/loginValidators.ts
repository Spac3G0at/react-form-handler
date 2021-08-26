import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

export const loginValidators = (
  name: string,
  value: any
): { hasError: boolean; error: string } => {
  let hasError = false,
    error = "";
  switch (name) {
    case "email":
      // = required
      if (isEmpty(value)) {
        hasError = true;
        error = "Email cannot be empty";
      } else if (!isEmail(value)) {
        hasError = true;
        error = "Invalid Email";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "password":
      // = required
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.trim().length < 8) {
        hasError = true;
        error = "Password must have at least 8 characters";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
