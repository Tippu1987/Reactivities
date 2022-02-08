import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  handleCancelActivity: () => void;
  handleEdit: (id: string) => void;
}

export default function ActivityDetails({
  activity,
  handleCancelActivity,
  handleEdit,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths="2">
          <Button
            basic
            onClick={() => handleEdit(activity.id)}
            color="green"
            content="Edit"
          />
          <Button
            onClick={()=>handleCancelActivity()}
            basic
            color="red"
            content="Cancel"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
}
