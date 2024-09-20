let currentQuestionIndex = 0;
const filters = {}; // Objeto para almacenar los filtros seleccionados

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
        card.style.display = matches ? 'block' : 'none';
    });
}

function restartQuiz() {
    location.reload();
}