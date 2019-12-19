
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
    },

    // Called when Deploy is pressed
    updateConnection(data, connectionId) {
        return postData(`${apiUrl}connections/${connectionId}/update`, data);
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

const postData = (query, data) => {
    return new Promise((resolve, reject) => {
        fetch(query, {
            method: 'POST',
            body: JSON.stringify(data), 
            mode: 'cors',
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        }).then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
};

export default apiHandlers;