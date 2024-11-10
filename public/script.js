
let selectedAlgorithm = 'All';
// the color is 0 = light or 1 = dark
let textLightness = 0;
let backgroundLightness = 0;
let primaryLightness = 0;
let secondaryLightness = 0;
let accentLightness = 0;

let colorsGlobalArray = getColors()

// Função dinâmica que abre o seletor de cor e altera a cor do botão
function abrirSeletorCor(idBotao, idInputCor) {
    const inputCor = document.getElementById(idInputCor);
    const botao = document.getElementById(idBotao);
    var key = botao.innerText;
    // Simula o clique no input de cor
    inputCor.click();
    inputCor.addEventListener("input", function() {
        var color = inputCor.value;
        //joga na url a cor selecionada
        updateColorsGlobalArray(key, `${color}`);
        // atualiza css
        updateColorsQueryParam()
        updateCSSColorVar()
        calculateLightness()
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
function updateColorsQueryParam(){
    let res = `${colorsGlobalArray[0]}-${colorsGlobalArray[1]}-${colorsGlobalArray[2]}-${colorsGlobalArray[3]}-${colorsGlobalArray[4]}`

    const url = new URL(window.location.href);
    url.searchParams.set('colors', res);
    window.history.pushState({}, '', url);
}

function updateColorsGlobalArray(paramName, paramValue){
    switch(paramName){
        case 'Text':
            colorsGlobalArray[0]=paramValue;
            break;
        case 'Background':
            colorsGlobalArray[1]=paramValue;
            break;
        case 'Primary':
            colorsGlobalArray[2]=paramValue;
            break;
        case 'Secondary':
            colorsGlobalArray[3]=paramValue;
            break;
        case 'Accent':
            colorsGlobalArray[4]=paramValue;
            break;
        default:
            break;
    }
}

// função que atualiza as variáveis de cor do CSS
function updateCSSColorVar(){
    const colorObj = {
        Text: `${colorsGlobalArray[0]}`,
        Background: `${colorsGlobalArray[1]}`,
        Primary: `${colorsGlobalArray[2]}`,
        Secondary: `${colorsGlobalArray[3]}`,
        Accent: `${colorsGlobalArray[4]}`
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
            updateColorsGlobalArray(`${key}`,`${colorobj[key]}`)
        }
    }
    updateColorsQueryParam()

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
            updateColorsGlobalArray(`${key}`,`${colorobj[key]}`)
        }
    }
    updateColorsQueryParam()

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
            updateColorsGlobalArray(`${key}`,`${colorobj[key]}`)
        }
    }
    updateColorsQueryParam()

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
            updateColorsGlobalArray(`${key}`,`${colorobj[key]}`)
        }
    }
    updateColorsQueryParam()

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
    calculateLightness()
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h,s,l]
}

function calculateLightness(){
    let colors = getColors();
    var r = document.querySelector(':root');
    for (const key in colors) {
        if (colors.hasOwnProperty(key)) {
            let hsl = hexToHSL(colors[key])
            if (hsl[2]<=30){
                hsl[2] = 99
                let hex = hslToHex(hsl[0],hsl[1],hsl[2]);
                r.style.setProperty(`--ColorPickerText${key}`, `${hex}`);
            } else if(hsl[2]>30){
                hsl[2] = 1
                let hex = hslToHex(hsl[0],hsl[1],hsl[2]);
                r.style.setProperty(`--ColorPickerText${key}`, `${hex}`);
            }
        }
    }
}

function darkLight(){
    console.log('1')
    let colors = getColors();
    let text = hexToHSL(colors[0])
    let background = hexToHSL(colors[1])
    let temp = text[2]
    text[2] = background[2]
    background[2] = temp
    updateColorsGlobalArray('Text', hslToHex(text[0],text[1],text[2]))
    updateColorsGlobalArray('Background', hslToHex(background[0],background[1],background[2]))
    updateCSSColorVar()
}

function undo(){
    if (history.length>2){
        var element = document.getElementById("redo-btn");
        element.classList.remove("hidden");
    }
    colorsGlobalArray = getColors()
    updateCSSColorVar()
    history.back()
}

function redo(){
    if (history.length<2){
        var element = document.getElementById("redo-btn");
        element.classList.add("hidden");
    }
    colorsGlobalArray = getColors()
    updateCSSColorVar()
    history.forward()
}

calculateLightness()
updateColorsGlobalArray()
updateColorsQueryParam()
updateCSSColorVar()