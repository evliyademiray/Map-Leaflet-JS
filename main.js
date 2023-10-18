import {
  userIcon,
  setStorage,
  getStorage,
  translate,
  icons,
} from "./helper.js";
//!HTML'den gelenler
const form = document.querySelector("form");
const input = document.querySelector("form #title");
const cancelBtn = document.querySelector("form #cancel");
const noteList = document.querySelector("ul");
const expandBtn = document.querySelector("#checkbox");
const aside = document.querySelector(".wrapper");

//! Ortak değişkenler
var map;
var coords = [];
var notes = getStorage("NOTES") || [];
var markerLayer = [];

//!Olay izleyicileri
cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
  clearForm();
});
//Kullanıcının onumuna göre haritayı ekrana basma
function loadMap(coords) {
  //Haritanın kurulumunu yapar
  map = L.map("map").setView(coords, 10);

  //Haritanın nasıl gözükeceğini belirler
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  //İmleçleri tutacağımız ayrı bir katman oluşturma
  markerLayer = L.layerGroup().addTo(map);
  //Kullanıcının bulunduğu konumu gösterme
  L.marker(coords, { icon: userIcon }).addTo(map).bindPopup("Konumunuz");
  //Lokalden gelen notları ekrana basma
  renderNoteList(notes);
  //Haritadaki tıklanma olaylarını izler
  map.on("click", onMapClick);
}
//Formun gönderilmesini izleme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Formun içindeki değerlere erişme
  const title = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  //Notlar dizisine elemanı ekle
  notes.unshift({ id: new Date().getTime(), title, date, status, coords });
  //Note'ları listele
  renderNoteList(notes);
  //Gönderilen elemanları lokal'e kaydetme
  setStorage(notes);
  //Formu kapatma
  form.style.display = "none";
  clearForm();
});
//İmleci ekrana basar
function renderMarker(item) {
  //İmleç oluşturur
  L.marker(item.coords, { icon: icons[item.status] })
    //İmleci katmana ekler
    .addTo(markerLayer)
    //İmleçe popup ekleme
    .bindPopup(item.title);
  //Popup açma
  // .openPopup(map);
}
//Note listesini ekrana basar
function renderNoteList(items) {
  //Eski elemanları temizleme
  noteList.innerHTML = "";
  //Eski imleçleri temizleme
  markerLayer.clearLayers();
  //Her bir eleman için fonksiyon çalıştırır
  items.forEach((ele) => {
    //li elemanı oluştur
    const listEle = document.createElement("li");
    //data-id ekleme
    listEle.dataset.id = ele.id;
    //İçeriği belirleme
    listEle.innerHTML = `
                    <div>
                        <p>${ele.title}</p>
                        <p><span>Tarih:</span>${ele.date}</p>
                        <p><span>Durum:</span>${translate[ele.status]}</p>
                    </div>
                    <i id="fly" class="bi bi-airplane"></i>
                    <i id="delete" class="bi bi-trash3"></i>
    `;
    //HTML'deki listeye gönderme
    noteList.appendChild(listEle);
    //Ekrana imleç basma
    renderMarker(ele);
  });
}
//Kullanıcının konumuna erişme
navigator.geolocation.getCurrentPosition(
  //Kullanıcı izin verirse haritayı
  //onun bulunduğu konumdan açma
  (e) => loadMap([e.coords.latitude, e.coords.longitude]),
  //İzin vermezse varsayılan konumda açılır.
  () => {
    loadMap([38.802424, 35.505317]);
  }
);
//Haritaya tıklanınca çalışan fonksiyon
const onMapClick = (e) => {
  //Koordinatları ortak alana aktar.
  coords = [e.latlng.lat, e.latlng.lng];
  //Form gösterme
  form.style.display = "flex";
  //İnputa focuslama
  input.focus();
};

//Formu temizleme
function clearForm() {
  form[0].value = "";
  form[1].value = "";
  form[2].value = "goto";
}
//!Silme ve uçuş
noteList.addEventListener("click", (e) => {
  const found_id = e.target.closest("li").dataset.id;

  if (e.target.id === "delete" && confirm("Silmek istediğinize emin misiniz")) {
    //id'sini bildiğimiz elemanı diziden çıkarma
    notes = notes.filter((note) => note.id !== Number(found_id));
    //Lokali güncelle
    setStorage(notes);
    //Ekranı Güncelle
    renderNoteList(notes);
  }
  if (e.target.id === "fly") {
    //id'sini bildiğimiz elemanın koordinatlarına erişme
    const note = notes.find((note) => note.id === Number(found_id));
    //animasyonu çalıştır
    map.flyTo(note.coords, 15);
    //Geçici bir popup tanımlama
    var popup = L.popup().setLatLng(note.coords).setContent(note.title);
    //Küçük ekranlarda uçurulduğunda menüyü kapar
    if(window.innerWidth<769){
      checkbox.checked= false;
    aside.classList.add('hide');
    }
    //popup'açma
    // popup.OpenOn(map);
  }
});
//!Gizle ve Göster alanı
checkbox.addEventListener("input", (e) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    aside.classList.remove("hide");
  } else {
    aside.classList.add("hide");
  }
});
