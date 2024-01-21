function validar_nome() {
    let input_nome = document.getElementById('nome');
    let mensagem = document.getElementById('mensagem_nome');

    if (input_nome.value.length < 5) {
        exibir_mensagemERRO(input_nome, mensagem, 'Seu nome precisa ter mais que 5 caracteres!');
        input_nome.focus();
        return false;
    }
    else if (input_nome.value.startsWith(' ') || input_nome.value.endsWith(' ')) {
        exibir_mensagemERRO(input_nome, mensagem, 'Remova os espaços em branco tanto no início quanto no fim do seu nome!');
        input_nome.focus();
        return false;
    }
    else {
        limpar_mensagemERRO(input_nome, mensagem);
        return true;
    }
}

function validar_idade() {
    let input_idade = document.getElementById('idade');
    let mensagem = document.getElementById('mensagem_idade');

    if(input_idade.value < 14 || input_idade.value > 75) {
        exibir_mensagemERRO(input_idade, mensagem, 'Idade deve ser entre 14 e 75 anos!');
        input_idade.focus();
        return false;
    } else {
        limpar_mensagemERRO(input_idade, mensagem);
        return true;
    }
}

function validar_email() {
    let input_email = document.getElementById('email');
    let email_value = document.getElementById('email').value;
    let mensagem = document.getElementById('mensagem_email');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let email_valido = emailRegex.test(email_value);
    if(!email_valido) {
        exibir_mensagemERRO(input_email, mensagem, 'Email deve seguir a estrutura: user@dominio.com!');
        input_email.focus();
        return false;
    } else {
        limpar_mensagemERRO(input_email, mensagem);
        return true;
    }
}

function validar_senha() {
    let input_senha = document.getElementById('senha');
    let senha_value = document.getElementById('senha').value;
    let mensagem = document.getElementById('mensagem_senha');
    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    let senha_valida = senhaRegex.test(senha_value);
    if(!senha_valida) {
        exibir_mensagemERRO(input_senha, mensagem, 'Senha deve ter no mínimo 8 caracteres com pelo menos 1 letra minúscula, 1 letra maiúscula, 1 caracter especial e 1 decimal!');
        input_senha.focus();
        return false;
    } else {
        limpar_mensagemERRO(input_senha, mensagem);
        return true;
    }
}

function validar_endereco() {
    let input_endereco = document.getElementById('endereco');
    let mensagem = document.getElementById('mensagem_endereco');

    if (input_endereco.value.length < 5) {
        exibir_mensagemERRO(input_endereco, mensagem, 'Endereço deve ter, no mínimo, 5 caracteres!');
        input_endereco.focus();
        return false;
    } else {
        limpar_mensagemERRO(input_endereco, mensagem);
        return true;
    }
}

function validar_informacoes() {
    let input_outros = document.getElementById('outros');
    let mensagem = document.getElementById('mensagem_outros');

    if(input_outros.value.length > 50) {
        exibir_mensagemERRO(input_outros, mensagem, 'Informações extras precisam ter menos que 35 caracteres!');
        input_outros.focus();
        return false;
    } else {
        limpar_mensagemERRO(input_outros, mensagem);
        return true;
    }
}

function validar_textareas(id, mensagemId){
    let textarea = document.getElementById(id);
    const mensagem = document.getElementById(mensagemId);
    if (textarea.value.length < 5 || textarea.value.length > 450) {
        exibir_mensagemERRO(textarea, mensagem, 'Este campo precisa ter entre 5 e 450 caracteres!');
        textarea.focus();
        return false;
    } else {
        limpar_mensagemERRO(textarea, mensagem);
        return true;
    }
}

function validar_geral() {
    let nome_ok = validar_nome();
    let idade_ok = validar_idade();
    let email_ok = validar_email();
    let senha_ok = validar_senha();
    let endereco_ok = validar_endereco();
    let info_ok = validar_informacoes();
    let interesses_ok = validar_textareas('interesses', 'mensagem_interesses');
    let sentimentos_ok = validar_textareas('sentimentos', 'mensagem_sentimentos');
    let valores_ok = validar_textareas('valores', 'mensagem_valores');

    return nome_ok && idade_ok && email_ok && senha_ok && endereco_ok && info_ok && interesses_ok && sentimentos_ok && valores_ok;
}

/* -------------------------------------------------------------------------------------------------------- */
//funcoes secundarias

function exibir_mensagemERRO(input, mensagem, texto_erro) {
    mensagem.textContent = texto_erro;
    mensagem.style.color = 'red';
    input.style.borderColor = 'red';
}

function limpar_mensagemERRO(input, mensagem) {
    mensagem.textContent = '';
    input.style.borderColor = 'green';
}

function mostrar_modal() {
    document.getElementById('alerta-background').style.display = 'block';
    console.log('essa porra tasendo chamada')
}

function fechar_modal() {
    document.getElementById('alerta-background').style.display = 'none';
}

function limpar_inputs() {
    let inputs = document.querySelectorAll('input');
    let textareas = document.querySelectorAll('textarea');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    for (let i = 0; i < textareas.length; i++) {
        textareas[i].value = "";
    }
}


