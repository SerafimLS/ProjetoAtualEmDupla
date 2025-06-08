const eventos = [
    {
        id: 1,
        nome: "Oficina de Pintura Abstrata no MASP",
        descricao: "Explore sua criatividade com técnicas de pintura abstrata. Materiais inclusos.",
        tipo: "pintura",
        custo: "pago",
        valor: "R$ 50,00",
        cep: "01310100",
        nomeLugar: "MASP - Museu de Arte de São Paulo Assis Chateaubriand",
        localidadeApi: null
    },
    {
        id: 2,
        nome: "Encontro de Escultura em Argila na Pinacoteca",
        descricao: "Aprenda os fundamentos da modelagem em argila. Aberto a iniciantes.",
        tipo: "escultura",
        custo: "gratuito",
        valor: "Grátis",
        cep: "01103000",
        nomeLugar: "Pinacoteca de São Paulo",
        localidadeApi: null
    },
    {
        id: 3,
        nome: "Workshop de Cerâmica Artesanal na Vila Madalena",
        descricao: "Crie suas próprias peças de cerâmica. Vagas limitadas.",
        tipo: "ceramica",
        custo: "pago",
        valor: "R$ 75,00",
        cep: "05443000",
        nomeLugar: "Ateliê de Cerâmica Vila Madalena (Exemplo)",
        localidadeApi: null
    },
    {
        id: 4,
        nome: "Clube do Desenho Livre no Ibirapuera",
        descricao: "Traga seu material e junte-se a nós para uma tarde de desenho.",
        tipo: "pintura",
        custo: "gratuito",
        valor: "Grátis",
        cep: "04094000",
        nomeLugar: "Parque Ibirapuera - Marquise (Exemplo)",
        localidadeApi: null
    },
    {
        id: 5,
        nome: "Workshop Geral de Artes Visuais no CCSP",
        descricao: "Um dia intensivo explorando diversas técnicas de artes visuais.",
        tipo: "workshop",
        custo: "pago",
        valor: "R$ 120,00",
        cep: "01501900",
        nomeLugar: "Centro Cultural São Paulo",
        localidadeApi: null
    },
    {
        id: 6,
        nome: "Workshop Geral de Artes Visuais no CCSP",
        descricao: "Um dia intensivo explorando diversas técnicas de artes visuais.",
        tipo: "Escultura",
        custo: "Gratuito",
        valor: "Grátis",
        cep: "01501900",
        nomeLugar: "Centro Cultural São Paulo",
        localidadeApi: null
    }
];

function isUserLoggedIn() {
    return sessionStorage.getItem('loggedInUserEmail') !== null;
}

async function buscarEnderecoPorCEP(cep) {
    if (!cep || cep.length !== 8 || !/^\d+$/.test(cep)) {
        console.error("CEP inválido fornecido:", cep);
        return null;
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error(`Erro na API ViaCEP: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.erro) {
            console.warn("CEP não encontrado ou erro na API ViaCEP:", cep);
            return null;
        }
        return data;
    } catch (error) {
        console.error("Falha ao buscar CEP:", error);
        return null;
    }
}


function cadastrarUsuario() {
    const nome = document.getElementById('txtNome').value;
    const email = document.getElementById('txtEmail').value;
    const cpf = document.getElementById('txtCPF').value;
    const senhaCaixaTexto = document.getElementById('txtSenha').value;

    if (!nome || !email || !cpf || !senhaCaixaTexto) {
        alert('Preencha todos os campos!');
        return;
    }
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        alert('CPF inválido. Deve conter 11 números e apenas números.');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    const usuario = { nome, email, cpf, senhaCaixaTexto };
    localStorage.setItem(email, JSON.stringify(usuario));
    alert('Usuário cadastrado com sucesso! Faça o login.');
    window.location.href = 'login.html';
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    const usuarioJSON = localStorage.getItem(email);
    if (!usuarioJSON) {
        alert('Usuário não encontrado!');
        return;
    }

    const usuarioBase = JSON.parse(usuarioJSON);
    if (usuarioBase.senhaCaixaTexto === senha) {
        alert('Login realizado com sucesso!');
        sessionStorage.setItem('loggedInUserEmail', email);
        sessionStorage.setItem('loggedInUserName', usuarioBase.nome);
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}

function logout() {
    sessionStorage.removeItem('loggedInUserEmail');
    sessionStorage.removeItem('loggedInUserName');
    alert('Você foi desconectado.');
    atualizarInterfaceUsuario();
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('cadastro.html')) {
        window.location.href = 'index.html';
    } else if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        window.location.href = 'index.html';
    }
}


function renderizarEventos(eventosParaRenderizar = eventos) {
    const listaEventosDiv = document.getElementById('listaEventos');
    if (!listaEventosDiv) return;

    listaEventosDiv.innerHTML = '';
    if (eventosParaRenderizar.length === 0) {
        listaEventosDiv.innerHTML = '<p style="text-align:center; width:100%;">Nenhum evento encontrado com os filtros selecionados.</p>';
        return;
    }

    eventosParaRenderizar.forEach(evento => {
        const card = document.createElement('div');
        card.className = 'card-evento';
        card.onclick = () => handleCardClick(evento.id);

        const custoFormatado = evento.custo ? evento.custo.toLowerCase() : 'pago';
        const custoClasse = custoFormatado === 'gratuito' || custoFormatado === 'grátis' ? 'gratuito' : 'pago';

        card.innerHTML = `
            <h3>${evento.nome}</h3>
            <p>${evento.descricao.substring(0, 100)}...</p>
            <p><strong>Tipo:</strong> ${evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}</p>
            <p class="custo ${custoClasse}"><strong>Custo:</strong> ${evento.valor}</p>
            <p><strong>CEP:</strong> ${evento.cep}</p>
        `;
        listaEventosDiv.appendChild(card);
    });
}

async function handleCardClick(eventoId) {
    if (!isUserLoggedIn()) {
        alert("Você precisa estar logado para ver os detalhes do evento.");
        sessionStorage.setItem('redirectToEventId', eventoId);
        window.location.href = 'login.html';
        return;
    }

    const evento = eventos.find(e => e.id === eventoId);
    if (!evento) {
        console.error("Evento não encontrado:", eventoId);
        return;
    }

    document.getElementById('modalEventName').textContent = evento.nome;
    document.getElementById('modalEventDescription').textContent = evento.descricao;
    document.getElementById('modalEventType').textContent = evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1);
    document.getElementById('modalEventCostValue').textContent = evento.valor;
    document.getElementById('modalEventPlaceName').textContent = evento.nomeLugar || "Não informado";
    document.getElementById('modalEventCEP').textContent = evento.cep;

    document.getElementById('modalEventAddress').textContent = "Carregando endereço...";
    document.getElementById('modalEventLocalityCity').textContent = "Carregando...";
    document.getElementById('modalEventUF').textContent = "";

    const enderecoApi = await buscarEnderecoPorCEP(evento.cep);
    if (enderecoApi) {
        evento.localidadeApi = enderecoApi;
        document.getElementById('modalEventAddress').textContent = `${enderecoApi.logradouro || "Rua não informada"}, ${enderecoApi.bairro || "Bairro não informado"}`;
        document.getElementById('modalEventLocalityCity').textContent = enderecoApi.localidade || "Cidade não informada";
        document.getElementById('modalEventUF').textContent = enderecoApi.uf || "";
    } else {
        document.getElementById('modalEventAddress').textContent = "Endereço não encontrado via CEP.";
        document.getElementById('modalEventLocalityCity').textContent = "Localidade não encontrada.";
    }

    document.getElementById('eventDetailModal').style.display = 'block';
}


function fecharModal() {
    const modal = document.getElementById('eventDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('eventDetailModal');
    if (modal && event.target == modal) {
        modal.style.display = "none";
    }
}


function filtrarEventos() {
    const filtroCustoElement = document.getElementById('filtroCusto');
    const filtroTipoElement = document.getElementById('filtroTipo');
    const filtroCEPElement = document.getElementById('filtroCEP');

    const filtroCusto = filtroCustoElement ? filtroCustoElement.value : 'todos';
    const filtroTipo = filtroTipoElement ? filtroTipoElement.value : 'todos';
    const filtroCEP = filtroCEPElement ? filtroCEPElement.value.replace(/\D/g, '') : '';

    let eventosFiltrados = eventos;

    if (filtroCusto !== 'todos') {
        eventosFiltrados = eventosFiltrados.filter(evento => evento.custo && evento.custo.toLowerCase() === filtroCusto);
    }
    if (filtroTipo !== 'todos') {
        eventosFiltrados = eventosFiltrados.filter(evento => evento.tipo && evento.tipo.toLowerCase() === filtroTipo.toLowerCase());
    }
    if (filtroCEP && filtroCEP.length > 0) {
        eventosFiltrados = eventosFiltrados.filter(evento => evento.cep.includes(filtroCEP));
    }

    renderizarEventos(eventosFiltrados);
}

function filtrarEventosPorCEP(event) {
    filtrarEventos();
}

function atualizarInterfaceUsuario() {
    const navUserActions = document.getElementById('navUserActions');
    if (!navUserActions) return;

    if (isUserLoggedIn()) {
        const userName = sessionStorage.getItem('loggedInUserName') || "Usuário";
        navUserActions.innerHTML = `
            <span>Olá, ${userName}!</span>
            <button type="button" onclick="logout()">Logout</button>
        `;
    } else {
        navUserActions.innerHTML = `
            <a>Entrar</a>
            <ul class="submenu">
                <li><a href="cadastro.html">Cadastrar</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    atualizarInterfaceUsuario();
    
    if (document.getElementById('listaEventos')) {
        renderizarEventos();

        const redirectToEventId = sessionStorage.getItem('redirectToEventId');
        if (redirectToEventId && isUserLoggedIn()) {
            handleCardClick(parseInt(redirectToEventId));
            sessionStorage.removeItem('redirectToEventId');
        }
    }
});