import { TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type InputProps = {
	name: string;
	label: string;
	type: string;
	disabled: boolean;
	required: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formValidation = (errors: any, errorKey: string) => {
	return errors[errorKey] ? <Typography color="red">{errors[errorKey].message}</Typography> : '';
}

const CustomInput: React.FC<InputProps> = ({ name = '', label = '', type = 'text', disabled = false, required = false }) => {
	const { register, errors } = useFormContext();

	return (
		<div>
			<TextField
				required={required}
				disabled={disabled}
				type={type}
				error={errors && !!errors[name]}
				id={name}
				label={label}
				variant='outlined'
				{...register(name)}
				fullWidth
			/>
			{errors && formValidation(errors, name)}
		</div>
	)
};

export default CustomInput;
