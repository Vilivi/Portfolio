// Objectif:
// Calculer le score en fonction de la réponse choisie: +1 si bonne réponse ; -1 si mauvaise réponse


    // Je déclare les variables que je vais utiliser par la suite dans mes différentes fonctions par la suite. 
// affichage du score:
let decompte = 0;
let score = document.getElementById("score");
// j'ai besoin d'elles pour pouvoir relancer la partie:
let capitals=[];
let countries =[];
let dataToDisplay;
/* dataToDisplay va également me permettre d'effectuer le test de la bonne réponse lors du click: 
puisque celle-ci est un tableau transformée en string, il est plus pratique de 
récupérer sa valeur à partir avec dataToDisplay[1] dont j'ai de toute façon besoin pour relancer la partie. */



// Cette fonction va d'abord récupérer les données dont j'ai besoin
// Puis, elle va appeler les autres fonctions qui traiteront ces mêmes données.

async function main(){

    // ici je viens chercher l'objet sur lequel je vais travailler:
    data = await fetch('https://restcountries.eu/rest/v2/regionalbloc/eu')
        .then(resultat => resultat.json())
        .then(json => json)

    // je sélectionne les données qui m'intéressent:
    for(let i=0; i<33; i++){
        countries.push(data[i].translations.fr); //  un tableau pour les pays
        capitals.push(data[i].capital); // un tableau pour les capitales
    }
    
    dataToDisplay = abcdAnswers(countries, capitals); // sélectionne les données aléatoires du jeu
    display(dataToDisplay); // traite les données et permet la visualisation
}

main();

/* Avec cette fonction je vais:
1. Sélectionner une association et les conserver dans deux variables.
2. Créer un tableau de mauvaises réponses aléatoirement 
*/


function abcdAnswers(arrayCountries, arrayCapitals){

        // indice et association pays/capitale à trouver:
    let randomIndice = Math.floor(Math.random()*33);
    let randomCountry = arrayCountries[randomIndice];

    /* Je crée une nouvelle variable, answers, qui va récupérer toutes les capitales afin de pouvoir enlever la bonne réponse
    sans pour autant affecter le tableau des capitales dont on aura besoin pour les prochaines parties. 
    goodAnswer étant alors un tableau, à cause de la méthode .splice(), je le transforme en string.
    Je peux ensuite utiliser answers et le transformer en un tableau avec 3 mauvaises réponses et une bonne.
    */
    let answers = [...arrayCapitals]; 
    let goodAnswer = answers.splice(randomIndice, 1).toString(); 

    // je mélange le tableau avant de retirer les 29 capitales en trop
    answers = threeAnswers(randomizeAnswers(answers)); 
    answers.push(goodAnswer); // je rajoute la bonne réponse aux trois autres
    answers = randomizeAnswers(answers); // je remélange pour qu'elle ne soit pas toujours à la même place

    //je retourne un tableau contenant [le pays et un tableau de toutes les réponses]
    return [randomCountry, goodAnswer, answers]; 
} 

function display(data){ // (lepays, la réponse, un set de d'autres capitales aléatoire)

    // affiche le pays dont il faut trouver la capitale:
    let country = data[0];
    const pays = document.getElementById("country");
    pays.textContent= country; 

    // affiche les réponses:
    let arrayAnswers = data[2];
    
    // on associe à chaque option radio sa réponse:
    let a = arrayAnswers[0];
    let b = arrayAnswers[1];
    let c = arrayAnswers[2];
    let d = arrayAnswers[3];
    let answerA = document.getElementById("a");
    answerA.textContent=a; 
    let answerB = document.getElementById("b");
    answerB.textContent=b; 
    let answerC = document.getElementById("c");
    answerC.textContent=c; 
    let answerD = document.getElementById("d");
    answerD.textContent=d; 

    // chaque option devra ainsi avoir pour valeur le nom de la capitale qu'elle contient
    // on va pour cela ajouter à chaque élément un attribut value = "" correspondant
    let valueA = document.getElementById('aInput');
    valueA.setAttribute("value", a);
    let valueB = document.getElementById('bInput');
    valueB.setAttribute("value", b);
    let valueC = document.getElementById('cInput');
    valueC.setAttribute("value", c);
    let valueD = document.getElementById('dInput');
    valueD.setAttribute("value", d);
}

/* Enfin, je m'occupe du bouton:
Il devra, lorsqu'on clique dessus, soit quand on valide une réponse vérifier si le résultat est bien celui attendu. 
Et selon la réussite du participant:
    - envoyer le message adéquat
    - modifier le score en fonction et afficher le nouveau
Dans tous les cas, il devra relance un nouveau jeu. 
*/

let button = document.getElementById('button');
    button.addEventListener('click', function(e){
        e.preventDefault();

        // je crée une valeur qui récupère la valeur de l'input qui a l'attribut checked,
        // et une autre qui nous permettra d'envoyer le résultat:
        let valueInput = document.querySelector('input:checked').value;
        let resultat = document.getElementById('result');
    
        // je regarde si le résultat est le bon et j'agis en fonction:
        if(dataToDisplay[1] === valueInput){
            decompte++
            resultat.innerHTML= "Bien joué!";       
        } else {
            decompte--
            resultat.innerHTML= "Raté!";            
        }
        //j'affiche le nouveau score:
        score.textContent = decompte
        // je relance le jeu:
        dataToDisplay = abcdAnswers(countries, capitals);
        display(dataToDisplay);
    }); 


function threeAnswers(array){ // prend un tableau en argument et le renvoie avec seulement 3 capitales
    while(array.length > 3){
        array.pop();
    } 
    return array;
}

function randomizeAnswers(array){ // algorithme de Fisher pour mélanger un tableau:
    let i, j, k;
    for(i=array.length -1; i > 0; i--){
        j = Math.floor(Math.random() * (i+1));
        k = array[i];
        array[i] = array [j];
        array[j] = k;
    }
    return array;
}