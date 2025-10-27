import React, { useState, useEffect } from "react";

const CountDownTimer = () => {
  // state variables
  const [inputMinutes, setInputMinutes] = useState(""); // for user input
  const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [isPaused, setIsPaused] = useState(false); // NEW: pause state

  // Handle input change
  const handleInputChange = (e) => {
    setInputMinutes(e.target.value);
  };

  // Start the Timer
  const startTimer = () => {
    if (inputMinutes && !isNaN(inputMinutes) && inputMinutes > 0) {
      setTimeLeft(inputMinutes * 60); // Convert minutes to seconds
      setIsRunning(true);
      setIsPaused(false); // reset pause when starting fresh
    }
  };

  // NEW: Pause / Resume logic
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Added a reset function (improvement)
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setInputMinutes("");
  };

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && timeLeft > 0) {
      // Only count down when running AND not paused
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Stop the timer when it reaches zero
      setIsRunning(false);
    }

    return () => clearInterval(timer); // Cleanup the interval
  }, [isRunning, isPaused, timeLeft]); // added isPaused to dependencies

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Countdown Timer</h1>

      {!isRunning && timeLeft === 0 && (
        <div>
          <input
            type="number"
            value={inputMinutes}
            onChange={handleInputChange}
            placeholder="Enter minutes"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "150px", // FIXED: added "px" unit
              textAlign: "center",
            }}
          />

          <button
            onClick={startTimer} // FIXED: changed from onChange → onClick
            style={{
              padding: "10px 20px",
              marginLeft: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Start Timer
          </button>
        </div>
      )}

      {(isRunning || timeLeft > 0) && (
        <div>
          <h2
            style={{
              fontSize: "48px",
              margin: "20px 0",
            }}
          >
            {formatTime(timeLeft)}
          </h2>

          {/* NEW: Pause / Resume button */}
          <button
            onClick={togglePause}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>

          {/* Added Reset button */}
          <button
            onClick={resetTimer}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      )}

      {!isRunning && timeLeft === 0 && inputMinutes && (
        <h2 style={{ fontSize: "32px", color: "green" }}>Time's up!!</h2>
      )}
    </div>
  );
};

export default CountDownTimer;











// import React, { useState, useEffect } from "react";

// const CountDownTimer = () => {
//   // state variables
//   const [inputMinutes, setInputMinutes] = useState(""); // for user input
//   const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
//   const [isRunning, setIsRunning] = useState(false); // Timer running useState

//   // Handle input change
//   const handleInputChange = (e) => {
//     setInputMinutes(e.target.value);
//   };

//   // Start the Timer
//   const startTimer = () => {
//     if (inputMinutes && !isNaN(inputMinutes) && inputMinutes > 0) {
//       setTimeLeft(inputMinutes * 60); // Convert minutes to seconds
//       setIsRunning(true);
//     }
//   };

//   // Countdown logic
//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       // Stop the timer when it reaches zero
//       setIsRunning(false);
//     }

//     return () => clearInterval(timer); // Cleanup the interval
//   }, [isRunning, timeLeft]);

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   // Added a reset function (improvement)
//   const resetTimer = () => {
//     setIsRunning(false);
//     setTimeLeft(0);
//     setInputMinutes("");
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "100px",
//         fontFamily: "sans-serif",
//       }}
//     >
//       <h1>Countdown Timer</h1>

//       {!isRunning && timeLeft === 0 && (
//         <div>
//           <input
//             type="number"
//             value={inputMinutes}
//             onChange={handleInputChange}
//             placeholder="Enter minutes"
//             style={{
//               padding: "10px",
//               fontSize: "16px",
//               width: "150px", // FIXED: added "px" unit (was just "150")
//               textAlign: "center",
//             }}
//           />

//           <button
//             onClick={startTimer} // FIXED: changed from onChange → onClick
//             style={{
//               padding: "10px 20px",
//               marginLeft: "10px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             Start Timer
//           </button>
//         </div>
//       )}

//       {(isRunning || timeLeft > 0) && (
//         <div>
//           <h2
//             style={{
//               fontSize: "48px",
//               margin: "20px 0",
//             }}
//           >
//             {formatTime(timeLeft)}
//           </h2>

//           {/* Added Reset button (new feature) */}
//           <button
//             onClick={resetTimer}
//             style={{
//               padding: "10px 20px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             Reset
//           </button>
//         </div>
//       )}

//       {!isRunning && timeLeft === 0 && inputMinutes && (
//         <h2 style={{ fontSize: "32px", color: "green" }}>Time's up!!</h2>
//       )}
//     </div>
//   );
// };

// export default CountDownTimer;











// import React, { useState, useEffect } from "react";

// const CountDownTimer = () => {
//   // state variables
//   const [inputMinutes, setInputMinutes] = useState(""); // for user input
//   const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
//   const [isRunning, setIsRunning] = useState(false); // Timer running useState

//   // Handle input change
//   const handleInputChange = (e) => {
//     setInputMinutes(e.target.value);
//   };

//   // Start the Timer
//   const startTimer = () => {
//     if (inputMinutes && !isNaN(inputMinutes) && inputMinutes > 0) {
//       setTimeLeft(inputMinutes * 60); // Convert minutes  to seconds
//       setIsRunning(true);
//     }
//   };

//   // Countdown logic
//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       // Stop the timer when it reaches zero
//       setIsRunning(false);
//     }

//     return () => clearInterval(timer); // Cleanup the interval
//   }, [isRunning, timeLeft]);

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "100px",
//         fontFamily: "sans-serif",
//       }}
//     >
//       <h1>Countdown Timer</h1>
//       {!isRunning && timeLeft === 0 && (
//         <div>
//           <input
//             type="number"
//             value={inputMinutes}
//             onChange={handleInputChange}
//             placeholder="Enter minutes"
//             style={{
//               padding: "10px",
//               fontSize: "16px",
//               width: "150",
//               textAlign: "center",
//             }}
//           />

//           <button
//             onChange={startTimer}
//             style={{
//               padding: "10px 20px",
//               marginLeft: "10px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             Start Timer
//           </button>
//         </div>
//       )}
//       {isRunning || timeLeft > 0 ? (
//         <h2
//           style={{
//             fontSize: "48px",
//             margin: "20px 0",
//           }}
//         >
//           {formatTime(timeLeft)}
//         </h2>
//       ) : (
//         <h2 style={{ fontSize: "32px", color: "green" }}>Time's up!!</h2>
//       )}
//     </div>
//   );
// };

// export default CountDownTimer;