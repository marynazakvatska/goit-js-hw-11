import Notiflix from 'notiflix';



const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('div.gallery');
const loadEl = document.querySelector("button.load-more")
console.log(loadEl)

formEl.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault();
    const input = e.currentTarget.elements.searchQuery.value;
    
    if (input === "") {
    return
}
   
    pixabey(input, page=1).then(data => {
        if (data.hits.length === 0) {

           Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
        
        console.log(data)
      return  createMarkup(data.hits)
    }
    )
    loadEl.hidden = false
}

loadEl.addEventListener("click", onLoadMore)


let page = 1;
function onLoadMore(e) {
    page += 1;
    console.log(page)
    pixabey(page).then(data => {
        createMarkup(data.hits)

console.log( `totalHits: ${data.totalHits}` )
    return `totalHits: ${data.totalHits}`    
    })
    
}



/*  function onLoad() {
 page += 1;
 ringsApi(page).then(data => {
 createMarkup(data.docs)
 if (data.page === data.pages) {
 load.hidden = true;
 }
 }).catch(err => console.error(err));
}
 */



const API_KEY = '21675881-9f2314d809854342b3af65054';
const BASE_URL = 'https://pixabay.com/api';

function pixabey(name, page=1) {
    return fetch(`${BASE_URL}/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
} 

function createMarkup(photos) {
 const markup = photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
       
        return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px"/>
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`})
    
    galleryEl.innerHTML = markup.join('')
}



/* 
webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень. */