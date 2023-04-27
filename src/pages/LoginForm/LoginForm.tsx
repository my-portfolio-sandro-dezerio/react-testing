import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { CustomButton, CustomInput } from '../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema } from './schemas/login-form-schema';
import { DisplayValues } from './components/DisplayValues';
import { callEndpoint } from './services/call-endpoint';
import { Box } from '@mui/material';

//export type LoginFormProps = {}

const LoginForm: React.FC/*<LoginFormProps>*/ = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {
			errors,
			isDirty,
			isValid
		},
		reset
	} = useForm({
		defaultValues: {
			username: '',
			password: ''
		},
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema),
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = async (data: any) => {
		const result = await callEndpoint(data);
		console.log(result);
		reset();
	}

	const userNameWatch = watch('username');
	const passwordWatch = watch('password');

	return (
		<Box
			sx={{
				bgcolor: 'grey.300',
				borderRadius: '30px',
				p: '50px',
				width: '50%'
			}}
		>
			<FormProvider {...{ register, errors }}>
				<form onSubmit={handleSubmit(onSubmit)}> 
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
						<CustomInput name='username' label='Nombre de usuario' type='text' disabled={false} required={true} />
						<CustomInput name='password' label='Contraseña' type='password' disabled={false} required={true} />
						<CustomButton isDirty={isDirty} isValid={isValid} type="submit" name="Iniciar Sesión" />
					</Box>
				</form>
				<DisplayValues
					isDirty={isDirty}
					isValid={isValid}
					userNameWatch={userNameWatch}
					passwordWatch={passwordWatch}
				/>
			</FormProvider>
		</Box>
	)
};

export default LoginForm;
