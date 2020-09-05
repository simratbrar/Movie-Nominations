import Movie from './Movie';

export default interface ResponseData {
    Response: string,
    Error?: string,
    Search: Array<Movie>
}