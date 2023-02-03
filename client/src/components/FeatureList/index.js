import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card } from 'semantic-ui-react'


const FeatureList = ({ title }) => {

    const titleStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    const bodyStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    const cardStyle = {
        margin: '20px'
    }

    return (
        <div>
            <h3 style={titleStyle}>{title}</h3>
            <div style={bodyStyle}>
                <div >
                    <div>
                        <Card>
                            <Link style={cardStyle} to="/VetForm">
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
                            <Link style={cardStyle} to="/VetNotes">
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
                            <Link style={cardStyle} to="/profile">
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
