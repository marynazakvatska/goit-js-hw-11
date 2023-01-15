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
 
}



 function fetchPhotos() {
    newsApi.fetchPhotosPixabey().then(data => {
       
         console.log(data)
     
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return
        }

        newsApi.incrementPage()   
        createMarkup(data.hits)
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


 