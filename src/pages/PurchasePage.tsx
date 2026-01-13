import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, Ticket, CreditCard, ChevronLeft, Loader2 } from 'lucide-react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';

const PurchasePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(1);
    const [step, setStep] = useState(1); // 1: Selection, 2: Payment, 3: Confirmation

    useEffect(() => {
        if (id) {
            loadMovie(id);
        }
    }, [id]);

    const loadMovie = async (movieId: string) => {
        setLoading(true);
        const data = await movieService.getMovieById(movieId);
        if (data) setMovie(data);
        setLoading(false);
    };

    const handlePurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep(3);
        setLoading(false);
    };

    if (loading && step === 1) {
        return <div className="container loading-container"><Loader2 className="spinner" size={48} /></div>;
    }

    if (!movie) return <div className="container"><h1>Película no encontrada</h1></div>;

    const ticketPrice = 15000; // COP
    const totalAmount = tickets * ticketPrice;

    return (
        <div className="container purchase-page animate-fade">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Volver
            </button>

            <div className="purchase-layout">
                {/* Movie Info Sidebar */}
                <div className="movie-summary glass-morphism">
                    <img src={movie.imageUrl} alt={movie.title} className="summary-poster" />
                    <div className="summary-details">
                        <h2>{movie.title}</h2>
                        <div className="summary-meta">
                            <span><Clock size={14} /> {movie.duration} min</span>
                            <span><Star size={14} fill="var(--accent)" color="var(--accent)" /> {movie.rating}</span>
                        </div>
                        <p className="summary-genre">{movie.genre}</p>
                    </div>
                </div>

                {/* Purchase Steps */}
                <div className="purchase-content">
                    {step === 1 && (
                        <div className="step-card glass-morphism animate-fade">
                            <h3><Ticket size={24} /> Cantidad de Entradas</h3>
                            <p>Selecciona cuántas personas asistirán a la función.</p>

                            <div className="ticket-selector">
                                <button onClick={() => setTickets(Math.max(1, tickets - 1))}>-</button>
                                <span className="ticket-count">{tickets}</span>
                                <button onClick={() => setTickets(tickets + 1)}>+</button>
                            </div>

                            <div className="price-breakdown">
                                <div className="price-row">
                                    <span>General x {tickets}</span>
                                    <span>${ticketPrice.toLocaleString()} COP</span>
                                </div>
                                <div className="price-total">
                                    <span>Total</span>
                                    <span>${totalAmount.toLocaleString()} COP</span>
                                </div>
                            </div>

                            <button className="btn-primary full-width" onClick={() => setStep(2)}>
                                Continuar al Pago
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-card glass-morphism animate-fade">
                            <h3><CreditCard size={24} /> Información de Pago</h3>
                            <p>Esta es una simulación de pago seguro.</p>

                            <form onSubmit={handlePurchase} className="payment-form">
                                <div className="form-group">
                                    <label>Nombre en la tarjeta</label>
                                    <input type="text" required placeholder="JUAN PEREZ" />
                                </div>
                                <div className="form-group">
                                    <label>Número de tarjeta</label>
                                    <input type="text" required placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Vencimiento</label>
                                        <input type="text" required placeholder="MM/AA" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVC</label>
                                        <input type="password" required placeholder="123" />
                                    </div>
                                </div>

                                <div className="price-total">
                                    <span>Total a pagar</span>
                                    <span>${totalAmount.toLocaleString()} COP</span>
                                </div>

                                <button type="submit" className="btn-primary full-width" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={20} /> : `Pagar $${totalAmount.toLocaleString()}`}
                                </button>
                                <button type="button" className="btn-secondary full-width" onClick={() => setStep(1)}>
                                    Atrás
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-card glass-morphism success-step animate-fade">
                            <div className="success-icon">✓</div>
                            <h2>¡Compra Confirmada!</h2>
                            <p>Hemos enviado los detalles de tu ticket a tu correo electrónico.</p>

                            <div className="ticket-info-card">
                                <div className="info-row">
                                    <strong>Película:</strong> <span>{movie.title}</span>
                                </div>
                                <div className="info-row">
                                    <strong>Entradas:</strong> <span>{tickets}</span>
                                </div>
                                <div className="info-row">
                                    <strong>Total:</strong> <span>${totalAmount.toLocaleString()} COP</span>
                                </div>
                                <div className="info-row">
                                    <strong>ID Transacción:</strong> <span>#{Math.floor(Math.random() * 1000000)}</span>
                                </div>
                            </div>

                            <button className="btn-primary full-width" onClick={() => navigate('/')}>
                                Volver a la Cartelera
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .purchase-page {
          padding-top: 120px;
          padding-bottom: 50px;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-weight: 600;
        }
        .back-btn:hover { color: white; }
        
        .purchase-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
        }
        .movie-summary {
          padding: var(--space-md);
          border-radius: 16px;
          height: fit-content;
        }
        .summary-poster {
          width: 100%;
          aspect-ratio: 2/3;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .summary-details h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .summary-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .summary-genre { color: var(--primary); font-weight: 600; font-size: 0.9rem; }

        .step-card {
          padding: var(--space-xl);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .step-card h3 { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; }
        .step-card p { color: var(--text-muted); }

        .ticket-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 1rem 0;
        }
        .ticket-selector button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          color: white;
          font-size: 1.5rem;
          transition: var(--trans-fast);
        }
        .ticket-selector button:hover { background: var(--primary); border-color: var(--primary); }
        .ticket-count { font-size: 2rem; font-weight: 800; width: 40px; text-align: center; }

        .price-breakdown {
          border-top: 1px solid var(--glass-border);
          padding-top: 1rem;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .price-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 0.5rem;
          color: white;
        }

        .full-width { width: 100%; justify-content: center; }
        .btn-secondary {
          background: var(--glass);
          color: white;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .payment-form .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .payment-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .success-step { text-align: center; align-items: center; }
        .success-icon {
          width: 80px;
          height: 80px;
          background: #4caf50;
          color: white;
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .ticket-info-card {
          background: rgba(255,255,255,0.03);
          padding: 1.5rem;
          border-radius: 12px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }
        .info-row { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; }

        @media (max-width: 768px) {
          .purchase-layout { grid-template-columns: 1fr; }
          .movie-summary { display: flex; gap: 1rem; align-items: center; }
          .summary-poster { width: 100px; margin-bottom: 0; }
        }
      `}</style>
        </div>
    );
};

export default PurchasePage;
