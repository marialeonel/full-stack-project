//GET) geral
function renderUsers(users) {
  const tableBody = document.getElementById('api-data-place');
  tableBody.innerHTML = '';

  users.forEach(user => {
    const row = tableBody.insertRow();
    row.id = `row_${user.id}`;

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = user.nome;
    cell1.addEventListener('click', () => get_userDetailsGET(user.id));

    cell2.innerHTML = user.email;
    cell3.innerHTML = user.ativo ? 'Ativo' : 'Inativo';

    const updateButton = createButton('update-button', 'update');
    updateButton.addEventListener('click', () => get_userDetailsPUT(user.id));
    cell4.appendChild(updateButton);

    const deleteButton = createButton('delete-button', 'delete');
    deleteButton.addEventListener('click', () => get_userDetailsDELETE(user.id));
    cell5.appendChild(deleteButton);
  });
}

// Função para buscar usuários por nome
function searchByName() {
  const searchTerm = document.getElementById('input-busca').value;

  if (!searchTerm) {
    console.error('O termo de pesquisa está vazio.');
    return;
  }

  service.get('opCuriosidade/search_user', { nome: searchTerm })
    .then(data => {
      console.log(data);
      const filteredUsers = data.filter(user => user.nome.toLowerCase().includes(searchTerm));

      if (filteredUsers.length === 0) {
        const mensagem = document.getElementById('mensagem-modal');
        mensagem.textContent = 'Nome digitado não existe. Tente novamente!';
        mostrar_modal();
      } else {
        renderUsers(filteredUsers);
      }
    })
    .catch(error => {
      console.error('Erro desconhecido:', error);

      const mensagem = document.getElementById('mensagem-modal');
      mensagem.textContent = 'Ocorreu um erro ao buscar o usuário. Tente novamente mais tarde.';
      mostrar_modal();
    });
}


function load() {
  service.get(`opCuriosidade/getAll`, { page: 1, quantity: 10 })
    .then(data => {
      console.log('Dados da API:', data);
      ShowUserName();
      renderUsers(data);
    });
}
//-----------------------------------------------------------------------------------------------
//GET) Dashboard - Total
function getValueDashboard() {
  service.get('opCuriosidade/registers_total')
  .then(data => {
    console.log('Número total de cadastros: ' + data);
    document.getElementById('total-mobile').textContent = parseInt(data);
    document.getElementById('total-cadastros').textContent = parseInt(data);
  });
}

//GET) DashBoard -TotalForCurrentMonth
function getMonthDashboard() {
  service.get('opCuriosidade/registers_current_month')
  .then(data => {
    console.log('Numero dos cadastros recentes: ' + data);
    document.getElementById('recentes-mobile').textContent = parseInt(data);
    document.getElementById('recentes').textContent = parseInt(data);
  });
}

//GET) search by an ID
function get_userDetailsGET(userId_get) {
  service.get(`opCuriosidade/getOneUser/${userId_get}`)
  .then(user => {
    console.log(user);
    document.getElementById('userId-get').value = userId_get;
    document.getElementById('h2-nome').textContent = user.nome;
    document.getElementById('p-idade').textContent = parseInt(user.idade);
    document.getElementById('p-email').textContent = user.email;
    document.getElementById('p-endereco').textContent = user.endereco;
    document.getElementById('p-outros').textContent = user.outros;
    document.getElementById('p-interesses').textContent = user.interesses;
    document.getElementById('p-sentimentos').textContent = user.sentimentos;
    document.getElementById('p-valores').textContent = user.valores;

    background_flex('information');

  })
  .catch(error => {
    console.error(`Erro ao obter detalhes do usuário: ${error}`);
  });
}

//GET) search by an ID
function get_userDetailsPUT(userId_update) { 
  service.get(`opCuriosidade/getOneUser/${userId_update}`)
  .then(user => {
    console.log(user);
    document.getElementById('userId-update').value = userId_update;
    document.getElementById('nome').value = user.nome;
    document.getElementById('idade').value = parseInt(user.idade);
    document.getElementById('email').value = user.email;
    document.getElementById('senha').value = user.senha;
    document.getElementById('endereco').value = user.endereco;
    document.getElementById('outros').value = user.outros;
    document.getElementById('interesses').value = user.interesses;
    document.getElementById('sentimentos').value = user.sentimentos;
    document.getElementById('valores').value = user.valores;
    
    background_flex('update');

  }) 
  .catch(error => {
    console.error(`Erro ao obter detalhes do usuário: ${error}`);
  });
}

function get_userDetailsDELETE(userId_delete) {
  service.get(`opCuriosidade/getOneUser/${userId_delete}`)
  .then(user => {
    document.getElementById('userId-delete').value = userId_delete;
    background_flex('delete');

  })
  .catch(error => {
    console.error(`Erro ao obter detalhes do usuário: ${error}`);
  });
}

//POST
async function register() {
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const endereco = document.getElementById('endereco').value;
  const outros = document.getElementById('outros').value;
  const interesses = document.getElementById('interesses').value;
  const sentimentos = document.getElementById('sentimentos').value;
  const valores = document.getElementById('valores').value;
  const ativo = document.getElementById('button-radio').checked;

  const user = {
    nome: nome,
    idade: parseInt(idade),
    email: email,
    senha: senha,
    endereco: endereco,
    outros: outros,
    interesses: interesses,
    sentimentos: sentimentos,
    valores: valores,
    ativo: ativo
  };

  service.post('opCuriosidade', user)
  .then(data => {
    console.log('Sucesso na requisição de POST:', data);
    const mensagem = document.getElementById('mensagem-modal');
    mensagem.textContent = 'Cadastro realizado com sucesso!';
    mostrar_modal();

  }) 
  .catch(error => {
    if (error instanceof UIError) {
      console.error(`Erro na solicitação de pesquisa: ${error.status} - ${error.statusText}`);
      const mensagem = document.getElementById('mensagem-modal');
      mensagem.textContent = 'Cadastro não aconteceu, provavelmente esse usuário já existe. Tente novamente!';
      mostrar_modal();

    } else {
      console.error('Erro desconhecido:', error);
    }
  });
}

// PUT
function updateUser(userId) {
  const new_name = document.getElementById('nome').value;
  const new_idade = document.getElementById('idade').value;
  const new_email = document.getElementById('email').value;
  const new_senha = document.getElementById('senha').value;
  const new_endereco = document.getElementById('endereco').value;
  const new_outros = document.getElementById('outros').value;
  const new_interesses = document.getElementById('interesses').value;
  const new_sentimentos = document.getElementById('sentimentos').value;
  const new_valores = document.getElementById('valores').value;

  const updatedUser = {
    id: userId,
    nome: new_name,
    idade: new_idade,
    email: new_email,
    senha: new_senha,
    endereco: new_endereco,
    outros: new_outros,
    interesses: new_interesses,
    sentimentos: new_sentimentos,
    valores: new_valores
  };

  console.log(updatedUser);
  
  //debugger
  service.put(`opCuriosidade/updateUser/${updatedUser.id}`, updatedUser)
  .then(data => {
    //debugger
    console.log(data);
    updateTableRow(updatedUser);

    const mensagem = document.getElementById('mensagem-modal');
    mensagem.textContent = 'Dados atualizados com sucesso!';
    mostrar_modal();
    background_none('update');

  })
  .catch(error => {
    if (error instanceof UIError) {
      console.error(`Erro na solicitação de pesquisa: ${error.status} - ${error.statusText}`);
      const mensagem = document.getElementById('mensagem-modal');
      mensagem.textContent = 'Erro desconhecido ocorreu no momento de atualização. Tente novamente!';
      mostrar_modal();

    } else {
      console.error('Erro desconhecido:', error);
    }
  });
}

// DELETE
function remove(userId) {
  service.delete('opCuriosidade/deleteUser', { id: userId })
  .then(() => {
    console.log('Usuário removido com sucesso!');
    const rowToRemove = document.getElementById(`row_${userId}`);
    if (rowToRemove) {
      rowToRemove.remove();
      setTimeout(() => {
        document.getElementById('delete-background').style.display = 'none';
      }, 1000);

    } else {
      console.error(`Não foi possível encontrar a linha com ID ${userId}`);
    }
  })
  .catch(error => {
    if (error instanceof UIError) {
      console.error(`Erro na solicitação de pesquisa: ${error.status} - ${error.statusText}`);
      const mensagem = document.getElementById('mensagem-modal');
      mensagem.textContent = 'Erro desconhecido ocorreu no momento de exclusão. Tente novamente!';
      mostrar_modal();

    } else {
      console.error('Erro desconhecido:', error);
    }
  });
}

/* Funções secundárias - usadas nas funções principais */
function paginaAnterior() {
  if (pagina_atual > 1) {
    pagina_atual--;
    dados_carregados = false;
    load();
  }
}

function proximaPagina() {
  if (!dados_carregados) { 
    pagina_atual++;
    load();
  }
}

function ShowUserName() {
  let userData = sessionStorage.getItem('userData');
  userData = JSON.parse(userData);

  let userNameCompleto = userData.nome;

  let namesPages = document.getElementsByClassName('nome-user');
  for(i = 0; i < namesPages.length; i++) {
    namesPages[i].innerHTML = ShowFirstLastName(userNameCompleto);
  }
}

function ShowFirstLastName(nomeCompleto) {
  const palavras = nomeCompleto.split(' ');

  if (palavras.length >= 2) {
    const primeiroNome = palavras[0];
    const ultimoNome = palavras[palavras.length - 1];

    return `${primeiroNome} ${ultimoNome}`;

  } else {
    return nomeCompleto;
  }
}

function createButton(className, iconName) {
  const button = document.createElement('button');
  button.className = className;
  button.innerHTML = `<span class="material-symbols-outlined">${iconName}</span>`;
  return button;
}

function updateTableRow(updatedUser) {
  console.log(updatedUser);
  const tableRows = document.querySelectorAll('#api-data-place tr');

  tableRows.forEach(row => {
    if (row.id === `row_${updatedUser.id}`) {
      row.cells[0].textContent = updatedUser.nome;
      row.cells[1].textContent = updatedUser.email;
    }
  });
}

function background_flex(backgroundName) {
  const backgroundElement = document.getElementById(`${backgroundName}-background`);
  backgroundElement.style.display = 'flex';
}

function background_none(backgroundName) {
  const backgroundElement = document.getElementById(`${backgroundName}-background`);
  backgroundElement.style.display = 'none';
}