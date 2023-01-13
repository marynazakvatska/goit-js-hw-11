import LoadMoreBtn from "./loadMoreBtn";
import NewsApi from "./news-api";
import Notiflix from 'notiflix';
import './style.css'

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('div.gallery');
const loadEl = document.querySelector("button.load-more")


const newsApi = new NewsApi()
const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden: true})

formEl.addEventListener('submit', onSubmit)
loadEl.addEventListener("click", fetchPhotos)

function onSubmit(e) {
    e.preventDefault();
    newsApi.name = e.currentTarget.elements.searchQuery.value;
   
    if (newsApi.name === "") {
  return  Notiflix.Notify.info('Please, write something ');        
    }
       loadMoreBtn.hide()
    newsApi.resetPage();
    clearPhotosContainer()
 
    fetchPhotos()

    setTimeout(() => {
         loadMoreBtn.show()
    }, 400);
    
}



 function fetchPhotos() {
    newsApi.fetchPhotosPixabey().then(data => {
      
        console.log(data)
        console.log((data.hits[data.hits.length-1]))
        if (data.hits[data.hits.length-1] === data.totalHits) {
         loadMoreBtn.hide()
              Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
         return 
        } 
          newsApi.incrementPage()
       
        createMarkup(data.hits)
        loadMoreBtn.enable()
    })
}



    function createMarkup(photos) {
 const markup = photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
       
        return `
    <div class="photo-card" >
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`}).join('')
    
    galleryEl.insertAdjacentHTML("beforeend", markup)
}

function clearPhotosContainer() {
    galleryEl.innerHTML = ""
}


 