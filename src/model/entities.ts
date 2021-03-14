export interface ProjectEstimate {
    bestCase: number,
    buffer: number,
    estimate: number
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