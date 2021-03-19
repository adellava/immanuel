import { UserStory, UserStoryEstimate } from "model/entities";

export const MIN_PROJECT_DIMENSIONS = 1;
export const DEFAULT_DIMENSIONS_LABELS = [
    "backend",
    "frontend",
    "UX",
    "cloud architecture"
];
export const MAX_PROJECT_DIMENSIONS = DEFAULT_DIMENSIONS_LABELS.length;

const userStoryEstimateFactory = ():UserStoryEstimate => {
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

export const getProjectDimensions = (userStories: UserStory[]):number => {
        
    if(userStories.length === 0) return MIN_PROJECT_DIMENSIONS;

    return userStories[0].estimate.length;
}


export const removeLastDimension = (oldUserStories:UserStory[]) => {
    const newUserStories = [...oldUserStories];
    const dimensions = getProjectDimensions(oldUserStories);

    if(dimensions === MIN_PROJECT_DIMENSIONS) return newUserStories;

    newUserStories.forEach((aUserStory: UserStory) => {
        return aUserStory.estimate.splice(-1,1);
    });


    return newUserStories;
};

export const addDimension = (oldUserStories:UserStory[]) => {
    const newUserStories = [...oldUserStories];
    const dimensions = getProjectDimensions(oldUserStories);

    if(dimensions === MAX_PROJECT_DIMENSIONS) return newUserStories;

    newUserStories.forEach((aUserStory: UserStory) => {
        return aUserStory.estimate = [...aUserStory.estimate, userStoryEstimateFactory()];
    });

    return newUserStories;
};

export const aDimensionLabelChenged = (oldLabels: string[], newLabel: string, index:number) => {
    const newLabels = [...oldLabels];
    newLabels[index] = newLabel;
    return newLabels;
};

export const removeLastDimensionLabel = (oldLabels: string[]) => {
    const newLabels = [...oldLabels];
    newLabels.splice(-1,1);
    return newLabels;
};

export const addNewDimensionLabel = (oldLabels:string[]) => {
    const newLabels = [...oldLabels];
    const labelToPush = DEFAULT_DIMENSIONS_LABELS[newLabels.length];
    newLabels.push(labelToPush);
    return newLabels;
};