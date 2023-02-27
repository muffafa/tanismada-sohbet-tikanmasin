let dilButonlari = document.querySelectorAll("#dilSecme button");

//sayfa dilini önbellekten çek yoksa türkçe başlat
let sayfaDili = localStorage.getItem("sayfaDili") || "tr";
console.log(sayfaDili);

//Dil seçme
function dilDegistir(secilenDil) {
  sayfaDili = secilenDil;
  localStorage.setItem("sayfaDili", sayfaDili);
  console.log(`${sayfaDili} secildi`);
}

dilButonlari.forEach((buton) => {
  buton.addEventListener("click", function () {
    dilDegistir(buton.id);
  });
});

