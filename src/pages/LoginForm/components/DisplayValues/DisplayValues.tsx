import { Box, Typography } from '@mui/material';
import React from 'react';

export type DisplayValuesProps = {
	isDirty: boolean;
	isValid: boolean;
	userNameWatch: string;
	passwordWatch: string;
}

export const DisplayValues: React.FC<DisplayValuesProps> = ({ isDirty, isValid, userNameWatch, passwordWatch}) => {
	return (
		<Box color="grey.600" mt="10px">
			{isDirty && isValid && (
				<><Typography>{userNameWatch}</Typography><Typography>{passwordWatch}</Typography></>
			)}
		</Box>
	);
};

export default DisplayValues;
