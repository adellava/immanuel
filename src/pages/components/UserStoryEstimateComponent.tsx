import React from "react";
import { UserStoryEstimate } from "model/entities";

interface UserStoryEstimateComponentProps {
    userStoryEstimate: UserStoryEstimate,
    onUserStoryEstimateChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const UserStoryEstimateComponent = ({ userStoryEstimate, onUserStoryEstimateChanged }:UserStoryEstimateComponentProps) => {
    return  <div  style={{width: "271px", height: "20px", display: "inline-block"}}>
    <label>
        best case
        <input type="number" name="bestCase" min="0" max="13" step="0.5" value={userStoryEstimate.bestCase}  onChange={onUserStoryEstimateChanged}/>
    </label>
    <label>
        worst case
        <input type="number" name="worstCase" min="0" max="13" step="0.5" value={userStoryEstimate.worstCase}  onChange={onUserStoryEstimateChanged}/>
    </label>
</div>;
};

export default UserStoryEstimateComponent;