let btn = document.querySelectorAll('i');
let time = document.getElementById('time')
let intervalID ;
btn[0].addEventListener('click',() => {
    if(btn[0].classList.contains('fa-play')){
        btn[0].className="fa-solid fa-pause";
        intervalID = setInterval(startTime,1000);
    }
    else if(btn[0].classList.contains('fa-pause')){
        btn[0].className="fa-solid fa-play";
        clearInterval(intervalID);
    }
});
btn[1].addEventListener('click',() => {
    time.textContent='00:00:00';
    if(btn[0].classList.contains('fa-pause')){
        btn[0].className="fa-solid fa-play";
        clearInterval(intervalID);
    }
});
let startTime = function(){
    let totalSeconds = Number(time.innerText.substring(6))+ (60*Number(time.innerText.substring(3,5))) + (3600*Number(time.innerText.substring(0,2))) +1;
    let newTime = '';
    let temp = Math.floor(totalSeconds/3600);
    if(temp<10) newTime = newTime.concat('0'+temp+':');
    else newTime = newTime.concat(temp+':');
    console.log(temp);
    console.log(newTime);
    totalSeconds = totalSeconds%3600;
    temp = Math.floor(totalSeconds/60);
    if(temp<10) newTime = newTime.concat('0'+temp+':');
    else newTime = newTime.concat(temp+':');
    temp = totalSeconds%60;
    if(temp<10) newTime = newTime.concat('0'+temp);
    else newTime = newTime.concat(temp);
    time.innerText = newTime;
}
