import { 
    UserStory
} from "model/entities";

function getFileHandle() {
    // For Chrome 86 and later...
    if (window.showOpenFilePicker) {
        return window.showOpenFilePicker().then((handles) => handles[0]);
    }
    // For Chrome 85 and earlier...
    return window.chooseFileSystemEntries();
}

function _readFileLegacy(file:File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        const text = e.srcElement.result;
        resolve(text);
      });
      reader.readAsText(file);
    });
}

function readFile(file:File) {
    // If the new .text() reader is available, use it.
    if (file.text) {
      return file.text();
    }
    // Otherwise use the traditional file reading technique.
    return _readFileLegacy(file);
}

export interface openFileAsDocumentCallbackParams {
    userStories: UserStory[],
    dimensionsLabels: string[],
    effortPerSprint: number,
    costPerEffortUnit: number,
};

interface openFileAsDocument {
    onDocumentOpen: (
        document:openFileAsDocumentCallbackParams
    ) => void
}

const openFileAsDocument = async ({ onDocumentOpen }:openFileAsDocument) => {

    try {

        let fileHandle = await getFileHandle();
        
        if (!fileHandle) {
            return;
        }

        const file = await fileHandle.getFile();
        const fileRead = await readFile(file);
        const fileParsed = JSON.parse(fileRead);

        onDocumentOpen(fileParsed);
    
    } catch {

        console.log("error in loading file!");

    }


    
};

export default openFileAsDocument;