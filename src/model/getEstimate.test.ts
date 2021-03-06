import getEsimate, { UserStory } from "./getEstimate";

const userStories:Array<UserStory> = [{
    description: "As User, I want to XXX, so YYY",
    estimate: {
        bestCase: 3,
        worstCase: 5
    }
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: {
        bestCase: 2,
        worstCase: 4
    }
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: {
        bestCase: 4,
        worstCase: 5
    }
},
{
    description: "As User, I want to XXX, so YYY",
    estimate: {
        bestCase: 4,
        worstCase: 4
    }
}];

test('getEstimate  shoud return an estimate from a list of user stories', () => {

    const estimate = getEsimate(userStories);
    expect(estimate).toEqual({
        bestCase: 13,
        buffer: 3,
        estimate: 16
    });
    
});


test('getEstimate  shoud manage non expected input', () => {

    const estimate1 = getEsimate([{
        description: "As User, I want to XXX, so YYY",
        estimate: {
            bestCase: 3,
            worstCase: 5
        }
    },
    {
        description: "As User, I want to XXX, so YYY",
        estimate: {
            bestCase: 4,
            worstCase: 2
        }
    }]);
    expect(estimate1).toEqual({
        bestCase: 7,
        buffer: 2,
        estimate: 9
    });

    const estimate2 = getEsimate([{
        description: "As User, I want to XXX, so YYY",
        estimate: {
            bestCase: 3,
            worstCase: 5
        }
    },
    {
        description: "As User, I want to XXX, so YYY",
        estimate: {
            bestCase: 0,
            worstCase: 0
        }
    },
    {
        description: "As User, I want to XXX, so YYY",
        estimate: {
            bestCase: -5,
            worstCase: -4
        }
    }]);
    expect(estimate2).toEqual({
        bestCase: 3,
        buffer: 2,
        estimate: 5
    });
    
});