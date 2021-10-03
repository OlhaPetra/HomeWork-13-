import ImagesApiService from './js/apiService.js';
import refs from './js/refs';
const { searchForm, imgContainer, box } = refs;
console.log(imgContainer);

import LoadMoreButton from './js/load-more-btn';
import imgTempl from './tamplate/imgTempl.hbs';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const loadMoreBtn = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: false,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoad);

const imagesApiService = new ImagesApiService();

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value.trim();
  console.log(imagesApiService.query);

  if (imagesApiService.query === '') {
    return errorSearch();
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImgMarkup();
  loadImg();
}

function onLoad() {
  loadImg();
}

function loadImg() {
  loadMoreBtn.disabled();
  imagesApiService.fetchImages().then(imgs => {
     if (imgs.length===0) {
      noImages()
      loadMoreBtn.hide();
    } else if (imgs.length <12) {
      appendImgMarkup(imgs);
      noSearch()
      loadMoreBtn.hide();
    } 
    else {
      appendImgMarkup(imgs);
       loadMoreBtn.enable();
         scrollEnd();
    }
  });
}

function appendImgMarkup(imgs) {
  imgContainer.insertAdjacentHTML('beforeend', imgTempl(imgs));
}

function clearImgMarkup() {
  imgContainer.innerHTML = '';
}

function scrollEnd() {
  imgContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function errorSearch() {
  error({ text: 'Введите точнее, что хотите найти!' });
}

function noSearch() {
  error({ text: 'Больше нет картинок по запросу!' });
}

function noImages() {
  error({ text: 'По Вашему запросу нет картинок. Введите другой запрос!' });
}