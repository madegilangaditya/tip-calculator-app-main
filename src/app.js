console.log('masuk');

const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const tipBtn = document.querySelectorAll('.select-tip-wrap button');
const customTip = document.querySelector('#custom-tip');
const pricePersonAmount = document.querySelector('#price-person-amount');
const priceTotal = document.querySelector('#price-total');
let tipValue = 0;

tipBtn.forEach((item) =>{
    // console.log(item);
    item.addEventListener('click', (e) => {
        item.parentElement.querySelectorAll('button').forEach((ite) => {
            removeActive(ite);
        })
        tipBtnClick(e, item);
        console.log(tipValue);
    });

    customTip.addEventListener("input", function(){
        removeActive(item);
        tipValue = customTip.value;
        console.log(tipValue);
    })

    bill.addEventListener("input", function(){
        if ((item.classList.contains('active') || customTip.value !== '') && (people.value !== '' && people.value != 0)) {
            console.log(bill.value);
            tipPerson(bill.value, tipValue, people.value);
            tipTotalPerson(bill.value, tipValue, people.value);
        }
    })
})

function tipBtnClick(e, item){
    e.preventDefault();
    console.log(e.target);
   
    e.target.classList.add('active');
    tipValue = e.target.textContent;
}

function removeActive(item){
    // console.log(item.parent);
    item.classList.remove('active');
}

function tipPerson(bill, tip, person){
    console.log('test person');
    let billFloat = parseFloat(bill);
    let tipFloat = parseFloat(tip);
    let personInt = parseInt(person);
    let total = (billFloat * (tipFloat/100))/personInt;
    pricePersonAmount.textContent = total.toFixed(2);
    console.log(total);
}

function tipTotalPerson(bill, tip, person){
    let billFloat = parseFloat(bill);
    let tipFloat = parseFloat(tip);
    let personInt = parseInt(person);
    let total = (billFloat + (billFloat * (tipFloat/100)))/personInt;
    priceTotal.textContent = total.toFixed(2);
    console.log(total);
}

