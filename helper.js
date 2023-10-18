//Gönderilen verileri local'e kaydetme
export const setStorage = (data) => {
  //Gelen veriyi string'e çevirme
  const strData = JSON.stringify(data);
  //LocalStorage'a kaydetme
  localStorage.setItem("NOTES", strData);
};
//Value'lara karşılık gelen içerikler için
export const translate = {
  goto: "Ziyaret",
  home: "Ev",
  job: "İş",
  park: "Park Yeri",
};

//Lokal'den eleman alır ve geri döndürür
export const getStorage = (key) => {
  //Lokalden veriyi alma
  const strData = localStorage.getItem(key);
  //Veriyi JS objesine çevirme
  return JSON.parse(strData);
};
export var userIcon = L.icon({
  iconUrl: "/img/Person.png",
  iconSize: [40, 40],
  popupAnchor:[0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

var homeIcon = L.icon({
  iconUrl: "/img/Home_4.png",
  iconSize: [40, 40],
  popupAnchor:[0, -20],
  popupAnchor:[0, -20],
  
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

var jobIcon = L.icon({
  iconUrl: "/img/Building_2.png",
  iconSize: [40, 40],
  popupAnchor:[0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

var gotoIcon = L.icon({
  iconUrl: "/img/Aeroplane_1.png",
  iconSize: [40, 40],
  popupAnchor:[0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

var parkIcon = L.icon({
  iconUrl: "/img/Parking_2.png",
  iconSize: [40, 40],
  popupAnchor:[0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});
//Value'lara karşılık gelen içerikler için
export const icons = {
    goto: gotoIcon,
    home: homeIcon,
    job: jobIcon,
    park: parkIcon,
  };
