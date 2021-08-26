import React, { FormEvent, useEffect } from "react";
import withForm from "./withForm";

const Form = withForm((props: any) => {
  const handleSubmit = (e: FormEvent) => {
    props.setSubmitted(true);
    e.preventDefault();
  };

  useEffect(() => {
    props.setSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.error]);

  return (
    <form ref={props.formRef} onSubmit={handleSubmit}>
      {React.cloneElement(props.children, { ...props })}
    </form>
  );
});

export default React.forwardRef((props: any, ref: any) => {
  return <Form {...props} formRef={ref} />;
});
