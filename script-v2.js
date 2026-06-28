document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'wizardDeckV2';
  const cards = Array.from(document.querySelectorAll('.deck-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-chip'));
  const deckList = document.getElementById('deckList');
  const deckSummary = document.getElementById('deckSummary');
  const collectionCount = document.getElementById('collectionCount');
  const compareHint = document.getElementById('compareHint');
  const compareGrid = document.getElementById('compareGrid');
  const statusText = document.getElementById('statusText');
  const sortSelect = document.getElementById('sortCards');
  const openDeckButtons = document.querySelectorAll('[data-open-deck]');
  const drawRandomCardButton = document.getElementById('drawRandomCard');
  const jumpRandomButton = document.getElementById('jumpRandom');
  const jumpCompareButton = document.getElementById('jumpCompare');
  const cardGrid = document.getElementById('cardGrid');

  const deck = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  const compareQueue = [];
  let activeFilter = 'all';

  const getVisibleCards = () => cards.filter(card => !card.classList.contains('is-hidden'));

  const renderDeck = () => {
    const savedCards = cards.filter(card => deck.has(card.dataset.cardId));

    collectionCount.textContent = String(savedCards.length);
    deckSummary.textContent = savedCards.length
      ? `${savedCards.length} card${savedCards.length === 1 ? '' : 's'} saved in your collector deck.`
      : 'No cards saved yet.';

    deckList.innerHTML = '';

    if (!savedCards.length) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'deck-empty';
      emptyItem.textContent = 'Use Add to deck on any card to start building your collection.';
      deckList.appendChild(emptyItem);
      return;
    }

    savedCards.forEach(card => {
      const item = document.createElement('li');
      item.innerHTML = `
        <h3 class="deck-item-title">${card.dataset.title}</h3>
        <p class="deck-item-meta">${card.dataset.year} · ${card.dataset.publisher} · ${card.dataset.seasons}</p>
      `;
      deckList.appendChild(item);
    });
  };

  const syncDeckButtons = () => {
    cards.forEach(card => {
      const isSaved = deck.has(card.dataset.cardId);
      const deckButton = card.querySelector('.deck-toggle');
      deckButton.classList.toggle('is-added', isSaved);
      deckButton.textContent = isSaved ? 'Saved to deck' : 'Add to deck';
      deckButton.setAttribute('aria-pressed', String(isSaved));
    });
  };

  const renderCompare = () => {
    compareGrid.innerHTML = '';

    if (!compareQueue.length) {
      compareHint.textContent = 'Select up to two cards to compare.';
    } else if (compareQueue.length === 1) {
      compareHint.textContent = 'Select one more card to complete the comparison.';
    } else {
      compareHint.textContent = 'Comparison ready. Swap a card any time.';
    }

    const filledCards = compareQueue.map(cardId => cards.find(card => card.dataset.cardId === cardId)).filter(Boolean);

    for (let index = 0; index < 2; index += 1) {
      const card = filledCards[index];
      const slot = document.createElement('article');
      slot.className = 'compare-slot';

      if (!card) {
        slot.classList.add('is-empty');
        slot.innerHTML = `<p>${index === 0 ? 'Choose a card with the Compare button.' : 'Choose a second card to complete the face-off.'}</p>`;
        compareGrid.appendChild(slot);
        continue;
      }

      slot.innerHTML = `
        <h3>${card.dataset.title}</h3>
        <p class="compare-meta">${card.dataset.year} · ${card.dataset.publisher} · ${card.dataset.network}</p>
        <dl class="compare-data">
          <div>
            <dt>Seasons</dt>
            <dd>${card.dataset.seasons}</dd>
          </div>
          <div>
            <dt>Episodes</dt>
            <dd>${card.dataset.episodes}</dd>
          </div>
          <div>
            <dt>Publisher</dt>
            <dd>${card.dataset.publisher}</dd>
          </div>
          <div>
            <dt>Curator note</dt>
            <dd>${card.dataset.note}</dd>
          </div>
        </dl>
      `;
      compareGrid.appendChild(slot);
    }

    cards.forEach(card => {
      const button = card.querySelector('.compare-toggle');
      const isSelected = compareQueue.includes(card.dataset.cardId);
      button.classList.toggle('is-selected', isSelected);
      button.textContent = isSelected ? 'Selected' : 'Compare';
      button.setAttribute('aria-pressed', String(isSelected));
    });
  };

  const applyFilter = filter => {
    activeFilter = filter;
    let visibleCount = 0;

    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const visible = filter === 'all' ? true : tags.includes(filter);
      card.classList.toggle('is-hidden', !visible);
      if (visible) {
        visibleCount += 1;
      }
    });

    statusText.textContent = filter === 'all'
      ? 'Showing all featured cards.'
      : `Showing ${visibleCount} card${visibleCount === 1 ? '' : 's'} in ${filter}.`;
  };

  const sortCards = mode => {
    const cardMap = {
      rarity: card => -Number(card.dataset.rarity),
      year: card => Number(card.dataset.year),
      title: card => card.dataset.title.toLowerCase()
    };

    cards
      .slice()
      .sort((left, right) => {
        const leftValue = cardMap[mode](left);
        const rightValue = cardMap[mode](right);

        if (leftValue < rightValue) return -1;
        if (leftValue > rightValue) return 1;
        return 0;
      })
      .forEach(card => cardGrid.appendChild(card));
  };

  const spotlightRandomCard = () => {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) {
      return;
    }

    cards.forEach(card => card.classList.remove('is-spotlight'));
    const selected = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    selected.classList.add('is-spotlight');
    selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  cards.forEach(card => {
    const deckButton = card.querySelector('.deck-toggle');
    const compareButton = card.querySelector('.compare-toggle');

    deckButton.addEventListener('click', () => {
      const cardId = card.dataset.cardId;
      if (deck.has(cardId)) {
        deck.delete(cardId);
      } else {
        deck.add(cardId);
      }

      localStorage.setItem(storageKey, JSON.stringify(Array.from(deck)));
      syncDeckButtons();
      renderDeck();
    });

    compareButton.addEventListener('click', () => {
      const cardId = card.dataset.cardId;
      const existingIndex = compareQueue.indexOf(cardId);

      if (existingIndex >= 0) {
        compareQueue.splice(existingIndex, 1);
      } else {
        if (compareQueue.length === 2) {
          compareQueue.shift();
        }
        compareQueue.push(cardId);
      }

      renderCompare();
    });
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      applyFilter(button.dataset.filter);
    });
  });

  sortSelect.addEventListener('change', event => {
    sortCards(event.target.value);
    applyFilter(activeFilter);
  });

  openDeckButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('deckPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  drawRandomCardButton.addEventListener('click', spotlightRandomCard);
  jumpRandomButton.addEventListener('click', spotlightRandomCard);
  jumpCompareButton.addEventListener('click', () => {
    document.getElementById('comparePanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  sortCards('rarity');
  applyFilter('all');
  syncDeckButtons();
  renderDeck();
  renderCompare();
});