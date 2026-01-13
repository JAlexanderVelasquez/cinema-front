import type { Movie } from '../types';

const MOCK_MOVIES: Movie[] = [
    {
        id: '1',
        title: 'Avatar: El Camino del Agua',
        genre: 'Acción, Ciencia Ficción',
        duration: 192,
        description: 'Jake Sully vive con su nueva familia formada en el planeta Pandora. Una vez que una amenaza familiar regresa para acabar con lo que se había empezado anteriormente, Jake debe trabajar con Neytiri y el ejército de la raza Na\'vi para proteger su planeta.',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
        rating: 4.5,
        releaseDate: '2022-12-16',
        status: 'ACTIVE',
    },
    {
        id: '2',
        title: 'Duna: Parte Dos',
        genre: 'Aventura, Ciencia Ficción',
        duration: 166,
        description: 'Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.',
        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
        rating: 4.8,
        releaseDate: '2024-03-01',
        status: 'ACTIVE',
    },
    {
        id: '3',
        title: 'Spider-Man: Across the Spider-Verse',
        genre: 'Animación, Acción',
        duration: 140,
        description: 'Miles Morales regresa para el siguiente capítulo de la saga ganadora del Oscar del Spider-Verse.',
        imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        rating: 4.9,
        releaseDate: '2023-06-02',
        status: 'ACTIVE',
    },
    {
        id: '4',
        title: 'Oppenheimer',
        genre: 'Drama, Historia',
        duration: 180,
        description: 'La historia del físico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
        imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1000&auto=format&fit=crop',
        rating: 4.7,
        releaseDate: '2023-07-21',
        status: 'ACTIVE',
    }
];

export const movieService = {
    getMovies: async (): Promise<Movie[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_MOVIES.filter(m => m.status === 'ACTIVE');
    },

    getMovieById: async (id: string): Promise<Movie | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_MOVIES.find(m => m.id === id);
    },

    searchMovies: async (query: string): Promise<Movie[]> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const lowerQuery = query.toLowerCase();
        return MOCK_MOVIES.filter(m =>
            m.status === 'ACTIVE' &&
            (m.title.toLowerCase().includes(lowerQuery) || m.genre.toLowerCase().includes(lowerQuery))
        );
    }
};
