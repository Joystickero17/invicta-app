const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const url = "http://bcv.org.ve";
const refreshButton = document.getElementById("refresh");
const spinner = document.getElementById("dolarLoading");
const dolarTag = document.getElementById("dolarTasa");
const btnBs = document.getElementById("calculateBs");
const btnDollar = document.getElementById("calculateDollar");

async function getRequestDOM(urlToFetch) {
    const response = await fetch(urlToFetch);
    const text = await response.text();
    const dom = await new JSDOM(text);
    return dom
}


getRequestDOM(url).then(dom => {

    let spinner = document.getElementById("dolarLoading");
    dolarPrice = dom.window.document.getElementById("dolar").querySelector("strong").textContent.replace(",", ".");
    spinner.style.display = "none";
    let dolarTag = document.getElementById("dolarTasa")
    dolarTag.innerText = dolarPrice;

    setTimeout(() => { refreshButton.style.display = "inline"; }, 2000)
}).catch(err=>{
    alert("Parece que no está conectado a internet, por favor comprueba su conexión e inténtelo de nuevo");
    document.getElementById("errorFetch").style.display = "inline-block";
    spinner.style.display = "none";
})

const getDollarPrice = ()=>{
    // para uso de variables locales
    return document.getElementById("dolarTasa").innerText;
}

const updatePrice = () => {
    btnBs.disabel
    spinner.style.display = "inline-block";
    dolarTag.innerText = "";
    getRequestDOM(url).then(dom => {
        console.log("request exitoso");
        dolarPrice = dom.window.document.getElementById("dolar").querySelector("strong").textContent.replace(",", ".");
        spinner.style.display = "none";
        dolarTag.innerText = dolarPrice;
    
        setTimeout(() => { refreshButton.style.display = "inline"; }, 2000)
    }).catch(err=>{
        alert("Parece que no está conectado a internet, por favor comprueba su conexión e inténtelo de nuevo");
        document.getElementById("errorFetch").style.display = "inline-block";
        spinner.style.display = "none";
    })
}

const bsToDollar = (bolivars) => {
    return bolivars / getDollarPrice()
}

const dollarsToBolivars = (dollars) => {
    return dollars * getDollarPrice()
}

refreshButton.onclick = () => { updatePrice() };
btnDollar.onclick = () => {
    let inputBolivar = document.getElementById("bolivarPrecio").value;
    let inputResult = document.getElementById("dolarResultado");
    inputResult.value = bsToDollar(inputBolivar);
}
btnBs.onclick= () => { 
    let inputDolar = document.getElementById("dolarPrecio").value;
    let inputResult = document.getElementById("bolivarResultado");
    inputResult.value = dollarsToBolivars(inputDolar);
}