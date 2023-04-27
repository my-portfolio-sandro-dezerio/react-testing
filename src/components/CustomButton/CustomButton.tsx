import { Button } from '@mui/material';
import React from 'react';

export type CustomButtonProps = {
	isDirty: boolean;
	isValid: boolean;
	name: string;
	type: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ isDirty, isValid, name, type }) => {
	return (
		<Button
			type={type}
			fullWidth
			color='primary'
			variant='contained'
			disabled={!isDirty || !isValid}
		>
			{name}
		</Button>
	)
};

export default CustomButton;
