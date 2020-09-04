import axios from 'axios';

const requestDict={} as {[key:string]:any}

const makeRequestCreator = () => {
  let token:any;

  return async (query:any) => {
    if(token){
        token.cancel()
    }
    token = axios.CancelToken.source()
    try{
        if(requestDict[query])
            return requestDict[query]
        const response = await axios(query, {cancelToken: token.token});
        const result = response.data
        requestDict[query]=result;
        return result;
    } catch(error) {
        if(axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log('Something went wrong: ', error.message)
        }
    }
  }
}

export const search = makeRequestCreator()