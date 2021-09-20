//classes
class Budget {
    constructor(money) {
        this.money = money
        this.moneyLeft = this.money
    }

    subtractFromBudget(amount) {
        return this.moneyLeft -= amount;
    }
}

//everything related to the html
class HTML {
    //insert user budget
    insertBudget(budget) {
        budgetTotal.innerHTML = budget;
        budgetLeft.innerHTML = budget;
    }

    //print alert messages in the form
    printMessage(message, className) {
        //create a div for showing alert
        const div = document.createElement("div");
        div.classList.add("alert", "text-center", className);
        div.appendChild(document.createTextNode(message));
        //div.innerText = message;
        const primary = document.querySelector(".primary");
        primary.insertBefore(div, addExpenseForm);

        //remove alert after 2 seconds
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000)
        //reset form after remove alert
        addExpenseForm.reset();
    }

    //display expenses to the list
    insertExpenses(name, amount) {

            //access to the ul tag
            const expenses = document.querySelector("#expenses ul");

            //make a li tag
            let li = document.createElement("li");

            //add some classes to the li
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            //showing name and amount into the li
            li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">${amount}</span>
            `

            //append li to the parent
            expenses.appendChild(li);

            //reset form after adding
            addExpenseForm.reset();


    }

    trackBudget(amount) {

        const budgetLeftTomans = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftTomans}`;

        let range = document.querySelector("#range").value;
        let range1 = document.querySelector("#range1").value;

        //set alert for budgetLeft
        if (((budgetLeftTomans / budget.money) * 100 ) <= range ) {
            //if less than 25% budget left
            budgetLeft.parentElement.parentElement.classList.remove("alert-success", "alert-warning");
            budgetLeft.parentElement.parentElement.classList.add("alert-danger");

        } else if (((budgetLeftTomans / budget.money) * 100 ) <= range1 ) {
            //if less than 50% budget left
            budgetLeft.parentElement.parentElement.classList.remove("alert-success");
            budgetLeft.parentElement.parentElement.classList.add("alert-warning");
        }


    }
}


//variables
let userBudget;

let budget;

let budgetTotal = document.querySelector("span#total");
let budgetLeft = document.querySelector("span#left");

const addExpenseForm = document.querySelector("#add-expense");

const html = new HTML();


//eventListeners

eventListeners();

function eventListeners() {
    //showing a alert for getting weekly budget from user
    document.addEventListener("DOMContentLoaded", function () {
        userBudget = prompt("لطفا بودجه هفتگی خود را وارد کنید");
        //validate the budget that user enter
        if (userBudget === null || userBudget === "" || userBudget === '0') {
            window.location.reload();
        } else {
            //instanciate Budget class
            budget = new Budget(userBudget);
            //insert budget
            html.insertBudget(budget.money);
        }
    });

    //access to the values of form when submit
    addExpenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        //access to the value of every input
        const expense = document.querySelector("#expense").value;
        const amount = document.querySelector("#amount").value;

        //validate every input
        if (expense === "" || amount === "") {
            html.printMessage("پر کردن همه فیلد ها الزامی است", "alert-danger");
        } else {
            html.insertExpenses(expense, amount);
            html.trackBudget(amount);
        }
    })
}
