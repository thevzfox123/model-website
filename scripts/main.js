import { cards } from "./card-object/cards.js";

let cardsHTML = ``;

cards.map((card) => {
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
        <span class="span-icons" title="like"><i class="ri-heart-fill" data-id="${card.id}"></i></span>
        
      </div>

      <div class="card-button">
    <button>contact</button>
  </div>
    </div>

    </div>
  `
});

const gridEone = document.querySelector('.card__grid');

gridEone.innerHTML = cardsHTML;

let likedCards = JSON.parse(localStorage.getItem('likedCards') || '[]');

document.querySelectorAll('.ri-heart-fill').forEach(icon => {
  const cardId = parseInt(icon.dataset.id);

  // Check if the card is liked
  if (likedCards.includes(cardId)) {
    icon.classList.add('active');
  }

  icon.addEventListener('click', () => {
    icon.classList.toggle('active');

    // Find the closest .card container
    const card = icon.closest('.card');

    // Find the heart animation image inside that card
    const heartImg = card.querySelector('.heart-animation');

    // Trigger animation
    if (heartImg) {
      heartImg.classList.add('animate');

      // Remove animation class after animation ends
      heartImg.addEventListener('animationend', () => {
        heartImg.classList.remove('animate');
      }, { once: true });
    }

    // Update localStorage
    if (icon.classList.contains('active')) {
      if (!likedCards.includes(cardId)) likedCards.push(cardId);
    } else {
      likedCards = likedCards.filter(id => id !== cardId);
    }

    localStorage.setItem('likedCards', JSON.stringify(likedCards));
  });
});
