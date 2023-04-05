const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35004326-8dd8488139d702cdf649647db';
const per_page = 10;

const axios = require('axios').default;

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load-more');
const guard = document.querySelector('.js-guard');

load.addEventListener('click', onLoad);

function markUp(arrayPhoto) {
  const images = arrayPhoto
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="big-photo-ref" href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', images);
}

function hendlSearchImg(event) {
  event.preventDefault();
  const query = input.value.trim();
  gallery.innerHTML = '';

  fetchPhoto(query);
}
form.addEventListener('submit', hendlSearchImg);

let page = 1;

async function fetchPhoto(query) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
    );

    console.log('response', response);

    markUp(response.data.hits);

    load.hidden = false;

    // observer.observe(guard);
  } catch (err) {
    throw err;
  }
}

function onLoad() {
  const query = input.value;
  page += 1;
  fetchPhoto(query, page);
  // if (page === response.data.totalHits / per_page) {
  //       load.hidden = true;
  //     }
}

// const options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 1.0,
// };

// const observer = new IntersectionObserver(onInfinityLoad, options);
// console.log('IntersectionObserver', observer);

// function onInfinityLoad(entries, observe) {
//   console.log(entries);
//   entries.forEach(entry => {
//     // console.log('entry', entry);

//     if (entry.isIntersecting) {
//       const query = input.value;
//       page += 1;
//       fetchPhoto(query, page);

//       // if (page === response.data.totalHits / per_page) {
//       //   observer.unobserve(guard);
//       // }
//     }
//   });
// }
