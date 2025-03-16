const _ = require('lodash');

function tratarErrosEsperados(res, err){
    if (String(err).includes("ValidationError: ")) {
        return res.status(400).json({
            status: "Erro",
            statusMensagem: _.replace(String(err), "ValidationError: ", "").replace(/:/g, ""),
            resposta: String(err)
        });
    }

    if (String(err).includes("Error: ")) {
        return res.status(400).json({
            status: "Erro",
            statusMensagem: _.replace(String(err), "Error: ", ""),
            resposta: String(err)
        });
    }

    console.error(err);
    return res.status(500).json({
        status: "Erro",
        statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
        resposta: String(err)
    });
}

module.exports = tratarErrosEsperados;
