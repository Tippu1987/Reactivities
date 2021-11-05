import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleCancelActivity: () => void;
  handleSelectedActivity: (id: string) => void;
  handleFormOpen: (id: string) => void;
  handleFormClose: () => void;
  editMode: boolean;
}

export default function ActivityDashBoard({
  activities,
  editMode,
  selectedActivity,
  handleCancelActivity,
  handleSelectedActivity,
  handleFormOpen,
  handleFormClose,
}: Props) {
  return (
    <Grid>
      <GridColumn width="10">
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </GridColumn>
      <GridColumn width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            handleEdit={handleFormOpen}
            activity={selectedActivity}
            handleCancelActivity={handleCancelActivity}
          />
        )}

        {editMode && (
          <ActivityForm
            handleFormClose={handleFormClose}
            activity={selectedActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
