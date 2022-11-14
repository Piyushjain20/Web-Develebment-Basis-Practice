// let taskString ='';
// document.addEventListener('input',function(e){
//     taskString = taskString.concat(e.target.value);
//     console.log(taskString);
// });

let inputEle = document.querySelector('input');
let addBtn = document.querySelector('button');
addBtn.addEventListener('click',function(occuredEvent){
    // occuredEvent.preventDefault(); Can be used for stoping event propogation 
    // example : when stoping the functionality of form submit in conjection with synthetic events.
    let newTask = document.createElement('div');
    newTask.className='task';
    newTask.innerHTML='<span>'+inputEle.value+'</span>';
    let checkBtn = document.createElement('i');
    checkBtn.className='fa-solid fa-circle-check icon';
    checkBtn.addEventListener('click',function(){
        let span = checkBtn.previousElementSibling;
        span.classList.toggle('checked');
    });
    let deleteBtn = document.createElement('i');
    deleteBtn.className="fa-solid fa-trash";
    deleteBtn.addEventListener('click',function(){
        let task = deleteBtn.parentElement;
        task.parentElement.removeChild(task);
    });
    newTask.appendChild(checkBtn);
    newTask.appendChild(deleteBtn);
    document.querySelector('.new-task').appendChild(newTask);

})
function addTask(str){
    let newTask = document.createElement('div');
    newTask.className='task';
    newTask.innerHTML='<span>'+str+'</span><i class="fa-solid fa-circle-check icon"></i><i class="fa-solid fa-trash"></i>';
    document.querySelector('.new-task').appendChild(newTask);
}