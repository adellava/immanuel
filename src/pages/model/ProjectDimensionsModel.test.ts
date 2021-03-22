import {
    getProjectDimensions,
    removeLastDimension,
    addDimension,
    aDimensionLabelChenged,
    removeLastDimensionLabel,
    addNewDimensionLabel,
    MIN_PROJECT_DIMENSIONS,
    MAX_PROJECT_DIMENSIONS,
    DEFAULT_DIMENSIONS_LABELS

} from "pages/model/ProjectDimensionsModel";
import { UserStory } from "model/entities";


const userStories:Array<UserStory> = [{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 3,
        worstCase: 5
    }, {
        bestCase: 3,
        worstCase: 5
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 2,
        worstCase: 4
    }, {
        bestCase: 2,
        worstCase: 4
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 4,
        worstCase: 5
    }, {
        bestCase: 4,
        worstCase: 5
    }]
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: [{
        bestCase: 4,
        worstCase: 4
    }, {
        bestCase: 4,
        worstCase: 4
    }]
}];

test('getProjectDimensions should return the dimension number from a list of user stories', () => {
    const dimensionsNumber = getProjectDimensions(userStories);
    expect(dimensionsNumber).toBe(2);
});

test('removeLastDimension should remove the last dimension from a list of user stories untill the MIN_PROJECT_DIMENSIONS is reached', () => {
    const aListOfUserStories = JSON.parse(JSON.stringify(userStories));
    expect( getProjectDimensions( aListOfUserStories ) ).toBe(2);
    const newUserStories = removeLastDimension(aListOfUserStories);
    expect( getProjectDimensions(newUserStories) ).toBe(MIN_PROJECT_DIMENSIONS);

    const newUserStories1 = removeLastDimension(newUserStories);
    expect( getProjectDimensions(newUserStories1) ).toBe(MIN_PROJECT_DIMENSIONS);
});

test('addDimension should add a dimension in a list of user stories untill the MAX_PROJECT_DIMENSIONS is reached', () => {
    const aListOfUserStories = JSON.parse(JSON.stringify(userStories));
    expect( getProjectDimensions( aListOfUserStories) ).toBe(2);
    const newUserStories = addDimension( aListOfUserStories );
    expect( getProjectDimensions( newUserStories) ).toBe(3);

    const newUserStories1 = addDimension( newUserStories );
    expect( getProjectDimensions( newUserStories1) ).toBe(MAX_PROJECT_DIMENSIONS);

    const newUserStories2 = addDimension( newUserStories1 );
    expect( getProjectDimensions( newUserStories2) ).toBe(MAX_PROJECT_DIMENSIONS);
});

test('aDimensionLabelChenged should update the dimension label at given index', () => {

    const oldLabels = [
        "backend",
        "frontend",
        "UX",
        "cloud architecture"
    ];
    const newLabel = "PHP";
    const newLabelIndex = 0;

    const newDimensionsLabel = aDimensionLabelChenged(oldLabels, newLabel, newLabelIndex);

    expect(newDimensionsLabel[newLabelIndex]).toBe(newLabel);

});


test('removeLastDimensionLabel should remove the last dimension label untill the MIN_PROJECT_DIMENSIONS is reached', () => {

    const oldLabels = [
        "backend",
        "frontend",
        "UX"
    ];

    const newDimensionsLabels = removeLastDimensionLabel(oldLabels);
    expect(newDimensionsLabels.length).toBe(2);

    const newDimensionsLabels1 = removeLastDimensionLabel(newDimensionsLabels);
    expect(newDimensionsLabels1.length).toBe(MIN_PROJECT_DIMENSIONS);

    const newDimensionsLabels2 = removeLastDimensionLabel(newDimensionsLabels1);
    expect(newDimensionsLabels2.length).toBe(MIN_PROJECT_DIMENSIONS);
});

test('addNewDimensionLabel should add a dimension label accoring with DEFAULT_DIMENSIONS_LABELS untill the MAX_PROJECT_DIMENSIONS is reached', () => {

    const oldLabels = [
        "backend",
        "frontend"
    ];

    const newDimensionsLabels = addNewDimensionLabel(oldLabels);
    expect(newDimensionsLabels.length).toBe(3);
    expect(newDimensionsLabels[2]).toBe(DEFAULT_DIMENSIONS_LABELS[2]);

    const newDimensionsLabels1 = addNewDimensionLabel(newDimensionsLabels);
    expect(newDimensionsLabels1.length).toBe(MAX_PROJECT_DIMENSIONS);
    expect(newDimensionsLabels1[3]).toBe(DEFAULT_DIMENSIONS_LABELS[3]);

    const newDimensionsLabels2 = addNewDimensionLabel(newDimensionsLabels1);
    expect(newDimensionsLabels2.length).toBe(MAX_PROJECT_DIMENSIONS);
});


test('aDimensionLabelChenged should update the dimension label at given index', () => {

    const oldLabels = [
        "backend",
        "frontend",
        "UX",
        "cloud architecture"
    ];
    const newLabel = "PHP";
    const newLabelIndex = 0;

    const newDimensionsLabel = aDimensionLabelChenged(oldLabels, newLabel, newLabelIndex);

    expect(newDimensionsLabel[newLabelIndex]).toBe(newLabel);

});


test('removeLastDimensionLabel should remove the last dimension label untill the MIN_PROJECT_DIMENSIONS is reached', () => {

    const oldLabels = [
        "backend",
        "frontend",
        "UX"
    ];

    const newDimensionsLabels = removeLastDimensionLabel(oldLabels);
    expect(newDimensionsLabels.length).toBe(2);

    const newDimensionsLabels1 = removeLastDimensionLabel(newDimensionsLabels);
    expect(newDimensionsLabels1.length).toBe(MIN_PROJECT_DIMENSIONS);

    const newDimensionsLabels2 = removeLastDimensionLabel(newDimensionsLabels1);
    expect(newDimensionsLabels2.length).toBe(MIN_PROJECT_DIMENSIONS);
});

test('addNewDimensionLabel should add a dimension label accoring with DEFAULT_DIMENSIONS_LABELS untill the MAX_PROJECT_DIMENSIONS is reached', () => {

    const oldLabels = [
        "backend",
        "frontend"
    ];

    const newDimensionsLabels = addNewDimensionLabel(oldLabels);
    expect(newDimensionsLabels.length).toBe(3);
    expect(newDimensionsLabels[2]).toBe(DEFAULT_DIMENSIONS_LABELS[2]);

    const newDimensionsLabels1 = addNewDimensionLabel(newDimensionsLabels);
    expect(newDimensionsLabels1.length).toBe(MAX_PROJECT_DIMENSIONS);
    expect(newDimensionsLabels1[3]).toBe(DEFAULT_DIMENSIONS_LABELS[3]);

    const newDimensionsLabels2 = addNewDimensionLabel(newDimensionsLabels1);
    expect(newDimensionsLabels2.length).toBe(MAX_PROJECT_DIMENSIONS);
});