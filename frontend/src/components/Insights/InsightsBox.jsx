// src/components/Insights/InsightsBox.jsx

const mockInsights = [
    "You tend to spend more when you're stressed. Try setting a daily spending limit during such periods.",
    "Dining expenses increased by 15% in March compared to February.",
    "Consider cutting down entertainment expenses to improve savings.",
  ];
  
  const InsightsBox = () => {
    return (
      <div className="space-y-2">
        {mockInsights.map((insight, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-yellow-600"
          >
            {insight}
          </div>
        ))}
      </div>
    );
  };
  
  export default InsightsBox;
  