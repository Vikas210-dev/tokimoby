import { useNavigate } from "react-router-dom";

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "es", name: "Español", flag: "ES" },
];

const LanguageFilter = () => {
  const navigate = useNavigate();

  const handleLanguageClick = (code: string) => {
    navigate(`/stories/${code}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageClick(lang.code)}
          className="flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:scale-105"
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageFilter;
