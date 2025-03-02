const jediService = require("../service/JediService");

async function createJedi(req, res) {
    console.log("saving jedi");
    await jediService.addJedi(req.body);
    res.status(200).json(req.body);
}


async function getJedi(req, res, next) {
    let jediId = Number.parseInt(req.params.id);
    //TODO 1. Turn it to error with proper status and throw it
    if (isNaN(jediId)){
        let error = Error("wrong parameters");
        error.statusCode(400);
        throw error;
    } 

    const jedi = await jediService.getJedi(jediId);

    if (!jedi) {
        //TODO 2. Turn it to error with proper status and throw it
        let error = Error("Not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(jedi);
}

async function getAll(req, res) {
    let data = await jediService.getAll();
    if (!data) data = [];
    res.status(200).json(data);
}

async function replaceJedi(req, res, next) {
    const jediId = Number.parseInt(req.params.id);
    if (isNaN(jediId)) {
        //TODO 3. Turn it to error with proper status and throw it
        let error = Error("wrong parameters");
        error.statusCode = 400;
        throw error;
    }

    const data = await jediService.replaceJedi(jediId, req.body);
    res.status(200).json(data);
}

async function deleteJedi(req, res, next) {
    let jediId = Number.parseInt(req.params.id);
    //TODO 4. Turn it to error with proper status and throw it
    if (isNaN(jediId)){
        let error = Error("wrong parameters");
        error.statusCode = 400;
        throw error;
    }

    const data = await jediService.deleteJedi(jediId);
    res.status(200).json(data);
}

module.exports = {
    createJedi,
    deleteJedi,
    getAll,
    getJedi,
    replaceJedi
};