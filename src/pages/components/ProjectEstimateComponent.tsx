import React, { useState } from "react";
import { ProjectEstimate } from "../../model/entities";

interface ProjectEstimateProps {
    projectEstimate: ProjectEstimate
}

const ProjectEstimateComponent = ( { projectEstimate } : ProjectEstimateProps ) => {


    return <div>
        <dl>
            <dd>Best Case</dd>
            <dd>{projectEstimate.bestCase}</dd>

            <dd>Buffer</dd>
            <dd>{projectEstimate.buffer}</dd>

            <dd>Estimate</dd>
            <dd>{projectEstimate.estimate}</dd>
        </dl>
    </div>;
}

export default ProjectEstimateComponent;