export enum GameMode {
  ONE_PLAYER = 'ONE_PLAYER',
  TWO_PLAYER = 'TWO_PLAYER',
}

export enum AppView {
  WELCOME = 'WELCOME',
  MENU = 'MENU',
  QUIZ = 'QUIZ',
  WHEEL_PREP = 'WHEEL_PREP',
  WHEEL_GAME = 'WHEEL_GAME',
}

export interface SubQuestion {
  id: number;
  text: string;
  isCorrect: boolean; // True if the statement is True
  explanation: string;
}

export interface Question {
  id: number;
  lessonId: number; // 1 to 4 for lessons, 5 for wheel
  scenario: string; // The context or code snippet
  items: SubQuestion[]; // Exactly 4 items
}

export interface PlayerState {
  id: number;
  name: string;
  score: number;
  badges: string[];
}

export interface GameState {
  view: AppView;
  mode: GameMode;
  currentLessonId: number | null;
  currentQuestionIndex: number;
  players: PlayerState[];
  turn: number; // 0 for player 1, 1 for player 2
  wheelUnlocked: boolean;
  wheelQuestionsAnswered: number;
}
