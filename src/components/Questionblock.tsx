import React, { useState } from "react";

type Props = {
  questionx: { id: number; question: string; answer: string };
};

export default function Questionblock({ questionx }: Props) {
  const [answerVisible, setAnswerVisible] = useState<boolean>(false);

  const revealAnswer = () => {
    setAnswerVisible(true);
  };
  // console.log("id :>> ", question);
  const { id, question, answer } = questionx;
  return (
    <div className="border px-3 py-4 ">
      <div>
        Question {id}: {question}
      </div>
      {!answerVisible && (
        <button
          onClick={revealAnswer}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          reveal answer
        </button>
      )}

      {answerVisible && <div>Answer: {answer}</div>}
    </div>
  );
}
