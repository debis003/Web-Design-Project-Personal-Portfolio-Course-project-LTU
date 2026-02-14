/**
 * TechStore - Produktdatamodul
 *
 * Den här filen innehåller produktdatastrukturen för TechStore-webbplatsen.
 * Den exporterar en array med produktobjekt som används för att visa produkter
 * på olika sidor på webbplatsen.
 * 
 * Datastruktur:
 * - Varje produkt representeras som ett objekt med standardiserade egenskaper
 * - Produkter kategoriseras för enkel filtrering och navigering
 * - Specifikationer lagras som nästlade objekt för flexibilitet
 *
 * Designbeslut:
 * - Använder en konsekvent datastruktur för alla produkter
 * - Inkluderar både aktuella och ursprungliga priser för att visa rabatter
 * - Lagrar produktspecifikationer som nästlade objekt för kategorispecifika detaljer
 * - Använder strängar för priser för att inkludera valutasymboler
 */

export const products = [
    {
      id: "1",
      name: "MacBook Pro M2",
      price: "19999kr",
      originalPrice: "22999kr",
      category: "computers",
      image: "../images/products/macbook.jpg",
      description: "Kraftfull laptop för professionellt bruk med den senaste M2-processorn från Apple",
      onSale: true,
      specifications: {
        Processor: "Apple M2",
        RAM: "16GB",
        Lagring: "512GB SSD",
        Skärm: '14" Retina display',
      },
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      price: "14999kr",
      originalPrice: "16999kr",
      category: "phones",
      image: "../images/products/iphone.jpg",
      description: "Senaste iPhone med topprestanda, avancerad kamera och innovativa funktioner",
      onSale: true,
      specifications: {
        Processor: "A17 Pro",
        Lagring: "256GB",
        Skärm: '6.1" Super Retina XDR',
        Kamera: "48MP huvudkamera, 12MP ultravidvinkel",
        Batteri: "Upp till 23 timmars videouppspelning",
      },
    },
    {
      id: "3",
      name: "PlayStation 5",
      price: "6999kr",
      originalPrice: "7499kr",
      category: "gaming",
      image: "../images/products/playstation.jpg",
      description: "Next-gen spelkonsol för bästa spelupplevelsen med blixtsnabb laddning och realistisk grafik",
      onSale: true,
      specifications: {
        Processor: "AMD Zen 2 (8 kärnor)",
        Grafik: "AMD RDNA 2 (10.28 TFLOPS)",
        Lagring: "825GB SSD",
        Upplösning: "Upp till 8K",
        Inkluderar: "DualSense-kontroll",
      },
    },
    {
      id: "4",
      name: "Sony WH-1000XM5",
      price: "4299kr",
      originalPrice: "4799kr",
      category: "audio-video",
      image: "../images/products/headphones.jpg",
      description: "Premium trådlösa hörlurar med branschledande brusreducering och exceptionell ljudkvalitet",
      onSale: true,
      specifications: {
        Typ: "Over-ear, trådlös",
        Brusreducering: "Aktiv, adaptiv",
        Batteritid: "Upp till 30 timmar",
        Anslutning: "Bluetooth 5.2, 3.5mm",
        Laddning: "USB-C, snabbladdning",
      },
    },
    {
      id: "5",
      name: 'iPad Pro 12.9"',
      price: "13999kr",
      originalPrice: null,
      category: "computers",
      image: "../images/products/ipad.jpg",
      description: "Kraftfull surfplatta för kreativt arbete med M2-chip och Liquid Retina XDR-skärm",
      onSale: false,
      specifications: {
        Processor: "Apple M2",
        RAM: "8GB",
        Lagring: "256GB",
        Skärm: '12.9" Liquid Retina XDR',
        Kamera: "12MP vidvinkel, 10MP ultravidvinkel",
      },
    },
    {
      id: "6",
      name: 'Samsung QLED 65"',
      price: "12999kr",
      originalPrice: "15999kr",
      category: "audio-video",
      image: "../images/products/tv.jpg",
      description: "Premium 4K TV med quantum dot-teknik för levande färger och djupa kontraster",
      onSale: true,
      specifications: {
        Skärmtyp: "QLED",
        Upplösning: "4K UHD (3840 x 2160)",
        HDR: "HDR10+, HLG",
        Ljud: "40W, 2.2.2 kanaler",
        "Smart TV": "Tizen OS, röststyrning",
      },
    },
    {
      id: "7",
      name: "Nintendo Switch OLED",
      price: "3999kr",
      originalPrice: null,
      category: "gaming",
      image: "../images/products/switch.jpg",
      description: "Portabel spelkonsol med OLED-skärm, förbättrat ljud och utökad lagring",
      onSale: false,
      specifications: {
        Skärm: '7" OLED',
        Lagring: "64GB (utökningsbar)",
        Batteritid: "4.5-9 timmar",
        Anslutningar: "USB-C, HDMI (i dockan)",
        Inkluderar: "Joy-Con-kontroller, docka",
      },
    },
    {
      id: "8",
      name: "AirPods Pro",
      price: "2799kr",
      originalPrice: "3099kr",
      category: "audio-video",
      image: "../images/products/airpods.jpg",
      description: "Trådlösa hörlurar med aktiv brusreducering, adaptivt ljud och vattentålig design",
      onSale: true,
      specifications: {
        Typ: "In-ear, trådlös",
        Brusreducering: "Aktiv",
        Batteritid: "Upp till 6 timmar (30 timmar med laddningsfodral)",
        Vattentålighet: "IPX4",
        Laddning: "MagSafe, trådlös, Lightning",
      },
    },
  ]