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

    ['btn', 'contact_button', 'focusable'].forEach((className) =>
        buttonElement.classList.add(className)
    );

    return buttonElement;
};
