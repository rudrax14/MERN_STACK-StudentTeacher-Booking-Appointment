import React from "react";
import { IoIosCalendar } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";

function TodayDateComponent() {
  // Get the current date
  const currentDate = new Date();

  // Format the date as a string (e.g., "MM/DD/YYYY")
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3 rounded-2 shadow-lg z-3 position-absolute"
      style={{
        backgroundColor: "white",
        // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        margin: "20px",
        // borderRadius: "8px",
      }}
    >
      <div className="d-flex align-items-center ">
        <div>
          {/* <p className="mb-0">Today's Date:</p> */}
          <p className="mb-0">{formattedDate}</p>
        </div>
        {/* Add the calendar icon from react-icons */}
        <IoIosCalendar size={30} className="ms-3" />
      </div>
    </div>
  );
}

export default TodayDateComponent;
