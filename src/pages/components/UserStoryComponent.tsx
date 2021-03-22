import React from "react";
import { UserStory, UserStoryEstimate } from "model/entities";
import UserStoryEstimateComponent from "pages/components/UserStoryEstimateComponent";

const isANumber = (value:any) => Number.isFinite(Number.parseFloat(value));

interface UserStoryComponentProps {
    userStory: UserStory,
    index: number,
    onUserStoryChanged: (us: UserStory, index:number) => void,
    onUserStoryDeleted: (index:number) => void,
}

const UserStoryComponent = ( { userStory, index, onUserStoryChanged, onUserStoryDeleted } : UserStoryComponentProps ) => {

    const onFormChange = ( e: React.ChangeEvent<HTMLInputElement>, anEstimateIndex?:number ) => {

        let newUserStory:UserStory = {
            ...userStory,
            estimate: [
                ...userStory.estimate
            ]
        };

        switch (e.target.name) {
            case "description":
                newUserStory.description = e.target.value;
            default:
                const key:string = e.target.name;
                const estimateIndex = anEstimateIndex ? anEstimateIndex : 0;
                const newValue = isANumber(e.target.value) ? Number.parseFloat(e.target.value) : 0;
                newUserStory.estimate[estimateIndex][key] = newValue;

                if(key === "bestCase" && newUserStory.estimate[estimateIndex]["worstCase"] < newUserStory.estimate[estimateIndex]["bestCase"]) {
                    newUserStory.estimate[estimateIndex]["worstCase"] = newValue;
                }
                if(key === "worstCase" && newUserStory.estimate[estimateIndex]["worstCase"] < newUserStory.estimate[estimateIndex]["bestCase"]) {
                    newUserStory.estimate[estimateIndex]["bestCase"] = newValue;
                }

        }

        onUserStoryChanged(newUserStory, index);
    };

    const onDelete = () => {
        onUserStoryDeleted(index);
    }

    return <div>
        <label>
            <input value={userStory.description} type="text" name="description" placeholder="as a user I want to ... so that ...." style={{width: "250px", marginRight: "20px"}} onChange={onFormChange}/>
        </label>
        {userStory.estimate.map((aUserStoryEstimate:UserStoryEstimate, i) => {
            return  <UserStoryEstimateComponent key={`key-${i}`} userStoryEstimate={aUserStoryEstimate} onUserStoryEstimateChanged={(event) => onFormChange(event, i)}/>;
        })}
        <div style={{width: "100px", height: "20px", display: "inline-block"}}>
            <button onClick={onDelete}>
                delete
            </button>
        </div>
    </div>;
}

export default UserStoryComponent;