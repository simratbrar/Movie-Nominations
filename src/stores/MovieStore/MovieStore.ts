import {observable,action} from 'mobx';
import {SEARCH_TITLE_URL,BOOLEAN, NOMINATION_LIST, SEARCH_BY_ID_URL} from './../../constants/constants';
import Movie from './../../models/Movie';
import ResponseData from './../../models/ResponseData';
import {search} from './../../utils/axios';
import { arrayToString, stringToArray } from '../../utils/arrayStringInterConverter';
import axios from 'axios';

export class MovieStore{
    @observable 
    searchText="";
    @observable
    searchResults=[] as Array<Movie>;
    @observable
    nominationList=[] as Array<Movie>;
    @observable
    movieNotFound=false;

    @action
    setSearchText=(searchText:string)=>{
        this.searchText=searchText;
    }

    @action
    setMovieNotFound=(status:boolean)=>{
        this.movieNotFound=status;
    }

    @action
    searchTitles=async (searchText:string)=>{
        const response:any=await search(SEARCH_TITLE_URL+searchText).catch((error)=>{
            this.setMovieNotFound(true);
            console.log(error);
        });
        this.setSearchText(searchText);
        if(response===undefined)
            return;
        this.searchResults.splice(0,this.searchResults.length);

        const data:ResponseData=response;

        if(data.Response===BOOLEAN.TRUE){
            this.setMovieNotFound(false);
            this.searchResults.push(...data.Search);
        }
        else{
            this.setMovieNotFound(true);
        }
    }

    @action
    nominateMovie=(movie:Movie)=>{
        this.nominationList.push(movie);
        this.storeListLocally();
    }

    @action
    removeMovie=(id:string)=>{
        const index=this.nominationList.findIndex((movie:Movie)=>movie.imdbID===id);
        this.nominationList.splice(index,1);
        this.storeListLocally();
    }

    @action
    setNominationList=async (stringList:string)=>{
        const idArray=stringToArray(stringList!);

        this.nominationList.splice(0,this.nominationList.length);
        for(let id of idArray){
            const response:any= await axios.get(SEARCH_BY_ID_URL+id).catch((error)=>{
                console.log(error);
            });
            const data:Movie=response.data;
            this.nominationList.push(data);
        }
    }

    storeListLocally=()=>{
        try{
            localStorage.setItem(NOMINATION_LIST,arrayToString(this.nominationList));
        }
        catch(exception){
            console.log(exception);
        }
    }
}

export default MovieStore;