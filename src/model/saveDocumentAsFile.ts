import { 
    UserStory
} from "model/entities";

interface saveDocumentAsFileParams {
    userStories: UserStory[],
    dimensionsLabels: string[],
    effortPerSprint: number,
    costPerEffortUnit: number,
};

const saveDocumentAsFile = ({
    userStories,
    dimensionsLabels,
    effortPerSprint,
    costPerEffortUnit
}:saveDocumentAsFileParams) => {

    const jsonToWrite = {
        userStories,
        dimensionsLabels,
        effortPerSprint,
        costPerEffortUnit
    };

    const blob = new Blob([JSON.stringify(jsonToWrite)], { type: "text/json" });
    const link = document.createElement("a");

    let documentName = prompt("Document name");

    link.download = `${documentName}.json`;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
};

export default saveDocumentAsFile;