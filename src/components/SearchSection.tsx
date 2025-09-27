import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Types ---
interface RawQuizQuestion {
  question: string;
  options: Record<"A" | "B" | "C" | "D", string>;
  answer: "A" | "B" | "C" | "D";
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// --- Google Generative AI instance ---
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      console.log('Gemini key:', import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Generate 5 multiple-choice quiz questions about: ${query}.
Return the result as a JSON array of objects in the following format:
[
  {
    "question": "Question text?",
    "options": {
      "A": "Option A",
      "B": "Option B",
      "C": "Option C",
      "D": "Option D"
    },
    "answer": "A"
  }
]`;

      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();

      // Strip any ```json or ``` markdown formatting if present
      text = text.replace(/```json|```/g, "").trim();

      // Parse and transform to match frontend format
      const parsed: RawQuizQuestion[] = JSON.parse(text);
      const formatted: QuizQuestion[] = parsed.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: Object.values(q.options),
        correctAnswer: ["A", "B", "C", "D"].indexOf(q.answer),
      }));

      navigate("/quiz", {
        state: {
          topic: query,
          questions: formatted,
        },
      });
    } catch (error) {
      console.error("Gemini error:", error);
      alert("❌ Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ask me anything!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Type your question or topic you'd like to explore. I’ll create a personalized quiz just for you.
          </p>
        </div>

        {/* Input Box */}
        <div className="relative max-w-2xl mx-auto">
          <div className="glass-primary border border-glass-border rounded-2xl p-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter the topic you want to be quizzed on..."
                  className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground/70"
                />
              </div>

              <Button
  size="lg"
  onClick={handleGenerate}
  disabled={!query || loading}
  className="
    px-6 py-4 
    bg-white dark:bg-gray-900 
    text-blue-600 dark:text-white 
    font-semibold rounded-xl 
    shadow-glow hover:scale-105 hover:bg-white dark:hover:bg-gray-900
    transition-transform disabled:opacity-50
  "
>
  {loading ? (
    <span className="animate-pulse">Generating...</span>
  ) : (
    <>
      <Sparkles className="w-5 h-5 mr-2" />
      Generate Quiz
    </>
  )}
</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
