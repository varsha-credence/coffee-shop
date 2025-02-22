import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: '',
    results: [],
    recentSearches: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        setSearchResults: (state, action) => {
            state.results = action.payload;
        },
        addRecentSearch: (state, action) => {
            if (!state.recentSearches.some(item => item.id === action.payload.id)) {
                state.recentSearches.unshift(action.payload);
            }
        },
        removeRecentSearch: (state, action) => {
            state.recentSearches = state.recentSearches.filter(item => item.id !== action.payload.id);
        },
        clearRecentSearches: (state) => {
            state.recentSearches = [];
        },
        clearSearch: (state) => {
            state.query = '';
            state.results = [];
        },
    },
});

export const {
    setSearchQuery,
    setSearchResults,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    clearSearch,
} = searchSlice.actions;


export default searchSlice.reducer;
