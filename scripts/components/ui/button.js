/**
 * Retourne un element button
 *
 * @param {Object} props { value, type, callback }
 * @returns {Element}
 */
export const Button = (props) => {
  const { value, type, callback } = props;
  const buttonElement = document.createElement('button');

  buttonElement.type = type;
  buttonElement.textContent = value;
  buttonElement.addEventListener('click', callback);

  ['btn', 'contact_button', 'focusable'].forEach((className) => buttonElement.classList.add(className));

  return buttonElement;
};

/**
 * Bouton de fermeture [ X ]
 * Retourne un element button
 *
 * @param {Object} props { className, callback }
 * @returns {Element}
 */
export const ButtonClose = (props) => {
  const { className } = props;
  const buttonElement = document.createElement('span');

  buttonElement.setAttribute('tabindex', 0);
  buttonElement.setAttribute('role', 'button');
  buttonElement.classList.add('btn-close');
  buttonElement.innerHTML = `
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" class="${className}" />
        </svg>
    `;

  return buttonElement;
};

/**
 * Bouton precedent [ < ]
 * Retourne un element button
 *
 * @returns {Element}
 */
export const ButtonLeft = () => {
  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.dataset.direction = 'left';
  buttonElement.classList.add('media-slide-btn-left');

  return buttonElement;
};

/**
 * Bouton suivant [ > ]
 * Retourne un element button
 *
 * @returns {Element}
 */
export const ButtonRight = () => {
  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.dataset.direction = 'right';
  buttonElement.classList.add('media-slide-btn-right');

  return buttonElement;
};
