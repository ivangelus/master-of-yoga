export interface Classifier {
  storageKey: string;
  labels?: [];
  isReady: boolean;
}

export const initialStateClassifier: Classifier = {
  storageKey: 'master-yoga-classifier',
  isReady: false,
};
