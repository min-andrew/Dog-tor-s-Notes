import React from "react";
import FeatureList from "../components/FeatureList";
import Habit from "../components/HabitsForm";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Auth from "../utils/auth";


const Home = () => {
    return (
        <main>
            <div className="">
                <div className="">
                    {Auth.loggedIn() ? (
                        <div>
                            <Habit />
                            <FeatureList
                                title="Summary"
                            />
                        </div>
                    ) : (
                        <div>
                            <Login />
                            <Signup />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
