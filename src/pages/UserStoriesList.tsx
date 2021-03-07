import React, { useState, useCallback, useEffect } from "react";
import UserStoryComponent from "./components/UserStoryComponent";
import ProjectEstimateComponent from "./components/ProjectEstimateComponent";
import { UserStory, ProjectEstimate } from "../model/entities";
import { aUserStoryChanged, addNewUserStory } from "./model/UserStoriesListModel";
import getProjectEstimate from "../model/getEstimate";

const UserStoriesList = () => {

    const  [userStories, setUserStories] = useState<UserStory[]>([]);
    const  [projectEstimate, setProjectEstimate] = useState<ProjectEstimate>({
        bestCase: 0,
        estimate: 0,
        buffer: 0
    });

    const addUserStory = () => {
        setUserStories(addNewUserStory(userStories));
    };

    const onUserStoryChanged = (us:UserStory, index:number) => {
        setUserStories(aUserStoryChanged(us, index, userStories));
    };

    useEffect(() => {
        setProjectEstimate(getProjectEstimate(userStories));
    }, [userStories])

    return <div>
        <ProjectEstimateComponent projectEstimate={projectEstimate} />
        <div>
            {userStories.map((us, i) => <UserStoryComponent userStory={us} key={`key-${i}`} index={i} onUserStoryChanged={onUserStoryChanged}/>)}
        </div>
        {userStories.length === 0 && <div>No user stories to estimate</div>}
        <button onClick={() => addUserStory()}>
            Add User Story
        </button>
    </div>;
}

export default UserStoriesList;