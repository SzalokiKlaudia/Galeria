const kepek = [
    {
      id: 0,
      url: "kep1.jpg",
      felirat: "felirat_1",
    },
    {
      id: 1,
      url: "kep2.jpg",
      felirat: "felirat_2",
    },
    {
      id: 2,
      url: "kep3.jpg",
      felirat: "felirat_3",
    },
    {
      id: 3,
      url: "kep4.jpg",
      felirat: "felirat_4",
    },
    {
      id: 4,
      url: "kep5.jpg",
      felirat: "felirat_5",
    },
    {
      id: 5,
      url: "kep6.jpg",
      felirat: "felirat_6",
    },
  ];

  const tombHossza = kepek.length
  let megjelenitendoKepIndex = 0
  let megjelenitendoKep = kepek[megjelenitendoKepIndex] 
  let active = false


  document.addEventListener('DOMContentLoaded',(event) => {
    letrehozKepek()
    
})

function letrehozKepek() { //létrehozzuk a kisképeket js-el és feltöltjük a html-be,a képeknek classt adunk

    const kepekBox = document.querySelector('#kiskepek')


    kepek.forEach(elem => { //végigmegyünk a tömb elemein,ami szerint kisképeket hozunk létre
        
        const kep = document.createElement('img') 
        const {id,url,felirat} = elem
        kep.id = id
        kep.src = "images/" + url 
        kep.alt = felirat
        kep.classList.add("kiskep")
        kepekBox.append(kep)
        
          if(kep.id == 0){ //itt állítjuk be alapértelmezetten h a fő kép kis képét emelje ki először!!
            // ha az indexunk alapból 0 és az img tag id-ja 0 akkor
            kep.classList.add('active')
            megjelenitendoKepIndex = kep.id
           
          }
        });
    klikkEsemenyKepekre()
    jobbraGomb(megjelenitendoKepIndex)
    balraGomb()

}

function klikkEsemenyKepekre() { // itt klikkelsz a kisképre akkor elmenti a kép indexét amit továbbviszünk másik functionbe
  const kiskepek = document.querySelectorAll('.kiskep')

  kiskepek.forEach(kep => { // kattintás esemény az összes kisképre
    kep.addEventListener('click', (event) => {
      //console.log( event.target.id) // visszaadja a rákattintott kisképek id-ját !!!!
      megjelenitendoKepIndex = event.target.id // elmentjük változóban ezt az idt, a html elemnek
      alapKiskepAktiv()
      kep.classList.add('active') // amire rákattintottál kisképre active osztályt kap
      foKepValtoztat(megjelenitendoKepIndex,kep) //átvisszük a kattintott kép indexét és magát a képet
    })
  });
}

function foKepValtoztat(megjelenitendoKepIndex,kep) { // itt a kiválasztott kiskép alapján megjelenítjük a nagy képet
  const fokep = document.querySelector('#fokep')
  // áthozuk a rákattintott kisképet is, így nem kell ciklus
  if(megjelenitendoKepIndex == kep.id){ // ha a html képnek az id-ja megegyezik a tömbünk aktuális elemének id-jával
     megjelenitendoKep = kepek[megjelenitendoKepIndex] //globális változó értéke a tömb azon indexe amit áthoztunk a kisképnek kattintásra
      fokep.src = "images/" + megjelenitendoKep.url // itt változtatjuk meg a főkép url-ét
  }

}

function alapKiskepAktiv() {

  const kiskepek = document.querySelectorAll('.kiskep')
  kiskepek.forEach(kep => {
    kep.classList.remove('active') // kitörli az összes active osztályt midnen kisképről
  });
}

function balraGomb() {

  const balraGomb = document.querySelector('#prev')
  const kiskepek = document.querySelectorAll('.kiskep')
  const fokep = document.querySelector('#fokep')

    balraGomb.addEventListener('click',(event) => {
      alapKiskepAktiv()

      if(megjelenitendoKepIndex >= 0 && megjelenitendoKepIndex <= tombHossza ){

        // Lekezeljük, hogy ha a bal szélére értünk
        if(megjelenitendoKepIndex == 0){ 
          megjelenitendoKepIndex = tombHossza-1 //akkor az index az 5-ös legyen,hogy  a végére ugorjon
        } else{
          megjelenitendoKepIndex-- // itt oldjuk meg a lépegetést balra
        }

        megjelenitendoKep = kiskepek[megjelenitendoKepIndex]
        megjelenitendoKep.classList.add('active') 
        fokep.src = megjelenitendoKep.src
      }
    })
}

function jobbraGomb() {
  const jobbraGomb = document.querySelector('#next')
  const kiskepek = document.querySelectorAll('.kiskep')

    jobbraGomb.addEventListener('click',(event) => {
      alapKiskepAktiv() // törlünk minden active osztályt

      if(megjelenitendoKepIndex >= 0 && megjelenitendoKepIndex <= tombHossza ){

        if(megjelenitendoKepIndex === tombHossza-1){ // ha az index 5-ös lesz
          megjelenitendoKepIndex = 0 //ugorjon vissza a nulladik indexre
        } else {
          megjelenitendoKepIndex++ // ha nem akkor növeli az indexet h tovább mehessen jobbra
        }

        megjelenitendoKep = kiskepek[megjelenitendoKepIndex]
        megjelenitendoKep.classList.add('active') // itt adjuk csak hozzá az activ osztályt az elemekre
        fokep.src = megjelenitendoKep.src
        
      }
        
    } )
  
}