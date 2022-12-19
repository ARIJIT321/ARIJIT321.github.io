let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");
menu.onclick = () =>{
    navbar.classList.toggle("open-menu");
    menu.classList.toggle("move");
}
window.onscroll = () => {
    navbar.classList.remove("open-menu");
    menu.classList.remove("move");
}


document.querySelector('.btn').onclick = function(){
    let redirectWindow = window.open('https://drive.google.com/file/d/1C-xbWdSqu-T6EKS3FVgs7_7FcTr-q9VX/view','_blank');
    redirectWindow.location;
}

document.querySelector('.resume').onclick = function(){
    let redirectWindow = window.open('https://drive.google.com/file/d/1C-xbWdSqu-T6EKS3FVgs7_7FcTr-q9VX/view','_blank');
    redirectWindow.location;
}

// header color change

// let header = document.querySelector('header')
// window.addEventListener('scroll',()=>{
//     header.classList.toggle('header-active',window.scroll < 0)
// })
