let dilButonlari = document.querySelectorAll("#dilSecme button");

//sayfa dilini önbellekten çek yoksa türkçe başlat
let sayfaDili = localStorage.getItem("sayfaDili") || "tr";
let sayafadakiVeriler;
console.log(sayfaDili);

if(sayfaDili  !== "tr"){
    dilVerileriniCekVeGuncelle();
}

//Dil seçme
function dilDegistir(secilenDil) {
  sayfaDili = secilenDil;
  localStorage.setItem("sayfaDili", sayfaDili);
  console.log(`${sayfaDili} secildi`);
  dilVerileriniCekVeGuncelle();
}

//tüm tuşlara dili güncelle butonu ekle
dilButonlari.forEach((buton) => {
  buton.addEventListener("click", function () {
    dilDegistir(buton.id);
  });
});

function dilVerileriniCekVeGuncelle(){
    fetch(`../json/translations/${sayfaDili}.json`)
      .then((response) => response.json())
      .then((data) => {
        sayafadakiVeriler = data;
        metinIceriginiGuncelle();
    });
}

function metinIceriginiGuncelle() {
    document.title = sayafadakiVeriler.pageTitle;
    document.querySelector("#banner p").innerHTML = `<strong class="font-semibold">${sayafadakiVeriler.bannerHeader}</strong
    ><svg
      viewBox="0 0 2 2"
      class="mx-2 inline h-0.5 w-0.5 fill-current"
      aria-hidden="true"
    >
      <circle cx="1" cy="1" r="1" /></svg
    >${sayafadakiVeriler.bannerContent}`
    document.querySelector("#banner a").innerHTML = sayafadakiVeriler.bannerRedirect + ` <span aria-hidden="true">&rarr;</span>`;

    document.querySelector("#sorularBitti h1").textContent = sayafadakiVeriler.questionsEnd;
    const genelAlanBasliklar = document.querySelectorAll("#genelAlan h1");
    genelAlanBasliklar[0].textContent = sayafadakiVeriler.appDiscription;
    document.querySelector("#oncekiSoru").innerHTML = sayafadakiVeriler.prevQuestion + `<i class="ri-arrow-go-back-line"></i>`;
    document.querySelector("#soruUret").innerHTML = sayafadakiVeriler.nextQuestion + `<i class="ri-refresh-line">`;
    document.querySelector("#whatsAppGonder").innerHTML = sayafadakiVeriler.sendFromWhatsapp + `<i class="bi bi-whatsapp"></i>`;
    genelAlanBasliklar[1].textContent = sayafadakiVeriler.contributers;
}
