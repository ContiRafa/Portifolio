// --- Perguntas do Quiz (Tema: Violet Evergarden - Nível Progressivo) ---
const questions = [
    // 1. NÍVEL FÁCIL
    {
        question: "Qual era a única frase que Violet queria entender durante a maior parte da série?",
        options: ["Eu te protegerei.", "Eu te amo.", "Eu sou sua.", "Qual o meu valor?"],
        answer: "Eu te amo.",
        userAnswer: null
    },
    // 2. NÍVEL MÉDIO
    {
        question: "Qual o nome da garota com luvas de renda, colega de trabalho de Violet, que ensina sobre o amor e ciúmes?",
        options: ["Iris Cannary", "Luculia Marlborough", "Cattleya Baudelaire", "Erica Brown"],
        answer: "Cattleya Baudelaire",
        userAnswer: null
    },
    // 3. NÍVEL MÉDIO
    {
        question: "Na história do dramaturgo Oscar Webster, qual o nome da filha falecida que inspirou a peça dele?",
        options: ["Anne", "Olivia", "Clara", "Lucia"],
        answer: "Olivia",
        userAnswer: null
    },
    // 4. NÍVEL DIFÍCIL
    {
        question: "Qual é o nome da doença terminal que afeta a mãe (Clara) da pequena Anne, na famosa história das 50 cartas?",
        options: ["Câncer de Pulmão", "Anemia Crônica", "Tuberculose", "Doença do Lótus"],
        answer: "Doença do Lótus",
        userAnswer: null
    },
    // 5. NÍVEL DIFÍCIL
    {
        question: "Qual é o nome do país rival com o qual o Major General Alistair sela a paz no Acordo, que encerra a Guerra?",
        options: ["Centa", "Drossel", "Gardarik", "Astral"],
        answer: "Astral",
        userAnswer: null
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

// --- Elementos DOM ---
const telaInicial = document.getElementById('tela-inicial');
const quizArea = document.getElementById('quiz-area');
const iniciarMissaoBtn = document.getElementById('iniciar-missao');
const perguntaNumeroSpan = document.getElementById('pergunta-numero');
const perguntaTextoP = document.getElementById('pergunta-texto');
const opcoesRespostaDiv = document.getElementById('opcoes-resposta');
const feedbackDiv = document.getElementById('feedback');

// Novos elementos
const resultadosFinaisDiv = document.getElementById('resultados-finais');
const acertosFeedbackP = document.getElementById('acertos-feedback');
const tabelaResultadosTbody = document.getElementById('tabela-resultados');
const verSurpresaBtn = document.getElementById('ver-surpresa');

const mensagemRecompensaDiv = document.getElementById('mensagem-recompensa');


// --- Funções do Jogo ---

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Chama a nova função de revisão
        showReview();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    perguntaNumeroSpan.textContent = currentQuestionIndex + 1;
    perguntaTextoP.textContent = currentQuestion.question;
    opcoesRespostaDiv.innerHTML = ''; 
    feedbackDiv.innerHTML = ''; 

    const shuffledOptions = shuffle(currentQuestion.options.slice()); 

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-dark', 'btn-resposta');
        
        button.style.animation = `fadeInScale 0.5s ease-out ${0.1 * opcoesRespostaDiv.children.length}s both`;
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, currentQuestion.answer));
        opcoesRespostaDiv.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    Array.from(opcoesRespostaDiv.children).forEach(button => {
        button.disabled = true;
    });

    // ARMAZENA A RESPOSTA DO USUÁRIO NA QUESTÃO
    questions[currentQuestionIndex].userAnswer = selectedOption;

    if (selectedOption === correctAnswer) {
        correctAnswers++;
        feedbackDiv.innerHTML = '<span class="text-success animate-in">Certa Resposta! Otaku de elite!</span>';
        
        Array.from(opcoesRespostaDiv.children).find(btn => btn.textContent === selectedOption).classList.replace('btn-outline-dark', 'btn-success');
    } else {
        feedbackDiv.innerHTML = '<span class="text-danger animate-in">Errado... Mas não se preocupe, a gente assiste junto para treinar!</span>';
        
        Array.from(opcoesRespostaDiv.children).find(btn => btn.textContent === selectedOption).classList.replace('btn-outline-dark', 'btn-danger');
        
        const correctButton = Array.from(opcoesRespostaDiv.children).find(btn => btn.textContent === correctAnswer);
        if (correctButton) {
            correctButton.classList.replace('btn-outline-dark', 'btn-info');
        }
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1800); 
}

// NOVA FUNÇÃO: Exibe a tabela de revisão
function showReview() {
    // Oculta a área do quiz
    quizArea.classList.add('oculto');
    
    // Mostra a área de resultados
    resultadosFinaisDiv.classList.remove('oculto');
    resultadosFinaisDiv.classList.add('animate-in');

    // Monta a mensagem de acertos
    acertosFeedbackP.textContent = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;

    // Gera a tabela de revisão
    tabelaResultadosTbody.innerHTML = '';
    questions.forEach((q, index) => {
        const isCorrect = q.userAnswer === q.answer;
        const className = isCorrect ? 'table-success-anime' : 'table-danger-anime';
        
        const row = document.createElement('tr');
        row.classList.add(className);
        
        // Formata a resposta do usuário
        const userAnswerDisplay = q.userAnswer ? q.userAnswer : 'Não respondeu';

        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${q.question}</td>
            <td>${isCorrect ? '✅ ' + userAnswerDisplay : '❌ ' + userAnswerDisplay}</td>
            <td>${q.answer}</td>
        `;
        tabelaResultadosTbody.appendChild(row);
    });
}

// FUNÇÃO EXISTENTE MODIFICADA: Exibe a surpresa (o bilhete)
function showSurprise() {
    // Oculta a área de revisão
    resultadosFinaisDiv.classList.add('oculto');
    
    // Mostra o bilhete de recompensa
    mensagemRecompensaDiv.classList.remove('oculto');
    mensagemRecompensaDiv.classList.add('animate-in');
}


// --- Inicialização ---

iniciarMissaoBtn.addEventListener('click', () => {
    iniciarMissaoBtn.classList.remove('bounce');
    
    telaInicial.classList.add('oculto');
    
    quizArea.classList.remove('oculto');
    quizArea.classList.add('animate-in');
    
    loadQuestion();
});

// NOVO EVENTO: Clique no botão "VER SURPRESA"
verSurpresaBtn.addEventListener('click', () => {
    verSurpresaBtn.classList.remove('bounce');
    showSurprise();
});