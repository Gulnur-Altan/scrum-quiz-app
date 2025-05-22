import { useState } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  return (
    <div>
      <header style={{ padding: 10 }}>
        <button onClick={() => setLang("en")}>🇬🇧 English</button>
        <button onClick={() => setLang("tr")}>🇹🇷 Türkçe</button>
      </header>
      <Quiz language={lang} />
    </div>
  );
}

export default App;
