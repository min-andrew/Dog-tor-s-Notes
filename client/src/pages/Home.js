import React from "react";

import Habit from "../components/HabitsForm";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

const Home = () => {
  return (
    <main>
      <div className="">
        <div className="">
          <div>
            <Login />
            <Signup />
          </div>
          <div>
            <Habit />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
