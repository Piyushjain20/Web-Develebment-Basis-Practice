let questionBtn = document.querySelectorAll('.question-container');
// let ansAll = document.querySelectorAll('.ans-container');

questionBtn.forEach((e) => {
    e.addEventListener('click',function(){
        e.classList.toggle('expand');
        let parentBlock = e.parentNode;
        let ansBlock = parentBlock.querySelector('.ans-container');
        ansBlock.classList.toggle('expand');
        let plus =  parentBlock.querySelector('i');
        toggleSign(plus);
        
    });
});

let toggleSign = function(plus){
    if(plus.classList.contains('fa-plus')){
        plus.className="fa-solid fa-minus";
    }
    else if(plus.classList.contains('fa-minus')){
        plus.className="fa-solid fa-plus";
    }
}