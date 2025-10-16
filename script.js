const form = document.getElementById('imcForm');
const resultado = document.getElementById('resultado');
const botao = document.getElementById('calcular');
const modoAvancado = document.getElementById('modoAvancado');
const avancadoDiv = document.getElementById('avancado');

const grupoSexo = document.getElementById('grupoSexo');
const grupoIdade = document.getElementById('grupoIdade');
const grupoFaixa = document.getElementById('grupoFaixa');

// Mostrar/esconder área avançada
modoAvancado.addEventListener('change', () => {
    avancadoDiv.style.display = modoAvancado.checked ? 'block' : 'none';
});

// Toggle buttons para sexo
let sexoBtns = document.querySelectorAll('.grupo-sexo .toggle-btn');
function atualizarSexoBtns() {
    sexoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sexoBtns.forEach(b => b.classList.remove('selecionado'));
            btn.classList.add('selecionado');
        });
    });
}
atualizarSexoBtns();

// Toggle buttons para idade (anos)
const idadeBtns = document.querySelectorAll('.grupo-idade .toggle-btn');
idadeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        idadeBtns.forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');
    });
});

// Toggle buttons para faixa etária
const faixaBtns = document.querySelectorAll('.grupo-faixa .toggle-btn');
faixaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        faixaBtns.forEach(b => b.classList.remove('selecionado'));
        btn.classList.add('selecionado');

        const faixa = btn.dataset.value;
        if (faixa === 'crianca') {
            grupoIdade.style.display = 'flex';
            grupoSexo.innerHTML = `
                <button type="button" class="toggle-btn selecionado" data-value="menino">Menino</button>
                <button type="button" class="toggle-btn" data-value="menina">Menina</button>
            `;
        } else {
            grupoIdade.style.display = 'none';
            grupoSexo.innerHTML = `
                <button type="button" class="toggle-btn selecionado" data-value="homem">Homem</button>
                <button type="button" class="toggle-btn" data-value="mulher">Mulher</button>
            `;
        }
        sexoBtns = document.querySelectorAll('.grupo-sexo .toggle-btn');
        atualizarSexoBtns();
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

        let faixa = document.querySelector('.grupo-faixa .selecionado')?.dataset.value || 'crianca';

        if (faixa === 'adulto') {
            if (imc < 18.5) {
                categoria = 'Abaixo do peso';
            } else if (imc < 25) {
                categoria = 'Peso normal';
            } else if (imc < 30) {
                categoria = 'Sobrepeso';
            } else if (imc < 35) {
                categoria = 'Obesidade grau I';
            } else if (imc < 40) {
                categoria = 'Obesidade grau II';
            } else {
                categoria = 'Obesidade grau III';
            }
        } else if (faixa === 'adolescente') {
            categoria = 'IMC adolescente';
        } else {
            categoria = 'IMC infantil';
        }

        let infoExtra = '';
        if (modoAvancado.checked) {
            const sexo = document.querySelector('.grupo-sexo .selecionado')?.dataset.value || 'não selecionado';
            const idade = grupoIdade.style.display !== 'none' ? 
                document.querySelector('.grupo-idade .selecionado')?.dataset.value || '3' 
                : 'não aplicável';
            infoExtra = ` | Sexo: ${sexo} | Idade: ${idade}`;
        }

        resultado.textContent = `IMC: ${imc.toFixed(2)} - ${categoria}${infoExtra}`;

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

// ===== Registro do Service Worker para PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registrado:', reg))
            .catch(err => console.log('Service Worker falhou:', err));
    });
}
