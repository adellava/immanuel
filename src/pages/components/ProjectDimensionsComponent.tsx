import React from "react";
import { UserStory } from "model/entities";
import { getProjectDimensions } from "pages/model/UserStoriesListModel";

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
        
        <button disabled={isAddDimensionDisabled()} onClick={onAddDimension}>add dimension</button>
        <button disabled={isRemoveLastDimensionDisabled()} onClick={onRemoveLastDimension}>remove last dimension</button>
    </div>;
}

export default ProjectDimensionsComponent;