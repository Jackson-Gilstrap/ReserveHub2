"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/lib/questions";

interface QuestionProps {
  questionIdx: number;
  question: string;
}
const Question: React.FC<QuestionProps> = ({ questionIdx, question }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto mt-12 px-6 py-6 w-11/12 max-w-2xl border border-gray-200 transition-all duration-300">
      <h3 className="text-center text-3xl font-bold text-gray-800">
        Question {questionIdx}
      </h3>
      <p className="text-center text-lg text-gray-600 mt-4">{question}</p>
    </div>
  );
};

const Questionnaire = () => {
  //functionality
  const [questionList] = useState(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[currentQuestionIndex - 1].question
  );
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const handleAnswer = (answer: string) => {
    if (answer === "no") {
      if (currentQuestionIndex <= questionList.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentQuestion(questionList[currentQuestionIndex].question);
      } else {
        setIsDisabled(true);
        
        setTimeout(() => {
          
          router.push("/booking");
        }, 1000);
      }
    } else {
      
      setIsDisabled(true);
      setTimeout(() => {
        
        router.push("/booking/appointment");
      }, 1000);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center px-6 relative">

      <Question questionIdx={currentQuestionIndex} question={currentQuestion} />

      <div className="mt-8 flex flex-col w-full max-w-md gap-4">
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("yes")}
          className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-all duration-300 
            ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Yes
        </button>
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("no")}
          className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-all duration-300 
            ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
        >
          No
        </button>
      </div>
    </div>
  );
};


export default Questionnaire;
