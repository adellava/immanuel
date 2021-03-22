export interface ProjectEstimate {
    bestCase: number,
    buffer: number,
    estimate: number
}

export interface SprintsRangeProjectEstimate extends ProjectEstimate {
    teamEffortPerSprint: number
}
export interface MoneyRangeProjectEstimate extends ProjectEstimate {
    costPerSprint: number
}
export interface UserStory {
    description: string,
    note?: string,
    estimate: UserStoryEstimate[]
}
export interface UserStoryEstimate {
    [bestCase: string]: number,
    worstCase: number
}