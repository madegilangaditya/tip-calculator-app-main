console.log('masuk');

const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const tipBtn = document.querySelectorAll('.select-tip-wrap button');
const customTip = document.querySelector('#custom-tip');

tipBtn.forEach((item) =>{
    // console.log(item);
    item.addEventListener('click', (e) => {
        item.parentElement.querySelectorAll('button').forEach((ite) => {
            removeActive(ite);
        })
        tipBtnClick(e, item);
    });
})

function tipBtnClick(e, item){
    e.preventDefault();
    console.log(e.target);
   
    e.target.classList.add('active');
}

function removeActive(item){
    // console.log(item.parent);
    item.classList.remove('active');
}