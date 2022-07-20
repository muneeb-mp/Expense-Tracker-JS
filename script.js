
// Getting id of all the elements
const balance = document.getElementById("balance");
const bal_plus = document.getElementById("bal-plus");
const bal_minus = document.getElementById("bal-minus");
const form = document.getElementById("form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactionHistory"));

// Dummy data
// const dummyTransactions = [
//     { id: 1, title: "Salary", amount: 20000 },
//     { id: 2, title: "Biryani", amount: -200 },
//     { id: 3, title: "Stocks", amount: 500 },
//     { id: 4, title: "Taxi", amount: -60 },
//     { id: 4, title: "Internet Recharge", amount: -1400 }
// ];

// let transactionHistory = dummyTransactions;
// let transactionHistory = [];
let transactionHistory = localStorage.getItem("transactionHistory") !== null ? localStorageTransactions : [];

// Adding data to the History list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount > 0 ? "plus" : "minus"
    );

    item.innerHTML = `
        ${transaction.title}<span>Rs. ${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
            <i class="fa-solid fa-trash"></i>
        </button>
    `
    list.appendChild(item);
}



// Add transaction when user inputs data in page
function addTransaction(x){
    x.preventDefault();
    if(title.value.trim() === "" || amount.value.trim() === ""){
        alert("Please enter title and amount");
    }
    else{
        const transaction = {
            id :generateID(),
            title: title.value,
            amount: +amount.value,
        };
        transactionHistory.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();

        // reset input fields
        title.value = "";
        amount.value = "";
    }
}



// Function to generate ID
function generateID(){
    return Math.floor(Math.random() * 10000000);
}



// Delete items from list
function deleteTransaction(id){
    transactionHistory = transactionHistory.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}



// Function to update values in dom
function updateValues() {
    // Add all amount in the array
    const amounts = transactionHistory.map(transaction => transaction.amount);
    // update the balance 
    const totalBal = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // update the income and expense
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
        ).toFixed(2);

    // Make changes on the Dom
    balance.innerText = `Rs. ${totalBal}`;
    bal_plus.innerText = `Rs. ${income}`;
    bal_minus.innerText = `Rs. ${expense}`;
}



// Update local storage
function updateLocalStorage(){
    localStorage.setItem("transactionHistory",JSON.stringify(transactionHistory));
}



// Initial page look
function init(){
    list.innerHTML = "";
    // if(transactionHistory.length == 0){
    //     list.innerHTML = `<p style=color:gray>Your transaction history is empty, + some transactions</p>`;
    // }
    transactionHistory.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener("submit", addTransaction);