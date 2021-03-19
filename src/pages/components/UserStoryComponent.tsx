import React from "react";
import { UserStory, UserStoryEstimate } from "model/entities";

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
                newUserStory.estimate[estimateIndex][key] = Number.parseFloat(e.target.value);

                if(key === "bestCase" && newUserStory.estimate[estimateIndex]["worstCase"] < newUserStory.estimate[estimateIndex][key]) {
                    newUserStory.estimate[estimateIndex]["worstCase"] = Number.parseFloat(e.target.value);
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
        {userStory.estimate.map((anEstimateDimension:UserStoryEstimate, i) => {
            return  <div  style={{width: "271px", height: "20px", display: "inline-block"}} key={`key-${i}`}>
                <label>
                    best case
                    <input type="number" name="bestCase" min="0" max="13" step="0.5" value={anEstimateDimension.bestCase}  onChange={(event) => onFormChange(event, i)}/>
                </label>
                <label>
                    worst case
                    <input type="number" name="worstCase" min="0" max="13" step="0.5" value={anEstimateDimension.worstCase}  onChange={(event) => onFormChange(event, i)}/>
                </label>
            </div>;
        })}
        <div style={{width: "100px", height: "20px", display: "inline-block"}}>
            <button onClick={onDelete}>
                delete
            </button>
        </div>
    </div>;
}

export default UserStoryComponent;