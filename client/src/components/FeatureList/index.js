import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Card } from 'semantic-ui-react'


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
                            <Link style={cardStyle} gi to="/injury">
                                <Card.Header>
                                    <Icon enabled name='camera' size='big' />
                                    Injury Library
                                </Card.Header>
                                <Card.Meta>
                                    Upload photos of your pet's injury!
                                </Card.Meta>
                            </Link>
                        </Card>
                        <Card>
                            <Link style={cardStyle} to="/habitForm">
                                <Card.Header>
                                    <Icon enabled name='check circle' size='big' />
                                    Habit Tracker
                                </Card.Header>
                                <Card.Meta>
                                    Create (and stick to) good habits.
                                </Card.Meta>
                            </Link>
                        </Card>
                        <div className='habit-btns'>
                        <Button circular animated='vertical' className='paw-button' onClick="disabled=true">
                            <Button.Content hidden>Walk</Button.Content>
                            <Button.Content visible>
                                <Icon name='paw' />
                            </Button.Content>
                        </Button>
                        <Button circular animated='vertical' className='paw-button'>
                            <Button.Content hidden>Food</Button.Content>
                            <Button.Content visible>
                                <Icon name='food' />
                            </Button.Content>
                        </Button>
                        <Button circular animated='vertical' className='paw-button'>
                            <Button.Content hidden>Water</Button.Content>
                            <Button.Content visible>
                                <Icon name='tint' />
                            </Button.Content>
                        </Button> 
                        <Button circular animated='vertical' className='paw-button'>
                            <Button.Content hidden>Meds</Button.Content>
                            <Button.Content visible>
                                <Icon name='pills' />
                            </Button.Content>
                        </Button> 
                        </div>
  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureList;
