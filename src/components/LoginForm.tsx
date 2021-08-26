import React from "react";
import { onFocusOut, onInputChange } from "../utils/formUtils";

interface LoginFormProps {
  dispatch?(type: string, data: any): void;
  formState?: any;
  validators?(name: string, value: any): { error: string; hasError: boolean };
}

const LoginForm: React.FC<LoginFormProps> = ({
  dispatch,
  formState,
  validators,
}) => {
  return (
    <div>
      <input
        type="email"
        onChange={(e: any) =>
          onInputChange(
            "email",
            e.target.value,
            dispatch,
            formState,
            validators
          )
        }
        onBlur={(e) =>
          onFocusOut("email", e.target.value, dispatch, formState, validators)
        }
        value={formState.email.value}
      />
      <br />
      <input
        type="password"
        onChange={(e: any) =>
          onInputChange(
            "password",
            e.target.value,
            dispatch,
            formState,
            validators
          )
        }
        onBlur={(e) =>
          onFocusOut(
            "password",
            e.target.value,
            dispatch,
            formState,
            validators
          )
        }
        value={formState.password.value}
      />
      <br />
      {/* <button type="submit">Submit</button> */}
    </div>
  );
};

export default LoginForm;
