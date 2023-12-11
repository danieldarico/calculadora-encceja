function mostrarPopup() {
    document.getElementById('popup').style.display = 'block';
}

function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('enccejaCalculator').classList.remove('hidden');
}

function salvarInformacoes() {
    var nomeCompleto = document.getElementById('nomeCompleto').value;
    var email = document.getElementById('email').value;
    var anoEdicao = document.getElementById('anoEdicao').value;

    console.log('Nome Completo:', nomeCompleto);
    console.log('E-mail:', email);
    console.log('Ano de Edição:', anoEdicao);

    fecharPopup();
}

function validarInput(input) {
    var valor = parseFloat(input.value);
    var maximoPermitido = parseFloat(input.getAttribute('max'));

    if (!isNaN(valor) && valor > maximoPermitido) {
        input.style.border = '1px solid red'; 
        input.nextElementSibling.innerHTML = 'Não é permitido valor acima de ' + maximoPermitido + '.'; // Exibe mensagem de erro
        document.getElementById('calcularButton').disabled = true; 
    } else {
        input.style.border = ''; 
        input.nextElementSibling.innerHTML = ''; 
        document.getElementById('calcularButton').disabled = false; 
    }
}


function calcularNota() {
    var cienciasNatureza = parseFloat(document.getElementById('cienciasNatureza').value);
    var matematica = parseFloat(document.getElementById('matematica').value);
    var linguagens = parseFloat(document.getElementById('linguagens').value);
    var redacao = parseFloat(document.getElementById('redacao').value);

    var pontuacaoTotal = 0;
    var materiasAprovadas = [];
    var materiasReprovadas = [];

    function isNotaValida(nota) {
        return (nota !== null && nota > 0);
    }

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

    var atingiuCienciasNatureza = atingiuMedia(cienciasNatureza);
    var atingiuMatematica = atingiuMedia(matematica);
    var atingiuLinguagens = atingiuMedia(linguagens);

    var redacaoAprovada = (redacao !== null && redacao >= 5 && redacao <= 10);

    if (atingiuCienciasNatureza && atingiuMatematica && atingiuLinguagens && redacaoAprovada) {
        document.getElementById('resultado').innerHTML = '<div class="aprovado">Aprovado em todas as áreas!</div>';
    } else {
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

