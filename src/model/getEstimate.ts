import { UserStory, ProjectEstimate } from "./entities";

const getProjectEstimate = ( userStories: Array<UserStory> ) : ProjectEstimate => {

    const bestCase:number = Math.round(userStories.reduce((accumulator, userStory:UserStory):number => {

        if(userStory.estimate.bestCase < 0) return accumulator; // this should not happen

        return accumulator + userStory.estimate.bestCase;

    }, 0)*100)/100;

    const buffer = Math.round(Math.sqrt(userStories.reduce((accumulator, userStory:UserStory):number => {

        const bestCaseIsGreaterThanWorstCase = userStory.estimate.worstCase < userStory.estimate.bestCase;
        const numbersAreNegative = userStory.estimate.worstCase < 0 || userStory.estimate.bestCase < 0;

        if(bestCaseIsGreaterThanWorstCase || numbersAreNegative) return accumulator; // this should not happen

        const userStoryBuffer = userStory.estimate.worstCase - userStory.estimate.bestCase;
        return accumulator + Math.pow(userStoryBuffer, 2);
    }, 0)) * 100)/100;

    const estimate:number = Math.round( (bestCase + buffer) * 100 )/100;

    return {
        bestCase,
        estimate,
        buffer
    };

};

export default getProjectEstimate;