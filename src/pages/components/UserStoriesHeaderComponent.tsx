import React from "react";
import "pages/components/UserStoriesHeaderComponent.scss";
interface UserStoriesHeaderComponentProps {
    userStoryDimensionsLabels: string[],
    onUserStoryDimensionsLabelsChanged: (label:string, index:number) => void
}

const UserStoriesHeaderComponent = ( { userStoryDimensionsLabels, onUserStoryDimensionsLabelsChanged } : UserStoriesHeaderComponentProps ) => {

    const onFormChange = ( e: React.ChangeEvent<HTMLInputElement>, aLabelIndex:number ) => {
        onUserStoryDimensionsLabelsChanged(e.target.value, aLabelIndex);
    };

    return <div className="user-story-header">
        <div></div>
        <div className="user-story-header__estimate-dimensions">
        {userStoryDimensionsLabels.map((label:string, i) => {
            return  <div key={`key-${i}`}>
                <label>
                    dimension name<br/>
                    <input type="text" value={label}  onChange={(event) => onFormChange(event, i)}/>
                </label>
                <div>50% / 90%</div>
            </div>;
        })}
        </div>
        <div className="user-story-header__actions">actions</div>
    </div>;
}

export default UserStoriesHeaderComponent;