/**
 * Positionne le focus sur les elements importants de la page
 */
export class globalShortcuts {
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
                    this.homepage(event);
                    break;
                case 'photographer':
                    this.photographer(event);
                    break;
            }
        });
    }

    /**
     * Raccourcis clavier pour acceder aux elements importants de la page index
     *
     * @param {Event} event
     */
    homepage(event) {
        switch (event.key) {
            case '0':
                document.querySelector('#link-homepage').focus();
                break;

            case '1':
                document.querySelector('.photographer_section .focusable').focus();
                break;
        }
    }

    /**
     * Raccourcis clavier pour acceder aux elements importants de la page photographer
     *
     * @param {Event} event
     */
    photographer(event) {
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
        }
    }
}
