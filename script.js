// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp

const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "expenses.json");
const arguments = process.argv.slice(2);

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error al leer el directorio", err);
  } else {
    const expenses = JSON.parse(data);
    // Listado
    if (arguments.at(0) == "--list") {
      console.log("ID    Date    Concept     Category    Amount");
      console.log("-----------------------------------------");
      expenses.forEach((spent) => {
        const date = new Date(spent.timestamp * 1000).toLocaleDateString();
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
    if (arguments.at(0) == "--filter-category") {
      const category = arguments.at(1);
      expenses.forEach((spent) => {
        if (category.toLowerCase() == spent.category.toLowerCase()) {
          const date = new Date(spent.timestamp * 1000).toLocaleDateString();
          console.log(
            `#${spent.id} ${date} ${spent.category} ${spent.concept} ${spent.amount} €`
          );
        }
      });
    }
    // Buscar por id
    if (arguments.at(0) == "--find") {
      const id = arguments.at(1);
      expenses.forEach((spent) => {
        if (id == +spent.id) {
          const date = new Date(spent.timestamp * 1000).toLocaleDateString();
          console.log(
            `#${spent.id} ${date} ${spent.category} ${spent.concept} ${spent.amount} €`
          );
        }
      });
    }
    // Añadir
    if (arguments.at(0) == "--add") {
      const newObject = {
        id: expenses.length + 1,
        timestamp: Date.now(),
        category: arguments.at(1),
        concept: arguments.at(2),
        amount: arguments.at(3),
      };
      expenses.push(newObject);
      fs.writeFile(filePath, JSON.stringify(expenses), "utf8", (err) => {
        if (err) {
          console.log("Error al añadir nuevo objeto");
        } else {
          console.log("Datos añadidos satisfactoriamente.");
        }
      });
    }
    // Eliminar
    if (arguments.at(0) == "--delete") {
      const id = arguments.at(1);
      const newArray = [];
      let finded = false;
      expenses.forEach((spent) => {
        if (id != +spent.id) {
          newArray.push(spent);
        } else {
          finded = true;
        }
      });
      if (finded) {
        fs.writeFile(filePath, JSON.stringify(newArray), "utf8", (err) => {
          if (err) {
            console.log(`Error al eliminar nuevo objeto con id ${id}`);
          } else {
            console.log("Datos eliminados satisfactoriamente.");
          }
        });
      } else {
        console.log("Elemento no encontrado.");
      }
    }
  }
});
