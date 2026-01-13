import React, { useState } from 'react';
import { Mail, Lock, Phone, User, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validations
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
        } catch (err) {
            setError('Hubo un error al registrar. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container auth-container animate-fade">
                <div className="auth-card glass-morphism success-card">
                    <div className="success-icon">✓</div>
                    <h2>¡Registro Exitoso!</h2>
                    <p>Tu cuenta ha sido creada correctamente. Ahora puedes comprar tus entradas.</p>
                    <Link to="/" className="btn-primary">Ir a la Cartelera <ArrowRight size={18} /></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container auth-container animate-fade">
            <div className="auth-card glass-morphism">
                <h2 className="auth-title">Crear Cuenta</h2>
                <p className="auth-subtitle">Únete a Cinema Colombia y disfruta de los mejores estrenos.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label><User size={14} /> Nombre</label>
                            <input
                                type="text" name="firstName" required
                                value={formData.firstName} onChange={handleChange}
                                placeholder="Ej: Juan"
                            />
                        </div>
                        <div className="form-group">
                            <label><User size={14} /> Apellido</label>
                            <input
                                type="text" name="lastName" required
                                value={formData.lastName} onChange={handleChange}
                                placeholder="Ej: Perez"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label><Mail size={14} /> Email</label>
                        <input
                            type="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            placeholder="juan.perez@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label><Phone size={14} /> Teléfono</label>
                        <input
                            type="tel" name="phone" required
                            value={formData.phone} onChange={handleChange}
                            placeholder="300 123 4567"
                        />
                    </div>

                    <div className="form-group">
                        <label><Lock size={14} /> Contraseña</label>
                        <input
                            type="password" name="password" required
                            value={formData.password} onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-group">
                        <label><Lock size={14} /> Confirmar Contraseña</label>
                        <input
                            type="password" name="confirmPassword" required
                            value={formData.confirmPassword} onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                        {loading ? <Loader2 className="spinner" size={20} /> : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login" className="highlight">Inicia sesión aquí</Link>
                </p>
            </div>

            <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 100px;
          padding-bottom: 50px;
        }
        .auth-card {
          width: 100%;
          max-width: 500px;
          padding: var(--space-xl);
          border-radius: 16px;
        }
        .auth-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .auth-subtitle {
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .auth-submit {
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1rem;
        }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .error-message {
          color: var(--primary);
          background: rgba(229, 9, 20, 0.1);
          padding: 10px;
          border-radius: 8px;
          font-size: 0.85rem;
          text-align: center;
          border: 1px solid rgba(229, 9, 20, 0.2);
        }
        .success-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .success-icon {
          width: 60px;
          height: 60px;
          background: #4caf50;
          color: white;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default RegisterPage;
