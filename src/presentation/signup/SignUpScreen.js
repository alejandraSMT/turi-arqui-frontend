import React, { useState } from 'react';
import { registerUser } from '../../services/userService';
import '../../style/singup/SignUpScreen.css'
let logo_black = require("../../assets/images/logo-turi-black.png")

function SignUpScreen(){
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        celular: '',
        genero: '',
        usuario: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validar los campos
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombres':
            case 'apellidos':
            case 'usuario':
                if (!value.trim()) {
                    error = 'Este campo es obligatorio.';
                }
                break;
            case 'celular':
                if (!/^\d+$/.test(value)) {
                    error = 'Solo se permiten números.';
                }
                break;
            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Formato de correo inválido.';
                }
                break;
            case 'password':
                if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                    error = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
                }
                break;
            case 'confirmPassword':
                if (value !== form.password) {
                    error = 'Las contraseñas no coinciden.';
                }
                break;
            default:
                break;
        }
        return error;
    };

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;

        const error = validateField(name, value);
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    // Transformar género al formato esperado por el backend
    const transformGenero = (genero) => {
        switch (genero) {
            case 'masculino':
                return 1;
            case 'femenino':
                return 2;
            case 'otro':
                return 3;
            default:
                return null;
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        for (const field in form) {
            const error = validateField(field, form[field]);
            if (error) {
                newErrors[field] = error;
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.log('Errores en el formulario:', newErrors);
            return;
        }

        const payload = {
            first_name: form.nombres,
            last_name: form.apellidos,
            phone_number: form.celular,
            genderId: transformGenero(form.genero),
            username: form.usuario,
            email: form.correo,
            password: form.password
        };

        console.log('Datos a enviar:', payload);

        try {
            setIsSubmitting(true);
            const response = await registerUser(payload); // Llama al servicio
            console.log('Respuesta del servidor:', response);
            alert('¡Registro exitoso!');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al registrar el usuario.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup">
            <div className="container">
                <div className="left">
                    <img src={logo_black} style={{ width: "30%", height: "auto" }} />
                    <form className='form-container' onSubmit={handleSubmit}>
                        {/* Row for Nombres and Apellidos */}
                        <div className="form-row">
                            <div className={`form-control ${errors.nombres ? 'error' : ''}`}>
                                <label><b>Nombres*</b></label>
                                <input
                                    placeholder='Ingresa tu nombre'
                                    type="text"
                                    name="nombres"
                                    value={form.nombres}
                                    onChange={handleChange}
                                />
                                {errors.nombres && <span className="error-message">{errors.nombres}</span>}
                            </div>
                            <div className={`form-control ${errors.apellidos ? 'error' : ''}`}>
                                <label><b>Apellidos*</b></label>
                                <input
                                    placeholder='Ingresa tu apellido'
                                    type="text"
                                    name="apellidos"
                                    value={form.apellidos}
                                    onChange={handleChange}
                                />
                                {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
                            </div>
                        </div>

                        {/* Row for Celular and Género */}
                        <div className="form-row">
                            <div className={`form-control ${errors.celular ? 'error' : ''}`}>
                                <label><b>Número de Celular*</b></label>
                                <input
                                    placeholder='Ingresa tu celular'
                                    type="text"
                                    name="celular"
                                    value={form.celular}
                                    onChange={handleChange}
                                />
                                {errors.celular && <span className="error-message">{errors.celular}</span>}
                            </div>
                            <div className="form-control">
                                <label><b>Género*</b></label>
                                <select
                                    name="genero"
                                    value={form.genero}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="form-row">
                            <div className={`form-control ${errors.usuario ? 'error' : ''}`}>
                                <label><b>Nombre de Usuario*</b></label>
                                <input
                                    placeholder='Ingresa tu nombre de usuario'
                                    type="text"
                                    name="usuario"
                                    value={form.usuario}
                                    onChange={handleChange}
                                />
                                {errors.usuario && <span className="error-message">{errors.usuario}</span>}
                            </div>
                            <div className={`form-control ${errors.correo ? 'error' : ''}`}>
                                <label><b>Correo Electrónico*</b></label>
                                <input
                                    placeholder='Ingresa tu correo'
                                    type="email"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                />
                                {errors.correo && <span className="error-message">{errors.correo}</span>}
                            </div>
                        </div>

                        {/* Row for Contraseña and Confirmación */}
                        <div className="form-row">
                            <div className={`form-control ${errors.password ? 'error' : ''}`}>
                                <label><b>Contraseña*</b></label>
                                <input
                                    placeholder='Ingresa tu contraseña'
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>
                            <div className={`form-control ${errors.confirmPassword ? 'error' : ''}`}>
                                <label><b>Repetir Contraseña*</b></label>
                                <input
                                    placeholder='Repite tu contraseña'
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className='register-button'>
                            <button className='primary-button' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    <br />
                    <div className="options">
                        <span className='has-account'>¿Ya tienes una cuenta?</span>
                        <a className='green'>Ingresa aquí</a>
                    </div>
                </div>
                <div className="right">
                    {/* Background image here */}
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
