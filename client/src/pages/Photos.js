import React from 'react';
import { Link } from 'react-router-dom';
import UploadWidget from '../components/UploadWidget';
import { Button, Container, Grid } from 'semantic-ui-react'

const Injury = () => {
    return (
        <Container>
            
            <div>
                <UploadWidget />
            </div>
            <Grid>
            <Grid.Column textAlign="center">
            <Link to="/">
                <Button primary className ='vet-note-nav-btns'>Back Home</Button>
            </Link>
            </Grid.Column>
            </Grid>
        </Container >

    );
};

export default Injury;
