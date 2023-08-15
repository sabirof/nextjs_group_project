import React from "react";

import CoverLetterGenerator from "../components/CoverLetterGenerator";
// import coverLetterImage from "../images/cover-letter-image.jpg"; // Replace with your actual image path


const Generator = () => {
  return (
    <div className="container mx-auto p-4">

      <div className="bg-gray-200 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">What You Can Do</h2>
        <p className="text-gray-900 mb-4">
          Create a professional cover letter with ease using our Cover Letter Generator. Follow these steps to get started:
        </p>
        <ol className="list-decimal text-gray-900 pl-6">
          <li className="mb-2">
            Enter your details in the provided text area.
          </li>
          <li className="mb-2">
            Click the Generate Cover Letter button to generate a cover letter based on your input.
          </li>
          <li className="mb-2">
            Review the generated cover letter. Make any necessary edits to personalize it for your application.
          </li>
          <li className="mb-2">
            Click the Download Cover Letter button to save the cover letter as a text file.
          </li>
        </ol>
        <div className="flex justify-center">
          {/* <img src={coverLetterImage} alt="Cover Letter Example" className="rounded-lg shadow-md max-w-md" /> */}
        </div>
      </div>

      <div className="bg-gray-200 rounded-lg shadow-lg p-8">

        <CoverLetterGenerator />
      </div>
 </div>
  );
};

export default Generator;

