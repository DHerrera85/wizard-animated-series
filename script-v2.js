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

  const secretVault = document.getElementById('secretVault');
  const vaultStatus = document.getElementById('vaultStatus');
  const vaultProgressText = document.getElementById('vaultProgressText');
  const vaultProgressBar = document.getElementById('vaultProgressBar');
  const vaultUnlockGoal = 3;

  const rpgMeta = {
    'batman-animated': {
      className: 'Dark Hero Series',
      special: 'Noir Legacy',
      description: 'A prestige animated icon with strong noir identity, premium storytelling and long-term cultural impact.',
      evolution: [
        'Batman: The Animated Series',
        'The New Batman Adventures',
        'Batman Beyond'
      ]
    },
    'xmen-animated': {
      className: 'Team Hero Series',
      special: 'Serialized Continuity',
      description: 'A team-based card with strong continuity, mutant drama and one of the clearest bridges between decades.',
      evolution: [
        'Pryde of the X-Men',
        'X-Men: The Animated Series',
        'Wolverine and the X-Men',
        "X-Men '97"
      ]
    },
    'spiderman-animated': {
      className: 'Solo Hero Series',
      special: 'Villains Gallery',
      description: 'A flexible gateway card with broad recognition, strong villain variety and classic 90s action appeal.',
      evolution: [
        'Spider-Man: The Animated Series',
        'Spider-Man Unlimited',
        'The Spectacular Spider-Man',
        'Ultimate Spider-Man'
      ]
    },
    'superman-animated': {
      className: 'Legacy Hero Series',
      special: 'Heroic Mythmaking',
      description: 'A bright heroic card that balances classic mythology, clean design and accessible adventure.',
      evolution: [
        'Superman: The Animated Series',
        'Justice League',
        'Justice League Unlimited'
      ]
    },
    spawn: {
      className: 'Adult Prestige',
      special: 'Dark Cult Energy',
      description: 'A darker adult-oriented card that expands the deck beyond Saturday morning animation.',
      evolution: [
        'Spawn',
        'Adult Animation Prestige',
        'Cult Legacy'
      ]
    },
    wildcats: {
      className: 'Cult Team Series',
      special: 'Deep Cut Pull',
      description: 'A specialist collector card that gives the deck archive value beyond the obvious classics.',
      evolution: [
        'WildC.A.T.S',
        'Image Era Animation',
        'Cult Archive'
      ]
    },
    'silver-surfer': {
      className: 'Cosmic Cult Series',
      special: 'Cosmic Rarity',
      description: 'A short-lived but visually distinct card with strong rare-find value inside the collection.',
      evolution: [
        'Silver Surfer',
        'Cosmic Marvel Animation',
        'Lost / Cult Branch'
      ]
    },
    'avengers-united': {
      className: 'Lost Team Prototype',
      special: 'Completionist Value',
      description: 'A rare-find card with uneven legacy but strong appeal for users who want to complete the archive.',
      evolution: [
        'The Avengers: United They Stand',
        'Team Prototype',
        'Modern Avengers Animation'
      ]
    }
  };

  const deckGridSection = document.querySelector('.deck-grid-section');

  const detailPanel = document.createElement('section');
  detailPanel.className = 'card-detail-panel';
  detailPanel.id = 'cardDetailPanel';
  detailPanel.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="section-kicker">RPG card file</p>
        <h2 id="detailTitle">Select a card</h2>
      </div>
      <p id="detailSubtitle">Choose a card to inspect its RPG profile.</p>
    </div>

    <div class="detail-layout">
      <div class="detail-poster-wrap">
        <img id="detailPoster" src="" alt="" />
      </div>

      <div class="detail-content">
        <div class="detail-badges">
          <span id="detailRarity">Rarity</span>
          <span id="detailClass">Class</span>
        </div>

        <p id="detailDescription" class="detail-description"></p>

        <div class="detail-stats" id="detailStats"></div>

        <div class="detail-special">
          <strong>Special Skill</strong>
          <p id="detailSpecial"></p>
        </div>

        <div class="detail-evolution">
          <strong>Evolution Path</strong>
          <div id="detailEvolution" class="evolution-path"></div>
        </div>

        <dl class="detail-meta">
          <div>
            <dt>Year</dt>
            <dd id="detailYear"></dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd id="detailNetwork"></dd>
          </div>
          <div>
            <dt>Seasons</dt>
            <dd id="detailSeasons"></dd>
          </div>
          <div>
            <dt>Episodes</dt>
            <dd id="detailEpisodes"></dd>
          </div>
        </dl>
      </div>
    </div>
  `;

  if (deckGridSection) {
    deckGridSection.after(detailPanel);
  }

  const readCardStats = card => {
    const statItems = Array.from(card.querySelectorAll('.stat-strip li'));

    return statItems.map(item => {
      const text = item.textContent.trim();
      const match = text.match(/^(.+?)\s+(\d+)$/);

      return {
        label: match ? match[1] : text,
        value: match ? match[2] : ''
      };
    });
  };

  const renderCardDetail = card => {
    if (!card) return;

    const cardId = card.dataset.cardId;
    const meta = rpgMeta[cardId] || {};
    const poster = card.querySelector('img');
    const rarity = card.querySelector('.rarity-badge')?.textContent.trim() || 'Card';
    const stats = readCardStats(card);

    cards.forEach(item => item.classList.remove('is-detail-active'));
    card.classList.add('is-detail-active');

    document.getElementById('detailTitle').textContent = card.dataset.title;
    document.getElementById('detailSubtitle').textContent =
      `${card.dataset.year} · ${card.dataset.publisher} · ${card.dataset.network}`;

    document.getElementById('detailPoster').src = poster?.getAttribute('src') || '';
    document.getElementById('detailPoster').alt = poster?.getAttribute('alt') || card.dataset.title;

    document.getElementById('detailRarity').textContent = rarity;
    document.getElementById('detailClass').textContent = meta.className || 'Animated Series Card';
    document.getElementById('detailDescription').textContent = meta.description || card.dataset.note;
    document.getElementById('detailSpecial').textContent = meta.special || 'Collector Value';

    document.getElementById('detailYear').textContent = card.dataset.year;
    document.getElementById('detailNetwork').textContent = card.dataset.network;
    document.getElementById('detailSeasons').textContent = card.dataset.seasons;
    document.getElementById('detailEpisodes').textContent = card.dataset.episodes;

    document.getElementById('detailStats').innerHTML = stats.map(stat => `
      <div class="detail-stat">
        <span>${stat.label}</span>
        <strong>${stat.value}</strong>
      </div>
    `).join('');

    const evolution = meta.evolution || [card.dataset.title];

    document.getElementById('detailEvolution').innerHTML = evolution.map((step, index) => `
      <span class="evolution-node${index === 0 ? ' is-current' : ''}">${step}</span>
    `).join('<span class="evolution-arrow">→</span>');
  };

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

    const renderVault = () => {
      if (!secretVault) return;

      const savedCount = deck.size;
      const progress = Math.min(savedCount / vaultUnlockGoal, 1) * 100;
      const isUnlocked = savedCount >= vaultUnlockGoal;

      secretVault.classList.toggle('is-locked', !isUnlocked);
      secretVault.classList.toggle('is-unlocked', isUnlocked);

      if (vaultProgressText) {
        vaultProgressText.textContent = isUnlocked
          ? 'Vault unlocked'
          : `${savedCount} / ${vaultUnlockGoal} cards saved`;
      }

      if (vaultProgressBar) {
        vaultProgressBar.style.width = `${progress}%`;
      }

      if (vaultStatus) {
        vaultStatus.textContent = isUnlocked
          ? 'Unlocked · Hidden pilot files are now available.'
          : `Locked · Save ${vaultUnlockGoal - savedCount} more card${vaultUnlockGoal - savedCount === 1 ? '' : 's'} to unlock hidden pilot files.`;
      }
    };
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
    renderCardDetail(selected);
    selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  cards.forEach(card => {
    const actions = card.querySelector('.card-actions');
    const deckButton = card.querySelector('.deck-toggle');
    const compareButton = card.querySelector('.compare-toggle');

    const viewButton = document.createElement('button');
    viewButton.className = 'view-card-toggle';
    viewButton.type = 'button';
    viewButton.textContent = 'View card';

    if (actions) {
      actions.prepend(viewButton);
    }

    viewButton.addEventListener('click', event => {
      event.stopPropagation();
      renderCardDetail(card);
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    card.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      renderCardDetail(card);
    });

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
      renderVault();
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
  renderVault();
  renderCompare();
  renderCardDetail(cards[0]);
});