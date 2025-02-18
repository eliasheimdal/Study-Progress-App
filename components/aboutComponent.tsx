import React from "react";
import { title } from "@/components/primitives";

const AboutComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="text-center">
        <h1 className={`${title()} text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text`}>
          About StudyPlanner
        </h1>
      </div>

      <div className="mt-8 w-full max-w-2xl bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700">
        <p className="text-lg text-gray-300 leading-relaxed">
          This page is designed to help you **track your study progress** efficiently.
        </p>

        <ul className="mt-4 space-y-3 text-gray-400 text-base">
          <li>📚 Add your courses and monitor your progress.</li>
          <li>✅ Track your achievements and milestones.</li>
          <li>🗑️ Remove courses when needed or reset progress.</li>
          <li>🎯 Stay on top of your goals as a full-time student.</li>
        </ul>

        <p className="mt-6 text-lg text-gray-300 font-semibold">
          This app keeps you **organized, motivated, and focused** on your studies. 🚀
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;

