'use strict'

import {
  lerContatos,
  criarContato,
  deletarContato,
  atualizarContato
} from './script.js'

let contatoSelecionado = null

const mainElement = document.querySelector('main')
const container = document.getElementById('container')

async function carregarContatos() {
  const contatos = await lerContatos()
  container.innerHTML = ''

  contatos.forEach(contato => {
    const card = document.createElement('div')
    card.classList.add('card-contato')

    card.innerHTML = `
      <img src="${contato.foto}">
      <h2>${contato.nome}</h2>
      <p><strong>Celular:</strong> ${contato.celular}</p>
    `

    card.onclick = () => selecionarContato(contato)

    container.appendChild(card)
  })
}

function selecionarContato(contato) {
  contatoSelecionado = contato
  preencherFormulario(contato)

  mainElement.classList.remove('card-show')
  mainElement.classList.add('form-show')
}

function preencherFormulario(contato) {
  document.getElementById('nome').value = contato.nome
  document.getElementById('email').value = contato.email
  document.getElementById('celular').value = contato.celular
  document.getElementById('endereco').value = contato.endereco
  document.getElementById('cidade').value = contato.cidade
  document.getElementById('preview-image').src = contato.foto
}

function obterDadosFormulario() {
  return {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    celular: document.getElementById('celular').value,
    endereco: document.getElementById('endereco').value,
    cidade: document.getElementById('cidade').value,
    foto: document.getElementById('preview-image').src
  }
}

document.getElementById('novo-contato').onclick = () => {
  contatoSelecionado = null
  limparFormulario()

  mainElement.classList.remove('card-show')
  mainElement.classList.add('form-show')
}

document.getElementById('salvar').onclick = async () => {
  const dados = obterDadosFormulario()
  let ok = false

  if (contatoSelecionado) {
    ok = await atualizarContato(contatoSelecionado.id, dados)
    alert('Contato atualizado com sucesso!')
  } else {
    ok = await criarContato(dados)
    alert('Contato criado com sucesso!')
  }

  if (ok) location.reload()
  else alert('Erro ao salvar contato.')
}

document.getElementById('deletar').onclick = async () => {
  if (!contatoSelecionado) {
    alert('Selecione um contato!')
    return
  }

  const confirmar = confirm(
    `Deseja excluir "${contatoSelecionado.nome}"?`
  )

  if (!confirmar) return

  const ok = await deletarContato(contatoSelecionado.id)

  if (ok) {
    alert('Contato excluído com sucesso!')
    location.reload()
  } else {
    alert('Erro ao excluir contato.')
  }
}

document.getElementById('cancelar').onclick = () => {
  limparFormulario()
  contatoSelecionado = null

  mainElement.classList.remove('form-show')
  mainElement.classList.add('card-show')
}

document.getElementById('foto').onchange = event => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      document.getElementById('preview-image').src = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function limparFormulario() {
  document.querySelector('form').reset()
  document.getElementById('preview-image').src = './img/preview-icon.png'
}

carregarContatos()
