function slider({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}){
    // Slider 

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          prev = document.querySelector(prewArrow),
          next = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesFiled = document.querySelector(field),
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
}

export default slider;