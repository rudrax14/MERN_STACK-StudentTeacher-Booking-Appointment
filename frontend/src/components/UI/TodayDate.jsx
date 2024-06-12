import React from "react";
import { IoIosCalendar } from "react-icons/io";

function TodayDateComponent() {
  // Get the current date
  const currentDate = new Date();

  // Format the date as a string (e.g., "MM/DD/YYYY")
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

  return (
    <div
      className="fixed hidden sm:block bottom-0 right-0 p-3 rounded-lg shadow-lg z-50 m-5 bg-white dark:bg-slate-950 dark:text-white dark:border"
    >
      <div className="flex items-center">
        <div>
          <p className="mb-0">{formattedDate}</p>
        </div>
        {/* Add the calendar icon from react-icons */}
        <IoIosCalendar size={30} className="ml-3" />
      </div>
    </div>
  );
}

export default TodayDateComponent;
