import { useState, useEffect } from "react";

export default function(initialValue, dataToValidate, validator) {
  const [value, setValue] = useState(initialValue);

  function validityCheck(value) {
    if (validator(value)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }

  useEffect(() => {
    validityCheck(dataToValidate.value);
  });

  return value;
}
