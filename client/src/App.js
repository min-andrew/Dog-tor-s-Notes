import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileForm from "./pages/ProfileForm";
import DogHeader from "./components/Header";
import VetNotes from "./pages/VetNotes";
import VetForm from "./pages/VetForm";
import Photos from "./pages/Photos";
import SingleVetNote from "./pages/SingleVetNote";
import SingleProfile from "./pages/SingleProfile";
import HealthTipsArticles from "./pages/HealthTip";
import Todo from "./pages/Todo";
import CommunityHome from './pages/CommunityPages/CommunityHome';
import SingleThought from './pages/CommunityPages/SingleThought';
import CommunityProfile from './pages/CommunityPages/CommunityProfile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const style = {
    paddingTop: "30px",
    paddingBottom: '10px'
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <DogHeader />
          <div style={style}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles" element={<Profile />} />
              <Route path="/profileForm" element={<ProfileForm />} />
              <Route path="/profiles/:profileId" element={<SingleProfile />} />
              <Route path="/vetNotes" element={<VetNotes />} />
              <Route path="/vetForm" element={<VetForm />} />
              <Route path="/vetNotes/:vetNoteId" element={<SingleVetNote />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/healthTip" element={<HealthTipsArticles />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/CommunityHome" element={<CommunityHome />} />
              <Route path="/SingleThought/:thoughtId" element={<SingleThought />} />
              <Route path="/myThoughts" element={<CommunityProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
