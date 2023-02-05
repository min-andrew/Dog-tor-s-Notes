import React from "react";

import FeatureList from "../components/FeatureList";
import Habit from "../components/HabitsForm";
import Login from "../components/Login/Login";

const Home = () => {
  return (
    <main>
      <div className="">
        <div className="">
          <div>
            <Login />
            {/* <FeatureList title="Summary" /> */}
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
