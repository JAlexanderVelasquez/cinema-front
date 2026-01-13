import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await movieService.getMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (searchQuery.trim() === '') {
      await loadMovies();
    } else {
      const results = await movieService.searchMovies(searchQuery);
      setMovies(results);
    }
    setLoading(false);
  };

  const handleMovieClick = (id: string) => {
    navigate(`/purchase/${id}`);
  };

  return (
    <div className="home-page animate-fade">
      <section className="hero">
        <div className="container hero-content">
          <h1>Vive la magia del cine en <span className="highlight">Colombia</span></h1>
          <p>Encuentra los últimos estrenos y reserva tus entradas de forma segura.</p>

          <form className="search-bar" onSubmit={handleSearch}>
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Busca tu película favorita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-primary">Buscar</button>
          </form>
        </div>
        <div className="hero-overlay"></div>
      </section>

      <section className="catalog container">
        <h2 className="section-title">Películas en Cartelera</h2>

        {loading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={48} />
            <p>Cargando cartelera...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No se encontraron películas para tu búsqueda.</p>
            <button className="btn-primary" onClick={() => { setSearchQuery(''); loadMovies(); }}>Ver todas</button>
          </div>
        )}
      </section>

      <style>{`
        .home-page {
          padding-bottom: var(--space-xl);
        }
        .hero {
          height: 80vh;
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          margin-bottom: var(--space-xl);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, var(--bg-dark) 0%, rgba(10,11,16,0.4) 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
        }
        .hero-content h1 {
          font-size: 4rem;
          margin-bottom: 1rem;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        .hero-content p {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 600px;
        }
        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          padding: 8px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          max-width: 600px;
        }
        .search-icon {
          margin: 0 15px;
          color: var(--text-muted);
        }
        .search-bar input {
          flex-grow: 1;
          background: none;
          border: none;
          padding: 12px 0;
          font-size: 1rem;
          color: white;
        }
        .catalog {
          padding-top: var(--space-lg);
        }
        .section-title {
          font-size: 2rem;
          margin-bottom: var(--space-lg);
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
        }
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: var(--space-lg);
        }
        .loading-state, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-xl);
          gap: 1rem;
          color: var(--text-muted);
        }
        .spinner {
          animation: spin 1s linear infinite;
          color: var(--primary);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .hero { height: 60vh; }
          .search-bar { flex-direction: column; gap: 10px; padding: 15px; }
          .search-bar input { width: 100%; text-align: center; }
          .search-bar button { width: 100%; }
          .search-icon { display: none; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
