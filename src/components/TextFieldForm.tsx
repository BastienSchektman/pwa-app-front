import React, { ReactNode } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';
import TextFieldIcon from './TextFieldIcon';

type Props = { name: string, icon?: ReactNode } & TextFieldProps;

function TextFieldForm({
  name, icon, onBlur, ...textFieldProps
}: Props) {
  const [field, meta] = useField(name);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (onBlur) onBlur(e);
    if (field.onBlur) field.onBlur(e);
  };

  return (
    !icon ? (
      <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...textFieldProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        id={name}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        onBlur={handleOnBlur}
      />
    ) : (
      <TextFieldIcon
    // eslint-disable-next-line react/jsx-props-no-spreading
        {...textFieldProps}
    // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        id={name}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        icon={icon}
        onBlur={handleOnBlur}
      />
    )
  );
}

export default TextFieldForm;
