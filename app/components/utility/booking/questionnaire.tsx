"use client";
import { useState } from "react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/app/lib/questions";

interface QuestionProps {
  questionIdx: number;
  question: string;
}
const Question: FC<QuestionProps> = ({ questionIdx, question }) => {
  return (
    <div
      className={
        "border-2 border-[#E0E0E0] bg-[#FDFDFD] rounded-md mx-auto mt-8 px-5 py-4 w-8/12 shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
      }
    >
      <h3 className={"text-center text-3xl text-[#212529] my-4 mx-auto"}>
        Question {questionIdx}
      </h3>

      <p key={questionIdx} className={"text-center text-xl text-[#6C757D] my-4 mx-auto"}>
        {question}
      </p>
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
      //check if at end of questionnaire
      if (currentQuestionIndex <= questionList.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentQuestion(questionList[currentQuestionIndex].question);
      } else {
        setIsDisabled(true);
        
        //set routing for timeout in 1 seconds back to the booking page
        setTimeout(() => {
          
          router.push("/booking");
        }, 1000);
      }
    } else {
      
      setIsDisabled(true);
      //reroute after 1 seconds to next module.
      setTimeout(() => {
        
        router.push("/booking/appointment");
      }, 1000);
    }
  };

  return (
    <>
      <Question questionIdx={currentQuestionIndex} question={currentQuestion} />
      <div className={"flex flex-col mx-auto text-center my-8 w-6/12"}>
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("yes")}
          className={`border-2 ${
            isDisabled
              ? "border-[#E0E0E0] bg-[#F8F9FA] text-[#6C757D]"
              : "border-[#4A90E2] bg-[#4A90E2] text-white hover:bg-[#357ABD]"
          } rounded-sm my-4 px-3 py-3 transition-all`}
        >
          Yes
        </button>
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("no")}
          className={`border-2 ${
            isDisabled
              ? "border-[#E0E0E0] bg-[#F8F9FA] text-[#6C757D]"
              : "border-[#4A90E2] bg-[#4A90E2] text-white hover:bg-[#357ABD]"
          } rounded-sm my-4 px-3 py-3 transition-all`}
        >
          No
        </button>
      </div>
    </>
  );
};


export default Questionnaire;
