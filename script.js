// script.js (ご提示のファイルと同じ)
const main = document.getElementById("main");
const foot_banner = document.querySelector('.js-foot-banner');

function scrollAdd() {
    const scrollY = window.scrollY;

    if (scrollY > 200) {
        foot_banner.classList.add("active");
    } else {
        foot_banner.classList.remove("active");
    }
}

// スクロール時
window.addEventListener('scroll', scrollAdd);

// DOM構築完了時
window.addEventListener('DOMContentLoaded', scrollAdd);

// 完全読み込み後
window.addEventListener('load', () => {
    main.classList.add("active");
    scrollAdd();
});

// ★ 念のため即時実行
scrollAdd();

// ========================================
// Modal Window Functionality
// ========================================

const modal = document.getElementById('entryModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Open modal
function openModal() {
    modal.style.display = 'flex';
    // Trigger reflow to enable transition
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 300); // Match transition duration
}

// Event listeners
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

//スクロール時フェードイン
const boxes = document.querySelectorAll('.js-fadein');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-active');
    }
  });
});

boxes.forEach(box => {
  observer.observe(box);
});

//タブ切り替え
// 対象要素の取得
let tabsH = document.getElementById('js-tab').getElementsByClassName('js-tab-elem');
let pagesH = document.getElementById('js-tab-body').getElementsByClassName('js-tab-body-elem');

function changeTabH() {
    let targetIdH = this.dataset.tabid;

    for (let i = 0; i < pagesH.length; i++) {
        if (pagesH[i].id != targetIdH) {
            pagesH[i].style.display = "none";
        } else {
            pagesH[i].style.display = "block";
        }
    }

    for (let i = 0; i < tabsH.length; i++) {
        tabsH[i].classList.remove('active');
    }
    this.classList.add('active');
}

for (let i = 0; i < tabsH.length; i++) {
    tabsH[i].onclick = changeTabH;
}

tabsH[0].onclick();

//カウントアニメーション
function animateCount(element) {
    const target = parseInt(element.getAttribute('data-count'));
    let current = 0;
    const duration = 1000;
    const startTime = performance.now();

    function update() {
        const now = performance.now();
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        current = Math.floor(progress * target);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    const countElements = document.querySelectorAll('span[data-count]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 1.0
    });

    countElements.forEach(element => {
        observer.observe(element);
    });
});

//scrolltop
//要素を取得
const button = document.querySelector('.js-backtotop');

//クリックイベント
button.addEventListener('click', () => {
  //ページ上部へスムーススクロール
  window.scroll({ 
    top: 0, 
    behavior: "smooth"
  });
});

//スクロールイベント
window.addEventListener('scroll', () => {
  //スクロール量を判定して要素にクラスを付与
  if(window.scrollY > 100){
    button.classList.add('is-active');
  }else{
    button.classList.remove('is-active');
  }
});