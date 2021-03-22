import React from "react";
import { ProjectEstimate } from "model/entities";
import getSprintsRangeEsimate from "model/getSprintsRangeEsimate";
import getMoneyRangeEstimate from "model/getMoneyRangeEstimate";
import { currencyFormatter } from "model/formatters";

const MAX_EFFORT_PER_SPRINT = 40;
const MIN_EFFORT_PER_SPRINT = 1;

const MAX_COST_PER_EFFORT_UNIT = 40;
const MIN_COST_PER_EFFORT_UNIT = 1;
interface ProjectEstimateProps {
    projectEstimate: ProjectEstimate,
    effortPerSprint: number,
    costPerEffortUnit: number,
    onEffortPerSprintChanged: (newValue:number) => void,
    onCostPerEffortUnitChanged: (newValue:number) => void,
}

const ProjectEstimateComponent = ( { projectEstimate, effortPerSprint, costPerEffortUnit, onEffortPerSprintChanged, onCostPerEffortUnitChanged } : ProjectEstimateProps ) => {

    const sprintsRangeProjectEstimate = getSprintsRangeEsimate(projectEstimate, effortPerSprint);
    const moneyRangeProjectEstimate = getMoneyRangeEstimate(projectEstimate, effortPerSprint, costPerEffortUnit);

    const efforPerSprintChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue:number = Number.parseInt(event.target.value);

        if(!newValue || newValue < MIN_EFFORT_PER_SPRINT || newValue > MAX_EFFORT_PER_SPRINT) return;

        onEffortPerSprintChanged(newValue);

    };

    const costPerUnitChanged = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue:number = Number.parseInt(event.target.value);

        if(!newValue || newValue < MIN_COST_PER_EFFORT_UNIT || newValue > MAX_COST_PER_EFFORT_UNIT) return;

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
                        <input type="number" step="1" min={MIN_COST_PER_EFFORT_UNIT} max={MAX_COST_PER_EFFORT_UNIT} value={costPerEffortUnit} onChange={costPerUnitChanged} />
                    </td>
                    <td>
                        Team Effort per Sprint 
                        <input type="number" step="1" min={MIN_EFFORT_PER_SPRINT} max={MAX_EFFORT_PER_SPRINT} value={sprintsRangeProjectEstimate.teamEffortPerSprint} onChange={efforPerSprintChanged}/>
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