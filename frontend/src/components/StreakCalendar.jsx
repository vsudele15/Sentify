import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, subDays, isSameDay } from 'date-fns';

const StreakCalendar = ({ userId }) => {
  const [loggedDates, setLoggedDates] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchLoggedExpenses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/expenses/${userId}`);
        const data = await res.json();

        const uniqueDates = new Set(
          data.map((exp) => format(new Date(exp.date), 'yyyy-MM-dd'))
        );

        setLoggedDates([...uniqueDates]);

        calculateStreak(uniqueDates); // 👈 Calculate streak after fetching
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };

    if (userId) fetchLoggedExpenses();
  }, [userId]);

  const calculateStreak = (uniqueDateSet) => {
    let streakCount = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const checkDate = subDays(today, i);
      const formatted = format(checkDate, 'yyyy-MM-dd');

      if (uniqueDateSet.has(formatted)) {
        streakCount++;
      } else {
        break; // Streak broken
      }
    }

    setStreak(streakCount);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formatted = format(date, 'yyyy-MM-dd');
      if (loggedDates.includes(formatted)) {
        return (
          <div className="flex justify-center items-center h-full text-xl">
            ✔️
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formatted = format(date, 'yyyy-MM-dd');
      if (loggedDates.includes(formatted)) {
        return 'hide-date';
      }
    }
    return '';
  };  
  

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Calendar
        tileContent={tileContent}
        tileClassName={tileClassName}
        className="border-none"
      />
    </div>
  );
};

export default StreakCalendar;
