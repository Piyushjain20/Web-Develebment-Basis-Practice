// let checkBtn = document.querySelectorAll('.fa-circle-check');
// let deleteBtn = document.querySelectorAll('.fa-trash');
// checkBtn.forEach((e) => {
//     e.addEventListener('click',function(){
//         let span = e.previousElementSibling;
//         span.classList.toggle('checked');
//     });
// });
// deleteBtn.forEach((e) => {
//     e.addEventListener('click',function(){
//         let task = e.parentElement;
//         console.log(task);
//         task.parentElement.removeChild(task);
//     });
// });
// let taskString ='';
// document.addEventListener('input',function(e){
//     taskString = taskString.concat(e.target.value);
//     console.log(taskString);
// });

let inputEle = document.querySelector('input');


let addBtn = document.querySelector('button');
addBtn.addEventListener('click',function(occuredEvent){
    // occuredEvent.preventDefault();
    addTask(inputEle.value);
    let checkBtn = document.querySelectorAll('.fa-circle-check');
    let deleteBtn = document.querySelectorAll('.fa-trash');
    checkBtn.forEach((e) => {
        e.addEventListener('click',function(){
            let span = e.previousElementSibling;
            span.classList.toggle('checked');
        });
    });
    deleteBtn.forEach((e) => {
        e.addEventListener('click',function(){
            let task = e.parentElement;
            console.log(task);
            task.parentElement.removeChild(task);
        });
    });
    // taskString='';

})
function addTask(str){
    let newTask = document.createElement('div');
    newTask.className='task';
    newTask.innerHTML='<span>'+str+'</span><i class="fa-solid fa-circle-check icon"></i><i class="fa-solid fa-trash"></i>';
    document.querySelector('.new-task').appendChild(newTask);
}