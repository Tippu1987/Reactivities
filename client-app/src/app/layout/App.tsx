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
import LoadingComponent from "./LoadingComponent";

function App() {
  const [ activities, setActivities ] = useState<Activity[]>([]);
  const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>(undefined);
  const [ editMode, setEditMode ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting,setSubmitting] =useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) =>{
      response.map(x=>x.date=x.date.split('T')[0]);
      setActivities(response);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id!==activity.id),activity]);
      })
    }
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
      })
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
    }

    function handleDeleteActivity(id: string){
      setSubmitting(true);
      agent.Activities.delete(id).then(()=>{
        setActivities([...activities.filter(x=>x.id!==id)]);
      })
      setSubmitting(false);
    }
    if(loading) return <LoadingComponent content="Loading app..."/>
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
          submitting ={submitting}
        />
      </Container>
    </>
  );
}
export default App;
