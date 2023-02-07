import React from "react";
import FeatureList from "../components/FeatureList";
import Login from "../components/Login/Login";
import Auth from "../utils/auth";

const Home = () => {
    return (
        <main>
             <div className="hero ">
                <div className="">
                    {Auth.loggedIn() ? (
                        <div>
                            <FeatureList
                                title="Summary"
                            />
                        </div>
                    ) : (
                        <div>
                            <Login />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
