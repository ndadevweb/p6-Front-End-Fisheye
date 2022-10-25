/**
 * Positionne le focus sur les elements importants de la page
 */
export default class GlobalShortcuts {
  /**
   * Label de la page
   * - index => homepage
   * - photographer => photographer
   *
   * @param {String} pagename
   */
  constructor(pagename) {
    this.pagename = pagename;
  }

  /**
   * Initialisation de l'evenement keyup
   *
   * @throws {Error} The "pagename" value is not valid
   */
  init() {
    document.addEventListener('keyup', (event) => {
      if (document.body.classList.contains('modal-opened') === true) {
        return null;
      }

      if (event.altKey === false) {
        return null;
      }

      switch (this.pagename) {
        case 'homepage':
          GlobalShortcuts.homepage(event);
          break;
        case 'photographer':
          GlobalShortcuts.photographer(event);
          break;
        default:
          throw new Error('The "pagename" value is not valid');
      }

      return null;
    });
  }

  /**
   * Raccourcis clavier pour acceder aux elements importants de la page index
   *
   * @static
   * @param {Event} event
   * @returns {null}
   */
  static homepage(event) {
    switch (event.key) {
      case '0':
        document.querySelector('#link-homepage').focus();
        break;

      case '1':
        document.querySelector('.photographer_section .focusable').focus();
        break;
      default:
        return null;
    }

    return null;
  }

  /**
   * Raccourcis clavier pour acceder aux elements importants de la page photographer
   *
   * @static
   * @param {Event} event
   * @returns {null}
   */
  static photographer(event) {
    switch (event.key) {
      case '0':
        document.querySelector('#link-homepage').focus();
        break;
      case '1':
        document.querySelector('.contact_button').focus();
        break;
      case '2':
        document.querySelector('#sort-by').focus();
        break;
      case '3':
        document.querySelector('.medias-container .focusable').focus();
        break;
      default:
        return null;
    }

    return null;
  }
}
