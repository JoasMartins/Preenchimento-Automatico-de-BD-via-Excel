const express = require("express");
const api = express();
const mongoose = require("mongoose");
const multer = require("multer");
const xlsx = require("xlsx");

//  Configurando Multer para usar memória local
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//  Conectar com aplicação do banco de dados MongoDB
mongoose.connect("URL_do_seu_banco_de_dados_mongodb")
    .then(() => {
        console.log("🟢 | MongoDB conectada com sucesso!")
        api.listen(4000, async () => {
            console.log("🟢 | API ligada com sucesso!")
        });
    })
    .catch((err) => {
        console.log(err)
        console.log("❌ | MongoDB não foi conectado!")
        console.log("❌ | API não foi ligada devido a não conexão com banco de dados!")
    });

var schemaUsers = new mongoose.Schema({
    name: String,
    email: String,
});

//  Definindo a Coleção "User" no banco de dados
const modelUsers = mongoose.model("User", schemaUsers);


api.post("/file", upload.single("file"), async (req, res) => {
    if(!req.file) {
        return res.status(400).json({ response: "Nenhum arquivo foi enviado!" });
    }

    const buffer = req.file.buffer;
    const workbook = xlsx.read(buffer, { type: 'buffer' });

    const planExcel = xlsx.utils.sheet_to_json(workbook.Sheets.Plan1);
    planExcel.forEach((data) => {
        new modelUsers(data).save(); // Adicionar o objeto ao Banco de Dados definindo em "modelUsers"
    });

    res.send(planExcel); // Retornará um Array com os dados lidos no arquivo passado
})