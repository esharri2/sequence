export default text => {
  if (typeof window === "undefined") {
    return false;
  }

  if (navigator.vibrate) {
    navigator.vibrate([30, 30, 30]);
  }
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
};
