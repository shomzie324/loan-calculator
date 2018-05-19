// listen for submit

document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById("results").style.display = "none";

    // show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000)

    e.preventDefault();
});

function calculateResults() {
    console.log("Calculating...");

    //get form ui vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    // get result ui vars
    const monthly_payment = document.getElementById('monthly-payment');
    const total_payment = document.getElementById('total-payment');

    // calculation vars
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const calculatedMonthlyPayments = (principal * x * calculatedInterest) / (x - 1); 

    if (isFinite(calculatedMonthlyPayments)) {
        monthly_payment.value = calculatedMonthlyPayments.toFixed(2);
        total_payment.value = (calculatedMonthlyPayments * calculatedPayments).toFixed(2);

        // show results when calculation is complete
        document.getElementById("results").style.display = "block";

        // hide loader
        document.getElementById("loading").style.display = "none";

        showSuccess("Interest Calculated ! See below results.");
    } else {
        // build alert with create element functions
        showError("Please check inputs as an error may have occurred");
    }

}

function showError(err) {
    // hide results
    document.getElementById("results").style.display = "none";

    // hide loader
    document.getElementById("loading").style.display = "none";

    // get elements to insert message
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // creat div
    const errDiv = document.createElement('div');

    // add classes (with boot strap)
    errDiv.className = 'alert alert-danger';

    // creat text node and add to div
    errDiv.appendChild(document.createTextNode(err));

    // insert error message above header
    // call insertBefore on parent element and pass 2 things:
    // 1. element to insert
    // 2. which child element of parent to insert before
    card.insertBefore(errDiv, heading); 

    // clear error message after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function showSuccess(success_msg) {
    // get elements to insert message
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create div
    const successDiv = document.createElement('div');

    // add classes (with boot strap)
    successDiv.className = 'alert alert-success';

    // creat text node and add to div
    successDiv.appendChild(document.createTextNode(success_msg));

    // insert error message above header
    // call insertBefore on parent element and pass 2 things:
    // 1. element to insert
    // 2. which child element of parent to insert before
    card.insertBefore(successDiv, heading); 

    // clear error message after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}