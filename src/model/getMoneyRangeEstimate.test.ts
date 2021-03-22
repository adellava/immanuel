import getMoneyRangeEstimate from "model/getMoneyRangeEstimate";

test('getMoneyRangeEstimate shoud return a money estimate from an estimate', () => {

    const estimate = {
        bestCase: 13,
        buffer: 3,
        estimate: 16
    };

    const effortUnitsPerSprint = 4;
    const effortUnitCost = 100;

    const moneyRangeEsimate = getMoneyRangeEstimate(estimate, effortUnitsPerSprint, effortUnitCost);

    expect(moneyRangeEsimate).toEqual({
        bestCase: 1200,
        buffer: 400,
        estimate: 1600,
        costPerSprint: 400
    });
    

    const estimate1 = {
        bestCase: 50,
        buffer: 14,
        estimate: 64
    };

    const effortUnitsPerSprint1 = 10;
    const effortUnitCost1 = 500;

    const moneyRangeEsimate1 = getMoneyRangeEstimate(estimate1, effortUnitsPerSprint1, effortUnitCost1);

    expect(moneyRangeEsimate1).toEqual({
        costPerSprint: 5000,
        bestCase: 25000,
        buffer: 5000,
        estimate: 30000
    });
    
});
