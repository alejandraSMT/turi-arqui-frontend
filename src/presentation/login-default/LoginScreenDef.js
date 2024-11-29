import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../services/authService';
import '../../style/login-default/LoginScreenDef.css';
let logo_black = require("../../assets/images/logo-turi-black.png");

function LoginScreen() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(''); // Error de email
    const [passwordError, setPasswordError] = useState(''); // Error de contraseña
    const [loginError, setLoginError] = useState(''); // Error del backend
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Manejar cambios en el input de correo
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        // Validar el correo electrónico en tiempo real
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError('Por favor, ingresa un correo electrónico válido.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // Limpiar error de contraseña si el usuario escribe
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        let hasError = false;

        if (!input.trim()) {
            setEmailError('Por favor, ingresa un correo válido.');
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError('Por favor, ingresa tu contraseña.');
            hasError = true;
        }

        if (hasError) return;

        const credentials = {
            email: input,
            password: password
        };

        try {
            setIsSubmitting(true);
            const data = await loginUser(credentials);

            if (data && data.token) {
                sessionStorage.setItem('jwtToken', data.token);
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('role', data.role);
                sessionStorage.setItem('isPremium', data.isPremium);
                console.log('Inicio de sesión exitoso. Token guardado.');
                alert('Inicio de sesión exitoso.');
                navigate("/");
            } else {
                throw new Error('No se recibió un token válido.');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error.message);
            setLoginError(error.message || 'Hubo un problema al iniciar sesión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-default">
            <div className="container">
                <div className="left">
                    <img src={logo_black} style={{ width: "30%", height: "auto" }} />
                    <form className='form-container' onSubmit={handleSubmit}>
                        <div className={`form-control ${emailError ? 'error' : ''}`}>
                            <label><b>Correo electrónico</b></label>
                            <input
                                placeholder='Ingresa tu email'
                                type="email"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {emailError && <span className="error-message">{emailError}</span>}
                        </div>
                        <div className={`form-control ${passwordError ? 'error' : ''}`}>
                            <label><b>Contraseña</b></label>
                            <input
                                placeholder='Ingresa tu contraseña'
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <span className="error-message">{passwordError}</span>}
                            <a className='forgot-account'>Olvidé mi contraseña</a>
                        </div>
                        <div className="space-button">
                            <button className='primary-button' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                            </button>
                        </div>
                        {loginError && <span className="login-error-message">{loginError}</span>}
                    </form>
                    <br />
                    <div className="options">
                        <span className='no-account'>¿Aún no tienes cuenta?</span>
                        <a className='green'>¡Registrate aquí!</a>
                    </div>
                </div>
                <div className="right">
                    {/* the photo */}
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
