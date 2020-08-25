const fs = require('fs');
const path = require('path');

console.log("Executando o postbuild...");

// função para limpar o diretório de destino
function limpar_destino(dest_dir) {
    // processa a lista de arquivos e pastas do diretório
    var files = fs.readdirSync(dest_dir);

    files.forEach(function (file) {
        var file_path = path.join(dest_dir, file);

        if (fs.lstatSync(file_path).isDirectory()) {
            limpar_destino(file_path);
        }

        if (file !== "README.md") {
            console.log("Removido " + file_path);
            fs.lstatSync(file_path).isDirectory() ? fs.rmdirSync(file_path) : fs.unlinkSync(file_path);
        }
    });
}

// função para processar os diretório
function processa_diretorios(work_dir, dest_dir) {
    // processa a lista de arquivos e pastas do diretório
    var files = fs.readdirSync(work_dir);

    files.forEach(function (file) {
        var file_path = path.join(work_dir, file);
        var dest_path = path.join(dest_dir, file);

        if (fs.lstatSync(file_path).isDirectory()) {
            // verifica se existe o diretório
            if (!fs.existsSync(dest_path) || !fs.lstatSync(dest_path).isDirectory()) {
                fs.mkdirSync(dest_path);
                console.log("Criado o diretório " + dest_path);
            }

            processa_diretorios(file_path, dest_path);
        } else if (fs.lstatSync(file_path).isFile()) {
            fs.copyFileSync(file_path, dest_path);
        }

        console.log("Copiado o arquivo " + file_path);
    });
}

// define o diretório de trabalho
const work_dir = path.join(__dirname, 'dist');
const dest_dir = "C:\\Users\\pablo\\source\\repos\\Projeto\\Backend\\Content\\vuetify";

limpar_destino(dest_dir);
processa_diretorios(work_dir, dest_dir);