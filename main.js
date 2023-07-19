const closed = document.querySelector("#id-1");
const close = document.querySelector("#id-3");
const country = document.querySelector("#id-2");
const mt = document.querySelector('#mt');
let isRunning = false;

close.addEventListener('click', function() {
    closed.remove();
    mt.style.marginTop = '0px';
}, true);

country.addEventListener('click', function() {
    closed.remove();
    mt.style.marginTop = '0px';
}, true);

// Slide show
const play = document.querySelector('#play');
const slides = document.querySelector('#slds');
const clck = document.querySelector('#clck');
const clcks = Array.from(clck.querySelectorAll('button'));
const pointer = Array.from(clck.querySelectorAll('button'));
const clck2 = clcks.splice(6);
const clck1 = clcks.splice(0, 5);



//MECHANISM 1 BEGIN -------------------------------
let i = 5;
pointer[i].style.backgroundColor = '#58595A';
function mechanism1 () {
  pointer[i].style.backgroundColor = '#949494';
  if (i === 10 ) {
    i = -1;
  }
  i++;
  isRunning = true;
  pointer[i].style.backgroundColor = '#58595A';
  let rm = null;
  rm = slides.firstElementChild.cloneNode(true);
  rm.width = 0;
  slides.appendChild(rm);
  let left = setInterval(function () {
    if (slides.firstElementChild.width === 0) {
      slides.firstElementChild.remove();
      clearInterval(left);
    } else {
      for (let i = 0; i <= 102; i++) {
        slides.firstElementChild.width -= 1;
        slides.lastElementChild.width += 1;
      }
    }
  }, 0);
}
//MECHANISM 1 ENDS ---------------------------------

function skip(element) {
  let sld_center = slides.querySelectorAll('img');

  let sld_cnt = 0;
  if (sld_center[5].id.length === 5) {
    sld_cnt = parseInt(sld_center[5].id.slice(-2));
  } else {
    sld_cnt = parseInt(sld_center[5].id.slice(-1));
  }

  let num = 0;
  if (element.id.length === 5) {
    num = parseInt(element.id.slice(-2));
  } else {
    num = parseInt(element.id.slice(-1));
  }
  return [sld_cnt, num];
}

function slideShow() {
  let mvt = setInterval(function () {
    mechanism1();
  }, 5000);
  
  clck2.forEach(element => {
    element.addEventListener('click', function () {
      isRunning = false;
      clearInterval(mvt);
      pointer[i].style.backgroundColor = '#949494';
      element.style.backgroundColor = '#58595A';
      
      let nom = skip(element);
      let sld_cnt = nom[0];
      let num = nom[1];

      let rm = null;
      let rt = setInterval(() => {
        if (sld_cnt >= 10) {
          sld_cnt = 0;
        }
        sld_cnt++;
        rm = slides.firstElementChild;
        slides.firstElementChild.remove();
        slides.appendChild(rm);
        if (sld_cnt === num) {
          clearInterval(rt);
        }
      }, 100);
      play.setAttribute('src', './images/play.png');
    });
  });

  clck1.forEach(element => {
    element.addEventListener('click', function () {
      isRunning = false;
      clearInterval(mvt);
      element.style.backgroundColor = '#2A2A2B';
      
      let nom = skip(element);
      let sld_cnt = nom[0];
      let num = nom[1];

      let rm = null;
      let lt = setInterval(() => {
        if (sld_cnt <= 0) {
          sld_cnt = 10;
        }
        sld_cnt--;
        rm = slides.lastElementChild;
        slides.lastElementChild.remove();
        slides.insertAdjacentElement('afterbegin', rm);
        if (sld_cnt === num) {
          clearInterval(lt);
        }
      }, 100);
      play.setAttribute('src', './images/play.png');
    });
  });
}

slideShow();

play.addEventListener('click', function () {
  if (!isRunning) {
    play.setAttribute('src', './images/pause.png');
    slideShow();
  }
});