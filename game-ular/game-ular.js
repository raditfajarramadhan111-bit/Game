let mainMap = document.querySelector('.main-map');

for (let kordinatY = 1; kordinatY <= 8; kordinatY++) {
    const barisX = function () {
    for (let kordinatX = 1; kordinatX <= 8; kordinatX++) {
      if (kordinatY % 2 === 0) {
         if (kordinatX % 2 === 0) {
            mainMap.innerHTML += `<div class="kotak 
             kotak-hijau-tua
            kor-${[kordinatY]}-${[kordinatX]}"></div>`;
         } else {
            mainMap.innerHTML += `<div class="kotak 
            kotak-hijau-muda
            kor-${[kordinatY]}-${[kordinatX]}"></div>`
         }
      } else {
         if (kordinatX % 2 === 0) {
            mainMap.innerHTML += `<div class="kotak 
            kotak-hijau-muda
            kor-${[kordinatY]}-${[kordinatX]}"></div>`;
         } else {
            mainMap.innerHTML += `<div class="kotak 
            kotak-hijau-tua
            kor-${[kordinatY]}-${[kordinatX]}"></div>`
         }
      }
    }};
   barisX();
}

// ------------- DATA UTAMA -------------

let ular = [
   { y: 2, x: 3, a: 'kanan'},
   { y: 2, x: 2, a: 'kanan'},
];

let makanan = { y: 4, x: 5 };
let skor = 0;
let skorTertinggi = parseInt(localStorage.getItem('skorTertinggi')) || 0;

let ekor = ular[ular.length - 1];
let arah = 'kanan';

let isGameRunning = false;

/* let gameInterval = setInterval(() => {
      updateUlarJalan(arah);
   }, 1000);

gameInterval = false; */

munculkanMakanan();
updateSkor();

// ------------- EVENT HANDLER -------------

/* document.querySelector(".button-move-up").addEventListener('click', () => {
   if (arah === 'bawah') {
      arah = 'bawah';
   } else {
      arah = 'atas';
   }
   updateUlarJalan(arah);
});
document.querySelector(".button-move-right").addEventListener('click', () => {
   if (arah === 'kiri') {
      arah = 'kiri';
   } else {
      arah = 'kanan';
   }
   updateUlarJalan(arah);
});
document.querySelector(".button-move-down").addEventListener('click', () => {
   if (arah === 'atas') {
      arah = 'atas';
   } else {
      arah = 'bawah';
   }
   updateUlarJalan(arah);
});
document.querySelector(".button-move-left").addEventListener('click', () => {
   if (arah === 'kanan') {
      arah = 'kanan';
   } else {
      arah = 'kiri';
   }
   updateUlarJalan(arah);
});
*/
// ------------- FUNGSI UTAMA -------------

function resetGame () {
   ular = [
   { y: 2, x: 3, a: 'kanan'},
   { y: 2, x: 2, a: 'kanan'},
   ];
   makanan = { y: 4, x: 5 };
   ekor = ular[ular.length - 1];
   arah = 'kanan';
}

function updateUlarJalan(arah) {
   let kepala = ular[0];
   let kepalaBaru;

   if (arah === 'atas') {
      kepalaBaru = { y: kepala.y - 1, x: kepala.x, a: 'atas'};
   } else if (arah === 'kanan') {
      kepalaBaru = { y: kepala.y, x: kepala.x + 1, a: 'kanan'};
   } else if (arah === 'bawah') {
      kepalaBaru = { y: kepala.y + 1, x: kepala.x, a: 'bawah'};
   } else if (arah === 'kiri') {
      kepalaBaru = { y: kepala.y, x: kepala.x - 1, a: 'kiri'};
   }

   if (kepalaBaru.x > 8) kepalaBaru.x = 1;
   if (kepalaBaru.x < 1) kepalaBaru.x = 8;

   if (kepalaBaru.y > 8) kepalaBaru.y = 1;
   if (kepalaBaru.y < 1) kepalaBaru.y = 8;

   let tabrak = false;

   for (let i = 0; i < ular.length; i++) {
      if (kepalaBaru.x === ular[i].x && kepalaBaru.y === ular[i].y) {
         tabrak = true;
         break;
      }
   }

   if (tabrak) {
      clearInterval(gameInterval);
      let control = document.querySelector('.control-view');

      renderHasil();
      control.innerHTML = `
      ${hasil}
      `;
   }

   ular.unshift(kepalaBaru);

   if (kepalaBaru.x === makanan.x && kepalaBaru.y === makanan.y) {
      munculkanMakanan();

   } else {
      ular.pop();
   }

   renderUlar();
}

function playGame () {
   let control = document.querySelector('.control-view');
   control.innerHTML = `
      <div class="control-button-ball">
         <button class="control-button button-move-up">&uarr;</button>
         <button class="control-button button-move-right">&rarr;</button>
         <button class="control-button button-move-down">&darr;</button>
         <button class="control-button button-move-left">&larr;</button>
      </div>
   `;

   document.querySelector(".button-move-up").addEventListener('click', () => {
      if (arah === 'bawah') {
         arah = 'bawah';
      } else {
         arah = 'atas';
      }
      updateUlarJalan(arah);
   });
   document.querySelector(".button-move-right").addEventListener('click', () => {
      if (arah === 'kiri') {
         arah = 'kiri';
      } else {
         arah = 'kanan';
      }
      updateUlarJalan(arah);
   });
   document.querySelector(".button-move-down").addEventListener('click', () => {
      if (arah === 'atas') {
         arah = 'atas';
      } else {
         arah = 'bawah';
      }
      updateUlarJalan(arah);
   });
   document.querySelector(".button-move-left").addEventListener('click', () => {
      if (arah === 'kanan') {
         arah = 'kanan';
      } else {
         arah = 'kiri';
      }
      updateUlarJalan(arah);
   });

   document.body.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'w') {
         if (arah !== 'bawah') {
            arah = 'atas';
            updateUlarJalan(arah);
         }
      } else if (event.key === 'ArrowRight' || event.key === 'd') {
         if (arah !== 'kiri') {
            arah = 'kanan';
            updateUlarJalan(arah);
         }
      } else if (event.key === 'ArrowDown' || event.key === 's') {
         if (arah !== 'atas') {
            arah = 'bawah';
            updateUlarJalan(arah);
         }
      } else if (event.key === 'ArrowLeft' || event.key === 'a') {
         if (arah !== 'kanan') {
            arah = 'kiri';
            updateUlarJalan(arah);
         }
      }
   });
   gameInterval = setInterval(() => {
       updateUlarJalan(arah);
       updateSkor();
    }, 1000);
   isGameRunning = true;
}

function renderUlar() {
   document.querySelectorAll('.kotak').forEach(kotak => {
      kotak.innerHTML = '';
   });

   ular.forEach((bagian, index) => {
      let el = document.querySelector(`.kor-${bagian.y}-${bagian.x}`);

      if (!el) return;
      el.innerHTML

      if (index === 0 ) {
      }

      for (let index = 0; index < ular.length; index++) {
         let bagian = ular[index];
         
         if (index === ular.length - 1 && ular.length > 1) {
            // EKOR: ambil arah dari posisi relative ke badan depannya
            let depan = ular[index - 1];

            if (depan.x === 8 && bagian.x === 1) {
               arahSebenarnya = 'kiri';
            } else if (depan.x === 1 && bagian.x === 8) {
               arahSebenarnya = 'kanan';
            } else if (depan.y === 8 && bagian.y === 1) {
               arahSebenarnya = 'atas';
            } else if (depan.y === 1 && bagian.y === 8) {
               arahSebenarnya = 'bawah';
            } else if (depan.y < bagian.y) {
               arahSebenarnya = 'atas';
            } else if (depan.y > bagian.y) {
               arahSebenarnya = 'bawah';
            } else if (depan.x < bagian.x) {
               arahSebenarnya = 'kiri';
            } else if (depan.x > bagian.x) {
               arahSebenarnya = 'kanan';
            } 

            
            bagian.a = arahSebenarnya;  // 'atas', 'bawah', 'kanan', 'kiri'
         
         } else if (index > 0 && index < (ular.length - 1)) {
            let depan = ular[index - 1];
            let sekarang = bagian;
            
            if ((depan.a === 'atas' && sekarang.a === 'kanan') || 
            (depan.a === 'kiri' && sekarang.a === 'bawah')) {
               bagian.a = 'sudut-kanan-atas';
            
            } else if ((depan.a === 'bawah' && sekarang.a === 'kanan') ||
            (depan.a === 'kiri' && sekarang.a === 'atas')) {
               bagian.a = 'sudut-kanan-bawah';
            
            } else if ((depan.a === 'bawah' && sekarang.a === 'kiri') ||
            (depan.a === 'kanan' && sekarang.a === 'atas')) {
               bagian.a = 'sudut-kiri-bawah';
            
            } else if ((depan.a === 'atas' && sekarang.a === 'kiri') ||
            (depan.a === 'kanan' && sekarang.a === 'bawah')) {
               bagian.a = 'sudut-kiri-atas';
            }
         }
      }
      
      if (index === 0) {
         el.innerHTML = `
         <img src="./image/game-kepala-ular.png" 
         alt="kepala ular" 
         width="50px" 
         height="50px"
         class="kepala-ular">`;
      } else if (index === ular.length - 1) {
         el.innerHTML = `
         <img src="./image/game-ekor-ular.png" 
         alt="ekor ular" 
         width="50px" 
         height="50px"
         class="ekor-ular">`;
      } else {
         if (bagian.a.includes('sudut')) {
            el.innerHTML = `
            <img src="./image/game-sudut-badan-ular.png" 
            alt="badan ular" 
            width="50px" 
            height="50px"
            class="${bagian.a}">`;
         } else {
            el.innerHTML = `
            <img src="./image/game-badan-ular.png" 
            alt="badan ular" 
            width="50px" 
            height="50px"
            class="badan-ular">`;
         }
      } 
      
      let img = el.querySelector('img');

      img.classList.add(bagian.a);
   });

   let elMakanan = document.querySelector(`.kor-${makanan.y}-${makanan.x}`);

   elMakanan.innerHTML = `<div class="makanan-ular"></div>`;
};

function munculkanMakanan () {
   let valid = false;

   while (!valid) {
      let korY = Math.floor(Math.random() * 8) + 1;
      let korX = Math.floor(Math.random() * 8) + 1;

      let kenaUlar = ular.some(bagian =>
      bagian.y === korY && bagian.x === korX
      );

      if (!kenaUlar) {
         valid = true;
         makanan = { y: korY, x: korX};
      }
   }
}

function updateSkor() {
   skor = (ular.length - 2) * 10;
   document.querySelector('.skor').innerText = `Skor: ${skor} | Highscore: ${skorTertinggi}`;
}

function updateHighScore() {
   if (skor > skorTertinggi) {
      skorTertinggi = skor;
      localStorage.setItem('skorTertinggi', skorTertinggi);
   }
}

function renderHasil() {
   updateHighScore();

   hasil = `
   <div class="hasil">
   <p>Game Over</p>
   <p>Skor Anda: ${skor}</p>
   <p>Skor Tertinggi: ${skorTertinggi}</p>
   <button onclick="playGame(); resetGame();" class="play-button">Main Lagi</button>
   </div>
   `;
   return hasil;
}