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
