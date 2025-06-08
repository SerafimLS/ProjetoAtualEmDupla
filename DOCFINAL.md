Documentação do Projeto – Programação Web
Início: 03/04/2025
Dupla: Lucas Serafim e Nabil Saba

Documentação Completa do Projeto: Telas Artes
Visão Geral do Projeto:

O "Telas Artes" é uma plataforma web desenvolvida com o objetivo de ser um hub central para artistas e entusiastas da arte. O site permite que os usuários descubram e localizem oficinas, workshops e outros eventos criativos. A aplicação foi construída inteiramente com tecnologias de frontend (HTML, CSS e JavaScript), utilizando o armazenamento local do navegador para simular um banco de dados de usuários e gerenciar sessões de login, criando uma experiência de usuário dinâmica e interativa.

Arquitetura e Estrutura de Arquivos:

•	index.html: A página principal da plataforma. Apresenta as seções de "Oficinas de Arte", "Grupos Criativos", "Sobre" e "Contato". É a vitrine dos eventos, onde os usuários podem aplicar filtros para refinar suas buscas.

•	login.html: Página dedicada ao formulário de autenticação do usuário.

•	cadastro.html: Contém o formulário para o registro de novos usuários, solicitando informações essenciais como nome, e-mail, CPF e senha.

•	style.css: A folha de estilos que define toda a identidade visual do site. Utiliza variáveis CSS para uma paleta de cores consistente (baseada em roxo e azul) e implementa um design responsivo com media queries, garantindo uma boa experiência em desktops, tablets e celulares.

•	script.js: O coração da aplicação. Este arquivo JavaScript gerencia toda a lógica e interatividade:

o	Dados Locais: Simula um banco de dados de eventos através de um array de objetos eventos.

o	Autenticação: Funções de cadastrarUsuario(), login() e logout() que manipulam o localStorage (para dados persistentes) sessionStorage (para a sessão de login).

o	Interatividade: Renderiza dinamicamente os cards de eventos e os atualiza em tempo real conforme os filtros são aplicados pelo usuário.

o	Integração com API: Contém a lógica para se comunicar com uma API externa (ViaCEP).

•	README.md: O documento fundamental que delineia a visão original do projeto, seus objetivos, funcionalidades propostas e o cronograma.

•	Recursos Visuais: Incluem o logo (TelasArtesOrigin.jpg), uma imagem de banner (imagemProjeto.png) e um fluxograma técnico (FluxogramaTecnico.drawio.png) que ilustra de forma clara o fluxo de dados de autenticação do usuário.

 Funcionalidades:

O projeto se destaca por várias implementações técnicas bem-sucedidas:

•	Integração com a API ViaCEP Este é o principal destaque técnico. A função buscarEnderecoPorCEP() no script.js utiliza a API fetch do JavaScript para fazer uma chamada assíncrona à API pública do ViaCEP. Quando um usuário logado clica para ver os detalhes de um evento, o CEP do evento é enviado para a API, que retorna o endereço completo (rua, bairro, cidade, estado). Isso enriquece os dados da aplicação de forma dinâmica e automática, fornecendo informações úteis e precisas ao usuário sem a necessidade de um banco de dados geográfico complexo.

•	Simulação de Backend com Armazenamento Local O uso do localStorage para armazenar os dados de cadastro dos usuários é uma solução inteligente para criar uma aplicação com persistência de dados sem um servidor. Da mesma forma, o sessionStorage é usado para manter o estado de login do usuário durante a navegação. Essa abordagem, ilustrada no fluxograma, cria uma experiência de aplicação completa e funcional.

•	Interface Reativa: O site oferece uma experiência de usuário fluida. A filtragem de eventos acontece instantaneamente, sem a necessidade de recarregar a página. A barra de navegação se adapta dinamicamente ao status de autenticação, exibindo saudações personalizadas e o botão de logout para usuários logados, e as opções de login/cadastro para visitantes.

•	Código JavaScript Bem Estruturado O arquivo script.js é organizado em funções com responsabilidades bem definidas (autenticação, manipulação do DOM, chamadas de API, etc.), o que torna o código limpo, fácil de entender e de manter.

•	Design Responsivo e Moderno O CSS foi cuidadosamente escrito para garantir que o site seja visualmente agradável e totalmente funcional em uma ampla gama de dispositivos, adaptando o layout para telas de diferentes tamanhos.

Justificativa com Base no Proposto

A seguir, eu com os objetivos e funcionalidades definidos na documentação inicial.

Conformidade com o Objetivo Principal: O projeto cumpre com excelência o seu objetivo central de "criar uma plataforma web que permita aos usuários localizar oficinas de arte e eventos criativos em sua região". A listagem de eventos, os filtros funcionais e a busca por localização (via CEP) materializam essa visão. A base para a funcionalidade de "interagir com grupos criativos" também foi estabelecida com a criação da seção correspondente, mesmo que ainda como um placeholder para desenvolvimento futuro.

Análise das Funcionalidades Propostas:

1.	Tela Inicial e Abas Principais:
o	Atendido: A estrutura da página inicial (index.html) reflete o que foi planejado. A seção "Oficinas de Arte" está 100% funcional. A seção "Grupos Criativos" existe, indicando que a funcionalidade foi considerada e está no mapa do projeto.
2.	Filtros de Busca:
o	Atendido (Maioria): A maioria dos filtros propostos foi implementada com sucesso:
	Tipo de arte: Funcional.
	Localização: Funcional e implementado de forma inteligente através do filtro por CEP.
	Custo: Funcional.
o	Pendente: O filtro por "Data e horário" é a única funcionalidade de busca que não foi implementada na versão atual.
3.	Controle de Acesso:
o	Atendido Perfeitamente: A regra de acesso foi executada exatamente como proposto. A "visualização de oficinas e eventos" está disponível para todos, mas para acessar os detalhes completos (o que pode ser considerado uma forma de "participação" ou demonstração de interesse), o login é requerido.
4.	Sistema de Login:
o	Atendido com Adaptação Inteligente: A proposta inicial citava login "Via Google ou CPF". O projeto implementou um sistema robusto e funcional de login via e-mail e senha. Embora o método seja diferente, mas conforme foi acordado ao desenvolver, o objetivo final foi alcançado.

Conclusão das perguntas do professor:

Quem foi responsável pela implementação?
R: O Projeto foi desenvolvido pela minha dupla Nabil Rizeg Saba.

A nota (de 0 á 10) que você atribui no projeto entregue:
R: Eu atribuo 10 para o projeto entregue.

Justificativa com base no que foi proposto:
R: O projeto "Telas Artes", em seu estado atual, é um sucesso e demonstra um alto grau de conformidade com o escopo proposto. As funcionalidades mais críticas, como o sistema de cadastro/login e a busca de eventos com filtros e integração de API, foram implementadas com sucesso.
As pequenas divergências em relação ao plano original (o método de login e a ausência de um filtro) durante o desenvolvimento foi sendo moldado algumas questões. conforme foi dito no site que alguns fluxo mudaram mas foi executado com excelência.
