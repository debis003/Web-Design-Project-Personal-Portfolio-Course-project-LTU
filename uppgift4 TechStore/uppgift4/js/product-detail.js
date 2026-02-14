/**
 * TechStore - Produktdetaljsida JavaScript
 *
 * Den här filen hanterar funktionalitet för produktdetaljsidor, inklusive
 * produktdataladdning, bildgalleri, kvantitetskontroller och fliknavigering.
 * 
 * Innehåll:
 * 1. Produktdataladdning
 * 2. Uppdatering av produktdetaljer
 * 3. Bildgallerifunktionalitet
 * 4. Kvantitetskontroller
 * 5. Fliknavigering
 *
 * Designbeslut:
 * - Använder URL-parametrar för att identifiera och visa specifika produkter
 * - Implementerar ett interaktivt bildgalleri med miniatyrbilder
 * - Tillhandahåller intuitiva kvantitetskontroller med validering
 * - Organiserar produktinformation i flikar för bättre användarupplevelse
 */

import { products } from './productData.js';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * 1. Produktdataladdning
     *
     * Hämtar produkt-ID från URL-parametrar och hittar motsvarande produkt
     * i produktdatasamlingen. Om produkten hittas, uppdateras sidan med dess detaljer.
     * 
     * Implementationsdetaljer:
     * - Använder URLSearchParams för att extrahera produkt-ID från URL:en
     * - Konverterar ID till sträng för korrekt jämförelse
     * - Använder find-metoden för att hitta produkten i produktarrayen
     * - Hanterar fallet där produkten inte hittas
     */
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Konvertera ID till sträng för jämförelse eftersom ID:n i URL är strängar
        const product = products.find(p => p.id.toString() === productId);
        if (product) {
            updateProductDetails(product);
        } else {
            console.error('Product not found');
        }
    }
});

/**
 * 2. Uppdatering av produktdetaljer
 *
 * Uppdaterar alla relevanta delar av sidan med information från produktobjektet.
 * 
 * Implementationsdetaljer:
 * - Uppdaterar sidtitel för SEO och användarorientering
 * - Uppdaterar brödsmulor för navigering
 * - Uppdaterar produkttitel, pris och bildgalleri
 * - Fyller i produktinformation och specifikationer
 * - Konfigurerar interaktiva element som bildgalleri, kvantitetskontroller och flikar
 *
 * @param {Object} product - Produktobjektet som innehåller all produktinformation
 */
function updateProductDetails(product) {
    document.title = `${product.name} - TechStore`;
    
    // Uppdatera brödsmulor med korrekta länkar för hem och kategori
    const breadcrumbList = document.querySelector('.breadcrumb ul');
    if (breadcrumbList) {
        const categoryMap = {
            'computers': { name: 'Datorer & Tillbehör', link: 'datorer.html' },
            'phones': { name: 'Mobiltelefoner', link: 'mobil.html' },
            'gaming': { name: 'Gaming & Konsoler', link: 'gaming.html' },
            'audio-video': { name: 'Ljud & Bild', link: 'ljud.html' }
        };
        
        const category = categoryMap[product.category];
    
        breadcrumbList.innerHTML = `
            <li><a href="../index.html">Hem</a></li>
            <li><a href="../${category.link}">${category.name}</a></li>
            <li>${product.name}</li>
        `;
    }
    
    // Uppdatera produkttitel
    const productTitle = document.querySelector('.product-info h1');
    if (productTitle) productTitle.textContent = product.name;
    
    // Uppdatera prissektion
    const priceContainer = document.querySelector('.price-container');
    if (priceContainer) {
        priceContainer.innerHTML = `
            <p class="product-price ${product.onSale ? 'sale-price' : ''}">${product.price}</p>
            ${product.onSale ? `<p class="original-price">Tidigare lägsta pris: ${product.originalPrice}</p>` : ''}
        `;
    }
    
    // Uppdatera huvudbild
    const mainImage = document.getElementById('mainImage');
    if (mainImage) mainImage.src = product.image;
    
    // Uppdatera miniatyrbilder
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    if (thumbnailGallery) {
        thumbnailGallery.innerHTML = `
            <img src="${product.image}" alt="${product.name} view 1" class="thumbnail active">
            <img src="${product.image}" alt="${product.name} view 2" class="thumbnail">
            <img src="${product.image}" alt="${product.name} view 3" class="thumbnail">
        `;
    }
    
    // Uppdatera produktinformationsfliken
    const productInfo = document.querySelector('#info p');
    if (productInfo) productInfo.textContent = product.description;
    
    // Uppdatera specifikationsfliken
    const specsList = document.querySelector('.specs-list');
    if (specsList && product.specifications) {
        specsList.innerHTML = Object.entries(product.specifications)
            .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
            .join('');
    }

    setupImageGallery();
    setupQuantityControls();
    setupTabs();
}

/**
 * 3. Bildgallerifunktionalitet
 *
 * Konfigurerar bildgalleriet så att användare kan klicka på miniatyrbilder
 * för att uppdatera huvudbilden.
 * 
 * Implementationsdetaljer:
 * - Lägger till klickhändelser på varje miniatyrbild
 * - Uppdaterar huvudbildens källa när en miniatyrbild klickas
 * - Hanterar aktiv-tillståndet för miniatyrbilder för visuell feedback
 */
function setupImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

/**
 * 4. Kvantitetskontroller
 *
 * Konfigurerar kvantitetskontroller för att låta användare justera produktkvantiteten
 * med validering för att säkerställa att kvantiteten förblir inom giltiga gränser.
 * 
 * Implementationsdetaljer:
 * - Lägger till klickhändelser på öka- och minska-knappar
 * - Validerar kvantitetsinmatning för att säkerställa att den är mellan 1 och 99
 * - Hanterar direkta ändringar i inmatningsfältet
 */
function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 99) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 99) {
                value = 99;
            }
            quantityInput.value = value;
        });
    }
}

/**
 * 5. Fliknavigering
 *
 * Konfigurerar fliknavigering för att organisera produktinformation i
 * separata, lättillgängliga sektioner.
 * 
 * Implementationsdetaljer:
 * - Lägger till klickhändelser på flikknapparna
 * - Hanterar aktiv-tillståndet för flikar och paneler
 * - Visar rätt innehållspanel när en flik klickas
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const panel = document.getElementById(tabId);
            if (panel) panel.classList.add('active');
        });
    });
}