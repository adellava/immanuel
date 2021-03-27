import React, { useState, useEffect } from "react";
import Button from "components/Button";
import Grid from "components/Grid";
import UserStoryComponent from "pages/components/UserStoryComponent";
import ProjectEstimateComponent from "pages/components/ProjectEstimateComponent";
import UserStoriesHeaderComponent from "pages/components/UserStoriesHeaderComponent";
import ProjectDimensionsComponent from "pages/components/ProjectDimensionsComponent";
import { UserStory, ProjectEstimate } from "model/entities";
import { 
    aUserStoryChanged,
    aUserStoryDeleted,
    addNewUserStory
} from "pages/model/UserStoriesListModel";
import { 
    removeLastDimension,
    addDimension,
    aDimensionLabelChenged,
    removeLastDimensionLabel,
    addNewDimensionLabel,
    MAX_PROJECT_DIMENSIONS,
    MIN_PROJECT_DIMENSIONS,
    DEFAULT_DIMENSIONS_LABELS
} from "pages/model/ProjectDimensionsModel";
import getProjectEstimate from "model/getEstimate";
import saveDocumentAsFile from "model/saveDocumentAsFile";
import openFileAsDocument, { openFileAsDocumentCallbackParams } from "model/openFileAsDocument";

const UserStoriesList = () => {

    const  [effortPerSprint, setEffortPerSprint] = useState<number>(10);
    const  [costPerEffortUnit, setCostPerEffortUnit] = useState<number>(1000);
    const  [userStories, setUserStories] = useState<UserStory[]>([]);
    const  [dimensionsLabels, setDimensionsLabels] = useState<string[]>([ DEFAULT_DIMENSIONS_LABELS[0] ]);
    const  [projectEstimate, setProjectEstimate] = useState<ProjectEstimate>({
        bestCase: 0,
        estimate: 0,
        buffer: 0
    });

    const onCostPerEffortUnitChanged = (newValue:number) => {
        setCostPerEffortUnit(newValue);
    };

    const onEffortPerSprintChanged = (newValue:number) => {
        setEffortPerSprint(newValue);
    };

    const addUserStory = () => {
        setUserStories(addNewUserStory(userStories));
    };

    const onUserStoryChanged = (us:UserStory, index:number) => {
        setUserStories(aUserStoryChanged(us, index, userStories));
    };

    const onUserStoryDeleted = (index:number) => {
        setUserStories(aUserStoryDeleted(index, userStories));
    };

    const onAddDimension = () => {
        setDimensionsLabels(addNewDimensionLabel(dimensionsLabels));
        setUserStories(addDimension(userStories));
    };

    const onRemoveLastDimension = () => {
        setDimensionsLabels(removeLastDimensionLabel(dimensionsLabels));
        setUserStories(removeLastDimension(userStories));
    };

    const onUserStoryDimensionsLabelsChanged = (newLabel:string, index:number) =>  {
        setDimensionsLabels(aDimensionLabelChenged(dimensionsLabels, newLabel, index));
    };

    const save = () => {
        saveDocumentAsFile({
            effortPerSprint,
            costPerEffortUnit,
            userStories,
            dimensionsLabels
        });
    };

    const open = () => {
        
        const onDocumentOpen = (aDocument:openFileAsDocumentCallbackParams) => {
            setEffortPerSprint(aDocument.effortPerSprint);
            setCostPerEffortUnit(aDocument.costPerEffortUnit);
            setDimensionsLabels(aDocument.dimensionsLabels);
            setUserStories(aDocument.userStories);
        };

        openFileAsDocument({ onDocumentOpen });
    };

    useEffect(() => {
        setProjectEstimate(getProjectEstimate(userStories));
    }, [userStories])

    return <div>
        <Grid px={1} py={1}>
            <Button onClick={save} label="Save" />
            <Button onClick={open} label="Open" />
        </Grid>

        <ProjectEstimateComponent 
            projectEstimate={projectEstimate}
            effortPerSprint={effortPerSprint}
            costPerEffortUnit={costPerEffortUnit}
            onEffortPerSprintChanged={onEffortPerSprintChanged}
            onCostPerEffortUnitChanged={onCostPerEffortUnitChanged}
        />
        <ProjectDimensionsComponent 
            userStories={userStories}
            onAddDimension={onAddDimension}
            onRemoveLastDimension={onRemoveLastDimension}
            maxProjectDimensions={MAX_PROJECT_DIMENSIONS}
            minProjectDimensions={MIN_PROJECT_DIMENSIONS}
        />
        <div>
            <UserStoriesHeaderComponent 
                userStoryDimensionsLabels={dimensionsLabels}
                onUserStoryDimensionsLabelsChanged={onUserStoryDimensionsLabelsChanged}
            />
            {userStories.map((us, i) => <UserStoryComponent
                userStory={us}
                key={`key-${i}`}
                index={i}
                onUserStoryChanged={onUserStoryChanged}
                onUserStoryDeleted={onUserStoryDeleted}
            />)}
        </div>
        {userStories.length === 0 && <div>No user stories to estimate</div>}
        <Grid px={1} py={1}>
            <Button onClick={() => addUserStory()} label="Add User Story" />
        </Grid>
    </div>;
}

export default UserStoriesList;