import { UserStory, UserStoryEstimate, ProjectEstimate } from "model/entities";

const getSumOfTheBestCase = (aUserStory:UserStory):number => {
    return aUserStory.estimate.reduce((accumulator, aDimensionOfEstimate:UserStoryEstimate) => aDimensionOfEstimate.bestCase + accumulator, 0)
}

const getSumOfTheWorstCase = (aUserStory:UserStory):number => {
    return aUserStory.estimate.reduce((accumulator, aDimensionOfEstimate:UserStoryEstimate) => aDimensionOfEstimate.worstCase + accumulator, 0)
}

const roundToTwoDecimal = (aNumber:number) => {
    return Math.round(aNumber*100)/100;
}

const getProjectEstimate = ( userStories: Array<UserStory> ) : ProjectEstimate => {

    const bestCase:number = roundToTwoDecimal(
        userStories.reduce((accumulator, userStory:UserStory):number => {

            const userStoryBestCase:number = getSumOfTheBestCase(userStory);

            if(userStoryBestCase < 0) return accumulator; // this should not happen

            return accumulator + userStoryBestCase;

        }, 0)
    );

    const buffer = roundToTwoDecimal(
        Math.sqrt(userStories.reduce((accumulator, userStory:UserStory):number => {

            const userStoryBestCase:number = getSumOfTheBestCase(userStory);
            const userStoryWorstCase:number = getSumOfTheWorstCase(userStory);

            const bestCaseIsGreaterThanWorstCase = userStoryWorstCase < userStoryBestCase;
            const numbersAreNegative = userStoryWorstCase < 0 || userStoryBestCase < 0;

            if(bestCaseIsGreaterThanWorstCase || numbersAreNegative) return accumulator; // this should not happen

            const userStoryBuffer = userStoryWorstCase - userStoryBestCase;
            return accumulator + Math.pow(userStoryBuffer, 2);
        }, 0)) 
    );

    const estimate:number = roundToTwoDecimal( bestCase + buffer );

    return {
        bestCase,
        estimate,
        buffer
    };

};

export default getProjectEstimate;