import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from './../../stores';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import styles from './index.module.css';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Movie from '../../models/Movie';
import { NOT_FOUND_ICON_URL, PUBLIC_URL, SEARCH_PARAMETERS } from '../../constants/constants';
import { arrayToString } from '../../utils/arrayStringInterConverter';
import Row from 'react-bootstrap/Row';

const NominationList:React.FC=()=>{
    const {movieStore} = useStores();

    const copyLinkHandler=()=>{
        const stringList=arrayToString(movieStore.nominationList);
        const url=PUBLIC_URL+`?${SEARCH_PARAMETERS.NOMINATION_LIST}=`+stringList;

        const input = document.createElement('input');
        input.setAttribute('value', url);
        document.body.appendChild(input);
        input.select();

        document.execCommand('copy');
        document.body.removeChild(input);
    }

    return(
        <Jumbotron className={styles.jumbotron + " bg-white"}>
            <Row>
                <h4 className="ml-3">Nominations</h4>
                <Button className="mb-3 ml-3" onClick={()=>copyLinkHandler()}>Copy link</Button>
            </Row>
            <CardColumns>
                {movieStore.nominationList.map((movie:Movie)=>{
                    return(
                    <Card key={movie.imdbID}>
                        <Card.Img variant="top" src={movie.Poster==="N/A"?NOT_FOUND_ICON_URL:movie.Poster}/>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>Year: {movie.Year}</Card.Text>
                        <Card.Footer>
                            <Button
                            onClick={()=>{
                                movieStore.removeMovie(movie.imdbID)
                            }}
                            >
                            Remove</Button>
                        </Card.Footer>
                    </Card>
                    );
                })}
            </CardColumns>
        </Jumbotron>
    );
}

export default observer(NominationList);