window.addEventListener("DOMContentLoaded", function(){
    "use strict";

    let tab = document.querySelectorAll(".info-header-tab");
    let info = document.querySelector(".info-header");
    let tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(num){
        for(let i = num; i< tabContent.length; i++){
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(num){
        if(tabContent[num].classList.contains("hide")){
            tabContent[num].classList.remove("hide");
            tabContent[num].classList.add("show");
        }
    }

    info.addEventListener("click", function(event){
        let target = event.target;
        for(let i = 0; i<tab.length;i++){
            if(target == tab[i]){
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    });

    // timer

    let deadline = "2019-08-07";

    function getTimeRemaining(endtime){
        let timeTimer = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((timeTimer/1000)%60);
        let minut = Math.floor((timeTimer/(1000*60))%60);
        let hours = Math.floor(timeTimer/(1000*60*60));

        if(seconds < 10) seconds = "0" + seconds;
        if(minut < 10) minut = "0" + minut;
        if(hours < 10) hours = "0" + hours;

        return {
            "endtime" : endtime,
            "seconds" : seconds,
            "minut" : minut,
            "hours" : hours
        }
    }

    function setClock(id, endtime){
        let timer = document.getElementById(id);
        let hours = timer.querySelector(".hours");
        let minut = timer.querySelector(".minutes");
        let seconds = timer.querySelector(".seconds");

        let timeInterval = setInterval(update, 1000);

        function update(){
            let time = getTimeRemaining(endtime);
            hours.textContent = time.hours;
            minut.textContent = time.minut;
            seconds.textContent = time.seconds;
            if(time.endtime <= 0 ) clearInterval(timeInterval);
        }
    }

    setClock("timer", deadline)
});