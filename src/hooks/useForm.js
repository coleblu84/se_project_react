import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleReset = () => {
    setValues(defaultValues);
  };
  return { values, handleChange, setValues, handleReset };
}
