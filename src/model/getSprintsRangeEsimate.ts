import { ProjectEstimate, SprintsRangeProjectEstimate } from "model/entities";

const getSprintsRangeEsimate = ( aProjectEstimate:ProjectEstimate, teamEffortPerSprint:number ) : SprintsRangeProjectEstimate => {

    const aSprintsRangeEstimate = {
        bestCase: 0,
        buffer: 0,
        estimate: 0,
        teamEffortPerSprint
    };

    aSprintsRangeEstimate.bestCase = Math.round(aProjectEstimate.bestCase/teamEffortPerSprint);
    aSprintsRangeEstimate.buffer = Math.round(aProjectEstimate.buffer/teamEffortPerSprint);
    aSprintsRangeEstimate.estimate = aSprintsRangeEstimate.bestCase + aSprintsRangeEstimate.buffer;


    return aSprintsRangeEstimate;
};

export default getSprintsRangeEsimate;