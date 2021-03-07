import React, { useState } from "react";
import { UserStory } from "../../model/entities";

interface UserStoryComponentProps {
    userStory: UserStory,
    index: number,
    onUserStoryChanged: (us: UserStory, index:number) => void
}

const UserStoryComponent = ( { userStory, index, onUserStoryChanged } : UserStoryComponentProps ) => {

    const [userStoryForm, setUserStoryForm] = useState(userStory);

    const onFormChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {

        let newUserStory:UserStory = {
            ...userStoryForm,
            estimate: {
                ...userStoryForm.estimate
            }
        };

        switch (e.target.name) {
            case "description":
                newUserStory.description = e.target.value;
            default:
                const key:string = e.target.name;
                newUserStory.estimate[key] = Number.parseFloat(e.target.value);
        }

        setUserStoryForm(newUserStory);
        onUserStoryChanged(newUserStory, index);
    };

    return <div>
        <label>
            <input type="text" name="description" placeholder="as a user I want to ... so that ...." style={{width: "250px", marginRight: "20px"}} onChange={onFormChange}/>
        </label>
        <span>
            <label>
                best case
                <input type="number" name="bestCase" min="0" max="13" step="0.5" value={userStoryForm.estimate.bestCase}  onChange={onFormChange}/>
            </label>
            <label>
                worst case
                <input type="number" name="worstCase" min="0" max="13" step="0.5" value={userStoryForm.estimate.worstCase}  onChange={onFormChange}/>
            </label>
        </span>
    </div>;
}

export default UserStoryComponent;