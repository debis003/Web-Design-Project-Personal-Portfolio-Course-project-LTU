/**
 * TechStore - Responsiv JavaScript
 *
 * Den här filen hanterar all interaktiv responsiv beteende för TechStore-webbplatsen.
 * Den inkluderar funktionalitet för mobilmenytoggling, responsiva bilder och
 * höjdutjämning för produktkort.
 * 
 * Innehåll:
 * 1. Mobilmenytoggling
 * 2. Responsiva bilder
 * 3. Höjdutjämning för produktkort
 *
 * Designbeslut:
 * - Implementerar en användarvänlig mobilmeny som visas/döljs vid klick
 * - Säkerställer att bilder skalas korrekt på olika skärmstorlekar
 * - Utjämnar produktkortshöjder för ett konsekvent och professionellt utseende
 * 
 * När jag utvecklade responsive.js-filen fokuserade jag på att skapa en sömlös 
 * användarupplevelse över olika enheter, från mobiler till stationära datorer. 
 * Jag implementerade lösningar som anpassar webbplatsens beteende baserat på 
 * skärmstorlek, vilket förbättrar både användbarheten och det visuella intrycket.
 */

document.addEventListener("DOMContentLoaded", () => {
    /**
     * 1. Mobilmenytoggling
     *
     * Denna sektion hanterar mobilnavigationsmenyn.
     * Den visar/döljer navigationslänkarna när menyknappen klickas.
     * Menyn döljs automatiskt på mobila enheter och visas på stationära datorer.
     * 
     * Implementationsdetaljer:
     * - Använder klickhändelse på nav-elementet (använder ::before-innehållet som trigger)
     * - Kontrollerar att klicket är på själva nav-elementet, inte på länkar
     * - Växlar menyns synlighet baserat på aktuell status
     * - Hanterar fönsterändringshändelser för att visa/dölja menyn vid storleksändring
     */
    const nav = document.querySelector(".main-nav")
  
    if (nav) {
      // Hämta navigationslistan
      const navUl = nav.querySelector("ul")
  
      if (navUl) {
        // Dölj menyn initialt på mobila enheter
        if (window.innerWidth <= 768) {
          navUl.style.display = "none"
        }
  
        // Lägg till klickhändelse på nav-elementet (använder ::before-innehållet som trigger)
        nav.addEventListener("click", (e) => {
          // Växla endast om klicket är på själva nav-elementet (::before-elementet), inte på länkar
          if (e.target === nav && window.innerWidth <= 768) {
            // Växla menyns synlighet
            if (navUl.style.display === "none") {
              navUl.style.display = "flex"
            } else {
              navUl.style.display = "none"
            }
          }
        })
  
        /**
         * Fönsterändringshändelse
         *
         * Säkerställer att menyn visas korrekt när fönstret ändrar storlek.
         * Visar menyn på stationära datorer och döljer den på mobila enheter.
         * 
         * Implementationsdetaljer:
         * - Lyssnar på resize-händelsen för fönstret
         * - Kontrollerar fönsterbredden för att avgöra om menyn ska visas eller döljas
         * - Använder flex-display för menyn på stationära datorer
         */
        window.addEventListener("resize", () => {
          if (window.innerWidth > 768) {
            // Visa menyn på stationära datorer
            navUl.style.display = "flex"
          } else {
            // Dölj menyn på mobila enheter
            navUl.style.display = "none"
          }
        })
      }
    }
  
    /**
     * 2. Responsiva bilder
     *
     * Gör produktbilder responsiva genom att ställa in max-bredd och höjd.
     * Detta säkerställer att bilder skalas korrekt på olika skärmstorlekar.
     * 
     * Implementationsdetaljer:
     * - Väljer alla produktbilder med querySelectorAll
     * - Ställer in maxWidth till 100% för att förhindra att bilder överskrider sina behållare
     * - Ställer in height till auto för att bevara bildernas proportioner
     */
    const productImages = document.querySelectorAll(".product-image img")
    productImages.forEach((img) => {
      img.style.maxWidth = "100%"
      img.style.height = "auto"
    })
  
    /**
     * 3. Höjdutjämning för produktkort
     *
     * Detta säkerställer att produktkort har konsekvent höjd
     * och att element inom dem justeras korrekt.
     * 
     * Implementationsdetaljer:
     * - Återställer höjder först för att hantera fönsterändring korrekt
     * - Hoppar över utjämning på mobila enheter för bättre responsivitet
     * - Hittar maxhöjder för titlar och beskrivningar
     * - Tillämpar lika höjder på alla kort för ett konsekvent utseende
     */
    function equalizeProductCardHeights() {
      // Hämta alla produktkort
      const productCards = document.querySelectorAll(".product-card")
  
      // Återställ höjder först
      productCards.forEach((card) => {
        const title = card.querySelector(".product-title")
        const description = card.querySelector(".product-description")
  
        if (title) title.style.height = "auto"
        if (description) description.style.height = "auto"
      })
  
      // Hoppa över utjämning på mobila enheter
      if (window.innerWidth < 768) return
  
      // Hitta maxhöjder
      let maxTitleHeight = 0
      let maxDescHeight = 0
  
      productCards.forEach((card) => {
        const title = card.querySelector(".product-title")
        const description = card.querySelector(".product-description")
  
        if (title && title.offsetHeight > maxTitleHeight) {
          maxTitleHeight = title.offsetHeight
        }
  
        if (description && description.offsetHeight > maxDescHeight) {
          maxDescHeight = description.offsetHeight
        }
      })
  
      // Tillämpa lika höjder
      productCards.forEach((card) => {
        const title = card.querySelector(".product-title")
        const description = card.querySelector(".product-description")
  
        if (title) title.style.height = `${maxTitleHeight}px`
        if (description) description.style.height = `${maxDescHeight}px`
      })
    }
  
    // Kör vid sidladdning
    equalizeProductCardHeights()
  
    // Kör när fönstret ändrar storlek
    window.addEventListener("resize", equalizeProductCardHeights)
  })