import * as React from 'react';
import { useController } from 'react-hook-form';

import { BaseTextFieldProps, TextField, TextFieldProps } from '@mui/material';

type Props = {
    name: string;
} & BaseTextFieldProps & Omit<TextFieldProps, 'variant'>;

const TextInput: React.FC<Props> = ({ name, ...props }) => {
    const { field, fieldState: { error } } = useController({ name });

    return (
        <TextField
            {...field}
            id={`TextInput-${name}`}
            size="small"
            error={!!error}
            helperText={error?.message as string}
            fullWidth
            {...props}
        />
    );
};

export default TextInput;
