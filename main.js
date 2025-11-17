'use strict'

import { lerContatos, criarContato } from "./script.js"

async function carregarContatos() {
    const contatos = await lerContatos()

    const container = document.getElementById('container')

    container.innerHTML = ''

    contatos.forEach(contato => {
        const card = document.createElement('div')
        card.classList.add('card-contato')

        card.innerHTML = `
            <img src="${contato.foto}" alt="Foto de ${contato.nome}">
            <h2>${contato.nome}</h2>
            <p><strong>Celular:</strong> ${contato.celular}</p>
        `

        container.appendChild(card)
    })
}

async function criarContatos(){
    const contato = await criarContato()

    
}

const btnNovoContato = document.getElementById('novo-contato');
const btnCancelar = document.getElementById('cancelar')
const mainElement = document.querySelector('main');

btnNovoContato.addEventListener('click', () => {
    mainElement.classList.remove('card-show');
    mainElement.classList.add('form-show');
});

btnCancelar.addEventListener('click', () => {
    mainElement.classList.remove('form-show');
    mainElement.classList.add('card-show')
});

carregarContatos()