import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const funFacts = [
  "Dopamine spikes when you shop, making it addictive. Budgeting can help balance emotions and finances.",
  "The average person spends 18% more when using a card vs. cash.",
  "Creating a budget reduces financial stress and helps track emotional spending.",
  "Impulse purchases make up nearly 40% of all money spent online.",
  "People are more likely to regret emotional spending when stressed or sad.",
  "Even saving just 10% of your income can drastically reduce financial anxiety."
];

const DidYouKnowBox = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [showFact, setShowFact] = useState(true);

  const showNextFact = () => {
    setShowFact(false); // Start fade-out
    setTimeout(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
      setShowFact(true); // Trigger fade-in
    }, 200); // Wait for fade-out to finish
  };

  return (
    <div className="bg-[#3F7981] text-white p-6 rounded-2xl relative text-xl ">
      
      <AnimatePresence mode="wait">
        {showFact && (
          <motion.p
            key={factIndex}
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {funFacts[factIndex]}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex justify-end items-end mt-6">
        <button onClick={showNextFact} className="text-white text-3xl hover:scale-110 transition-transform">
              🔁
        </button>
      </div>
    </div>
  );
};

export default DidYouKnowBox;
