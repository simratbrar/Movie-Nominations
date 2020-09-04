const API_KEY=process.env.REACT_APP_API_KEY;

export const SEARCH_TITLE_URL=`http://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=`;

export const SEARCH_BY_ID_URL=`http://www.omdbapi.com/?apikey=${API_KEY}&type=movie&i=`;

export const BOOLEAN={
    TRUE:"True",
    FALSE:"False"
}

export const NOMINATION_LIMIT=5;

export const PUBLIC_URL=process.env.REACT_APP_PUBLIC_URL;

export const NOT_FOUND_ICON_URL="https://static.dribbble.com/users/1044993/screenshots/3138371/popnosh_dribbble.png";

export const NOMINATION_LIST='nominationList';

export const SEARCH_PARAMETERS={
    NOMINATION_LIST:"nominations"
}
