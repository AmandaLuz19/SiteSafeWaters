// Exemplo simples de função para botão

function learnMore() {
    window.location.href = 'aplicativo.html';
}

const carouselContainer = document.querySelector('.carousel-container');
let currentIndex = 0;
const totalImages = document.querySelectorAll('.carousel-container img').length;

function slideCarousel() {
    currentIndex++;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    const translateXValue = -currentIndex * 200; 
    carouselContainer.style.transform = `translateX(${translateXValue}px)`;
}

setInterval(slideCarousel, 3000); // Alterar imagens a cada 3 segundos

/*
// Verificar se o user está logado
if (sessionStorage.getItem("isLoggedIn")) {
    // Se estiver logado, redireciona para a página inicial
    window.location.href = "index.html";
}

// Exibir menu de usuário ao clicar no ícone
document.getElementById("userIcon").addEventListener("click", function () {
    const userMenu = document.getElementById("userMenu");
    userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("isLoggedIn");  // Remove flag de login
    window.location.href = "login.html";  // Redireciona para a página de login
});
*/