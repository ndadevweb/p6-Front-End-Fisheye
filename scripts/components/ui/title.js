/**
 * Retourne un element titre
 *
 * @param {Object} props { title }
 * @param {String} tagLevel
 * @returns {Element}
 */
export const Title = (props, tagLevel = 'h1') => {
    const { title } = props;
    const titleElement = document.createElement(tagLevel);

    titleElement.textContent = title;

    return titleElement;
};
