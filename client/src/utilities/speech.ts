const utterance = new SpeechSynthesisUtterance();
const voices = speechSynthesis.getVoices();

export default function speak(text: string): void {
  if (speechSynthesis.speaking) return;

  utterance.text = text;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.voice = voices[20];
  utterance.lang = 'en-US';

  speechSynthesis.speak(utterance);
}
