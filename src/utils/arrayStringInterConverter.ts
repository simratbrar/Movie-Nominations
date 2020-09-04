import Movie from './../models/Movie';

export const arrayToString=(array:Array<Movie>)=>{
    let result="";
    for(let movie of array){
        if(result.length)
            result=result.concat("-");
        result=result.concat(movie.imdbID);
    }
    return result;
}

export const stringToArray=(str:string)=>{
    const array=str.split('-');
    return array;
}