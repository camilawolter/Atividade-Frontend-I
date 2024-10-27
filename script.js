let documentoLink = '';

function configurarArrastarSoltar() {
  const dropArea = document.getElementById('drop-area');

  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
  });

  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('active');
    const file = event.dataTransfer.files[0];

    if (file) {
      documentoLink = URL.createObjectURL(file);
      dropArea.innerText = `Documento adicionado: ${file.name}`;
    }
  });
}

function validarFormulario() {
  const campos = ['nome', 'sobrenome', 'rg', 'cpf', 'emailCadastro', 'dataNascimento', 'cidade'];
  let valido = true;

  campos.forEach(campoId => {
    const campo = document.getElementById(campoId);
    if (!campo.value) {
      alert(`Por favor, preencha o campo: ${campo.name || campoId}`);
      valido = false;
    }
  });

  if (!documentoLink) {
    alert("Por favor, adicione um documento.");
    valido = false;
  }

  return valido;
}

function salvarDados() {
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const rg = document.getElementById('rg').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('emailCadastro').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const cidade = document.getElementById('cidade').value;
  
  if (!validarFormulario()) return;
  
  const dadosUsuario = {
    nome,
    sobrenome,
    rg,
    cpf,
    email,
    dataNascimento,
    cidade,
    documento: documentoLink
  };
  localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  alert("Dados Cadastrados");
}

function exibirDados() {
  const dados = JSON.parse(localStorage.getItem("usuario"));
  if (dados) {
    const dadosSalvos = `
      <strong>Dados salvos:</strong><br>
      Nome: ${dados.nome} ${dados.sobrenome} </br>
      RG: ${dados.rg} </br>
      CPF: ${dados.cpf} </br>
      Email: ${dados.email} </br>
      Data de Nascimento: ${dados.dataNascimento} </br>
      Cidade: ${dados.cidade} </br>
      Documento: <a href="${dados.documento}" target="_blank">Acessar Documento</a></br>`;
    document.getElementById('dadosSalvos').innerHTML = dadosSalvos;
  }
}

function exibirEscolhasFavoritas() {
  const cor = document.getElementById('color').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const range = document.getElementById('range').value;
  const url = document.getElementById('url').value;

  const escolhasFavoritas = `
    Suas Escolhas Favoritas: </br>
    Cor Favorita: ${cor} </br>
    Data do Show Favorita: ${data} </br>
    Horário Ideal do Show: ${hora} </br>
    Classificação do Álbum: ${range} </br>
    Post Favorito: <a href="${url}" target="_blank">${url}</a></br>`;
    
  document.getElementById('escolhasFavoritas').innerHTML = escolhasFavoritas;
}

document.addEventListener("DOMContentLoaded", configurarArrastarSoltar);
