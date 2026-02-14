/**
 * TechStore - Kategoriresponsiv JavaScript
 *
 * Den här filen innehåller responsiv funktionalitet specifikt för kategorisidor.
 * Den hanterar mobilfiltervisning, filtergruppstoggling och produktkortshöjdutjämning.
 * 
 * Innehåll:
 * 1. Mobilfiltervisning
 * 2. Filtergruppstoggling
 * 3. Produktkortshöjdutjämning
 *
 * Designbeslut:
 * - Döljer filter som standard på mobila enheter för att spara utrymme
 * - Använder en toggle-mekanism för att visa/dölja filter på mobila enheter
 * - Implementerar expanderbara/kollapserbara filtergrupper för bättre organisation
 * - Säkerställer konsekvent höjd på produktkort för ett enhetligt utseende
 */

document.addEventListener("DOMContentLoaded", () => {
    /**
     * 1. Mobilfiltervisning
     *
     * Denna funktion lägger till möjligheten att visa/dölja filter på mobila enheter.
     * På desktop visas filtren alltid, men på mobila enheter är de dolda som standard
     * och kan visas genom att klicka på filterrubriken.
     * 
     * Implementationsdetaljer:
     * - Använder en klickhändelse på filtersidofältet för att visa/dölja filter
     * - Använder ::before-elementet som trigger för klickhändelsen
     * - Sätter initial synlighet baserat på skärmstorlek
     * - Hanterar fönsterändringshändelser för att uppdatera synligheten
     */
    const filterSidebar = document.querySelector(".filter-sidebar")
  
    if (filterSidebar) {
      // Lägg till klickhändelse på filtersidofältet (använder ::before-innehållet som trigger)
      filterSidebar.addEventListener("click", (e) => {
        // Växla endast om man klickar på själva sidofältet (::before-elementet), inte på filter
        if (e.target === filterSidebar && window.innerWidth <= 768) {
          filterSidebar.classList.toggle("active")
        }
      })
  
      // Sätt initial active-klass baserat på skärmstorlek
      if (window.innerWidth <= 768) {
        filterSidebar.classList.remove("active")
      } else {
        filterSidebar.classList.add("active")
      }
  
      // Hantera fönsterändring
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          filterSidebar.classList.add("active")
        } else {
          filterSidebar.classList.remove("active")
        }
      })
    }
  
    /**
     * 2. Filtergruppstoggling
     *
     * Denna funktion lägger till möjligheten att expandera/kollapsa filtergrupper.
     * Detta förbättrar användarupplevelsen genom att låta användare fokusera på
     * specifika filtertyper och minska visuell komplexitet.
     * 
     * Implementationsdetaljer:
     * - Lägger till klickhändelser på varje filtergrupprubrik
     * - Växlar mellan plus- och minustecken för att indikera status
     * - Använder collapsed-klassen för att visa/dölja filterlistor
     */
    const filterGroups = document.querySelectorAll(".filter-group h4")
  
    filterGroups.forEach((heading) => {
      heading.addEventListener("click", () => {
        const filterList = heading.nextElementSibling
        const toggleIcon = heading.querySelector(".toggle-icon")
  
        if (filterList.classList.contains("collapsed")) {
          filterList.classList.remove("collapsed")
          toggleIcon.textContent = "-"
        } else {
          filterList.classList.add("collapsed")
          toggleIcon.textContent = "+"
        }
      })
    })
  
    /**
     * 3. Produktkortshöjdutjämning
     *
     * Denna funktion säkerställer att produktkort har konsekvent höjd
     * genom att hitta den maximala höjden för titlar och beskrivningar
     * och tillämpa den höjden på alla element av samma typ.
     * 
     * Implementationsdetaljer:
     * - Grupperar element efter typ (titlar och beskrivningar)
     * - Hittar maximal höjd för varje elementtyp
     * - Tillämpar den maximala höjden på alla element av samma typ
     * - Hoppar över utjämning på mobila enheter för bättre anpassning
     * - Körs vid sidladdning och fönsterändring
     */
    function equalizeProductCardHeights() {
      // Hämta alla produktkort
      const productCards = document.querySelectorAll(".product-card-content h3, .product-description")
  
      // Återställ höjder först
      productCards.forEach((element) => {
        element.style.height = "auto"
      })
  
      // Hoppa över utjämning på mobil
      if (window.innerWidth < 768) return
  
      // Gruppera element efter typ
      const titles = document.querySelectorAll(".product-card-content h3")
      const descriptions = document.querySelectorAll(".product-description")
  
      // Hitta maximala höjder
      let maxTitleHeight = 0
      let maxDescHeight = 0
  
      titles.forEach((title) => {
        if (title.offsetHeight > maxTitleHeight) {
          maxTitleHeight = title.offsetHeight
        }
      })
  
      descriptions.forEach((desc) => {
        if (desc.offsetHeight > maxDescHeight) {
          maxDescHeight = desc.offsetHeight
        }
      })
  
      // Tillämpa lika höjder
      titles.forEach((title) => {
        title.style.height = `${maxTitleHeight}px`
      })
  
      descriptions.forEach((desc) => {
        desc.style.height = `${maxDescHeight}px`
      })
    }
  
    // Kör vid sidladdning
    equalizeProductCardHeights()
  
    // Kör när fönstret ändrar storlek
    window.addEventListener("resize", equalizeProductCardHeights)
  })