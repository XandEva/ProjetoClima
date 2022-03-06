document.querySelector('.busca').addEventListener('submit', async (event)=>{
 //quando o usuario digitar no formulario
    event.preventDefault(); //previnir o comportamento padrao do formulario
    let input = document.querySelector('#searchInput').value; //acesso ao que o usuario digitou
    
    if(input !== ''){
        clearInfo();
        showWarning('Carregando...'); //vai mostrar pro usuario que o sistema esta fazendo alguma coisa

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=51f66db198a753cd8af6c102f36d6173&units=metric&lang=pt_br`;

        let results = await fetch(url); //trabalha em sistema de promeça, ele manda uma informação e só continua o sistema após a resposta /await pede a requesição e espera o resultado
        let json = await results.json(); //pega os resultados e transforma em objetos //pegou o resultado e transformou em json

        if(json.cod === 200){ //basicamente ele pega o código do networking que é 200 o correto e mostra a cidade
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            });

        }else{ //se não for 200 vai dar erro o código do erro é 404
            clearInfo();
            showWarning('Não encontramos está localização')
        }

    }

});

function showInfo(json){ //vai receber o json e vai fazer o processo de exibir
    showWarning(''); //remove o carregando

    document.querySelector('.resultado').style.display = 'block'; //vai aparecer os resultados na tela

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}` //vai adcionar a cidade e o pais
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)//entro dentro de temp e pego a imagem, dps pego o atributo src e coloco os icones dinamicos
    document.querySelector('.ventoPonto').style.transform = `rotate(${windAngle-90}deg)`//mudar o angulo

}


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;//vai adicionar no html algum texto
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}