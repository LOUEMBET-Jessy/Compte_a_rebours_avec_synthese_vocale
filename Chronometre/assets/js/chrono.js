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

//Mise en place du boutton start

function start(){
    t = setInterval(update_chrono,100)//Cette ligne execute la fonction update_chrono toutes les 100ms
    startBtn.disabled = true
}

//Stoper le chrono
function stop(){
    clearInterval(t)
    startBtn.disabled = false;
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