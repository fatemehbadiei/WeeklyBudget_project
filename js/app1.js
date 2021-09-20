//classes
class Budget {
    constructor(money) {
        this.money = money
        this.moneyLeft = this.money
    }
    subtractFromBudget(amount){
        return this.moneyLeft -= amount ;
    }
}

//everything related to html
class HTML {

    //insert budget
    insertBudget(budget) {
        budgetTotal.innerHTML = budget;
        budgetLeft.innerHTML = budget;
    }

    //print messages
    printMessage(message, className) {
        //create a div for showing message
        let div = document.createElement("div");

        //adding className to the div
        div.classList.add("alert", "text-center", className);

        //showing message into the div
        div.innerText = message;

        //access to the div with primary class
        let primary = document.querySelector(".primary");

        //insert div before form
        primary.insertBefore(div, addExpenseForm);

        //remove alert message after 2 seconds

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);

        //reset form after remove alert
        addExpenseForm.reset();
    }

    //insert expenses to the li
    insertExpenses(name, amount) {
        //access to the ul tag
        const expenses = document.querySelector("#expenses ul");
        //create li tag
        let li = document.createElement("li");
        //add class list to the li
        li.classList.add("list-group-item" , "d-flex" , "justify-content-between" , "align-items-center");
        //putting name and amount into li tag
        li.innerHTML = `
        ${name}
        <span class="badge badge-primary badge-pill">${amount}</span>
        `
        //append li to parent
        expenses.appendChild(li);
        //reset form after adding li
        addExpenseForm.reset();
    }
    //less amount from total budget
    trackBudget(amount){

        const budgetLeftTomans = budget.subtractFromBudget(amount);
        //showing budgetLeftTomans into budget left
        budgetLeft.innerHTML = `${budgetLeftTomans}`;
        //validate budget left
        if ( ((budgetLeftTomans / budget.money) * 100 ) <= 25 ){

            budgetLeft.parentElement.parentElement.classList.remove("alert-success" , "alert-warning");
            budgetLeft.parentElement.parentElement.classList.add("alert-danger");

        }else if ( ((budgetLeftTomans / budget.money) * 100 ) <= 50 ){

            budgetLeft.parentElement.parentElement.classList.remove("alert-success");
            budgetLeft.parentElement.parentElement.classList.add("alert-warning");
        }


    }
}


//variables
let userBudget;

let budget;

const html = new HTML();

let budgetTotal = document.querySelector("#total");
let budgetLeft = document.querySelector("#left");

const addExpenseForm = document.querySelector("#add-expense");


//eventListeners
eventListeners();

function eventListeners() {
    //showing an alert for getting weekly budget from user
    document.addEventListener("DOMContentLoaded", function () {
        userBudget = prompt("لطفا بودجه هفتگی خود را وارد کنید");
        //invalidate user budget
        if (userBudget === null || userBudget === "0" || userBudget === "") {
            window.location.reload();
        } else {
            //instanciate Budget class
            budget = new Budget(userBudget);
            //insert budget
            html.insertBudget(budget.money);
        }
    });

    //submit form
    addExpenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        //access to the every input of form
        const expense = document.querySelector("#expense").value;
        const amount = document.querySelector("#amount").value;

        //validate expense and amount
        if (expense === "" || amount === "") {
            html.printMessage("پر کردن همه فیلد ها الزامی است", "alert-danger")
        } else {
            html.insertExpenses(expense, amount);
            html.trackBudget(amount);
        }
    });
}
