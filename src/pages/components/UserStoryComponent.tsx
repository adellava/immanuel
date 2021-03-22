import React, { useState } from "react";
import { UserStory, UserStoryEstimate } from "model/entities";
import UserStoryEstimateComponent from "pages/components/UserStoryEstimateComponent";

const MAX_ESTIMATE_VALUE = 13;
const MIN_ESTIMATE_VALUE = 1;

const isAValidNumber = (value:any) => {
    const floatValue = Number.parseFloat(value);
    const isFinite = Number.isFinite(floatValue);
    return isFinite;
};

interface UserStoryComponentProps {
    userStory: UserStory,
    index: number,
    onUserStoryChanged: (us: UserStory, index:number) => void,
    onUserStoryDeleted: (index:number) => void,
}

const UserStoryComponent = ( { userStory, index, onUserStoryChanged, onUserStoryDeleted } : UserStoryComponentProps ) => {

    const [userStoryForm, setUserStoryForm] = useState<UserStory>(userStory);

    const onFormChange = ( e: React.ChangeEvent<HTMLInputElement>, anEstimateIndex?:number ) => {

        let newUserStoryForm:UserStory = {
            ...userStoryForm,
            estimate: [
                ...userStoryForm.estimate
            ]
        };

        let isValidForm = true;

        switch (e.target.name) {
            case "description":
                newUserStoryForm.description = e.target.value;
            default:
                const key:string = e.target.name;
                const estimateIndex = anEstimateIndex ? anEstimateIndex : 0;
                const newValue = isAValidNumber(e.target.value) ? Number.parseFloat(e.target.value) : "";
                newUserStoryForm.estimate[estimateIndex][key] = newValue as number;

                isValidForm = isAValidNumber(e.target.value);
        }

        setUserStoryForm(newUserStoryForm);

        if(isValidForm){
            onUserStoryChanged(newUserStoryForm, index);
        }
    };

    const onFormBlur = ( e: React.ChangeEvent<HTMLInputElement>, anEstimateIndex?:number ) => {

        let newUserStoryForm:UserStory = {
            ...userStoryForm,
            estimate: [
                ...userStoryForm.estimate
            ]
        };

        const key:string = e.target.name;
        const estimateIndex = anEstimateIndex ? anEstimateIndex : 0;

        if(!isAValidNumber(e.target.value)) return;

        let newValue = Number.parseFloat(e.target.value);

        if(newValue > MAX_ESTIMATE_VALUE) {
            newValue = MAX_ESTIMATE_VALUE;
            const key:string = e.target.name;
            newUserStoryForm.estimate[estimateIndex][key] = newValue as number;
        };
        if(newValue < MIN_ESTIMATE_VALUE) { 
            newValue = MIN_ESTIMATE_VALUE;
            const key:string = e.target.name;
            newUserStoryForm.estimate[estimateIndex][key] = newValue as number;
        };

        if(key === "bestCase" && newUserStoryForm.estimate[estimateIndex]["worstCase"] < newUserStoryForm.estimate[estimateIndex]["bestCase"]) {
            newUserStoryForm.estimate[estimateIndex]["worstCase"] = newValue;
        }
        if(key === "worstCase" && newUserStoryForm.estimate[estimateIndex]["worstCase"] < newUserStoryForm.estimate[estimateIndex]["bestCase"]) {
            newUserStoryForm.estimate[estimateIndex]["bestCase"] = newValue;
        }

        setUserStoryForm(newUserStoryForm);
        onUserStoryChanged(newUserStoryForm, index);

    };

    const onDelete = () => {
        onUserStoryDeleted(index);
    }

    return <div>
        <label>
            <input value={userStoryForm.description} type="text" name="description" placeholder="as a user I want to ... so that ...." style={{width: "250px", marginRight: "20px"}} onChange={onFormChange}/>
        </label>
        {userStoryForm.estimate.map((aUserStoryEstimate:UserStoryEstimate, i) => {
            return  <UserStoryEstimateComponent
                key={`key-${i}`}
                maxEstimateValue={MAX_ESTIMATE_VALUE}
                minEstimateValue={MAX_ESTIMATE_VALUE}
                userStoryEstimate={aUserStoryEstimate}
                onUserStoryEstimateChanged={(event) => onFormChange(event, i)}
                onUserStoryEstimateBlur={(event) => onFormBlur(event, i)}/>;
        })}
        <div style={{width: "100px", height: "20px", display: "inline-block"}}>
            <button onClick={onDelete} tabIndex={-1}>
                delete
            </button>
        </div>
    </div>;
}

export default UserStoryComponent;