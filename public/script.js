
let selectedAlgorithm = 'All';
// the color is 0 = light or 1 = dark
let textLightness = 0;
let backgroundLightness = 0;
let primaryLightness = 0;
let secondaryLightness = 0;
let accentLightness = 0;
// variavéis do carrosel
let slideIndex = 0;
let interValid = null;
const slides = document.querySelectorAll(".slides img");

document.addEventListener("DOMContentLoaded", initializeSlider)

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

let colorsGlobalArray = ['%23000005','%23fbfbfe','%232f27ce','%23dedcff','%23433cff'];
colorsGlobalArray = getColors()

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

//color algorithms
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

//select color algorithm
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

// dark/light function
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

//undo/redo function
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
    if (!history.forward){
        var element = document.getElementById("redo-btn");
        element.classList.add("hidden");
    }
    colorsGlobalArray = getColors()
    updateCSSColorVar()
    history.forward()
}

//change fonts function
const fetchJson = async url => {
    const response = await fetch(url)
    return response.json()
}

async function getVariantsList(family){
    const variants = document.getElementById('font-variants')
    variants.innerHTML = ''
    const data = await fetchJson('./key')
    for (let i = 100; i >= 0 ; i--){    
        if(data.items[i].family==`${family}`){
            for (const key in data.items[i].variants){
                if (data.items[i].variants[key]){
                    let li = document.createElement('li')
                    li.innerHTML = `<button onclick="changeFont('${data.items[i].family}','${data.items[i].variants[key]}')">${data.items[i].variants[key]}</button>`
                    variants.appendChild(li)
                }
            }
            return 0;
        }
    }
}

async function getFontsList(){
    
    var element = document.getElementById("font-selection")
    element.classList.toggle("hidden")
    const data = await fetchJson('/key')
    // console.log(data)
    const display = document.getElementById('font-display')
    for (let i = 100; i >= 0 ; i--){
        let li = document.createElement('li')
        li.innerHTML = `<button onclick="getVariantsList('${data.items[i].family}')">${data.items[i].family}</button>`
        display.appendChild(li)
    }
}

function changeFont(family,variant){
    const head = document.getElementsByTagName("head")[0]
    head.removeChild(head.lastChild);
    var r = document.querySelector(':root');
    r.style.setProperty(`--Font`, `"${family}", serif`);
    r.style.setProperty(`--Font-Style`, `${variant}`);
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css?family=${family}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`;
    head.appendChild(link);
}


// second template slider
function initializeSlider(){
    if(slides. length > 0){
        slides[slideIndex].classList.add("displaySlide");
        setInterval(nextSlide, 5000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(interValid)
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    clearInterval(interValid);
    slideIndex++;
    showSlide(slideIndex);
}

function legend(btn_name, message){
    var btn = document.getElementById(btn_name);
    var msgDiv = document.getElementById("msgDiv");
    btn.addEventListener("mouseover", () => {
        msgDiv.style.opacity = "1";
        msgDiv.style.visibility = "visible";
        msgDiv.innerHTML = message;
    });
    btn.addEventListener("mouseout", () => {
        msgDiv.style.opacity = "0";
        msgDiv.style.visibility = "hidden";
        msgDiv.innerHTML = ' ';
    });
}

legend('light-dark','Alterna entre modo claro e escuro');
legend('rand-div','Altera as cores da página com base no tipo selecionado');
legend('undo-btn','Volta a ação');
legend('redo-btn','Retorna à alteração');
legend('fonts-btn','Troca a fonte');
legend('share-btn','Gera um link para compartilhar este template com as cores e fontes selecionadas');
legend('hide-btn','Esconde a tool-bar');

calculateLightness()
updateColorsQueryParam()
updateCSSColorVar()