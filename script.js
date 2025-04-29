// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp 

const fs = require("fs");
const path = require("path");
const directory = "./";
const filePath = path.join(directory, "expenses.json");
const arguments = process.argv.slice(2);

fs.readFile(filePath, "utf-8", (err) => {
    if (err) {
      console.log("Error al leer el directorio", err);
    } else {
        if (arguments.at(-1)== "--list"){
            console.log("listado");
        }
    }
  });