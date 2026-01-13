export interface Movie {
    id: string;
    title: string;
    genre: string;
    duration: number; // in minutes
    description: string;
    imageUrl: string;
    rating: number;
    releaseDate: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export interface Customer {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
}

export interface Purchase {
    id: string;
    customerId: string;
    movieId: string;
    ticketCount: number;
    totalAmount: number;
    purchaseDate: string;
    status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}
