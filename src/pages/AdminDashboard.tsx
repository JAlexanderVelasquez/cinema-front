import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Film, Users, ShoppingBag } from 'lucide-react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';

const AdminDashboard: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('movies');

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        setLoading(true);
        const data = await movieService.getMovies();
        setMovies(data);
        setLoading(false);
    };

    const toggleStatus = (id: string) => {
        setMovies(movies.map(m =>
            m.id === id ? { ...m, status: m.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : m
        ));
    };

    return (
        <div className="container admin-page animate-fade">
            <div className="admin-header">
                <h1>Panel de Administración</h1>
                <div className="admin-stats">
                    <div className="stat-card glass-morphism">
                        <Film size={24} color="var(--primary)" />
                        <div>
                            <h3>{movies.length}</h3>
                            <p>Películas</p>
                        </div>
                    </div>
                    <div className="stat-card glass-morphism">
                        <Users size={24} color="var(--accent)" />
                        <div>
                            <h3>128</h3>
                            <p>Clientes</p>
                        </div>
                    </div>
                    <div className="stat-card glass-morphism">
                        <ShoppingBag size={24} color="#4caf50" />
                        <div>
                            <h3>45</h3>
                            <p>Ventas Hoy</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-content">
                <aside className="admin-sidebar glass-morphism">
                    <button
                        className={activeTab === 'movies' ? 'active' : ''}
                        onClick={() => setActiveTab('movies')}
                    >
                        <Film size={18} /> Gestión de Películas
                    </button>
                    <button
                        className={activeTab === 'customers' ? 'active' : ''}
                        onClick={() => setActiveTab('customers')}
                    >
                        <Users size={18} /> Clientes
                    </button>
                    <button
                        className={activeTab === 'sales' ? 'active' : ''}
                        onClick={() => setActiveTab('sales')}
                    >
                        <ShoppingBag size={18} /> Compras
                    </button>
                </aside>

                <main className="admin-main glass-morphism">
                    <div className="table-header">
                        <h2>{activeTab === 'movies' ? 'Todas las Películas' : activeTab === 'customers' ? 'Listado de Clientes' : 'Registro de Ventas'}</h2>
                        {activeTab === 'movies' && (
                            <button className="btn-primary"><Plus size={18} /> Nueva Película</button>
                        )}
                    </div>

                    <div className="table-responsive">
                        {loading ? (
                            <div className="loading-table"><Loader2 className="spinner" size={32} /></div>
                        ) : activeTab === 'movies' ? (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Película</th>
                                        <th>Género</th>
                                        <th>Duración</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map(movie => (
                                        <tr key={movie.id}>
                                            <td className="movie-cell">
                                                <img src={movie.imageUrl} alt="" />
                                                <span>{movie.title}</span>
                                            </td>
                                            <td>{movie.genre}</td>
                                            <td>{movie.duration} min</td>
                                            <td>
                                                <span className={`status-badge ${movie.status.toLowerCase()}`}>
                                                    {movie.status === 'ACTIVE' ? 'Activa' : 'Inactiva'}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <button title="Editar"><Edit size={16} /></button>
                                                <button
                                                    onClick={() => toggleStatus(movie.id)}
                                                    title={movie.status === 'ACTIVE' ? 'Inhabilitar' : 'Habilitar'}
                                                >
                                                    {movie.status === 'ACTIVE' ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                                <button className="delete" title="Eliminar"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-tab">
                                <p>Funcionalidad de {activeTab} próximamente disponible en este MVP.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <style>{`
        .admin-page { padding-top: 120px; padding-bottom: 50px; }
        .admin-header { margin-bottom: 2rem; }
        .admin-header h1 { margin-bottom: 1.5rem; }
        .admin-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .stat-card { padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem; }
        .stat-card h3 { font-size: 1.5rem; }
        .stat-card p { color: var(--text-muted); font-size: 0.9rem; }

        .admin-content { display: grid; grid-template-columns: 250px 1fr; gap: 1.5rem; }
        .admin-sidebar { padding: 1rem; border-radius: 12px; align-self: start; }
        .admin-sidebar button {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .admin-sidebar button.active { background: var(--primary); color: white; }
        .admin-sidebar button:hover:not(.active) { background: var(--glass); color: white; }

        .admin-main { padding: 1.5rem; border-radius: 12px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { text-align: left; padding: 1rem; color: var(--text-muted); font-size: 0.9rem; border-bottom: 1px solid var(--glass-border); }
        .admin-table td { padding: 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        
        .movie-cell { display: flex; align-items: center; gap: 1rem; }
        .movie-cell img { width: 40px; height: 60px; object-fit: cover; border-radius: 4px; }
        
        .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .status-badge.active { background: rgba(76, 175, 80, 0.2); color: #4caf50; }
        .status-badge.inactive { background: rgba(229, 9, 20, 0.2); color: var(--primary); }
        
        .actions-cell { display: flex; gap: 10px; }
        .actions-cell button { color: var(--text-muted); transition: var(--trans-fast); }
        .actions-cell button:hover { color: white; }
        .actions-cell button.delete:hover { color: var(--primary); }

        .loading-table { display: flex; justify-content: center; padding: 3rem; }
        .empty-tab { text-align: center; padding: 3rem; color: var(--text-muted); }

        @media (max-width: 900px) {
          .admin-content { grid-template-columns: 1fr; }
          .admin-stats { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
