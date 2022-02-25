import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  handleFormClose: () => void;
  activity: Activity | undefined;
}

export default function ActivityForm({ handleFormClose, activity:selectedActivity }: Props) {
  const initialState=selectedActivity??{
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  };
  const [activity,setActivity]=useState(initialState);
  
  function OnFieldChange(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value}=event.target;
    setActivity({...activity,[name]:value});  
  }
  function onFormSubmit(){
    console.log(activity);
  }

  return (
    <Segment clearing>
      <Form autofill='off' onSubmit={onFormSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={OnFieldChange}/>
        <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={OnFieldChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={OnFieldChange}/>
        <Form.Input placeholder="Date" value={activity.date} name='date' onChange={OnFieldChange} />
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={OnFieldChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={OnFieldChange}/>
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
