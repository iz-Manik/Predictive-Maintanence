import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Calendar = () => {
  const navigate = useNavigate();
  const type = localStorage.getItem("type");

  // 🗓️ State for current month and year
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [year, setYear] = useState(today.getFullYear());
  const [reminders, setReminders] = useState(() => {
    const storedReminders = localStorage.getItem('reminders');
    return storedReminders ? JSON.parse(storedReminders) : {};
  });

  // 📅 Helper to get number of days in a month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);

  // 🧭 Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 🔁 Update reminders in backend
  const updateUserReminders = async (email, updatedReminders) => {
    try {
      const response = await axios.post('http://localhost:8000/updateUserReminders', {
        email,
        reminders: updatedReminders
      });

      if (response.status === 200) {
        localStorage.setItem('rem', JSON.stringify(updatedReminders));
        console.log('Reminders updated successfully.');
      }
    } catch (error) {
      console.error('Error updating reminders:', error);
    }
  };

  // 🧹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };

  // 📝 Handle reminder input
  const handleDayClick = (day) => {
    const reminder = prompt(`Set reminder for ${monthNames[month]} ${day}, ${year}:`);
    if (reminder) {
      const key = `${year}-${month}-${day}`;
      setReminders({ ...reminders, [key]: reminder });
    }
  };

  // 💾 Save reminders on change
  useEffect(() => {
    const email = localStorage.getItem('email');
    updateUserReminders(email, reminders);
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // ⏮️⏭️ Month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MechSage</div>
          <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="hover:text-gray-300 text-lg">Home</Link></li>
            {type === "Manager" && (<li><Link to="/calendar" className="hover:text-gray-300 text-lg">Calendar</Link></li>)}
            <li><Link to="/reports" className="hover:text-gray-300 text-lg">Reports</Link></li>
            <li><Link to="/profile" className="hover:text-gray-300 text-lg">Profile</Link></li>
            <li><button onClick={logout} className="hover:text-gray-300 text-lg">Logout</button></li>
          </ul>
        </div>
      </nav>

      {/* Calendar Header */}
      <div className="flex justify-center items-center my-6 space-x-6">
        <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">◀</button>
        <h1 className="text-4xl font-bold">{monthNames[month]} {year}</h1>
        <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">▶</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 p-4" style={{ marginLeft: '150px', marginRight: '150px' }}>
        {days.map((day) => {
          const key = `${year}-${month}-${day}`;
          return (
            <div key={day} className="border-4 border-blue-500 p-4 flex flex-col text-center" style={{ borderStyle: 'double' }}>
              <button onClick={() => handleDayClick(day)} className="text-lg font-bold">{day}</button>
              <div className="mt-2 text-sm text-gray-700">{reminders[key]}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
