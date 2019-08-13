window.addEventListener("DOMContentLoaded", () => {
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

    info.addEventListener("click", (event) => {
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

    let deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);
    

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


    let moreBtn = document.querySelector(".more");
    let overlay = document.querySelector(".overlay");
    let popupClose = document.querySelector(".popup-close");

    let desckBtn = document.querySelectorAll(".description-btn");
    
    function openPopup(nameBtn){
        nameBtn.addEventListener("click", function(){
            overlay.style.display = "block";
            this.classList.add("more-splash");
        });
        popupClose.addEventListener("click", () => {
            overlay.style.display = "none";
            moreBtn.classList.remove("more-splash");
            
        });
    }

    openPopup(moreBtn);
    openPopup(desckBtn[0]);
    openPopup(desckBtn[1]);
    openPopup(desckBtn[2]);
    openPopup(desckBtn[3]);

    //form

    function formData(){
        let message = {
            loading : "Загрузка...",
            succes: "Спасибо! Скоро мы вам перезвоним!",
            failure: "Произошла ошибка..."
        }
    
        let formModal = document.querySelector(".main-form");
        let formMain = document.querySelector("#form");

        let input = document.getElementsByTagName("input");
        
        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
    
        function ajaxForm(form){
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                let formData = new FormData(form);

                function postData(){
                    return new Promise((resolve, reject)=>{
                        let request = new XMLHttpRequest();
                        request.open("POST", "server.php");
                        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                        request.onreadystatechange = () => {
                            if(request.readyState < 4){
                                resolve();
                            }
                            else if( request.readyState === 4 && request.statuts == 200){
                                resolve();
                            }
                            else{
                                reject();
                            }
                        }

                        request.send(formData);
                    })
                }               //end postData()
            
                function clearInput(){
                    for(let i = 0; i < input.length; i++){
                        input[i].value = "";
                    }
                }
                
                postData(formData)
                            .then(() => {
                                statusMessage.textContent = message.loading;
                            })
                            .then(() => {
                                statusMessage.textContent = message.succes;
                            })
                            .catch(() => {
                                statusMessage.textContent = message.failure;
                            })
                            .then(() => {
                                clearInput();
                            })
            });
        }
    
        ajaxForm(formModal);
        ajaxForm(formMain);
    
    }
   
    formData();


    // slider

    let slideIndex = 0;
    let slides = document.querySelectorAll(".slider-item");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let dotsWrap = document.querySelector(".slider-dots");
    let dots = document.querySelectorAll(".dot");

    showSlide(slideIndex);

    function showSlide(slideNum){
        
        if(slideNum > slides.length -1){
            slideIndex = 0;
        }
        if(slideIndex < 0){
            slideIndex = slides.length -1;
        }
        slides.forEach((item)=> item.style.display = "none");
        dots.forEach((item)=> item.classList.remove("dot-active"));

        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("dot-active");
    }
    
    function plusSlides(slideNum){
        showSlide(slideIndex += slideNum);
    }

    function currentSlide(slideNum){
        showSlide(slideIndex = slideNum);
    }

    let autoChangeSlide = setInterval(()=>{
        plusSlides(+1);
    }, 5000)

    function stopAutoChange(){
        if(autoChangeSlide == 2){
            clearInterval(autoChangeSlide);
        }
    }

    prev.addEventListener("click", ()=>{
        stopAutoChange();
        plusSlides(-1);
    });
    
    next.addEventListener("click", ()=>{
        stopAutoChange();
        plusSlides(1);
    });
    
    dotsWrap.addEventListener("click", (event)=> {
        for(let i = 0; i< dots.length; i++){
            if(event.target.classList.contains("dot") && event.target == dots[i]){
                currentSlide(i);
            }
        }
    });


});