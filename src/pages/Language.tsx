import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const Language = () => {
  const [selectedLanguages, setSelectedLanguages] = useState(["en"]);
  const { toast } = useToast();

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code)
        ? prev.filter((lang) => lang !== code)
        : [...prev, code]
    );
  };

  const handleSave = () => {
    localStorage.setItem("languages", JSON.stringify(selectedLanguages));
    toast({
      title: "Languages Updated",
      description: `${selectedLanguages.length} languages selected`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pt-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary-foreground">
            Choose Languages
          </h1>
          <p className="text-primary-foreground/80">
            Select languages for your stories
          </p>
        </div>
      </div>

      {/* Language Grid */}
      <div className="p-4 grid grid-cols-3 gap-3 mt-6 animate-slide-up">
        {languages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => toggleLanguage(lang.code)}
            className={`relative bg-card rounded-2xl p-4 border-2 transition-all cursor-pointer ${
              selectedLanguages.includes(lang.code)
                ? "border-primary shadow-[var(--shadow-glow)]"
                : "border-border"
            }`}
          >
            {selectedLanguages.includes(lang.code) && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className="text-center space-y-2">
              <div className="text-4xl">{lang.flag}</div>
              <div className="text-foreground font-semibold">{lang.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleSave}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-accent hover:opacity-90 transition-opacity shadow-lg"
        >
          Save Languages
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Language;
