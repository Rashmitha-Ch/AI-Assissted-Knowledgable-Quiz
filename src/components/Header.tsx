import { Brain } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 w-full py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <div className="gradient-hero p-2 rounded-xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            AI Quiz
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;