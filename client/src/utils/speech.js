export default text => {
  // if (typeof window === "undefined") {
  //   return false;
  // }

  // if (navigator.vibrate) {
  //   navigator.vibrate([30, 30, 30]);
  // }

  if (!speechSynthesis) {
    alert(
      "Sorry! Your device or browser doesn't allow me to make sound. Vois won't work for you on this device."
    );
  } else {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
};
