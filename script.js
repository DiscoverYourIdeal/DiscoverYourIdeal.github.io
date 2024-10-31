let currentQuestionIndex = 0;
let numberOfDogsLeft = 133;
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
      title: 'Descubre tu perro ideal',
      start_button: 'Empieza el Quizz',
      restart_button: 'Volver',
      start_message: "Responde preguntas sobre tus gustos y tu estilo de vida y descubre a tu perro ideal!",
      end_message: "¡Buen Trabajo! ¡Esta es la selección de perros ideales para ti!",
      ups_message: "Ups! Parece que no hay perros que se adapten a tus gustos y estilo de vida! Vuelve a probar!"
    },
    en: {
      title: 'Discover Your Ideal Dog Breed',
      start_button: 'Start the Quizz',
      restart_button: 'Return',
      start_message: "Aswer questions about your interests and lifestyle and discover your ideal dog!",
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "Los Huskies Siberianos son perros de tamaño mediano conocidos por su naturaleza amigable y extrovertida y sus llamativos ojos azules o de varios colores. Criados originalmente como perros de trineo, son fuertes, enérgicos e independientes. Los Huskies tienen un denso pelaje doble, orejas triangulares y necesitan ejercicio regular. Prosperan en familias activas y tienden a ser vocales, aullando en lugar de ladrar.", textLink: "Mira este producto!" },
        en: { text: "Siberian Huskies are medium-sized dogs known for their friendly, outgoing nature and striking blue or multi-colored eyes. Originally bred as sled dogs, they are strong, energetic, and independent. Huskies have a thick double coat, triangular ears, and require regular exercise. They thrive in active families and tend to be vocal, howling rather than barking.", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Giant_Schnauzer.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Glen_of_Imaal_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Goldendoodle.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Great_Dane.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Great_Pyrenees.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Greater_Swiss_Mountain_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Harrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Havanese.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Irish_Setter.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Irish_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Irish_Water_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Italian_Greyhound.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Jack_Russell_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Japanese_Chin.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Keeshond.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Lagotto_Romagnolo.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Lakeland_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Lhasa_Apso.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Maltese.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Manchester_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Mastiff.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Miniature_Bull_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Miniature_Schnauzer.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Newfoundland.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Norfolk_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Norwegian_Buhund.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Norwegian_Elkhound.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Old_English_Sheepdog.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Papillon.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Pekingese.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Pembroke_Welsh_Corgi.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Pointer.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Polish_Lowland_Sheepdog.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Portuguese_Water_Dog.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Saint_Bernard.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Saluki.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Samoyed.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Schipperke.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Scottish_Deerhound.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Scottish_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Sealyham_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Shetland_Sheepdog.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Shiba_Inu.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Staffordshire_Bull_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Standard_Schnauzer.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Tibetan_Mastiff.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Tibetan_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Tibetan_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Vizsla.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Weimaraner.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Welsh_Springer_Spaniel.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Welsh_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/West_Highland_White_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Whippet.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Wire_Fox_Terrier.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        image: "assets/css/images/Wirehaired_Pointing_Griffon.webp",
        es_ES: { affiliatedLink: "es_ES link"},
        en_US: { affiliatedLink: "en_US link"},
        es: { text: "", textLink: "Mira este producto!" },
        en: { text: "", textLink: "Check out this product!" }
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
        const dogaffiliatedLink = card.querySelector('.dog-affiliatedLink');

        const dog = dogBreeds.find(dog => dog.name === dogName);

        dogNameElement.innerHTML = `<strong>${dog.name}</strong>`;
        if(dogDescriptionElement.textContent !== "")
            {
            dogDescriptionElement.textContent =  dog[selectedLang].text;
            }
        if(dogaffiliatedLink.textContent !== "")
            {
                dogaffiliatedLink.textContent =  dog[selectedLang].textLink;
            }
        if(dogaffiliatedLink.href !== "")
            {
                dogaffiliatedLink.href =  dog[selectedCountry].affiliatedLink;
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
            dogaffiliatedLink.textContent =  dog[selectedLang].textLink;
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
        duplicatedCard.querySelector('.dog-affiliatedLink').textContent = dog[selectedLang].textLink;
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
        duplicatedCard.querySelector('.dog-affiliatedLink').textContent = dog[selectedLang].textLink;
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
