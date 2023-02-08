import { Link } from "react-router-dom";
import { Button, Icon, Card } from "semantic-ui-react";
import HabitButtons from "../HabitBtns";

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
            <div className="habit-btns">
              <HabitButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
