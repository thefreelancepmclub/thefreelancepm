"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { quizData } from "../_components/data/quiz-data";

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const router = useRouter();
  const { quizId } = params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    // Find the quiz data based on the quizId
    const quiz = quizData.find((q) => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
    } else {
      // Handle case where quiz doesn't exist
      router.push("/");
    }
  }, [quizId, router]);

  if (!currentQuiz) {
    return (
      <div className="container mx-auto p-8 text-center">Loading quiz...</div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, value: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleSubmit = () => {
    // Count the frequency of each answer
    const answerCounts: Record<string, number> = {};

    Object.values(answers).forEach((answer) => {
      answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });

    // Find the most frequent answer
    let mostFrequentAnswer = "";
    let highestCount = 0;

    Object.entries(answerCounts).forEach(([answer, count]) => {
      if (count > highestCount) {
        mostFrequentAnswer = answer;
        highestCount = count;
      }
    });

    // Determine the quiz type
    const quizType = quizId === "leadership-style" ? "leadership" : "role";

    // For leadership quiz, we need to pass the counts to handle special cases
    const queryParams =
      quizType === "leadership"
        ? `role=${mostFrequentAnswer}&type=${quizType}&counts=${encodeURIComponent(JSON.stringify(answerCounts))}`
        : `role=${mostFrequentAnswer}&type=${quizType}`;

    // Navigate to results page with the most frequent answer
    router.push(`/quizzes/results?${queryParams}`);
  };

  // Check if all questions have been answered
  const allQuestionsAnswered =
    currentQuiz.questions.length === Object.keys(answers).length;

  return (
    <>
      <Header subtitile="Discover Your Project Management Path">
        Find Your Perfect{" "}
        <span className="text-[#FFA400] underline">PM Certification</span>Path
      </Header>
      <div className="container mx-auto px-4 py-8  mt-[50px]">
        <h1 className="text-2xl font-bold mb-2">{currentQuiz.title}</h1>
        <p className="text-gray-600 mb-8">{currentQuiz.description}</p>

        <div className="space-y-8">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentQuiz.questions.map((question: any, index: number) => (
            <div key={index} className="bg-blue-50 rounded-lg p-6">
              <h2 className="font-semibold mb-4">
                Question {index + 1}: {question.question}
              </h2>
              <RadioGroup
                value={answers[index] || ""}
                onValueChange={(value) => handleAnswerSelect(index, value)}
                className="space-y-3"
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {question.options.map((option: any) => (
                  <div
                    key={option.value}
                    className="flex items-start space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`q${index}-${option.value}`}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`q${index}-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
