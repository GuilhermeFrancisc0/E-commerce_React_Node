import * as React from 'react';
import { Control, useController } from 'react-hook-form';

import { BaseTextFieldProps, TextField, TextFieldProps } from '@mui/material';

type Props = {
    name: string;
    control: Control<any>;
} & BaseTextFieldProps & Omit<TextFieldProps, 'variant'>;

const TextInput: React.FC<Props> = ({ name, control, ...props }) => {
    const { field, formState: { errors } } = useController({ name, control });

    return (
        <TextField
            {...field}
            id={`TextInput-${name}`}
            size="small"
            error={!!errors[name]}
            helperText={errors[name]?.message as string}
            fullWidth
            {...props}
        />
    );
};

export default TextInput;
