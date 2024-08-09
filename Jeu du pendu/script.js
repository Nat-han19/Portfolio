const hiddenText    = document.getElementById("hiddenText");
const button        = document.getElementById("button");
const buttonWord    = document.getElementById("buttonWord")
const words         = ["JAVASCRIPT",
                    "PROGRAMMATION",
                    "BELIEVEMY",
                    "CODEPEN",
                    "GIT",
                    "PERSEVERANCE",
                    "FLEXBOX",
                    "GRID",
                    "MOTIVATION",];                  
const score         = 10;
const letters       = document.querySelectorAll("#keyboard li");
const word          = words[Math.floor(Math.random() * words.length)];
let lettersFound    = 0;
const hangmanImages = document.querySelectorAll('#hangMan img');
let attempts        = 11;
let attemptsImg     = 1

for (let i = 0; i < letters.length; i++) {
  letters[i].addEventListener("click", function () {

    const letter = letters[i].textContent;
    if (word.includes(letter)) {
        letters[i].classList.add("active-success");
        // Afficher les lettres qui sont trouvées dans le mot 
        // On parcours toutes les lettres du mot
        for (let i = 0; i < word.length; i++) {
            // Si la lettre cliquée est égale à la lettre parcourue grace à la boucle
            if (word[i] == letter) {
                // On va récupérer la span correspondante
                const span = document.querySelector('#hiddenText span:nth-child(' + (i + 1) + ')')
                // On change le contenu text (textContent) de la lettre 
                span.textContent = letter;
                lettersFound++;
            }
          }

        // Vérifier si l'utilisateur a gagné
        // Si lettersFound (lettres trouvées) est égal à la taille du mot
        if (lettersFound == word.length) {
            document.querySelector('.alert').textContent = "BRAVO, tu as gagné !😊";   
          }          
    } else {
        letters[i].classList.add("active-error");
        attempts--;
        attemptsImg++
        document.querySelector('.attempts').textContent = attempts
 
        // On ajoute un membre du pendu
        let membrePendu = document.querySelector('#hangMan img:nth-child(' + (attemptsImg-1) + ')').style.display ='block'
                          document.querySelector('#hangMan img:nth-child(' + (attemptsImg-2) + ')').style.display = 'none';

        // Si le nombre de tentative est à 0, indiquer à l'utilisateur qu'il a perdu
        if (attempts <= 0) {
          // console.log("Tu as perdu !")
          document.querySelector('.alert').textContent = "DOMMAGE, tu as perdu !😢 Le mot était " + word +"";     
    }
    }
  })
}
for (let i = 0; i < word.length; i++) {
  hiddenText.innerHTML += "<span>_</span>";
}

// Rejouer -> Au clique sur le bouton "Rejouer" -> recharger la page RELOAD
button.addEventListener('click', function() {
  location.reload(); 
});
 
// Proposer un mot -> Au clique sur le bouton "Proposer un mot" -> Afficher une fenêtre
buttonWord.addEventListener('click', function() {
let proposition = prompt ("Quel mot pensez-vous avoir trouvé ?");

if (proposition.toUpperCase() === word.toUpperCase()) {
   document.querySelector('.alert').textContent = "BRAVO, tu as gagné !😊";  
   document.querySelector('#hiddenText').textContent = word;
 
} else {
  document.querySelector('.alert').textContent = "DOMMAGE, tu as perdu !😢 Le mot était " + word +"";
  document.querySelector('#hiddenText').textContent = word;
  document.querySelector('#hangMan img[src="images/11.png"]').style.display = 'block';
}
})