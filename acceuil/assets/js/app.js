   // Vérifie la compatibilité avec la synthèse vocale
   if ('speechSynthesis' in window) {
    // Crée une instance de l'objet de synthèse vocale
    var synthesis = window.speechSynthesis;

    // Crée un objet SpeechSynthesisUtterance avec le texte à synthétiser
    var utterance = new SpeechSynthesisUtterance("Bonsoir à tous ! Je suis MOUSSAVOU, l'assistant vocal du groupe numéro 9 ! Le groupe 9 par ma voix, vous souhaite la bienvenue sur son programme. Veuillez choisir l'outil dont vous avez besoin");

    // Démarre la synthèse vocale
    synthesis.speak(utterance);
  } else {
    console.log("La synthèse vocale n'est pas prise en charge par ce navigateur.");
  }

const titreSpans = document.querySelectorAll('h1 span');
const btns = document.querySelectorAll('.btn-first');
const logo = document.querySelector('.logo');
const medias = document.querySelectorAll('.bulle');
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');

window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(titreSpans, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
    .staggerFrom(btns, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1')
    .from(l1, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(l2, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(logo, 0.4, {transform: "scale(0)", ease: "power2.out"}, '-=2')
    .staggerFrom(medias, 1, {right: -200, ease: "power2.out"}, 0.3, '-=1');

    
    

    TL.play();
})