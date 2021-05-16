const utterance = new SpeechSynthesisUtterance();
const voices = speechSynthesis.getVoices();
utterance.rate = 1;
utterance.pitch = 1;

export default function speak(text: string): void {
  if (speechSynthesis.speaking) return;
  utterance.voice = voices[20];
  utterance.text = text;
  speechSynthesis.speak(utterance);
}
