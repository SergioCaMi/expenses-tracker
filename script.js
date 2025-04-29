// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp

const fs = require("fs");
const path = require("path");
const directory = "./";
const filePath = path.join(directory, "expenses.json");
const arguments = process.argv.slice(2);

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error al leer el directorio", err);
  } else {
    const expenses = JSON.parse(data);
    // Listado
    if (arguments.at(0) == "--list") {
      expenses.forEach((spent) => {
        const date = new Date(spent.timestamp * 1000)
          .toISOString()
          .split("T")[0]; // Convertir a milisegundos en formato "YYYY-MM-DD"
        console.log(
          `#${spent.id} ${date} ${spent.category} ${spent.concept} ${spent.amount} €`
        );
      });
    }
    // Resumen
    if (arguments.at(0) == "--summary") {
      let acumulate = 0;
      expenses.forEach((spent) => {
        acumulate = acumulate + +spent.amount;
      });
      console.log(`Èl gasto total acumulado es de ${acumulate}`);
    }
    // Filtros
    // if (arguments.at(-1) == "--summary") {
    //   let acumulate = 0;
    //   expenses.forEach((spent) => {
    //     acumulate = acumulate + +spent.amount;
    //   });
    //   console.log(`Èl gasto total acumulado es de ${acumulate}`);
    // }
  }
});
