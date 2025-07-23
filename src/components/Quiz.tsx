import { useEffect, useState } from "react";
import { quizData } from "../data/quiz";
import FlashCard from "./FlashCard";

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
            nextQuestion(null);
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
        setTimeout(() => nextQuestion(index), 800);
    };

    if (current >= quizData.length) {
        return (
            <div style={{
                padding: 40,
                textAlign: "center",
                backgroundColor: "#f4f6f8",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                fontFamily: "Arial, sans-serif"
            }}>
                <h1 style={{ color: "#333" }}>{language === "en" ? "Exam Completed" : "Sınav Tamamlandı"}</h1>
                <p style={{ fontSize: 20 }}>
                    {language === "en" ? "Your Score" : "Puanınız"}: <strong>{score} / {quizData.length}</strong>
                </p>
            </div>
        );
    }

    return (


        <div style={{
            backgroundColor: "#f4f6f8",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            padding: 20
        }}>
            <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxWidth: "640px",
                width: "100%",
                padding: "32px"
            }}>
                <div style={{ marginBottom: "16px", color: "#333" }}>
                    <h2 style={{ marginBottom: 8 }}>{language === "en" ? "Question" : "Soru"} {current + 1}</h2>
                    <p>{currentQuiz.question[language]}</p>
                </div>
                <p style={{
                    fontWeight: 600,
                    color: timer <= 5 ? "#d00000" : "#555",
                    marginBottom: 24
                }}>
                    ⏱️ {language === "en" ? "Time left" : "Kalan süre"}: {timer}s
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {currentQuiz.options.map((opt, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleOptionClick(idx)}
                            style={{
                                backgroundColor:
                                    selected === idx
                                        ? idx === currentQuiz.answerIndex
                                            ? "#d4edda"
                                            : "#f8d7da"
                                        : "#f9f9f9",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                padding: "12px 16px",
                                marginBottom: "10px",
                                cursor: "pointer",
                                fontWeight: selected === idx ? 600 : 400,
                                color: "#222",
                                pointerEvents: selected !== null ? "none" : "auto",
                                transition: "all 0.3s"
                            }}
                        >
                            {opt[language]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
