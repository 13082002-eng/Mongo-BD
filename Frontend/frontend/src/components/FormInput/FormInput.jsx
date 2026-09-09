import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id}>{label}</label>

        <input
          ref={ref}
          {...props}
        />

        {error && <p>{error}</p>}
      </div>
    );
  }
);

export default FormInput;