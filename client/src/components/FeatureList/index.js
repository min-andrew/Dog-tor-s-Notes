import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card } from 'semantic-ui-react'


const FeatureList = ({ title }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <div >
                    <div>
                        <Card>
                            <Link to="/VetForm">
                                <Card.Content>
                                    <Card.Header>
                                        <Icon enabled name='edit' size='big' />
                                        Vet Form
                                    </Card.Header>
                                    <Card.Meta>
                                        Add Information about your next vet visit!
                                    </Card.Meta>
                                </Card.Content>
                            </Link>
                        </Card>
                        <Card>
                            <Link to="/VetNotes">
                                <Card.Header>
                                    <Icon enabled name='hospital' size='big' />
                                    Vet Notes
                                </Card.Header>
                                <Card.Meta>
                                    Add details about past vet visits!
                                </Card.Meta>
                            </Link>
                        </Card>
                        <Card>
                            <Link className="" to="/profiles/:profileId">
                                <Card.Header>
                                    <Icon enabled name='paw' size='big' />
                                    Profile
                                </Card.Header>
                                <Card.Meta>
                                    Check out your pet's profile here!
                                </Card.Meta>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureList;
