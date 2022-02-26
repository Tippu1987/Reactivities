import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const [ activities, setActivities ] = useState<Activity[]>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>(undefined);
  const [ editMode, setEditMode ] = useState(false);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
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
  function handleEditOrCreateAtivity(activity:Activity){
    activity.id?setActivities([...activities.filter(x=>x.id!==activity.id),activity])
    :setActivities([...activities,activity]);
    setEditMode(false);
    setSelectedActivity(activity);
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
          handleEditOrCreateAtivity={handleEditOrCreateAtivity}
        />
      </Container>
    </>
  );
}

export default App;
