// Get the form
const form = document.getElementById("mortgageForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get values
    const amount = Number(document.getElementById("mortgageAmount").value);
    const term = Number(document.getElementById("mortgageTerm").value);
    const interest = Number(document.getElementById("interestRate").value);
    const repaymentRadio = document.getElementById("repayment");
    const interestOnlyRadio = document.getElementById("interestOnly");
    
    // Error messages
    const amountError = document.getElementById("amountError");
    const termError = document.getElementById("termError");
    const rateError = document.getElementById("rateError");

    let hasError = false;

    // Validate Amount
    if (amount <= 0) {
        amountError.style.display = "block";
        hasError = true;
    } else {
        amountError.style.display = "none";
    }

    // Validate Term
    if (term <= 0) {
        termError.style.display = "block";
        hasError = true;
    } else {
        termError.style.display = "none";
    }

    // Validate Interest
    if (interest <= 0) {
        rateError.style.display = "block";
        hasError = true;
    } else {
        rateError.style.display = "none";
    }

    // Stop if there are errors
    if (hasError) return;

    // Mortgage Calculation
    const months = term * 12;

    const monthlyInterest = interest / 100 / 12;

    const power = Math.pow(1 + monthlyInterest, months);

    const numerator = amount * monthlyInterest * power;

    const denominator = power - 1;

    let monthlyPayment;
    let totalRepayment;

    if (repaymentRadio.checked) {

    monthlyPayment = numerator / denominator;

    totalRepayment = monthlyPayment * months;

      } else if (interestOnlyRadio.checked) {

    monthlyPayment = amount * monthlyInterest;

    totalRepayment = (monthlyPayment * months) + amount;

      } else {

    alert("Please select a mortgage type.");

    return;
    }

    // Show Result
    document.getElementById("monthlyPayment").textContent =
        "£" + monthlyPayment.toFixed(2);

    document.getElementById("totalRepayment").textContent =
        "£" + totalRepayment.toFixed(2);

    document.getElementById("emptyResult").style.display = "none";

    document.getElementById("completedResult").style.display = "block";

});

const clearButton = document.getElementById("clearAll");

clearButton.addEventListener("click", function (event) {

    event.preventDefault();

    // Clear inputs
    document.getElementById("mortgageAmount").value = "";
    document.getElementById("mortgageTerm").value = "";
    document.getElementById("interestRate").value = "";

    // Uncheck radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.checked = false;
    });

    // Hide error messages
    document.getElementById("amountError").style.display = "none";
    document.getElementById("termError").style.display = "none";
    document.getElementById("rateError").style.display = "none";

    // Show empty result
    document.getElementById("completedResult").style.display = "none";
    document.getElementById("emptyResult").style.display = "flex";

});