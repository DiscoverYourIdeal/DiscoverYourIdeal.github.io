let currentQuestionIndex = 0;
let numberOfDogsLeft = 202;
let currentQuestionConcept = "";
let selectedLang = "";
let selectedCountry = "";
let lastClickedCard = null; // Track the last clicked card
let duplicatedCard = null;  // Track the placeholder

// Objeto para almacenar los filtros seleccionados
const filters = {}; 

const questions = [
    {
        es: {
            question: "¿Como de grande es tu casa?",
            answers: ["Pequeña", "Mediana", "Grande"],
          },
        en: {
            question: "How big is your house?",
            answers: ["Small", "Medium", "Large"],
          },
        value: [1, 2, 3],
        concept: "spaceNeeded"
    },
    {
        es: {
            question: "¿Te gusta salir a la naturaleza?",
            answers: ["No", "A veces", "Mucho"],
          },
        en: {
            question: "Do you like to going out into nature?",
            answers: ["No", "Sometimes", "Frequently"],
          },
        value: [1, 2, 3],
        concept: "energy"
    },
    {
        es: {
            question: "¿Te gusta limpiar y ordenar tu hogar?",
            answers: ["No", "Me da igual", "Sí"],
          },
        en: {
            question: "Do you enjoy keeping your house clean?",
            answers: ["No", "I'm indifferent", "Yes"],
          },
        value: [1, 2, 3],
        concept: "shedding"
    },
    {
        es: {
            question: "¿Hay niños menores de 13 años en casa?",
            answers: ["No", "Sí"],
          },
        en: {
            question: "Are there children under 13 at home?",
            answers: ["No", "Yes"],
          },
        value: [1, 2],
        concept: "goodwithkids"
    },
    {
        es: {
            question: "¿Cuál es tu estado físico?",
            answers: ["Frágil", "Normal", "Atlético"],
          },
        en: {
            question: "How would you describe your fitness level?",
            answers: ["Fragile", "Normal", "Athletic"],
          },
        value: [1, 2, 3],
        concept: "size"
    },
    {
        es: {
            question: "¿Eres una persona que valora el estilo y el cuidado personal?",
            answers: ["No", "Me da igual", "Sí"],
          },
        en: {
            question: "Are you a person who values style and personal care?",
            answers: ["No", "I'm indifferent", "Yes"],
          },
        value: [1, 2, 3],
        concept: "groomingRequirements"
    },
    {
        es: {
            question: "¿Hay otros animales en casa?",
            answers: ["No", "Sí, enjaulados", "Sí, libres"],
          },
        en: {
            question: "Are there other pets at home?",
            answers: ["No", "Yes, caged", "Yes, free"],
          },
        value: [1, 2, 3],
        concept: "goodWithPets"
    },
    {
        es: {
            question: "¿Eres una persona paciente?",
            answers: ["No", "Bastante", "Mucho"],
          },
        en: {
            question: "Are you a patient person?",
            answers: ["No", "Enough", "A lot"],
          },
        value: [3, 2, 1],
        concept: "intelligence"
    },
    {
        es: {
            question: "¿Te gusta enseñar a otros?",
            answers: ["No", "Un poco", "Mucho"],
          },
        en: {
            question: "Do you like to teach to others?",
            answers: ["No", "A little", "A lot"],
          },
        value: [1, 2, 3],
        concept: "trainability"
    },
    {
        es: {
            question: "¿Qué tan sensible eres al ruido?",
            answers: ["Nada", "Poco", "Mucho"],
          },
        en: {
            question: "How sensitive are you to noise?",
            answers: ["None", "A little", "A lot"],
          },
        value: [3, 2, 1],
        concept: "barking"
    },
    {
        es: {
            question: "¿Cuánto estás dispuesto a ayudar a los demás?",
            answers: ["Lo justo", "Lo que puedo", "Me entrego"],
          },
        en: {
            question: "How much are you willing to help others?",
            answers: ["Just enough", "What I can manage", "I give my all"],
          },
        value: [3, 2, 1],
        concept: "health"
    },
    {
        es: {
            question: "¿Cuánto tiempo pasas fuera de casa diariamente?",
            answers: ["4h", "8h", "12h"],
          },
        en: {
            question: "How much time do you spend outside of your home daily?",
            answers: ["4h", "8h", "12h"],
          },
        value: [3, 2, 1],
        concept: "dependance"
    }
    /*
    {
        es: {
            question: "¿?",
            answers: ["a", "b", "c"],
          },
        en: {
            question: "?",
            answers: ["a", "b", "c"],
          },
        value: [1, 2, 3],
        concept: "lifespan"
    },
    {
        es: {
            question: "¿?",
            answers: ["a", "b", "c"],
          },
        en: {
            question: "?",
            answers: ["a", "b", "c"],
          },
        value: [1, 2, 3],
        concept: "weather"
    },
    */
];

// Define the content for different languages
const content = {
    es: {
      title: 'Encuentra tu perro ideal',
      start_button: 'Empieza el Quizz',
      restart_button: 'Volver',
      start_message: "Responde preguntas sobre tus gustos y tu estilo de vida y encuentra a tu perro ideal!",
      end_message: "¡Buen Trabajo! ¡Esta es la selección de perros ideales para ti!",
      ups_message: "Ups! Parece que no hay perros que se adapten a tus gustos y estilo de vida! Vuelve a probar!"
    },
    en: {
      title: 'Find your ideal dog',
      start_button: 'Start the Quizz',
      restart_button: 'Return',
      start_message: "Aswer questions about your interests and lifestyle and find your ideal dog!",
      end_message: "Great Job! This is the selection of your ideal dogs!",
      ups_message: "Ups! It seems that there isn't any dog that adapts to your interests and lifestyle. Try again!"
    }
  };

// Array de razas de perros con sus características
const dogBreeds = [
    {
        name: "Siberian Husky",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/Siberian_Husky.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y amigable, ideal para familias activas y amantes del aire libre." },
        en: { text: "The Siberian Husky is a medium-sized, active dog known for its friendly and outgoing nature. Originally bred as sled dogs, they are strong, energetic, and have an independent streak. Their dense double coat, erect triangular ears, and striking blue or multi-colored eyes are distinctive features. Huskies are good with families and other dogs but require consistent training and ample exercise to satisfy their high energy levels. They are not prone to excessive barking, but they can be vocal with howls." }
    },
    {
        name: "Poodle",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Poodle.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro inteligente y elegante, ideal para familias y personas activas." },
        en: { text: "An intelligent and elegant dog, ideal for families and active individuals." }
    },
    {
        name: "Affenpinscher",
        size: 1,
        energy: 2,
        goodWithKids: 1,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 1,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Affenpinscher.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Pequeño y enérgico, el Affenpinscher es curioso y necesita entrenamiento temprano." },
        en: { text: "Small and energetic, the Affenpinscher is curious and requires early training." }
    },
    {
        name: "Akita",
        size: 3,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 1,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/Akita.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro leal y protector, el Akita es mejor en hogares con dueños experimentados." },
        en: { text: "A loyal and protective dog, the Akita is best suited for homes with experienced owners." }
    },
    {
        name: "Alaskan Malamute",
        size: 3,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Alaskan_Malamute.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro fuerte y enérgico, el Alaskan Malamute es perfecto para actividades al aire libre." },
        en: { text: "A strong and energetic dog, the Alaskan Malamute is perfect for outdoor activities." }
    },
    {
        name: "American Bulldog",
        size: 3,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/American_Bulldog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro amigable y protector, excelente para familias, requiere entrenamiento y socialización." },
        en: { text: "A friendly and protective dog, great for families, requires training and socialization." }
    },
    {
        name: "American Pit Bull Terrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/American_Pit_Bull_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y leal, necesita entrenamiento y socialización desde una edad temprana." },
        en: { text: "An energetic and loyal dog, needs training and socialization from a young age." }
    },
    {
        name: "Anatolian Shepherd Dog",
        size: 3,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Anatolian_Shepherd_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro guardián fuerte y protector, ideal para familias con experiencia en razas grandes." },
        en: { text: "A strong and protective guardian dog, ideal for families with experience in large breeds." }
    },
    {
        name: "Australian Cattle Dog",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Australian_Cattle_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro inteligente y enérgico, excelente para familias activas y entrenamiento." },
        en: { text: "An intelligent and energetic dog, great for active families and training." }
    },
    {
        name: "Australian Shepherd",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Australian_Shepherd.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro ágil y trabajador, ideal para familias activas y entrenamiento." },
        en: { text: "An agile and hardworking dog, ideal for active families and training." }
    },
    {
        name: "Basenji",
        size: 2,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 1,
        shedding: 1,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 1,
        image: "assets/css/images/Basenji.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro independiente y enérgico, a menudo se considera un buen compañero." },
        en: { text: "An independent and energetic dog, often considered a good companion." }
    },
    {
        name: "Basset Hound",
        size: 2,
        energy: 1,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 1,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 1,
        image: "assets/css/images/Basset_Hound.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro tranquilo y amigable, ideal para familias y que se lleva bien con otras mascotas." },
        en: { text: "A calm and friendly dog, ideal for families and gets along well with other pets." }
    },
    {
        name: "Beagle",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Beagle.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro curioso y juguetón, perfecto para familias activas y con niños." },
        en: { text: "A curious and playful dog, perfect for active families with children." }
    },
    {
        name: "Bearded Collie",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Bearded_Collie.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro amigable y alegre, ideal para familias activas y entrenamiento." },
        en: { text: "A friendly and cheerful dog, ideal for active families and training." }
    },
    {
        name: "Belgian Malinois",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Belgian_Malinois.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro inteligente y enérgico, excelente para entrenamiento y trabajos de servicio." },
        en: { text: "An intelligent and energetic dog, excellent for training and service work." }
    },
    {
        name: "Bichon Frise",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Bichon_Frise.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y cariñoso, ideal para apartamentos y familias con niños." },
        en: { text: "A small and affectionate dog, ideal for apartments and families with children." }
    },
    {
        name: "Border Collie",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Border_Collie.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro extremadamente inteligente y ágil, perfecto para familias activas y deportes caninos." },
        en: { text: "An extremely intelligent and agile dog, perfect for active families and dog sports." }
    },
    {
        name: "Boston Terrier",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Boston_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y cariñoso, ideal para apartamentos y familias." },
        en: { text: "A small and affectionate dog, ideal for apartments and families." }
    },
    {
        name: "Boxer",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Boxer.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y leal, ideal para familias y actividades al aire libre." },
        en: { text: "An energetic and loyal dog, ideal for families and outdoor activities." }
    },
    {
        name: "Brittany Spaniel",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Brittany_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y alegre, ideal para familias activas y entrenamiento." },
        en: { text: "An energetic and cheerful dog, ideal for active families and training." }
    },
    {
        name: "Cairn Terrier",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Cairn_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y amigable, ideal para familias y niños." },
        en: { text: "A small and friendly dog, ideal for families and children." }
    },
    {
        name: "Cavalier King Charles Spaniel",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Cavalier_King_Charles_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro cariñoso y amable, ideal para familias y apartamentos." },
        en: { text: "A loving and gentle dog, ideal for families and apartments." }
    },
    {
        name: "Chihuahua",
        size: 1,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Chihuahua.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y valiente, ideal para dueños que buscan un compañero leal." },
        en: { text: "A small and brave dog, ideal for owners looking for a loyal companion." }
    },
    {
        name: "Chinese Shar-Pei",
        size: 2,
        energy: 1,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Chinese_Shar_Pei.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro tranquilo y leal, ideal para familias y hogares." },
        en: { text: "A calm and loyal dog, ideal for families and homes." }
    },
    {
        name: "Chow Chow",
        size: 2,
        energy: 1,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Chow_Chow.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro único y leal, ideal para dueños que buscan un compañero independiente." },
        en: { text: "A unique and loyal dog, ideal for owners looking for an independent companion." }
    },
    {
        name: "Cocker Spaniel",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Cocker_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro cariñoso y amigable, ideal para familias con niños." },
        en: { text: "A loving and friendly dog, ideal for families with children." }
    },
    {
        name: "Dachshund",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Dachshund.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y valiente, ideal para familias y dueños." },
        en: { text: "A small and brave dog, ideal for families and owners." }
    },
    {
        name: "Dalmatian",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Dalmatian.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y amigable, ideal para familias activas y entusiastas." },
        en: { text: "An energetic and friendly dog, ideal for active families and enthusiasts." }
    },
    {
        name: "Doberman Pinscher",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Doberman_Pinscher.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro inteligente y protector, ideal para familias y dueños experimentados." },
        en: { text: "An intelligent and protective dog, ideal for families and experienced owners." }
    },
    {
        name: "English Bulldog",
        size: 2,
        energy: 1,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 1,
        shedding: 2,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 1,
        image: "assets/css/images/English_Bulldog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro tranquilo y cariñoso, ideal para familias y hogares." },
        en: { text: "A calm and affectionate dog, ideal for families and homes." }
    },
    {
        name: "English Springer Spaniel",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/English_Springer_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y amistoso, ideal para familias y actividades al aire libre." },
        en: { text: "An energetic and friendly dog, ideal for families and outdoor activities." }
    },
    {
        name: "French Bulldog",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/French_Bulldog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro juguetón y cariñoso, ideal para familias y apartamentos." },
        en: { text: "A playful and affectionate dog, ideal for families and apartments." }
    },
    {
        name: "Golden Retriever",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Golden_Retriever.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro amigable y leal, ideal para familias activas." },
        en: { text: "A friendly and loyal dog, ideal for active families." }
    },
    {
        name: "Labrador Retriever",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Labrador_Retriever.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro activo y amigable, ideal para familias y actividades al aire libre." },
        en: { text: "An active and friendly dog, ideal for families and outdoor activities." }
    },
    {
        name: "Pomeranian",
        size: 1,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 1,
        barking: 3,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Pomeranian2.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y lleno de energía, ideal para dueños que buscan un compañero activo." },
        en: { text: "A small and energetic dog, ideal for owners looking for an active companion." }
    },
    {
        name: "Pug",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Pug.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro juguetón y cariñoso, ideal para familias y dueños." },
        en: { text: "A playful and affectionate dog, ideal for families and owners." }
    },
    {
        name: "Rottweiler",
        size: "large",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Rottweiler.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro fuerte y leal, ideal para dueños experimentados y familias." },
        en: { text: "A strong and loyal dog, ideal for experienced owners and families." }
    },
    {
        name: "Shih Tzu",
        size: 1,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Shih_Tzu.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro cariñoso y leal, ideal para familias y apartamentos." },
        en: { text: "A loving and loyal dog, ideal for families and apartments." }
    },
    {
        name: "Yorkshire Terrier",
        size: 1,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 3,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Yorkshire_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro pequeño y encantador, ideal para dueños que buscan un compañero leal." },
        en: { text: "A small and charming dog, ideal for owners looking for a loyal companion." }
    },
    {
        name: "Beauceron",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/Beauceron.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro inteligente y versátil, ideal para familias activas." },
        en: { text: "An intelligent and versatile dog, ideal for active families." }
    },
    {
        name: "English Cocker Spaniel",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/English_Cocker_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro dulce y amigable, excelente para familias con niños." },
        en: { text: "A sweet and friendly dog, great for families with children." }
    },
    {
        name: "English Foxhound",
        size: "large",
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/English_Foxhound.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro activo y social, excelente para familias con espacio." },
        en: { text: "An active and social dog, great for families with space." }
    },
    {
        name: "English Setter",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/English_Setter.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro cariñoso y enérgico, ideal para familias activas." },
        en: { text: "A loving and energetic dog, ideal for active families." }
    },
    {
        name: "Entlebucher Mountain Dog",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Entlebucher_Mountain_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro ágil y fuerte, ideal para familias activas." },
        en: { text: "An agile and strong dog, ideal for active families." }
    },
    {
        name: "Field Spaniel",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Field_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro cariñoso y leal, ideal para familias." },
        en: { text: "A loving and loyal dog, great for families." }
    },
    {
        name: "Finnish Lapphund",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/Finnish_Lapphund.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro amigable y trabajador, ideal para familias." },
        en: { text: "A friendly and hardworking dog, ideal for families." }
    },
    {
        name: "Finnish Spitz",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 3,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/Finnish_Spitz.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro activo y alerta, ideal para familias." },
        en: { text: "An active and alert dog, ideal for families." }
    },
    {
        name: "Flat-Coated Retriever",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Flat_Coated_Retriever.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro amistoso y enérgico, ideal para familias." },
        en: { text: "A friendly and energetic dog, ideal for families." }
    },
    {
        name: "German Pinscher",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/German_Pinscher.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro enérgico y protector, ideal para familias." },
        en: { text: "An energetic and protective dog, ideal for families." }
    },
    {
        name: "Afghan Hound",
        size: "large",
        energy: 2,
        goodWithKids: 1,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 1,
        shedding: 1,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Afghan_Hound.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Elegante y independiente, el Afghan Hound es un perro de compañía leal." },
        en: { text: "Elegant and independent, the Afghan Hound is a loyal companion dog." }
    },
    {
        name: "Airedale Terrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Airedale_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Airedale Terrier es conocido por su inteligencia y energía, ideal para familias." },
        en: { text: "The Airedale Terrier is known for its intelligence and energy, great for families." }
    },
    {
        name: "American Staffordshire Terrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/American_Staffordshire_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Un perro fuerte y leal, excelente para familias y protección." },
        en: { text: "A strong and loyal dog, excellent for families and protection." }
    },
    {
        name: "Australian Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Australian_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Pequeño y valiente, el Australian Terrier es perfecto para la vida familiar." },
        en: { text: "Small and brave, the Australian Terrier is perfect for family life." }
    },
    {
        name: "Bedlington Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Bedlington_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Con su aspecto distintivo, el Bedlington Terrier es un compañero encantador." },
        en: { text: "With its distinctive appearance, the Bedlington Terrier is a charming companion." }
    },
    {
        name: "Belgian Tervuren",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Belgian_Tervuren.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Belgian Tervuren es un perro versátil y trabajador, ideal para actividades al aire libre." },
        en: { text: "The Belgian Tervuren is a versatile and hardworking dog, ideal for outdoor activities." }
    },
    {
        name: "Bergamasco Sheepdog",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Bergamasco_Sheepdog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bergamasco es un perro leal y protector, ideal para el trabajo en el campo." },
        en: { text: "The Bergamasco is a loyal and protective dog, ideal for work in the field." }
    },
    {
        name: "Black and Tan Coonhound",
        size: "large",
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 3,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Black_and_Tan_Coonhound.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Black and Tan Coonhound es un perro cazador con gran sentido del olfato." },
        en: { text: "The Black and Tan Coonhound is a hunting dog with a great sense of smell." }
    },
    {
        name: "Black Russian Terrier",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Black_Russian_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Black Russian Terrier es un perro fuerte y protector, ideal para la familia." },
        en: { text: "The Black Russian Terrier is a strong and protective dog, ideal for family." }
    },
    {
        name: "Bloodhound",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Bloodhound.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bloodhound es famoso por su olfato excepcional y su naturaleza amigable." },
        en: { text: "The Bloodhound is famous for its exceptional sense of smell and friendly nature." }
    },
    {
        name: "Border Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Border_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "Pequeño y valiente, el Border Terrier es un excelente compañero." },
        en: { text: "Small and brave, the Border Terrier is an excellent companion." }
    },
    {
        name: "Borzoi",
        size: "large",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 1,
        image: "assets/css/images/Borzoi.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Borzoi es un perro elegante y noble, ideal para hogares tranquilos." },
        en: { text: "The Borzoi is an elegant and noble dog, ideal for calm homes." }
    },
    {
        name: "Bouvier des Flandres",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Bouvier_des_Flandres.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bouvier des Flandres es un perro fuerte y protector, ideal para familias." },
        en: { text: "The Bouvier des Flandres is a strong and protective dog, ideal for families." }
    },
    {
        name: "Boykin Spaniel",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Boykin_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Boykin Spaniel es un perro enérgico y amigable, excelente para actividades al aire libre." },
        en: { text: "The Boykin Spaniel is an energetic and friendly dog, excellent for outdoor activities." }
    },
    {
        name: "Bracco Italiano",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Bracco_Italiano.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bracco Italiano es un perro de caza leal, ideal para familias activas." },
        en: { text: "The Bracco Italiano is a loyal hunting dog, ideal for active families." }
    },
    {
        name: "Brussels Griffon",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Brussels_Griffon.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Brussels Griffon es un perro pequeño y curioso, ideal para la vida en apartamentos." },
        en: { text: "The Brussels Griffon is a small and curious dog, ideal for apartment living." }
    },
    {
        name: "Bull Terrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Bull_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bull Terrier es conocido por su personalidad juguetona y enérgica." },
        en: { text: "The Bull Terrier is known for its playful and energetic personality." }
    },
    {
        name: "Bullmastiff",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Bullmastiff.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bullmastiff es un perro poderoso y protector, excelente para la seguridad del hogar." },
        en: { text: "The Bullmastiff is a powerful and protective dog, excellent for home security." }
    },
    {
        name: "Chinese Crested",
        size: "small",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/Chinese_Crested.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Chinese Crested es un perro único, conocido por su apariencia peculiar." },
        en: { text: "The Chinese Crested is a unique dog known for its peculiar appearance." }
    },
    {
        name: "Clumber Spaniel",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Clumber_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Clumber Spaniel es un perro amable y amigable, ideal para familias." },
        en: { text: "The Clumber Spaniel is a gentle and friendly dog, ideal for families." }
    },
    {
        name: "Collie",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/Collie.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Collie es un perro inteligente y leal, ideal para la vida familiar." },
        en: { text: "The Collie is an intelligent and loyal dog, ideal for family life." }
    },
    {
        name: "Dogo Argentino",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Dogo_Argentino.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Dogo Argentino es un perro fuerte y protector, ideal para la familia." },
        en: { text: "The Dogo Argentino is a strong and protective dog, ideal for family." }
    },
    {
        name: "Dogue de Bordeaux",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/Dogue_de_Bordeaux.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Dogue de Bordeaux es un perro leal y poderoso, excelente para la protección." },
        en: { text: "The Dogue de Bordeaux is a loyal and powerful dog, excellent for protection." }
    },
    {
        name: "German Shepherd Dog",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/German_Shepherd_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pastor Alemán es un perro inteligente y versátil, ideal para trabajo y familia." },
        en: { text: "The German Shepherd is an intelligent and versatile dog, ideal for work and family." }
    },
    {
        name: "German Shorthaired Pointer",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/German_Shorthaired_Pointer.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pointer Alemán de Pelo Corto es un perro enérgico y amante de la caza." },
        en: { text: "The German Shorthaired Pointer is an energetic and hunting-loving dog." }
    },
    {
        name: "German Wirehaired Pointer",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/German_Wirehaired_Pointer.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pointer Alemán de Pelo Duro es un perro versátil y trabajador." },
        en: { text: "The German Wirehaired Pointer is a versatile and hardworking dog." }
    },
    {
        name: "Giant Schnauzer",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Schnauzer Gigante es un perro fuerte y protector, ideal para el hogar." },
        en: { text: "The Giant Schnauzer is a strong and protective dog, ideal for home." }
    },
    {
        name: "Glen of Imaal Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Glen of Imaal Terrier es un perro curioso y leal, ideal para familias." },
        en: { text: "The Glen of Imaal Terrier is a curious and loyal dog, ideal for families." }
    },
    {
        name: "Goldador",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Goldador es un perro amigable y cariñoso, ideal para familias." },
        en: { text: "The Goldador is a friendly and affectionate dog, ideal for families." }
    },
    {
        name: "Goldendoodle",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Goldendoodle es un perro cariñoso y juguetón, ideal para la familia." },
        en: { text: "The Goldendoodle is a loving and playful dog, ideal for family." }
    },
    {
        name: "Great Dane",
        size: "giant",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Gran Danés es un perro impresionante y amable, ideal para la familia." },
        en: { text: "The Great Dane is an impressive and gentle dog, ideal for family." }
    },
    {
        name: "Great Pyrenees",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Gran Pirineo es un perro protector y cariñoso, ideal para familias." },
        en: { text: "The Great Pyrenees is a protective and affectionate dog, ideal for families." }
    },
    {
        name: "Greater Swiss Mountain Dog",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Perro de Montaña Suizo Mayor es un perro leal y trabajador." },
        en: { text: "The Greater Swiss Mountain Dog is a loyal and hardworking dog." }
    },
    {
        name: "Harrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Harrier es un perro activo y juguetón, ideal para familias." },
        en: { text: "The Harrier is an active and playful dog, ideal for families." }
    },
    {
        name: "Havanese",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Havanese es un perro amigable y cariñoso, ideal para la vida en apartamentos." },
        en: { text: "The Havanese is a friendly and affectionate dog, ideal for apartment living." }
    },

    {
        name: "Irish Setter",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Setter Irlandés es un perro enérgico y amistoso, ideal para familias activas." },
        en: { text: "The Irish Setter is an energetic and friendly dog, ideal for active families." }
    },
    {
        name: "Irish Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Terrier Irlandés es un perro leal y juguetón, ideal para familias." },
        en: { text: "The Irish Terrier is a loyal and playful dog, ideal for families." }
    },
    {
        name: "Irish Water Spaniel",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Spaniel de Agua Irlandés es un perro juguetón y versátil, ideal para familias activas." },
        en: { text: "The Irish Water Spaniel is a playful and versatile dog, ideal for active families." }
    },
    {
        name: "Italian Greyhound",
        size: "small",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Galgo Italiano es un perro elegante y cariñoso, ideal para apartamentos." },
        en: { text: "The Italian Greyhound is an elegant and affectionate dog, ideal for apartments." }
    },
    {
        name: "Jack Russell Terrier",
        size: "small",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Jack Russell Terrier es un perro activo y inteligente, ideal para familias." },
        en: { text: "The Jack Russell Terrier is an active and intelligent dog, ideal for families." }
    },
    {
        name: "Japanese Chin",
        size: "small",
        energy: 1,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Chin Japonés es un perro juguetón y cariñoso, ideal para la vida en casa." },
        en: { text: "The Japanese Chin is a playful and affectionate dog, ideal for home life." }
    },
    {
        name: "Keeshond",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Keeshond es un perro amigable y alerta, ideal para familias." },
        en: { text: "The Keeshond is a friendly and alert dog, ideal for families." }
    },
    {
        name: "Lagotto Romagnolo",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Lagotto Romagnolo es un perro inteligente y enérgico, ideal para la familia." },
        en: { text: "The Lagotto Romagnolo is an intelligent and energetic dog, ideal for family." }
    },
    {
        name: "Lakeland Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Lakeland Terrier es un perro juguetón y leal, ideal para familias." },
        en: { text: "The Lakeland Terrier is a playful and loyal dog, ideal for families." }
    },
    {
        name: "Lhasa Apso",
        size: "small",
        energy: 1,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Lhasa Apso es un perro independiente y leal, ideal para la vida en casa." },
        en: { text: "The Lhasa Apso is an independent and loyal dog, ideal for home life." }
    },
    {
        name: "Maltese",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Maltés es un perro cariñoso y juguetón, ideal para la vida en casa." },
        en: { text: "The Maltese is a loving and playful dog, ideal for home life." }
    },
    {
        name: "Manchester Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Manchester Terrier es un perro ágil y alerta, ideal para la familia." },
        en: { text: "The Manchester Terrier is an agile and alert dog, ideal for family." }
    },
    {
        name: "Mastiff",
        size: "giant",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Mastín es un perro fuerte y leal, ideal para familias y hogares espaciosos." },
        en: { text: "The Mastiff is a strong and loyal dog, ideal for families and spacious homes." }
    },
    {
        name: "Miniature Bull Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Bull Terrier Miniatura es un perro juguetón y enérgico, ideal para familias." },
        en: { text: "The Miniature Bull Terrier is a playful and energetic dog, ideal for families." }
    },
    {
        name: "Miniature Pinscher",
        size: "small",
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/Miniature_Pinscher.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pinscher Miniatura es un perro ágil y activo, ideal para apartamentos." },
        en: { text: "The Miniature Pinscher is an agile and active dog, ideal for apartments." }
    },
    {
        name: "Miniature Schnauzer",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Schnauzer Miniatura es un perro cariñoso y juguetón, ideal para familias." },
        en: { text: "The Miniature Schnauzer is a loving and playful dog, ideal for families." }
    },
    {
        name: "Newfoundland",
        size: "giant",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Terranova es un perro amable y protector, ideal para familias." },
        en: { text: "The Newfoundland is a gentle and protective dog, ideal for families." }
    },
    {
        name: "Norfolk Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Norfolk Terrier es un perro pequeño y amistoso, ideal para familias." },
        en: { text: "The Norfolk Terrier is a small and friendly dog, ideal for families." }
    },
    {
        name: "Norwegian Buhund",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Buhund Noruego es un perro versátil y activo, ideal para familias." },
        en: { text: "The Norwegian Buhund is a versatile and active dog, ideal for families." }
    },
    {
        name: "Norwegian Elkhound",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Elkhound Noruego es un perro leal y protector, ideal para familias." },
        en: { text: "The Norwegian Elkhound is a loyal and protective dog, ideal for families." }
    },
    {
        name: "Old English Sheepdog",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Perro Pastor Inglés Antiguo es un perro amistoso y protector, ideal para familias." },
        en: { text: "The Old English Sheepdog is a friendly and protective dog, ideal for families." }
    },
    {
        name: "Papillon",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Papillon es un perro pequeño y alegre, ideal para la vida en casa." },
        en: { text: "The Papillon is a small and cheerful dog, ideal for home life." }
    },
    {
        name: "Pekingese",
        size: "small",
        energy: 1,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 1,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 1,
        dependance: 1,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pekingés es un perro leal y cariñoso, ideal para la vida en casa." },
        en: { text: "The Pekingese is a loyal and affectionate dog, ideal for home life." }
    },
    {
        name: "Pembroke Welsh Corgi",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Corgi Galés de Pembroke es un perro amigable y leal, ideal para familias." },
        en: { text: "The Pembroke Welsh Corgi is a friendly and loyal dog, ideal for families." }
    },
    {
        name: "Pit Bull Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pit Bull Terrier es un perro fuerte y cariñoso, ideal para familias." },
        en: { text: "The Pit Bull Terrier is a strong and affectionate dog, ideal for families." }
    },
    {
        name: "Pointer",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Pointer es un perro activo y amistoso, ideal para familias y actividades al aire libre." },
        en: { text: "The Pointer is an active and friendly dog, ideal for families and outdoor activities." }
    },
    {
        name: "Polish Lowland Sheepdog",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Perro Pastor Polaco es un perro inteligente y protector, ideal para familias." },
        en: { text: "The Polish Lowland Sheepdog is an intelligent and protective dog, ideal for families." }
    },
    {
        name: "Portuguese Water Dog",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Perro de Agua Portugués es un perro enérgico y versátil, ideal para familias." },
        en: { text: "The Portuguese Water Dog is an energetic and versatile dog, ideal for families." }
    },
    {
        name: "Saint Bernard",
        size: "giant",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El San Bernardo es un perro amable y protector, ideal para familias grandes." },
        en: { text: "The Saint Bernard is a gentle and protective dog, ideal for large families." }
    },
    {
        name: "Saluki",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Saluki es un perro elegante y enérgico, ideal para familias activas." },
        en: { text: "The Saluki is an elegant and energetic dog, ideal for active families." }
    },
    {
        name: "Samoyed",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Samoyedo es un perro amistoso y enérgico, ideal para familias y climas fríos." },
        en: { text: "The Samoyed is a friendly and energetic dog, ideal for families and cold climates." }
    },
    {
        name: "Schipperke",
        size: "small",
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Schipperke es un perro curioso y enérgico, ideal para familias." },
        en: { text: "The Schipperke is a curious and energetic dog, ideal for families." }
    },
    {
        name: "Scottish Deerhound",
        size: "large",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 3,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Deerhound Escocés es un perro leal y protector, ideal para familias." },
        en: { text: "The Scottish Deerhound is a loyal and protective dog, ideal for families." }
    },
    {
        name: "Scottish Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Terrier Escocés es un perro valiente y leal, ideal para familias." },
        en: { text: "The Scottish Terrier is a brave and loyal dog, ideal for families." }
    },
    {
        name: "Sealyham Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Sealyham Terrier es un perro amigable y enérgico, ideal para familias." },
        en: { text: "The Sealyham Terrier is a friendly and energetic dog, ideal for families." }
    },
    {
        name: "Shetland Sheepdog",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 3,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Shetland Sheepdog es un perro inteligente y leal, ideal para familias." },
        en: { text: "The Shetland Sheepdog is an intelligent and loyal dog, ideal for families." }
    },
    {
        name: "Shiba Inu",
        size: 2,
        energy: 3,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Shiba Inu es un perro independiente y leal, ideal para familias." },
        en: { text: "The Shiba Inu is an independent and loyal dog, ideal for families." }
    },
    {
        name: "Staffordshire Bull Terrier",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Staffordshire Bull Terrier es un perro leal y enérgico, ideal para familias." },
        en: { text: "The Staffordshire Bull Terrier is a loyal and energetic dog, ideal for families." }
    },
    {
        name: "Standard Schnauzer",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Schnauzer Estándar es un perro activo y leal, ideal para familias." },
        en: { text: "The Standard Schnauzer is an active and loyal dog, ideal for families." }
    },
    {
        name: "Tibetan Mastiff",
        size: "giant",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 3,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 3,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 3,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Mastín Tibetano es un perro protector y leal, ideal para familias." },
        en: { text: "The Tibetan Mastiff is a protective and loyal dog, ideal for families." }
    },
    {
        name: "Tibetan Spaniel",
        size: "small",
        energy: 2,
        goodWithKids: 2,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Spaniel Tibetano es un perro amistoso y cariñoso, ideal para familias." },
        en: { text: "The Tibetan Spaniel is a friendly and affectionate dog, ideal for families." }
    },
    {
        name: "Tibetan Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 3,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 3,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Terrier Tibetano es un perro cariñoso y amigable, ideal para familias." },
        en: { text: "The Tibetan Terrier is a loving and friendly dog, ideal for families." }
    },
    {
        name: "Vizsla",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 3,
        intelligence: 3,
        trainability: 3,
        shedding: 1,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Vizsla es un perro activo y cariñoso, ideal para familias y actividades al aire libre." },
        en: { text: "The Vizsla is an active and affectionate dog, ideal for families and outdoor activities." }
    },
    {
        name: "Weimaraner",
        size: "large",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 3,
        shedding: 2,
        spaceNeeded: 3,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Weimaraner es un perro enérgico y leal, ideal para familias activas." },
        en: { text: "The Weimaraner is an energetic and loyal dog, ideal for active families." }
    },
    {
        name: "Welsh Springer Spaniel",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Spaniel de Welsh es un perro amistoso y enérgico, ideal para familias." },
        en: { text: "The Welsh Springer Spaniel is a friendly and energetic dog, ideal for families." }
    },
    {
        name: "Welsh Terrier",
        size: 2,
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Terrier de Welsh es un perro amistoso y leal, ideal para familias." },
        en: { text: "The Welsh Terrier is a friendly and loyal dog, ideal for families." }
    },
    {
        name: "West Highland White Terrier",
        size: "small",
        energy: 2,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 3,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El West Highland White Terrier es un perro alegre y amistoso, ideal para familias." },
        en: { text: "The West Highland White Terrier is a cheerful and friendly dog, ideal for families." }
    },
    {
        name: "Whippet",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 1,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 2,
        barking: 1,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Whippet es un perro rápido y cariñoso, ideal para familias." },
        en: { text: "The Whippet is a fast and affectionate dog, ideal for families." }
    },
    {
        name: "Wire Fox Terrier",
        size: "small",
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 2,
        trainability: 2,
        shedding: 1,
        spaceNeeded: 1,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 2,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Wire Fox Terrier es un perro enérgico y amistoso, ideal para familias." },
        en: { text: "The Wire Fox Terrier is an energetic and friendly dog, ideal for families." }
    },
    {
        name: "Wirehaired Pointing Griffon",
        size: 2,
        energy: 3,
        goodWithKids: 3,
        groomingRequirements: 2,
        goodWithPets: 2,
        intelligence: 3,
        trainability: 2,
        shedding: 2,
        spaceNeeded: 2,
        barking: 2,
        health: 2,
        lifespan: 2,
        weather: 2,
        dependance: 3,
        image: "assets/css/images/dog_placeholder.webp",
        es_ES: { affiliatedLink: "es_ES link", textLink: "Mira este producto!"},
        en_US: { affiliatedLink: "en_US link", textLink: "Check out this product!"},
        es: { text: "El Wirehaired Pointing Griffon es un perro versátil y amistoso, ideal para familias." },
        en: { text: "The Wirehaired Pointing Griffon is a versatile and friendly dog, ideal for families." }
    }
];

setInitState()
setDogCards()

// Cargar la primera pregunta
function loadQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    currentQuestionConcept = questions[currentQuestionIndex].concept;
    document.getElementById('quizz-question').innerText = currentQuestion[selectedLang].question;

    const buttons = document.querySelectorAll('#questions-panel button');

    buttons.forEach((button, index) => {
        if (currentQuestion[selectedLang].answers[index]) {
            button.innerText = currentQuestion[selectedLang].answers[index];
            button.style.display = 'inline';
            button.onclick = () => answerQuestion(currentQuestion.value[index]);
        } else {
            button.style.display = 'none';
        }
    });
}

function changeQuestionsPanelLanguage() {

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('quizz-question').innerText = currentQuestion[selectedLang].question;

    const buttons = document.querySelectorAll('#questions-panel button');

    buttons.forEach((button, index) => {
            button.innerText = currentQuestion[selectedLang].answers[index];
    });
}

function answerQuestion(value) {
    // Almacena la respuesta seleccionada
    switch (currentQuestionConcept){
        case "spaceNeeded":
            filters.spaceNeeded = value;
            break;
        case "energy":
            filters.energy = value;
            break;
        case "shedding":
            filters.shedding = value;
            break;
        case "goodWithKids":
            filters.goodWithKids = value;
            break;
        case "size":
            filters.size = value;
            break;
        case "groomingRequirements":
            filters.groomingRequirements = value;
            break;
        case "goodWithPets":
            filters.goodWithPets = value;
            break;
        case "intelligence":
            filters.intelligence = value;
            break;
        case "trainability":
            filters.trainability = value;
            break;
        case "barking":
            filters.barking = value;
            break;
        case "health":
            filters.health = value;
            break;
        case "lifespan":
            filters.lifespan = value;
            break;
        case "weather":
            filters.weather = value;
            break;
        case "dependance":
            filters.dependance = value;
            break;
        default:
            // Optionally handle other cases or do nothing
            break;

    }

    // Filtra los perros según las respuestas acumuladas
    filterDogs();

    currentQuestionIndex++;
    if(numberOfDogsLeft<=0)
    {
        document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
        document.getElementById('restart-button').style.display = 'inline'; // Muestra el botón de reinicio
        document.getElementById('ups-message').style.display = 'inline'; // Muestra el mensage final         
    }
    else
    {
        if (numberOfDogsLeft>5 && currentQuestionIndex < questions.length) 
            {
                loadQuestion(); // Carga la siguiente pregunta
            } 
        else {
                document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
                document.getElementById('restart-button').style.display = 'inline'; // Muestra el botón de reinicio
                document.getElementById('end-message').style.display = 'inline'; // Muestra el mensage final
            }
    }

}

function setInitState()
{
    const userLang = (navigator.languages && navigator.languages.length > 0) 
    ? navigator.languages[0] 
    : (navigator.language || navigator.userLanguage || 'en');
    
    console.log(`User's country inferred from language: ${userLang}`);

    // If userLang is still undefined or empty, fall back to 'en'
    if (!userLang) {
        userLang = 'en'; // Default to 'en' if no language is detected
    }

    currentQuestionIndex = 0

    // set initial Language
    if (selectedLang == "")
    {
        if (userLang.startsWith('es')) 
            {
                setLanguage('es');
            } 
        else if (userLang.startsWith('en')) 
            {
                setLanguage('en');
            }
        else
            {
                setLanguage('en')
            }
        }
    
    // set initial country
    if (userLang.startsWith('es-ES')) 
        {
            setaffiliatedLinks('es_ES');
        } 
    else if (userLang.startsWith('en-US')) 
        {
            setaffiliatedLinks('en_US');
        }
    else
        {
            setaffiliatedLinks('en_US')
        }

    // Elements to be shown at the start
    document.getElementById('start-message').style.display = 'inline';
    document.getElementById('start-button').style.display = 'inline';
    document.getElementById('questions-panel').style.display = 'inline';

    // Elements to be hidden at the start
    document.getElementById('quizz-question').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('end-message').style.display = 'none';
    document.getElementById('ups-message').style.display = 'none';

    let quizzAnswers = document.querySelectorAll('#questions-panel button');
    quizzAnswers.forEach(answer => {answer.style.display = 'none';});


}

function startQuizz()
{
    document.getElementById('quizz-question').style.display = 'inline';
    document.getElementById('quizz-answer').style.display = 'inline';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-message').style.display = 'none';
    loadQuestion()
}

function setDogCards() {
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dogImage = card.querySelector('.dog-image');
        const dogNameElement = card.querySelector('.dog-name');
        const dogDescriptionElement = card.querySelector('.dog-description');

        const dog = dogBreeds.find(dog => dog.name === dogName);

        dogNameElement.innerHTML = `<strong>${dog.name}</strong>`;
        if(dogDescriptionElement.textContent !== "")
        {
            dogDescriptionElement.textContent =  dog[selectedLang].text;
        }
        dogImage.src = dog.image;
    });
}

function setaffiliatedLinks(countryCode) {
    const dogCards = document.querySelectorAll('.dog-card');
    selectedCountry = countryCode;
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dogaffiliatedLink = card.querySelector('.dog-affiliatedLink');
        const dog = dogBreeds.find(dog => dog.name === dogName);

        if(dogaffiliatedLink.textContent !== "")
        {
            dogaffiliatedLink.textContent =  dog[countryCode].textLink;
        }
        if(dogaffiliatedLink.href !== "")
            {
                dogaffiliatedLink.href =  dog[countryCode].affiliatedLink;
            }
    });
}

function filterDogs() {
    const dogCards = document.querySelectorAll('.dog-card');
    numberOfDogsLeft = dogBreeds.length
    console.log(numberOfDogsLeft); 
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dog = dogBreeds.find(dog => dog.name === dogName);

        let matches = true;

        // Verifica los filtros acumulados
        if (filters.spaceNeeded && dog.spaceNeeded > filters.spaceNeeded) {
            matches = false;
        }
        if (filters.energy && dog.energy > filters.energy) {
            matches = false;
        }
        if (filters.shedding && dog.shedding > filters.shedding) {
            matches = false;
        }
        if (filters.goodWithKids && dog.goodWithKids < filters.goodWithKids) {
            matches = false;
        }
        if (filters.size && dog.size > filters.size) {
            matches = false;
        }
        if (filters.groomingRequirements && dog.groomingRequirements > filters.groomingRequirements) {
            matches = false;
        }
        if (filters.goodWithPets && dog.goodWithPets < filters.goodWithPets) {
            matches = false;
        }
        if (filters.intelligence && dog.intelligence < filters.intelligence) {
            matches = false;
        }
        if (filters.trainability && dog.trainability < filters.trainability) {
            matches = false;
        }
        if (filters.barking && dog.barking > filters.barking) {
            matches = false;
        }
        if (filters.health && dog.health < filters.health) {
            matches = false;
        }
        if (filters.lifespan && dog.lifespan !== filters.lifespan) {
            matches = false;
        }
        if (filters.weather && dog.weather !== filters.weather) {
            matches = false;
        }
        if (filters.dependance && dog.dependance > filters.dependance) {
            matches = false;
        }

        if (matches)
        {
            card.classList.remove('hidden'); // Show matching dogs
            card.classList.remove('fade-out'); // Ensure the fade-out class is removed
            card.style.display = 'block'; // Ensure it is displayed
            //card.style.transform = 'translateY(0)';
        }
        else
        {
            numberOfDogsLeft--;
            card.classList.add('fade-out');
            console.log(`Added 'fade-out' to ${dog.name}`);
            setTimeout(() => {
                card.style.display = 'none'; // Hide after fading out               
                card.classList.add('hidden');
            }, 500); // Match this timeout with the CSS transition duration   
        }
    });
    console.log(numberOfDogsLeft); 
}

function resetFilters() {
    // Clear all the filters
    filters.size = null;
    filters.groomingRequirements = null;
    filters.goodWithPets = null;
    filters.intelligence = null;
    filters.trainability = null;
    filters.barking = null;
    filters.health = null;
    filters.lifespan = null;
    filters.weather = null;
    filters.dependance = null;
    filters.spaceNeeded = null;
    filters.energy = null;
    filters.shedding = null;
    filters.goodWithKids = null;

    const dogCards = document.querySelectorAll('.dog-card');
    filterDogs();
}

function restartQuiz() {
    // location.reload();
    setInitState();
    resetFilters();
}

function setLanguage(lang) 
    {
        // Optionally, update the lang attribute of the document
        document.documentElement.lang = lang;
        selectedLang = lang;

        const titleElement = document.getElementById('title');
        const startButtonElement = document.getElementById('start-button');
        const restartButtonElement = document.getElementById('restart-button');
        const startmessageElement = document.getElementById('start-message');
        const endmessageElement = document.getElementById('end-message');
        const upsmessageElement = document.getElementById('ups-message');
        
        // Update the title and description based on the selected language
        titleElement.textContent = content[selectedLang].title;
        startButtonElement.textContent = content[selectedLang].start_button;
        restartButtonElement.textContent = content[selectedLang].restart_button;
        startmessageElement.textContent = content[selectedLang].start_message;
        endmessageElement.textContent = content[selectedLang].end_message;
        upsmessageElement.textContent = content[selectedLang].ups_message;

        changeQuestionsPanelLanguage()
        setDogCards()
}

function toggleCard(card) {
    // If there is a last clicked card, reset it
    if (!lastClickedCard)
    {
        // Create a duplicate of the clicked card
        duplicatedCard = card.cloneNode(true);
        duplicatedCard.classList.add('clicked');
        duplicatedCard.querySelector('.close-btn').style.display = 'block'; // Show close button
        document.body.appendChild(duplicatedCard);    // Append the duplicated card to the body

        const dogName = card.getAttribute('data-name');
        const dog = dogBreeds.find(dog => dog.name === dogName);
        duplicatedCard.querySelector('.dog-description').textContent = dog[selectedLang].text;
        duplicatedCard.querySelector('.dog-affiliatedLink').textContent = dog[selectedCountry].textLink;
        duplicatedCard.querySelector('.dog-affiliatedLink').href = dog[selectedCountry].affiliatedLink;

        // Update the last clicked card
        lastClickedCard = duplicatedCard;
    }
    else(lastClickedCard !== card)
    {
        closeCard(null, lastClickedCard); // Close the previous card
        
        // Create a duplicate of the clicked card
        duplicatedCard = card.cloneNode(true);
        duplicatedCard.classList.add('clicked');
        duplicatedCard.querySelector('.close-btn').style.display = 'block'; // Show close button
        document.body.appendChild(duplicatedCard);    // Append the duplicated card to the body

        const dogName = card.getAttribute('data-name');
        const dog = dogBreeds.find(dog => dog.name === dogName);
        duplicatedCard.querySelector('.dog-description').textContent = dog[selectedLang].text;
        duplicatedCard.querySelector('.dog-affiliatedLink').textContent = dog[selectedCountry].textLink;
        duplicatedCard.querySelector('.dog-affiliatedLink').href = dog[selectedCountry].affiliatedLink;

        // Update the last clicked card
        lastClickedCard = duplicatedCard;
    }

}

function closeCard(event, card) {
    if (event) event.stopPropagation(); // Prevent the click event from bubbling up
    card.classList.remove('clicked'); // Remove the 'clicked' class to reset the card
    
    // Remove the duplicated card from the body
    if (duplicatedCard) {
        document.body.removeChild(duplicatedCard);
        duplicatedCard = null; // Reset duplicated card
    }

    // Reset the last clicked card reference if it's the one being closed
    if (lastClickedCard === card) {
        lastClickedCard = null;
    }
}
