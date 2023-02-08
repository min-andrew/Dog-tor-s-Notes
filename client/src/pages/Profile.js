import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Container, Header, Card, Icon } from "semantic-ui-react";
import { QUERY_PROFILES } from "../utils/queries.js";

const Profile = () => {
  // Fetch all profiles data
  const { loading, data } = useQuery(QUERY_PROFILES, {
    fetchPolicy: "no-cache",
  });

  // styling

  return (
    <Container className="vet-notes-container">
      <Header textAlign={"center"}>Profiles</Header>

      <Header className="vet-h2" textAlign={"center"}>
        Here is a list of your profiles:
      </Header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data &&
        data.profiles &&
        data.profiles.length > 0 && (
          <div>
            {data.profiles.map((profile) => (
              <div>
                <Card
                  key={profile._id}
                  className="profile-render single-profile"
                >
                  <Link to={{ pathname: `/profiles/${profile._id}` }}>
                    {profile.petName} <br />
                    <Icon name="paw"></Icon>
                    <br />
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        )
      )}

      <Link to="/profileForm">
        <Button primary compact className="add-profile-btn vet-note-nav-btns">
          Add Profile
        </Button>
      </Link>
      <Link to="/">
        <Button primary compact className="vet-note-nav-btns">
          Back Home
        </Button>
      </Link>
    </Container>
  )

};

export default Profile;
