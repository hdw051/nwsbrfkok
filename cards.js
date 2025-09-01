/*
 * Definitie van alle kaarttemplates voor de interactieve kaartenbibliotheek.
 * Elke kaart bevat metadata (id, naam, categorie, beschrijving) en een lijst
 * van velden die de gebruiker kan invullen. Met het template()‑veld wordt
 * op basis van de ingevulde velden een bruikbaar HTML‑fragment gegenereerd
 * dat geschikt is voor e‑mail. Alle kaarttemplates gebruiken inline
 * stijlen om maximale compatibiliteit te garanderen.
 */

;(function () {
  /**
   * Escape een string voor gebruik in HTML. Hiermee worden speciale
   * tekens omgezet zodat gebruikersinvoer geen HTML kan breken.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Converteer eenvoudige markup naar veilige HTML:
   * - \n -> <br>
   * - *italic* -> <em>italic</em>
   * - [label](url) -> <a href="url">label</a>
   * Invoer wordt eerst HTML-geescaped zodat alleen deze patronen HTML produceren.
   * @param {string} input
   * @returns {string}
   */
  function renderRichText(input) {
    let out = escapeHtml(input || '');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#b48a19;text-decoration:underline;">$1</a>');
    out = out.replace(/\n/g, '<br>');
    return out;
  }

  /**
   * De kaartdefinities. Elk object beschrijft één kaarttype met bijbehorende
   * velden en een templatefunctie. De volgorde bepaalt de weergave op de
   * indexpagina.
   */
  const cards = [
    {
      id: 'simple-text',
      name: 'Eenvoudige tekstkaart',
      category: 'basis',
      description: 'Een simpele kaart met titel en tekst op een lichte achtergrond.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Typ hier de inhoud van de kaart.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'event-image-160',
      name: 'Event – 160×160 afbeelding met link',
      category: 'foto',
      description: 'Klikbare vierkante event-afbeelding (160×160) met afgeronde hoeken.',
      fields: [
        { name: 'link', label: 'Link URL', type: 'text', default: 'https://www.kokcinemaxx.nl/event/ladiesnight-onze-jongens3/' },
        { name: 'image', label: 'Afbeelding URL', type: 'text', default: 'https://mtc.kokexperience.nl/media/images/61aa76bd1b3e1a1741ab09a7ee128912.png' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Afbeelding' }
      ],
      template: function(v) {
        const link = escapeHtml(v.link);
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <a href="${link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;border:0;">
          <img src="${img}" alt="${alt}" style="display:block;width:160px;height:160px;object-fit:cover;border-radius:12px;">
        </a>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'poster-160x227',
      name: 'Poster – 160×227 klikbare poster',
      category: 'foto',
      description: 'Klikbare poster (160×227) met lichte schaduw en afgeronde hoeken.',
      fields: [
        { name: 'link', label: 'Link URL', type: 'text', default: 'https://www.kokcinemaxx.nl/film/wraak/' },
        { name: 'image', label: 'Poster URL', type: 'text', default: 'https://mtc.kokexperience.nl/media/images/ffa3397150eaf92b6c8c6557a1787aa2.jpeg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Afbeelding' }
      ],
      template: function(v) {
        const link = escapeHtml(v.link);
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <a href="${link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;border:0;">
          <div style="width:160px;height:227px;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.12);background:#fff;">
            <img src="${img}" alt="${alt}" style="display:block;width:160px;height:227px;object-fit:cover;">
          </div>
        </a>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-news-list',
      name: 'Content – nieuwsverzameling',
      category: 'content',
      description: 'Meerdere nieuwsitems (emoji, titel, tekst) in één kaart.',
      fields: [
        { name: 'titleMain', label: 'Hoofdkop (optioneel)', type: 'text', default: '' },
        { name: 'emoji1', label: 'Emoji 1', type: 'text', default: '🔹' },
        { name: 'title1', label: 'Titel 1', type: 'text', default: '' },
        { name: 'body1', label: 'Tekst 1', type: 'textarea', default: '' },
        { name: 'emoji2', label: 'Emoji 2', type: 'text', default: '🔹' },
        { name: 'title2', label: 'Titel 2', type: 'text', default: '' },
        { name: 'body2', label: 'Tekst 2', type: 'textarea', default: '' },
        { name: 'emoji3', label: 'Emoji 3', type: 'text', default: '🔹' },
        { name: 'title3', label: 'Titel 3', type: 'text', default: '' },
        { name: 'body3', label: 'Tekst 3', type: 'textarea', default: '' },
        { name: 'emoji4', label: 'Emoji 4', type: 'text', default: '🔹' },
        { name: 'title4', label: 'Titel 4', type: 'text', default: '' },
        { name: 'body4', label: 'Tekst 4', type: 'textarea', default: '' },
        { name: 'emoji5', label: 'Emoji 5', type: 'text', default: '🔹' },
        { name: 'title5', label: 'Titel 5', type: 'text', default: '' },
        { name: 'body5', label: 'Tekst 5', type: 'textarea', default: '' },
        { name: 'emoji6', label: 'Emoji 6', type: 'text', default: '🔹' },
        { name: 'title6', label: 'Titel 6', type: 'text', default: '' },
        { name: 'body6', label: 'Tekst 6', type: 'textarea', default: '' },
        { name: 'emoji7', label: 'Emoji 7', type: 'text', default: '🔹' },
        { name: 'title7', label: 'Titel 7', type: 'text', default: '' },
        { name: 'body7', label: 'Tekst 7', type: 'textarea', default: '' },
        { name: 'emoji8', label: 'Emoji 8', type: 'text', default: '🔹' },
        { name: 'title8', label: 'Titel 8', type: 'text', default: '' },
        { name: 'body8', label: 'Tekst 8', type: 'textarea', default: '' }
      ],
      template: function(v) {
        const items = [];
        function news(emoji, t, b) {
          const title = escapeHtml(t || '');
          const body = escapeHtml(b || '').replace(/\n/g,'<br>');
          const ico = escapeHtml(emoji || '');
          if (!title && !body) return '';
          return `<tr><td style="width:22px;padding-right:8px;vertical-align:top;font-size:16px;line-height:1.2;">${ico}</td><td><div style="font-weight:800;font-size:16px;color:#e02020;margin-bottom:4px;">${title}</div><div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.6;">${body}</div></td></tr><tr><td colspan=2 style=\"height:12px\"></td></tr>`;
        }
        for (let i = 1; i <= 8; i++) {
          items.push(news(v['emoji' + i], v['title' + i], v['body' + i]));
        }
        const rows = items.join('');
        const titleMain = v.titleMain ? `<div style="font-weight:800;font-size:18px;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.titleMain)}</div>` : '';
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                ${titleMain}
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-image-160x140-link',
      name: 'Content – afbeelding 160×140 link',
      category: 'content',
      description: 'Vaste afbeelding 160×140 die klikbaar is (met link).',
      fields: [
        { name: 'image', label: 'Afbeelding URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Afbeelding' },
        { name: 'link', label: 'Link URL', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<a href="${escapeHtml(v.link)}" style="display:inline-block;text-decoration:none;border:0;">
  <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.alt)}" style="display:block;width:160px;height:140px;object-fit:cover;border-radius:12px;">
</a>`;
      }
    },
    {
      id: 'content-basic',
      name: 'Content – basisparagraaf',
      category: 'content',
      description: 'Eenvoudige paragraaf met optionele emoji/icoon. Ondersteunt *italic* en [links](url).',
      fields: [
        { name: 'icon', label: 'Emoji/icoon (optioneel)', type: 'text', default: '✨' },
        { name: 'title', label: 'Kop', type: 'text', default: 'Ladiesnight komt eraan!' },
        { name: 'body', label: 'Tekst (gebruik *tekst* voor italic, [tekst](link) voor links)', type: 'textarea', default: 'Volgende week woensdag is het zover: de *ladiesnight* met Over de Grens. Het perfecte uitje om samen met je moeder, zus, buurvrouw of vriendin te beleven. [Reserveer hier direct](https://kokexperience.nl), want vol = vol!' }
      ],
      template: function(v) {
        const icon = escapeHtml(v.icon || '');
        const title = escapeHtml(v.title || '');
        
        // Proces tekst voor italic en links
        let body = escapeHtml(v.body || '');
        // Vervang *tekst* met <em>tekst</em> voor italic
        body = body.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        // Vervang [tekst](link) met <a href="link">tekst</a> voor hyperlinks
        body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#b48a19;text-decoration:underline;">$1</a>');
        // Vervang newlines met <br>
        body = body.replace(/\n/g,'<br>');
        
        const titleHtml = title ? `<div style="font-weight:800;font-size:16px;line-height:1.4;color:#2b2b2b;margin-bottom:6px;">${icon ? `<span style='margin-right:6px;'>${icon}</span>` : ''}${title}</div>` : '';
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                ${titleHtml}
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-accent-title',
      name: 'Content – accentkop',
      category: 'content',
      description: 'Paragraaf met goudkleurige accentkop.',
      fields: [
        { name: 'title', label: 'Kop', type: 'text', default: 'Nieuws' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Schrijf hier je inhoudelijke tekst. Dit is de hoofdtekst van je nieuwsbrief.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.12);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:800;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:#b48a19;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${renderRichText(v.body)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-quote',
      name: 'Content – quote',
      category: 'content',
      description: 'Citaat met naam/bron.',
      fields: [
        { name: 'quote', label: 'Citaat', type: 'textarea', default: '“Een dag vol beleving – wij komen zeker terug!”' },
        { name: 'author', label: 'Auteur/bron', type: 'text', default: 'Bezoeker' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;font-style:italic;margin-bottom:6px;">${escapeHtml(v.quote).replace(/\n/g,'<br>')}</div>
                <div style="font-weight:700;font-size:13px;color:#2b2b2b;">— ${escapeHtml(v.author)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-callout',
      name: 'Content – callout met icoon',
      category: 'content',
      description: 'Infobox met icoon links.',
      fields: [
        { name: 'icon', label: 'Icoon/emoji', type: 'text', default: 'ℹ️' },
        { name: 'title', label: 'Kop', type: 'text', default: 'Belangrijk' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte aanvullende informatie.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#fff7e6;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:14px 18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td style="width:28px;padding-right:10px;vertical-align:top;font-size:18px;">${escapeHtml(v.icon)}</td>
                      <td>
                        <div style="font-weight:700;font-size:14px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(v.title)}</div>
                        <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${renderRichText(v.body)}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-list',
      name: 'Content – opsomming',
      category: 'content',
      description: 'Tekst met bullets (3 regels).',
      fields: [
        { name: 'title', label: 'Kop', type: 'text', default: 'Wat je krijgt' },
        { name: 'item1', label: 'Punt 1', type: 'text', default: 'Eerste voordeel' },
        { name: 'item2', label: 'Punt 2', type: 'text', default: 'Tweede voordeel' },
        { name: 'item3', label: 'Punt 3', type: 'text', default: 'Derde voordeel' }
      ],
      template: function(v) {
        const items = [v.item1, v.item2, v.item3].filter(Boolean).map(t => `<li style="margin-bottom:4px;">${escapeHtml(t)}</li>`).join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:700;font-size:14px;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <ul style="padding-left:18px;margin:0;font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${items}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-image-left',
      name: 'Content – icoon links kop',
      category: 'content',
      description: 'Kop met klein icoon links en tekst.',
      fields: [
        { name: 'icon', label: 'Emoji/icoon', type: 'text', default: '📣' },
        { name: 'title', label: 'Kop', type: 'text', default: 'Aankondiging' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Hier staat de hoofdinhoud.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td style="width:26px;padding-right:10px;vertical-align:top;font-size:18px;">${escapeHtml(v.icon)}</td>
                      <td>
                        <div style="font-weight:800;font-size:16px;line-height:1.4;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                        <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${renderRichText(v.body)}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-emphasis',
      name: 'Content – nadrukregel',
      category: 'content',
      description: 'Grote opvallende eerste regel + body.',
      fields: [
        { name: 'lead', label: 'Nadrukregel', type: 'text', default: 'Tip:' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Gebruik onze arrangementen voor extra voordeel.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:800;font-size:16px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(v.lead)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${renderRichText(v.body)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-highlight',
      name: 'Content – highlight',
      category: 'content',
      description: 'Tekstblok met zachte gele highlight.',
      fields: [
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Belangrijke mededeling voor alle leden.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#fff9e6;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${renderRichText(v.body)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'content-smallprint',
      name: 'Content – small print',
      category: 'content',
      description: 'Kleiner lettertype voor voorwaarden of voetnoot.',
      fields: [
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Voorwaarden zijn van toepassing.' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:14px 18px;">
                <div style="font-weight:400;font-size:12px;line-height:1.5;color:#2b2b2b;">${renderRichText(v.body)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-center-fade',
      name: 'Scheiding – midden solid, fade naar randen',
      category: 'stijl',
      description: 'Centrale balk die naar links en rechts subtiel uitfadet.',
      fields: [
        { name: 'color', label: 'Kleur (hex)', type: 'text', default: '#b48a19' },
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '4' },
        { name: 'centerWidth', label: 'Middenbreedte (%)', type: 'text', default: '18' }
      ],
      template: function(v) {
        function hexToRgb(hex) {
          const m = String(hex || '').trim().replace(/^#/, '');
          const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
          const ok = /^[0-9a-fA-F]{6}$/.test(full);
          if (!ok) return { r: 180, g: 138, b: 25 };
          return {
            r: parseInt(full.slice(0, 2), 16),
            g: parseInt(full.slice(2, 4), 16),
            b: parseInt(full.slice(4, 6), 16)
          };
        }
        const h = Math.max(1, parseInt(v.height) || 4);
        const cw = Math.min(80, Math.max(0, parseInt(v.centerWidth) || 18));
        const leftStop = 50 - cw / 2;
        const rightStop = 50 + cw / 2;
        const { r, g, b } = hexToRgb(v.color || '#b48a19');
        const gradient = `linear-gradient(90deg, rgba(${r},${g},${b},0) 0%, rgba(${r},${g},${b},0.9) ${leftStop}%, rgba(${r},${g},${b},1) 50%, rgba(${r},${g},${b},0.9) ${rightStop}%, rgba(${r},${g},${b},0) 100%)`;
        const radius = Math.round(h / 2);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="height:${h}px;background:${gradient};border-radius:${radius}px;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-center-fade-red',
      name: 'Scheiding – midden solid, fade (rood)',
      category: 'stijl',
      description: 'Rode variant met fade aan beide zijden.',
      fields: [
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '4' },
        { name: 'centerWidth', label: 'Middenbreedte (%)', type: 'text', default: '18' }
      ],
      template: function(v) {
        const h = Math.max(1, parseInt(v.height) || 4);
        const cw = Math.min(80, Math.max(0, parseInt(v.centerWidth) || 18));
        const leftStop = 50 - cw / 2;
        const rightStop = 50 + cw / 2;
        const gradient = `linear-gradient(90deg, rgba(224,32,32,0) 0%, rgba(224,32,32,0.9) ${leftStop}%, rgba(224,32,32,1) 50%, rgba(224,32,32,0.9) ${rightStop}%, rgba(224,32,32,0) 100%)`;
        const radius = Math.round(h / 2);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="height:${h}px;background:${gradient};border-radius:${radius}px;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-center-fade-gray',
      name: 'Scheiding – midden solid, fade (grijs)',
      category: 'stijl',
      description: 'Grijze variant met fade aan beide zijden.',
      fields: [
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '4' },
        { name: 'centerWidth', label: 'Middenbreedte (%)', type: 'text', default: '18' }
      ],
      template: function(v) {
        const h = Math.max(1, parseInt(v.height) || 4);
        const cw = Math.min(80, Math.max(0, parseInt(v.centerWidth) || 18));
        const leftStop = 50 - cw / 2;
        const rightStop = 50 + cw / 2;
        const gradient = `linear-gradient(90deg, rgba(160,160,160,0) 0%, rgba(160,160,160,0.9) ${leftStop}%, rgba(160,160,160,1) 50%, rgba(160,160,160,0.9) ${rightStop}%, rgba(160,160,160,0) 100%)`;
        const radius = Math.round(h / 2);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="height:${h}px;background:${gradient};border-radius:${radius}px;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-center-fade-black',
      name: 'Scheiding – midden solid, fade (zwart)',
      category: 'stijl',
      description: 'Zwarte variant met fade aan beide zijden.',
      fields: [
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '4' },
        { name: 'centerWidth', label: 'Middenbreedte (%)', type: 'text', default: '18' }
      ],
      template: function(v) {
        const h = Math.max(1, parseInt(v.height) || 4);
        const cw = Math.min(80, Math.max(0, parseInt(v.centerWidth) || 18));
        const leftStop = 50 - cw / 2;
        const rightStop = 50 + cw / 2;
        const gradient = `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) ${leftStop}%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) ${rightStop}%, rgba(0,0,0,0) 100%)`;
        const radius = Math.round(h / 2);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="height:${h}px;background:${gradient};border-radius:${radius}px;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-image-overlay',
      name: 'Header – foto met kleur‑overlay',
      category: 'basis',
      description: 'Grote foto met instelbare kleur‑overlay en kop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Achtergrond' },
        { name: 'overlayColor', label: 'Overlay kleur (hex)', type: 'text', default: '#b48a19' },
        { name: 'overlayOpacity', label: 'Overlay dekking (0–1)', type: 'text', default: '0.45' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Beleef Kok Experience' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        function hexToRgb(hex) {
          const m = String(hex || '').trim().replace(/^#/, '');
          const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
          const ok = /^[0-9a-fA-F]{6}$/.test(full);
          if (!ok) return { r: 0, g: 0, b: 0 };
          return {
            r: parseInt(full.slice(0, 2), 16),
            g: parseInt(full.slice(2, 4), 16),
            b: parseInt(full.slice(4, 6), 16)
          };
        }
        const { r, g, b } = hexToRgb(v.overlayColor || '#000000');
        let a = parseFloat(v.overlayOpacity);
        if (!(a >= 0 && a <= 1)) a = 0.45;
        const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
        const h = parseInt(v.height) || 180;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="position:relative;padding:0;">
                <div style="position:relative;width:100%;height:${h}px;background:#000;overflow:hidden;">
                  <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.alt)}" data-field="image" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
                  <div style="position:absolute;inset:0;background:${rgba};"></div>
                  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 12px;">
                    <div style="font-weight:800;font-size:26px;line-height:1.2;color:#ffffff;">${escapeHtml(v.title)}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-image-gradient',
      name: 'Header – foto met gradient‑overlay',
      category: 'basis',
      description: 'Grote foto met instelbare gradient‑overlay en kop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Achtergrond' },
        { name: 'angle', label: 'Gradient hoek (graden)', type: 'text', default: '180' },
        { name: 'start', label: 'Kleur start (hex)', type: 'text', default: '#000000' },
        { name: 'startOpacity', label: 'Start dekking (0–1)', type: 'text', default: '0.55' },
        { name: 'end', label: 'Kleur eind (hex)', type: 'text', default: '#000000' },
        { name: 'endOpacity', label: 'Eind dekking (0–1)', type: 'text', default: '0.0' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Beleef Kok Experience' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        function hexToRgb(hex) {
          const m = String(hex || '').trim().replace(/^#/, '');
          const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
          const ok = /^[0-9a-fA-F]{6}$/.test(full);
          if (!ok) return { r: 0, g: 0, b: 0 };
          return {
            r: parseInt(full.slice(0, 2), 16),
            g: parseInt(full.slice(2, 4), 16),
            b: parseInt(full.slice(4, 6), 16)
          };
        }
        const a = isFinite(parseFloat(v.startOpacity)) ? Math.min(1, Math.max(0, parseFloat(v.startOpacity))) : 0.55;
        const b = isFinite(parseFloat(v.endOpacity)) ? Math.min(1, Math.max(0, parseFloat(v.endOpacity))) : 0.0;
        const ang = String(parseInt(v.angle) || 180);
        const s = hexToRgb(v.start || '#000000');
        const e = hexToRgb(v.end || '#000000');
        const rgbaStart = `rgba(${s.r}, ${s.g}, ${s.b}, ${a})`;
        const rgbaEnd = `rgba(${e.r}, ${e.g}, ${e.b}, ${b})`;
        const gradient = `linear-gradient(${ang}deg, ${rgbaStart}, ${rgbaEnd})`;
        const h = parseInt(v.height) || 180;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="position:relative;padding:0;">
                <div style="position:relative;width:100%;height:${h}px;background:#000;overflow:hidden;">
                  <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.alt)}" data-field="image" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
                  <div style="position:absolute;inset:0;background:${gradient};"></div>
                  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 12px;">
                    <div style="font-weight:800;font-size:26px;line-height:1.2;color:#ffffff;">${escapeHtml(v.title)}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-left-multi',
      name: 'Foto links, tekst rechts – meerdere knoppen',
      category: 'foto',
      description: 'Afbeelding links, tekst rechts, met ondersteuning voor meerdere knoppen.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'tag', label: 'Label', type: 'text', default: 'Categorie' },
        { name: 'tag2', label: 'Label 2 (optioneel)', type: 'text', default: '' },
        { name: 'tag3', label: 'Label 3 (optioneel)', type: 'text', default: '' },
        { name: 'tag2', label: 'Label 2 (optioneel)', type: 'text', default: '' },
        { name: 'tag3', label: 'Label 3 (optioneel)', type: 'text', default: '' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'button1Label', label: 'Knop 1 tekst', type: 'text', default: 'Lees meer' },
        { name: 'button1Link', label: 'Knop 1 link', type: 'text', default: '#' },
        { name: 'button2Label', label: 'Knop 2 tekst', type: 'text', default: '' },
        { name: 'button2Link', label: 'Knop 2 link', type: 'text', default: '' },
        { name: 'button3Label', label: 'Knop 3 tekst', type: 'text', default: '' },
        { name: 'button3Link', label: 'Knop 3 link', type: 'text', default: '' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const tag = escapeHtml(v.tag);
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        function btn(label, link) {
          if (!label || !link) return '';
          return `<a href="${escapeHtml(link)}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;margin-right:10px;">${escapeHtml(label)}</a>`;
        }
        const buttonsHtml = [
          btn(v.button1Label, v.button1Link),
          btn(v.button2Label, v.button2Link),
          btn(v.button3Label, v.button3Link)
        ].filter(Boolean).join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);table-layout:fixed;">
          <tbody>
            <tr style="height:220px;mso-line-height-rule:exactly;">
              <td width="42%" style="width:42%;padding:0;vertical-align:top;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
              <td width="58%" style="width:58%;padding:0;vertical-align:middle;background:#f9f7f2;">
                <div style="margin:0 16px 0 16px;">
                  ${[v.tag, v.tag2, v.tag3].filter(Boolean).map(t => `<span style=\"display:inline-block;margin:0 6px 8px 0;padding:3px 10px;border-radius:999px;background:#b48a19;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;\">${escapeHtml(t)}</span>`).join('')}
                </div>
                <div style="margin:0 16px 6px 16px;font-weight:800;font-size:19px;line-height:1.25;color:#2b2b2b;">${title}</div>
                <div style="margin:0 16px 12px 16px;font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
                <div style="margin:0 16px;white-space:nowrap;">${buttonsHtml}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'gold-card',
      name: 'Gouden achtergrondkaart',
      category: 'basis',
      description: 'Titel en tekst op een donkergouden achtergrond met witte tekst.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Feestelijke aanbieding' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Voeg hier de details van de aanbieding toe.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#b48a19;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#ffffff;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#ffffff;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'dark-card',
      name: 'Donkere kaart',
      category: 'basis',
      description: 'Een kaart met donkere achtergrond en witte tekst.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Belangrijke mededeling' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Voeg hier aanvullende informatie toe.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#2b2b2b;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#ffffff;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#eeeeee;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'list-card',
      name: 'Lijstkaart',
      category: 'basis',
      description: 'Een kaart met opsomming van meerdere punten.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onze voordelen' },
        { name: 'item1', label: 'Punt 1', type: 'text', default: 'Punt één beschrijving' },
        { name: 'item2', label: 'Punt 2', type: 'text', default: 'Punt twee beschrijving' },
        { name: 'item3', label: 'Punt 3', type: 'text', default: 'Punt drie beschrijving' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const items = [v.item1, v.item2, v.item3].filter(Boolean).map(item => `        <li style="margin-bottom:6px;">${escapeHtml(item)}</li>`).join('\n');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <ul style="padding-left:20px;margin:0;font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;list-style-type:disc;">
${items}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'minimal-card',
      name: 'Minimalistische kaart',
      category: 'basis',
      description: 'Een eenvoudige kaart met subtiele rand en zonder schaduw.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Minimalistisch ontwerp' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Voeg hier uw tekst toe.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:700;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'step-card',
      name: 'Stappenkaart',
      category: 'basis',
      description: 'Drie stappen met nummercirkels op een lichte achtergrond.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Hoe werkt het?' },
        { name: 'step1Title', label: 'Stap 1 titel', type: 'text', default: 'Stap 1' },
        { name: 'step1Desc', label: 'Stap 1 tekst', type: 'textarea', default: 'Beschrijving van stap één.' },
        { name: 'step2Title', label: 'Stap 2 titel', type: 'text', default: 'Stap 2' },
        { name: 'step2Desc', label: 'Stap 2 tekst', type: 'textarea', default: 'Beschrijving van stap twee.' },
        { name: 'step3Title', label: 'Stap 3 titel', type: 'text', default: 'Stap 3' },
        { name: 'step3Desc', label: 'Stap 3 tekst', type: 'textarea', default: 'Beschrijving van stap drie.' }
      ],
      template: function (v) {
        function step(number, title, desc) {
          return `\
<tr>
  <td style="padding:8px 0;vertical-align:top;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      <tbody>
        <tr>
          <td width="40" style="width:40px;">
            <div style="width:40px;height:40px;background:#b48a19;color:#ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">${number}</div>
          </td>
          <td style="padding-left:12px;">
            <div style="font-weight:700;font-size:16px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(title)}</div>
            <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;">${escapeHtml(desc)}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>`;
        }
        const title = escapeHtml(v.title);
        const stepsHtml =
          step('1', v.step1Title, v.step1Desc) +
          step('2', v.step2Title, v.step2Desc) +
          step('3', v.step3Title, v.step3Desc);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${title}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
${stepsHtml}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-only',
      name: 'Alleen foto',
      category: 'foto',
      description: 'Een kaart die alleen uit een afbeelding bestaat.',
      fields: [
        // Gebruik een echte placeholder als standaard zodat de kaart altijd een foto toont
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2022/11/Speelparadijs-Kok-Experience-Lelystad-2.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:auto;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-overlay-light',
      name: 'Foto met lichte overlay',
      category: 'foto',
      description: 'Afbeelding bovenaan met witte overlay voor tekst en knop.',
      fields: [
        // Standaardafbeelding aangepast voor variatie
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/04/IK1A4055-kopie-2048x1365.jpeg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="background:#ffffffee;padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:6px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${body}</div>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-overlay-dark',
      name: 'Foto met donkere overlay',
      category: 'foto',
      description: 'Afbeelding met donkere overlay; tekst staat in wit op donkere achtergrond.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6144-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="background:#2b2b2bdd;padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#ffffff;margin-bottom:6px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#eeeeee;margin-bottom:12px;">${body}</div>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-left',
      name: 'Foto links, tekst rechts',
      category: 'foto',
      description: 'Afbeelding aan de linkerkant en tekst aan de rechterkant met een knop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'tag', label: 'Label', type: 'text', default: 'Categorie' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const tag = escapeHtml(v.tag);
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);table-layout:fixed;">
          <tbody>
            <tr style="height:220px;mso-line-height-rule:exactly;">
              <td width="42%" style="width:42%;padding:0;vertical-align:top;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
              <td width="58%" style="width:58%;padding:0;vertical-align:middle;background:#f9f7f2;">
                <div style="margin:0 16px 0 16px;">
                  ${[v.tag, v.tag2, v.tag3].filter(Boolean).map(t => `<span style=\"display:inline-block;margin:0 6px 8px 0;padding:3px 10px;border-radius:999px;background:#b48a19;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;\">${escapeHtml(t)}</span>`).join('')}
                </div>
                <div style="margin:0 16px 6px 16px;font-weight:800;font-size:19px;line-height:1.25;color:#2b2b2b;">${title}</div>
                <div style="margin:0 16px 12px 16px;font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
                <div style="margin:0 16px;">
                  <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-right',
      name: 'Foto rechts, tekst links',
      category: 'foto',
      description: 'Afbeelding aan de rechterkant en tekst aan de linkerkant met een knop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'tag', label: 'Label', type: 'text', default: 'Categorie' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const tag = escapeHtml(v.tag);
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);table-layout:fixed;">
          <tbody>
            <tr style="height:220px;mso-line-height-rule:exactly;">
              <td width="58%" style="width:58%;padding:0;vertical-align:middle;background:#f9f7f2;">
                <div style="display:inline-block;margin:0 0 8px 16px;padding:3px 10px;border-radius:999px;background:#b48a19;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;">${tag}</div>
                <div style="margin:0 16px 6px 16px;font-weight:800;font-size:19px;line-height:1.25;color:#2b2b2b;">${title}</div>
                <div style="margin:0 16px 12px 16px;font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
                <div style="margin:0 16px;">
                  <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
                </div>
              </td>
              <td width="42%" style="width:42%;padding:0;vertical-align:top;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-top',
      name: 'Foto boven, tekst onder',
      category: 'foto',
      description: 'Afbeelding bovenaan en tekst met knop onderaan.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/03/Restaurant-2-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving hier.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const img = escapeHtml(v.image);
        const alt = escapeHtml(v.alt);
        const title = escapeHtml(v.title);
        const body = escapeHtml(v.body).replace(/\n/g, '<br>');
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:220px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${body}</div>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-gallery',
      name: 'Fotogalerij',
      category: 'foto',
      description: 'Twee afbeeldingen naast elkaar met een titel en beschrijving.',
      fields: [
        // Twee verschillende placeholders om variatie te tonen
        { name: 'image1', label: 'Afbeelding 1‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6144-2048x1365.jpg' },
        { name: 'image2', label: 'Afbeelding 2‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
        { name: 'alt1', label: 'Alt‑tekst 1', type: 'text', default: 'Afbeelding 1' },
        { name: 'alt2', label: 'Alt‑tekst 2', type: 'text', default: 'Afbeelding 2' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Galerijtitel' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Beschrijving van de fotogalerij.' }
      ],
      template: function (v) {
        const img1 = escapeHtml(v.image1);
        const img2 = escapeHtml(v.image2);
        const alt1 = escapeHtml(v.alt1);
        const alt2 = escapeHtml(v.alt2);
        const title = escapeHtml(v.title);
        const body = escapeHtml(v.body).replace(/\n/g, '<br>');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td width="50%" style="width:50%;padding:0;line-height:0;">
                        <img src="${img1}" alt="${alt1}" data-field="image1" style="display:block;width:100%;height:160px;object-fit:cover;object-position:center ${v.image1Pos || '50'}%;">
                      </td>
                      <td width="50%" style="width:50%;padding:0;line-height:0;">
                        <img src="${img2}" alt="${alt2}" data-field="image2" style="display:block;width:100%;height:160px;object-fit:cover;object-position:center ${v.image2Pos || '50'}%;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'testimonial',
      name: 'Testimonial',
      category: 'special',
      description: 'Citaat met beoordeling en auteur.',
      fields: [
        { name: 'rating', label: 'Sterren (1-5)', type: 'text', default: '5' },
        { name: 'quote', label: 'Quote', type: 'textarea', default: 'Dit is een geweldige ervaring!' },
        { name: 'author', label: 'Auteur', type: 'text', default: 'Naam klant' }
      ],
      template: function (v) {
        let stars = '';
        const ratingNum = parseInt(v.rating, 10);
        for (let i = 0; i < ratingNum; i++) {
          stars += '★';
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f1ebda;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-size:20px;color:#b48a19;margin-bottom:4px;">${stars}</div>
                <div style="font-style:italic;font-size:16px;line-height:1.4;color:#2b2b2b;margin-bottom:12px;">"${escapeHtml(v.quote)}"</div>
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;">— ${escapeHtml(v.author)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'price-card',
      name: 'Prijskaart',
      category: 'special',
      description: 'Prijskaart met grote prijs en knop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Speciale aanbieding' },
        { name: 'price', label: 'Prijs', type: 'text', default: '€19,95' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving van de aanbieding.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Bestel nu' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const price = escapeHtml(v.price);
        const body = escapeHtml(v.body).replace(/\n/g, '<br>');
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#b48a19;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#ffffff;margin-bottom:4px;">${title}</div>
                <div style="font-weight:700;font-size:36px;line-height:1.1;color:#ffffff;margin-bottom:8px;">${price}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#ffffff;margin-bottom:12px;">${body}</div>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#2b2b2b;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'event-card',
      name: 'Evenement/programma',
      category: 'special',
      description: 'Kaart met datum, tijd en programmaoverzicht met knop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Evenement' },
        { name: 'date', label: 'Datum', type: 'text', default: '1 januari 2026' },
        { name: 'time', label: 'Tijd', type: 'text', default: '15:00 – 18:00' },
        { name: 'description', label: 'Omschrijving', type: 'textarea', default: 'Beschrijving van het evenement.' },
        { name: 'item1Time', label: 'Programma 1 tijd', type: 'text', default: '15:00' },
        { name: 'item1Desc', label: 'Programma 1 beschrijving', type: 'text', default: 'Opening' },
        { name: 'item2Time', label: 'Programma 2 tijd', type: 'text', default: '16:00' },
        { name: 'item2Desc', label: 'Programma 2 beschrijving', type: 'text', default: 'Hoofdact' },
        { name: 'item3Time', label: 'Programma 3 tijd', type: 'text', default: '17:00' },
        { name: 'item3Desc', label: 'Programma 3 beschrijving', type: 'text', default: 'Afsluiting' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Meer info' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const date = escapeHtml(v.date);
        const time = escapeHtml(v.time);
        const description = renderRichText(v.description);
        const btnLabel = escapeHtml(v.buttonLabel);
        const btnLink = escapeHtml(v.buttonLink);
        function programRow(time, desc) {
          if (!time && !desc) return '';
          return `<tr><td style="padding:4px 0;font-weight:600;font-size:14px;color:#2b2b2b;width:80px;">${escapeHtml(time)}</td><td style="padding:4px 0;font-weight:400;font-size:14px;color:#2b2b2b;">${escapeHtml(desc)}</td></tr>`;
        }
        const progRows = [programRow(v.item1Time, v.item1Desc), programRow(v.item2Time, v.item2Desc), programRow(v.item3Time, v.item3Desc)].join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:4px;">${title}</div>
                <div style="font-weight:600;font-size:14px;color:#b48a19;margin-bottom:8px;">${date} • ${time}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${description}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:12px;">
                  <tbody>
                    ${progRows}
                  </tbody>
                </table>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'quote-card',
      name: 'Citaatkaart',
      category: 'special',
      description: 'Kaart met een inspirerend citaat en auteur.',
      fields: [
        { name: 'quote', label: 'Quote', type: 'textarea', default: 'Het leven is als fietsen: om in balans te blijven moet je blijven bewegen.' },
        { name: 'author', label: 'Auteur', type: 'text', default: 'Albert Einstein' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f1ebda;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:24px;">
                <div style="font-size:40px;color:#b48a19;line-height:1;margin-bottom:8px;">"</div>
                <div style="font-style:italic;font-size:18px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.quote)}</div>
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;">— ${escapeHtml(v.author)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'two-col',
      name: 'Twee kolommen',
      category: 'special',
      description: 'Een kaart met twee kolommen voor extra informatie.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onderwerp' },
        { name: 'leftHeading', label: 'Linker kop', type: 'text', default: 'Links' },
        { name: 'leftText', label: 'Linker tekst', type: 'textarea', default: 'Linker kolomtekst.' },
        { name: 'rightHeading', label: 'Rechter kop', type: 'text', default: 'Rechts' },
        { name: 'rightText', label: 'Rechter tekst', type: 'textarea', default: 'Rechter kolomtekst.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const leftHeading = escapeHtml(v.leftHeading);
        const leftText = escapeHtml(v.leftText).replace(/\n/g, '<br>');
        const rightHeading = escapeHtml(v.rightHeading);
        const rightText = escapeHtml(v.rightText).replace(/\n/g, '<br>');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${title}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      <td width="50%" style="width:50%;padding-right:10px;vertical-align:top;">
                        <div style="font-weight:700;font-size:16px;color:#2b2b2b;margin-bottom:4px;">${leftHeading}</div>
                        <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${leftText}</div>
                      </td>
                      <td width="50%" style="width:50%;padding-left:10px;vertical-align:top;">
                        <div style="font-weight:700;font-size:16px;color:#2b2b2b;margin-bottom:4px;">${rightHeading}</div>
                        <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${rightText}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'timeline',
      name: 'Tijdlijn',
      category: 'special',
      description: 'Verticale tijdlijn met drie momenten.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Dagprogramma' },
        { name: 'time1', label: 'Tijd 1', type: 'text', default: '08:00' },
        { name: 'desc1', label: 'Beschrijving 1', type: 'text', default: 'Ontvangst' },
        { name: 'time2', label: 'Tijd 2', type: 'text', default: '12:00' },
        { name: 'desc2', label: 'Beschrijving 2', type: 'text', default: 'Lunch' },
        { name: 'time3', label: 'Tijd 3', type: 'text', default: '17:00' },
        { name: 'desc3', label: 'Beschrijving 3', type: 'text', default: 'Afsluiting' }
      ],
      template: function (v) {
        function lineRow(time, desc, isLast) {
          return `\
<tr>
  <td style="vertical-align:top;width:20px;">
    <div style="width:12px;height:12px;background:#b48a19;border-radius:50%;margin-top:4px;"></div>
    ${isLast ? '' : '<div style="width:2px;height:40px;background:#b48a19;margin-left:5px;"></div>'}
  </td>
  <td style="padding-left:10px;padding-bottom:20px;">
    <div style="font-weight:600;font-size:14px;color:#2b2b2b;margin-bottom:2px;">${escapeHtml(time)}</div>
    <div style="font-weight:400;font-size:14px;color:#2b2b2b;">${escapeHtml(desc)}</div>
  </td>
</tr>`;
        }
        const title = escapeHtml(v.title);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:16px;">${title}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    ${lineRow(v.time1, v.desc1, false)}
                    ${lineRow(v.time2, v.desc2, false)}
                    ${lineRow(v.time3, v.desc3, true)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'faq-card',
      name: 'Veelgestelde vragen',
      category: 'special',
      description: 'Kaart met twee veelgestelde vragen en antwoorden.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Veelgestelde vragen' },
        { name: 'question1', label: 'Vraag 1', type: 'text', default: 'Vraag 1' },
        { name: 'answer1', label: 'Antwoord 1', type: 'textarea', default: 'Antwoord op vraag één.' },
        { name: 'question2', label: 'Vraag 2', type: 'text', default: 'Vraag 2' },
        { name: 'answer2', label: 'Antwoord 2', type: 'textarea', default: 'Antwoord op vraag twee.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        function qa(question, answer) {
          return `<div style="margin-bottom:12px;"><div style="font-weight:700;font-size:15px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(question)}</div><div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${escapeHtml(answer)}</div></div>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${title}</div>
                ${qa(v.question1, v.answer1)}
                ${qa(v.question2, v.answer2)}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'multi-info',
      name: 'Drie info-items',
      category: 'info',
      description: 'Kaart met drie kolommen (titel en tekst).',
      fields: [
        { name: 'title', label: 'Hoofdtitel', type: 'text', default: 'Waarom kiezen voor ons?' },
        { name: 'item1Title', label: 'Item 1 titel', type: 'text', default: 'Kwaliteit' },
        { name: 'item1Text', label: 'Item 1 tekst', type: 'textarea', default: 'Wij leveren de beste kwaliteit.' },
        { name: 'item2Title', label: 'Item 2 titel', type: 'text', default: 'Service' },
        { name: 'item2Text', label: 'Item 2 tekst', type: 'textarea', default: 'Onze service is ongeëvenaard.' },
        { name: 'item3Title', label: 'Item 3 titel', type: 'text', default: 'Ervaring' },
        { name: 'item3Text', label: 'Item 3 tekst', type: 'textarea', default: 'Jarenlange ervaring in de branche.' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        function col(t, txt) {
          return `<td style="vertical-align:top;padding:0 10px;"><div style="font-weight:700;font-size:16px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(t)}</div><div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${escapeHtml(txt)}</div></td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${title}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      ${col(v.item1Title, v.item1Text)}
                      ${col(v.item2Title, v.item2Text)}
                      ${col(v.item3Title, v.item3Text)}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'contact-card',
      name: 'Contactgegevens',
      category: 'info',
      description: 'Kaart met adres, telefoon en e‑mail.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Contact' },
        { name: 'address', label: 'Adres', type: 'textarea', default: 'Straatnaam 1\n1234 AB Plaats' },
        { name: 'phone', label: 'Telefoonnummer', type: 'text', default: '0123-456789' },
        { name: 'email', label: 'E‑mail', type: 'text', default: 'info@voorbeeld.nl' },
        // Standaard een sfeervolle foto als kaartafbeelding
        { name: 'map', label: 'Kaartafbeelding‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/04/IK1A3593-kopie-2048x1365.jpeg' }
      ],
      template: function (v) {
        const address = renderRichText(v.address);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${escapeHtml(v.map)}" alt="Kaart" style="display:block;width:100%;height:200px;object-fit:cover;">
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:8px;">${address}</div>
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;margin-bottom:4px;">Tel: <a href="tel:${escapeHtml(v.phone)}" style="color:#b48a19;text-decoration:none;">${escapeHtml(v.phone)}</a></div>
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;">E-mail: <a href="mailto:${escapeHtml(v.email)}" style="color:#b48a19;text-decoration:none;">${escapeHtml(v.email)}</a></div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'icon-info',
      name: 'Info met pictogram',
      category: 'info',
      description: 'Kaart met pictogram, titel, tekst en knop.',
      fields: [
        // Laat het pictogramveld standaard leeg zodat gebruikers hun eigen icoon of emoji kunnen invoegen
        { name: 'icon', label: 'Pictogram‑URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Info kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving van deze informatie.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;display:flex;align-items:center;">
                <div style="flex:0 0 40px;margin-right:16px;">
                  <img src="${escapeHtml(v.icon)}" alt="Icon" style="display:block;width:40px;height:40px;border-radius:50%;object-fit:cover;">
                </div>
                <div style="flex:1;">
                  <div style="font-weight:800;font-size:18px;line-height:1.3;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(v.title)}</div>
                  <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${renderRichText(v.body)}</div>
                  <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:8px 16px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-simple',
      name: 'Header – simpel',
      category: 'basis',
      description: 'Grote kop, gecentreerd, op lichte achtergrond.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Welkom bij Kok Experience' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:18px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <div style="font-weight:800;font-size:24px;line-height:1.2;color:#2b2b2b;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-subtitle',
      name: 'Header – met subtitel',
      category: 'basis',
      description: 'Grote kop met subtitel, gecentreerd.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Beleef het samen' },
        { name: 'subtitle', label: 'Subtitel', type: 'text', default: 'Ontdek onze activiteiten en arrangementen' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:20px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <div style="font-weight:800;font-size:22px;line-height:1.2;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${escapeHtml(v.subtitle)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-button',
      name: 'Header – met knop',
      category: 'basis',
      description: 'Grote kop met actieknop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Start je avontuur' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Bekijk aanbod' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:20px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <div style="font-weight:800;font-size:22px;line-height:1.2;color:#2b2b2b;margin-bottom:10px;">${escapeHtml(v.title)}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-tag',
      name: 'Header – met label',
      category: 'basis',
      description: 'Eyebrow/label boven titel.',
      fields: [
        { name: 'tag', label: 'Label', type: 'text', default: 'Nieuws' },
        { name: 'tag2', label: 'Label 2 (optioneel)', type: 'text', default: '' },
        { name: 'tag3', label: 'Label 3 (optioneel)', type: 'text', default: '' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Nieuwe openingstijden' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:22px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                ${[v.tag, v.tag2, v.tag3].filter(Boolean).map(t => `<div style=\"display:inline-block;margin:0 6px 8px 0;padding:3px 10px;border-radius:999px;background:#b48a19;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;\">${escapeHtml(t)}</div>`).join('')}
                <div style="font-weight:800;font-size:24px;line-height:1.25;color:#2b2b2b;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-dark',
      name: 'Header – donker',
      category: 'basis',
      description: 'Donkere achtergrond met witte kop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Uitgelicht' },
        { name: 'subtitle', label: 'Subtitel', type: 'text', default: 'Plan je bezoek vandaag nog' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:20px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#2b2b2b;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <div style="font-weight:800;font-size:22px;line-height:1.2;color:#ffffff;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#eeeeee;">${escapeHtml(v.subtitle)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-gold',
      name: 'Header – goud',
      category: 'basis',
      description: 'Gouden achtergrond met witte kop (krijgt ook rode variant).',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Speciale actie' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:26px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#b48a19;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <div style="font-weight:800;font-size:26px;line-height:1.2;color:#ffffff;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-icon',
      name: 'Header – met icoon',
      category: 'basis',
      description: 'Icoon boven de kop.',
      fields: [
        { name: 'icon', label: 'Pictogram‑URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Bezoek onze bioscoop' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height);
        const tdStyle = h ? `padding:0 20px;text-align:center;height:${h}px;vertical-align:middle;` : `padding:22px 20px;text-align:center;`;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="${tdStyle}">
                <img src="${escapeHtml(v.icon)}" alt="" style="display:block;margin:0 auto 10px auto;width:40px;height:40px;border-radius:50%;object-fit:cover;">
                <div style="font-weight:800;font-size:24px;line-height:1.25;color:#2b2b2b;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-image',
      name: 'Header – met achtergrondfoto',
      category: 'basis',
      description: 'Grote foto met overlay en kop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Achtergrond' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Beleef Kok Experience' },
        { name: 'height', label: 'Hoogte (px, optioneel)', type: 'text', default: '' }
      ],
      template: function (v) {
        const h = parseInt(v.height) || 200;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="position:relative;padding:0;">
                <div style="position:relative;width:100%;height:${h}px;background:#000;overflow:hidden;">
                  <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.alt)}" data-field="image" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center ${v.imagePos || '50'}%;filter:brightness(0.6);">
                  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 12px;">
                    <div style="font-weight:800;font-size:26px;line-height:1.2;color:#ffffff;">${escapeHtml(v.title)}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-slim',
      name: 'Header – compact',
      category: 'basis',
      description: 'Compacte header met kleinere kop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Agenda' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:16px 16px;text-align:center;">
                <div style="font-weight:800;font-size:20px;line-height:1.25;color:#2b2b2b;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-left',
      name: 'Header – links uitgelijnd',
      category: 'basis',
      description: 'Kop links uitgelijnd met ruime padding.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Nieuws & updates' },
        { name: 'subtitle', label: 'Subtitel', type: 'text', default: 'Blijf op de hoogte van het laatste nieuws' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:22px 20px;text-align:left;">
                <div style="font-weight:800;font-size:24px;line-height:1.25;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;">${escapeHtml(v.subtitle)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-accent',
      name: 'Header – accentbalk',
      category: 'basis',
      description: 'Accentbalk onder de kop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Plan je dagje uit' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:22px 20px 10px 20px;text-align:center;">
                <div style="font-weight:800;font-size:24px;line-height:1.25;color:#2b2b2b;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 20px 20px;">
                <div style="height:4px;background:#b48a19;border-radius:2px;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-hero',
      name: 'Header – hero met knop',
      category: 'basis',
      description: 'Brede hero-stijl met titel en knop.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Een dag vol beleving' },
        { name: 'subtitle', label: 'Subtitel', type: 'text', default: 'Reserveer direct je tickets' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Boek nu' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:26px 20px;text-align:center;">
                <div style="font-weight:800;font-size:26px;line-height:1.2;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.subtitle)}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'header-hero-image',
      name: 'Header – hero met knop (foto)',
      category: 'basis',
      description: 'Hero met foto-achtergrond, overlay, titel en knop.',
      fields: [
        { name: 'image', label: 'Afbeeldings‑URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Achtergrond' },
        { name: 'overlay', label: 'Overlay kleur (hex)', type: 'text', default: '#000000' },
        { name: 'overlayOpacity', label: 'Overlay dekking (0–1)', type: 'text', default: '0.45' },
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '200' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Een dag vol beleving' },
        { name: 'subtitle', label: 'Subtitel', type: 'text', default: 'Reserveer direct je tickets' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Boek nu' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function (v) {
        function hexToRgb(hex) {
          const m = String(hex || '').trim().replace(/^#/, '');
          const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
          const ok = /^[0-9a-fA-F]{6}$/.test(full);
          if (!ok) return { r: 0, g: 0, b: 0 };
          return {
            r: parseInt(full.slice(0, 2), 16),
            g: parseInt(full.slice(2, 4), 16),
            b: parseInt(full.slice(4, 6), 16)
          };
        }
        const { r, g, b } = hexToRgb(v.overlay || '#000000');
        const a = (function(x){ const f=parseFloat(x); return (f>=0&&f<=1)?f:0.45; })(v.overlayOpacity);
        const h = parseInt(v.height) || 200;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="position:relative;padding:0;">
                <div style="position:relative;width:100%;height:${h}px;background:#000;overflow:hidden;">
                  <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.alt)}" data-field="image" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
                  <div style="position:absolute;inset:0;background:rgba(${r}, ${g}, ${b}, ${a});"></div>
                  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 12px;">
                    <div style="font-weight:800;font-size:22px;line-height:1.2;color:#ffffff;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                    <div style="font-weight:400;font-size:14px;line-height:1.5;color:#ffffff;margin-bottom:12px;">${escapeHtml(v.subtitle)}</div>
                    <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-thin',
      name: 'Scheiding – dun',
      category: 'stijl',
      description: 'Dunne subtiele scheidingslijn.',
      fields: [],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="border-top:1px solid #e0e0e0;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-dotted',
      name: 'Scheiding – dotted',
      category: 'stijl',
      description: 'Gestippelde scheidingslijn.',
      fields: [],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="border-top:1px dotted #cfcfcf;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-dashed',
      name: 'Scheiding – dashed',
      category: 'stijl',
      description: 'Gestreepte scheidingslijn.',
      fields: [],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="border-top:1px dashed #cfcfcf;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-double',
      name: 'Scheiding – dubbel',
      category: 'stijl',
      description: 'Dubbele lijn met ruimte ertussen.',
      fields: [],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="border-top:1px solid #dddddd;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
        <div style="height:6px;line-height:6px;font-size:0;">&nbsp;</div>
        <div style="border-top:1px solid #dddddd;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-accent',
      name: 'Scheiding – accentbalk',
      category: 'stijl',
      description: 'Korte goudkleurige balk in het midden.',
      fields: [
        { name: 'width', label: 'Balkbreedte (px)', type: 'text', default: '80' }
      ],
      template: function (v) {
        const w = parseInt(v.width) || 80;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="text-align:center;">
          <div style="display:inline-block;width:${w}px;height:4px;background:#b48a19;border-radius:2px;">&nbsp;</div>
        </div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-gradient',
      name: 'Scheiding – gradient',
      category: 'stijl',
      description: 'Subtiele horizontale gradientbalk.',
      fields: [],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <div style="height:4px;background:#b48a19;background-image:linear-gradient(90deg,#b48a19, #f1ebda);border-radius:2px;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'spacer',
      name: 'Lege ruimte',
      category: 'stijl',
      description: 'Lege verticale ruimte met instelbare hoogte.',
      fields: [
        { name: 'height', label: 'Hoogte (px)', type: 'text', default: '16' }
      ],
      template: function (v) {
        const h = parseInt(v.height) || 16;
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:0 14px;">
        <div style="height:${h}px; line-height:${h}px; font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'divider-icon-center',
      name: 'Scheiding – icoon in midden',
      category: 'stijl',
      description: 'Lijnen met een klein icoon in het midden.',
      fields: [
        { name: 'icon', label: 'Pictogram‑URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tbody>
            <tr>
              <td style="vertical-align:middle;"><div style="border-top:1px solid #e0e0e0;height:1px;line-height:1px;font-size:0;">&nbsp;</div></td>
              <td style="width:40px;vertical-align:middle;text-align:center;">
                <img src="${escapeHtml(v.icon)}" alt="" style="width:20px;height:20px;border-radius:50%;display:inline-block;">
              </td>
              <td style="vertical-align:middle;"><div style="border-top:1px solid #e0e0e0;height:1px;line-height:1px;font-size:0;">&nbsp;</div></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'gradient-band',
      name: 'Gradient band',
      category: 'stijl',
      description: 'Decoratieve band met gradient achtergrond en titel.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Nieuwsbrief' }
      ],
      template: function (v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;text-align:center;background:#b48a19;background-image:linear-gradient(90deg,#b48a19,#f1ebda);">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;background:#ffffff;border-radius:999px;display:inline-block;padding:6px 14px;">${escapeHtml(v.title)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'boxed-callout',
      name: 'Callout box',
      category: 'stijl',
      description: 'Subtiele kaderbox voor korte boodschappen.',
      fields: [
        { name: 'text', label: 'Tekst', type: 'textarea', default: 'Let op: aangepaste openingstijden tijdens feestdagen.' }
      ],
      template: function (v) {
        const text = escapeHtml(v.text).replace(/\n/g,'<br>');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#fff7e6;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.12);">
          <tbody>
            <tr>
              <td style="padding:16px 20px;">
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;line-height:1.5;">${text}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'stats-card',
      name: 'Statistiekenkaart',
      category: 'info',
      description: 'Kaart met drie grote cijfers en beschrijvingen.',
      fields: [
        { name: 'title', label: 'Hoofdtitel', type: 'text', default: 'Onze statistieken' },
        { name: 'stat1Value', label: 'Waarde 1', type: 'text', default: '150K+' },
        { name: 'stat1Label', label: 'Label 1', type: 'text', default: 'Bezoekers' },
        { name: 'stat2Value', label: 'Waarde 2', type: 'text', default: '120+' },
        { name: 'stat2Label', label: 'Label 2', type: 'text', default: 'Evenementen' },
        { name: 'stat3Value', label: 'Waarde 3', type: 'text', default: '5/5' },
        { name: 'stat3Label', label: 'Label 3', type: 'text', default: 'Beoordeling' }
      ],
      template: function (v) {
        function statBlock(value, label) {
          return `<td style="text-align:center;padding:10px 5px;"><div style="font-weight:800;font-size:32px;color:#b48a19;">${escapeHtml(value)}</div><div style="font-weight:600;font-size:14px;color:#2b2b2b;">${escapeHtml(label)}</div></td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      ${statBlock(v.stat1Value, v.stat1Label)}
                      ${statBlock(v.stat2Value, v.stat2Label)}
                      ${statBlock(v.stat3Value, v.stat3Label)}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    }
  ];

  // Dynamisch rode varianten aanmaken voor alle bestaande kaarten. Hierbij wordt
  // de goudkleur #b48a19 vervangen door de rode huisstijl #e02020. De velden
  // worden gekopieerd zodat de editor dezelfde invoervelden toont.
  (function() {
    const baseCount = cards.length;
    for (let i = 0; i < baseCount; i++) {
      const base = cards[i];
      // Bepaal aan de hand van defaultwaarden of de HTML goud bevat; alleen dan een rode variant maken
      let shouldCreateRed = false;
      try {
        const defaults = {};
        if (Array.isArray(base.fields)) {
          base.fields.forEach(f => { defaults[f.name] = f.default || ''; });
        }
        const sampleHtml = base.template(defaults);
        shouldCreateRed = /#b48a19/i.test(sampleHtml);
      } catch (e) {
        shouldCreateRed = false;
      }
      if (!shouldCreateRed) continue;
      const redCard = {
        id: base.id + '-red',
        name: base.name + ' (rood)',
        category: base.category,
        description: 'Rode variant van ' + base.name.toLowerCase(),
        fields: base.fields.map(f => ({ ...f })),
        template: function(v) {
          const html = base.template(v);
          return html.replace(/#b48a19/gi, '#e02020');
        }
      };
      cards.push(redCard);
    }
  })();

  // Extra kaartvariaties toevoegen om het totaal boven de 60 te brengen. Deze
  // definities volgen hetzelfde patroon als de bestaande kaarten: metadata,
  // invoervelden en een template die inline CSS gebruikt. Alle teksten zijn in
  // het Nederlands en de huisstijlen zijn behouden.
  const extraCards = [
    {
      id: 'icon-list',
      name: 'Iconen lijstkaart',
      category: 'basis',
      description: 'Kaart met drie items, elk met een eigen pictogram.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onze services' },
        { name: 'icon1', label: 'Pictogram 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text1', label: 'Tekst 1', type: 'text', default: 'Eerste service' },
        { name: 'icon2', label: 'Pictogram 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text2', label: 'Tekst 2', type: 'text', default: 'Tweede service' },
        { name: 'icon3', label: 'Pictogram 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text3', label: 'Tekst 3', type: 'text', default: 'Derde service' }
      ],
      template: function(v) {
        function item(icon, text) {
          return `<tr><td style="width:32px;padding-right:8px;vertical-align:top;"><img src="${escapeHtml(icon)}" alt="" style="width:32px;height:32px;object-fit:cover;border-radius:50%;"></td><td style="font-weight:500;font-size:14px;line-height:1.4;color:#2b2b2b;">${escapeHtml(text)}</td></tr>`;
        }
        const rows = [];
        if (v.icon1 && v.text1) rows.push(item(v.icon1, v.text1));
        if (v.icon2 && v.text2) rows.push(item(v.icon2, v.text2));
        if (v.icon3 && v.text3) rows.push(item(v.icon3, v.text3));
        const listRows = rows.join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    ${listRows}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'customizable-card',
      name: 'Aanpasbare kaart',
      category: 'special',
      description: 'Kaart met instelbare lettergrootte en kleuren.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Je titel hier' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Je tekst hier.' },
        { name: 'titleSize', label: 'Titelgrootte (px)', type: 'text', default: '22' },
        { name: 'bodySize', label: 'Tekstgrootte (px)', type: 'text', default: '14' },
        { name: 'titleColor', label: 'Titelkleur (hex)', type: 'text', default: '#2b2b2b' },
        { name: 'bodyColor', label: 'Tekstkleur (hex)', type: 'text', default: '#2b2b2b' },
        { name: 'bgColor', label: 'Achtergrondkleur (hex)', type: 'text', default: '#f9f7f2' }
      ],
      template: function(v) {
        const title = escapeHtml(v.title);
        const body = renderRichText(v.body);
        const titleSize = parseInt(v.titleSize) || 22;
        const bodySize = parseInt(v.bodySize) || 14;
        // Voorkom dat gebruikers een niet-hex code invoeren; fallback naar standaard
        function cleanColor(val, fallback) {
          return /^#?[0-9a-fA-F]{3,8}$/.test(val) ? (val.startsWith('#') ? val : '#' + val) : fallback;
        }
        const titleColor = cleanColor(v.titleColor, '#2b2b2b');
        const bodyColor = cleanColor(v.bodyColor, '#2b2b2b');
        const bgColor = cleanColor(v.bgColor, '#f9f7f2');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${bgColor};border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:${titleSize}px;line-height:1.3;color:${titleColor};margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:${bodySize}px;line-height:1.5;color:${bodyColor};">${body}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'multi-button-card',
      name: 'Meerdere knoppen kaart',
      category: 'special',
      description: 'Een kaart met maximaal drie knoppen onder de tekst.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Titel van de kaart' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Voeg hier je beschrijving toe.' },
        { name: 'button1Label', label: 'Knop 1 tekst', type: 'text', default: 'Meer info' },
        { name: 'button1Link', label: 'Knop 1 link', type: 'text', default: '#' },
        { name: 'button2Label', label: 'Knop 2 tekst', type: 'text', default: '' },
        { name: 'button2Link', label: 'Knop 2 link', type: 'text', default: '' },
        { name: 'button3Label', label: 'Knop 3 tekst', type: 'text', default: '' },
        { name: 'button3Link', label: 'Knop 3 link', type: 'text', default: '' }
      ],
      template: function(v) {
        const buttons = [];
        function buildButton(label, link, color) {
          if (!label) return '';
          return `<a href="${escapeHtml(link || '#')}" style="display:inline-block;margin-right:8px;margin-top:8px;padding:8px 16px;background:${color};color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(label)}</a>`;
        }
        // Eerste knop in goud, tweede in rood, derde in donkergrijs
        buttons.push(buildButton(v.button1Label, v.button1Link, '#b48a19'));
        buttons.push(buildButton(v.button2Label, v.button2Link, '#e02020'));
        buttons.push(buildButton(v.button3Label, v.button3Link, '#2b2b2b'));
        const body = renderRichText(v.body);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;margin-bottom:12px;">${body}</div>
                <div style="display:flex;flex-wrap:wrap;align-items:center;">
                  ${buttons.join('')}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'separator-card',
      name: 'Kaart met scheidingslijnen',
      category: 'special',
      description: 'Een kaart met meerdere tekstblokken gescheiden door lijnen.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onderwerpen' },
        { name: 'text1', label: 'Tekst 1', type: 'textarea', default: 'Eerste paragraaf.' },
        { name: 'text2', label: 'Tekst 2', type: 'textarea', default: 'Tweede paragraaf.' },
        { name: 'text3', label: 'Tekst 3', type: 'textarea', default: 'Derde paragraaf.' }
      ],
      template: function(v) {
        const sections = [];
        function block(text, isLast) {
          const html = `<div style="padding:12px 0;"><div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;">${escapeHtml(text).replace(/\n/g,'<br>')}</div></div>`;
          return isLast ? html : html + `<hr style="border:0;margin:0;">`;
        }
        if (v.text1) sections.push(block(v.text1, false));
        if (v.text2) sections.push(block(v.text2, false));
        if (v.text3) sections.push(block(v.text3, true));
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                ${sections.join('')}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'multi-icon-list',
      name: 'Grote iconenlijst',
      category: 'info',
      description: 'Een uitgebreide lijst met maximaal tien iconen en teksten.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onze voordelen' },
        { name: 'icon1', label: 'Icon 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text1', label: 'Tekst 1', type: 'text', default: 'Punt één' },
        { name: 'icon2', label: 'Icon 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text2', label: 'Tekst 2', type: 'text', default: 'Punt twee' },
        { name: 'icon3', label: 'Icon 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text3', label: 'Tekst 3', type: 'text', default: 'Punt drie' },
        { name: 'icon4', label: 'Icon 4 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text4', label: 'Tekst 4', type: 'text', default: '' },
        { name: 'icon5', label: 'Icon 5 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text5', label: 'Tekst 5', type: 'text', default: '' },
        { name: 'icon6', label: 'Icon 6 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text6', label: 'Tekst 6', type: 'text', default: '' },
        { name: 'icon7', label: 'Icon 7 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text7', label: 'Tekst 7', type: 'text', default: '' },
        { name: 'icon8', label: 'Icon 8 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text8', label: 'Tekst 8', type: 'text', default: '' },
        { name: 'icon9', label: 'Icon 9 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text9', label: 'Tekst 9', type: 'text', default: '' },
        { name: 'icon10', label: 'Icon 10 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'text10', label: 'Tekst 10', type: 'text', default: '' }
      ],
      template: function(v) {
        const rows = [];
        function add(icon, text) {
          rows.push(`<tr><td style="width:32px;padding-right:10px;vertical-align:top;"><img src="${escapeHtml(icon)}" alt="" style="width:32px;height:32px;border-radius:50%;object-fit:cover;"></td><td style="font-weight:500;font-size:14px;color:#2b2b2b;line-height:1.4;">${escapeHtml(text)}</td></tr>`);
        }
        for (let i = 1; i <= 10; i++) {
          const txt = v['text' + i];
          const ic = v['icon' + i];
          if (txt) add(ic || '', txt);
        }
        const listHtml = rows.join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    ${listHtml}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'icon-step',
      name: 'Iconen stappenkaart',
      category: 'speciale stijl',
      description: 'Stappenplan met pictogrammen voor elke stap.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Hoe werkt het?' },
        { name: 'icon1', label: 'Stap 1 pictogram URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'step1Title', label: 'Stap 1 titel', type: 'text', default: 'Stap 1' },
        { name: 'step1Desc', label: 'Stap 1 beschrijving', type: 'textarea', default: 'Beschrijving van stap één.' },
        { name: 'icon2', label: 'Stap 2 pictogram URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'step2Title', label: 'Stap 2 titel', type: 'text', default: 'Stap 2' },
        { name: 'step2Desc', label: 'Stap 2 beschrijving', type: 'textarea', default: 'Beschrijving van stap twee.' },
        { name: 'icon3', label: 'Stap 3 pictogram URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'step3Title', label: 'Stap 3 titel', type: 'text', default: 'Stap 3' },
        { name: 'step3Desc', label: 'Stap 3 beschrijving', type: 'textarea', default: 'Beschrijving van stap drie.' }
      ],
      template: function(v) {
        function row(icon, title, desc) {
          return `<tr><td style="width:40px;padding-right:10px;vertical-align:top;"><img src="${escapeHtml(icon)}" alt="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;"></td><td><div style="font-weight:700;font-size:14px;color:#2b2b2b;">${escapeHtml(title)}</div><div style="font-weight:400;font-size:13px;color:#2b2b2b;">${escapeHtml(desc).replace(/\n/g,'<br>')}</div></td></tr>`;
        }
        const rows = [];
        if (v.step1Title) rows.push(row(v.icon1 || '', v.step1Title, v.step1Desc || ''));
        if (v.step2Title) rows.push(row(v.icon2 || '', v.step2Title, v.step2Desc || ''));
        if (v.step3Title) rows.push(row(v.icon3 || '', v.step3Title, v.step3Desc || ''));
        const stepsHtml = rows.join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                  <tbody>
                    ${stepsHtml}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'four-features',
      name: 'Vier kenmerken kaart',
      category: 'speciale stijl',
      description: 'Vier kolommen met pictogram, titel en tekst.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Onze kenmerken' },
        { name: 'icon1', label: 'Icon 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title1', label: 'Kenmerk 1 titel', type: 'text', default: 'Kwaliteit' },
        { name: 'desc1', label: 'Kenmerk 1 tekst', type: 'text', default: 'Onze hoogste kwaliteit.' },
        { name: 'icon2', label: 'Icon 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title2', label: 'Kenmerk 2 titel', type: 'text', default: 'Service' },
        { name: 'desc2', label: 'Kenmerk 2 tekst', type: 'text', default: 'Uitstekende service.' },
        { name: 'icon3', label: 'Icon 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title3', label: 'Kenmerk 3 titel', type: 'text', default: 'Sfeer' },
        { name: 'desc3', label: 'Kenmerk 3 tekst', type: 'text', default: 'Gezellige sfeer.' },
        { name: 'icon4', label: 'Icon 4 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'title4', label: 'Kenmerk 4 titel', type: 'text', default: 'Prijs' },
        { name: 'desc4', label: 'Kenmerk 4 tekst', type: 'text', default: 'Betaalbare prijs.' }
      ],
      template: function(v) {
        function col(icon, title, desc) {
          return `<td style="width:25%;vertical-align:top;padding:0 8px;"><div style="text-align:center;"><img src="${escapeHtml(icon)}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;margin-bottom:8px;"><div style="font-weight:700;font-size:14px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(title)}</div><div style="font-weight:400;font-size:12px;color:#2b2b2b;line-height:1.4;">${escapeHtml(desc)}</div></div></td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;text-align:center;margin-bottom:16px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      ${col(v.icon1 || '', v.title1, v.desc1)}
                      ${col(v.icon2 || '', v.title2, v.desc2)}
                      ${col(v.icon3 || '', v.title3, v.desc3)}
                      ${col(v.icon4 || '', v.title4, v.desc4)}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'social-card',
      name: 'Social media kaart',
      category: 'info',
      description: 'Kaart met sociale media‑pictogrammen en links.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Volg ons' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Volg ons op sociale media voor het laatste nieuws.' },
        { name: 'facebook', label: 'Facebook link', type: 'text', default: '#' },
        { name: 'facebookIcon', label: 'Facebook icon URL', type: 'text', default: 'https://www.svgrepo.com/show/506477/facebook.svg' },
        { name: 'instagram', label: 'Instagram link', type: 'text', default: '#' },
        { name: 'instagramIcon', label: 'Instagram icon URL', type: 'text', default: 'https://www.svgrepo.com/show/521711/instagram.svg' },
        { name: 'tiktok', label: 'TikTok link', type: 'text', default: '#' },
        { name: 'tiktokIcon', label: 'TikTok icon URL', type: 'text', default: 'https://www.svgrepo.com/show/473806/tiktok.svg' }
      ],
      template: function(v) {
        function iconLink(url, src) {
          return `<a href="${escapeHtml(url)}" style="margin:0 8px;text-decoration:none;"><img src="${escapeHtml(src)}" alt="" style="width:28px;height:28px;"></a>`;
        }
        // Standaard icon-URL's (overschrijfbaar via velden)
        const fb = 'https://www.svgrepo.com/show/506477/facebook.svg';
        const ig = 'https://www.svgrepo.com/show/521711/instagram.svg';
        const tk = 'https://www.svgrepo.com/show/473806/tiktok.svg';
        const icons = [
          { url: v.facebook, svg: v.facebookIcon || fb },
          { url: v.instagram, svg: v.instagramIcon || ig },
          { url: v.tiktok, svg: v.tiktokIcon || tk }
        ];
        const links = icons.map(item => iconLink(item.url, item.svg)).join('');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:12px;">${renderRichText(v.body)}</div>
                <div style="text-align:center;">${links}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'coupon-card',
      name: 'Kortingsbon kaart',
      category: 'speciale stijl',
      description: 'Een kaart met een opvallende korting en couponcode.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Speciale aanbieding' },
        { name: 'price', label: 'Prijs of korting', type: 'text', default: '€10 korting' },
        { name: 'body', label: 'Omschrijving', type: 'textarea', default: 'Korte beschrijving van de aanbieding.' },
        { name: 'code', label: 'Couponcode', type: 'text', default: 'KORTING10' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Bestel nu' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#fdecec;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#e02020;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:800;font-size:32px;color:#e02020;margin-bottom:4px;">${escapeHtml(v.price)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;margin-bottom:12px;">${renderRichText(v.body)}</div>
                <div style="font-weight:700;font-size:18px;color:#2b2b2b;margin-bottom:12px;">Couponcode: <span style="color:#e02020;">${escapeHtml(v.code)}</span></div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:10px 20px;background:#e02020;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'newsletter-card',
      name: 'Nieuwsbrief aanmeldkaart',
      category: 'info',
      description: 'Call‑to‑action om je te abonneren op de nieuwsbrief.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Blijf op de hoogte!' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Schrijf je in voor onze nieuwsbrief en mis geen updates.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Meld je aan' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow-hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;margin-bottom:16px;">${renderRichText(v.body)}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:10px 24px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'calendar-card',
      name: 'Kalender kaart',
      category: 'speciale stijl',
      description: 'Een kaart met drie agendaitems en tijden.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Agenda' },
        { name: 'time1', label: 'Tijd 1', type: 'text', default: '10:00' },
        { name: 'desc1', label: 'Beschrijving 1', type: 'text', default: 'Opening' },
        { name: 'time2', label: 'Tijd 2', type: 'text', default: '12:00' },
        { name: 'desc2', label: 'Beschrijving 2', type: 'text', default: 'Lunch' },
        { name: 'time3', label: 'Tijd 3', type: 'text', default: '14:00' },
        { name: 'desc3', label: 'Beschrijving 3', type: 'text', default: 'Afsluiting' }
      ],
      template: function(v) {
        function row(time, desc, isLast) {
          return `<tr><td style="width:60px;padding-right:10px;font-weight:700;font-size:14px;color:#2b2b2b;">${escapeHtml(time)}</td><td style="font-weight:500;font-size:14px;color:#2b2b2b;">${escapeHtml(desc)}</td></tr>${!isLast?'<tr><td colspan="2" style="padding:4px 0;"><hr style="border:0;margin:0;"></td></tr>':''}`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    ${row(v.time1, v.desc1, false)}
                    ${row(v.time2, v.desc2, false)}
                    ${row(v.time3, v.desc3, true)}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'video-card',
      name: 'Videokaart',
      category: 'foto',
      description: 'Kaart met afbeelding en play‑icoon voor videoverwijzing.',
      fields: [
        { name: 'image', label: 'Afbeelding URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2022/11/Speelparadijs-Kok-Experience-Lelystad-2.jpg' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Bekijk onze video' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving van de video.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Bekijk video' },
        { name: 'buttonLink', label: 'Videolink', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;">
                <div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;">
                  <img src="${escapeHtml(v.image)}" alt="Videobeeld" data-field="image" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
                  <a href="${escapeHtml(v.buttonLink)}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.6);padding:12px;border-radius:50%;"><img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIGZpbGw9IiNmZmYiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUuMTE3IDIxLjI1N2w2LjkyOC00LjcyNi02LjkyOC00LjcyNnY5LjQ1MnoiLz48L3N2Zz4=" alt="Play" style="width:24px;height:24px;"></a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;margin-bottom:16px;">${renderRichText(v.body)}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:8px 16px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'profile-card',
      name: 'Profielkaart',
      category: 'info',
      description: 'Kaart met foto, naam, functie en beschrijving.',
      fields: [
        { name: 'image', label: 'Foto URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/04/IK1A4055-kopie-2048x1365.jpeg' },
        { name: 'name', label: 'Naam', type: 'text', default: 'Naam persoon' },
        { name: 'role', label: 'Functie', type: 'text', default: 'Functie' },
        { name: 'body', label: 'Beschrijving', type: 'textarea', default: 'Korte bio van deze persoon.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;">
                <img src="${escapeHtml(v.image)}" alt="Profiel" data-field="image" style="display:block;width:100%;height:200px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(v.name)}</div>
                <div style="font-weight:600;font-size:14px;color:#b48a19;margin-bottom:8px;">${escapeHtml(v.role)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;margin-bottom:16px;">${renderRichText(v.body)}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:8px 16px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'photo-grid-four',
      name: 'Fotorooster 2x2',
      category: 'foto',
      description: 'Vier afbeeldingen in een raster met titel en tekst.',
      fields: [
        { name: 'image1', label: 'Afbeelding 1 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6144-2048x1365.jpg' },
        { name: 'image2', label: 'Afbeelding 2 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
        { name: 'image3', label: 'Afbeelding 3 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6683-2048x1365.jpg' },
        { name: 'image4', label: 'Afbeelding 4 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/03/Restaurant-2-2048x1365.jpg' },
        { name: 'cellHeight', label: 'Vakhoogte (px)', type: 'text', default: '60' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Galerij' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Beschrijving van de fotogalerij.' }
      ],
      template: function(v) {
        const h = parseInt(v.cellHeight) || 60;
        function cell(img, key) {
          return `<td style="width:50%;padding:0;vertical-align:top;line-height:0;"><div style="height:${h}px;overflow:hidden;"><img src="${escapeHtml(img)}" alt="Foto" data-field="${key}" style="display:block;width:100%;height:100%;object-fit:cover;object-position:center ${v[key + 'Pos'] || '50'}%;"></div></td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    <tr>${cell(v.image1, 'image1')}${cell(v.image2, 'image2')}</tr>
                    <tr>${cell(v.image3, 'image3')}${cell(v.image4, 'image4')}</tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:8px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;">${renderRichText(v.body)}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'price-comparison',
      name: 'Prijsvergelijking',
      category: 'speciale stijl',
      description: 'Vergelijk twee abonnementsopties of aanbiedingen.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Kies je plan' },
        { name: 'plan1Name', label: 'Plan 1 naam', type: 'text', default: 'Standaard' },
        { name: 'plan1Price', label: 'Plan 1 prijs', type: 'text', default: '€19,95' },
        { name: 'plan1Feature1', label: 'Plan 1 feature 1', type: 'text', default: 'Feature A' },
        { name: 'plan1Feature2', label: 'Plan 1 feature 2', type: 'text', default: 'Feature B' },
        { name: 'plan1Feature3', label: 'Plan 1 feature 3', type: 'text', default: 'Feature C' },
        { name: 'plan1Button', label: 'Plan 1 knoptekst', type: 'text', default: 'Selecteer' },
        { name: 'plan1Link', label: 'Plan 1 knoplink', type: 'text', default: '#' },
        { name: 'plan2Name', label: 'Plan 2 naam', type: 'text', default: 'Premium' },
        { name: 'plan2Price', label: 'Plan 2 prijs', type: 'text', default: '€29,95' },
        { name: 'plan2Feature1', label: 'Plan 2 feature 1', type: 'text', default: 'Feature X' },
        { name: 'plan2Feature2', label: 'Plan 2 feature 2', type: 'text', default: 'Feature Y' },
        { name: 'plan2Feature3', label: 'Plan 2 feature 3', type: 'text', default: 'Feature Z' },
        { name: 'plan2Button', label: 'Plan 2 knoptekst', type: 'text', default: 'Selecteer' },
        { name: 'plan2Link', label: 'Plan 2 knoplink', type: 'text', default: '#' }
      ],
      template: function(v) {
        function col(name, price, f1, f2, f3, btn, link, highlighted) {
          const bg = highlighted ? '#b48a19' : '#ffffff';
          const color = highlighted ? '#ffffff' : '#2b2b2b';
          const featureColor = highlighted ? '#f9f7f2' : '#2b2b2b';
          const border = '0';
          return `<td style="width:50%;vertical-align:top;padding:20px;border:${border};background:${bg};border-radius:10px;">
            <div style="font-weight:800;font-size:18px;color:${color};margin-bottom:4px;">${escapeHtml(name)}</div>
            <div style="font-weight:700;font-size:28px;color:${color};margin-bottom:12px;">${escapeHtml(price)}</div>
            <ul style="padding-left:20px;margin:0 0 16px 0;color:${featureColor};font-weight:400;font-size:14px;line-height:1.5;list-style-type:disc;">
              <li>${escapeHtml(f1)}</li>
              <li>${escapeHtml(f2)}</li>
              <li>${escapeHtml(f3)}</li>
            </ul>
            <a href="${escapeHtml(link)}" style="display:inline-block;padding:8px 16px;background:${highlighted?'#ffffff':'#b48a19'};color:${highlighted?'#b48a19':'#ffffff'};border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(btn)}</a>
          </td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:16px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      ${col(v.plan1Name, v.plan1Price, v.plan1Feature1, v.plan1Feature2, v.plan1Feature3, v.plan1Button, v.plan1Link, false)}
                      ${col(v.plan2Name, v.plan2Price, v.plan2Feature1, v.plan2Feature2, v.plan2Feature3, v.plan2Button, v.plan2Link, true)}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'testimonial-double',
      name: 'Dubbele testimonial',
      category: 'speciale stijl',
      description: 'Twee testimonials naast elkaar met naam.',
      fields: [
        { name: 'quote1', label: 'Citaat 1', type: 'textarea', default: '"Dit is een geweldige ervaring!"' },
        { name: 'name1', label: 'Naam 1', type: 'text', default: 'Naam klant' },
        { name: 'quote2', label: 'Citaat 2', type: 'textarea', default: '"Fantastische service en sfeer!"' },
        { name: 'name2', label: 'Naam 2', type: 'text', default: 'Naam klant' }
      ],
      template: function(v) {
        function col(quote, name) {
          return `<td style="width:50%;vertical-align:top;padding:20px;">
            <div style="font-weight:600;font-size:14px;color:#2b2b2b;margin-bottom:4px;"><span style="color:#b48a19;font-size:24px;line-height:0;vertical-align:middle;">&ldquo;</span>${escapeHtml(quote)}</div>
            <div style="font-weight:700;font-size:14px;color:#2b2b2b;margin-top:8px;">&mdash; ${escapeHtml(name)}</div>
          </td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              ${col(v.quote1, v.name1)}
              ${col(v.quote2, v.name2)}
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'icon-stats',
      name: 'Statistieken met iconen',
      category: 'info',
      description: 'Kaart met drie statistieken, elk voorzien van een pictogram.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Kerncijfers' },
        { name: 'icon1', label: 'Icon 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'value1', label: 'Waarde 1', type: 'text', default: '10K+' },
        { name: 'label1', label: 'Label 1', type: 'text', default: 'Gasten' },
        { name: 'icon2', label: 'Icon 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'value2', label: 'Waarde 2', type: 'text', default: '50+' },
        { name: 'label2', label: 'Label 2', type: 'text', default: 'Evenementen' },
        { name: 'icon3', label: 'Icon 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
        { name: 'value3', label: 'Waarde 3', type: 'text', default: '5/5' },
        { name: 'label3', label: 'Label 3', type: 'text', default: 'Rating' }
      ],
      template: function(v) {
        function col(icon, value, label) {
          return `<td style="text-align:center;padding:10px 5px;"><img src="${escapeHtml(icon)}" alt="" style="width:32px;height:32px;object-fit:cover;border-radius:50%;margin-bottom:4px;"><div style="font-weight:800;font-size:28px;color:#b48a19;">${escapeHtml(value)}</div><div style="font-weight:600;font-size:14px;color:#2b2b2b;">${escapeHtml(label)}</div></td>`;
        }
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    <tr>
                      ${col(v.icon1 || '', v.value1, v.label1)}
                      ${col(v.icon2 || '', v.value2, v.label2)}
                      ${col(v.icon3 || '', v.value3, v.label3)}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'map-card',
      name: 'Kaart met locatie',
      category: 'info',
      description: 'Kaart met kaartafbeelding, adres en knop.',
      fields: [
        { name: 'map', label: 'Kaart afbeelding URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/04/IK1A3593-kopie-2048x1365.jpeg' },
        { name: 'title', label: 'Titel', type: 'text', default: 'Waar vind je ons?' },
        { name: 'address', label: 'Adres', type: 'textarea', default: 'Straatnaam 1\n1234 AB Plaats' },
        { name: 'body', label: 'Tekst', type: 'textarea', default: 'Beschrijving van de locatie.' },
        { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Plan route' },
        { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' }
      ],
      template: function(v) {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;">
                <img src="${escapeHtml(v.map)}" alt="Kaart" data-field="map" style="display:block;width:100%;height:200px;object-fit:cover;object-position:center ${v.mapPos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:20px;color:#2b2b2b;margin-bottom:6px;">${escapeHtml(v.title)}</div>
                <div style="font-weight:600;font-size:14px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(v.address).replace(/\n/g,'<br>')}</div>
                <div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;margin-bottom:16px;">${escapeHtml(v.body).replace(/\n/g,'<br>')}</div>
                <a href="${escapeHtml(v.buttonLink)}" style="display:inline-block;padding:8px 16px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.buttonLabel)}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },

    // Nieuwe kaart: Nieuwsheader met accent lijn
    {
      id: 'news-header-accent',
      name: 'Nieuwsheader met accent',
      category: 'basis',
      description: 'Een header met titel, accent lijn en beschrijving - perfect voor nieuwssecties.',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', default: 'Nieuws' },
        { name: 'description', label: 'Beschrijving', type: 'textarea', default: 'Lees het laatste nieuws en zie wat er speelt.' },
        { name: 'accentColor', label: 'Accent kleur', type: 'text', default: '#e02020' }
      ],
      template: function (v) {
        const title = escapeHtml(v.title);
        const description = renderRichText(v.description);
        const accentColor = escapeHtml(v.accentColor);
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;text-align:center;">
                <h4 style="margin:0;font-size:24px;line-height:1.4;font-family:Ubuntu, Arial, sans-serif;text-align:center;letter-spacing:0.5px;color:#000;">
                  <strong>${title}</strong>
                </h4>
                <div style="width:100px;height:2px;background:${accentColor};margin:8px auto 8px auto;border-radius:2px;"></div>
                <p style="margin:0;font-size:14px;line-height:1.4;font-family:Ubuntu, Arial, sans-serif;text-align:center;color:#333;">
                  ${description}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    }
    ,
    {
      id: 'spacer-line',
      name: 'Spacer – dunne lijn',
      category: 'stijl',
      description: 'Dunne grijze lijn als scheiding tussen contentblokken.',
      fields: [ ],
      template: function () {
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <div style="border-top:1px solid #e0e0e0;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    },
    {
      id: 'event-premieres-list',
      name: 'Premières – lijst (tot 10 films)',
      category: 'cta',
      description: 'Lijst met premières met tags, titel/subtitel, ticketlink en datumregel.',
      fields: [
        { name: 'titleMain', label: 'Hoofdkop', type: 'text', default: 'PREMIÈRES VOLGENDE WEEK' },
        { name: 'accentColor', label: 'Accentkleur (hex)', type: 'text', default: '#e02020' },

        { name: 'tag1_1', label: 'Item 1 – Tag 1', type: 'text', default: 'LELY' },
        { name: 'tag2_1', label: 'Item 1 – Tag 2', type: 'text', default: '' },
        { name: 'title_1', label: 'Item 1 – Titel', type: 'text', default: 'The North' },
        { name: 'subtitle_1', label: 'Item 1 – Subtitel (optioneel)', type: 'text', default: 'Filmtheater' },
        { name: 'link_1', label: 'Item 1 – Ticketlink', type: 'text', default: 'https://www.kokcinemaxx.nl/film/the-north-filmtheater/' },
        { name: 'datePrefix_1', label: 'Item 1 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: 'Op' },
        { name: 'dateHighlight_1', label: 'Item 1 – Datum (geaccentueerd)', type: 'text', default: 'dinsdag 9 september' },
        { name: 'location_1', label: 'Item 1 – Locatie (optioneel)', type: 'text', default: 'Lelystad' },

        { name: 'tag1_2', label: 'Item 2 – Tag 1', type: 'text', default: "H'WIJK" },
        { name: 'tag2_2', label: 'Item 2 – Tag 2', type: 'text', default: 'LELY' },
        { name: 'title_2', label: 'Item 2 – Titel', type: 'text', default: 'Downton Abbey: The Grand Finale' },
        { name: 'subtitle_2', label: 'Item 2 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_2', label: 'Item 2 – Ticketlink', type: 'text', default: 'https://www.kokcinemaxx.nl/film/downtonabbey/' },
        { name: 'datePrefix_2', label: 'Item 2 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: 'Vanaf' },
        { name: 'dateHighlight_2', label: 'Item 2 – Datum (geaccentueerd)', type: 'text', default: 'woensdag 10 september' },
        { name: 'location_2', label: 'Item 2 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_3', label: 'Item 3 – Tag 1', type: 'text', default: 'LELY' },
        { name: 'tag2_3', label: 'Item 3 – Tag 2', type: 'text', default: '' },
        { name: 'title_3', label: 'Item 3 – Titel', type: 'text', default: 'Demon Slayer: Kimetsu No Yaiba Infinity Castle' },
        { name: 'subtitle_3', label: 'Item 3 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_3', label: 'Item 3 – Ticketlink', type: 'text', default: 'https://www.kokcinemaxx.nl/film/demon-slayer-kimetsu-no-yaiba-infinity-castle/' },
        { name: 'datePrefix_3', label: 'Item 3 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: 'Vanaf' },
        { name: 'dateHighlight_3', label: 'Item 3 – Datum (geaccentueerd)', type: 'text', default: 'donderdag 11 september' },
        { name: 'location_3', label: 'Item 3 – Locatie (optioneel)', type: 'text', default: 'Lelystad' },

        { name: 'tag1_4', label: 'Item 4 – Tag 1', type: 'text', default: "H'WIJK" },
        { name: 'tag2_4', label: 'Item 4 – Tag 2', type: 'text', default: 'LELY' },
        { name: 'title_4', label: 'Item 4 – Titel', type: 'text', default: 'Berenbende: Robotchaos! (NL)' },
        { name: 'subtitle_4', label: 'Item 4 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_4', label: 'Item 4 – Ticketlink', type: 'text', default: 'https://www.kokcinemaxx.nl/film/berenbende-robotchaos-nl-3d/' },
        { name: 'datePrefix_4', label: 'Item 4 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: 'Vanaf' },
        { name: 'dateHighlight_4', label: 'Item 4 – Datum (geaccentueerd)', type: 'text', default: 'zaterdag 13 september' },
        { name: 'location_4', label: 'Item 4 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_5', label: 'Item 5 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_5', label: 'Item 5 – Tag 2', type: 'text', default: '' },
        { name: 'title_5', label: 'Item 5 – Titel', type: 'text', default: '' },
        { name: 'subtitle_5', label: 'Item 5 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_5', label: 'Item 5 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_5', label: 'Item 5 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_5', label: 'Item 5 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_5', label: 'Item 5 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_6', label: 'Item 6 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_6', label: 'Item 6 – Tag 2', type: 'text', default: '' },
        { name: 'title_6', label: 'Item 6 – Titel', type: 'text', default: '' },
        { name: 'subtitle_6', label: 'Item 6 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_6', label: 'Item 6 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_6', label: 'Item 6 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_6', label: 'Item 6 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_6', label: 'Item 6 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_7', label: 'Item 7 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_7', label: 'Item 7 – Tag 2', type: 'text', default: '' },
        { name: 'title_7', label: 'Item 7 – Titel', type: 'text', default: '' },
        { name: 'subtitle_7', label: 'Item 7 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_7', label: 'Item 7 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_7', label: 'Item 7 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_7', label: 'Item 7 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_7', label: 'Item 7 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_8', label: 'Item 8 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_8', label: 'Item 8 – Tag 2', type: 'text', default: '' },
        { name: 'title_8', label: 'Item 8 – Titel', type: 'text', default: '' },
        { name: 'subtitle_8', label: 'Item 8 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_8', label: 'Item 8 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_8', label: 'Item 8 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_8', label: 'Item 8 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_8', label: 'Item 8 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_9', label: 'Item 9 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_9', label: 'Item 9 – Tag 2', type: 'text', default: '' },
        { name: 'title_9', label: 'Item 9 – Titel', type: 'text', default: '' },
        { name: 'subtitle_9', label: 'Item 9 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_9', label: 'Item 9 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_9', label: 'Item 9 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_9', label: 'Item 9 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_9', label: 'Item 9 – Locatie (optioneel)', type: 'text', default: '' },

        { name: 'tag1_10', label: 'Item 10 – Tag 1', type: 'text', default: '' },
        { name: 'tag2_10', label: 'Item 10 – Tag 2', type: 'text', default: '' },
        { name: 'title_10', label: 'Item 10 – Titel', type: 'text', default: '' },
        { name: 'subtitle_10', label: 'Item 10 – Subtitel (optioneel)', type: 'text', default: '' },
        { name: 'link_10', label: 'Item 10 – Ticketlink', type: 'text', default: '' },
        { name: 'datePrefix_10', label: 'Item 10 – Datumvoorvoegsel (Op/Vanaf)', type: 'text', default: '' },
        { name: 'dateHighlight_10', label: 'Item 10 – Datum (geaccentueerd)', type: 'text', default: '' },
        { name: 'location_10', label: 'Item 10 – Locatie (optioneel)', type: 'text', default: '' }
      ],
      template: function(v) {
        function tagBadge(label) {
          if (!label) return '';
          const txt = escapeHtml(label);
          const l = txt.toLowerCase();
          const bg = l.includes('h\'wijk') || l.includes('h’wijk') ? '#e02020' : '#b48a19';
          return `<span style="display:inline-block;margin-right:6px;padding:3px 10px;border-radius:999px;background:${bg};color:#fff;font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;">${txt}</span>`;
        }
        function buildItem(i) {
          const t1 = v['tag1_' + i] || '';
          const t2 = v['tag2_' + i] || '';
          const title = v['title_' + i] || '';
          const subtitle = v['subtitle_' + i] || '';
          const link = v['link_' + i] || '';
          const datePrefix = v['datePrefix_' + i] || '';
          const dateHl = v['dateHighlight_' + i] || '';
          const location = v['location_' + i] || '';
          if (!title && !link) return '';
          const tagsHtml = (t1 ? tagBadge(t1) : '') + (t2 ? tagBadge(t2) : '');
          const subtitleHtml = subtitle ? ` <span style="color:#777;font-weight:400;">(${escapeHtml(subtitle)})</span>` : '';
          const ticket = link ? `<a href="${escapeHtml(link)}" target="_blank" style="margin-left:12px;display:inline-block;"><div style="width:26px;height:26px;border-radius:50%;background:#2b2b2b;display:flex;align-items:center;justify-content:center;"><img src="https://www.svgrepo.com/show/535691/ticket.svg" alt="Ticket" width="14" height="14" style="display:block;filter:invert(1);"></div></a>` : '';
          const dateLine = (datePrefix || dateHl || location)
            ? `<div style="margin-top:4px;font-size:14px;color:#555;">${escapeHtml(datePrefix || '')}${datePrefix? ' ' : ''}<span style="color:#b8312f;font-weight:600;">${escapeHtml(dateHl)}</span>${location ? ' in ' + escapeHtml(location) : ''}</div>`
            : '';
          return `
<div style="margin:0 0 18px 0;font-family:Ubuntu, Arial, sans-serif;">
  <div style="margin:0 0 8px 0;">${tagsHtml}</div>
  <div style="display:flex;align-items:center;justify-content:space-between;">
    <div style="font-weight:800;font-size:18px;line-height:1.3;color:#2b2b2b;">${escapeHtml(title)}${subtitleHtml}</div>
    ${ticket}
  </div>
  ${dateLine}
</div>`;
        }
        const items = [];
        for (let i = 1; i <= 10; i++) {
          const block = buildItem(i);
          if (block) items.push(block);
        }
        const accent = /^#?[0-9a-fA-F]{3,8}$/.test(v.accentColor) ? (v.accentColor.startsWith('#') ? v.accentColor : '#' + v.accentColor) : '#e02020';
        const title = escapeHtml(v.titleMain || '');
        const itemsHtml = items.join('\n');
        return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                ${title ? `<h4 style="margin:0;font-size:20px;line-height:1.4;font-family:Ubuntu, Arial, sans-serif;text-align:center;letter-spacing:0.5px;color:#000;"><strong>${title}</strong></h4>` : ''}
                ${title ? `<div style="width:100px;height:2px;background:${accent};margin:8px auto 20px auto;border-radius:2px;"></div>` : ''}
                ${itemsHtml}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
      }
    }
  ];

  extraCards.forEach(card => cards.push(card));

  // Voeg aanvullende kaartvariaties toe die niet via extraCards zijn gedefinieerd. Deze kaarten
  // bevatten uitgebreide mogelijkheden voor aanpassing van lettergroottes en kleuren en een raster
  // met maximaal zes pictogrammen. We voegen ze direct toe aan de kaartenlijst zodat ze ook
  // beschikbaar zijn voor dynamische rode varianten.
  cards.push({
    id: 'customizable-image-card',
    name: 'Aanpasbare foto kaart',
    category: 'special',
    description: 'Kaart met afbeelding, tekst en knop, waarbij kleuren en lettergroottes instelbaar zijn.',
    fields: [
      { name: 'image', label: 'Afbeelding URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
      { name: 'alt', label: 'Alt‑tekst', type: 'text', default: 'Beschrijving van afbeelding' },
      { name: 'title', label: 'Titel', type: 'text', default: 'Je titel hier' },
      { name: 'body', label: 'Tekst', type: 'textarea', default: 'Je tekst hier.' },
      { name: 'buttonLabel', label: 'Knoptekst', type: 'text', default: 'Lees meer' },
      { name: 'buttonLink', label: 'Knoplink', type: 'text', default: '#' },
      { name: 'titleSize', label: 'Titelgrootte (px)', type: 'text', default: '22' },
      { name: 'bodySize', label: 'Tekstgrootte (px)', type: 'text', default: '14' },
      { name: 'titleColor', label: 'Titelkleur (hex)', type: 'text', default: '#2b2b2b' },
      { name: 'bodyColor', label: 'Tekstkleur (hex)', type: 'text', default: '#2b2b2b' },
      { name: 'bgColor', label: 'Achtergrondkleur (hex)', type: 'text', default: '#f9f7f2' },
      { name: 'buttonColor', label: 'Knopkleur (hex)', type: 'text', default: '#b48a19' },
      { name: 'buttonTextColor', label: 'Knoptekstkleur (hex)', type: 'text', default: '#ffffff' }
    ],
    template: function(v) {
      function cleanColor(val, fallback) {
        return /^#?[0-9a-fA-F]{3,8}$/.test(val) ? (val.startsWith('#') ? val : '#' + val) : fallback;
      }
      const titleSize = parseInt(v.titleSize) || 22;
      const bodySize = parseInt(v.bodySize) || 14;
      const titleColor = cleanColor(v.titleColor, '#2b2b2b');
      const bodyColor = cleanColor(v.bodyColor, '#2b2b2b');
      const bgColor = cleanColor(v.bgColor, '#f9f7f2');
      const buttonColor = cleanColor(v.buttonColor, '#b48a19');
      const buttonTextColor = cleanColor(v.buttonTextColor, '#ffffff');
      const img = escapeHtml(v.image);
      const alt = escapeHtml(v.alt);
      const title = escapeHtml(v.title);
      const bodyText = renderRichText(v.body);
      const btnLabel = escapeHtml(v.buttonLabel);
      const btnLink = escapeHtml(v.buttonLink);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${bgColor};border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:0;line-height:0;">
                <img src="${img}" alt="${alt}" data-field="image" style="display:block;width:100%;height:200px;object-fit:cover;object-position:center ${v.imagePos || '50'}%;">
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:${titleSize}px;line-height:1.3;color:${titleColor};margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:${bodySize}px;line-height:1.5;color:${bodyColor};margin-bottom:12px;">${bodyText}</div>
                <a href="${btnLink}" style="display:inline-block;padding:10px 18px;background:${buttonColor};color:${buttonTextColor};border-radius:999px;font-weight:700;font-size:${Math.max(bodySize, 14)}px;text-decoration:none;">${btnLabel}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'icon-grid-card',
    name: 'Iconen rasterkaart',
    category: 'info',
    description: 'Kaart met tot zes pictogrammen, elk met een titel en tekst in een raster.',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Onze kwaliteiten' },
      { name: 'icon1', label: 'Icon 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label1', label: 'Titel 1', type: 'text', default: 'Titel 1' },
      { name: 'text1', label: 'Tekst 1', type: 'textarea', default: 'Beschrijving 1' },
      { name: 'icon2', label: 'Icon 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label2', label: 'Titel 2', type: 'text', default: 'Titel 2' },
      { name: 'text2', label: 'Tekst 2', type: 'textarea', default: 'Beschrijving 2' },
      { name: 'icon3', label: 'Icon 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label3', label: 'Titel 3', type: 'text', default: 'Titel 3' },
      { name: 'text3', label: 'Tekst 3', type: 'textarea', default: 'Beschrijving 3' },
      { name: 'icon4', label: 'Icon 4 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label4', label: 'Titel 4', type: 'text', default: 'Titel 4' },
      { name: 'text4', label: 'Tekst 4', type: 'textarea', default: 'Beschrijving 4' },
      { name: 'icon5', label: 'Icon 5 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label5', label: 'Titel 5', type: 'text', default: 'Titel 5' },
      { name: 'text5', label: 'Tekst 5', type: 'textarea', default: 'Beschrijving 5' },
      { name: 'icon6', label: 'Icon 6 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'label6', label: 'Titel 6', type: 'text', default: 'Titel 6' },
      { name: 'text6', label: 'Tekst 6', type: 'textarea', default: 'Beschrijving 6' }
    ],
    template: function(v) {
      const items = [];
      function makeCell(icon, label, text) {
        return `<td style="width:33.333%;padding:10px 8px;vertical-align:top;"><div style="text-align:center;"><img src="${escapeHtml(icon)}" alt="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;margin-bottom:8px;"><div style="font-weight:700;font-size:14px;color:#2b2b2b;margin-bottom:4px;">${escapeHtml(label)}</div><div style="font-weight:400;font-size:12px;color:#2b2b2b;line-height:1.4;">${escapeHtml(text).replace(/\n/g,'<br>')}</div></div></td>`;
      }
      for (let i = 1; i <= 6; i++) {
        const lbl = v['label' + i];
        const txt = v['text' + i];
        const ic = v['icon' + i] || '';
        if (lbl || txt) {
          items.push(makeCell(ic, lbl || '', txt || ''));
        }
      }
      let rowsHtml = '';
      for (let i = 0; i < items.length; i += 3) {
        const row = items.slice(i, i + 3);
        rowsHtml += '<tr>' + row.join('') + '</tr>';
      }
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  // Extra kaartdefinities voor aanvullende variaties. Deze kaarten vergroten het totaal
  // aantal ontwerpen en bieden uitgebreidere aanpassingsmogelijkheden zoals tekstgroottes
  // en kleuren of grote lijsten met pictogrammen en tekst.
  cards.push({
    id: 'customizable-text-card',
    name: 'Aanpasbare tekstkaart',
    category: 'special',
    description: 'Een eenvoudige kaart met titel en tekst waarvan kleuren en lettergroottes te wijzigen zijn.',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Je titel hier' },
      { name: 'body', label: 'Tekst', type: 'textarea', default: 'Je tekst hier.' },
      { name: 'titleSize', label: 'Titelgrootte (px)', type: 'text', default: '22' },
      { name: 'bodySize', label: 'Tekstgrootte (px)', type: 'text', default: '14' },
      { name: 'titleColor', label: 'Titelkleur (hex)', type: 'text', default: '#2b2b2b' },
      { name: 'bodyColor', label: 'Tekstkleur (hex)', type: 'text', default: '#2b2b2b' },
      { name: 'bgColor', label: 'Achtergrondkleur (hex)', type: 'text', default: '#f9f7f2' }
    ],
    template: function(v) {
      function cleanColor(val, fallback) {
        return /^#?[0-9a-fA-F]{3,8}$/.test(val) ? (val.startsWith('#') ? val : '#' + val) : fallback;
      }
      const titleSize = parseInt(v.titleSize) || 22;
      const bodySize = parseInt(v.bodySize) || 14;
      const titleColor = cleanColor(v.titleColor, '#2b2b2b');
      const bodyColor = cleanColor(v.bodyColor, '#2b2b2b');
      const bgColor = cleanColor(v.bgColor, '#f9f7f2');
      const title = escapeHtml(v.title);
      const bodyText = renderRichText(v.body);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${bgColor};border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:${titleSize}px;line-height:1.3;color:${titleColor};margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:${bodySize}px;line-height:1.5;color:${bodyColor};">${bodyText}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'multi-icon-block',
    name: 'Iconen lijstkaart',
    category: 'info',
    description: 'Grote kaart met kop en een verticale lijst van pictogrammen en teksten (maximaal tien items).',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Onze voordelen' },
      { name: 'icon1', label: 'Icon 1 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text1', label: 'Tekst 1', type: 'text', default: 'Punt één' },
      { name: 'icon2', label: 'Icon 2 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text2', label: 'Tekst 2', type: 'text', default: 'Punt twee' },
      { name: 'icon3', label: 'Icon 3 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text3', label: 'Tekst 3', type: 'text', default: 'Punt drie' },
      { name: 'icon4', label: 'Icon 4 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text4', label: 'Tekst 4', type: 'text', default: '' },
      { name: 'icon5', label: 'Icon 5 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text5', label: 'Tekst 5', type: 'text', default: '' },
      { name: 'icon6', label: 'Icon 6 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text6', label: 'Tekst 6', type: 'text', default: '' },
      { name: 'icon7', label: 'Icon 7 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text7', label: 'Tekst 7', type: 'text', default: '' },
      { name: 'icon8', label: 'Icon 8 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text8', label: 'Tekst 8', type: 'text', default: '' },
      { name: 'icon9', label: 'Icon 9 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text9', label: 'Tekst 9', type: 'text', default: '' },
      { name: 'icon10', label: 'Icon 10 URL', type: 'text', default: 'https://www.svgrepo.com/show/446794/ok-circle-filled.svg' },
      { name: 'text10', label: 'Tekst 10', type: 'text', default: '' }
    ],
    template: function(v) {
      const items = [];
      function add(icon, text) {
        items.push(`<tr><td style="width:36px;padding-right:12px;vertical-align:top;"><img src="${escapeHtml(icon)}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;"></td><td style="font-weight:500;font-size:14px;color:#2b2b2b;line-height:1.4;">${escapeHtml(text)}</td></tr>`);
      }
      for (let i = 1; i <= 10; i++) {
        const txt = v['text' + i];
        const ic = v['icon' + i];
        if (txt) add(ic || '', txt);
      }
      const rows = items.join('');
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'multi-button-block',
    name: 'Knoppenblok kaart',
    category: 'special',
    description: 'Kaart met titel, tekst en maximaal drie knoppen in een rij of kolom.',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Actie kaart' },
      { name: 'body', label: 'Tekst', type: 'textarea', default: 'Korte beschrijving.' },
      { name: 'button1Label', label: 'Knop 1 tekst', type: 'text', default: 'Knop 1' },
      { name: 'button1Link', label: 'Knop 1 link', type: 'text', default: '#' },
      { name: 'button2Label', label: 'Knop 2 tekst', type: 'text', default: 'Knop 2' },
      { name: 'button2Link', label: 'Knop 2 link', type: 'text', default: '#' },
      { name: 'button3Label', label: 'Knop 3 tekst', type: 'text', default: 'Knop 3' },
      { name: 'button3Link', label: 'Knop 3 link', type: 'text', default: '#' },
      { name: 'bgColor', label: 'Achtergrondkleur (hex)', type: 'text', default: '#f9f7f2' }
    ],
    template: function(v) {
      const bgColor = /^#?[0-9a-fA-F]{3,8}$/.test(v.bgColor) ? (v.bgColor.startsWith('#') ? v.bgColor : '#' + v.bgColor) : '#f9f7f2';
      const title = escapeHtml(v.title);
      const body = renderRichText(v.body);
      const buttons = [];
      function buildButton(label, link, color) {
        return `<a href="${escapeHtml(link)}" style="display:inline-block;padding:10px 18px;background:${color};color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;margin-right:8px;margin-bottom:8px;">${escapeHtml(label)}</a>`;
      }
      if (v.button1Label) buttons.push(buildButton(v.button1Label, v.button1Link, '#b48a19'));
      if (v.button2Label) buttons.push(buildButton(v.button2Label, v.button2Link, '#e02020'));
      if (v.button3Label) buttons.push(buildButton(v.button3Label, v.button3Link, '#2b2b2b'));
      const btnHtml = buttons.join('');
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${bgColor};border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;line-height:1.3;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.5;color:#2b2b2b;margin-bottom:16px;">${body}</div>
                <div>${btnHtml}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'separator-block',
    name: 'Gescheiden secties kaart',
    category: 'special',
    description: 'Kaart met een titel en meerdere tekstsecties gescheiden door lijnen.',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Onderwerpen' },
      { name: 'section1', label: 'Sectie 1', type: 'textarea', default: 'Inhoud van sectie één.' },
      { name: 'section2', label: 'Sectie 2', type: 'textarea', default: 'Inhoud van sectie twee.' },
      { name: 'section3', label: 'Sectie 3', type: 'textarea', default: 'Inhoud van sectie drie.' },
      { name: 'bgColor', label: 'Achtergrondkleur (hex)', type: 'text', default: '#f9f7f2' }
    ],
    template: function(v) {
      const bg = /^#?[0-9a-fA-F]{3,8}$/.test(v.bgColor) ? (v.bgColor.startsWith('#') ? v.bgColor : '#' + v.bgColor) : '#f9f7f2';
      const sections = [];
      function addSection(content) {
        sections.push(`<tr><td style="padding:12px 0;"><div style="font-weight:400;font-size:14px;color:#2b2b2b;line-height:1.5;">${escapeHtml(content).replace(/\n/g,'<br>')}</div></td></tr>`);
      }
      if (v.section1) addSection(v.section1);
      if (v.section2) addSection(v.section2);
      if (v.section3) addSection(v.section3);
      const bodyRows = sections.join('<tr><td><hr style="border:0;margin:8px 0;"></td></tr>');
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${bg};border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:20px;">
                <div style="font-weight:800;font-size:22px;color:#2b2b2b;margin-bottom:12px;">${escapeHtml(v.title)}</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tbody>
                    ${bodyRows}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  // Exporteer kaarten naar de globale scope zodat script.js en edit-script.js er toegang toe hebben
  // Extra: 10 nieuwe kaarten in diverse categorieën
  cards.push({
    id: 'header-center-slim',
    name: 'Header – slanke kop gecentreerd',
    category: 'basis',
    description: 'Gecentreerde kleine bovenkop en grote titel.',
    fields: [
      { name: 'eyebrow', label: 'Bovenkop', type: 'text', default: 'Nieuws' },
      { name: 'title', label: 'Titel', type: 'text', default: 'Welkom bij Kok Experience' }
    ],
    template: function(v) {
      const eyebrow = escapeHtml(v.eyebrow);
      const title = escapeHtml(v.title);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:22px 18px;text-align:center;">
                <div style="font-weight:800;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b48a19;margin-bottom:6px;">${eyebrow}</div>
                <div style="font-weight:800;font-size:24px;line-height:1.3;color:#2b2b2b;">${title}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'header-announce-bar',
    name: 'Header – aankondigingsbalk',
    category: 'basis',
    description: 'Donkere balk met korte aankondiging.',
    fields: [
      { name: 'text', label: 'Tekst', type: 'text', default: 'Nieuwe editie Ladiesnight – Tickets nu beschikbaar' },
      { name: 'link', label: 'Link (optioneel)', type: 'text', default: '' }
    ],
    template: function(v) {
      const text = escapeHtml(v.text);
      const link = escapeHtml(v.link || '');
      const inner = link ? `<a href="${link}" style="color:#ffffff;text-decoration:underline;">${text}</a>` : text;
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;background:#2b2b2b;border:0;">
          <tbody>
            <tr>
              <td style="padding:10px 14px;text-align:center;color:#ffffff;font-weight:700;font-size:14px;">${inner}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'content-paragraphs-2',
    name: 'Tekst – twee paragrafen',
    category: 'content',
    description: 'Twee alineablokken met standaard opmaak. Ondersteunt italic en links.',
    fields: [
      { name: 'title', label: 'Kop (optioneel)', type: 'text', default: 'Over Kok Experience' },
      { name: 'p1', label: 'Paragraaf 1', type: 'textarea', default: 'Eerste alinea met *cursief* en een [link](https://www.kokexperience.nl).' },
      { name: 'p2', label: 'Paragraaf 2', type: 'textarea', default: 'Tweede alinea met meer details.' }
    ],
    template: function(v) {
      const title = escapeHtml(v.title || '');
      const p1 = renderRichText(v.p1);
      const p2 = renderRichText(v.p2);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                ${title ? `<div style="font-weight:800;font-size:18px;color:#2b2b2b;margin-bottom:8px;">${title}</div>` : ''}
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;margin-bottom:12px;">${p1}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;">${p2}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'content-emoji-bullets',
    name: 'Tekst – bullets met emoji',
    category: 'content',
    description: 'Korte bulletlijst met emoji‑icoontjes.',
    fields: [
      { name: 'title', label: 'Kop (optioneel)', type: 'text', default: 'Waarom kiezen voor ons?' },
      { name: 'b1', label: 'Bullet 1', type: 'text', default: '✨ Prachtige beleving voor het hele gezin' },
      { name: 'b2', label: 'Bullet 2', type: 'text', default: '🎬 De nieuwste films in onze bioscopen' },
      { name: 'b3', label: 'Bullet 3', type: 'text', default: '🍔 Heerlijke horeca en arrangementen' }
    ],
    template: function(v) {
      const title = escapeHtml(v.title || '');
      const items = [v.b1, v.b2, v.b3].filter(Boolean).map(t => `<li style="margin-bottom:6px;">${escapeHtml(t)}</li>`).join('');
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.12);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                ${title ? `<div style="font-weight:800;font-size:18px;color:#2b2b2b;margin-bottom:8px;">${title}</div>` : ''}
                <ul style="margin:0;padding-left:20px;color:#2b2b2b;font-size:14px;line-height:1.6;">${items}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'cta-single-button',
    name: 'CTA – enkele knop',
    category: 'basis',
    description: 'Prominente knop met korte toelichting.',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Reserveer je tickets' },
      { name: 'body', label: 'Tekst', type: 'textarea', default: 'Beleef een onvergetelijke avond bij Kok Cinemaxx.' },
      { name: 'label', label: 'Knoptekst', type: 'text', default: 'Bekijk tijden' },
      { name: 'link', label: 'Link', type: 'text', default: '#' }
    ],
    template: function(v) {
      const title = escapeHtml(v.title);
      const body = renderRichText(v.body);
      const label = escapeHtml(v.label);
      const link = escapeHtml(v.link);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:800;font-size:18px;color:#2b2b2b;margin-bottom:8px;">${title}</div>
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;margin-bottom:12px;">${body}</div>
                <a href="${link}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${label}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'cta-double-buttons',
    name: 'CTA – twee knoppen',
    category: 'basis',
    description: 'Twee knoppen naast elkaar (stackt op mobiel clients waar nodig).',
    fields: [
      { name: 'title', label: 'Titel', type: 'text', default: 'Klaar om te starten?' },
      { name: 'leftLabel', label: 'Linker knoptekst', type: 'text', default: 'Plan bezoek' },
      { name: 'leftLink', label: 'Linker knop link', type: 'text', default: '#' },
      { name: 'rightLabel', label: 'Rechter knoptekst', type: 'text', default: 'Koop tickets' },
      { name: 'rightLink', label: 'Rechter knop link', type: 'text', default: '#' }
    ],
    template: function(v) {
      const title = escapeHtml(v.title);
      const L = `<a href="${escapeHtml(v.leftLink)}" style="display:inline-block;padding:10px 18px;background:#2b2b2b;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;margin-right:8px;">${escapeHtml(v.leftLabel)}</a>`;
      const R = `<a href="${escapeHtml(v.rightLink)}" style="display:inline-block;padding:10px 18px;background:#b48a19;color:#ffffff;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;">${escapeHtml(v.rightLabel)}</a>`;
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.12);">
          <tbody>
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-weight:800;font-size:18px;color:#2b2b2b;margin-bottom:12px;">${title}</div>
                <div>${L}${R}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'spacer-thick',
    name: 'Stijl – dikke spacer',
    category: 'stijl',
    description: 'Extra ruimte tussen secties (24px hoogte).',
    fields: [],
    template: function() {
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:0;">
        <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'divider-dotted-light',
    name: 'Stijl – dotted divider',
    category: 'stijl',
    description: 'Gestippelde scheidingslijn als subtiele divider.',
    fields: [],
    template: function() {
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:12px 14px;">
        <div style="border-top:1px dotted #d9d4c6;height:1px;line-height:1px;font-size:0;">&nbsp;</div>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'photo-grid-two',
    name: 'Media – twee foto’s naast elkaar',
    category: 'foto',
    description: 'Twee vierkante foto’s naast elkaar (160×160).',
    fields: [
      { name: 'image1', label: 'Afbeelding 1 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6409-2048x1365.jpg' },
      { name: 'alt1', label: 'Alt 1', type: 'text', default: 'Foto 1' },
      { name: 'image2', label: 'Afbeelding 2 URL', type: 'text', default: 'https://www.kokexperience.nl/wp-content/uploads/2025/05/IK1A6411-2048x1365.jpg' },
      { name: 'alt2', label: 'Alt 2', type: 'text', default: 'Foto 2' }
    ],
    template: function(v) {
      const i1 = escapeHtml(v.image1), a1 = escapeHtml(v.alt1);
      const i2 = escapeHtml(v.image2), a2 = escapeHtml(v.alt2);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#ffffff;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tbody>
            <tr>
              <td style="padding:12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                  <tbody>
                    <tr>
                      <td style="width:50%;padding-right:6px;">
                        <img src="${i1}" alt="${a1}" style="display:block;width:100%;max-width:240px;height:160px;object-fit:cover;border-radius:12px;">
                      </td>
                      <td style="width:50%;padding-left:6px;">
                        <img src="${i2}" alt="${a2}" style="display:block;width:100%;max-width:240px;height:160px;object-fit:cover;border-radius:12px;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  cards.push({
    id: 'special-testimonial-compact',
    name: 'Special – testimonial compact',
    category: 'special',
    description: 'Korte quote met naam, compact gestileerd.',
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea', default: 'Een fantastische ervaring voor jong en oud!' },
      { name: 'name', label: 'Naam', type: 'text', default: 'Anouk' }
    ],
    template: function(v) {
      const q = renderRichText(v.quote);
      const name = escapeHtml(v.name);
      return `\
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Ubuntu, Arial, sans-serif;">
  <tbody>
    <tr>
      <td style="padding:14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:#f9f7f2;border:0;box-shadow:0 6px 18px rgba(0,0,0,0.14);">
          <tbody>
            <tr>
              <td style="padding:18px;">
                <div style="font-weight:400;font-size:14px;line-height:1.6;color:#2b2b2b;font-style:italic;margin-bottom:8px;">“${q}”</div>
                <div style="font-weight:700;font-size:13px;color:#2b2b2b;">— ${name}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
    }
  });

  // Einde extra kaarten

  window.cards = cards;
})();