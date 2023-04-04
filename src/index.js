const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35004326-8dd8488139d702cdf649647db';
const per_page = 5;

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const guard = document.querySelector('.js-guard');

// console.log('guard', guard);

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
  //   const query = event.target.elements['searchQuery'].value.trim();
  const query = input.value.trim();
  //   console.log(query);
  gallery.innerHTML = '';

  fetchPhoto(query);
}
form.addEventListener('submit', hendlSearchImg);

let page = 1;

async function fetchPhoto(query, page) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();

    console.log('result', result);

    markUp(result.hits);
    observer.observe(guard);
  } catch (err) {
    throw err;
  }
}

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onInfinityLoad, options);
console.log('IntersectionObserver', observer);

function onInfinityLoad(entries, observe) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const query = input.value;
      page += 1;
      fetchPhoto(query, page).then(data => {
        // console.log('date', date);
        markUp(data.hits);
      });
    }
  });
}
