const mangaApi = {
    async createSeries(seriesData) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.createObject('manga-series', seriesData);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async updateSeries(seriesId, seriesData) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.updateObject('manga-series', seriesId, seriesData);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async createAct(seriesId, actData) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.createObject(`manga-act:${seriesId}`, actData);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async createEpisode(seriesId, actId, episodeData) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.createObject(`manga-episode:${seriesId}:${actId}`, episodeData);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async listSeries() {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.listObjects('manga-series', 100, true);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async getSeriesActs(seriesId) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.listObjects(`manga-act:${seriesId}`, 100, true);
        } catch (error) {
            reportError(error);
            throw error;
        }
    },

    async getActEpisodes(seriesId, actId) {
        try {
            const trickleObjAPI = new TrickleObjectAPI();
            return await trickleObjAPI.listObjects(`manga-episode:${seriesId}:${actId}`, 100, true);
        } catch (error) {
            reportError(error);
            throw error;
        }
    }
};
