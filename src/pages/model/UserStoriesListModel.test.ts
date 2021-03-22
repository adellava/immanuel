import {
    aUserStoryChanged,
    aUserStoryDeleted,
    addNewUserStory
} from "pages/model/UserStoriesListModel";
import { UserStory } from "model/entities";


const userStories:Array<UserStory> = [{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 3,
        worstCase: 5
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 2,
        worstCase: 4
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 4,
        worstCase: 5
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 4,
        worstCase: 4
    }]
}];

test('aUserStoryChanged should update a user story at index', () => {

    const changedUserStory = {
        description: "As User, I want to XXX, so YYY",
        estimate: [{
            bestCase: 5,
            worstCase: 5
        }]
    };

    const userStoryIndex = 0;

    const newUserStories = aUserStoryChanged(changedUserStory, userStoryIndex, userStories);
    expect(newUserStories[userStoryIndex]).toEqual(changedUserStory);
    
});

test('aUserStoryDeleted should delete a user story at index', () => {
    const newUserStories = aUserStoryDeleted(0, userStories);
    expect(newUserStories.length).toEqual(userStories.length-1);
});

test('addNewUserStory should add a new user story', () => {
    const newUserStories = addNewUserStory(userStories);
    expect(newUserStories.length).toEqual(userStories.length+1);
    expect(newUserStories[newUserStories.length-1]).toEqual(
        {
            description: "",
            note: "",
            estimate: [{
                bestCase: 0,
                worstCase: 0
            }]
        }
    );
});

