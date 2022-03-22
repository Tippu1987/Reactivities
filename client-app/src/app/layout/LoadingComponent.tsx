import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface ILoadingProps{
    inverted?:boolean;
    content?: string;
}

export default function LoadingComponent({inverted=true,content='Loading...'}:ILoadingProps){
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content={content}/>
        </Dimmer>
    );
}