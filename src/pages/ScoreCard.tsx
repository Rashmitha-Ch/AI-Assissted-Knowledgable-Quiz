import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { fetchQuizFeedback } from "@/services/aiServices";

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { topic, questions, selectedAnswers, score, totalQuestions } = location.state || {};
  const [aiFeedback, setAiFeedback] = useState<string>("");

  if (!questions) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    return "Keep learning! 📚";
  };

  useEffect(() => {
    const loadFeedback = async () => {
      const feedback = await fetchQuizFeedback(topic, score, totalQuestions);
      setAiFeedback(feedback);
    };
    loadFeedback();
  }, [score, totalQuestions, topic]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50 w-full py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold text-foreground">Quiz Results</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Overview */}
          <div className="glass rounded-2xl p-8 mb-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold text-foreground mb-2">{getScoreMessage()}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Quiz on: <strong>{topic}</strong>
            </p>
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className={`text-4xl font-black ${getScoreColor()}`}>
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>

            {/* AI Feedback */}
            {aiFeedback ? (
              <p className="text-lg text-foreground mt-4">
                <strong>Feedback:</strong> {aiFeedback}
              </p>
            ) : (
              <p className="text-lg text-muted-foreground mt-4">Generating feedback...</p>
            )}

            <Button
              onClick={() => navigate("/", { state: { topic } })}
              className="gradient-hero text-white font-semibold px-8 py-3 rounded-xl hover:scale-105 transition-transform mt-6"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Take Another Quiz
            </Button>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Detailed Results</h3>
            {questions.map((question: any, index: number) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              const userAnswer = selectedAnswers[index];

              return (
                <div key={index} className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        Question {index + 1}: {question.question}
                      </h4>

                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => {
                          let className = "p-3 rounded-lg border ";
                          if (optionIndex === question.correctAnswer) {
                            className +=
                              "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                          } else if (optionIndex === userAnswer && !isCorrect) {
                            className +=
                              "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                          } else {
                            className += "border-border bg-card text-foreground";
                          }
                          return (
                            <div key={optionIndex} className={className}>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                <span>{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <XCircle className="w-4 h-4 text-red-500 ml-auto" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScoreCard;
