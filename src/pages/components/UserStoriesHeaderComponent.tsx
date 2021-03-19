import React from "react";

interface UserStoriesHeaderComponentProps {
    userStoryDimensionsLabels: string[],
    onUserStoryDimensionsLabelsChanged: (label:string, index:number) => void
}

const UserStoriesHeaderComponent = ( { userStoryDimensionsLabels, onUserStoryDimensionsLabelsChanged } : UserStoriesHeaderComponentProps ) => {

    const onFormChange = ( e: React.ChangeEvent<HTMLInputElement>, aLabelIndex:number ) => {
        onUserStoryDimensionsLabelsChanged(e.target.value, aLabelIndex);
    };

    return <div>
        <div style={{width: "257px", marginRight: "20px", height: "20px", display: "inline-block"}}></div>
        {userStoryDimensionsLabels.map((label:string, i) => {
            return  <div style={{width: "271px", height: "20px", display: "inline-block"}} key={`key-${i}`}>
                <label>
                    dimension name
                    <input type="text" value={label}  onChange={(event) => onFormChange(event, i)}/>
                </label>
            </div>;
        })}
    </div>;
}

export default UserStoriesHeaderComponent;