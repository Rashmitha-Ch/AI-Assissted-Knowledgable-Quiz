import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Types ---
export interface RawQuizQuestion {
  question: string;
  options: Record<"A" | "B" | "C" | "D", string>;
  answer: "A" | "B" | "C" | "D";
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// API CALL 1: Generate Quiz Questions

export const fetchQuizQuestions = async (topic: string): Promise<QuizQuestion[]> => {
  const prompt = `Generate 5 multiple-choice quiz questions about: ${topic}.
Return the result strictly as a JSON array of objects in this format:
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
// Call Gemini API
  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  text = text.replace(/```json|```/g, "").trim();

  const parsed: RawQuizQuestion[] = JSON.parse(text);

  return parsed.map((q, i) => ({
    id: i + 1,
    question: q.question,
    options: Object.values(q.options),
    correctAnswer: ["A", "B", "C", "D"].indexOf(q.answer),
  }));
};

// API CALL 2: Generate Feedback

export const fetchQuizFeedback = async (
  topic: string,
  score: number,
  totalQuestions: number
): Promise<string> => {
  const prompt = `Give a short feedback message for a quiz participant.
Topic: ${topic}
Score: ${score} out of ${totalQuestions}.
Make it concise and motivated.`;

  try {
    // Call Gemini API
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    text = text.replace(/```/g, "").trim();

    return text || "Great effort! Keep learning and try again.";
  } catch (err) {
    console.error("AI feedback error:", err);
    return "Great effort! Keep learning and try again.";
  }
};
