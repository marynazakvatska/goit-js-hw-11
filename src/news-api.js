import Notiflix from 'notiflix';

const API_KEY = '21675881-9f2314d809854342b3af65054' 
 const BASE_URL = 'https://pixabay.com/api'
const options = {
    headers: {
        Authorization: API_KEY,
    }
}


export default class NewsApi {
    constructor() {
        this.name = '';
        this.page = 1;
    };

 async fetchPhotosPixabey() {
        /*  return fetch(`${BASE_URL}/?key=${API_KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
             .then(resp => {
                 if (!resp.ok) {
                throw new Error(resp.statusText)
            }
                 return resp.json()
             }) */
     try {
         const responce = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
     const newPhoto = await responce.json();
     return newPhoto
     } catch (error) {
         console.log(error.message )
     }
       
    }

   incrementPage() {
       this.page += 1;
     /*   this.fetchPhotosPixabey().then(data => {
           console.log(data.totalHits)
           if (this.page === data.totalHits) {
           alert("We're sorry, but you've reached the end of search results.")
       }
       }) */
}

    resetPage(){
        this.page = 1;
        
    };
 
}


