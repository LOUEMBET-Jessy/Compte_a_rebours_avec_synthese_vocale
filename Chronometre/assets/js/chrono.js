   // Vérifie la compatibilité avec la synthèse vocale
   if ('speechSynthesis' in window) {
    // Crée une instance de l'objet de synthèse vocale
    var synthesis = window.speechSynthesis;

    // Crée un objet SpeechSynthesisUtterance avec le texte à synthétiser
    var utterance = new SpeechSynthesisUtterance("Bienvenue dans chronometre, appuyer sur start pour commencer !");

    // Démarre la synthèse vocale
    synthesis.speak(utterance);
  } else {
    console.log("La synthèse vocale n'est pas prise en charge par ce navigateur.");
  }

//Declaration des variables

var sp, t, ms, s, min, h, resetBtn, startBtn, startBtn;




//Fonction pour initialiser les variables au debut du programme
window.onload = function(){
    sp = document.getElementsByTagName('span');
    stopBtn = document.getElementById("stop");
    startBtn = document.getElementById("start");
    t;
    ms=0, s=0, min=0, h=0;
}

//Mise en place du compteur

function update_chrono(){
    ms+=1;
    if(ms==10){
        ms=1;
        s+=1
    }
    if(s==60){
        s=0;
        min+=1;
    }
    if(min==60){
        min=0;
        h+=1;
    }
    //Insertion des valeurs dans les spans
    sp[0].innerHTML = h + "h" ;
    sp[1].innerHTML = min + "min" ;
    sp[2].innerHTML = s + "s" ;
    sp[3].innerHTML = ms + "ms" ;
}

//lecture audio
var audio = new Audio();
audio.src = 'assets/js/bruit_minuterie_mp3_48033.mp3';


//Mise en place du boutton start

function start(){
    t = setInterval(update_chrono,100)//Cette ligne execute la fonction update_chrono toutes les 100ms
    startBtn.disabled = true
    audio.play();
}

//Stoper le chrono
function stop(){
    clearInterval(t)
    startBtn.disabled = false;
    audio.pause();
    audio.currentTime = 0;
}

//Initialiser les valeurs du compteur 

function reset(){
    clearInterval(t);
    startBtn.disabled = false;
    ms=0, s=0, min=0, h=0;

    //Inserer les nouvelles valeurs dans les spans
    
    sp[0].innerHTML = h + "h" ;
    sp[1].innerHTML = min + "min" ;
    sp[2].innerHTML = s + "s" ;
    sp[3].innerHTML = ms + "ms" ;
}





startBtn.addEventListener('click', function() {
  audio.play();
});

stopBtn.addEventListener('click', function() {
  audio.pause();
  audio.currentTime = 0;
});
