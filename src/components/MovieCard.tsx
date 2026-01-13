import React from 'react';
import { Star, Clock } from 'lucide-react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className="movie-card glass-morphism animate-fade" onClick={() => onClick(movie.id)}>
      <div className="card-image-wrapper">
        <img src={movie.imageUrl} alt={movie.title} className="card-image" />
        <div className="card-overlay">
          <button className="btn-primary">Ver Detalles</button>
        </div>
        <div className="card-rating">
          <Star size={14} fill="var(--accent)" color="var(--accent)" />
          <span>{movie.rating}</span>
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-genre">{movie.genre}</p>
        <div className="card-meta">
          <span className="meta-item">
            <Clock size={14} />
            {movie.duration} min
          </span>
        </div>
      </div>

      <style>{`
        .movie-card {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .movie-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--primary);
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        .card-image-wrapper {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: crop;
          transition: transform 0.5s ease;
        }
        .movie-card:hover .card-image {
          transform: scale(1.1);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--trans-mid);
          backdrop-filter: blur(4px);
        }
        .movie-card:hover .card-overlay {
          opacity: 1;
        }
        .card-rating {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.8);
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent);
          z-index: 10;
        }
        .card-info {
          padding: var(--space-sm);
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .card-title {
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: white;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-genre {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .card-meta {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
};

export default MovieCard;
