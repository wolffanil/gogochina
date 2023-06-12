const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "100%",
    width: "100%",
    videoId: "Yr9LK4rwHM4",
  });
}

window.addEventListener('DOMContentLoaded', () => {

  const navContainer = document.querySelector('.menu__items');

  navContainer.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('menu__link')) {
      const id = e.target.getAttribute('href');

      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

  //////////

  const sections = document.querySelectorAll('section');

  function sectionFun(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }

  const setionObserver = new IntersectionObserver(sectionFun, {
    root: null,
    threshold: 0.15,
  });

  sections.forEach(function(sec)  {
    setionObserver.observe(sec);
    sec.classList.add('section--hidden');
  });

  /////////////////////////////

  const header = document.querySelector(".open");
  const nav = document.querySelector('.nav');
  const navHight = nav.getBoundingClientRect().height;


  function StickyNav(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      nav.classList.add("stick");
      header.style.zIndex = '10000';
    } else {
      nav.classList.remove("stick");
      header.style.zIndex = '-13';
    }

    
  }

  const headerObserver = new IntersectionObserver(StickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHight}px`,
  });

  headerObserver.observe(header);

  ///////////////////

  const hamburger = document.querySelector('.hamburger');
  // const hamburger = document.getElementsByClassName('hamburger');

  const menu = document.querySelector('.menu__items');
  const menuItem = document.querySelectorAll('.menu__item');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu__items_active');
  });

  menuItem.forEach(item => {
    item.addEventListener('click', () => {

      if(window.innerWidth > 767) return;

        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu__items_active');
    });
  });


  const btnTop = document.querySelector(".menu__logo");

  btnTop.addEventListener('click', () => {
    header.scrollIntoView({behavior: 'smooth'});
    menu.classList.remove('menu__items_active');
    hamburger.classList.remove('hamburger_active');
  });

  ///////////////////

  const down = document.querySelector('.down_more');
  const sec = document.querySelector('.block__shadow');
  const downSec = document.querySelector('.imagination__more_mob');
  const secImag = document.querySelector('.imagination');

  down.addEventListener('click', () => {
    sec.classList.remove('block-shadow_small');
    downSec.style.display = 'none';
    secImag.classList.add('imagination_active');
    
  });
  /////////////////////////////////


  const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd("characted", pos);
        range.moveStart("characted", pos);
        range.select();
      }
    };

    function createMusk(event) {
      let matrix = "+7 (___) ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach((input) => {
      input.addEventListener("input", createMusk);
      input.addEventListener("focus", createMusk);
      input.addEventListener("blur", createMusk);
    });
  };

  mask(".open__input-telefon");
  
});


///////////////////// form

const form = document.querySelector('form');
const btnEven = document.querySelector('.open__btn');
const inputs = document.querySelectorAll('input'),
      inputCheck = document.querySelector('input[type=checkbox]');


const message = {
  loading: 'Отправляется...',
  success: 'Отправлено',
  ok: 'Отправить'
};

const clearInputs = () => {
  inputs.forEach(item => {
      item.value = '';
  });
  inputCheck.checked = false;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  btnEven.textContent = message.loading;
  btnEven.classList.add('loading');

  setTimeout(() => {
    btnEven.textContent = message.success;
    btnEven.style.backgroundColor = '#08d116';
    btnEven.classList.remove('loading');

    clearInputs();
  }, 500);

  setTimeout(() => {
    btnEven.textContent = message.ok;
    btnEven.style.backgroundColor = '#1b7dff';
    
  }, 2000);

});
  
  

