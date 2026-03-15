import { readBlockConfig } from '../../scripts/aem.js';

const SESSION_KEY = 'age-gate-verified';

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

function parseDateInput(value) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, mm, dd, yyyy] = match;
  const month = parseInt(mm, 10);
  const day = parseInt(dd, 10);
  const year = parseInt(yyyy, 10);
  const now = new Date().getFullYear();
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > now) return null;
  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1) return null; // catches invalid dates like 02/31
  return date;
}

function dismiss(overlay) {
  overlay.classList.add('age-gate-dismissed');
  document.body.classList.remove('age-gate-active');
  overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
}

export default function decorate(block) {
  const config = readBlockConfig(block);

  const minAge = Math.max(1, parseInt(config['minimum-age'], 10) || 21);
  const heading = config.heading || 'Are you of legal drinking age?';
  const subheading = config.subheading || `You must be ${minAge} years or older to enter this site.`;
  const buttonText = config['button-text'] || 'Enter Site';
  const underageMessage = config['underage-message'] || `Sorry, you must be ${minAge} or older to enter this site.`;
  const legalText = config['legal-text'] || 'By entering this site you are agreeing to our Terms of Use and Privacy Policy.';

  // Already verified this session — remove block and do nothing
  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    block.closest('.section')?.remove();
    return;
  }

  // Build full-page overlay appended to body
  const overlay = document.createElement('div');
  overlay.className = 'age-gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Age Verification');

  overlay.innerHTML = `
    <div class="age-gate-modal">
      <h1 class="age-gate-heading">${heading}</h1>
      <p class="age-gate-subheading">${subheading}</p>
      <form class="age-gate-form" novalidate>
        <label class="age-gate-label" for="age-gate-dob">Date of Birth</label>
        <input
          class="age-gate-input"
          type="text"
          id="age-gate-dob"
          name="dob"
          placeholder="MM/DD/YYYY"
          maxlength="10"
          inputmode="numeric"
          autocomplete="bday"
          aria-required="true"
          aria-describedby="age-gate-error"
        />
        <p class="age-gate-error" id="age-gate-error" role="alert" aria-live="polite"></p>
        <button class="age-gate-button" type="submit">${buttonText}</button>
      </form>
      <p class="age-gate-legal">${legalText}</p>
    </div>
  `;

  document.body.append(overlay);
  document.body.classList.add('age-gate-active');

  const input = overlay.querySelector('.age-gate-input');
  const errorEl = overlay.querySelector('.age-gate-error');
  const form = overlay.querySelector('.age-gate-form');

  // Auto-format input as MM/DD/YYYY while typing
  input.addEventListener('input', (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    e.target.value = formatted;
    errorEl.textContent = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    const birthDate = parseDateInput(val);

    if (!birthDate) {
      errorEl.textContent = 'Please enter a valid date in MM/DD/YYYY format.';
      input.focus();
      return;
    }

    if (calculateAge(birthDate) >= minAge) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      dismiss(overlay);
      block.closest('.section')?.remove();
    } else {
      errorEl.textContent = underageMessage;
      input.value = '';
      input.focus();
    }
  });

  // Hide the block's own section (overlay is on body)
  const section = block.closest('.section');
  if (section) section.style.display = 'none';

  // Focus input after paint
  requestAnimationFrame(() => input.focus());
}
