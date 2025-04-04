function buscarEnderecoPorCEP() {
    const cep = document.getElementById("cep").value;
 
    if (cep.length !== 8) {
        alert("CEP Inválido. Deve conter 8 números");
        return;
    }
 
    const url = `https://viacep.com.br/ws/${cep}/json/`;
 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById("endereco").value = "";
            } else {
                const enderecoCompleto = `${data.logradouro}`;
                document.getElementById("endereco").value = enderecoCompleto;
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
        })
}

// Função principal chamada ao clicar no botão "Enviar"

function validarFormulario() {

    const nome = document.getElementById("nome").value.trim();

    const dataNascimento = document.getElementById("dataNascimento").value;

    const renda = document.getElementById("rendaFamiliar").value;

    const endereco = document.getElementById("endereco").value;



    // Validação de nome

    if (nome === "") {

        alert("Por favor, preencha o nome.");

        return;

    }



    // Validação da maioridade

    if (!validarIdade(dataNascimento)) {

        alert("Você deve ser maior de idade para se cadastrar.");

        return;

    }



    // Validação de renda

    if (!validarRenda(renda)) {

        alert("A renda familiar deve ser um número positivo.");

        return;

    }



    // Verificação se endereço foi preenchido

    if (endereco === "") {

        alert("Preencha um CEP válido para obter o endereço.");

        return;

    }



    alert("Formulário enviado com sucesso!");

}



// Verifica se a pessoa tem 18 anos ou mais

function validarIdade(dataNascimento) {

    const hoje = new Date();

    const nascimento = new Date(dataNascimento);



    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();



    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {

        idade--;

    }



    return idade >= 18;

}



