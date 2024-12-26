const formulario = document.querySelector("#loginForm");
const iusuario = document.querySelector(".usuario");
const isenha = document.querySelector(".senha");

function login() {
    fetch("http://localhost:8080/login", 
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            usuario: iusuario.value,
            senha: isenha.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('loginCompleto').innerText = 'Login realizado com sucesso!';
            sessionStorage.setItem("isLoggedIn", true);
            window.location.href = 'index.html';
        } else {
            document.getElementById('loginCompleto').innerText = 'Nome de usuário ou senha incorretos!';
        }
    })
    .catch(error => console.log('Erro:', error));
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    login();
});

document.getElementById('toggleSenha').addEventListener('click', function () {
    const senhaInput = document.getElementById('senha');
    const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', type);

    const icon = this.querySelector('.material-icons');
    icon.textContent = icon.textContent === 'visibility' ? 'visibility_off' : 'visibility';
});

