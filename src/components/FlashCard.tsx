import { Card, Button, Text } from '@mantine/core';
import { useState } from 'react';

interface FlashCardProps {
    question: string;
    answer: string;
    language: 'tr' | 'en';
}

export default function FlashCard({ question, answer, language }: FlashCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <Card
            withBorder
            shadow="lg"
            radius="lg"
            padding="lg"
            style={{
                backgroundColor: '#c0cdf0ff',
                color: '#222b46ff',
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Text fw={700} size="lg" color="blue">
                {language === 'tr' ? 'Soru:' : 'Question:'}
            </Text>
            <Text mb="md" size="md">{question}</Text>

            {showAnswer && (
                <>
                    <Text fw={700} size="lg" color="green">
                        {language === 'tr' ? 'Cevap:' : 'Answer:'}
                    </Text>
                    <Text size="md">{answer}</Text>
                </>
            )}

            <Button
                mt="md"
                variant="light"
                color={showAnswer ? 'red' : 'blue'}
                onClick={() => setShowAnswer(!showAnswer)}
            >
                {showAnswer
                    ? language === 'tr' ? 'Cevabı Gizle' : 'Hide Answer'
                    : language === 'tr' ? 'Cevabı Göster' : 'Show Answer'}
            </Button>
        </Card>
    );
}
