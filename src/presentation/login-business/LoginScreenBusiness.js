import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import '../../style/login-business/LoginScreenBusiness.css';
let logo_business = require("../../assets/images/logo-turi-business.png")

function LoginScreen() {
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

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventbusiness();
        setLoginError(''); // Limpiar error previo del backend

        // Validar campos
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

        // Preparar datos para enviar
        const credentials = {
            email: input,
            password: password
        };

        try {
            setIsSubmitting(true); // Indicador de carga
            const data = await loginUser(credentials); // Llama al servicio de autenticación

            // Guarda el JWT en sessionStorage
            if (data && data.token) {
                sessionStorage.setItem('jwtToken', data.token);
                console.log('Inicio de sesión exitoso. Token guardado.');
                alert('Inicio de sesión exitoso.');
                // Redirigir o realizar acciones adicionales aquí
            } else {
                throw new Error('No se recibió un token válido.');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error.message);
            setLoginError(error.message || 'Hubo un problema al iniciar sesión.');
        } finally {
            setIsSubmitting(false); // Termina el indicador de carga
        }
    };

    return (
        <div className="login-business">
            <div className="container">
                <div className="left">
                    <img src={logo_business} style={{ width: "30%", height: "auto" }} />
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
                        <span className='no-account'>¿Quieres formar parte de nosotros?</span>
                        <a className='green'>¡Contáctanos!</a>
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
