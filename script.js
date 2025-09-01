// script.js
// Dit script bouwt de indexpagina van de kaartenbibliotheek. Het laadt de
// kaartdefinities uit cards.js, genereert filterknoppen, toont de
// voorbeeldkaarten en verzorgt navigatie naar de bewerkpagina.

document.addEventListener('DOMContentLoaded', () => {
  const filterNav = document.getElementById('filterNav');
  const cardsContainer = document.getElementById('cardsGrid');

  // Breng alle bestaande categorieën onder in de nieuwe set:
  // headers, teksten, cta, stijlelementen, media, specials
  function mapToNewCategory(card) {
    const id = String(card.id || '').toLowerCase();
    const oldCat = String(card.category || '').toLowerCase();

    // Specials eerst: expliciet gemarkeerde specials blijven specials
    if (oldCat === 'special' || oldCat === 'speciale stijl') return 'specials';

    // Headers
    if (id.startsWith('header-')) return 'headers';

    // Stijlelementen (scheidingslijnen, spacers, gradients)
    if (
      id.includes('divider') ||
      id.includes('separator') ||
      id.includes('spacer') ||
      id.includes('gradient') ||
      id.includes('band')
    ) {
      return 'stijlelementen';
    }

    // Media (foto, video, gallery, kaart, profiel)
    if (
      oldCat === 'foto' ||
      id.includes('photo') ||
      id.includes('video') ||
      id.includes('gallery') ||
      id.includes('map') ||
      id.includes('profile')
    ) {
      return 'media';
    }

    // CTA (knoppen, aanbiedingen, events, prijzen, nieuwsbrief, kalender)
    if (
      id.includes('button') ||
      id.includes('cta') ||
      id.includes('coupon') ||
      id.includes('newsletter') ||
      id.includes('event') ||
      id.includes('price') ||
      id.includes('calendar')
    ) {
      return 'cta';
    }

    // Overige content/info -> teksten
    return 'teksten';
  }

  // Pas nieuwe categorieën toe op alle kaarten
  window.cards.forEach(card => {
    card.category = mapToNewCategory(card);
  });

  // Verzamel unieke categorieën uit de kaartdefinities
  const categorySet = new Set();
  window.cards.forEach(card => categorySet.add(card.category));
  // Voeg een speciaal item 'alle' toe voor de filter
  const desiredOrder = ['headers', 'teksten', 'cta', 'stijlelementen', 'media', 'specials'];
  const categories = ['alle', ...desiredOrder.filter(c => categorySet.has(c))];

  /**
   * Vertaal categoriecodes naar leesbare labels voor de navigatie.
   * @param {string} cat
   * @returns {string}
   */
  function labelForCategory(cat) {
    const mapping = {
      headers: 'Headers',
      teksten: 'Teksten',
      cta: 'CTA',
      stijlelementen: 'Stijlelementen',
      media: 'Media',
      specials: 'Specials',
      alle: 'Alles'
    };
    return mapping[cat] || cat;
  }

  // Bouw filterknoppen en ken click handlers toe
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = labelForCategory(cat);
    btn.dataset.cat = cat;
    if (cat === 'alle') btn.classList.add('active');
    filterNav.appendChild(btn);
  });

  /**
   * Genereer een object met standaardwaarden voor de velden van een kaart.
   * @param {Object} card
   * @returns {Object}
   */
  function getDefaultValues(card) {
    const vals = {};
    card.fields.forEach(f => {
      vals[f.name] = f.default || '';
    });
    return vals;
  }

  /**
   * Bouw de volledige structuur met categorieën en bijbehorende kaarten.
   * Elk categorieblok bevat een titel en een grid met kaarten. Dit zorgt voor
   * een overzichtelijke weergave, waarbij de gebruiker desgewenst met de
   * filterknoppen één categorie kan tonen.
   */
  function buildGroups() {
    // Maak container leeg
    cardsContainer.innerHTML = '';
    const groups = {};
    // Maak een groep voor elke categorie in de gewenste volgorde
    desiredOrder.forEach(cat => {
      if (!categorySet.has(cat)) return;
      const group = document.createElement('div');
      group.className = 'category-group';
      group.dataset.cat = cat;
      // Titel
      const heading = document.createElement('h2');
      heading.className = 'category-title';
      heading.textContent = labelForCategory(cat);
      group.appendChild(heading);
      // Grid voor kaarten binnen deze categorie
      const grid = document.createElement('div');
      grid.className = 'cards-group-grid';
      group.appendChild(grid);
      cardsContainer.appendChild(group);
      groups[cat] = grid;
    });
    // Plaats elke kaart in zijn categorie-grid
    window.cards.forEach(card => {
      const defaults = getDefaultValues(card);
      const htmlSnippet = card.template(defaults);
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card-preview';
      cardDiv.dataset.id = card.id;
      // Voorbeeld
      const contentDiv = document.createElement('div');
      contentDiv.className = 'card-content';
      contentDiv.innerHTML = htmlSnippet;
      // Alleen de kaart zelf tonen, zonder titel/naam eronder
      cardDiv.appendChild(contentDiv);
      // Klik navigatie
      cardDiv.addEventListener('click', () => {
        window.location.href = 'edit.html?id=' + encodeURIComponent(card.id);
      });
      // Append naar de juiste categorie
      const targetGrid = groups[card.category];
      if (targetGrid) {
        targetGrid.appendChild(cardDiv);
      }
    });
  }

  /**
   * Toon alleen groepen die overeenkomen met het geselecteerde filter.
   * @param {string} cat
   */
  function filterGroups(cat) {
    // Update actieve knop
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`nav button[data-cat='${cat}']`);
    if (activeBtn) activeBtn.classList.add('active');
    // Toon of verberg groepen
    document.querySelectorAll('.category-group').forEach(group => {
      if (cat === 'alle' || group.dataset.cat === cat) {
        group.style.display = '';
      } else {
        group.style.display = 'none';
      }
    });
  }

  // Bouw de groepen zodra de pagina geladen is
  buildGroups();

  // Klik op filterknoppen: gebruik event-delegation op de nav
  filterNav.addEventListener('click', e => {
    if (e.target && e.target.tagName === 'BUTTON') {
      const cat = e.target.dataset.cat;
      filterGroups(cat);
    }
  });

  // Initialiseer: toon alle groepen
  filterGroups('alle');
});