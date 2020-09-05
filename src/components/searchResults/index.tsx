import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { observer } from 'mobx-react';
import { useStores } from './../../stores';
import styles from './index.module.css';
import Movie from '../../models/Movie';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import { NOMINATION_LIMIT, NOT_FOUND_ICON_URL } from '../../constants/constants';


const SearchResults: React.FC = () => {
    const { movieStore } = useStores();

    const checkIfDisabled = (movie: Movie) => {
        if (movieStore.nominationList.length === NOMINATION_LIMIT)
            return true;
        const index = movieStore.nominationList.findIndex((item: Movie) => item.imdbID === movie.imdbID);
        return index !== -1;
    }
    return (
        movieStore.searchText.length === 0 ? null :
            <Jumbotron className={styles.Jumbotron + " bg-white"}>
                <h4 className="mb-4">Results for {`"${movieStore.searchText}"`}</h4>

                {movieStore.movieNotFound && <h6>No movie found!</h6>}
                <CardColumns>
                    {movieStore.searchResults.map((movie: Movie) => {
                        return (
                            <Card key={movie.imdbID}>
                                <Card.Img className={styles.Image} variant="top" src={movie.Poster === "N/A" ? NOT_FOUND_ICON_URL : movie.Poster} />
                                <Card.Title className={styles.Title}>{movie.Title}</Card.Title>
                                <Card.Text>Year: {movie.Year}</Card.Text>
                                <Card.Footer>
                                    <Button disabled={checkIfDisabled(movie)}
                                        onClick={() => movieStore.nominateMovie(movie)}
                                    >
                                        Nominate</Button>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Jumbotron>
    );
}

export default observer(SearchResults);

