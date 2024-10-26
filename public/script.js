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
    var r = document.querySelector(':root');
    for (const key in colorObj) {
        console.log(`--${key}`)
        console.log(colorObj)
        console.log(`${colorObj[key]}`)
        if (colorObj.hasOwnProperty(key)) {
            r.style.setProperty(`--${key}`, `${colorObj[key]}`);
        }
    }
}