const formulario = document.querySelector("form");
const botao = document.querySelector("button");
const inome = document.querySelector(".nome");
const iusuario = document.querySelector(".usuario");
const iidade = document.querySelector(".idade");
const icpf = document.querySelector(".cpf");
const iemail = document.querySelector(".email");
const isenha = document.querySelector(".senha");
const iconfirmarsenha = document.querySelector(".confirmarsenha");


function cadastrar() {
  fetch("http://localhost:8080/cadastros",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        nome: inome.value,
        usuario: iusuario.value,
        idade: iidade.value,
        cpf: icpf.value,
        email: iemail.value,
        senha: isenha.value
      })
    })
    .then(function (res) { console.log(res) })
    .catch(function (res) { console.log(res) })
};

function limpar() {
  inome.value = "",
  iusuario.value = "",
  iidade.value = "",
  icpf.value = "",
  iemail.value = "",
  isenha.value = "",
  iconfirmarsenha.value = ""
}

formulario.addEventListener("submit", function (event){
    event.preventDefault();
    cadastrar();
    limpar();

    clearErrors();

    if (!nome) {
        showError('nomeError', 'Nome é obrigatório');
        valid = false;
    } else if (nome.length < 3 || nome.length > 35) {
        showError('nomeError', 'Nome deve ter entre 3 e 35 caracteres');
        valid = false;
    }

    if (!usuario) {
        showError('usuarioError', 'Nome de Usuário é obrigatório');
        valid = false;
    } else if (!validateNomeUsuario(usuario)) {
        showError('usuarioError', 'Nome de Usuário deve ter no mínimo 4 letras, no máximo 4 números e não conter caracteres especiais.');
        valid = false;
    }

    if (!idade || idade < 17 || idade > 120) {
        showError('idadeError', 'Idade deve estar entre 17 e 120');
        valid = false;
    }

    if (!cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        showError('cpfError', 'CPF deve seguir o padrão 123.456.789-00');
        valid = false;
    }

    if (!email) {
        showError('emailError', 'E-Mail é obrigatório');
        valid = false;
    } else if (email.length > 40) {
        showError('emailError', 'E-Mail deve ter até 40 caracteres');
        valid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'E-Mail inválido');
        valid = false;
    }

    if (!senha) {
        showError('senhaError', 'Senha é obrigatória');
        valid = false;
    } else if (!validatePassword(senha)) {
        showError('senhaError', 'Senha deve ter entre 8 e 16 caracteres, incluindo número, 1 letra maiúscula e 1 caractere especial');
        valid = false;
    }

    if (!confirmarsenha) {
        showError('confirmarsenhaError', 'Confirmar Senha é obrigatória');
        valid = false;
    } else if (senha !== confirmarsenha) {
        showError('confirmarsenhaError', 'Suas senhas devem ser iguais');
        valid = false;
    }

    if (valid) {
        document.getElementById('cadastroCompleto').innerText = 'O seu cadastro está completo!';
        document.getElementById('cadastroForm').reset();
    }
});

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.innerText = '');
}

function showError(id, message) {
    document.getElementById(id).innerText = message;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const minLength = 8;
    const maxLength = 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && password.length <= maxLength && hasLetter && hasNumber && hasSpecialChar && hasUpperCase;
}

function validateNomeUsuario(usuario) {
    const regex = /^[a-zA-Z]{4,}\d{0,4}$/;
    return regex.test(usuario);
}

document.getElementById('toggleSenha').addEventListener('click', function () {
    const senhaInput = document.getElementById('senha');
    const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', type);

    const icon = this.querySelector('.material-icons');
    icon.textContent = icon.textContent === 'visibility' ? 'visibility_off' : 'visibility';
});

document.getElementById('toggleConfirmarSenha').addEventListener('click', function () {
    const confirmarsenhaInput = document.getElementById('confirmarsenha');
    const type = confirmarsenhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmarsenhaInput.setAttribute('type', type);

    const icon = this.querySelector('.material-icons');
    icon.textContent = icon.textContent === 'visibility' ? 'visibility_off' : 'visibility';
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const cadastroCompleto = document.getElementById('cadastroCompleto');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        cadastroCompleto.style.display = 'flex';
        cadastroCompleto.querySelector('p').textContent = 'Cadastro realizado com sucesso!';

        form.reset();

        setTimeout(() => {
            cadastroCompleto.style.display = 'none';
        }, 5000); 
    });
});

