const fAmount = document.getElementById('expense-amount');
const fDescription = document.getElementById('expense-description');
const fCategory = document.getElementById('expense-category');

const addExpense = document.getElementById('add');
const display = document.getElementById('list');

// First stage all fild are blanck
fAmount.value = '';
fCategory.value = '';
fDescription.value='';

//console.log(fAmount,fCategory,fDescription,addExpense,display);

let expenseArray = [];
let objStr = localStorage.getItem('expense')
//console.log(typeof(objStr));
let isEdit = false, currentIndex = -1;

if(objStr!= null){
    expenseArray = JSON.parse(objStr);
}

addExpense.addEventListener('click', ()=>{
    //console.log(fAmount)
    if(fAmount.value!='' && fAmount.value >0 && fDescription.value!='' && fCategory.value!='' && isEdit==true){
        expenseArray[currentIndex].ammount = fAmount.value; 
        expenseArray[currentIndex].Description = fDescription.value;
        expenseArray[currentIndex].Category = fCategory.value;
        saveInfo(expenseArray)
        expenseDisplay()
        isEdit = false;
        currentIndex =-1;
        addExpense.textContent = 'Add Expanse'
        clearDisplay()
    }
    else if(fAmount.value!='' && fAmount.value >0 && fDescription.value!='' && fCategory.value!=''){
        let obj = {
            ammount: fAmount.value,
            Description: fDescription.value,
            Category: fCategory.value
        }
        expenseArray.push(obj);
        console.log(expenseArray);
        saveInfo(expenseArray)
        expenseDisplay()
        clearDisplay()
    }else{
        if(fAmount.value < 0){
            alert('Please Enter Positive Value')
        }else{
            alert("Please Enter All Expense Fild");
        }
    }
})

function saveInfo(expenseArray){
    localStorage.setItem('expense', JSON.stringify(expenseArray));
}

function expenseDisplay(){
    console.log(expenseArray)
    let statement = '';
    expenseArray.forEach((expenseItem, i)=>{
        console.log(expenseItem)
        statement += `
        <li>${expenseItem.ammount} - ${expenseItem.Description} - ${expenseItem.Category} <button class="edit-btn" onclick="editExpense(${i})">Edit Expense</button> <button class="delete-btn" onclick="deleteExpense(${i})">Delete Expense</button></li>
        `
    })
    console.log(statement)
    display.innerHTML = statement
}
function editExpense(index){
    fAmount.value = expenseArray[index].ammount;
    fDescription.value = expenseArray[index].Description;
    fCategory.value = expenseArray[index].Category;
    addExpense.textContent = 'Edit Expanse'
    isEdit = true;
    currentIndex = index;
}

function deleteExpense(i){
    expenseArray.splice(i, 1);
    saveInfo(expenseArray);
    expenseDisplay();
}

function clearDisplay(){
    fAmount.value = '';
    fCategory.value = '';
    fDescription.value='';
    return;
}

expenseDisplay();

