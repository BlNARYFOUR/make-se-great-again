
const apiUrl = "http://localhost:8000/api/";

const apiHandlers = {
    getAvailableGames() {
        return fetchData(`${apiUrl}connections`);
    },

    getFilesByGameId(id) {
        return fetchData(`${apiUrl}files/${id}`);
    },

    getCodeFills() {
        return fetchData(`${apiUrl}codeFills`);
    },

    getCodeFillsByGameId(gameId) {
        return fetchData(`${apiUrl}codeFills/${gameId}`);
    },

    getSelectedGameIdByName(name) {
        return fetchData(`${apiUrl}games/${name}`);
    },

    // getCodeBlocksByFileId(fileId) {
    //     return fetchData(`${apiUrl}codeBlocks/${fileId}`);
    // },

    getCodeBlocksByGameId(gameId) {
        return fetchData(`${apiUrl}codeBlocks/${gameId}`);
    }
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