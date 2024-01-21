function acessar(event) {
    event.preventDefault();

    let input_email = document.getElementById('login');
    let input_senha = document.getElementById('senha');

    const credentials = {
        Email: input_email.value,
        Senha: input_senha.value,
    }

    service.post('opCuriosidade/validate', credentials)
    .then(data => {
        console.log(data);
        sessionStorage.setItem('userData', JSON.stringify(data));

        input_email.style.borderColor = "green";
        input_senha.style.borderColor = "green";
        exibir_mensagemCorreta("mensagem-login", "mensagem-senha");
        document.location.href = "../home/home.html"; 
    })
    .catch(error => {
        console.error('Erro ao encontrar o usuário:', error);
        input_email.style.borderColor = "red";
        input_senha.style.borderColor = "red";
        exibir_mensagemErrada("mensagem-senha", "Usuário não existe ou suas credenciais estão incorretas.");
        document.getElementById('link-acesso').href = ""; 
    });
}

function exibir_mensagemCorreta(id1, id2) {
    document.getElementById(id1).textContent = "";
    document.getElementById(id2).textContent = "";
}

function exibir_mensagemErrada(id, mensagem) {
    document.getElementById(id).textContent = mensagem;
}
