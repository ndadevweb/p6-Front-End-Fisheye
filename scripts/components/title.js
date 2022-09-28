export const Title = (props, tagLevel = 'h1') => {
    const { name } = props;
    const titleElement = document.createElement(tagLevel);

    titleElement.textContent = name;

    return titleElement;
};
