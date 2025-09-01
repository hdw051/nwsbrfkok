// edit-script.js
// Logica voor de bewerkpagina. Gebruikers kunnen hier de waarden van
// velden aanpassen, het resultaat bekijken en de gegenereerde HTML kopiëren.

document.addEventListener('DOMContentLoaded', () => {
  // Haal kaart-id uit de querystring
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get('id');
  const card = window.cards.find(c => c.id === cardId);

  if (!card) {
    document.body.innerHTML = '<p style="padding:2rem;font-size:18px;color:#b48a19;">Kaart niet gevonden.</p>';
    return;
  }

  const editTitle = document.getElementById('editTitle');
  const form = document.getElementById('editForm');
  const previewArea = document.getElementById('previewArea');
  const codeArea = document.getElementById('codeArea');
  const copyButton = document.getElementById('copyButton');
  const resetButton = document.getElementById('resetButton');
  const toggleCodeBtn = document.getElementById('toggleCodeBtn');
  const codeWrapper = document.getElementById('codeWrapper');
  const toast = document.getElementById('toast');

  editTitle.textContent = card.name;

  // Houd huidige waarden bij in state-object
  const state = {};
  card.fields.forEach(field => {
    state[field.name] = field.default || '';
    // Maak formulier item
    const wrapper = document.createElement('div');
    wrapper.className = 'form-field';
    const label = document.createElement('label');
    label.setAttribute('for', field.name);
    label.textContent = field.label;
    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      const hint = document.createElement('div');
      hint.className = 'field-hint';
      hint.textContent = 'Tip: gebruik *italic* en [tekst](link)';
      wrapper.appendChild(hint);
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }
    input.id = field.name;
    input.name = field.name;
    input.value = field.default || '';
    input.addEventListener('input', () => {
      state[field.name] = input.value;
      update();
    });
    // dataset attributen voor zoeken zijn niet meer nodig
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });

  /**
   * Genereer nieuwe HTML, update voorbeeld en codeveld.
   */
  function update() {
    try {
      let html = card.template(state);
      // Strip buitenste padding uit de eerste tabelcel zodat kaarten geen extra marge toevoegen
      html = stripOuterPadding(html);
      // Schrijf HTML in preview
      previewArea.innerHTML = html;
      // Pas beeld-instellingen (pan/zoom) toe voordat we de code tonen
      applyImageAdjustments();
      // Codeveld toont de aangepaste HTML zodat output overeenkomt met de preview
      codeArea.textContent = previewArea.innerHTML;
      // Na het updaten van de HTML moeten we opnieuw de dragfunctionaliteit
      // initialiseren voor alle afbeeldingen met data-field. Zonder deze
      // stap zouden de events verloren gaan omdat previewArea.innerHTML
      // wordt overschreven.
      setupImageDragging();
    } catch (e) {
      console.error('Fout bij genereren van kaart:', e);
    }
  }

  // Verwijder de buitenste padding (links/rechts/boven/onder) van de eerste td in de kaart
  function stripOuterPadding(html) {
    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html.trim();
      const firstTd = tmp.querySelector('table > tbody > tr > td') || tmp.querySelector('table tr td');
      if (firstTd) {
        const style = firstTd.getAttribute('style') || '';
        let newStyle;
        if (/padding\s*:/i.test(style)) {
          newStyle = style.replace(/padding\s*:\s*[^;\"]*;?/i, 'padding:0;');
        } else {
          newStyle = (style ? style + ' ' : '') + 'padding:0;';
        }
        firstTd.setAttribute('style', newStyle);
      }
      return tmp.innerHTML;
    } catch (e) {
      return html;
    }
  }

  /**
   * Pas voor alle img[data-field] pan (object-position X/Y) en zoom toe vanuit state
   * zodat zowel preview als uiteindelijke HTML hetzelfde weergeven.
   */
  function applyImageAdjustments() {
    const imgs = previewArea.querySelectorAll('img[data-field]');
    imgs.forEach(img => {
      const fieldName = img.dataset.field;
      // Positie
      const posX = parseFloat(state[fieldName + 'PosX'] || '50');
      const posY = parseFloat(state[fieldName + 'PosY'] || state[fieldName + 'Pos'] || '50');
      // Zoom (100 = 1.0x)
      // Beperk tot maximaal 100% zodat we nooit boven oorspronkelijke grootte gaan
      const zoom = Math.max(50, Math.min(100, parseFloat(state[fieldName + 'Zoom'] || '100')));
      img.style.objectPosition = `${posX}% ${posY}%`;
      img.style.transformOrigin = `${posX}% ${posY}%`;
      img.style.transform = `scale(${(zoom / 100).toFixed(2)})`;
    });
  }

  /**
   * Ken dragfunctionaliteit toe aan alle afbeeldingen met data-field in de preview.
   * Hiermee kan de gebruiker de verticale positie van de afbeelding aanpassen
   * door te slepen. Het aangepaste percentage wordt opgeslagen in de state
   * onder de sleutel `${field}Pos` (bijv. imagePos, image1Pos), zodat het
   * wordt meegenomen in de HTML output. De preview wordt tijdens het slepen
   * direct aangepast en bij het loslaten van de muis opnieuw gerenderd via update().
   */
  function setupImageDragging() {
    const imgs = previewArea.querySelectorAll('img[data-field]');
    imgs.forEach(img => {
      // stijl cursor om aan te geven dat het element sleepbaar is
      img.style.cursor = 'grab';
      // Definieer de dragstart functie (pannen X/Y)
      function startDrag(event) {
        // voorkom standaard selecteeractie
        event.preventDefault();
        const getPoint = ev => {
          const p = ev.touches && ev.touches[0] ? ev.touches[0] : ev;
          return { x: p.clientX, y: p.clientY };
        };
        const start = getPoint(event);
        const fieldName = img.dataset.field;
        const posXKey = fieldName + 'PosX';
        const posYKey = fieldName + 'PosY';
        const initialX = parseFloat(state[posXKey] || '50');
        const initialY = parseFloat(state[posYKey] || state[fieldName + 'Pos'] || '50');
        const rect = img.getBoundingClientRect();
        // definieer move handler
        function moveHandler(ev) {
          const p = getPoint(ev);
          const dx = p.x - start.x;
          const dy = p.y - start.y;
          let newX = initialX + (dx / rect.width) * 100;
          let newY = initialY + (dy / rect.height) * 100;
          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));
          state[posXKey] = newX.toFixed(0);
          state[posYKey] = newY.toFixed(0);
          // pas object-position direct aan zodat gebruiker onmiddellijk het resultaat ziet
          img.style.objectPosition = `${newX}% ${newY}%`;
          img.style.transformOrigin = `${newX}% ${newY}%`;
        }
        // definieer end handler
        function endHandler() {
          document.removeEventListener('mousemove', moveHandler);
          document.removeEventListener('mouseup', endHandler);
          document.removeEventListener('touchmove', moveHandler);
          document.removeEventListener('touchend', endHandler);
          // hergenereer preview zodat nieuwe state waarden in HTML worden verwerkt
          update();
        }
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', endHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', endHandler);
      }
      // Koppel mousedown en touchstart aan startDrag. Door deze toewijzing
      // telkens opnieuw te doen na update() wordt voorkomen dat meerdere
      // listeners blijven hangen op hetzelfde element.
      img.onmousedown = startDrag;
      img.ontouchstart = startDrag;

      // Zoom met muiswiel / trackpad pinch
      function onWheel(ev) {
        ev.preventDefault();
        const fieldName = img.dataset.field;
        const zoomKey = fieldName + 'Zoom';
        const current = parseFloat(state[zoomKey] || '100');
        const delta = ev.deltaY > 0 ? -5 : 5;
        // Maximaal 100% (1.0x), minimaal 50%
        let next = Math.max(50, Math.min(100, current + delta));
        state[zoomKey] = String(next);
        const posX = parseFloat(state[fieldName + 'PosX'] || '50');
        const posY = parseFloat(state[fieldName + 'PosY'] || state[fieldName + 'Pos'] || '50');
        img.style.transformOrigin = `${posX}% ${posY}%`;
        img.style.transform = `scale(${(next / 100).toFixed(2)})`;
      }
      img.addEventListener('wheel', onWheel, { passive: false });
    });
  }

  // Kopieer knop
  copyButton.addEventListener('click', () => {
    const text = codeArea.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('HTML gekopieerd naar klembord');
      });
    } else {
      // fallback: selecteer tekst en probeer te kopiëren
      const range = document.createRange();
      range.selectNodeContents(codeArea);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try {
        document.execCommand('copy');
        showToast('HTML gekopieerd naar klembord');
      } catch (err) {
        showToast('Kopiëren mislukt');
      }
      sel.removeAllRanges();
    }
  });

  // Reset naar defaults
  resetButton.addEventListener('click', () => {
    card.fields.forEach(field => {
      state[field.name] = field.default || '';
      const el = document.getElementById(field.name);
      if (el) el.value = state[field.name];
    });
    update();
    showToast('Velden teruggezet naar standaard');
  });

  // Zoekveld verwijderd

  // Toon/verberg HTML-code
  toggleCodeBtn.addEventListener('click', () => {
    const isHidden = codeWrapper.style.display === 'none';
    codeWrapper.style.display = isHidden ? '' : 'none';
  });

  /**
   * Toon een toastmelding onderin het scherm.
   * @param {string} message
   */
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Eerste keer renderen
  update();
});