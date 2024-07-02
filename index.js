const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
          </a>
        </li>`
    )
    .join('');
}


const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const closeButton = document.querySelector('.lightbox__button');



gallery.innerHTML = createGalleryMarkup(galleryItems);


function openModal(event) {
  event.preventDefault();
  if (event.target.tagName !== 'IMG') {
    return;
  }

  lightbox.classList.add('is-open');
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;


  document.addEventListener('keydown', handleKeyPress);
}


function closeModal() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = ''; 
  lightboxImage.alt = '';


  document.removeEventListener('keydown', handleKeyPress);
}


function handleKeyPress(event) {
  switch (event.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowRight':
      navigate(1);
      break;
    case 'ArrowLeft':
      navigate(-1); 
      break;
  }
}


function navigate(direction) {
  const currentIndex = galleryItems.findIndex(
    (item) => item.original === lightboxImage.src
  );
  let newIndex = currentIndex + direction;


  if (newIndex < 0) {
    newIndex = galleryItems.length - 1;
  } else if (newIndex >= galleryItems.length) {
    newIndex = 0;
  }

  const newItem = galleryItems[newIndex];
  lightboxImage.src = newItem.original;
  lightboxImage.alt = newItem.description;
}


gallery.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
lightboxOverlay.addEventListener('click', closeModal);