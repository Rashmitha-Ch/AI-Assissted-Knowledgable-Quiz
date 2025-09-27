import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const WelcomeSection = () => {
  const scrollToTopics = () => {
    const topicSection = document.getElementById('topic-section');
    if (topicSection) {
      topicSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="glass rounded-3xl p-12 mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-primary font-semibold text-lg">Welcome to</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 p-4 break-words"
            style={{
              color: "white",
              WebkitTextStroke: "2px #4f46e5", 
            }}
          >
            AI Quiz Challenge
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Test your knowledge across multiple topics with our intelligent quiz system.
            Challenge yourself and discover how much you really know!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToTopics}
              className="gradient-hero text-white font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-transform border-0 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;