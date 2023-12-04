function mostrarPopup() {
    document.getElementById('popup').style.display = 'block';
}

function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
    // Exibir o formulário após o fechamento do pop-up
    document.getElementById('enccejaCalculator').classList.remove('hidden');
}

function salvarInformacoes() {
    var nomeCompleto = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var anoEdicao = document.getElementById('anoEdicao').value;

    // Aqui você pode fazer o que quiser com as informações salvas
    console.log('Nome Completo:', nomeCompleto);
    console.log('E-mail:', email);
    console.log('Ano de Edição:', anoEdicao);

    // Fechar o pop-up após salvar as informações
    fecharPopup();
}

function validarInput(input) {
    var valor = parseFloat(input.value);
    var maximoPermitido = parseFloat(input.getAttribute('max'));

    // Verificar se o valor está acima do máximo permitido
    if (isNaN(valor) || valor > maximoPermitido) {
        input.style.border = '1px solid red'; // Adiciona borda vermelha
        input.nextElementSibling.innerHTML = 'Não é permitido valor acima de ' + maximoPermitido + '.'; // Exibe mensagem de erro
        document.getElementById('calcularButton').disabled = true; // Desabilita o botão
    } else {
        input.style.border = ''; // Remove a borda vermelha
        input.nextElementSibling.innerHTML = ''; // Limpa a mensagem de erro
        document.getElementById('calcularButton').disabled = false; // Habilita o botão
    }
}

function calcularNota() {
    // Restante do código de calcularNota()
}


function calcularNota() {
    // Obter os valores das notas
    var cienciasNatureza = parseFloat(document.getElementById('cienciasNatureza').value);
    var matematica = parseFloat(document.getElementById('matematica').value);
    var linguagens = parseFloat(document.getElementById('linguagens').value);
    var redacao = parseFloat(document.getElementById('redacao').value);

    // Calcular a pontuação total considerando apenas notas válidas
    var pontuacaoTotal = 0;
    var materiasAprovadas = [];
    var materiasReprovadas = [];

    // Função para verificar se a nota é válida (não preenchida ou igual a 0 são desconsideradas)
    function isNotaValida(nota) {
        return (nota !== null && nota > 0);
    }

    // Função para verificar se a nota atingiu a média necessária
    function atingiuMedia(nota) {
        return (nota !== null && nota >= 100 && nota <= 200);
    }

    if (isNotaValida(cienciasNatureza)) {
        pontuacaoTotal += cienciasNatureza;
        if (atingiuMedia(cienciasNatureza)) {
            materiasAprovadas.push('Ciências da Natureza');
        } else {
            materiasReprovadas.push('Ciências da Natureza');
        }
    }

    if (isNotaValida(matematica)) {
        pontuacaoTotal += matematica;
        if (atingiuMedia(matematica)) {
            materiasAprovadas.push('Matemática');
        } else {
            materiasReprovadas.push('Matemática');
        }
    }

    if (isNotaValida(linguagens)) {
        pontuacaoTotal += linguagens;
        if (atingiuMedia(linguagens)) {
            materiasAprovadas.push('Linguagens e Códigos');
        } else {
            materiasReprovadas.push('Linguagens e Códigos');
        }
    }

    if (isNotaValida(redacao)) {
        pontuacaoTotal += redacao;
        if (redacao >= 5 && redacao <= 10) {
            materiasAprovadas.push('Redação');
        } else {
            materiasReprovadas.push('Redação');
        }
    }

    // Verificar se atingiu a pontuação mínima em cada área
    var atingiuCienciasNatureza = atingiuMedia(cienciasNatureza);
    var atingiuMatematica = atingiuMedia(matematica);
    var atingiuLinguagens = atingiuMedia(linguagens);

    // Verificar se tirou pelo menos 5 na redação
    var redacaoAprovada = (redacao !== null && redacao >= 5 && redacao <= 10);

    // Verificar os cenários de aprovação parcial
    if (atingiuCienciasNatureza && atingiuMatematica && atingiuLinguagens && redacaoAprovada) {
        document.getElementById('resultado').innerHTML = '<div class="aprovado">Aprovado em todas as áreas!</div>';
    } else {
        // Exibir os resultados na página
        var mensagem = '';

        if (materiasAprovadas.length > 0) {
            mensagem += '<div class="aprovado">Aprovado em: ' + materiasAprovadas.join(', ') + '</div>';
        }

        if (materiasReprovadas.length > 0) {
            mensagem += '<div class="reprovado">Reprovado em: ' + materiasReprovadas.join(', ') + '</div>';
            mensagem += '<div class="azul">Você precisará fazer novamente as provas de: ' + materiasReprovadas.join(', ') + '</div>';
        }

        document.getElementById('resultado').innerHTML = mensagem;
    }
}

