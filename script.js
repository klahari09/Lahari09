let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expense.description}: $${expense.amount.toFixed(2)}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
    const description = document.getElementById('item').value;
    const amount = parseFloat(document.getElementById('amt').value);

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    expenses.push({ description, amount });
    renderExpenses();

    
    document.getElementById('item').value = '';
    document.getElementById('amt').value = '';
}

function editExpense(index) {
    const newDescription = prompt('Enter new description:');
    const newAmount = parseFloat(prompt('Enter new amount:'));

    if (newDescription.trim() === '' || isNaN(newAmount) || newAmount <= 0) {
        alert('Please enter valid description and amount.');
        return;
    }

    expenses[index].description = newDescription;
    expenses[index].amount = newAmount;
    renderExpenses();
}

function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        renderExpenses();
    }
}


renderExpenses();
