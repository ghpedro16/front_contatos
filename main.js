'use strict'

import { lerContatos } from "./script.js"

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


carregarContatos()