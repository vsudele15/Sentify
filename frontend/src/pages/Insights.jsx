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
            <h2 className="text-xl font-semibold mb-2">Expense by Category</h2>
            <ExpenseByCategoryChart />
          </div>

          <div className="bg-[#386d75] shadow-md p-3 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-2">Mood v/s Spending</h2>
            <MoodVsSpendingChart />
          </div>

          <div className="bg-[#386d75] shadow-md p-3 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-2">Monthly Spending Patterns</h2>
            <MonthlySpendingChart />
          </div>

          <div className="bg-[#fbbc57] shadow-md p-3 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Insights</h2>
            <InsightsBox />
          </div>
        </div>
      </main>
    </div>
  );
};


export default Insights;
