import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);
  return (
    <>
      <NavBar />
      <Container style={{marginTop:"7em"}}>
       <ActivityDashBoard activities={activities}/>
      </Container>
    </>
  );
}

export default App;
