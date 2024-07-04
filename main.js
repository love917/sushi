//메뉴바 스크롤 내리면 고정
let scrollHeader = ()=>{
    let header = document.querySelector("#header");
    //console.log(scrollY)
    //console.log(pageYOffset) --> 옛날방식 🍏

    //scrollY : 스크롤을 내리면 얼마나 내렸는지 값을 알려줌
    //삼항 : 조건문?참일때 실행문 : 거짓일때 실행문;
    pageYOffset >= 50? //scrollY를 50이상 내렸을 때 ~
    header.classList.add("bg-header")://참이면, header에게 bg-header라는 클래스를 붙여줌
    header.classList.remove("bg-header")//거짓이면,bg-header라는 클래스를 지워줌
}
window.addEventListener("scroll",scrollHeader)
//let , const - 최신문법. 중괄호 안에서만 있을 수 있다. 

//배경테마변경
let themeButton = document.querySelector("#change-theme");
let iconTheme = "ri-sun-line"; //ri-apps-line
let darkTheme = "dark-theme"
let getCurrentTheme = ()=>{
    //classList.contains(클래스명) --> 클래스명을 가지고 있는가(true/false)
    let result = document.body.classList.contains(darkTheme)?"dark":"light";
    return result;
}

let getCurrentIcon = ()=>{
    let result = themeButton.classList.contains(iconTheme)?"ri-apps-line":"ri-moon-line"
    return result;
}
//✨웹스토어에 값 셋팅:
//localStorage.setItem(key:value) ==> 웹스토어에 값을 입력
//localStorage.getItem(key:value) ==> 웹스토어에 값을 가져올 때

themeButton.addEventListener("click",()=>{
    //toggle키 --> 실행과 반실행(ex- alt키)
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem("selected-theme",getCurrentTheme())
    localStorage.setItem("selected-icon",getCurrentIcon())
})

let selectedTheme = localStorage.getItem("selected-theme")
let selectedIcon = localStorage.getItem("selected-icon")
console.log(selectedTheme)

//dark모드로 화면을 종료했을때, 다음날 이 사이트를 키면 계속 dark모드로 유지되도록함
if(selectedTheme){
    if(selectedTheme == "dark"){
        document.body.classList.add(darkTheme); 
    }else{
        document.body.classList.remove(darkTheme);
    }

    if(selectedIcon == "ri-moon-line"){
        themeButton.classList.add(iconTheme);
    }else{
        themeButton.classList.remove(iconTheme);
    }
}

////////////////////////////////////

//모바일에서 menu부분
let navToggle = document.querySelector("#nav_toggle");
let navMenu = document.querySelector("#nav_menu");
let navClose = document.querySelector("#nav_close");

navToggle.addEventListener("click",function(){
    navMenu.classList.add("show-menu");
})
navClose.addEventListener("click",function(){
    navMenu.classList.remove("show-menu");
})

////////////////////////////////////

//scrollUp
let scrollUp = ()=>{
    //let scrollY = pageXOffset 🍏

    let scrollUp = document.querySelector("#scroll-up")
    scrollY >= 100?
    scrollUp.classList.add("show-scroll"):
    scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll",scrollUp)//호출


//전체화면 애니, 각 영역으로 이동, 메뉴
let scrollActive = (current)=>{
    let scrollYY = window.scrollY //window생략 가능
    let sections = document.querySelectorAll(".section[id]")
    //.querySelectorAll(".section[id]") --> section 태그 중 id 속성이 있는 것을 부름

    sections.forEach((current)=>{
        let sectionHeight = current.offsetHeight; //각 section의 높이값
        let sectionTop = current.offetTop - 80; //각 section의 전체문서에서의 top 위치
        //✨offset : 각자 자기의 영역의 top값을 말함 화면의 top값에서 해당 section top이 얼마나 떨어져 있는지를 구한다.
        //- 80 을 해준 이유 : 1 -> 2 section이 있을 때, 스크롤을 내리면 바로 2section으로 넘어 가는것이 아니라 1이 보이면서 2가 조금 올라왔을 때 2section으로 넘어가게 하도록 값을 조정함

        let sectionId = current.getAttribute("id")//id 속성값을 불러옴 
        console.log(sectionId)

        let sectionClass = document.querySelector(`.nav_menu a[href*="${sectionId}"]`)
        console.log(sectionClass)

        if(scrollYY>sectionTop && scrollYY <= sectionTop + sectionHeight){
            console.log("실행")
            sectionClass.classList.add('action-link')
        }else{
            sectionClass.classList.remove('action-link')
        }
        //해당 영역의 머리(top)가 닿이거나(&&), 
        
    })
    console.log(scrollY)
}
window.addEventListener("scroll",()=>{scrollActive();})//호출
scrollActive()

//영역별 애니메이션(scrollreveal-library)
ScrollReveal().reveal('.home_data, .home_img, .about_data, .about_img, .popular_card, .recently_data, .recently_img, .home_leaf-1, .recently_leaf-1, .home_leaf-2, .about_leaf, .recently_leaf-2,.footer_description,.footer_content,.footer_info', {
    distance: '60px',
    origin: 'top',
    opacity: 2500,
    delay:400,
    reset:true
});
ScrollReveal().reveal('.home_data', {
    origin: 'bottom',
});
ScrollReveal().reveal('.about_data, .recently_data, .home_leaf-1, .recently_leaf-1', {
    origin: 'left',
});
ScrollReveal().reveal('.about_img, .recently_img, .home_leaf-2, .about_leaf, .recently_leaf-2', {
    origin: 'right',
});
ScrollReveal().reveal('.popular_card, .footer_card img', {
    origin: 'top',
    interval: 400,
});