import ExpenseByCategoryChart from "../components/Insights/ExpenseByCategoryChart";
import MoodVsSpendingChart from "../components/Insights/MoodVsSpendingChart";
import MonthlySpendingChart from "../components/Insights/MonthlySpendingChart";
import InsightsBox from "../components/Insights/InsightsBox";

const Insights = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf7d9]">
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 pt-40 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fbbc57] shadow-md p-3 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Expense by Mood</h2>
            <ExpenseByCategoryChart />
          </div>

          <div className="bg-[#386d75] shadow-md p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Mood v/s Spending</h2>
            {/* We'll move the dropdown into the component, but you can leave it here if preferred */}
            </div>
              <MoodVsSpendingChart />
          </div>


          <div className="bg-[#386d75] shadow-md p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white ">
              Monthly Spending Patterns
            </h2>
            <MonthlySpendingChart />
          </div>



          <div className="bg-[#fbbc57] shadow-md p-3 rounded-lg">
            <InsightsBox />
          </div>
        </div>
      </main>
    </div>
  );
};


export default Insights;
