/**
 * olleaxelsson.com
 * Last modified: 2025-03-03
 *
 * Note to self: if anything happens to me, this stays up.
 * The signal will keep broadcasting.
 * — O.A.
 */

(function () {
  'use strict';

  /* ── Console Easter Egg ─────────────────────── */

  const TEAL   = 'color: #00d4aa; font-family: monospace;';
  const AMBER  = 'color: #f0a000; font-family: monospace; font-weight: bold;';
  const DIM    = 'color: #3a3a50; font-family: monospace;';
  const RESET  = 'color: inherit;';

  const art = [
    ' __   __ _____ ____ _____ ___ ____  _   _ _     _____ ',
    ' \\ \\ / /| ____/ ___|_   _|_ _| __ )| | | | |   | ____|',
    '  \\ V / |  _| \\___ \\ | |  | ||  _ \\| | | | |   |  _|  ',
    '   | |  | |___ ___) || |  | || |_) | |_| | |___| |___ ',
    '   |_|  |_____|____/ |_| |___|____/ \\___/|_____|_____|',
    '',
  ].join('\n');

  console.log('%c' + art, TEAL);
  console.log('%cSIGNAL DETECTED', AMBER);
  console.log('%cOrigin    : UNKNOWN', DIM);
  console.log('%cFrequency : 3.14159 Hz', DIM);
  console.log('%cBroadcast : March 3, 2025 — 03:14:15 UTC', DIM);
  console.log('%c────────────────────────────────────────', DIM);
  console.log('%cIf you are reading this, you are already in the system.', TEAL);
  console.log('%cYou know where to start.', TEAL);
  console.log('%c→ /signal/', 'color: #00d4aa; font-family: monospace; font-weight: bold; font-size: 13px;');

  /* ── Uptime counter ─────────────────────────── */
  // Last known online timestamp
  const LAST_ACTIVE = new Date('2025-03-03T03:14:15Z');

  function formatUptime() {
    const now = new Date();
    const diff = now - LAST_ACTIVE;

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    return `${days}d ${hours}h ${minutes}m since last update`;
  }

  const uptimeEl = document.getElementById('uptime');
  if (uptimeEl) {
    uptimeEl.textContent = formatUptime();
    setInterval(() => { uptimeEl.textContent = formatUptime(); }, 30000);
  }

  /* ── Carrier detection ──────────────────────── */

  const isCarrier = localStorage.getItem('vestibule_carrier') === '1';
  if (isCarrier) {
    const banner = document.querySelector('.carrier-banner');
    if (banner) banner.classList.add('visible');

    // Subtle: reveal a hidden nav item for carriers
    const ghost = document.querySelector('.nav-ghost');
    if (ghost) {
      ghost.style.color = 'rgba(0, 212, 170, 0.4)';
      ghost.title = 'You carry the signal';
    }
  }

  /* ── Subtle page anomaly ────────────────────── */
  // Occasionally glitch the page title
  const originalTitle = document.title;
  const glitchTitles  = [
    'SIGNAL LOST',
    '████████████',
    'WHERE DID HE GO',
    'olle axelsson',
    'VESTIBULE',
  ];

  function titleGlitch() {
    const t = glitchTitles[Math.floor(Math.random() * glitchTitles.length)];
    document.title = t;
    setTimeout(() => { document.title = originalTitle; }, 400);
  }

  // Glitch title randomly every 25–60 seconds
  function scheduleTitleGlitch() {
    const delay = 25000 + Math.random() * 35000;
    setTimeout(() => {
      titleGlitch();
      scheduleTitleGlitch();
    }, delay);
  }

  scheduleTitleGlitch();

  /* ── Archive decode utility (used in /archive/) ── */
  // Exposed globally so visitors can call it from the console
  window.decode = function (ciphertext, key) {
    if (typeof ciphertext !== 'string' || typeof key !== 'string') {
      console.warn('Usage: decode(ciphertext, key)');
      return null;
    }

    key = key.toLowerCase().replace(/[^a-z]/g, '');
    let result = '';
    let ki = 0;

    for (let i = 0; i < ciphertext.length; i++) {
      const c = ciphertext[i];
      const code = c.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        const shift = key.charCodeAt(ki % key.length) - 97;
        result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        ki++;
      } else if (code >= 97 && code <= 122) {
        const shift = key.charCodeAt(ki % key.length) - 97;
        result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        ki++;
      } else {
        result += c;
      }
    }

    return result;
  };

})();
