import React, { useState, useEffect } from "react";
import { Button, Header } from "semantic-ui-react";

const App = () => {
  
  const [button1Disabled, setButton1Disabled] = useState(false);
  const [button2Disabled, setButton2Disabled] = useState(false);
  const [button3Disabled, setButton3Disabled] = useState(false);
  const [button4Disabled, setButton4Disabled] = useState(false);

  // Added separate cases to keep all buttons from launching when one is clicked.
  const handleClick = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        setButton1Disabled(true);
        localStorage.setItem("button1Disabled", true);
        break;
      case 2:
        setButton2Disabled(true);
        localStorage.setItem("button2Disabled", true);
        break;
      case 3:
        setButton3Disabled(true);
        localStorage.setItem("button3Disabled", true);
        break;
      case 4:
        setButton4Disabled(true);
        localStorage.setItem("button4Disabled", true);
        break;
      default:
        break;
    }
  };

  // Retrieves localStorage
  const getLocalStorage = () => {
    setButton1Disabled(localStorage.getItem("button1Disabled") === "true");
    setButton2Disabled(localStorage.getItem("button2Disabled") === "true");
    setButton3Disabled(localStorage.getItem("button3Disabled") === "true");
    setButton4Disabled(localStorage.getItem("button4Disabled") === "true");
  };
// Checks if the disabled attribute is still valid by comparing it to the current time.
  useEffect(() => {
    getLocalStorage();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - new Date();
    setTimeout(() => {
      setButton1Disabled(false);
      setButton2Disabled(false);
      setButton3Disabled(false);
      setButton4Disabled(false);
      localStorage.removeItem("button1Disabled");
      localStorage.removeItem("button2Disabled");
      localStorage.removeItem("button3Disabled");
      localStorage.removeItem("button4Disabled");
    }, timeUntilMidnight);
  }, []);

  return (
    <main>
      <div>
        <Header as='h4' className="habit-header">Check off your tasks daily!</Header>
      </div>
      <div className="habit-row"></div>
      <div>
        <Button compact primary disabled={button1Disabled} onClick={() => handleClick(1)}>
          Walk
        </Button>

        <Button compact primary disabled={button2Disabled} onClick={() => handleClick(2)}>
          Food
        </Button>

        <Button compact primary disabled={button3Disabled} onClick={() => handleClick(3)}>
          Play
        </Button>

        <Button compact primary disabled={button4Disabled} onClick={() => handleClick(4)}>
          Meds
        </Button>
      </div>
    </main>
  );
};

export default App;
