// Type definitions for authentication state

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    user: User | null;
}
