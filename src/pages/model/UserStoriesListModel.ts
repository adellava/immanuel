import { UserStory, UserStoryEstimate } from "model/entities";
import { getProjectDimensions } from "pages/model/ProjectDimensionsModel";

export const userStoryEstimateFactory = ():UserStoryEstimate => {
    return {
        bestCase: 0,
        worstCase: 0
    };
}

const userStoryFactory = (dimensions:number):UserStory => {

    const estimate = [];

    for(let i = 0; i < dimensions; i++){
        estimate.push(userStoryEstimateFactory());
    }

    return {
        description: "",
        note: "",
        estimate
    }
}

export const aUserStoryChanged = (newUserStory:UserStory, newUserStoryIndex:number, oldUserStories:UserStory[]) => {
    const newUserStories = [...oldUserStories];
    newUserStories[newUserStoryIndex] = { ...newUserStory };
    return newUserStories;
};

export const aUserStoryDeleted = (userStoryIndex:number, oldUserStories:UserStory[]) => {
    const newUserStories = [...oldUserStories];
    newUserStories.splice(userStoryIndex, 1);
    return newUserStories;
};

export const addNewUserStory = (oldUserStories:UserStory[]) => {
    const dimensions = getProjectDimensions(oldUserStories);
    const userStoryToAdd:UserStory = userStoryFactory(dimensions);
    const newUserStories:UserStory[] = [  ...oldUserStories, userStoryToAdd ];
    return newUserStories;
}
