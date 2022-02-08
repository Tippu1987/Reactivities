import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  handleFormClose: () => void;
  activity: Activity | undefined;
}

export default function ActivityForm({ handleFormClose, activity }: Props) {
  {console.log('In Activity Form: activity = '+ activity)}
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={activity?.title} />
        <Form.TextArea placeholder="Description" value={activity?.description}/>
        <Form.Input placeholder="Category" value={activity?.category}/>
        <Form.Input placeholder="Date" value={activity?.date}  />
        <Form.Input placeholder="City" value={activity?.city} />
        <Form.Input placeholder="Venue" value={activity?.venue}/>
        <Button positive type="submit" content="Submit" floated="left" />
        <Button
          type="button"
          onClick={() => handleFormClose()}
          content="Cancel"
          floated="right"
        />
      </Form>
    </Segment>
  );
}
