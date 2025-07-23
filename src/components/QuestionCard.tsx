import { Card, Radio, Stack, Button, Text } from '@mantine/core';
import { useState } from 'react';

interface QuestionCardProps {
    question: any;
    onAnswer: (answer: string) => void;
    index: number;
    language: 'tr' | 'en';
}

export default function QuestionCard({ question, onAnswer, index, language }: QuestionCardProps) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <Card withBorder shadow="sm" radius="md">
            <Text fw={700}>
                {index}. {question.question[language]}
            </Text>

            <Radio.Group
                mt="md"
                value={selected}
                onChange={setSelected}
                name={`question-${index}`}
            >
                <Stack>
                    {question.options[language].map((option: string, i: number) => (
                        <Radio key={i} value={option} label={option} />
                    ))}
                </Stack>
            </Radio.Group>

            <Button
                mt="md"
                disabled={!selected}
                onClick={() => onAnswer(selected!)}
            >
                {language === 'tr' ? 'Devam Et' : 'Continue'}
            </Button>
        </Card>
    );
}


