import React from 'react';
import { Link } from 'react-router-dom';

const FeatureList = ({ title }) => {
    return (
        <div>
            <h3 className="">{title}</h3>
            <div className="">
                <div className="">
                    <div className="card">
                        <h4 className="">
                            {/* section name */}
                            <br />
                            <span className="" style={{}}>

                            </span>
                        </h4>

                        <Link
                            className=""
                        // to={`/section}
                        >
                            View this section
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureList;
