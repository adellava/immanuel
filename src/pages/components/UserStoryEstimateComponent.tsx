import React from "react";
import { UserStoryEstimate } from "model/entities";
interface UserStoryEstimateComponentProps {
    userStoryEstimate: UserStoryEstimate,
    maxEstimateValue: number,
    minEstimateValue: number,
    onUserStoryEstimateChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onUserStoryEstimateBlur: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const UserStoryEstimateComponent = ({ 
    userStoryEstimate,
    maxEstimateValue,
    minEstimateValue,
    onUserStoryEstimateChanged,
    onUserStoryEstimateBlur
}:UserStoryEstimateComponentProps) => {
    return  <div>
    <label>
        <input type="number" name="bestCase" min={minEstimateValue} max={maxEstimateValue} step="0.5" value={userStoryEstimate.bestCase} onChange={onUserStoryEstimateChanged} onBlur={onUserStoryEstimateBlur}/>
    </label>
    <label>
        <input type="number" name="worstCase" min={minEstimateValue} max={maxEstimateValue} step="0.5" value={userStoryEstimate.worstCase} onChange={onUserStoryEstimateChanged} onBlur={onUserStoryEstimateBlur}/>
    </label>
</div>;
};

export default UserStoryEstimateComponent;