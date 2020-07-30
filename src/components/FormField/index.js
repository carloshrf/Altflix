import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input``;

export default function FormField({
  value, onChange, type, name, label,
}) {
  const fieldID = `id_${name}`;

  const isTypeTextarea = type === 'textarea';
  const tag = isTypeTextarea ? 'textarea' : 'input';

  return (
    <div>

      <label htmlFor={fieldID}>
        {label}
        <Input
          as={tag}
          id={fieldID}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />

      </label>

    </div>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
