import Notiflix from 'notiflix';
import LoadMoreBtn from "./loadMoreBtn";


const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden: true})


const API_KEY = '21675881-9f2314d809854342b3af65054' 
 const BASE_URL = 'https://pixabay.com/api'



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
       const numberOfHits = this.page * 40 - 40;
    
       
       this.fetchPhotosPixabey().then(data => {
           console.log(data)
           console.log(data.totalHits)
           if (numberOfHits > data.totalHits) {
             this.incrementPage
              Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
               loadMoreBtn.hide();
               return
           } else {
               loadMoreBtn.show()
           }
       })
    
}

    resetPage(){
        this.page = 1;
        
    };
 
}


