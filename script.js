let currentQuestionIndex = 0;
const filters = {}; // Objeto para almacenar los filtros seleccionados

const questions = [
    {
        question: "¿Cuánto espacio tienes disponible para tu perro?",
        answers: ["Pequeño", "Mediano", "Grande"]
    },
    {
        question: "¿Cuánto tiempo puedes dedicar a paseos diarios?",
        answers: ["Menos de 30 minutos", "30 minutos a 1 hora", "Más de 1 hora"]
    },
    {
        question: "¿Tienes niños en casa?",
        answers: ["Sí", "No"]
    }
];

// Array de razas de perros con sus características
const dogBreeds = [
    { name: "Chihuahua", size: "pequeño", energy: "bajo", goodWithKids: "no", image: "perro1.jpg" },
    { name: "Golden Retriever", size: "grande", energy: "alto", goodWithKids: "sí", image: "perro2.jpg" },
    { name: "Beagle", size: "mediano", energy: "medio", goodWithKids: "sí", image: "perro3.jpg" },
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
            button.onclick = () => answerQuestion(currentQuestion.answers[index]);
        } else {
            button.style.display = 'none';
        }
    });
}

function answerQuestion(answer) {
    // Almacena la respuesta seleccionada
    if (currentQuestionIndex === 0) {
        filters.size = answer.toLowerCase();
    } else if (currentQuestionIndex === 1) {
        filters.energy = answer.toLowerCase();
    } else if (currentQuestionIndex === 2) {
        filters.goodWithKids = answer === "Sí" ? "sí" : "no";
    }

    // Filtra los perros según las respuestas acumuladas
    filterDogs();

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Carga la siguiente pregunta
    } else {
        document.getElementById('questions-panel').style.display = 'none'; // Oculta el panel de preguntas
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
        if (filters.size && dog.size !== filters.size) {
            matches = false;
        }
        if (filters.energy && dog.energy !== filters.energy) {
            matches = false;
        }
        if (filters.goodWithKids && dog.goodWithKids !== filters.goodWithKids) {
            matches = false;
        }

        // Muestra u oculta la tarjeta del perro según el filtro
        card.style.display = matches ? 'block' : 'none';
    });
}

function restartQuiz() {
    location.reload();
}