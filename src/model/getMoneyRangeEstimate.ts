import { ProjectEstimate, MoneyRangeProjectEstimate } from "model/entities";
import getSprintsRangeEsimate from "model/getSprintsRangeEsimate";

const getMoneyEstimate = ( aProjectEstimate:ProjectEstimate, effortUnitsPerSprint:number, effortUnitCost:number ) : MoneyRangeProjectEstimate => {
    
    const aSprintsRangeEstimate = getSprintsRangeEsimate(aProjectEstimate, effortUnitsPerSprint);

    const costPerSprint = effortUnitsPerSprint*effortUnitCost;

    const aMoneyRangeEstimate = {
        costPerSprint,
        bestCase: 0,
        buffer: 0,
        estimate: 0
    };

    aMoneyRangeEstimate.bestCase = aSprintsRangeEstimate.bestCase * costPerSprint;
    aMoneyRangeEstimate.buffer = aSprintsRangeEstimate.buffer * costPerSprint;
    aMoneyRangeEstimate.estimate = aMoneyRangeEstimate.bestCase+aMoneyRangeEstimate.buffer;


    return aMoneyRangeEstimate;
};

export default getMoneyEstimate;