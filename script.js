document.addEventListener('DOMContentLoaded', function () {
    const apiUrlColegas = 'https://163afa08-2a6e-4940-b53e-86b90350dd3e-00-2ljtobn1uskxe.riker.replit.dev/colegas';
    const apiUrlSugestoes = 'https://163afa08-2a6e-4940-b53e-86b90350dd3e-00-2ljtobn1uskxe.riker.replit.dev/sugestoes';
    const githubApiUrl = 'https://api.github.com/users/gabrielcosta444';

    // Função para carregar os dados dos colegas
    async function carregarColegas() {
        try {
            const response = await fetch(apiUrlColegas);
            if (!response.ok) {
                throw new Error('Erro ao carregar dados dos colegas');
            }
            const data = await response.json();

            // Seleciona o container onde os cards de colegas serão inseridos
            const colegasContainer = document.querySelector('.caixa-colegasdetrabalho');

            // Itera sobre os colegas e cria os cards dinamicamente
            data.colegas.forEach(colega => {
                const colegaHTML = `
                    <div>
                        <img src="${colega.image}" alt="${colega.name}">
                        <h5 class="colegas">${colega.name}</h5>
                    </div>
                `;
                colegasContainer.innerHTML += colegaHTML;
            });
        } catch (error) {
            console.error('Erro ao carregar dados dos colegas:', error);
        }
    }

    // Função para carregar os vídeos sugeridos
    async function carregarVideosSugeridos() {
        try {
            const response = await fetch(apiUrlSugestoes);
            if (!response.ok) {
                throw new Error('Erro ao carregar vídeos sugeridos');
            }
            const data = await response.json();

            // Seleciona o container onde os vídeos serão inseridos
            const carouselInner = document.querySelector('.carousel-inner');
            const carouselIndicators = document.querySelector('.carousel-indicators');

            // Itera sobre os vídeos e cria os slides do carousel dinamicamente
            data.sugestoes.forEach((video, index) => {
                const slideClass = index === 0 ? 'carousel-item active' : 'carousel-item';
                const slideHTML = `
                    <div class="${slideClass}">
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.videoId}" 
                            title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
                const indicatorHTML = `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" 
                        class="${index === 0 ? 'active' : ''}" aria-current="true" aria-label="Slide ${index + 1}">
                    </button>
                `;
                carouselInner.innerHTML += slideHTML;
                carouselIndicators.innerHTML += indicatorHTML;
            });

        } catch (error) {
            console.error('Erro ao carregar vídeos sugeridos:', error);
        }
    }

    // Função para carregar o perfil do GitHub
    async function carregarPerfilGitHub() {
        try {
            const response = await fetch(githubApiUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar perfil do GitHub');
            }
            const data = await response.json();

            // Seleciona o container onde as informações do perfil serão inseridas
            const infoContainer = document.getElementById('info');
            infoContainer.innerHTML = `
                <div>
                    <h2>${data.name}</h2>
                </div>
                <div class="text mt-4">
                    <p>${data.bio}</p>
                </div>
                <div class="info mt-4 fw-bold">
                    <p>Localização: ${data.location || 'Não informada'}</p>
                    <p>Site: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
                    <p>Repositórios públicos: ${data.public_repos}</p>
                    <p>Seguidores: ${data.followers}</p>
                </div>
            `;
            
        } catch (error) {
            console.error('Erro ao carregar perfil do GitHub:', error);
        }
    }

    // Função para carregar os repositórios do GitHub
    async function carregarRepositoriosGitHub() {
        try {
            const response = await fetch('https://api.github.com/users/gabrielcosta444/repos');
            if (!response.ok) {
                throw new Error('Erro ao carregar repositórios do GitHub');
            }
            const data = await response.json();

            // Seleciona o container onde os cards de repositórios serão inseridos
            const repositoriosGitHub = document.querySelector('.caixa-repositorios .row');

            // Itera sobre os repositórios e cria os cards dinamicamente
            data.slice(0, 3).forEach(repo => {
                const html = `
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || ''}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver Repositório</a>
                            </div>
                        </div>
                    </div>
                `;
                repositoriosGitHub.innerHTML += html;
            });
            
        } catch (error) {
            console.error('Erro ao carregar repositórios do GitHub:', error);
        }
    }

    // Carregar os dados quando o DOM estiver carregado
    carregarColegas();
    carregarVideosSugeridos();
    carregarPerfilGitHub();
    carregarRepositoriosGitHub();
});
