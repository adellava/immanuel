import React from "react";
import { UserStory } from "model/entities";
import { getProjectDimensions } from "pages/model/ProjectDimensionsModel";
import Grid from "components/Grid";
import Button from "components/Button";

interface ProjectDimensionsProps {
    userStories: UserStory[],
    maxProjectDimensions: number,
    minProjectDimensions: number,
    onRemoveLastDimension: () => void,
    onAddDimension: () => void,
}

const ProjectDimensionsComponent = ( { userStories, maxProjectDimensions, minProjectDimensions, onAddDimension, onRemoveLastDimension } : ProjectDimensionsProps ) => {

    const numberOfDimensions = getProjectDimensions(userStories);

    const isAddDimensionDisabled = () => numberOfDimensions === maxProjectDimensions || !userStories.length;
    const isRemoveLastDimensionDisabled = () => numberOfDimensions === minProjectDimensions || !userStories.length;

    return <div> 
        <em>Dimensions:</em> {numberOfDimensions} 
        
        <Button disabled={isAddDimensionDisabled()} small={true} onClick={onAddDimension} label="add dimension" />
        <Button disabled={isRemoveLastDimensionDisabled()} small={true} onClick={onRemoveLastDimension}label="remove last dimension" />
    </div>;
}

export default ProjectDimensionsComponent;