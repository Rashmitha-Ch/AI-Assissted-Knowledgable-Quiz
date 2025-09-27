import { useNavigate } from "react-router-dom";

const topics = [
  { id: "science", name: "Science", gradientClass: "gradient-topic-1" },
  { id: "history", name: "History", gradientClass: "gradient-topic-2" },
  { id: "computerscience", name: "Computer Science", gradientClass: "gradient-topic-3" },
  { id: "geography", name: "Geography", gradientClass: "gradient-topic-4" },
  { id: "literature", name: "Literature", gradientClass: "gradient-topic-5" },
  { id: "botony", name: "Botony", gradientClass: "gradient-topic-6" },
  { id: "dbms", name: "DBMS", gradientClass: "gradient-topic-7" },
  { id: "machinelearning", name: "Machine Learning", gradientClass: "gradient-topic-8" },
];

const TopicSection = () => {
  const navigate = useNavigate();

  const handleTopicClick = (topic: string) => {
    navigate('/quiz', { state: { topic } });
  };

  return (
    <section id="topic-section" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Choose Your Challenge
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our curated topics and test your knowledge. Each quiz is tailored to challenge and educate.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic.name)}
              className={`
                ${topic.gradientClass} 
                rounded-2xl px-8 py-6 min-w-48 h-24 
                flex items-center justify-center
                hover:scale-105 hover:shadow-lg
                transition-all duration-300 ease-out
                text-foreground font-semibold text-lg
                border border-border/20
              `}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicSection;