import React, { useState } from "react";
import { ProjectEstimate } from "model/entities";
import getSprintsRangeEsimate from "model/getSprintsRangeEsimate";
import getMoneyRangeEstimate from "model/getMoneyRangeEstimate";
import { currencyFormatter } from "model/formatters";

const isAValidNumber = (value:any) => {
    const floatValue = Number.parseInt(value);
    const isFinite = Number.isFinite(floatValue);
    return isFinite;
};

const parseEvent = (event:React.ChangeEvent<HTMLInputElement>):number => {
    const newValue = isAValidNumber(event.target.value) ? Number.parseInt(event.target.value) : "";
    const valueParsed = newValue as number;
    return valueParsed;
};

const MAX_EFFORT_PER_SPRINT = 40;
const MIN_EFFORT_PER_SPRINT = 1;

const MAX_COST_PER_EFFORT_UNIT = 1000;
const MIN_COST_PER_EFFORT_UNIT = 1;
interface ProjectEstimateProps {
    projectEstimate: ProjectEstimate,
    effortPerSprint: number,
    costPerEffortUnit: number,
    onEffortPerSprintChanged: (newValue:number) => void,
    onCostPerEffortUnitChanged: (newValue:number) => void,
}

const ProjectEstimateComponent = ( { projectEstimate, effortPerSprint, costPerEffortUnit, onEffortPerSprintChanged, onCostPerEffortUnitChanged } : ProjectEstimateProps ) => {


    const  [_effortPerSprint, setEffortPerSprint] = useState<number>(effortPerSprint);
    const  [_costPerEffortUnit, setCostPerEffortUnit] = useState<number>(costPerEffortUnit);

    const sprintsRangeProjectEstimate = getSprintsRangeEsimate(projectEstimate, effortPerSprint);
    const moneyRangeProjectEstimate = getMoneyRangeEstimate(projectEstimate, effortPerSprint, costPerEffortUnit);

    const effortPerSprintValid = (newValue:number) => !!newValue && newValue > MIN_EFFORT_PER_SPRINT && newValue < MAX_EFFORT_PER_SPRINT;
    const effortPerSprintChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue = parseEvent(event);
        setEffortPerSprint(newValue);

        if(effortPerSprintValid(newValue)) onEffortPerSprintChanged(newValue);

    };
    const effortPerSprintBlur = (event: React.ChangeEvent<HTMLInputElement>) => {

        let newValue:number = parseEvent(event);

        if(newValue < MIN_EFFORT_PER_SPRINT) newValue = MIN_EFFORT_PER_SPRINT;
        if(newValue > MAX_EFFORT_PER_SPRINT) newValue = MAX_EFFORT_PER_SPRINT;
        setEffortPerSprint(newValue);
        onEffortPerSprintChanged(newValue);

    };


    const costPerUnitValid = (newValue:number) => !!newValue && newValue > MIN_COST_PER_EFFORT_UNIT && newValue < MAX_COST_PER_EFFORT_UNIT;
    const costPerUnitChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue:number = parseEvent(event);
        setCostPerEffortUnit(newValue);

        if(costPerUnitValid(newValue)) onCostPerEffortUnitChanged(newValue);

    };
    const costPerUnitBlur = (event: React.ChangeEvent<HTMLInputElement>) => {

        let newValue:number = parseEvent(event);

        if(newValue < MIN_COST_PER_EFFORT_UNIT) newValue = MIN_COST_PER_EFFORT_UNIT;
        if(newValue > MAX_COST_PER_EFFORT_UNIT) newValue = MAX_COST_PER_EFFORT_UNIT;
        setCostPerEffortUnit(newValue);
        onCostPerEffortUnitChanged(newValue);

    };

    return <table style={{width: 1000, textAlign: "right"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Effort Units</th>
                    <th>Sprints</th>
                    <th>Costs</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{backgroundColor: "lightgray"}}>
                    <td>Hypotesis</td>
                    <td>
                        Cost per Unit
                        <input type="number" step="1" min={MIN_COST_PER_EFFORT_UNIT} max={MAX_COST_PER_EFFORT_UNIT} value={_costPerEffortUnit} onChange={costPerUnitChanged} onBlur={costPerUnitBlur} />
                    </td>
                    <td>
                        Team Effort per Sprint 
                        <input type="number" step="1" min={MIN_EFFORT_PER_SPRINT} max={MAX_EFFORT_PER_SPRINT} value={_effortPerSprint} onChange={effortPerSprintChanged} onBlur={effortPerSprintBlur} />
                    </td>
                    <td>
                        Cost per Sprint
                        {moneyRangeProjectEstimate.costPerSprint}
                    </td>
                </tr>

                <tr>
                    <td>Best Case</td>
                    <td>{projectEstimate.bestCase}</td>
                    <td>{sprintsRangeProjectEstimate.bestCase}</td>
                    <td>{currencyFormatter.format(moneyRangeProjectEstimate.bestCase)}</td>
                </tr>
                <tr>
                    <td>Buffer</td>
                    <td>{projectEstimate.buffer}</td>
                    <td>{sprintsRangeProjectEstimate.buffer}</td>
                    <td>{currencyFormatter.format(moneyRangeProjectEstimate.buffer)}</td>
                </tr>
                <tr>
                    <td>Estimate</td>
                    <td>{projectEstimate.estimate}</td>
                    <td>{sprintsRangeProjectEstimate.estimate}</td>
                    <td>{currencyFormatter.format(moneyRangeProjectEstimate.estimate)}</td>
                </tr>
            </tbody>
    </table>;
}

export default ProjectEstimateComponent;