import { useEffect, useState } from "react";
import { quizData } from "../data/quiz";

interface QuizProps {
    language: "en" | "tr";
}

export default function Quiz({ language }: QuizProps) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(15); // 15 seconds for each question

    const currentQuiz = quizData[current];

    useEffect(() => {
        if (timer === 0) {
            nextQuestion(null); // No answer selected
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const nextQuestion = (selectedIndex: number | null) => {
        if (selectedIndex !== null && selectedIndex === currentQuiz.answerIndex) {
            setScore((s) => s + 1);
        }

        setSelected(null);
        setTimer(15);
        setCurrent((prev) => prev + 1);
    };

    const handleOptionClick = (index: number) => {
        setSelected(index);
        setTimeout(() => nextQuestion(index), 1000); // Delay for visual feedback
    };

    if (current >= quizData.length) {
        return (
            <div style={{ padding: 20 }}>
                <h2>{language === "en" ? "Quiz Completed" : "Quiz Tamamlandı"}</h2>
                <p>
                    {language === "en" ? "Your Score" : "Puanınız"}: {score} /{" "}
                    {quizData.length}
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>
                {language === "en" ? "Question" : "Soru"} {current + 1}
            </h2>
            <p>{currentQuiz.question[language]}</p>
            <p style={{ fontWeight: "bold", color: timer <= 5 ? "red" : "black" }}>
                ⏱️ {language === "en" ? "Time left" : "Kalan süre"}: {timer} sec
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {currentQuiz.options.map((opt, idx) => (
                    <li
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        style={{
                            padding: "10px",
                            margin: "8px 0",
                            border: "1px solid gray",
                            borderRadius: 8,
                            cursor: "pointer",
                            color: selected === idx ? "blue" : "black",
                            fontWeight: selected === idx ? "bold" : "normal",
                            backgroundColor:
                                selected === idx
                                    ? idx === currentQuiz.answerIndex
                                        ? "lightgreen"
                                        : "salmon"
                                    : "white",
                            pointerEvents: selected !== null ? "none" : "auto",
                        }}
                    >
                        {opt[language]}
                    </li>
                ))}
            </ul>
        </div>
    );
}
