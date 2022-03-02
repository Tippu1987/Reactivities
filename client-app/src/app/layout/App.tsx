import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";

function App() {
  const [ activities, setActivities ] = useState<Activity[]>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>(undefined);
  const [ editMode, setEditMode ] = useState(false);
  useEffect(() => {
    agent.Activities.list().then((response) =>{
      response.map(x=>x.date=x.date.split('T')[0]);
      setActivities(response);
   });
  },[]);
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
    setEditMode(false);
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
    :setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
    }
    function handleDeleteActivity(id: string){
      console.log('id='+id);
      let x=[...activities.filter(x=>x.id!==id)];
      console.log(x);
      setActivities(x);
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
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}
export default App;
