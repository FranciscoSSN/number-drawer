// Seleciona os elementos do DOM
const form = document.querySelector('form');
const numberField = document.querySelectorAll('#number-field');
const noRepeatToggle = document.querySelector('a');
const btn = document.querySelector("#btn");

let noRepeat = false; // Estado para verificar se "Não repetir número" está ativo

// Adiciona evento para ativar/desativar "Não repetir número"
noRepeatToggle.addEventListener('click', (e) => {
  e.preventDefault();
  noRepeat = !noRepeat;
  noRepeatToggle.querySelector('img').src = noRepeat 
    ? 'assets/toggle-active.svg' 
    : 'assets/toggle-default.svg';
});

// Adiciona evento de submissão do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const quantity = parseInt(numberField[0].value) || 2; // Número de sorteios
  const start = parseInt(numberField[1].value) || 1;    // Valor inicial do intervalo
  const end = parseInt(numberField[2].value) || 100;   // Valor final do intervalo

  // Validações básicas
  if (start >= end) {
    alert('O valor inicial deve ser menor que o final!');
    return;
  }

  if (quantity > end - start + 1 && noRepeat) {
    alert('Não é possível sortear essa quantidade de números únicos no intervalo especificado!');
    return;
  }

  const results = generateRandomNumbers(quantity, start, end, noRepeat);

  alert(`Números sorteados: ${results.join(', ')}`); // mostra os números sorteados em tela

});

// Função para gerar números aleatórios
function generateRandomNumbers(quantity, start, end, noRepeat) {
  const numbers = [];

  while (numbers.length < quantity) {
    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;

    if (noRepeat && numbers.includes(randomNumber)) {
      continue; // Evita números repetidos
    }

    numbers.push(randomNumber);
  }

  return numbers;
}


