import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import styles from './index.module.css';
import { useStores } from '../../stores';

const SearchBar: React.FC = () => {
    const [searchText, setSearchText] = useState("");

    const { movieStore } = useStores();

    const changeHandler = (event: any) => {
        setSearchText(event.target.value);
        movieStore.searchTitles(event.target.value);
    }
    const submitHandler = (event: any) => {
        event.preventDefault();
        movieStore.searchTitles(searchText);
    }
    return (
        <Jumbotron className={styles.Jumbotron + " bg-white"}>
            <Form onSubmit={(event) => { submitHandler(event) }}>
                <Form.Group controlId="searchText">
                    <Form.Label className={styles.Label}>Movie Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter movie title" onChange={(event) => changeHandler(event)} />
                </Form.Group>
            </Form>
        </Jumbotron>
    );
}

export default SearchBar;