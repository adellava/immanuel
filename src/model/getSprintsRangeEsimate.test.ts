import getSprintsRangeEsimate from "model/getSprintsRangeEsimate";

test('getSprintsNumber should return a money estimate from an estimate based on the team effort per sprint', () => {

    const estimate = {
        bestCase: 13,
        buffer: 3,
        estimate: 16
    };

    const teamEffortUnitsPerSprint = 4;

    const sprintsRangeEsimate = getSprintsRangeEsimate(estimate, teamEffortUnitsPerSprint);

    expect(sprintsRangeEsimate).toEqual({
        bestCase: 3,
        buffer: 1,
        estimate: 4,
        teamEffortPerSprint: teamEffortUnitsPerSprint
    });


    const teamEffortUnitsPerSprint1 = 2;

    const sprintsRangeEsimate1 = getSprintsRangeEsimate(estimate, teamEffortUnitsPerSprint1);

    expect(sprintsRangeEsimate1).toEqual({
        bestCase: 7,
        buffer: 2,
        estimate: 9,
        teamEffortPerSprint: teamEffortUnitsPerSprint1
    });

    
});
