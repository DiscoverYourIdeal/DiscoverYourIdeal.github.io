let currentQuestionIndex = 0;
const filters = {}; // Objeto para almacenar los filtros seleccionados

//
const questions = [
    {
        question_es: "¿Como de grande es tu casa?",
        answers_es: ["Pequeña", "Mediana", "Granda"],
        question_en: "How big is your house?",
        answers_en: ["Small", "Medium", "Large"],
        value: ["small", "medium", "large"]
    },
    {
        question_es: "¿Cuánto tiempo puedes dedicar a paseos diarios?",
        answers_es: ["Menos de 30'", "Entre 30' y 1h", "Más de 1h"],
        question_en: "How much time can you dedicate to taking out the dog?",
        answers_en: ["Less than 30'", "Between 30' and 1h", "More than 1h"],
        value: ["low","medium","high"]
    },
    {
        question_es: "¿Eres o hay niños en casa?",
        answers_es: ["Sí", "No"],
        question_en: ["Are you or are there kids in the house?"],
        answers_en: ["Yes", "No"],
        value: ["yes", "no"]
    }
];


// Array de razas de perros con sus características
const dogBreeds = [
    { name: "Chihuahua", size: "small", energy: "low", goodWithKids: "no" },
    { name: "Golden Retriever", size: "large", energy: "high", goodWithKids: "yes" },
    { name: "Beagle", size: "medium", energy: "medium", goodWithKids: "yes" },
    { name: "Labrador Retriever", size: "large", energy: "high", goodWithKids: "yes" },
    { name: "Bulldog", size: "medium", energy: "low", goodWithKids: "yes" },
    { name: "Poodle", size: "medium", energy: "high", goodWithKids: "yes" },
    { name: "Dachshund", size: "small", energy: "medium", goodWithKids: "no" },
    { name: "Boxer", size: "large", energy: "high", goodWithKids: "yes" },
    { name: "Siberian Husky", size: "large", energy: "high", goodWithKids: "yes" },
    { name: "Yorkshire Terrier", size: "small", energy: "medium", goodWithKids: "no" },
    { name: "French Bulldog", size: "medium", energy: "low", goodWithKids: "yes" },
    { name: "Cocker Spaniel", size: "medium", energy: "medium", goodWithKids: "yes" },
    { name: "Shih Tzu", size: "small", energy: "low", goodWithKids: "yes" },
    { name: "Rottweiler", size: "large", energy: "high", goodWithKids: "yes" },
    { name: "Pug", size: "small", energy: "low", goodWithKids: "yes" }
];

// Cargar la primera pregunta

function loadQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('quizz-question').innerText = currentQuestion.question_es;

    const buttons = document.querySelectorAll('#questions-panel button');

    buttons.forEach((button, index) => {
        if (currentQuestion.answers_es[index]) {
            button.innerText = currentQuestion.answers_es[index];
            button.style.display = 'inline';
            button.onclick = () => answerQuestion(currentQuestion.value[index]);
        } else {
            button.style.display = 'none';
        }
    });
}

function answerQuestion(value) {
    // Almacena la respuesta seleccionada
    if (currentQuestionIndex === 0) {
        filters.size = value.toLowerCase();
    } else if (currentQuestionIndex === 1) {
        filters.energy = value.toLowerCase();
    } else if (currentQuestionIndex === 2) {
        filters.goodWithKids = value.toLowerCase() ;
    }

    // Filtra los perros según las respuestas acumuladas
    filterDogs();

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) 
        {
        loadQuestion(); // Carga la siguiente pregunta
        } 
    else {
        document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
        document.getElementById('restart-button').style.display = 'inline'; // Muestra el botón de reinicio
        document.getElementById('end-message').style.display = 'inline'; // Muestra el botón de reinicio
        }
}
function startQuizz()
{
    document.getElementById('quizz-question').style.display = 'inline';
    document.getElementById('quizz-answer').style.display = 'inline';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-message').style.display = 'none';
    loadQuestion()
}

function filterDogs() {
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        const dogName = card.getAttribute('data-name');
        const dog = dogBreeds.find(dog => dog.name === dogName);

        let matches = true;

        // Verifica los filtros acumulados
        if (filters.size && dog.size.toLowerCase() !== filters.size.toLowerCase()) {
            matches = false;
        }
        if (filters.energy && dog.energy.toLowerCase() !== filters.energy.toLowerCase()) {
            matches = false;
        }
        if (filters.goodWithKids && dog.goodWithKids.toLowerCase() !== filters.goodWithKids.toLowerCase()) {
            matches = false;
        }

        // Muestra u oculta la tarjeta del perro según el filtro
        if (matches)
        {
            card.classList.remove('hidden'); // Show matching dogs
            card.style.display = 'block'; // Ensure it is displayed
        }
        else
        {
            card.classList.add('hidden'); // Hide non-matching dogs
            /* 
            // Set a timeout to remove it from display after the transition
             setTimeout(() => {
                card.style.display = 'none'; // Remove it from the layout flow
            }, 300); // Match this duration with your CSS transition duration
            */        
        }
        /*card.style.display = matches ? 'block' : 'none';*/
    });
}

function restartQuiz() {
    location.reload();
}

// Define the content for different languages
const content = {
    es: {
      title: 'Encuentra tu perro ideal',
      start_button: 'Empieza el Quizz',
      restart_button: 'Volver',
      start_message: "Empieza el quizz y encuentra tu perro ideal!",
      end_message: "¡Hemos encontrado los perros ideales para ti!"
    },
    en: {
      title: 'Find your perfect dog',
      start_button: 'Start the Quizz',
      restart_button: 'Return',
      start_message: "Start the Quizz and find your ideal dog!",
      end_message: "These are your ideal dogs!"
    }
  };

function setLanguage(lang) 
    {
        const titleElement = document.getElementById('title');
        const startButtonElement = document.getElementById('start-button');
        const restartButtonElement = document.getElementById('restart-button');
        const startmessageElement = document.getElementById('start-message');
        const endmessageElement = document.getElementById('end-message');
        
        // Update the title and description based on the selected language
        titleElement.textContent = content[lang].title;
        startButtonElement.textContent = content[lang].start_button;
        restartButtonElement.textContent = content[lang].restart_button;
        startmessageElement.textContent = content[lang].start_message;
        endmessageElement.textContent = content[lang].end_message;

        // Optionally, update the lang attribute of the document
        document.documentElement.lang = lang;
    }

// Optional: Automatically set language based on browser settings
const userLang = navigator.language || navigator.userLanguage;
if (userLang.startsWith('es')) {
setLanguage('es');
} else {
setLanguage('en');
}








/*const questions = [
    {
        question: "¿Cuánto espacio tienes disponible para tu perro?",
        answers: ["Apartamento pequeño", "Casa con jardín pequeño", "Casa con jardín grande"],
        value: ["pequeño", "mediano", "grande"]
    },
    {
        question: "¿Tienes acceso a espacio exterior (parque o jardín)?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Cuánto tiempo puedes dedicar al ejercicio diario de tu perro?",
        answers: ["Menos de 30 minutos", "30 minutos a 1 hora", "Más de 1 hora"],
        value: ["low", "medium", "high"]
    },
    {
        question: "¿Cuánto tiempo pasas fuera de casa diariamente?",
        answers: ["En casa la mayor parte del día", "Fuera parte del día (4-6 horas)", "Fuera la mayor parte del día (8+ horas)"],
        value: ["home", "partial", "away"]
    },
    {
        question: "¿Qué tan activo es tu estilo de vida?",
        answers: ["Sedentario", "Moderadamente activo", "Muy activo"],
        value: ["sedentario", "moderado", "activo"]
    },
    {
        question: "¿Tienes hijos en casa?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Tienes otras mascotas en casa?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Con qué frecuencia viajarás o harás excursiones con tu perro?",
        answers: ["Frecuentemente", "Ocasionalmente", "Raramente"],
        value: ["frecuente", "ocasional", "raro"]
    },
    {
        question: "¿Cuál es tu principal objetivo al tener un perro?",
        answers: ["Compañía", "Guardia o protección", "Terapia o apoyo emocional", "Actividades al aire libre"],
        value: ["compañía", "protección", "terapia", "deportes"]
    },
    {
        question: "¿Cuál es tu presupuesto para gastos relacionados con el perro (comida, veterinario, etc.)?",
        answers: ["Bajo", "Medio", "Alto"],
        value: ["bajo", "medio", "alto"]
    },
    {
        question: "¿Estás dispuesto a tener una raza que requiera cuidados especiales o grooming regular?",
        answers: ["Sí", "No"],
        value: ["yes", "no"]
    },
    {
        question: "¿Qué nivel de experiencia tienes con perros?",
        answers: ["Primera vez con un perro", "Algo de experiencia", "Mucha experiencia"],
        value: ["principiante", "moderado", "experimentado"]
    }
];*/

/*
const traits = [
    {
        trait: "Size",
        options: ["Small", "Medium", "Large", "Giant"],
        value: ["small", "medium", "large", "giant"]
    },
    {
        trait: "Coat Type",
        options: ["Short-haired", "Medium-haired", "Long-haired", "Curly-haired", "Wire-haired"],
        value: ["short", "medium", "long", "curly", "wire"]
    },
    {
        trait: "Coat Color",
        options: ["Single color", "Multi-color", "Spotted or Patterned"],
        value: ["single", "multi", "spotted"]
    },
    {
        trait: "Shedding Level",
        options: ["Low", "Medium", "High", "Hypoallergenic"],
        value: ["low", "medium", "high", "hypoallergenic"]
    },
    {
        trait: "Activity Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Trainability",
        options: ["Easy to train", "Moderately trainable", "Difficult to train"],
        value: ["easy", "moderate", "difficult"]
    },
    {
        trait: "Temperament",
        options: ["Calm", "Playful", "Protective", "Independent", "Friendly", "Reserved"],
        value: ["calm", "playful", "protective", "independent", "friendly", "reserved"]
    },
    {
        trait: "Aggressiveness",
        options: ["Low", "Moderate", "High"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Barking Level",
        options: ["Rarely barks", "Occasionally barks", "Frequently barks"],
        value: ["rare", "occasional", "frequent"]
    },
    {
        trait: "Energy Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Good with Children",
        options: ["Yes", "No", "Depends"],
        value: ["yes", "no", "depends"]
    },
    {
        trait: "Good with Other Pets",
        options: ["Yes", "No"],
        value: ["yes", "no"]
    },
    {
        trait: "Guarding Ability",
        options: ["Excellent", "Moderate", "Not suitable"],
        value: ["excellent", "moderate", "not suitable"]
    },
    {
        trait: "Drooling Level",
        options: ["Low", "Medium", "High"],
        value: ["low", "medium", "high"]
    },
    {
        trait: "Adaptability to Apartment Living",
        options: ["Excellent", "Moderate", "Poor"],
        value: ["excellent", "moderate", "poor"]
    },
    {
        trait: "Exercise Needs",
        options: ["Minimal", "Moderate", "High"],
        value: ["minimal", "moderate", "high"]
    },
    {
        trait: "Life Expectancy",
        options: ["Short (less than 10 years)", "Average (10-12 years)", "Long (12+ years)"],
        value: ["short", "average", "long"]
    },
    {
        trait: "Dietary Needs",
        options: ["Standard diet", "Special dietary needs", "High caloric intake"],
        value: ["standard", "special", "high"]
    },
    {
        trait: "Grooming Requirements",
        options: ["Low maintenance", "Moderate", "High maintenance"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Health Issues Predisposition",
        options: ["Healthy breed", "Prone to specific conditions"],
        value: ["healthy", "prone"]
    },
    {
        trait: "Noise Sensitivity",
        options: ["High", "Low"],
        value: ["high", "low"]
    },
    {
        trait: "Space Needs",
        options: ["Minimal", "Moderate", "Requires large space"],
        value: ["minimal", "moderate", "large"]
    },
    {
        trait: "Behavior with Strangers",
        options: ["Friendly", "Reserved", "Protective"],
        value: ["friendly", "reserved", "protective"]
    },
    {
        trait: "Compatibility with Cold Weather",
        options: ["Good", "Sensitive to cold"],
        value: ["good", "sensitive"]
    },
    {
        trait: "Compatibility with Hot Weather",
        options: ["Good", "Sensitive to heat"],
        value: ["good", "sensitive"]
    },
    {
        trait: "Working Ability",
        options: ["Excellent", "Moderate", "Companion"],
        value: ["excellent", "moderate", "companion"]
    },
    {
        trait: "Playfulness Level",
        options: ["Very playful", "Moderately playful", "Not playful"],
        value: ["very playful", "moderate", "calm"]
    },
    {
        trait: "Social Needs",
        options: ["Enjoys company", "Independent", "Requires constant attention"],
        value: ["social", "independent", "constant attention"]
    },
    {
        trait: "Aggression Towards Other Dogs",
        options: ["Low", "Moderate", "High"],
        value: ["low", "moderate", "high"]
    },
    {
        trait: "Suitability for First-Time Owners",
        options: ["Very suitable", "Moderately suitable", "Not recommended"],
        value: ["very suitable", "moderate", "not recommended"]
    }
];
*/