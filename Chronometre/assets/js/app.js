document.addEventListener('DOMContentLoaded', function() {

  

  // Liaison avec les éléments HTML (le DOM)
  var bodyEl = document.getElementsByTagName('body')[0];
  var titleEl = document.getElementById('title');
  var minuteurEl = document.getElementById('minuteur');
  var joursEl = document.getElementById('jour');
  var heuresEl = document.getElementById('heur');
  var minutesEl = document.getElementById('min');
  var secondesEl = document.getElementById('sec');

  // Adapter notre fuseau horaire par rapport à notre zone
  var now = new Date();
  var dateOffsetInMinutes = now.getTimezoneOffset();

  // Convertir les différents éléments en millisecondes
  var jourMs = 1000 * 60 * 60 * 24;
  var heureMs = 1000 * 60 * 60;
  var minuteMs = 1000 * 60;

  // Date de fin du compte à rebours (initialisée à la date actuelle)
  var finDecompte = Date.now();

  // Fonction pour mettre à jour la date de fin du compte à rebours
  function updateFinDecompte(jours, heures, minutes, secondes) {
    var now = Date.now();
    finDecompte = now + jours * jourMs + heures * heureMs + minutes * minuteMs + secondes * 1000;
  }

  // Fonction pour calculer et afficher le compte à rebours
  function getCountdown() {
    var nowDate = Date.now();
    var tempsRestantMs = finDecompte - nowDate + dateOffsetInMinutes + minuteMs;

    var nbJours = Math.floor(tempsRestantMs / jourMs);
    var resteTempSansJoursMs = tempsRestantMs - nbJours * jourMs;
    var nbHeures = Math.floor(resteTempSansJoursMs / heureMs);
    var resteTempSansHeuresMs = resteTempSansJoursMs - nbHeures * heureMs;
    var nbMinutes = Math.floor(resteTempSansHeuresMs / minuteMs);
    var resteTempSansMinutesMs = resteTempSansHeuresMs - nbMinutes * minuteMs;
    var nbSecondes = Math.floor(resteTempSansMinutesMs / 1000);

    joursEl.textContent = nbJours;
    heuresEl.textContent = nbHeures;
    minutesEl.textContent = nbMinutes;
    secondesEl.textContent = nbSecondes;

    if (tempsRestantMs < 10000) {
      secondesEl.style.color = 'red';
    }

    if (tempsRestantMs <= 0) {
      clearInterval(countDownInterval);
      bodyEl.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2023/02/24/05/43/joker-7810248_1280.jpg")';
      joursEl.textContent = 0;
      heuresEl.textContent = 0;
      minutesEl.textContent = 0;
      secondesEl.textContent = 0;
      titleEl.innerHTML = 'Temps écoulé !!! &#127881; &#127881;'; // Lecture à voix haute du titre
      ////////////////Ma fonction de synthese vocale/////////////////////////
      // Vérifie la compatibilité avec la synthèse vocale
    if ('speechSynthesis' in window) {
      // Crée une instance de l'objet de synthèse vocale
      var synthesis = window.speechSynthesis;

      // Crée un objet SpeechSynthesisUtterance avec le texte à synthétiser
      var utterance = new SpeechSynthesisUtterance("Compte à rebours terminé ! Veillez renseigner d'autre coordonnées et cliquez sur Actualiser pour relancer un nouveau decompte !");

      // Démarre la synthèse vocale
      synthesis.speak(utterance);
    } else {
      console.log("La synthèse vocale n'est pas prise en charge par ce navigateur.");
    }
      //////////////////////////////////////////////////////////////////////
    }
  }

  // Actualisation de la fonction chaque seconde dans le navigateur
  var countDownInterval;

  // Gestion de l'événement lorsque l'utilisateur soumet le formulaire
  document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs saisies par l'utilisateur
    var joursSaisis = parseInt(document.getElementById('joursInput').value, 10);
    var heuresSaisies = parseInt(document.getElementById('heuresInput').value, 10);
    var minutesSaisies = parseInt(document.getElementById('minutesInput').value, 10);
    var secondesSaisies = parseInt(document.getElementById('secondesInput').value, 10);

    // Vérifier que les valeurs saisies sont valides
    if (isNaN(joursSaisis) || isNaN(heuresSaisies) || isNaN(minutesSaisies) || isNaN(secondesSaisies)) {
      alert('Veuillez entrer des valeurs numériques valides.');
      return;
    }

    // Mettre à jour la date de fin du compte à rebours
    updateFinDecompte(joursSaisis, heuresSaisies, minutesSaisies, secondesSaisies);

    // Mettre à jour le compte à rebours immédiatement
    getCountdown();

    // Actualiser le compte à rebours chaque seconde
    clearInterval(countDownInterval);
    countDownInterval = setInterval(getCountdown, 1000);
  });

  // Initialisation du programme (récupérer l'heure à l'intérieur de notre HTML)
  getCountdown();
});
