import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }
  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          handleCancelActivity={handleCancelActivity}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          editMode={editMode}
          handleSelectedActivity={handleSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
