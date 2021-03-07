import { UserStory, UserStoryEstimate } from "../../model/entities";

const userStoryEstimateFactory = ():UserStoryEstimate => {
    return {
        bestCase: 0,
        worstCase: 0
    };
}

const userStoryFactory = ():UserStory => {
    return {
        description: "",
        note: "",
        estimate: userStoryEstimateFactory()
    }
}

export const aUserStoryChanged = (newUserStory:UserStory, newUserStoryIndex:number, oldUserStories:UserStory[]) => {
    const newUserStories = [...oldUserStories];
    newUserStories[newUserStoryIndex] = { ...newUserStory };
    return newUserStories;
};

export const addNewUserStory = (oldUserStories:UserStory[]) => {
    const userStoryToAdd:UserStory = userStoryFactory();
    const newUserStories:UserStory[] = [ userStoryToAdd, ...oldUserStories ];
    return newUserStories;
}