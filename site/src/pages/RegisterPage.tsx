
import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { Link } from 'react-router-dom';


const RegisterPage: React.FC = () => {
    return (
        <div>
            <h1>Página de Registro</h1>
            <RegisterForm />
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
    );
};

export default RegisterPage;