
const apiUrl = "http://localhost:8000/api/";

const apiHandlers = {

    getAvailableGames() {
        return fetchData(`${apiUrl}connections`);
    },

    getFilesByGameId(id) {
        return fetchData(`${apiUrl}files/${id}`);
    },

    getCodefills() {
        return fetchData(`${apiUrl}codeFills`);
    },

    getSelectedGameIdByName(name) {
        return fetchData(`${apiUrl}games/${name}`);
    },

    getCodeBlocksByFileId(fileId) {
        return fetchData(`${apiUrl}codeBlocks/${fileId}`);
    }

    // fetchData(url, callback) {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(json => callback(json.data))
    //         .catch(err => console.error(err));
    // }

    
};

const fetchData = (query) => {
    return new Promise((resolve, reject) => {
        fetch(query)
        .then(response => response.json())
        .then(json => resolve(json.data))
        .catch(err => reject(err));
    });
};

export default apiHandlers;