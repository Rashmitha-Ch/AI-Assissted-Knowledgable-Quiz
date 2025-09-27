import Header from "../components/Header";
import WelcomeSection from "../components/WelcomeSection";
import TopicSection from "../components/TopicSection";
import SearchSection from "../components/SearchSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <WelcomeSection />
        <TopicSection />
        <SearchSection />
      </main>
    </div>
  );
};

export default Index;