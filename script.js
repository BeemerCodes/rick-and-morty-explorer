
// Endereço da API
const url = "https://rickandmortyapi.com/api/character";

// Elementos do HTML
const listaPersonagens = document.getElementById("lista-personagens");
const botaoCarregar = document.getElementById("carregar-mais");
const mensagem = document.getElementById("mensagem");

// Variável para armazenar a próxima página
let proximaPagina = url;

// Função para buscar os personagens
function carregarPersonagens() {

    if (!proximaPagina) {
        return;
    }

    botaoCarregar.disabled = true;
    mensagem.textContent = "Carregando personagens...";

    fetch(proximaPagina)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar os personagens.");
            }

            return response.json();
        })

        .then(data => {

            // Percorre os personagens recebidos da API
            data.results.forEach(personagem => {

                // Cria o card
                const card = document.createElement("div");
                card.classList.add("card");

                // Cria a imagem
                const imagem = document.createElement("img");
                imagem.src = personagem.image;
                imagem.alt = personagem.name;
                imagem.loading = "lazy";

                // Cria o nome
                const nome = document.createElement("h3");
                nome.textContent = personagem.name;

                // Cria o status
                const status = document.createElement("p");
                status.textContent = "Status: " + personagem.status;

                // Cria a espécie
                const especie = document.createElement("p");
                especie.textContent = "Espécie: " + personagem.species;

                // Adiciona os elementos ao card
                card.appendChild(imagem);
                card.appendChild(nome);
                card.appendChild(status);
                card.appendChild(especie);

                // Adiciona o card à página
                listaPersonagens.appendChild(card);

            });

            // Atualiza o endereço da próxima página
            proximaPagina = data.info.next;

            mensagem.textContent = "";

            // Esconde o botão quando não houver mais personagens
            botaoCarregar.style.display = proximaPagina ? "block" : "none";

        })

        .catch(error => {
            mensagem.textContent = "Não foi possível carregar os personagens.";
            console.log(error);
        })

        .finally(() => {
            botaoCarregar.disabled = false;
        });
}

// Evento do botão
botaoCarregar.addEventListener("click", carregarPersonagens);

// Carrega os primeiros personagens ao abrir a página
carregarPersonagens();
