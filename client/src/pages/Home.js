import React from 'react';


import FeatureList from '../components/FeatureList';
import Habit from '../components/HabitsForm';

const Home = () => {
    return (
        <main>
            <div className="">
                <div className="">
                    <div>
                        <FeatureList
                            title="Summary"
                        />
                    </div>
                    <div>
                        <Habit/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
