console.log('masuk');

const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const tipBtn = document.querySelectorAll('.select-tip-wrap button');
const customTip = document.querySelector('#custom-tip');
const pricePersonAmount = document.querySelector('#price-person-amount');
const priceTotal = document.querySelector('#price-total');
const reset = document.querySelector('#reset');
let tipValue = 0;

tipBtn.forEach((item) =>{
    // console.log(item);
    item.addEventListener('click', (e) => {
        item.parentElement.querySelectorAll('button').forEach((ite) => {
            removeActive(ite);
        })

        
        tipBtnClick(e, item);
        if ((item.classList.contains('active') || customTip.value !== '') && (people.value !== '' && people.value != 0)) {
            tipPerson(bill.value, tipValue, people.value);
            tipTotalPerson(bill.value, tipValue, people.value);
        }
    });

    customTip.addEventListener("input", function(){
        removeActive(item);
        tipValue = customTip.value;
        if ((item.classList.contains('active') || customTip.value !== '') && (people.value !== '' && people.value != 0)) {
            tipPerson(bill.value, tipValue, people.value);
            tipTotalPerson(bill.value, tipValue, people.value);
        }
    })

    bill.addEventListener("input", function(){
        if ((item.classList.contains('active') || customTip.value !== '') && (people.value !== '' && people.value != 0)) {
            console.log(bill.value);
            tipPerson(bill.value, tipValue, people.value);
            tipTotalPerson(bill.value, tipValue, people.value);
        }
    })

    people.addEventListener("input", function(){
        if ((item.classList.contains('active') || customTip.value !== '') && (people.value !== '' && people.value != 0)) {
            tipPerson(bill.value, tipValue, people.value);
            tipTotalPerson(bill.value, tipValue, people.value);
        }
    })

    reset.addEventListener('click', function(){
        item.parentElement.querySelectorAll('button').forEach((ite) => {
            removeActive(ite);
        });
        bill.value = '';
        people.value = '';
        customTip.value = '';
        pricePersonAmount.textContent = 0;
        priceTotal.textContent = 0;
    })
})

people.addEventListener("input", function(){
    if(people.value == 0 ){
        this.classList.add('error');
        if(!this.parentElement.querySelector('.error-text')){
            const para = document.createElement("p");
            para.classList.add('error-text', 'text-base')
            para.innerText = "Can't be zero";
            this.parentElement.appendChild(para);
        }
        
    }else{
        this.classList.remove('error');
        if(this.parentElement.querySelector('.error-text')){
            this.parentElement.querySelector('.error-text').remove();
        }
    }
})

function tipBtnClick(e){
    e.preventDefault();
    console.log(e.target);
   
    e.target.classList.add('active');
    tipValue = e.target.textContent;
}

function removeActive(item){
    item.classList.remove('active');
}

function tipPerson(bill, tip, person){
    console.log('test person');
    let billFloat = parseFloat(bill);
    let tipFloat = parseFloat(tip);
    let personInt = parseInt(person);
    let total = (billFloat * (tipFloat/100))/personInt;
    let totalString = total.toString();
    let decimalPart = totalString.split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
        pricePersonAmount.textContent = total.toFixed(2);
    } else {
        pricePersonAmount.textContent = total;
    }
}

function tipTotalPerson(bill, tip, person){
    let billFloat = parseFloat(bill);
    let tipFloat = parseFloat(tip);
    let personInt = parseInt(person);
    let total = (billFloat + (billFloat * (tipFloat/100)))/personInt;
    let totalString = total.toString();
    let decimalPart = totalString.split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
        priceTotal.textContent = total.toFixed(2);
    } else {
        priceTotal.textContent = total;
    }
}

