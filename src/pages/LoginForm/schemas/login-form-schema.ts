import * as yup from 'yup';

export const LoginFormSchema = yup.object({
    username: yup.string().required('Username es requerido').max(12, 'Username no puede tener mas de 12 caracteres'),
    password: yup.string().required('Password es requerido').max(12, 'Password no puede tener mas de 12 caracteres').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Password debe ser alfanumérico, y contener máximo 12 caracteres, una mayúscula y un caracter especial')
});