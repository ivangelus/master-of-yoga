export interface Classifier {
  storageKey: string;
  labels: string[];
  isReady: boolean;
}

export const initialStateClassifier: Classifier = {
  storageKey: 'master-yoga-classifier',
  isReady: false,
  labels: [],
};
