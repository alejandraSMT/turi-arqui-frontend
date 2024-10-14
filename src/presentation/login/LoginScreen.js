import React, { useState } from 'react';

import '../../style/login/LoginScreen.css'
let img = require('../../assets/images/miraflores_login.jpeg')
let logo_black = require("../../assets/images/logo-turi-black.png")

function LoginScreen() {

    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login">
                <div className="container">
                        <div className="left">
                            <img src={logo_black} style={{ width: "30%", height: "auto" }} />
                            <div className='form-container'>
                                <div className="form-control">
                                    <label>Usuario</label>
                                    <input placeholder='Ingresa tu usuario' type="text" value={input} onChange={handleInputChange}/>
                                </div>
                                <div className="form-control">
                                    <label>Contraseña</label>
                                    <input placeholder='Ingresa tu contraseña' type="password" value={password} onChange={handlePasswordChange}/>
                                </div>
                            </div>
                            <div className="space-button">
                                <button className='primary-button'>Iniciar sesión</button>
                            </div>
                            <br></br>
                            <div className="options">
                                <span>¿Aún no tienes cuenta?</span>
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