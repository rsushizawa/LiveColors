
let selectedAlgorithm = 'All';

// Função dinâmica que abre o seletor de cor e altera a cor do botão
function abrirSeletorCor(idBotao, idInputCor) {
    const inputCor = document.getElementById(idInputCor);
    const botao = document.getElementById(idBotao);
    var key = botao.innerText;
    // Simula o clique no input de cor
    inputCor.click();
    inputCor.addEventListener('input', function() {
        var color = inputCor.value;
        //joga na url a cor selecionada
        updateColorsQueryParam(key, `${color}`);
        // atualiza css
        updateCSSColorVar()  
    });             
}

// função que separa os parametros query da pagina
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let query = {};
    for (const [key, value] of urlParams.entries()) {
        query[key] = value;
    }
    return query;
}

// função que organiza as cores do getQueryParams()
function getColors(){
    let data = getQueryParams()
    console.log(data.colors)
    let colors = []
    let builder = ''
    for( let i = 0; i<=data.colors.length;i++){
        if(data.colors[i]=='-' || i == data.colors.length){
            colors.push(builder)
            builder = ''
        } else {
            builder += data.colors[i]
        }
    }

    return colors;
}

//função que atualiza os parametro do Colors
function updateColorsQueryParam(paramName, paramValue) {
    let colorsArray = getColors();
    switch(paramName){
        case 'Text':
            colorsArray[0]=paramValue;
            break;
        case 'Background':
            colorsArray[1]=paramValue;
            break;
        case 'Primary':
            colorsArray[2]=paramValue;
            break;
        case 'Secondary':
            colorsArray[3]=paramValue;
            break;
        case 'Accent':
            colorsArray[4]=paramValue;
            break;
        default:
            break;
    }

    let res = `${colorsArray[0]}-${colorsArray[1]}-${colorsArray[2]}-${colorsArray[3]}-${colorsArray[4]}`

    const url = new URL(window.location.href);
    url.searchParams.set('colors', res);
    window.history.pushState({}, '', url);
}

// função de atualizar que atualiza as variáveis de cor do CSS
function updateCSSColorVar(){
    const colors = getColors()
    const colorObj = {
        Text: `${colors[0]}`,
        Background: `${colors[1]}`,
        Primary: `${colors[2]}`,
        Secondary: `${colors[3]}`,
        Accent: `${colors[4]}`
    }

    // Criando funçao para configurar o valor de uma variável de forma dinamica
    function myFunction_set(nomeParametro,cor) {
    // setando o valor da variavel  
    r.style.setProperty(nomeParametro,cor);
    }

    var r = document.querySelector(':root');
    for (const key in colorObj) {
        if (colorObj.hasOwnProperty(key)) {
            r.style.setProperty(`--${key}`, `${colorObj[key]}`);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function generateSplitComplementary(){
    let Hue = getRandomInt(360)
    let primary = Hue + 150
    let secondary = Hue + 210

    Hue = hslToHex(Hue,getRandomInt(100),getRandomInt(100))
    primary = hslToHex(primary,getRandomInt(100),getRandomInt(100))
    secondary = hslToHex(secondary,getRandomInt(100),getRandomInt(100))

    let colorobj = {
        Primary: primary,
        Secondary: secondary,
        Accent: Hue
    }

    for (const key in colorobj) {
        if (colorobj.hasOwnProperty(key)) {
            updateColorsQueryParam(`${key}`,`${colorobj[key]}`)
        }
    }

    updateCSSColorVar()
}

function generateTriadic(){
    let Hue = getRandomInt(360)
    let primary = Hue + 120
    let secondary = Hue + 240

    Hue = hslToHex(Hue,getRandomInt(50),getRandomInt(50))
    primary = hslToHex(primary,getRandomInt(50),getRandomInt(50))
    secondary = hslToHex(secondary,getRandomInt(50),getRandomInt(50))

    let colorobj = {
        Primary: primary,
        Secondary: secondary,
        Accent: Hue
    }

    for (const key in colorobj) {
        if (colorobj.hasOwnProperty(key)) {
            updateColorsQueryParam(`${key}`,`${colorobj[key]}`)
        }
    }

    updateCSSColorVar()
}
    
function generateTetradic(){
    let Hue = getRandomInt(360)
    let primary = Hue + 90
    let secondary = Hue + 270

    Hue = hslToHex(Hue,getRandomInt(100),getRandomInt(100))
    primary = hslToHex(primary,getRandomInt(100),getRandomInt(100))
    secondary = hslToHex(secondary,getRandomInt(100),getRandomInt(100))

    let colorobj = {
        Primary: primary,
        Secondary: secondary,
        Accent: Hue
    }

    for (const key in colorobj) {
        if (colorobj.hasOwnProperty(key)) {
            updateColorsQueryParam(`${key}`,`${colorobj[key]}`)
        }
    }

    updateCSSColorVar()
}

function generateAnalagous(){
    let Hue = getRandomInt(360)
    let primary = Hue + 30
    let secondary = Hue - 30

    Hue = hslToHex(Hue,getRandomInt(100),getRandomInt(100))
    primary = hslToHex(primary,getRandomInt(100),getRandomInt(100))
    secondary = hslToHex(secondary,getRandomInt(100),getRandomInt(100))

    let colorobj = {
        Primary: primary,
        Secondary: secondary,
        Accent: Hue
    }

    for (const key in colorobj) {
        if (colorobj.hasOwnProperty(key)) {
            updateColorsQueryParam(`${key}`,`${colorobj[key]}`)
        }
    }

    updateCSSColorVar()
}

function generateAll(){
    generateAnalagous()
}

function showAlgorithms(){
    var element = document.getElementById("algorithm-selection");
    element.classList.toggle("hidden");
}

function updateAlgorithm(newAlgorithm){
    selectedAlgorithm = newAlgorithm
}

function useAlgorithm(){
    switch(selectedAlgorithm){
        case 'All':
            generateAll()
            break;
        case 'Split Complementary':
            generateSplitComplementary()
            break;
        case 'Triadic':
            generateTriadic()
            break;
        case 'Tetradic':
            generateTetradic()
            break;
        case 'Analagous':
            generateAnalagous()
            break;
    }
}

updateColorsQueryParam()
updateCSSColorVar()