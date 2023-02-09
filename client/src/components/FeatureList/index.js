import { Link } from "react-router-dom";
import { Icon, Card } from "semantic-ui-react";
import HabitButtons from "../HabitBtns";
import Footer from "../Footer";

const FeatureList = ({ title }) => {
  const titleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const bodyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const cardStyle = {
    margin: "20px",
  };

  return (
    <div>
      <h3 style={titleStyle}>{title}</h3>
      <div style={bodyStyle}>
        <div>
          <div className="note-card-container">
          <div className="habit-btns">
              <HabitButtons />
            </div>
            <Card>
              <Link style={cardStyle} to="/profiles">
                <Card.Header>
                  <Icon enabled name="paw" size="big" />
                  Profile
                </Card.Header>
                <Card.Meta>Check out your pet's profile</Card.Meta>
              </Link>
            </Card>
            <Card>
              <Link style={cardStyle} to="/VetNotes">
                <Card.Header>
                  <Icon enabled name="hospital" size="big" />
                  Vet Notes
                </Card.Header>
                <Card.Meta>Add details about past vet visits</Card.Meta>
              </Link>
            </Card>
            <Card>
              <Link style={cardStyle} gi to="/photos">
                <Card.Header>
                  <Icon enabled name="camera" size="big" />
                  Photo Library
                </Card.Header>
                <Card.Meta>Upload photos of your concerns</Card.Meta>
              </Link>
            </Card>
            <Card>
              <Link style={cardStyle} gi to="/todo">
                <Card.Header>
                  <Icon enabled name="list ul" size="big" />
                  Todo List
                </Card.Header>
                <Card.Meta>Monitor your todos</Card.Meta>
              </Link>
            </Card>
            <Card>
              <Link style={cardStyle} gi to="/CommunityHome">
                <Card.Header>
                  <Icon enabled name='users' size='big' />
                  Doggy Community
                </Card.Header>
                <Card.Meta>
                  Talk with the community!
                </Card.Meta>
              </Link>
            </Card>
            <Card>
              <Link style={cardStyle} gi to="/healthTip">
                <Card.Header>
                  <Icon enabled name="leaf" size="big" />
                  Health Tips
                </Card.Header>
                <Card.Meta>Read expert tips from the pros</Card.Meta>
              </Link>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeatureList;
