const utterance = new SpeechSynthesisUtterance();
const voices = speechSynthesis.getVoices();
// const voice = new SpeechSynthesisVoice();
// voice.name = 'Microsoft Zira Desktop - English (United States)';
utterance.rate = 1;
utterance.pitch = 1;

export default function speak(text: string) {
  if (speechSynthesis.speaking) return;
  utterance.voice = voices[20];
  console.log('voices', voices);
  console.log('voice type', typeof voices[20]);
  utterance.text = text;
  console.log('utterance', utterance);

  // utterance.name = 'Microsoft Zira Desktop - English (United States)'
  speechSynthesis.speak(utterance);
}
