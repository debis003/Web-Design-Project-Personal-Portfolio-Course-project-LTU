/**
 * TechStore - Huvudskript
 *
 * Detta är huvudskriptet för TechStore-webbplatsen. Det hanterar grundläggande
 * funktionalitet som mobilmeny, mjuk rullning och produktrendering.
 * 
 * Innehåll:
 * 1. Mobilmenyhantering
 * 2. Mjuk rullning för ankarlänkar
 * 3. Produktrendering
 *
 * Designbeslut:
 * - Implementerar en hamburgermenytoggle för mobilanvändare
 * - Förbättrar användarupplevelsen med mjuk rullning för ankarlänkar
 * - Använder en modulär struktur med importerade funktioner för produktrendering
 */

import { renderProducts, products } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * 1. Mobilmenyhantering
     *
     * Skapar en hamburgerknapp för mobilmenyn och lägger till funktionalitet
     * för att visa/dölja navigationsmenyn på mobila enheter.
     * 
     * Implementationsdetaljer:
     * - Skapar en menyknapp dynamiskt med JavaScript
     * - Placerar knappen före navigationsmenyn i DOM
     * - Lägger till en klickhändelse som växlar active-klassen på navigationsmenyn
     */
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '☰';
    
    const nav = document.querySelector('.main-nav');
    nav.parentNode.insertBefore(menuBtn, nav);

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    /**
     * 2. Mjuk rullning för ankarlänkar
     *
     * Förbättrar användarupplevelsen genom att lägga till mjuk rullning
     * när användare klickar på länkar som pekar på element inom samma sida.
     * 
     * Implementationsdetaljer:
     * - Väljer alla ankarlänkar som börjar med "#"
     * - Förhindrar standardbeteendet för klickhändelser
     * - Använder scrollIntoView med smooth-beteende för mjuk rullning
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /**
     * 3. Produktrendering
     *
     * Renderar produkter på startsidan genom att använda den importerade
     * renderProducts-funktionen från products.js.
     * 
     * Implementationsdetaljer:
     * - Anropar renderProducts-funktionen med produktdata och målbehållar-ID
     * - Produktdata importeras från products.js
     */
    renderProducts(products, 'featured-products');
});