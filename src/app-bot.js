const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const tipBtn = document.querySelectorAll('.select-tip-wrap button');
const customTip = document.querySelector('#custom-tip');
const pricePersonAmount = document.querySelector('#price-person-amount');
const priceTotal = document.querySelector('#price-total');
const reset = document.querySelector('#reset');
let tipValue = 0;

// Function to remove 'active' class from all buttons
function removeActiveButtons() {
    tipBtn.forEach(btn => btn.classList.remove('active'));
}

// Function to check if a number has more than 2 decimal places
function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

// Function to calculate and update prices
function updatePrices() {
    const billValue = parseFloat(bill.value);
    const tip = parseFloat(tipValue);
    const peopleCount = parseInt(people.value);

    if (billValue && tip && peopleCount) {
        const totalTip = billValue * (tip / 100);
        const totalPerPerson = (billValue + totalTip) / peopleCount;
        const tipPerPerson = totalTip / peopleCount;

        pricePersonAmount.textContent = toFixedIfNecessary(tipPerPerson, 2);
        priceTotal.textContent = toFixedIfNecessary(totalPerPerson, 2);
    } else {
        pricePersonAmount.textContent = '0';
        priceTotal.textContent = '0';
    }
}

// Function to handle error display for people input
function handlePeopleInputError() {
    if (people.value == 0) {
        people.classList.add('error');
        if (!people.parentElement.querySelector('.error-text')) {
            const errorText = document.createElement("p");
            errorText.classList.add('error-text', 'text-base');
            errorText.innerText = "Can't be zero";
            people.parentElement.appendChild(errorText);
        }
    } else {
        people.classList.remove('error');
        const errorText = people.parentElement.querySelector('.error-text');
        if (errorText) {
            errorText.remove();
        }
    }
}

// Event listener for tip buttons
tipBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        removeActiveButtons();
        item.classList.add('active');
        tipValue = item.textContent;
        updatePrices();
    });
});

// Event listener for custom tip input
customTip.addEventListener('input', () => {
    removeActiveButtons();
    tipValue = customTip.value;
    updatePrices();
});

// Event listener for bill input
bill.addEventListener('input', updatePrices);

// Event listener for people input
people.addEventListener('input', () => {
    handlePeopleInputError();
    updatePrices();
});

// Event listener for reset button
reset.addEventListener('click', () => {
    removeActiveButtons();
    bill.value = '';
    people.value = '';
    customTip.value = '';
    pricePersonAmount.textContent = '0';
    priceTotal.textContent = '0';
});

// Initial error handling for people input
people.addEventListener('input', handlePeopleInputError);