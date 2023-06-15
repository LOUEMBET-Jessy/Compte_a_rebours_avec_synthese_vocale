document.addEventListener('DOMContentLoaded', function() {
  // Mes bagages sur la synthèse vocale en js
  var synthesis = window.speechSynthesis;
  var selectVoice = document.getElementById('voice');
  var selectLanguage = document.getElementById('language');

  function populateVoices() {
    var voices = synthesis.getVoices();
    selectVoice.innerHTML = '';
    voices.forEach(function(item, i) {
      var opt = document.createElement('option');
      opt.value = i;
      opt.innerText = item.name + ' (' + item.lang + ')';
      selectVoice.appendChild(opt);
    });
  }

  // Mettre à jour la liste des voix lorsque la synthèse vocale est prête
  synthesis.onvoiceschanged = populateVoices;

  ///////////////////////////////////////////

  // Liaison avec les éléments HTML (le DOM)
  var bodyEl = document.body;
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
      bodyEl.style.backgroundImage = 'url("https://th.bing.com/th/id/R.562eb36f9a65449daf6e1f3c6a6c04ca?rik=HlMdyxCvWQNjhw&riu=http%3a%2f%2fwww.cyrilalmeras.com%2fcartes-gratuites%2fIM6EA_-carte-Bonne-Annee-2011-feu-artifice.jpg&ehk=0Ebux2irOgWaGJoB8R%2fH264Zi6qy1gp%2fYvTDQ0l37T0%3d&risl=&pid=ImgRaw&r=0")';
      joursEl.textContent = 0;
      heuresEl.textContent = 0;
      minutesEl.textContent = 0;
      secondesEl.textContent = 0;
      titleEl.innerHTML = 'Bonne et heureuse Année !!! &#127881; &#127881;'; // Lecture à voix haute du titre

      // Récupérer la voix et la langue sélectionnées
      var selectedVoiceIndex = selectVoice.value;
      var selectedLanguage = selectLanguage.value;

      // Vérifier la compatibilité avec la synthèse vocale
      if ('speechSynthesis' in window) {
        // Créer une instance de l'objet de synthèse vocale
        var synthesis = window.speechSynthesis;

        // Créer un objet SpeechSynthesisUtterance avec le texte à synthétiser
        var utterance = new SpeechSynthesisUtterance("Compte à rebours terminé ! Veillez renseigner d'autres coordonnées et cliquez sur Actualiser pour relancer un nouveau décompte !");
        
        // Récupérer la voix et la langue sélectionnées
        var selectedVoice = synthesis.getVoices()[selectedVoiceIndex];
        utterance.voice = selectedVoice;
        utterance.lang = selectedLanguage;

        // Démarrer la synthèse vocale
        synthesis.speak(utterance);
      } else {
        console.log("La synthèse vocale n'est pas prise en charge par ce navigateur.");
      }
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
