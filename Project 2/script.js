let bttn = document.querySelector('.modal-btn');
let modal = document.querySelector('.modal-back');
let x = document.querySelector('.close-btn');

bttn.addEventListener('click',function(){
    modal.style.display= 'block';

});
x.addEventListener('click',function(){
    modal.style.display= 'none';
});

/*if clicking on window trigger Event Propogation &target element of that propogation 
is modal-background then revert the display property*/
window.addEventListener('click',function(e){
    if(e.target == modal){
        modal.style.display= 'none';
        console.log('aha')
    }
});