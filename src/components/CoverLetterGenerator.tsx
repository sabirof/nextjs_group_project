import React, { useState } from "react";

const CoverLetterGenerator = () => {
  const [input, setInput] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  const generateCoverLetter = async () => {
    const data = {
      type: "text",
      message: input,
    };

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (responseData?.text) {
        setGeneratedLetter(responseData.text); // Set the generated cover letter
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadCoverLetter = () => {
    const blob = new Blob([generatedLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cover_letter.txt";
    link.click();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white-100 py-8">
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Generate Your Cover Letter
        </h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your details here..."
          className="border p-2 mb-4 w-full rounded-md resize-none text-stone-900"
          rows={6}
        />
        <button
          onClick={generateCoverLetter}
          className="bg-blue-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Generate Cover Letter
        </button>
        {generatedLetter && (
          <div className="mt-6 p-4 bg-gray-200 rounded-md">
            <h3 className="text-lg font-semibold mb-2">
              Generated Cover Letter:
            </h3>
            <pre className="overflow-auto max-h-40">{generatedLetter}</pre>
            <button
              onClick={downloadCoverLetter}
              className="bg-green-500 text-black px-4 py-2 rounded-md mt-2 shadow-md hover:bg-green-600 transition duration-300"
            >
              Download Cover Letter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
