import React from 'react';
import MovieStore from './MovieStore/MovieStore';

const storesContext = React.createContext({
    movieStore: new MovieStore(),
});

export const useStores = () => React.useContext(storesContext);

