const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : "wi wi-day-snow",
    "Mist" : "wi wi-day-fog",
    "Drizzle" : "wi wi-day-sleet"
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP=true){
    var ville;
    if(withIP){
        // 1. Choper l'adresse IP du PC qui ouvre la page grâce à l'API ipify: https://api.ipify.org?format=json
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then( json => json.ip)

        // 2. Choper, grâce à l'API freegeoip, l'adresse IP de la ville: http://freegeoip.net/json/adresseIPduMec
        ville = await fetch(`http://ip-api.com/json/${ip}`)
            .then(resultat => resultat.json())
            .then(json => json.city)

    } else {
        ville = document.querySelector('#ville').textContent;
    }

    // 3. Choper les infos météo grâce à l'API d'openweathermap: http://api.openweathermap.org/data/2.5/weather?q=VilleDuMec&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&Lang=fr&units=metric
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&Lang=fr&units=metric`)
                    .then(resultat => resultat.json())
                    .then(json => json)

    // 4. Afficher les informations sur la page
    displayWeatherInfos(meteo);

}

/*
On va maintenant exploiter les donner renvoyer:
Pour cela, on va d'abord relier les conditions de temperatures à l'icone adéquat:
*/
function displayWeatherInfos(data){
    const name= data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase()
}


const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable= true;
    // contentEditable permet à l'utilisateur de modifier le content
});

ville.addEventListener('keydown', (e) => {
    //si on appuie sur la touche entrée (=code13) -> http://keycode.io
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();