import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
    token: null,
    userId: null,
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                token: string;
                userId: string;
                user?: User;
            }>
        ) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.user = action.payload.user || null;
            state.isAuthenticated = true;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

// Actions
export const { setCredentials, updateUser, logout } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

// Reducer
export default authSlice.reducer;
