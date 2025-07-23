// src/pages/HomePage.tsx
import { useState } from "react";
import Quiz from "../components/Quiz";
import Flashcard from "../components/FlashCard";
import { Button } from "@mantine/core";

const HomePage = () => {
    const [lang, setLang] = useState<"en" | "tr">("en");
    const [quizStarted, setQuizStarted] = useState(false);

    return (
        <div>
            <header style={{ padding: 10 }}>
                <button onClick={() => setLang("en")}>🇬🇧 English</button>
                <button onClick={() => setLang("tr")}>🇹🇷 Türkçe</button>
            </header>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", padding: "10px" }}>
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h2 style={{ textAlign: "center" }}>
                        {lang === "en" ? "Scrum Quiz" : "Scrum Sınavı"}
                    </h2>
                    {!quizStarted ? (
                        <div style={{ textAlign: "center" }}>
                            <Button onClick={() => setQuizStarted(true)}>
                                {lang === "en" ? "Start Quiz" : "Sınava Başla"}
                            </Button>
                        </div>
                    ) : (
                        <Quiz language={lang} />
                    )}
                </div>

                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h2 style={{ textAlign: "center" }}>
                        {lang === "en" ? "Flashcards" : "Bilgi Kartları"}
                    </h2>
                    <Flashcard
                        question="What is Scrum?"
                        answer="A framework for agile project management."
                        language={lang}
                    />
                    <Flashcard
                        question="What is a Sprint?"
                        answer="A time-boxed period for completing work in Scrum."
                        language={lang}
                    />
                    <Flashcard
                        question="What is a Product Backlog?"
                        answer="A prioritized list of work for the Scrum team."
                        language={lang}
                    />
                    <Flashcard
                        question="What is a Scrum Master?"
                        answer="A facilitator for the Scrum team."
                        language={lang}
                    />
                </div>
            </div>

            <footer style={{ textAlign: "center", padding: "10px" }}>
                <p>© 2025 Scrum Quiz App</p>
            </footer>
        </div>
    );
};

export default HomePage;
