import React, { useRef, useState } from "react";
import "./TextGenerator.css";

const TextGenerator = () => {
  const [generatedText, setGeneratedText] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const textGenerate = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);

    try {
      // Making the API request using fetch
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD9BS2aF1M1iilmxS23O4s1ZectGTHwB6A`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt, // The prompt text from the user
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response data
      const data = await response.json();
      // console.log(data);

      // Ensure the response has the correct structure
      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts ||
        !data.candidates[0].content.parts[0].text
      ) {
        throw new Error("Invalid API response structure.");
      }

      // Setting the generated text to the state
      setGeneratedText(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating text:", error);
      alert("Error generating text. Check API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to detect Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      textGenerate();
    }
  };

  return (
    <div className="ai-text-generator">
      <div className="header">
        AI Text <span>Generator</span>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="Search-input"
          placeholder="Describe the text you want to generate..."
          autoFocus
          title="Input Field"
          onKeyDown={handleKeyDown} // ✅ Listens for Enter key
        />
        <div
          className="generate-btn"
          onClick={textGenerate}
          title="Generate button"
        >
          {loading ? "Generating..." : "Generate"}
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {generatedText && (
        <div className="generated-text">
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
// https://aistudio.google.com/app/plan_information