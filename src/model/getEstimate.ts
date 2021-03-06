
interface ProjectEstimate {
    bestCase: number,
    buffer: number,
    estimate: number
}

export interface UserStory {
    description: string,
    note?: string,
    estimate: UserStoryEstimate
}

interface UserStoryEstimate {
    bestCase: number,
    worstCase: number
}

const getProjectEstimate = ( userStories: Array<UserStory> ) : ProjectEstimate => {

    const bestCase:number = userStories.reduce((accumulator, userStory:UserStory):number => {

        if(userStory.estimate.bestCase < 0) return accumulator; // this should not happen

        return accumulator + userStory.estimate.bestCase;
        
    }, 0);

    const estimate:number = bestCase + Math.sqrt(userStories.reduce((accumulator, userStory:UserStory):number => {

        const bestCaseIsGreaterThanWorstCase = userStory.estimate.worstCase < userStory.estimate.bestCase;
        const numbersAreNegative = userStory.estimate.worstCase < 0 || userStory.estimate.bestCase < 0;

        if(bestCaseIsGreaterThanWorstCase || numbersAreNegative) return accumulator; // this should not happen

        const userStoryBuffer = userStory.estimate.worstCase - userStory.estimate.bestCase;
        return accumulator + Math.pow(userStoryBuffer, 2);
    }, 0));

    const buffer = estimate - bestCase;

    return {
        bestCase,
        estimate,
        buffer
    };

};

export default getProjectEstimate;