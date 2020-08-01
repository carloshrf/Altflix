import { useState } from 'react';

export default function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(e) {
    const { value } = e.target;

    setValue(
      e.target.getAttribute('name'),
      value,
    );
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return {
    handleChange,
    values,
    clearForm,
  };
}
