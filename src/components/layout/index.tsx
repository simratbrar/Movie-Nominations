import React,{useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import SearchBar from '../searchBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchResults from './../searchResults';
import NominationList from '../nominationList';
import Banner from '../banner';
import { NOMINATION_LIST, SEARCH_PARAMETERS } from '../../constants/constants';
import { useStores } from '../../stores';

const Layout=(props:any)=>{
    const {movieStore}= useStores();

    useEffect(()=>{
        
        if(props.location.search.length){
            let searchParameters=props.location.search;
            var parameters=new URLSearchParams(searchParameters);
            for(let entry of parameters.entries()){
                const [parameterName,parameterValue] =entry;
                if(parameterName===SEARCH_PARAMETERS.NOMINATION_LIST){
                    movieStore.setNominationList(parameterValue);
                    break;
                }
            }
        }
        else if(localStorage.getItem(NOMINATION_LIST)!==null){
            movieStore.setNominationList(localStorage.getItem(NOMINATION_LIST)!);
        }
    });
    return(
        <>
            <Banner/>
            <Container>
                <Jumbotron>
                    <h2 style={{'display':'flex'}}>The Shoppies</h2>
                    <SearchBar/>
                    
                    <Row>
                        <Col><SearchResults/></Col>
                        <Col><NominationList/></Col>
                    </Row>
                </Jumbotron>
            </Container>
        </>
    );
}

export default Layout;