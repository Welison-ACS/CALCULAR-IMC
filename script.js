const form = document.getElementById('imcForm');
const resultado = document.getElementById('resultado');
const botao = document.getElementById('calcular');
const modoAvancado = document.getElementById('modoAvancado');
const avancadoDiv = document.getElementById('avancado');

// Mostrar/esconder área avançada
modoAvancado.addEventListener('change', () => {
    avancadoDiv.style.display = modoAvancado.checked ? 'block' : 'none';
});

// Toggle buttons para sexo
const sexoBtns = document.querySelectorAll('.grupo-sexo .toggle-btn');
sexoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sexoBtns.forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');
    });
});

// Toggle buttons para idade
const idadeBtns = document.querySelectorAll('.grupo-idade .toggle-btn');
idadeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        idadeBtns.forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');
    });
});

// Função de cálculo
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const alturaCm = parseFloat(document.getElementById('altura').value);

    if (peso > 0 && alturaCm > 0) {
        const altura = alturaCm / 100;
        const imc = peso / (altura * altura);
        let categoria = '';

        if (imc < 14.9) {
            categoria = 'Abaixo do normal';
        } else if (imc <= 17.5) {
            categoria = 'Normal';
        } else {
            categoria = 'Acima do normal';
        }

        let infoExtra = '';
        if (modoAvancado.checked) {
            const sexo = document.querySelector('.grupo-sexo .selecionado')?.dataset.value || 'não selecionado';
            const idade = document.querySelector('.grupo-idade .selecionado')?.dataset.value || '3';
            infoExtra = ` | Sexo: ${sexo} | Idade: ${idade}`;
        }

        resultado.textContent = `IMC: ${imc.toFixed(2)} - ${categoria}${infoExtra}`;

        // Botão Novo cálculo
        botao.textContent = 'Novo cálculo';
        botao.removeEventListener('click', resetar);
        botao.addEventListener('click', resetar);

        function resetar() {
            form.reset();
            resultado.textContent = '';
            botao.textContent = 'Calcular IMC';
            if (modoAvancado.checked) avancadoDiv.style.display = 'block';
            botao.removeEventListener('click', resetar);
        }
    } else {
        resultado.textContent = 'Insira valores válidos!';
    }
});
