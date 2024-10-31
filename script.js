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
        es: { text: "Los Poodles vienen en tres tamaños: estándar, miniatura y toy. Son muy inteligentes y fáciles de entrenar, conocidos por su pelaje rizado hipoalergénico. Se destacan en obediencia y agilidad, lo que los convierte en compañeros versátiles. Los Poodles son amigables, juguetones y buenos con los niños. Requieren un aseo regular y estimulación mental para mantenerse felices.", textLink: "Mira este producto!" },
        en: { text: "Poodles come in three sizes: standard, miniature, and toy. Highly intelligent and trainable, they are known for their hypoallergenic curly coat. They excel in obedience and agility, making them versatile companions. Poodles are friendly, playful, and good with children. They require regular grooming and mental stimulation to stay happy.", textLink: "Check out this product!" }
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
        es: { text: "Los Affenpinscher son perros pequeños y robustos conocidos por su expresión de mono y su personalidad juguetona. Son alertas, curiosos y seguros, lo que los convierte en excelentes perros guardianes a pesar de su pequeño tamaño. Su pelaje áspero y alambre necesita un aseo regular. Los Affenpinscher son inteligentes y leales, siendo excelentes compañeros para hogares activos.", textLink: "Mira este producto!" },
        en: { text: "Affenpinschers are small, sturdy dogs known for their monkey-like expressions and playful personality. They are alert, curious, and confident, making them excellent watchdogs despite their small size. Their rough, wiry coat needs regular grooming. Affenpinschers are intelligent and loyal, making them great companions in active households.", textLink: "Check out this product!" }
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
        es: { text: "Los Akita son perros grandes y poderosos conocidos por su lealtad y comportamiento digno. Criados originalmente en Japón para la caza y la guardia, tienen una naturaleza protectora y son más adecuados para dueños de perros experimentados. Los Akita son independientes pero cariñosos con sus familias. Su grueso pelaje doble requiere cepillado regular.", textLink: "Mira este producto!" },
        en: { text: "Akitas are large, powerful dogs known for their loyalty and dignified demeanor. Originally bred in Japan for hunting and guarding, they have a protective nature and are best suited for experienced dog owners. Akitas are independent but affectionate with their families. Their thick double coat requires regular brushing.", textLink: "Check out this product!" }
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
        es: { text: "Los Alaskan Malamute son perros grandes y fuertes con apariencia de lobo y una estructura poderosa. Criados originalmente para transportar cargas pesadas, son trabajadores, leales y amigables. Estos perros tienen un pelaje denso y doble que requiere un aseo regular. Los Malamutes son sociables y disfrutan de la compañía, aunque pueden ser independientes y necesitan un entrenamiento constante.", textLink: "Mira este producto!" },
        en: { text: "Alaskan Malamutes are large, strong dogs with a wolf-like appearance and powerful build. Originally bred to haul heavy loads, they are hardworking, loyal, and friendly. These dogs have a thick, double coat that requires regular grooming. Malamutes are social and enjoy being with people but can be independent and require consistent training.", textLink: "Check out this product!" }
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
        es: { text: "El Bulldog Americano es una raza musculosa y robusta con un comportamiento confiado y alerta. Son cariñosos y protectores con sus familias, lo que los convierte en excelentes perros guardianes. Originalmente utilizados como perros de trabajo en granjas, son atléticos y disfrutan de las actividades físicas. Requieren un entrenamiento firme y socialización desde temprana edad.", textLink: "Mira este producto!" },
        en: { text: "The American Bulldog is a muscular, stocky breed with a confident, alert demeanor. They are affectionate and protective towards their families, making them excellent guard dogs. Originally used as working dogs on farms, they are athletic and enjoy physical activities. They require firm training and socialization from a young age.", textLink: "Check out this product!" }
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
        es: { text: "Los American Pit Bull Terrier son perros de tamaño mediano y musculosos, conocidos por su fuerza y agilidad. Son amigables, cariñosos y leales con sus familias, pero requieren entrenamiento y socialización constante debido a su estructura poderosa. Los Pit Bull tienen un pelaje corto fácil de mantener y vienen en varios colores.", textLink: "Mira este producto!" },
        en: { text: "American Pit Bull Terriers are medium-sized, muscular dogs known for their strength and agility. They are friendly, loving, and loyal with their families but require consistent training and socialization due to their powerful build. Pit Bulls have a short coat that is easy to maintain and come in various colors.", textLink: "Check out this product!" }
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
        es: { text: "Los Perros Pastor de Anatolia son grandes y fuertes, criados originalmente para proteger el ganado. Son independientes, inteligentes y poseen un fuerte instinto protector, lo que los convierte en excelentes perros guardianes. Estos perros son devotos de sus familias pero pueden ser reservados con los extraños. Tienen un pelaje grueso y doble que necesita cepillado regular.", textLink: "Mira este producto!" },
        en: { text: "Anatolian Shepherds are large, strong dogs originally bred to guard livestock. They are independent, intelligent, and possess a strong protective instinct, making them excellent guard dogs. These dogs are devoted to their families but can be wary of strangers. They have a thick double coat that needs regular brushing.", textLink: "Check out this product!" }
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
        es: { text: "Los Perros Boyeros Australianos son perros de tamaño mediano y robustos, conocidos por su inteligencia, agilidad y ética de trabajo. Criados para pastorear ganado, son enérgicos, leales y protectores. Son excelentes compañeros para familias activas y requieren mucha estimulación mental y física para ser felices. Su pelaje corto es fácil de mantener.", textLink: "Mira este producto!" },
        en: { text: "Australian Cattle Dogs are medium-sized, sturdy dogs known for their intelligence, agility, and work ethic. Bred for herding cattle, they are energetic, loyal, and protective. They are great companions for active families and require plenty of mental and physical stimulation to be happy. Their short coat is easy to maintain.", textLink: "Check out this product!" }
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
        es: { text: "Los Pastores Australianos son perros de tamaño mediano e inteligentes con un fuerte instinto de pastoreo. Son muy enérgicos y se destacan en deportes caninos como la agilidad y la obediencia. Conocidos por su lealtad y naturaleza afectuosa, los Aussies crean un fuerte vínculo con sus familias. Su pelaje necesita cepillado regular para evitar enredos.", textLink: "Mira este producto!" },
        en: { text: "Australian Shepherds are medium-sized, intelligent dogs with a strong herding instinct. They are highly energetic and excel in dog sports such as agility and obedience. Known for their loyalty and affectionate nature, Aussies bond closely with their families. Their coat needs regular brushing to avoid tangles.", textLink: "Check out this product!" }
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
        es: { text: "El Basenji es un perro pequeño y elegante conocido por su independencia e inteligencia. Originario de África, es famoso por no ladrar, aunque emite sonidos únicos parecidos a un yodel. Son perros limpios, de bajo desprendimiento, con un pelaje suave y cola rizada. Los Basenji son alertas, curiosos y necesitan un entrenamiento constante. Son ideales para familias activas, pero requieren estimulación mental y ejercicio.", textLink: "Mira este producto!" },
        en: { text: "The Basenji is a small, sleek dog known for its independence and intelligence. Originating from Africa, they are famous for being 'barkless' but can vocalize with unique yodel-like sounds. They are clean, low-shedding dogs with a smooth coat and curly tail. Basenjis are alert, curious, and require consistent training. They are great for active families but need mental stimulation and exercise.", textLink: "Check out this product!" }
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
        es: { text: "El Basset Hound es una raza distintiva con orejas largas y patas cortas. Conocidos por su excelente sentido del olfato, fueron criados originalmente para la caza. Los Basset son amigables, tranquilos y excelentes compañeros para las familias. Son leales y gentiles, aunque a veces pueden ser testarudos. Tienen un pelaje corto, pero necesitan un aseo regular para mantener sus largas orejas limpias.", textLink: "Mira este producto!" },
        en: { text: "The Basset Hound is a distinctive breed with long ears and short legs. Known for their excellent sense of smell, they were originally bred for hunting. Bassets are friendly, laid-back, and make great companions for families. They are loyal and gentle but can be stubborn at times. Their coat is short, but regular grooming is needed to keep their long ears clean.", textLink: "Check out this product!" }
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
        es: { text: "Los Beagles son perros pequeños y robustos con un agudo sentido del olfato y una disposición amigable. Son curiosos, extrovertidos y excelentes con los niños. Criados originalmente como sabuesos, los Beagle son conocidos por su persistencia en seguir olores. Son sociables, adaptables y disfrutan de ser parte de una familia. El ejercicio regular es necesario para manejar sus niveles de energía.", textLink: "Mira este producto!" },
        en: { text: "Beagles are small, sturdy dogs with a keen sense of smell and a friendly demeanor. They are curious, outgoing, and great with children. Originally bred as scent hounds, Beagles are known for their persistence in following scents. They are social, adaptable, and enjoy being part of a family. Regular exercise is necessary to manage their energy levels.", textLink: "Check out this product!" }
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
        es: { text: "Los Bearded Collie son perros de tamaño mediano y enérgicos con una personalidad vivaz y afectuosa. Conocidos por su largo y fluido pelaje y sus ojos expresivos, son inteligentes y ágiles. Criados originalmente para pastoreo, destacan en deportes y actividades caninas. Los Beardies son juguetones, sociables y forman lazos fuertes con sus familias. El aseo regular es necesario para mantener su pelaje.", textLink: "Mira este producto!" },
        en: { text: "Bearded Collies are medium-sized, energetic dogs with a lively and affectionate personality. Known for their long, flowing coat and expressive eyes, they are intelligent and agile. Originally bred for herding, they excel in dog sports and activities. Beardies are playful, sociable, and form strong bonds with their families. Regular grooming is necessary to maintain their coat.", textLink: "Check out this product!" }
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
        es: { text: "El Malinois Belga es una raza de perro enérgica, inteligente y altamente entrenable. Criados originalmente para pastoreo, ahora se usan con frecuencia en roles policiales y militares debido a su fuerte ética de trabajo y agilidad. Los Malinois son leales, protectores y excelentes en tareas que requieren velocidad y precisión. Forman fuertes lazos con sus familias, pero necesitan estimulación mental y física constante. Su pelaje corto es fácil de mantener.", textLink: "Mira este producto!" },
        en: { text: "The Belgian Malinois is an energetic, intelligent, and highly trainable dog breed. Originally bred for herding, they are now often used in police and military roles due to their strong work ethic and agility. Malinois are loyal, protective, and excellent at tasks requiring speed and precision. They bond closely with their families but need consistent mental and physical stimulation. Their short coat is easy to maintain.", textLink: "Check out this product!" }
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
        es: { text: "El Bichon Frise es un perro pequeño y alegre, conocido por su pelaje blanco y esponjoso y su naturaleza juguetona. Son amigables, cariñosos y se llevan bien con niños y otras mascotas. Los Bichones son inteligentes y responden bien a métodos de entrenamiento positivos. Requieren un aseo regular para mantener su pelaje en buen estado. Debido a su personalidad vivaz, son excelentes perros de compañía para familias e individuos por igual.", textLink: "Mira este producto!" },
        en: { text: "The Bichon Frise is a small, cheerful dog known for its fluffy white coat and playful nature. They are friendly, affectionate, and get along well with children and other pets. Bichons are intelligent and respond well to positive training methods. They require regular grooming to keep their coat in good condition. Due to their lively personality, they make excellent companion dogs for families and individuals alike.", textLink: "Check out this product!" }
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
        es: { text: "El Border Collie es un perro pastor de tamaño mediano y altamente inteligente. Conocidos por su enfoque intenso y energía, destacan en deportes caninos y entrenamientos de obediencia. Los Border Collie son extremadamente entrenables y prosperan en hogares activos donde pueden usar sus habilidades mentales y físicas. Requieren mucho ejercicio y desafíos mentales para evitar el aburrimiento. Su doble capa necesita cepillado regular para mantenerse en buen estado.", textLink: "Mira este producto!" },
        en: { text: "The Border Collie is a medium-sized, highly intelligent herding dog. Known for their intense focus and energy, they excel in dog sports and obedience training. Border Collies are extremely trainable and thrive in active households where they can use their mental and physical abilities. They require plenty of exercise and mental challenges to prevent boredom. Their double coat needs regular brushing to stay in good shape.", textLink: "Check out this product!" }
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
        es: { text: "El Boston Terrier es una raza de perro pequeña y animada, con un patrón de pelaje que se asemeja a un esmoquin. Son amigables, inteligentes y adaptables, lo que los convierte en excelentes mascotas familiares. Los Boston Terriers son cariñosos, ganándose a menudo el apodo de 'El caballero americano'. Son relativamente fáciles de entrenar y disfrutan de ser parte de las actividades familiares. Su pelaje corto es de bajo mantenimiento, y prosperan tanto en entornos urbanos como suburbanos.", textLink: "Mira este producto!" },
        en: { text: "The Boston Terrier is a small, lively dog breed with a tuxedo-like coat pattern. They are friendly, intelligent, and adaptable, making them great family pets. Boston Terriers are affectionate, often earning them the nickname 'The American Gentleman.' They are relatively easy to train and enjoy being part of family activities. Their short coat is low-maintenance, and they thrive in both city and suburban environments.", textLink: "Check out this product!" }
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
        es: { text: "Los Boxers son perros de tamaño mediano y musculosos, conocidos por su naturaleza juguetona y protectora. Son leales, enérgicos y disfrutan de estar cerca de sus familias. Los Boxers son inteligentes y responden bien a un entrenamiento constante. Son naturalmente protectores, lo que los convierte en buenos perros guardianes, pero también son cariñosos y excelentes con los niños. Su pelaje corto requiere un mínimo mantenimiento.", textLink: "Mira este producto!" },
        en: { text: "Boxers are medium-sized, muscular dogs known for their playful and protective nature. They are loyal, energetic, and enjoy being around their families. Boxers are intelligent and respond well to consistent training. They are naturally protective, making them good guard dogs, but they are also affectionate and great with children. Their short coat requires minimal grooming.", textLink: "Check out this product!" }
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
        es: { text: "El Spaniel Bretón es una raza de perro atlética, enérgica y versátil, criada originalmente para la caza. Son amigables, alertas y ansiosos por complacer, lo que los convierte en excelentes compañeros y socios de caza. Los Brittanys tienen un agudo sentido del olfato y un fuerte deseo de trabajar. Son conocidos por su agilidad e inteligencia, requiriendo tanto ejercicio físico como estimulación mental. Su pelaje es relativamente fácil de mantener y generalmente son buenos con niños y otros perros.", textLink: "Mira este producto!" },
        en: { text: "The Brittany Spaniel is an athletic, energetic, and versatile dog breed, originally bred for hunting. They are friendly, alert, and eager to please, making them excellent companions and hunting partners. Brittanys have a keen sense of smell and a strong desire to work. They are known for their agility and intelligence, requiring both physical exercise and mental stimulation. Their coat is relatively easy to maintain and they are generally good with children and other dogs.", textLink: "Check out this product!" }
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
        es: { text: "El Cairn Terrier es una raza de perro pequeña y tenaz, conocida por su personalidad vivaz y naturaleza intrépida. Criados originalmente para cazar pequeñas presas, son alertas, inteligentes y curiosos. Los Cairn Terrier son independientes pero cariñosos, formando fuertes lazos con sus familias. Son altamente adaptables y se desenvuelven bien tanto en entornos urbanos como rurales. Su pelaje resistente a la intemperie requiere un cuidado regular.", textLink: "Mira este producto!" },
        en: { text: "The Cairn Terrier is a small, tenacious dog breed known for its lively personality and fearless nature. Originally bred for hunting small game, they are alert, intelligent, and curious. Cairn Terriers are independent yet affectionate, forming strong bonds with their families. They are highly adaptable and do well in both urban and rural environments. Their weather-resistant coat requires regular grooming.", textLink: "Check out this product!" }
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
        es: { text: "El Cavalier King Charles Spaniel es una raza de perro pequeña y elegante, conocida por su temperamento dulce y cariñoso. Son amigables, juguetones y se llevan bien con los niños y otras mascotas. Los Cavaliers son inteligentes y ansiosos por complacer, lo que los hace relativamente fáciles de entrenar. Disfrutan estar con sus familias y son adecuados para vivir en apartamentos. Se necesita un aseo regular para mantener su pelaje sedoso.", textLink: "Mira este producto!" },
        en: { text: "The Cavalier King Charles Spaniel is a small, elegant dog breed known for its gentle and affectionate temperament. They are friendly, playful, and get along well with children and other pets. Cavaliers are intelligent and eager to please, making them relatively easy to train. They enjoy being with their families and are well-suited for apartment living. Regular grooming is needed to maintain their silky coat.", textLink: "Check out this product!" }
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
        es: { text: "El Chihuahua es una raza de perro pequeña y segura de sí misma, conocida por su personalidad audaz y vivaz. A pesar de su pequeño tamaño, son intrépidos y alertas, lo que los convierte en buenos perros guardianes. Los Chihuahuas son leales y forman fuertes lazos con sus dueños. Son adaptables a varios entornos de vida, incluidos los apartamentos. Los Chihuahuas vienen en variedades de pelo corto y largo y requieren poco mantenimiento.", textLink: "Mira este producto!" },
        en: { text: "The Chihuahua is a small and confident dog breed known for its bold and lively personality. Despite their tiny size, they are fearless and alert, making them good watchdogs. Chihuahuas are loyal and form strong attachments to their owners. They are adaptable to various living environments, including apartments. Chihuahuas come in both short-haired and long-haired varieties and require minimal grooming.", textLink: "Check out this product!" }
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
        es: { text: "El Shar-Pei Chino es una raza de perro distintiva, conocida por su piel arrugada y lengua azul-negra. Son independientes, tranquilos y algo reservados con los extraños. Los Shar-Pei son leales y protectores con sus familias, lo que los convierte en buenos perros guardianes. Requieren entrenamiento y socialización constantes desde una edad temprana para manejar su tendencia a ser obstinados. Su pelaje corto es de bajo mantenimiento, pero necesita atención para mantener la piel sana.", textLink: "Mira este producto!" },
        en: { text: "The Chinese Shar-Pei is a distinctive dog breed known for its wrinkled skin and blue-black tongue. They are independent, calm, and somewhat reserved with strangers. Shar-Peis are loyal and protective of their families, making them good watchdogs. They require consistent training and socialization from an early age to manage their stubborn tendencies. Their short coat is relatively low-maintenance but needs attention to keep their skin healthy.", textLink: "Check out this product!" }
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
        es: { text: "El Chow Chow es una raza de perro digna y distante con una apariencia distintiva, caracterizada por un denso doble pelaje y una lengua azul-negra única. Son independientes, leales y reservados con los extraños, pero afectuosos con sus familias. Los Chow Chows son conocidos por su carácter fuerte y protector. Requieren un entrenamiento constante y una socialización temprana para asegurar un buen comportamiento. El aseo regular es esencial para mantener su espeso pelaje.", textLink: "Mira este producto!" },
        en: { text: "The Chow Chow is a dignified and aloof dog breed with a distinctive appearance, marked by a dense double coat and a unique blue-black tongue. They are independent, loyal, and reserved around strangers but affectionate with their families. Chow Chows are known for their strong-willed and protective nature. They require consistent training and early socialization to ensure they are well-behaved. Regular grooming is essential to maintain their thick coat.", textLink: "Check out this product!" }
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
        es: { text: "El Cocker Spaniel es una raza alegre y cariñosa, reconocida por su hermoso y fluido pelaje y sus ojos expresivos. Son conocidos por su naturaleza amigable y juguetona, llevándose bien con niños y otras mascotas. Los Cockers son inteligentes y ansiosos por complacer, lo que los hace relativamente fáciles de entrenar. Disfrutan de actividades físicas y requieren ejercicio regular. Su pelaje necesita un aseo frecuente para mantenerse en su mejor forma.", textLink: "Mira este producto!" },
        en: { text: "The Cocker Spaniel is a cheerful and affectionate breed, recognized for its beautiful, flowing coat and expressive eyes. They are known for their friendly and playful nature, getting along well with children and other pets. Cockers are intelligent and eager to please, making them relatively easy to train. They enjoy physical activities and require regular exercise. Their coat needs frequent grooming to keep it looking its best.", textLink: "Check out this product!" }
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
        es: { text: "El Dachshund, también conocido como 'perro salchicha', es una raza pequeña con cuerpo alargado y patas cortas. Fueron criados originalmente para la caza de pequeñas presas, y su naturaleza valiente y vivaz refleja esta herencia. Los Dachshunds son conocidos por ser leales y protectores, formando a menudo fuertes lazos con sus dueños. Son inteligentes y pueden ser tercos, requiriendo un entrenamiento constante. Los Dachshunds vienen en tres variedades de pelaje: liso, de pelo duro y de pelo largo.", textLink: "Mira este producto!" },
        en: { text: "The Dachshund, also known as the 'wiener dog', is a small, long-bodied breed with short legs. They were originally bred for hunting small game, and their courageous and lively nature reflects this heritage. Dachshunds are known for being loyal and protective, often forming strong bonds with their owners. They are intelligent and can be stubborn, requiring consistent training. Dachshunds come in three coat varieties: smooth, wirehaired, and longhaired.", textLink: "Check out this product!" }
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
        es: { text: "El Dálmata es una raza distintiva y enérgica, famosa por sus manchas negras o hígado sobre un pelaje blanco. Originalmente utilizados como perros de carruaje, los Dálmatas son conocidos por su atletismo y resistencia. Son amigables, extrovertidos y leales, siendo excelentes compañeros para familias activas. Los Dálmatas son inteligentes y tienen un fuerte deseo de complacer, pero requieren socialización temprana y un entrenamiento constante. Necesitan ejercicio regular para canalizar su energía de manera positiva.", textLink: "Mira este producto!" },
        en: { text: "The Dalmatian is a distinctive and energetic breed, famous for its unique black or liver spots on a white coat. Originally used as carriage dogs, Dalmatians are known for their athleticism and endurance. They are friendly, outgoing, and loyal, making great companions for active families. Dalmatians are intelligent and have a strong desire to please but require early socialization and consistent training. They need regular exercise to channel their energy positively.", textLink: "Check out this product!" }
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
        es: { text: "El Doberman Pinscher es una raza de perro elegante, poderosa e inteligente, conocida por su lealtad y naturaleza protectora. Criados originalmente para el trabajo de protección, los Dobermans son alertas, valientes y altamente entrenables. Forman fuertes lazos con sus familias y suelen ser gentiles y cariñosos con aquellos que conocen. Los Dobermans requieren una socialización temprana y un entrenamiento constante para convertirse en compañeros bien educados. Necesitan ejercicio regular para mantenerse estimulados mental y físicamente.", textLink: "Mira este producto!" },
        en: { text: "The Doberman Pinscher is a sleek, powerful, and intelligent dog breed known for its loyalty and protective nature. Originally bred for protection work, Dobermans are alert, fearless, and highly trainable. They form strong bonds with their families and are often gentle and affectionate with those they know. Dobermans require early socialization and consistent training to become well-mannered companions. Regular exercise is necessary to keep them both mentally and physically stimulated.", textLink: "Check out this product!" }
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
        es: { text: "El Bulldog Inglés es una raza de tamaño mediano y musculosa, conocida por su distintivo rostro arrugado y su nariz chata. A pesar de su apariencia dura, son gentiles y amorosos, siendo maravillosos compañeros. Los Bulldogs son conocidos por su temperamento tranquilo y son especialmente buenos con los niños. Requieren poco ejercicio, pero necesitan un aseo regular para mantener la salud de su pelaje y piel. Su nariz corta los hace sensibles al calor, por lo que deben ser monitoreados en climas cálidos.", textLink: "Mira este producto!" },
        en: { text: "The English Bulldog is a medium-sized, muscular breed known for its distinctive wrinkled face and pushed-in nose. Despite their tough appearance, they are gentle and loving, making them wonderful companions. Bulldogs are known for their calm demeanor and are particularly good with children. They require minimal exercise but do need regular grooming to maintain their coat and skin health. Their short nose means they are sensitive to heat and should be monitored in warm weather.", textLink: "Check out this product!" }
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
        es: { text: "El Springer Spaniel Inglés es una raza vivaz de tamaño mediano, conocida por su energía inagotable y su carácter amistoso. Criados originalmente como perros de caza, los Springers son inteligentes y versátiles, destacando en diversas actividades, como el trabajo de campo y deportes de agilidad. Son afectuosos, ansiosos por complacer y se llevan bien con los niños y otras mascotas. Los Springers Ingleses tienen un hermoso doble pelaje que requiere un aseo regular.", textLink: "Mira este producto!" },
        en: { text: "The English Springer Spaniel is a lively, medium-sized breed known for its boundless energy and friendly demeanor. Originally bred as hunting dogs, Springers are intelligent and versatile, excelling in various activities, including fieldwork and agility sports. They are affectionate, eager to please, and get along well with children and other pets. English Springers have a beautiful double coat that requires regular grooming.", textLink: "Check out this product!" }
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
        es: { text: "El Bulldog Francés es una raza pequeña y musculosa, conocida por sus orejas de murciélago y su personalidad amigable y adaptable. Son juguetones, cariñosos y les encanta la compañía humana, lo que los hace ideales para apartamentos. Los Bulldogs Franceses tienen un pelaje corto y fácil de mantener, y su nivel de energía moderado significa que no requieren mucho ejercicio. Son buenos con los niños y otras mascotas. Sin embargo, debido a sus caras planas, son sensibles al calor y deben ser monitoreados en climas cálidos.", textLink: "Mira este producto!" },
        en: { text: "The French Bulldog is a small, muscular breed known for its bat-like ears and friendly, adaptable personality. They are playful, affectionate, and love human companionship, making them ideal apartment dogs. French Bulldogs have a short, easy-to-maintain coat, and their moderate energy level means they don't require extensive exercise. They are typically good with children and other pets. However, due to their flat faces, they are sensitive to heat and need careful monitoring in warmer climates.", textLink: "Check out this product!" }
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
        es: { text: "El Golden Retriever es una raza amigable, inteligente y versátil, conocida por su leal y paciente carácter. Son excelentes mascotas familiares y altamente entrenables, destacándose en roles como perros de servicio, perros de búsqueda y rescate, y perros de terapia. Los Goldens tienen un hermoso doble pelaje que requiere un aseo regular. Son activos y necesitan ejercicio diario para mantenerse sanos. Esta raza es conocida por su naturaleza gentil y su fuerte vínculo con los humanos, lo que los convierte en excelentes compañeros para familias e individuos.", textLink: "Mira este producto!" },
        en: { text: "The Golden Retriever is a friendly, intelligent, and versatile breed known for its loyal and patient demeanor. They are excellent family pets and are highly trainable, excelling in roles such as service dogs, search-and-rescue dogs, and therapy dogs. Goldens have a beautiful double coat that requires regular grooming. They are active and need daily exercise to stay healthy. This breed is known for its gentle nature and strong bond with humans, making them great companions for families and individuals alike.", textLink: "Check out this product!" }
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
        es: { text: "El Labrador Retriever es una de las razas de perros más populares del mundo, conocida por su naturaleza amigable, inteligencia y adaptabilidad. Los Labs son altamente entrenables y a menudo se emplean como perros de servicio, perros de búsqueda y rescate, y en diversos roles de trabajo. Son cariñosos y gentiles con los niños, lo que los convierte en excelentes mascotas familiares. Los Labradores tienen un pelaje corto y denso que es resistente al agua y fácil de mantener. Son activos y requieren ejercicio regular para mantenerse sanos y felices.", textLink: "Mira este producto!" },
        en: { text: "The Labrador Retriever is one of the most popular dog breeds worldwide, known for its friendly nature, intelligence, and adaptability. Labs are highly trainable and are often employed as service dogs, search-and-rescue dogs, and in various working roles. They are affectionate and gentle with children, making them great family pets. Labradors have a short, dense coat that is water-resistant and easy to groom. They are active and require regular exercise to stay healthy and happy.", textLink: "Check out this product!" }
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
        es: { text: "El Pomerania es una raza pequeña y vivaz con un esponjoso doble pelaje y una distintiva cola en forma de pluma. Conocidos por su personalidad audaz y segura, los Pomeranias son muy inteligentes y les encanta ser el centro de atención. A pesar de su pequeño tamaño, tienen una actitud de perro grande y son conocidos por su alerta y fuerte voluntad. Se necesita un aseo regular para mantener su espeso pelaje. Los Pomeranias son leales y son excelentes compañeros para quienes buscan un pequeño perro enérgico y cariñoso.", textLink: "Mira este producto!" },
        en: { text: "The Pomeranian is a small, lively breed with a fluffy double coat and a distinctive plume-like tail. Known for their bold and confident personality, Pomeranians are highly intelligent and love to be the center of attention. Despite their small size, they have a big-dog attitude and are known for their alertness and strong will. Regular grooming is needed to maintain their thick coat. Pomeranians are loyal and make excellent companions for those looking for an energetic and affectionate little dog.", textLink: "Check out this product!" }
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
        es: { text: "El Pug es una raza pequeña y robusta con un rostro arrugado y una distintiva cola enroscada. Conocidos por su naturaleza juguetona y cariñosa, los Pugs son perros sociales que disfrutan de la compañía humana. A menudo se los describe como encantadores y traviesos. Los Pugs tienen un pelaje corto que es fácil de mantener, pero mudan moderadamente. Son sensibles a las temperaturas extremas debido a sus caras planas y deben ser monitoreados en climas cálidos. Los Pugs son generalmente buenos con los niños y son maravillosos compañeros.", textLink: "Mira este producto!" },
        en: { text: "The Pug is a small, sturdy breed with a wrinkled face and a distinct curled tail. Known for their playful and affectionate nature, Pugs are social dogs that enjoy human companionship. They are often described as being both charming and mischievous. Pugs have a short coat that is easy to groom but do shed moderately. They are sensitive to extreme temperatures due to their flat faces and should be monitored in hot weather. Pugs are generally good with children and make wonderful companions.", textLink: "Check out this product!" }
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
        es: { text: "El Rottweiler es una raza poderosa y segura, conocida por su fuerza, lealtad e instintos protectores. Criados originalmente como perros de trabajo, los Rottweilers son inteligentes, entrenables y destacan en roles como perros guardianes, perros policías y perros de búsqueda y rescate. Son cariñosos y gentiles con sus familias, pero pueden ser cautelosos con los extraños. La socialización y el entrenamiento adecuados son esenciales para esta raza, asegurando que sean bien educados y seguros. Los Rottweilers tienen un pelaje corto y fácil de mantener.", textLink: "Mira este producto!" },
        en: { text: "The Rottweiler is a powerful, confident breed known for its strength, loyalty, and protective instincts. Originally bred as working dogs, Rottweilers are intelligent, trainable, and excel in roles such as guard dogs, police dogs, and search-and-rescue dogs. They are affectionate and gentle with their families but can be wary of strangers. Proper socialization and training are essential for this breed to ensure they are well-behaved and confident. Rottweilers have a short coat that is easy to groom.", textLink: "Check out this product!" }
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
        es: { text: "El Beauceron es una raza de pastoreo grande e inteligente originaria de Francia. Son fuertes, leales y tienen un instinto natural de protección. Los Beauceron son excelentes en obediencia y se destacan como perros de trabajo debido a su motivación y capacidad de entrenamiento. Son cariñosos con sus familias, pero necesitan un entrenamiento firme y constante. Su pelaje corto es fácil de cuidar.", textLink: "Mira este producto!" },
        en: { text: "The Beauceron is a large, intelligent herding breed from France. They are strong, loyal, and possess a natural guarding instinct. Beaucerons are excellent at obedience and make great working dogs due to their drive and trainability. They are affectionate with their families but need firm and consistent training. Their short coat is easy to groom.", textLink: "Check out this product!" }
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
        es: { text: "Los English Cocker Spaniels son perros alegres, cariñosos y activos. Conocidos por sus orejas largas y ojos expresivos, son amigables con familias y otras mascotas. Criados originalmente para la caza, mantienen su aguda habilidad para rastrear y su amor por las actividades al aire libre. Los Cockers necesitan ejercicio y aseo regulares para mantenerse saludables. Son compañeros leales y prosperan en entornos familiares con mucho afecto y estimulación mental.", textLink: "Mira este producto!" },
        en: { text: "English Cocker Spaniels are cheerful, affectionate, and active dogs. Known for their long ears and expressive eyes, they are friendly with families and pets alike. Originally bred for hunting, they retain their keen scenting ability and love for outdoor activities. Cockers require regular exercise and grooming to maintain their health and coat. These dogs are loyal companions and do well in family environments with plenty of affection and mental stimulation.", textLink: "Check out this product!" }
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
        es: { text: "El English Foxhound es una raza robusta y activa, conocida por su resistencia y habilidades de caza. Criados originalmente para la caza de zorros, son decididos y tienen una fuerte mentalidad de manada, lo que los hace amigables con otros perros. Son adecuados para familias activas y necesitan ejercicio constante y espacio para moverse. Aunque pueden ser independientes, generalmente son de buen carácter. Su pelaje corto requiere poco mantenimiento.", textLink: "Mira este producto!" },
        en: { text: "The English Foxhound is a sturdy, active breed known for its endurance and hunting skills. Originally bred for fox hunting, they are determined and have a strong pack mentality, making them friendly with other dogs. Foxhounds are best suited to active families and require consistent exercise and space to roam. While they may have an independent streak, they’re generally good-natured and friendly. Their short coat requires minimal grooming.", textLink: "Check out this product!" }
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
        es: { text: "Los English Setters son perros elegantes y amigables, conocidos por su pelaje moteado distintivo y movimientos gráciles. Son cariñosos, gentiles y disfrutan pasar tiempo con la familia. Criados originalmente para la caza de aves, conservan un agudo sentido del olfato y amor por la aventura al aire libre. Requieren ejercicio y estimulación mental regulares. Conocidos por su temperamento amigable, son excelentes con niños y otras mascotas. Necesitan un aseo regular para mantener su pelaje.", textLink: "Mira este producto!" },
        en: { text: "English Setters are elegant and friendly sporting dogs known for their distinctive speckled coat and graceful movements. They are affectionate, gentle, and enjoy spending time with families. Originally bred as bird dogs, Setters retain a keen sense of smell and love for outdoor adventures. They require regular exercise and mental stimulation. Known for their amiable temperament, they are excellent with children and other pets. Setters need regular grooming to maintain their flowing coat.", textLink: "Check out this product!" }
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
        es: { text: "El Entlebucher Mountain Dog es una raza de pastoreo compacta y musculosa de Suiza, valorada por su lealtad y naturaleza trabajadora. Conocido por su pelaje tricolor y su personalidad enérgica, forma lazos fuertes con su familia. Los Entlebuchers son inteligentes, enérgicos y disfrutan de las actividades al aire libre, lo que los convierte en compañeros ideales para dueños activos. Prosperan en entornos donde puedan tener un trabajo o participar en desafíos físicos y mentales regulares.", textLink: "Mira este producto!" },
        en: { text: "The Entlebucher Mountain Dog is a compact, muscular herding breed from Switzerland, valued for its loyalty and hardworking nature. Known for its tri-color coat and lively personality, it forms strong bonds with its family. Entlebuchers are intelligent, energetic, and enjoy outdoor activities, making them ideal companions for active owners. They thrive in environments where they can have a job or participate in regular physical and mental challenges.", textLink: "Check out this product!" }
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
        es: { text: "Los Field Spaniels son perros medianos y robustos con un temperamento tranquilo y amor por el aire libre. Criados originalmente para la caza, son conocidos por su inteligencia y versatilidad. Los Field Spaniels son leales y gentiles con las familias y los niños, prosperando en entornos donde puedan explorar y hacer ejercicio. Tienen un pelaje denso que requiere aseo regular. Son ideales para familias activas que buscan un compañero amigable y adaptable.", textLink: "Mira este producto!" },
        en: { text: "Field Spaniels are medium-sized, sturdy dogs with a calm demeanor and love for the outdoors. Originally bred for hunting, they are known for their intelligence and versatility. Field Spaniels are loyal and gentle with families and children, thriving in environments where they can explore and exercise. They have a dense coat that requires regular grooming. These spaniels are well-suited to active families looking for a companion with a friendly and adaptable nature.", textLink: "Check out this product!" }
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
        es: { text: "Los Finnish Lapphunds son perros inteligentes, amigables y resistentes, utilizados originalmente para pastorear renos en los climas duros de Finlandia. Tienen un doble pelaje grueso y una expresión alerta distintiva. Los Lapphunds son conocidos por su naturaleza gentil y son excelentes con niños y otras mascotas. Estos perros adaptables disfrutan de las actividades al aire libre, pero también son felices en hogares familiares. Su pelaje denso requiere aseo regular y prosperan con ejercicio regular.", textLink: "Mira este producto!" },
        en: { text: "Finnish Lapphunds are intelligent, friendly, and resilient dogs, originally used for herding reindeer in the harsh climates of Finland. They have a thick double coat and a distinctive, alert expression. Lapphunds are known for their gentle nature and are excellent with children and other pets. These adaptable dogs enjoy outdoor activities but are also content in family homes. Regular grooming is needed for their dense fur, and they thrive with regular exercise.", textLink: "Check out this product!" }
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
        es: { text: "El Finnish Spitz es un perro pequeño, similar a un zorro, conocido por su naturaleza vivaz, vocal y su pelaje rojo vibrante. Criado originalmente para la caza de aves, este perro tiene un oído agudo y es increíblemente alerta. Amigable y cariñoso, el Finnish Spitz forma lazos fuertes con su familia, convirtiéndose en un compañero leal. Es activo y necesita ejercicio regular. Su habilidad de 'ladrido señalador' es una característica única utilizada tradicionalmente para señalar a los cazadores.", textLink: "Mira este producto!" },
        en: { text: "The Finnish Spitz is a small, fox-like dog known for its lively, vocal nature and vibrant red coat. Originally bred for hunting game birds, this breed has keen hearing and is incredibly alert. Friendly and affectionate, Finnish Spitz dogs form strong bonds with their families, making them loyal companions. They are spirited, needing regular physical and mental exercise. Their unique 'bark pointer' trait is a standout feature, used traditionally to signal hunters.", textLink: "Check out this product!" }
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
        es: { text: "El Flat-Coated Retriever es una raza alegre y activa, famosa por su brillante pelaje negro o color hígado y su espíritu juguetón. Conocidos por ser excelentes con familias, estos perros son inteligentes, ansiosos por agradar y mantienen un comportamiento juvenil toda su vida. Criados originalmente para recuperar presas, disfrutan de actividades al aire libre y juegos acuáticos. El ejercicio y la estimulación mental regulares son claves para su felicidad, y disfrutan de sesiones de entrenamiento e interacción familiar.", textLink: "Mira este producto!" },
        en: { text: "The Flat-Coated Retriever is a joyful, active breed, famous for its shiny black or liver-colored coat and playful spirit. Known for being great with families, these retrievers are intelligent, eager to please, and maintain a youthful demeanor throughout their lives. Originally bred for retrieving game, they thrive on outdoor activities and water play. Regular exercise and mental engagement are key to their happiness, and they enjoy training sessions and family interactions.", textLink: "Check out this product!" }
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
        es: { text: "El German Pinscher es una raza ágil y elegante con un pelaje liso y brillante y una complexión fuerte y muscular. Conocidos por su inteligencia e independencia, son leales y protectores, lo que los convierte en excelentes perros guardianes. Los German Pinschers necesitan entrenamiento constante y mucho ejercicio para satisfacer su mente activa. Son cariñosos con su familia, pero pueden ser reservados con extraños, mostrando su naturaleza alerta y confiada.", textLink: "Mira este producto!" },
        en: { text: "The German Pinscher is an agile, elegant breed with a smooth, shiny coat and strong, muscular build. Known for their intelligence and independence, they are loyal and protective, making them excellent watchdogs. German Pinschers need consistent training and plenty of exercise to satisfy their active minds. They are affectionate with their families but can be reserved with strangers, showcasing their alert and confident nature.", textLink: "Check out this product!" }
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
        es: { text: "El Afghan Hound es una raza regia y elegante, conocida por su largo y sedoso pelaje y su apariencia distintiva. Criados originalmente en Afganistán para la caza, son rápidos, independientes y sensibles. Los Afghan Hounds son conocidos por su personalidad distante pero amorosa, formando fuertes lazos con su familia. Su pelaje requiere un aseo regular y prosperan en entornos donde pueden ejercitarse y mostrar su elegancia en movimiento.", textLink: "Mira este producto!" },
        en: { text: "The Afghan Hound is a regal, graceful breed known for its long, silky coat and distinctive appearance. Originally bred in Afghanistan for hunting, they are fast, independent, and sensitive. Afghan Hounds are known for their aloof yet loving personality, forming strong bonds with their families. Their coat requires regular grooming, and they thrive in environments where they can exercise and showcase their elegant movements.", textLink: "Check out this product!" }
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
        es: { text: "Conocido como el 'Rey de los Terriers', el Airedale Terrier es el más grande de los terriers, con una disposición amigable y enérgica. Criados para cazar y trabajar, los Airedales son inteligentes y versátiles, destacándose en diversas actividades. Son leales y protectores con la familia, y aunque son independientes, disfrutan del entrenamiento y la interacción social. Su pelaje denso y áspero requiere un aseo regular.", textLink: "Mira este producto!" },
        en: { text: "Known as the 'King of Terriers', the Airedale Terrier is the largest of the terrier breeds, with a friendly, energetic disposition. Bred for hunting and working, Airedales are intelligent and versatile, excelling in various activities. They are loyal and protective with families, and while they are independent, they enjoy training and social interactions. Regular grooming is necessary for their dense, wiry coat.", textLink: "Check out this product!" }
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
        es: { text: "El American Staffordshire Terrier es una raza poderosa y segura de sí misma, con una naturaleza leal y amigable. Conocidos por su complexión fuerte y musculosa, estos perros son inteligentes y aman la compañía humana. Aunque son protectores y valientes, los Staffies americanos también son gentiles con los miembros de la familia, especialmente con los niños. Prosperan con entrenamiento y socialización consistentes y requieren ejercicio regular para mantener su musculatura y energía.", textLink: "Mira este producto!" },
        en: { text: "The American Staffordshire Terrier is a powerful and confident breed with a loyal and friendly nature. Known for their strong build and muscular physique, these dogs are intelligent and love human companionship. While they are protective and brave, American Staffies are also gentle with family members, especially children. They thrive with consistent training and socialization, and require regular exercise to maintain their muscular structure and energy levels.", textLink: "Check out this product!" }
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
        es: { text: "El Australian Terrier es un perro pequeño y robusto con una personalidad vivaz y un pelaje áspero. Criado originalmente para la caza y control de plagas, es conocido por su vigilancia, lealtad e independencia. Son amigables con la familia y buenos guardianes, aunque su instinto terrier los hace propensos a perseguir. Los Australian Terriers disfrutan del juego y el entrenamiento, adaptándose bien a dueños activos.", textLink: "Mira este producto!" },
        en: { text: "The Australian Terrier is a small, sturdy dog with a spirited personality and a wiry coat. Originally bred for hunting and pest control, they’re known for their alertness, loyalty, and independent nature. They are friendly with family and good watchdogs, though their terrier instincts make them prone to chasing. Australian Terriers enjoy both playtime and training sessions, making them adaptable for active owners.", textLink: "Check out this product!" }
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
        es: { text: "El Bedlington Terrier es una raza elegante, similar a un cordero, con un pelaje suave y rizado. Conocidos por su naturaleza amable, estos terriers son cariñosos y tranquilos en casa, pero mantienen un fuerte instinto cazador al aire libre. Criados originalmente para cazar alimañas, son ágiles, rápidos y valientes. Son excelentes compañeros familiares y prosperan con actividades físicas y mentales regulares.", textLink: "Mira este producto!" },
        en: { text: "The Bedlington Terrier is a graceful, lamb-like breed with a soft, curly coat. Known for their gentle nature, these terriers are affectionate and calm indoors but maintain a strong prey drive outdoors. Originally bred for hunting vermin, they are agile, quick, and courageous. Bedlington Terriers are excellent family companions, thriving with regular mental and physical activities.", textLink: "Check out this product!" }
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
        es: { text: "El Belgian Tervuren es un perro de pastoreo altamente inteligente y ágil, con un pelaje denso y una naturaleza alerta y concentrada. Conocidos por su lealtad y ética de trabajo, los Tervuren destacan en obediencia, agilidad y tareas de pastoreo. Forman fuertes lazos con su familia y son naturalmente protectores, siendo excelentes perros guardianes. Necesitan estimulación mental y ejercicio físico regular para estar felices.", textLink: "Mira este producto!" },
        en: { text: "The Belgian Tervuren is a highly intelligent and agile herding dog with a dense coat and an alert, focused nature. Known for their loyalty and work ethic, Tervurens excel in obedience, agility, and herding tasks. They form strong bonds with their families and are protective by nature, making them excellent guard dogs. Regular mental stimulation and physical exercise keep them content.", textLink: "Check out this product!" }
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
        es: { text: "El Bergamasco Sheepdog es una antigua raza de pastoreo conocida por su único pelaje con cordones. Este perro inteligente y leal fue criado en los Alpes italianos para pastorear y proteger ganado. Los Bergamascos son tranquilos, independientes y se adaptan bien a diferentes entornos. Su pelaje requiere un cuidado específico, pero ofrece aislamiento y protección. Son mascotas familiares devotas y disfrutan de actividades que estimulan su mente.", textLink: "Mira este producto!" },
        en: { text: "The Bergamasco Sheepdog is an ancient herding breed known for its unique, corded coat. This intelligent and loyal dog was bred in the Italian Alps to herd and guard livestock. Bergamascos are calm, independent, and highly adaptable to different environments. Their coat requires specific grooming but offers insulation and protection. They make devoted family pets and enjoy activities that engage their minds.", textLink: "Check out this product!" }
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
        es: { text: "El Black and Tan Coonhound es un perro de caza poderoso y determinado, con una capacidad olfativa notable. Conocido por rastrear mapaches y otras presas, es independiente pero amigable con la familia. Su pelaje liso y negro y fuego y sus largas orejas le dan una apariencia clásica de sabueso. Los Coonhounds requieren ejercicio regular y disfrutan de actividades al aire libre donde pueden usar sus habilidades de rastreo.", textLink: "Mira este producto!" },
        en: { text: "The Black and Tan Coonhound is a powerful and determined hunting dog with a remarkable scenting ability. Known for trailing raccoons and other game, they are independent yet friendly with family members. Their smooth, black-and-tan coat and long ears give them a classic hound appearance. Coonhounds require regular exercise and thrive with plenty of outdoor activities where they can use their tracking skills.", textLink: "Check out this product!" }
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
        es: { text: "El Black Russian Terrier es un perro grande, inteligente y poderoso, criado originalmente para fines militares. Conocidos por su lealtad e instintos protectores, son excelentes perros guardianes y compañeros familiares dedicados. Su denso pelaje negro requiere un cuidado regular, y prosperan con ejercicio diario y estimulación mental. Son ideales para dueños experimentados que puedan brindarles entrenamiento constante.", textLink: "Mira este producto!" },
        en: { text: "The Black Russian Terrier is a large, intelligent, and powerful dog, originally bred for military purposes. Known for their loyalty and protective instincts, they make excellent guard dogs and are dedicated family companions. Their dense, black coat requires regular grooming, and they thrive on daily exercise and mental engagement. Black Russian Terriers are best suited for experienced owners who can provide consistent training.", textLink: "Check out this product!" }
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
        es: { text: "El Bloodhound es un perro de rastreo famoso por su habilidad para seguir rastros a largas distancias. Su piel suelta y orejas largas mejoran su capacidad olfativa, lo que los hace ideales para trabajos de búsqueda y rescate. Amistosos y gentiles con la familia, los Bloodhounds requieren entrenamiento constante y mucho ejercicio. Son ideales para dueños que aprecian sus cualidades únicas.", textLink: "Mira este producto!" },
        en: { text: "The Bloodhound is a renowned scent-tracking dog, famous for its remarkable ability to follow trails over long distances. Their droopy skin and long ears enhance their scenting ability, making them ideal for search and rescue work. Friendly and gentle with family, Bloodhounds require consistent training and plenty of exercise. Known for their persistence, they are best suited for owners who appreciate their unique qualities.", textLink: "Check out this product!" }
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
        es: { text: "El Border Terrier es un perro pequeño y resistente, criado originalmente para la caza. Conocido por su aspecto desaliñado y su fuerte instinto cazador, es cariñoso y amistoso con la familia. Los Border Terriers son inteligentes y responden bien al entrenamiento, pero pueden perseguir animales pequeños. Se adaptan bien a diferentes entornos y son felices con ejercicio regular y estimulación mental.", textLink: "Mira este producto!" },
        en: { text: "The Border Terrier is a small, hardy dog originally bred for hunting. Known for their scruffy appearance and strong prey drive, they’re affectionate and friendly with family members. Border Terriers are intelligent and responsive to training but may chase small animals. They adapt well to various living environments and are happiest with regular exercise and mental stimulation.", textLink: "Check out this product!" }
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
        es: { text: "El Borzoi es un galgo elegante y rápido, conocido por su apariencia refinada y su carácter gentil. Criado originalmente para cazar lobos en Rusia, es independiente y reservado, pero forma fuertes lazos con su familia. Los Borzois tienen un pelaje sedoso que requiere cuidados regulares. Disfrutan tanto de actividades al aire libre como de la tranquilidad en casa y son ideales para dueños tranquilos y experimentados.", textLink: "Mira este producto!" },
        en: { text: "The Borzoi is a graceful, fast-moving sighthound known for its elegant appearance and gentle demeanor. Originally bred for hunting wolves in Russia, they are independent and reserved but form strong bonds with their family. Borzois have a sleek, silky coat that requires regular grooming. They enjoy both outdoor activities and quiet companionship and are best suited for calm, experienced owners.", textLink: "Check out this product!" }
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
        es: { text: "El Bouvier des Flandres es un perro de pastoreo grande y robusto, conocido por su inteligencia y lealtad. Criado originalmente para trabajos agrícolas, es protector y trabajador, destacando en diversas tareas. Los Bouviers tienen un pelaje grueso resistente al clima que requiere cuidados, y prosperan con actividades mentales y físicas regulares. Son compañeros familiares devotos, ideales para dueños experimentados.", textLink: "Mira este producto!" },
        en: { text: "The Bouvier des Flandres is a large, rugged herding dog known for its intelligence and loyalty. Originally bred for farm work, they are protective, hardworking, and excel in various tasks. Bouviers have a thick, weather-resistant coat that requires grooming and thrive with regular mental and physical activities. They make devoted family companions but are best suited for experienced handlers.", textLink: "Check out this product!" }
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
        es: { text: "El Boykin Spaniel es un perro de caza mediano conocido por su versatilidad y lealtad. Criado en Carolina del Sur para la caza de aves acuáticas, es un gran nadador y recuperador. Los Boykins son cariñosos y amigables con la familia, lo que los convierte en excelentes compañeros para familias activas. Con un pelaje marrón chocolate y amor por el aire libre, necesitan ejercicio regular y estimulación mental.", textLink: "Mira este producto!" },
        en: { text: "The Boykin Spaniel is a medium-sized hunting dog known for its versatility and loyalty. Originally bred in South Carolina for waterfowl hunting, they are great swimmers and retrievers. Boykins are affectionate and friendly with family members, making them wonderful companions for active families. With a rich, chocolate-brown coat and a love for the outdoors, they need regular exercise and mental engagement.", textLink: "Check out this product!" }
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
        es: { text: "El Bracco Italiano es un perro de caza habilidoso con una naturaleza amable y una estructura atlética. Conocido por su apariencia distintiva, incluidas sus orejas caídas y expresión noble, esta raza es cariñosa y forma fuertes lazos con la familia. Criados en Italia para la caza, los Braccos son ágiles y prosperan con actividad al aire libre regular. Responden bien al entrenamiento y son excelentes compañeros para familias activas.", textLink: "Mira este producto!" },
        en: { text: "The Bracco Italiano is a skilled hunting dog with a gentle nature and an athletic build. Known for its distinctive appearance, including droopy ears and a noble expression, this breed is affectionate and bonds strongly with family members. Originally bred in Italy for hunting, Braccos are agile and thrive with regular outdoor activity. They respond well to training and make excellent companions for active families.", textLink: "Check out this product!" }
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
        es: { text: "El Brussels Griffon es un perro pequeño con una personalidad vivaz y un rostro expresivo, a menudo comparado con el de un humano. Conocidos por su naturaleza cariñosa y curiosa, forman lazos cercanos con sus dueños y disfrutan de ser el centro de atención. Son excelentes compañeros para vivir en apartamentos, aunque se benefician del juego diario y la estimulación mental.", textLink: "Mira este producto!" },
        en: { text: "The Brussels Griffon is a small dog with a lively personality and an expressive face, often compared to a human's. Known for their affectionate and curious nature, they bond closely with their owners and enjoy being the center of attention. Brussels Griffons are great companions for apartment living, but they still benefit from daily play and mental stimulation.", textLink: "Check out this product!" }
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
        es: { text: "El Bull Terrier es una raza fuerte y vivaz, con una cabeza distintiva en forma de huevo y un carácter amigable. Conocidos por su lealtad y alegría, son excelentes compañeros para familias. Los Bull Terriers son inteligentes y responden bien al entrenamiento constante, pero necesitan una guía firme debido a su fuerte personalidad. El ejercicio regular y la estimulación mental son esenciales para su felicidad.", textLink: "Mira este producto!" },
        en: { text: "The Bull Terrier is a strong and spirited breed with a distinctive egg-shaped head and a friendly nature. Known for their loyalty and playfulness, they make wonderful companions for families. Bull Terriers are intelligent and respond well to consistent training, but they need firm guidance due to their strong personalities. Regular exercise and mental stimulation are essential for their happiness.", textLink: "Check out this product!" }
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
        es: { text: "El Bullmastiff es una raza grande y poderosa, criada originalmente para proteger propiedades. Conocidos por su lealtad e instintos protectores, son gentiles y cariñosos con sus familias. A pesar de su tamaño, los Bullmastiffs son tranquilos y se adaptan bien a la vida en el hogar, aunque requieren ejercicio regular para mantenerse saludables. Sus instintos naturales de guardia los convierten en excelentes protectores, aunque son amigables con los invitados cuando están bien socializados.", textLink: "Mira este producto!" },
        en: { text: "The Bullmastiff is a large and powerful breed, originally bred to guard estates. Known for their loyalty and protective instincts, they are gentle and affectionate with their families. Despite their size, Bullmastiffs are calm and adapt well to home life, but they require regular exercise to stay healthy. Their natural guard instincts make them great protectors, yet they are generally friendly with guests when properly socialized.", textLink: "Check out this product!" }
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
        es: { text: "El Chinese Crested es un perro de compañía pequeño y único que viene en dos tipos: sin pelo y Powderpuff (con pelaje completo). Conocido por su personalidad cariñosa y vivaz, es ideal para familias y se adapta bien a la vida en apartamentos. Su estructura delgada y tamaño pequeño los hacen fáciles de llevar, y prosperan con la atención. Estos perros son sensibles al frío, por lo que necesitan cuidados adicionales en climas fríos.", textLink: "Mira este producto!" },
        en: { text: "The Chinese Crested is a unique, small companion dog that comes in two types: Hairless and Powderpuff (with a full coat). Known for their affectionate and lively personality, they are great for families and adapt well to apartment living. Their slender build and small size make them easy to carry, and they thrive on attention. These dogs are sensitive to the cold, so they need extra care in colder climates.", textLink: "Check out this product!" }
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
        es: { text: "El Clumber Spaniel es un spaniel grande y robusto, conocido por su naturaleza tranquila y leal. Criado originalmente para la caza, tiene un temperamento suave y es una excelente mascota familiar. Los Clumbers son más tranquilos en comparación con otros spaniels, pero disfrutan de las actividades al aire libre. Tienen un pelaje denso y blanco que necesita cuidado regular, y son ideales para familias que puedan ofrecerles ejercicio moderado y compañía.", textLink: "Mira este producto!" },
        en: { text: "The Clumber Spaniel is a large, sturdy spaniel known for its calm and loyal nature. Originally bred for hunting, they have a gentle temperament and are great family pets. Clumbers are relatively laid-back compared to other spaniels but still enjoy outdoor activities. They have a dense, white coat that needs regular grooming and are best suited for families who can provide them with moderate exercise and companionship.", textLink: "Check out this product!" }
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
        es: { text: "El Collie es un elegante perro de pastoreo, conocido por su lealtad e inteligencia, representado en el personaje de Lassie. Los Collies son amables, de buen carácter y excelentes con los niños, lo que los hace ideales como mascotas familiares. Tienen un hermoso pelaje largo que necesita cuidado, especialmente la variedad de pelaje áspero. Con un fuerte instinto de pastoreo, los Collies disfrutan de actividades al aire libre y se benefician de un entrenamiento constante.", textLink: "Mira este producto!" },
        en: { text: "The Collie is a graceful herding dog known for its loyalty and intelligence, famously depicted in the character Lassie. Collies are gentle, good-natured, and excellent with children, making them ideal family pets. They have a long, beautiful coat that requires grooming, especially the rough-coated variety. With a strong herding instinct, Collies enjoy outdoor activities and benefit from consistent training.", textLink: "Check out this product!" }
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
        es: { text: "El Dogo Argentino es una raza poderosa y atlética, desarrollada originalmente para la caza mayor en Argentina. Conocido por su valentía, fuerza y lealtad, es protector de su familia y es un excelente perro guardián. Los Dogos Argentinos requieren un dueño experimentado y un entrenamiento constante, así como ejercicio regular para canalizar su alta energía. Su pelaje corto y blanco es fácil de cuidar.", textLink: "Mira este producto!" },
        en: { text: "The Dogo Argentino is a powerful and athletic breed, originally developed for big-game hunting in Argentina. Known for their bravery, strength, and loyalty, they are protective of their families and make excellent guard dogs. Dogo Argentinos require an experienced handler and consistent training, as well as regular exercise to channel their high energy levels. Their short, white coat is easy to care for.", textLink: "Check out this product!" }
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
        es: { text: "El Dogue de Bordeaux es una raza grande y musculosa, con un rostro arrugado distintivo y un carácter calmado y protector. Conocido como una de las razas francesas más antiguas, es un compañero leal y excelente con los niños. A pesar de su gran tamaño, es gentil y cariñoso. El Dogue de Bordeaux tiene un pelaje corto, fácil de cuidar, y necesita ejercicio moderado y atención.", textLink: "Mira este producto!" },
        en: { text: "The Dogue de Bordeaux is a muscular, large breed with a distinctively wrinkled face and a calm, protective demeanor. Known as one of the oldest French breeds, they make loyal companions and are excellent with children. Despite their large size, they are gentle and affectionate. The Dogue de Bordeaux has a short coat, is easy to groom, and needs moderate exercise and attention.", textLink: "Check out this product!" }
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
        es: { text: "El Pastor Alemán es un perro de trabajo versátil e inteligente, conocido por su lealtad y valentía. Criado originalmente para el pastoreo, sobresale en roles como policía y rescate. Son protectores, entrenables y buenos con familias, pero necesitan ejercicio regular y estimulación mental para evitar el aburrimiento. Su doble pelaje requiere cuidado regular, y prosperan con un dueño experimentado.", textLink: "Mira este producto!" },
        en: { text: "The German Shepherd Dog is a versatile, intelligent working dog known for its loyalty and courage. Originally bred for herding, they excel in various roles, including police and search-and-rescue work. German Shepherds are protective, trainable, and good with families, but they need regular exercise and mental stimulation to prevent boredom. Their double coat requires regular grooming, and they thrive with an experienced handler.", textLink: "Check out this product!" }
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
        es: { text: "El Pointer Alemán de Pelo Corto es un perro de caza enérgico y versátil, conocido por su atletismo y olfato agudo. Criado tanto para el trabajo en campo como en agua, es cariñoso, inteligente y adaptable, ideal para familias activas. Su pelaje corto y denso es fácil de mantener, y necesita ejercicio y estimulación mental para estar feliz y saludable.", textLink: "Mira este producto!" },
        en: { text: "The German Shorthaired Pointer is an energetic and versatile hunting dog known for its athleticism and keen nose. Bred for both field and water work, they are affectionate, intelligent, and adaptable, making them great companions for active families. Their short, dense coat is easy to maintain, and they require ample exercise and mental stimulation to stay happy and healthy.", textLink: "Check out this product!" }
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
        es: { text: "El Pointer Alemán de Pelo Duro es un perro de caza resistente y atlético, conocido por su pelaje denso y resistente a la intemperie y su instinto cazador. Criado para trabajar en diversos terrenos, es versátil, leal y cariñoso con la familia. Necesita ejercicio regular, estímulo mental y un dueño fuerte para sacar lo mejor de él. Prosperan en hogares activos y son relativamente fáciles de cuidar.", textLink: "Mira este producto!" },
        en: { text: "The German Wirehaired Pointer is a rugged, athletic hunting dog known for its dense, weather-resistant coat and hunting instincts. Bred to work in various terrains, they are versatile, loyal, and affectionate with family members. This breed needs regular exercise, mental engagement, and a strong handler to bring out their best qualities. They thrive in active households and are relatively easy to groom.", textLink: "Check out this product!" }
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
        es: { text: "El Schnauzer Gigante es un perro de trabajo robusto e inteligente, criado para la protección y el pastoreo de ganado. Son protectores, leales y pueden ser reservados con extraños. Conocidos por su pelaje duro y su característica barba y cejas, requieren cuidado regular y entrenamiento constante. Son ideales para familias activas que puedan proporcionarles ejercicio y desafíos mentales.", textLink: "Mira este producto!" },
        en: { text: "The Giant Schnauzer is a robust and intelligent working dog, bred for guarding and cattle driving. They are protective, loyal, and can be reserved with strangers. Known for their wiry coat and characteristic beard and eyebrows, they require regular grooming and consistent training. The Giant Schnauzer is well-suited for active families who can provide plenty of exercise and mental challenges.", textLink: "Check out this product!" }
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
        es: { text: "El Terrier Glen of Imaal es una raza rara y robusta con una personalidad leal y amistosa. Conocido por su origen cazador, es independiente pero cariñoso, y se lleva bien con las familias. Su doble pelaje es de bajo mantenimiento y se adapta bien a diferentes entornos de vida. Aunque es pequeño, tiene una gran personalidad y requiere ejercicio moderado.", textLink: "Mira este producto!" },
        en: { text: "The Glen of Imaal Terrier is a rare, sturdy breed with a loyal and friendly personality. Known for their hunting background, they are independent yet affectionate and get along well with families. Their double coat is low-maintenance, and they adapt well to different living environments. Though small, they have a big personality and require moderate exercise.", textLink: "Check out this product!" }
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
