let currentQuestionIndex = 0;
const filters = {}; // Objeto para almacenar los filtros seleccionados

//
const questions = [
    {
        question: "¿Cuánto espacio tienes disponible para tu perro?",
        answers: ["Pequeño", "Mediano", "Grande"],
        value: ["pequeño", "mediano", "grande"]
    },
    {
        question: "¿Cuánto tiempo puedes dedicar a paseos diarios?",
        answers: ["Menos de 30 minutos", "30 minutos a 1 hora", "Más de 1 hora"],
        value: ["low","medium","high"]
    },
    {
        question: "¿Tienes niños en casa?",
        answers: ["Yes", "No"],
        value: ["yes", "no"]
    }
];

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

// Array de razas de perros con sus características
const dogBreeds = [
    { name: "Chihuahua", size: "pequeño", energy: "low", goodWithKids: "no" },
    { name: "Golden Retriever", size: "grande", energy: "high", goodWithKids: "yes" },
    { name: "Beagle", size: "mediano", energy: "medium", goodWithKids: "yes" },
    { name: "Labrador Retriever", size: "grande", energy: "high", goodWithKids: "yes" },
    { name: "Bulldog", size: "mediano", energy: "low", goodWithKids: "yes" },
    { name: "Poodle", size: "mediano", energy: "high", goodWithKids: "yes" },
    { name: "Dachshund", size: "pequeño", energy: "medium", goodWithKids: "no" },
    { name: "Boxer", size: "grande", energy: "high", goodWithKids: "yes" },
    { name: "Siberian Husky", size: "grande", energy: "high", goodWithKids: "yes" },
    { name: "Yorkshire Terrier", size: "pequeño", energy: "medium", goodWithKids: "no" },
    { name: "French Bulldog", size: "mediano", energy: "low", goodWithKids: "yes" },
    { name: "Cocker Spaniel", size: "mediano", energy: "medium", goodWithKids: "yes" },
    { name: "Shih Tzu", size: "pequeño", energy: "low", goodWithKids: "yes" },
    { name: "Rottweiler", size: "grande", energy: "high", goodWithKids: "yes" },
    { name: "Pug", size: "pequeño", energy: "low", goodWithKids: "yes" }
];

// Cargar la primera pregunta
loadQuestion();

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;

    const buttons = document.querySelectorAll('#questions-panel button');
    buttons.forEach((button, index) => {
        if (currentQuestion.answers[index]) {
            button.innerText = currentQuestion.answers[index];
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
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Carga la siguiente pregunta
    } else {
        //document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
        document.getElementById('restart-button').style.display = 'inline'; // Muestra el botón de reinicio
        document.getElementById('questions-panel').innerHTML = "<p>¡Hemos encontrado los perros ideales para ti!</p>";
    }
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
        if (matches == true)
        {
            card.classList.remove('hidden'); // Show matching dogs
        }
        else
        {
            card.classList.add('hidden'); // Hide non-matching dogs
        }
        /*card.style.display = matches ? 'block' : 'none';*/
    });
}

function restartQuiz() {
    location.reload();
}