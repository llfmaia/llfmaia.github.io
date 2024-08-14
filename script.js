//________________________________________________________
//  IFMG-Handbook
//  Author - Leandro Lima Fagundes Maia
//  Created Date: 2/09/2024
//________________________________________________________

// Seleciona o elemento de mensagens do chat
const chatMessages = document.getElementById('chatMessages');

// Seleciona o elemento de seleção de perguntas
const questionSelect = document.getElementById('questionSelect');

// Seleciona o botão de enviar
const sendButton = document.getElementById('sendButton');
const body = document.body;

// Objeto com respostas predefinidas para diferentes perguntas
const answers = {
    testRepose: {
        text: "Para solicitar uma nova prova, você precisa enviar um pedido formal ao seu professor dentro de 48 horas após a data original da prova.",
        link: "https://example.com/new-test-request",
        linkCaption: "Teste",  // Link added here
        video: null,
        caption: null,
        image: "./assets/images/protocolo.png"
    },
    library: {
        text: "Você pode acessar a biblioteca usando seu cartão de estudante. A biblioteca está aberta de segunda a sexta das 8h às 20h e aos sábados das 9h às 13h.",
        link: "https://example.com/new-test-request",
        linkCaption: "Clique aqui",
        video: "https://example.com/library-tour.mp4",
        caption: "Tour virtual da biblioteca",
    },
    schedule: {
        text: "O seu horário de aulas pode ser encontrado no portal do estudante do IFMG.",
        link: "https://ifmg.example.com/student-portal",  // Link added here
        video: null,
        linkCaption: null,
        caption: null
    },
    advisorMeeting: {
        text: "Para agendar uma reunião com seu orientador, use o sistema de agendamento online no site do IFMG.",
        link: "https://example.com/advisor-meeting",
        linkCaption: null,  // Link added here
        video: "https://example.com/advisor-meeting-tutorial.mp4",
        caption: "Tutorial: Agendando uma reunião"
    },
};

// Adiciona um evento ao botão de enviar que é ativado ao ser clicado
sendButton.addEventListener('click', () => {
    const selectedQuestion = questionSelect.value;
    if (selectedQuestion) {
        const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
        addMessage({ text: userMessage }, 'user-message');
        
        setTimeout(() => {
            const botResponse = answers[selectedQuestion];
            addMessage(botResponse, 'bot-message');
        }, 500);

        questionSelect.value = "";
    }
});

// Adiciona um evento ao botão de enviar que é ativado ao clicar na Tecla Enter
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const selectedQuestion = questionSelect.value;
        if (selectedQuestion) {
            const userMessage = questionSelect.options[questionSelect.selectedIndex].text;
            addMessage({ text: userMessage }, 'user-message');
            
            setTimeout(() => {
                const botResponse = answers[selectedQuestion];
                addMessage(botResponse, 'bot-message');
            }, 500);
    
            questionSelect.value = "";
        }
    }
});


// Função para adicionar uma mensagem ao chat
function addMessage(response, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    // Create a div for the text
    const textDiv = document.createElement('div');
    textDiv.classList.add('message-text');
    textDiv.textContent = response.text;
    contentDiv.appendChild(textDiv);

    if (response.video) {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');
        
        const videoElement = document.createElement('video');
        videoElement.src = response.video;
        videoElement.controls = true;
        videoContainer.appendChild(videoElement);
        
        if (response.caption) {
            const captionElement = document.createElement('div');
            captionElement.classList.add('video-caption');
            captionElement.textContent = response.caption;
            videoContainer.appendChild(captionElement);
        }
        
        contentDiv.appendChild(videoContainer);
    }

    if (response.image) {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add('image-container');
        
        const imageElement = document.createElement("img")
        imageElement.classList.add('clickable-image')
        imageElement.src = response.image;
        imageContainer.appendChild(imageElement);
        contentDiv.appendChild(imageContainer)
    }

    if (response.link) {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('message-link');

        const linkElement = document.createElement('a');
        linkElement.href = response.link;
        linkElement.textContent = response.linkCaption;  
        linkElement.target = '_blank';  

        linkDiv.appendChild(linkElement);
        contentDiv.appendChild(linkDiv);
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    enableFullScreenOnClick();
}

// Função para configurar o modo escuro ou claro
function setDarkMode(isDark) {
    if (isDark) {
        // Adiciona a classe de modo escuro ao corpo
        body.classList.add('dark-mode');
    } else {
        // Remove a classe de modo escuro do corpo
        body.classList.remove('dark-mode');
    }
    // Alterna a visibilidade dos logos
    toggleLogos(isDark);
}

// Função para alternar a visibilidade dos logos dependendo do modo
function toggleLogos(isDark) {
    const logoLight = document.querySelector('.logo-light');
    const logoDark = document.querySelector('.logo-dark');
    if (isDark) {
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
    } else {
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
    }
}

// Verifica a preferência do sistema para o modo de cor
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
setDarkMode(prefersDarkScheme.matches);

// Adiciona um ouvinte para mudanças na preferência do sistema
prefersDarkScheme.addEventListener('change', event => {
    setDarkMode(event.matches);
});


// Function to handle image click for full-screen mode
// Function to handle image click for full-screen mode
function enableFullScreenOnClick() {
    const images = document.querySelectorAll('.clickable-image');

    images.forEach(image => {
        image.addEventListener('click', (event) => {
            event.stopPropagation();

            // Create a full-screen container
            const fullScreenDiv = document.createElement('div');
            fullScreenDiv.classList.add('fullscreen-image');

            // Create an image element for full-screen
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.classList.add('animate-image');  // Add animation class

            // Create a close button (X)
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.textContent = 'X';

            // Add event listener for closing the full-screen
            closeButton.addEventListener('click', () => {
                imgElement.classList.remove('animate-image');  // Reverse animation
                fullScreenDiv.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(fullScreenDiv);
                }, 300); // Wait for animation to complete before removing
            });

            // Add event listener for the Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    imgElement.classList.remove('animate-image');  // Reverse animation
                    fullScreenDiv.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(fullScreenDiv);
                    }, 300); // Wait for animation to complete before removing
                }
            });

            fullScreenDiv.appendChild(imgElement);
            fullScreenDiv.appendChild(closeButton);
            document.body.appendChild(fullScreenDiv);

            // Trigger the animation after adding to the DOM
            setTimeout(() => {
                fullScreenDiv.style.opacity = '1';
                imgElement.style.transform = 'scale(1)';
            }, 0);
        });
    });
}

// Call the function to activate full-screen feature
enableFullScreenOnClick();  