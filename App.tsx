import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, Play, Users, User, ArrowLeft, ArrowRight, Star, Home, RotateCcw, CheckCircle, XCircle, Info, Check, Square, SquareCheck } from 'lucide-react';
import { GameState, AppView, GameMode, PlayerState, Question } from './types';
import { QUIZ_QUESTIONS, WHEEL_QUESTIONS, LESSON_NAMES } from './questions';
import Button from './components/Button';
import Wheel from './components/Wheel';
import { playSound } from './soundService';

const INITIAL_PLAYERS: PlayerState[] = [
  { id: 1, name: 'Người chơi 1', score: 0, badges: [] },
  { id: 2, name: 'Người chơi 2', score: 0, badges: [] },
];

const TIMER_SECONDS = 60; // 60s for 4 statements

function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState<GameState>({
    view: AppView.WELCOME,
    mode: GameMode.ONE_PLAYER,
    currentLessonId: null,
    currentQuestionIndex: 0,
    players: INITIAL_PLAYERS,
    turn: 0,
    wheelUnlocked: false,
    wheelQuestionsAnswered: 0
  });

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
  } | null>(null);

  const [wheelPrize, setWheelPrize] = useState<string | null>(null);

  // --- REFS ---
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- HELPERS ---
  const getCurrentQuestion = (): Question | null => {
    if (gameState.view === AppView.WHEEL_PREP) {
       return WHEEL_QUESTIONS[gameState.wheelQuestionsAnswered];
    }
    if (gameState.currentLessonId === null) return null;
    const lessonQuestions = QUIZ_QUESTIONS.filter(q => q.lessonId === gameState.currentLessonId);
    return lessonQuestions[gameState.currentQuestionIndex];
  };

  const getLessonLength = (lessonId: number) => {
      return QUIZ_QUESTIONS.filter(q => q.lessonId === lessonId).length;
  };

  // --- EFFECTS ---
  useEffect(() => {
    if (feedback?.show || gameState.view === AppView.WELCOME || gameState.view === AppView.MENU || gameState.view === AppView.WHEEL_GAME) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if(gameState.view === AppView.QUIZ || gameState.view === AppView.WHEEL_PREP) {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1) {
                handleTimeOut();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.view, gameState.currentQuestionIndex, gameState.wheelQuestionsAnswered, feedback]);

  const handleTimeOut = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      playSound('wrong');
      setFeedback({
          show: true,
          isCorrect: false
      });
  };

  // --- HANDLERS ---
  const startGame = (mode: GameMode) => {
    setGameState({
      ...gameState,
      view: AppView.MENU,
      mode: mode,
      players: INITIAL_PLAYERS.map(p => ({...p})), // Reset players
      turn: 0
    });
    playSound('click');
  };

  const startLesson = (lessonId: number) => {
    setGameState({
      ...gameState,
      currentLessonId: lessonId,
      currentQuestionIndex: 0,
      view: AppView.QUIZ,
      turn: 0
    });
    setTimeLeft(TIMER_SECONDS);
    setSelectedItemIds([]);
    setFeedback(null);
  };

  const startWheelPrep = () => {
    setGameState({
        ...gameState,
        view: AppView.WHEEL_PREP,
        wheelUnlocked: false,
        wheelQuestionsAnswered: 0
    });
    setTimeLeft(15); // Faster for wheel prep
    setSelectedItemIds([]);
    setFeedback(null);
  }

  const toggleSelection = (itemId: number) => {
      if (feedback?.show) return;
      playSound('click');
      setSelectedItemIds(prev => {
          if (prev.includes(itemId)) {
              return prev.filter(id => id !== itemId);
          } else {
              return [...prev, itemId];
          }
      });
  };

  const submitAnswer = () => {
    const q = getCurrentQuestion();
    if (!q) return;

    // Wheel Prep only has 1 item, but logic is same: user selects it if True.
    // If wheel item is False, user should NOT select it? 
    // Wait, Wheel questions in source are simple T/F. 
    // To keep UI consistent, let's assume Wheel Prep asks "Câu này Đúng hay Sai?". 
    // But my UI is "Select correct statements".
    // For Wheel Prep, let's adapt: if the item is correct, they must select it. If false, don't select?
    // That's confusing. Let's make Wheel Prep items ALWAYS True statements in `questions.ts` or make the UI handle "True/False" buttons for Wheel Prep specifically?
    // Actually, I modified `questions.ts` Wheel items to be simple text like "Def defines function?".
    // Let's stick to "Select the True statements" logic. It's consistent.

    const correctIds = q.items.filter(i => i.isCorrect).map(i => i.id);
    const userIds = selectedItemIds;
    
    // Sort for comparison
    const sortedUser = [...userIds].sort();
    const sortedCorrect = [...correctIds].sort();

    const isPerfect = 
        sortedUser.length === sortedCorrect.length && 
        sortedUser.every((value, index) => value === sortedCorrect[index]);

    if (isPerfect) {
        playSound('correct');
        const points = gameState.view === AppView.WHEEL_PREP ? 10 : 10; // 10 points per big question

        setGameState(prev => {
            const players = [...prev.players];
            players[prev.turn].score += points;
            
            // Badge logic
            if (players[prev.turn].score >= 50 && !players[prev.turn].badges.includes('🌟')) {
                players[prev.turn].badges.push('🌟');
            }
            if (players[prev.turn].score >= 150 && !players[prev.turn].badges.includes('🏆')) {
                players[prev.turn].badges.push('🏆');
            }
            if (players[prev.turn].score >= 300 && !players[prev.turn].badges.includes('👑')) {
                players[prev.turn].badges.push('👑');
            }

            return { ...prev, players };
        });
    } else {
        playSound('wrong');
    }

    setFeedback({
      show: true,
      isCorrect: isPerfect
    });
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedItemIds([]);
    setTimeLeft(gameState.view === AppView.WHEEL_PREP ? 15 : TIMER_SECONDS);

    if (gameState.view === AppView.WHEEL_PREP) {
        if (feedback?.isCorrect) {
             const nextCount = gameState.wheelQuestionsAnswered + 1;
             if (nextCount >= WHEEL_QUESTIONS.length) {
                 setGameState(prev => ({
                     ...prev,
                     wheelUnlocked: true,
                     view: AppView.WHEEL_GAME
                 }));
             } else {
                 setGameState(prev => ({
                     ...prev,
                     wheelQuestionsAnswered: nextCount
                 }));
             }
        } else {
            alert("Rất tiếc! Bạn phải trả lời đúng liên tiếp để quay thưởng.");
            setGameState(prev => ({
                ...prev,
                view: AppView.MENU,
                wheelQuestionsAnswered: 0
            }));
        }
        return;
    }

    // Normal Quiz Logic
    const currentLessonLength = getLessonLength(gameState.currentLessonId!);
    const nextIndex = gameState.currentQuestionIndex + 1;

    if (nextIndex >= currentLessonLength) {
        alert("Chúc mừng! Bạn đã hoàn thành bài học.");
        setGameState(prev => ({ ...prev, view: AppView.MENU }));
    } else {
        setGameState(prev => ({
            ...prev,
            currentQuestionIndex: nextIndex,
            turn: prev.mode === GameMode.TWO_PLAYER ? (prev.turn === 0 ? 1 : 0) : 0
        }));
    }
  };

  const handleWheelPrize = (prize: string) => {
    setWheelPrize(prize);
    if (prize.includes("Điểm")) {
        const points = parseInt(prize.replace(/\D/g, '')) || 0;
        setGameState(prev => {
            const players = [...prev.players];
            players[prev.turn].score += points;
            return { ...prev, players };
        });
    }
    if (prize.includes("X2")) {
        setGameState(prev => {
            const players = [...prev.players];
            players[prev.turn].score *= 2;
            return { ...prev, players };
        });
    }
  };

  // --- RENDER HELPERS ---
  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in text-center p-4">
      <h1 className="text-6xl font-black text-white drop-shadow-lg tracking-tight mb-4">
        🐍 Python Rainbow Quest 🌈
      </h1>
      <p className="text-xl text-white/90 font-medium max-w-2xl">
        Ôn tập kiến thức Tin học 10 với các thử thách thú vị!
      </p>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Button onClick={() => startGame(GameMode.ONE_PLAYER)} className="text-xl px-8 py-4 transform hover:-translate-y-1">
          <User className="w-6 h-6" /> 1 Người Chơi
        </Button>
        <Button onClick={() => startGame(GameMode.TWO_PLAYER)} variant="secondary" className="text-xl px-8 py-4 transform hover:-translate-y-1">
          <Users className="w-6 h-6" /> 2 Người Chơi
        </Button>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-4xl w-full mx-auto animate-slide-up">
      <div className="md:col-span-2 text-center mb-4">
         <h2 className="text-3xl font-bold text-white mb-2">Chọn Bài Học</h2>
         <div className="flex justify-center gap-4">
            {gameState.players.map(p => (
                <div key={p.id} className="bg-white/20 backdrop-blur rounded-lg p-2 text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-bold">{p.name}: {p.score} pts</span>
                    <span>{p.badges.join('')}</span>
                </div>
            ))}
         </div>
      </div>
      
      {[1, 2, 3, 4].map((id) => (
        <button
          key={id}
          onClick={() => startLesson(id)}
          className="bg-white/90 hover:bg-white backdrop-blur-md p-6 rounded-2xl shadow-xl transition-all hover:scale-105 group text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-24 h-24 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">{(LESSON_NAMES as any)[id]}</h3>
          <p className="text-indigo-600 font-medium">8 Câu hỏi</p>
        </button>
      ))}

      <button
        onClick={startWheelPrep}
        className="md:col-span-2 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-xl text-white font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        <Star className="w-8 h-8 animate-spin-slow" />
        VÒNG QUAY MAY MẮN (Bonus)
        <Star className="w-8 h-8 animate-spin-slow" />
      </button>
      
      <div className="md:col-span-2 flex justify-center mt-8">
         <Button variant="outline" onClick={() => setGameState(prev => ({ ...prev, view: AppView.WELCOME }))}>
            <Home className="w-4 h-4" /> Quay lại
         </Button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const q = getCurrentQuestion();
    if (!q) return <div>Lỗi tải câu hỏi</div>;

    const currentPlayer = gameState.players[gameState.turn];
    const isWheelPrep = gameState.view === AppView.WHEEL_PREP;
    
    // Calculate progress based on number of questions
    const totalQ = isWheelPrep ? WHEEL_QUESTIONS.length : getLessonLength(gameState.currentLessonId!);
    const progress = isWheelPrep ? gameState.wheelQuestionsAnswered : gameState.currentQuestionIndex;

    return (
      <div className="max-w-4xl w-full mx-auto p-4 flex flex-col h-full animate-fade-in pb-20">
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-6 bg-white/20 backdrop-blur p-4 rounded-xl text-white">
          <Button variant="outline" onClick={() => setGameState(prev => ({...prev, view: AppView.MENU}))} className="py-1 px-3 text-sm">
             <ArrowLeft className="w-4 h-4" /> Menu
          </Button>
          
          <div className="flex items-center gap-2 font-mono text-2xl font-bold">
             <Clock className={`w-6 h-6 ${timeLeft < 10 ? 'animate-ping text-red-300' : ''}`} />
             {timeLeft}s
          </div>

          <div className="flex items-center gap-2">
             <span className="hidden md:inline">{currentPlayer.name}</span>
             <div className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-bold">
                {currentPlayer.score}
             </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-black/20 h-2 rounded-full mb-6">
             <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(progress / totalQ) * 100}%` }}
             />
        </div>

        {/* Question Title */}
        <div className="bg-white rounded-t-3xl shadow-xl p-6 relative z-10">
             <h3 className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2">
                {isWheelPrep ? "Thử thách Vòng Quay" : (LESSON_NAMES as any)[gameState.currentLessonId!]}
            </h3>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded mb-2 text-gray-600">
                Câu {progress + 1}/{totalQ}
            </p>
            <div className="bg-gray-50 border-l-4 border-indigo-500 p-4 rounded text-gray-800 font-medium whitespace-pre-wrap">
                 {q.scenario}
            </div>
            {!isWheelPrep && <p className="text-indigo-500 text-sm font-bold mt-2 text-center uppercase tracking-wide animate-pulse">
                👇 Chọn các phát biểu ĐÚNG dưới đây 👇
            </p>}
        </div>

        {/* Options Grid */}
        <div className="bg-white/90 backdrop-blur rounded-b-3xl shadow-2xl p-6 pt-0 grid grid-cols-1 gap-4">
            {q.items.map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                
                // Feedback Styles
                let cardStyle = "border-2 hover:bg-indigo-50 cursor-pointer";
                let icon = isSelected ? <SquareCheck className="w-6 h-6 text-indigo-600" /> : <Square className="w-6 h-6 text-gray-400" />;

                if (feedback?.show) {
                    // Logic for showing results
                    if (item.isCorrect) {
                        // It was correct
                        cardStyle = "border-2 border-green-500 bg-green-50";
                        icon = <CheckCircle className="w-6 h-6 text-green-600" />;
                    } else {
                        // It was wrong (should not be selected)
                         if(isSelected) {
                            cardStyle = "border-2 border-red-500 bg-red-50";
                            icon = <XCircle className="w-6 h-6 text-red-600" />;
                         } else {
                            cardStyle = "border-2 border-gray-100 opacity-50";
                         }
                    }
                } else {
                    if (isSelected) {
                        cardStyle = "border-2 border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.01]";
                    } else {
                        cardStyle = "border-2 border-gray-200";
                    }
                }

                return (
                    <div 
                        key={item.id}
                        onClick={() => toggleSelection(item.id)}
                        className={`p-4 rounded-xl transition-all duration-200 flex flex-col md:flex-row gap-4 items-start md:items-center ${cardStyle}`}
                    >
                        <div className="flex-shrink-0 pt-1 md:pt-0">
                            {icon}
                        </div>
                        <div className="flex-grow">
                            <p className={`font-medium text-lg ${feedback?.show && item.isCorrect ? 'text-green-900' : 'text-gray-700'}`}>
                                {item.text}
                            </p>
                            {feedback?.show && (
                                <p className={`text-sm mt-2 p-2 rounded ${item.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    👉 {item.explanation}
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-center">
            {!feedback ? (
                <Button 
                    onClick={submitAnswer} 
                    className="text-xl px-12 py-4 animate-bounce-in shadow-xl shadow-indigo-500/30"
                >
                    Kiểm tra <Check className="w-6 h-6" />
                </Button>
            ) : (
                <div className="flex flex-col items-center gap-4 animate-slide-up w-full">
                     <div className={`text-xl font-bold px-6 py-2 rounded-full ${feedback.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {feedback.isCorrect ? "Xuất sắc! +10 điểm" : "Chưa chính xác!"}
                     </div>
                     <Button onClick={nextQuestion} variant="secondary" className="text-xl px-12 py-4 w-full md:w-auto">
                         Tiếp tục <ArrowRight className="w-6 h-6" />
                    </Button>
                </div>
            )}
        </div>

      </div>
    );
  };

  const renderWheelGame = () => (
      <div className="flex flex-col items-center justify-center h-full animate-fade-in p-4 text-center">
          <h2 className="text-4xl font-black text-white drop-shadow-md mb-4">VÒNG QUAY MAY MẮN</h2>
          {!wheelPrize ? (
              <Wheel onSpinEnd={handleWheelPrize} />
          ) : (
              <div className="bg-white p-8 rounded-3xl shadow-2xl animate-pop-in flex flex-col items-center gap-6">
                  <h3 className="text-2xl font-bold text-gray-600">Bạn nhận được:</h3>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      {wheelPrize}
                  </div>
                  <Button onClick={() => {
                      setWheelPrize(null);
                      setGameState(prev => ({...prev, view: AppView.MENU, wheelUnlocked: false, wheelQuestionsAnswered: 0}));
                  }}>
                      Tuyệt vời!
                  </Button>
              </div>
          )}
      </div>
  )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 font-sans selection:bg-pink-300 overflow-y-auto relative">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-green-300 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-pink-300 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {gameState.view === AppView.WELCOME && renderWelcome()}
        {gameState.view === AppView.MENU && renderMenu()}
        {(gameState.view === AppView.QUIZ || gameState.view === AppView.WHEEL_PREP) && renderQuiz()}
        {gameState.view === AppView.WHEEL_GAME && renderWheelGame()}
      </div>
    </div>
  );
}

export default App;
