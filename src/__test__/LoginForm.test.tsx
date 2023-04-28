import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../pages';
import { LoginFormMock, LoginFormMockError } from '../__mocks__/LoginForm.mock';
import axios from 'axios';

jest.mock('axios');
jest.mock('../pages/LoginForm/components/DisplayValues/DisplayValues.tsx', () => ({
    __esModule: true,
    default: () => <div>Mocked DisplayFormValues</div>
}));

describe('LoginForm', () => {
    afterEach(cleanup);
    afterAll(jest.clearAllMocks);

    beforeEach(() => {
        const myAxiosPost = axios as jest.Mocked<typeof axios>;
        myAxiosPost.post.mockResolvedValue({ data: LoginFormMock });
        render(<LoginForm />);
    });

    /* Test básico inicial, no se utiliza.
    it('should render correctly', () => {
        const container = render(<LoginForm />);

        expect(container).toBeTruthy();
    });*/

    it('should two input and a submit button exists at the screen', () => {
        // screen representa al dom ficticio en el test. screen.debug()
        // diferentes formas de acceder a mis elementos del formulario: https://testing-library.com/docs/vue-testing-library/cheatsheet/
        //const usernameInput = screen.getByText(/Nombre de usuario/i);
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        // input type="password" no se puede acceder mediante getByRole
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i});

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button if the form values are valid', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i});

        expect(submitButton).toBeDisabled();

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await waitFor(() => {
            expect(usernameInput).toHaveValue(LoginFormMock.username);
            expect(passwordInput).toHaveValue(LoginFormMock.password);

            expect(submitButton).not.toBeDisabled();
        });
    });

    it('should disabled the submit button if the form values are invalid', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i});

        await userEvent.type(usernameInput, LoginFormMockError.username);
        await userEvent.type(passwordInput, LoginFormMockError.password);

        await waitFor(() => {
            expect(usernameInput).toHaveValue(LoginFormMockError.username);
            expect(passwordInput).toHaveValue(LoginFormMockError.password);
            expect(screen.getByText('Username no puede tener mas de 12 caracteres')).toBeInTheDocument();
            expect(screen.getByText('Password debe ser alfanumérico, y contener máximo 12 caracteres, una mayúscula y un caracter especial')).toBeInTheDocument();

            expect(submitButton).toBeDisabled();
        });
    });

    it('should call the onSubmit function when the submit button is clicked', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByLabelText(/Contraseña/i);
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i});

        expect(submitButton).toBeDisabled();

        await userEvent.type(usernameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await userEvent.click(submitButton);

        await waitFor(() => {
            //expect(submitButton).not.toBeDisabled();
            expect(axios.post).toHaveBeenCalled();
            expect(axios.post).toHaveBeenCalledTimes(1);
        })
    });

    it('should mock DisplayFormValues', () => {
        expect(screen.getByText('Mocked DisplayFormValues')).toBeInTheDocument();
    });
});