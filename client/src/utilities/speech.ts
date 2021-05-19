const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.9;
utterance.pitch = 0.9;

export default function speak(text: string): void {
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  speechSynthesis.speak(utterance);
}
