// Happy coding
const fs = require("fs");



const parsedData = fs.readFileSync("expenses.json", "utf-8");
const expenses = JSON.parse(parsedData);

const command = process.argv[2];

// Iteration 1
if (command == "--list") {
    console.log("ID Date Concept Category Amount");
    console.log("-------------------------------------------------");
    for (const e of expenses) {
        displayExpense(e);
    }
}

// Iteration 2
else if (command == "--summary") {
    let total = 0;
    for (const e of expenses) {
        total += e.amount;
    }
    console.log(`Total: ${total} €`);
}

else if (command == "--filter-category") {
    const category = process.argv[3]; // obtener la cateogoría de los argumentos
    console.log("ID Date Concept Category Amount");
    console.log("-------------------------------------------------");
    for (const e of expenses) {
        if (e.category == category) {
            displayExpense(e);
        }
    }
}

else if( command == "--find") {
    const id = process.argv[3]; // obtener el id del gasto de los argumentos
    for (const e of expenses) {
        if (e.id == id) {
            displayExpense(e);
        }
    }
}

else if (command == "--add") {
    const newExpense = {
        id: expenses.at(-1).id + 1, // simple ID generation
        timestamp: Math.floor(Date.now() / 1000), // current timestamp
        concept: process.argv[3],
        category: process.argv[4],
        amount: parseFloat(process.argv[5])
    };
    expenses.push(newExpense);
    console.log("Expense added:");
    displayExpense(newExpense);
    fs.writeFileSync("expenses.json", JSON.stringify(expenses));
}

else if (command == "--delete") {
    const id = process.argv[3];
    let index = 0;
    let found = false;

    while (!found && index < expenses.length) {
        if (expenses[index].id == id) {
            console.log("Expense to remove: ", expenses[index]);
            expenses.splice(index, 1); // Remove and store the removed expense
            fs.writeFileSync("expenses.json", JSON.stringify(expenses));
            found = true;
        }
        index++;
    }

    if (!found) {
        console.log("Error: Expense with the specified ID not found.");
    }
}

function displayExpense(expense) {
    console.log(`#${expense.id} ${new Date(expense.timestamp * 1000).toLocaleDateString()} ${expense.concept} ${expense.category} ${expense.amount} €`);
}