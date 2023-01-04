import allGenres from './genres.json';
import { modal } from './modal';

const refs = {
  cardsListLibrary: document.querySelector('.cards__list--library'),
  cardsList: document.querySelector('.cards__list'),
}
  
refs.cardsList.addEventListener('click', onClickCard);
function onClickCard(event) {
  let idFilm = 0;
  event.preventDefault();
  idFilm = event.path[2].id;
  if (idFilm) {
    modal.classList.remove('is-hidden');
  }
}
function createCard(response) {
  const card = response.results.map(({ id, poster_path, title, release_date, genre_ids }) => 
           `<li class="cards__item" id="${id}">
        <a class="cards__link">
            <img class="cards__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" loading="lazy">
        </a>
            <div class="cards__text"><h2 class="cards__name">${getShortName(
              title
            )}</h2>
            <p class="cards__genres"> ${findGenresOfMovie(
              genre_ids
            )} | ${createYear(release_date)}</p>
            </div>
        </li>`
    )
        .join('');
    refs.cardsList.insertAdjacentHTML("beforeend", card);
}

//отображение года выпуска
function createYear(data) {
  if (data) {
    return data.slice(0, 4);
  } else {
    return (data = 'Not found');
  }
}

//обрезка название
function getShortName(string) {
  if (string) {
    if (string.length >= 32) {
      return string.substr(0, 32) + '...';
    }
    return string;
  }
}

// жанр
const { genres } = allGenres;
function findGenresOfMovie(ids) {
  const arr = ids.flatMap(id => genres.filter(element => element.id === id));
  let movieGenres = arr.map(el => el.name);
  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);
    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  if (movieGenres.length === 0) {
    return (movieGenres = 'Not found');
  }
  return movieGenres.join(', ');
}

export {
  createCard,
  findGenresOfMovie,  
};



























// import allGenres from './genres.json';

// const cardsListLibrary = document.querySelector('.cards__list--library');
// const cardsList = document.querySelector('.cards__list');

// //создание карточки
// function createCard(data) {
//   return data
//     .map(obj => {
//       const { id, poster_path, title, release_date, genre_ids } = obj;
//       return `<li class="cards__item" id="${id}">
//         <a class="cards__link">
//             <img class="cards__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" loading="lazy">
//         </a>
//             <div class="cards__text"><h2 class="cards__name">${getShortName(
//               title
//             )}</h2>
//             <p class="cards__genres"> ${findGenresOfMovie(
//               genre_ids
//             )} | ${createYear(release_date)}</p>
//             </div>
//         </li>`;
//     })
//     .join('');
// }

// //вставка разметки
// function insertMarkup(htmlMarkup, htmlEl) {
//   htmlEl.innerHTML = htmlMarkup;
// }
// //отображение года выпуска
// function createYear(data) {
//   if (data) {
//     return data.slice(0, 4);
//   } else {
//     return (data = 'Not found');
//   }
// }
// //обрезка название
// function getShortName(string) {
//   if (string) {
//     if (string.length >= 32) {
//       return string.substr(0, 32) + '...';
//     }
//     return string;
//   }
// }
// // жанр
// const { genres } = allGenres;
// function findGenresOfMovie(ids) {
//   const arr = ids.flatMap(id => genres.filter(element => element.id === id));
//   let movieGenres = arr.map(el => el.name);
//   if (movieGenres.length > 2) {
//     const removedGenres = movieGenres.splice(0, 2);
//     removedGenres.push('Other');
//     return removedGenres.join(', ');
//   }
//   if (movieGenres.length === 0) {
//     return (movieGenres = 'Not found');
//   }
//   return movieGenres.join(', ');
// }
// export {
//   createCard,
//   insertMarkup,
//   findGenresOfMovie,
//   cardsList,
//   cardsListLibrary,
// };
