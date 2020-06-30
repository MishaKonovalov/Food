window.addEventListener("DOMContentLoaded", () =>{
    //Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsParent = document.querySelector(".tabheader__items"),
          tabContent = document.querySelectorAll(".tabcontent");


   function hideTabsContent(){
       tabContent.forEach((item) => {
           item.classList.add("hide");
           item.classList.remove("show", "fade");
       });

       tabs.forEach((item) =>{
        item.classList.remove("tabheader__item_active");
    });
    }

    function showTabsContent(i = 0){
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener("click", (e) =>{
        const target = e.target;

        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i) => {
                if(item == target){
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = new Date(2020, 6, 28,);

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse( new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
         
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num){
        return(num < 10 && num >= 0) ? `0${num}` : num;
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <=0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //Modal 

    const btnModal = document.querySelectorAll("button[data-model]"),
          modalWindow = document.querySelector(".modal");

    function openModal(){
        modalWindow.classList.remove("hide");
        modalWindow.classList.add("show");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    btnModal.forEach(btn => {
        btn.addEventListener("click", openModal);
    });

    function closeModalWindow(){
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalWindow.addEventListener("click", (e) =>{
       if(e.target === modalWindow || e.target.getAttribute("data-close") == ""){
        closeModalWindow();
       }
   });

    document.addEventListener("keydown", (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains("show")){
            closeModalWindow();
        }
   });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    //Cards class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 70;
            this.changeToRUB(); 
        }

        changeToRUB() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> Руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
 

    // getResource("http://localhost:3000/menu")
    //     .then(data => createCard(data));

    // function createCard(data){
    //     data.forEach(({altimg, img, title, descr, price}) =>{
    //         const element = document.createElement("div");

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector(".menu .container").append(element)
    //     });
    //}
//FORMS
    const forms = document.querySelectorAll("form");

    const massage = {
        loading: "img/form/original.svg",
        success: "Спасибо, мы с вами свяжимся",
        failure: "Что-то пошло не так"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    async function getResource(url, data){
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`could not fetch ${url} status ${res.status}`);
        }

        return await res.json();
    }

    const postData = async (url, data) =>{
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData (form){ 
        form.addEventListener("submit", (e) =>{
            e.preventDefault();

            const statusMassage = document.createElement("img");
            statusMassage.src = massage.loading;
            statusMassage.style.cssText =`
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMassage);
            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(massage.success);
                statusMassage.remove();
            }).catch(data => {
                showThanksModal(massage.failure);
            }).finally(data => {
                form.reset();
            });

        });
    }

    function showThanksModal(massage){
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${massage}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModalWindow();
        }, 4000);
    }
    // Slider 

    const slides = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          current = document.querySelector("#current"),
          total = document.querySelector("#total"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesFiled = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width; 

    let slideIndex = 1;
    let offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesFiled.style.width = 100 * slides.length + "%";
    slidesFiled.style.display = "flex";
    slidesFiled.style.transition = "0.8s all";

    slidesWrapper.style.overflow = "hidden";


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];

    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        indicators.append(dot);
        dots.push(dot);
        if(i == 0){
            dot.style.opacity = 1;
        }
    }

    function activeSlide(arr){

        slidesFiled.style.transform = `translateX(-${offset}px)`;

        current.textContent = (slides.length < 10) ? `0${slideIndex}` : slideIndex;
        
        arr.forEach(dot => dot.style.opacity = '.5');
        arr[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str){
       return +str.replace(/\D/g, '');
    }

    next.addEventListener("click", () =>{
        if(offset == deleteNotDigits(width) * (slides.length -1)){
            offset = 0;
        }else{
            offset += deleteNotDigits(width);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        activeSlide(dots);
    });

    prev.addEventListener("click", () =>{
        if(offset == 0){
            offset = deleteNotDigits(width) * (slides.length - 1);
        }else{
            offset -= deleteNotDigits(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        activeSlide(dots);
        
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            
            activeSlide(dots);

        });
    });

    setInterval(() => {
        if(offset == deleteNotDigits(width) * (slides.length -1)){
            offset = 0;
        }else{
            offset += deleteNotDigits(width);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        activeSlide(dots);
    }, 4000);

});