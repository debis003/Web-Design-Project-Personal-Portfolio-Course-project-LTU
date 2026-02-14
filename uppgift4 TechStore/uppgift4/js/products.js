/**
 * TechStore - Produktvisningsmodul
 *
 * Den här filen hanterar produktdata och rendering av produktkort på webbplatsen.
 * Den innehåller produktdata, renderingsfunktioner och scrollningsfunktionalitet
 * för produktvisning.
 * 
 * Innehåll:
 * 1. Produktdata
 * 2. Produktrenderingsfunktion
 * 3. Scrollningsfunktionalitet
 * 4. Initialisering vid sidladdning
 *
 * Designbeslut:
 * - Använder en datadriven approach för produktvisning
 * - Implementerar responsiva produktkort med konsekvent design
 * - Tillhandahåller horisontell scrollningsfunktionalitet för produktlistor
 * - Visar tydligt rabatterade priser för produkter på rea
 * 
 */

/*När jag utvecklade products.js-filen fokuserade jag på att skapa en flexibel 
och återanvändbar lösning för produktvisning på TechStore-webbplatsen.
Jag implementerade en datadriven approach där produktdata separeras från renderingslogiken, 
vilket gör det enkelt att uppdatera produkter utan att ändra koden som visar dem.
*/

// Featured products data
const products = [
    {
        id: 1,
        name: 'MacBook Pro M2',
        price: '19999kr',
        originalPrice: '22999kr',
        category: 'computers',
        image: '../images/products/macbook.jpg',
        description: 'Kraftfull laptop för professionellt bruk',
        onSale: true
    },
    {
        id: 2,
        name: 'iPhone 15 Pro',
        price: '14999kr',
        originalPrice: '16999kr',
        category: 'phones',
        image: '../images/products/iphone.jpg',
        description: 'Senaste iPhone med topprestanda',
        onSale: true
    },
    {
        id: 3,
        name: 'PlayStation 5',
        price: '6999kr',
        category: 'gaming',
        image: '../images/products/playstation.jpg',
        description: 'Next-gen spelkonsol för bästa spelupplevelsen',
        onSale: false
        
    },
    {
        id: 4,
        name: 'Sony WH-1000XM5',
        price: '4299kr',
        category: 'audio-video',
        image: '../images/products/headphones.jpg',
        description: 'Premium trådlösa hörlurar med brusreducering',
        onSale: false
    },
    {
        id: 5,
        name: 'iPad Pro 12.9"',
        price: '13999kr',
        category: 'computers',
        image: '../images/products/ipad.jpg',
        description: 'Kraftfull surfplatta för kreativt arbete',
        onSale: false
    },
    {
        id: 6,
        name: 'Samsung QLED 65"',
        price: '12999kr',
        category: 'audio-video',
        image: '../images/products/tv.jpg',
        description: 'Premium 4K TV med quantum dot-teknik',
        onSale: false
    },
    {
        id: 7,
        name: 'Nintendo Switch OLED',
        price: '3999kr',
        category: 'gaming',
        image: '../images/products/switch.jpg',
        description: 'Portabel spelkonsol med OLED-skärm',
        onSale: false

    },
    {
        id: 8,
        name: 'AirPods Pro',
        price: '2799kr',
        category: 'audio-video',
        image: '../images/products/airpods.jpg',
        description: 'Trådlösa hörlurar med aktiv brusreducering',
        onSale: false
    }
];
/*https://placehold.co/300x300/f5f5f5/333333.png?text=Samsung+%20QLED+%2065*/

/**
 * 2. Produktrenderingsfunktion
 *
 * Renderar en lista av produkter som produktkort i en specificerad behållare.
 * Varje produktkort innehåller bild, titel, beskrivning, pris och en köpknapp.
 * 
 * Implementationsdetaljer:
 * - Använder template literals för att generera HTML för varje produkt
 * - Visar specialpriser och ursprungliga priser för produkter på rea
 * - Lägger till datakategorier för framtida filtreringsfunktionalitet
 * - Konfigurerar scrollningsfunktionalitet för produktlistor
 *
 * @param {Array} productList - Arrayen med produktobjekt att rendera
 * @param {string} containerId - ID för behållarelementet där produkterna ska visas
 */
function renderProducts(productList, containerId) {
    // Hitta behållarelementet där produkter ska visas
    const container = document.getElementById(containerId);
    // Om behållaren inte existerar, avsluta funktionen
    if (!container) return;

    // Använd map-funktionen för att skapa HTML för varje produkt
    // Sammanfoga sedan alla HTML-strängar till en stor sträng
    container.innerHTML = productList.map(product => `
        <a href="product-detail.html?id=${product.id}" class="product-card" data-category="${product.category}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price-container">
                    <p class="product-price ${product.onSale ? 'sale-price' : ''}">${product.price}</p>
                    ${product.onSale ? `<p class="original-price">Tidigare lägsta pris: ${product.originalPrice}</p>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="event.preventDefault()">
                    <i class="fas fa-shopping-cart"></i>
                    Lägg i varukorg
                </button>
            </div>
        </a>
    `).join('');
    // join('') i slutet sammanfogar alla HTML-strängar till en
    setupScroll();
}

/**
 * 3. Scrollningsfunktionalitet
 *
 * Konfigurerar horisontell scrollningsfunktionalitet för produktlistor
 * med vänster- och högerpilar för att navigera.
 * 
 * Implementationsdetaljer:
 * - Lägger till klickhändelser på scrollningsknapparna
 * - Implementerar mjuk scrollning för bättre användarupplevelse
 * - Uppdaterar knappstatus baserat på scrollningsposition
 * - Hanterar fall där scrollningselement inte finns
 */
function setupScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');
    
    if (!scrollContainer || !leftBtn || !rightBtn) return;

    const scrollAmount = 300; // Justera detta värde baserat på bredd + mellanrum

    function updateScrollButtons() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        leftBtn.disabled = scrollContainer.scrollLeft <= 0;
        rightBtn.disabled = scrollContainer.scrollLeft >= maxScroll;
    }

    leftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Uppdatera knappstatus vid scrollning
    scrollContainer.addEventListener('scroll', updateScrollButtons);
    
    // Initial knappstatus
    updateScrollButtons();
}

/**
 * 4. Initialisering vid sidladdning
 *
 * Väntar på att DOM (Document Object Model) ska vara fullständigt laddad
 * innan produkter renderas.
 * 
 * Implementationsdetaljer:
 * - Använder DOMContentLoaded-händelsen för att säkerställa att DOM är redo
 * - Anropar renderProducts-funktionen med produktarrayen och behållar-ID
 */
document.addEventListener('DOMContentLoaded', () => {
    // Anropa renderProducts-funktionen med produktarrayen
    // och ID för behållaren där produkter ska visas
    renderProducts(products, 'featured-products');
});