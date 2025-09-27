import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { fetchQuizQuestions, QuizQuestion } from "@/services/aiServices";

const QuizPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = (location.state as { topic?: string })?.topic || "General Knowledge";

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const formatted: QuizQuestion[] = await fetchQuizQuestions(topic);
        setQuestions(formatted);
      } catch (error) {
        console.error("Gemini error:", error);
        setErrorMsg("⚠️ Could not load quiz. Try again.");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [topic]);

  const handlePrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === undefined) return;
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleViewScore = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    navigate("/score", {
      state: {
        topic,
        questions,
        selectedAnswers,
        score,
        totalQuestions: questions.length,
      },
    });
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50 w-full py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">Quiz: {topic}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="w-24" /> {/* spacer */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-muted h-2">
        <div
          className="gradient-hero h-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-lg font-medium text-muted-foreground">
            Loading quiz...
          </div>
        ) : errorMsg ? (
          <div className="text-center text-red-500 font-medium">{errorMsg}</div>
        ) : (
          <div
            className={`max-w-2xl mx-auto transition-all duration-300 ${
              isAnimating
                ? "transform translate-y-4 opacity-50"
                : "transform translate-y-0 opacity-100"
            }`}
          >
            {/* Question Card */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 leading-relaxed">
                {currentQ?.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQ?.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer
                      transition-all duration-200 hover:scale-[1.02]
                      ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border bg-card hover:border-primary/50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      name={`question-${currentQuestion}`}
                      value={index}
                      checked={selectedAnswers[currentQuestion] === index}
                      onChange={() => handleAnswerSelect(index)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }
                    `}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg text-foreground font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </Button>
            </div>

            <div className="text-center">
              {isLastQuestion ? (
                <Button
                  onClick={handleViewScore}
                  disabled={!hasAnswered}
                  size="lg"
                  className="gradient-success text-white font-semibold px-12 py-4 rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  View Score
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!hasAnswered}
                  size="lg"
                  className="gradient-success text-white font-semibold px-12 py-4 rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  Next Question
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
