import React, { ReactNode, useMemo, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';

type Props = {
  icon: ReactNode;
} & TextFieldProps;

function TextFieldIcon({
  icon, onFocus, onBlur, InputProps, InputLabelProps, error, sx, value, ...textFieldProps
}: Props) {
  const [shrink, setShrink] = useState(!!value);
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setShrink(true);
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (!e.target.value) setShrink(false);
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const color = useMemo(() => {
    if (error) return { color: theme.palette.error.main };
    if (isFocused) return { color: theme.palette.primary.main };
    return {};
  }, [isFocused, error, theme]);

  return (
    <TextField
    // We can disable props spreading rules bc textFieldProps contain only TextField props
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...textFieldProps}
      value={value}
      error={error}
      sx={{
        ...(typeof sx === 'function' && sx(theme)),
        ...(typeof sx !== 'undefined' && typeof sx !== 'function' && sx),
        '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
          transform: 'translate(41px, 17px)',
        },
      }}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{ ...color }}
          >
            {icon}
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink,
      }}
    />
  );
}

export default TextFieldIcon;
