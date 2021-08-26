import React from "react";
import "./App.css";
import Form from "./components/Form";
import LoginForm from "./components/LoginForm";
import { loginValidators } from "./validators/loginValidators";

function App() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [loginError, setLoginError] = React.useState(false);

  const submitFormRef = () => {
    formRef?.current?.requestSubmit();
  };

  const handleSubmit = (val: any) => {
    setLoginError(true);
    setTimeout(() => {
      setLoginError(false);
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        {loginError && <p>Submitted</p>}
        <Form
          baseValue={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          ref={formRef}
          error={loginError}
          validators={loginValidators}
        >
          <LoginForm />
        </Form>

        <button onClick={submitFormRef} type="submit">
          Submit from parent
        </button>
      </header>
    </div>
  );
}

export default App;
