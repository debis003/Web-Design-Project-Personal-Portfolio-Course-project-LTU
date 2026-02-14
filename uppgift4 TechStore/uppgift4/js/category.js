/**
 * TechStore - Kategorisida JavaScript
 *
 * Den här filen hanterar interaktivitet på kategorisidor, inklusive
 * filtergruppstoggling, filtertillämpning och produktsortering.
 * 
 * Innehåll:
 * 1. Filtergruppstoggling
 * 2. Filtertillämpning
 * 3. Produktsortering
 *
 * Designbeslut:
 * - Implementerar expanderbara/kollapserbara filtergrupper för bättre organisation
 * - Använder visuella indikatorer (+ och -) för att visa filtergruppstatus
 * - Centraliserar filtertillämpning genom en dedikerad knapp
 * - Möjliggör dynamisk produktsortering via en dropdown-meny
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * 1. Filtergruppstoggling
     *
     * Denna funktion låter användare expandera eller kollapsa filtergrupper
     * genom att klicka på filterrubrikerna. Den ändrar också toggle-ikonen
     * (+ eller -) för att indikera aktuell status.
     * 
     * Implementationsdetaljer:
     * - Lägger till klickhändelser på varje filtergrupprubrik
     * - Växlar collapsed-klassen på filterlistan
     * - Uppdaterar toggle-ikonen baserat på aktuell status
     */
    const filterHeaders = document.querySelectorAll('.filter-group h4');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterGroup = this.parentElement;
            const filterList = filterGroup.querySelector('ul');
            const toggleIcon = this.querySelector('.toggle-icon');
            
            filterList.classList.toggle('collapsed');
            
            if (filterList.classList.contains('collapsed')) {
                toggleIcon.textContent = '+';
            } else {
                toggleIcon.textContent = '-';
            }
        });
    });
    
    /**
     * 2. Filtertillämpning
     *
     * Denna funktion hanterar klickhändelsen för "Tillämpa filter"-knappen.
     * I en verklig implementation skulle detta filtrera produkterna baserat
     * på valda kryssrutor, men här visar den bara ett meddelande.
     * 
     * Implementationsdetaljer:
     * - Lägger till en klickhändelse på "Tillämpa filter"-knappen
     * - Visar ett meddelande för att bekräfta att filtren har tillämpats
     * - Kommentar indikerar att detta är en platshållare för verklig funktionalitet
     */
    const applyFiltersButton = document.querySelector('.apply-filters');
    
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function() {
            alert('Filter har tillämpats!');
            // Detta är bara en platshållare - i en verklig implementation
            // skulle detta filtrera produkterna baserat på valda kryssrutor
        });
    }
    
    /**
     * 3. Produktsortering
     *
     * Denna funktion hanterar ändringshändelsen för sorteringsrullgardinsmenyn.
     * I en verklig implementation skulle detta sortera produkterna baserat på
     * det valda alternativet, men här visar den bara ett meddelande.
     * 
     * Implementationsdetaljer:
     * - Lägger till en ändringshändelse på sorteringsrullgardinsmenyn
     * - Visar ett meddelande med det valda sorteringsalternativet
     * - Kommentar indikerar att detta är en platshållare för verklig funktionalitet
     */
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Detta är bara en platshållare - i en verklig implementation
            // skulle detta sortera produkterna baserat på det valda alternativet
            alert(`Sorterar efter: ${this.options[this.selectedIndex].text}`);
        });
    }
});