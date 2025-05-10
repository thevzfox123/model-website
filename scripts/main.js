import { cards } from "./card-object/cards.js";

let cardsHTML = ``;

cards.forEach((card) => {
  const initialLikes = getStoredLikes(card.id);

  cardsHTML += `
  <div class="card">
    <article class="card__article">
      <img src="${card.imgUrl}" alt="Ava Monroe" class="card__image">
      <img src="images/heart.png" alt="❤" class="heart-animation">        
    </article>

    <div class="card__info">
      <h2 class="card__name">${card.name}</h2>
      <p class="card__title">${card.tags}</p>
      <p class="card__location">${card.location}</p>
      <div class="card__tags">${card.tags ? card.tags.map(tag => `<span class="tag">${tag}</span>`).join("") : ""}</div>

      <div class="card__footer">
        <span class="card__rating">
          <span class="rating__info">ratings:</span>
          <img src="images/ratings/rating-${Math.round(card.rating * 10)}.png" alt="rating">
        </span>
        <span class="span-icons" title="like">
          <i class="ri-heart-fill like-icon" data-id="${card.id}"></i>
        </span>
      </div>

      <div class="card-button">
        <button>contact</button>
      </div>
    </div>

    <span class="likes">${initialLikes}</span>
  </div>
  `;
});

const gridEone = document.querySelector('.card__grid');
gridEone.innerHTML = cardsHTML;

let likedCards = JSON.parse(localStorage.getItem('likedCards') || '[]');
let likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');

function getStoredLikes(cardId) {
  const counts = JSON.parse(localStorage.getItem('likeCounts') || '{}');
  return counts[cardId] || 0;
}

document.querySelectorAll('.ri-heart-fill').forEach(icon => {
  const cardId = icon.dataset.id;
  const card = icon.closest('.card');
  const likeCountSpan = card.querySelector('.likes');
  const heartImg = card.querySelector('.heart-animation');

  if (likedCards.includes(parseInt(cardId))) {
    icon.classList.add('active');
  }

  icon.addEventListener('click', () => {
    icon.classList.toggle('active');

    let currentCount = parseInt(likeCountSpan.textContent) || 0;

    if (icon.classList.contains('active')) {
      if (!likedCards.includes(parseInt(cardId))) {
        likedCards.push(parseInt(cardId));
        currentCount++;
      }
    } else {
      likedCards = likedCards.filter(id => id !== parseInt(cardId));
      currentCount = Math.max(currentCount - 1, 0);
    }

    likeCountSpan.textContent = currentCount;
    likeCounts[cardId] = currentCount;

    localStorage.setItem('likedCards', JSON.stringify(likedCards));
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));

    if (heartImg) {
      heartImg.classList.add('animate');
      heartImg.addEventListener('animationend', () => {
        heartImg.classList.remove('animate');
      }, { once: true });
    }
  });
});

// Hamburger menu
const hamburgerElement = document.querySelector('.hamburger'); 
const navbar = document.querySelector('.nav');

hamburgerElement.addEventListener('click', (e) => {
  e.stopPropagation(); 
  navbar.classList.toggle('nav__open');
});

document.addEventListener('click', () => {
  if (navbar.classList.contains('nav__open')) {
    navbar.classList.remove('nav__open');
  }
});
