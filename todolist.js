let liCounter = 0
let ulHeight = 0; // manual menambah height dari ul ketika li ditambah karena untuk select and drag
function addList() {
    let textInput = document.querySelector("#addEntry").value;
    if (textInput != "") {
        let newli = document.createElement("li");
        newli.className = "liAdd";
        let ul = document.querySelector("#ulAdd");

        newli.innerHTML += "<span class='openCircle'></span>";
        newli.innerHTML += "<div class='liText'></div>"
        newli.querySelector(".liText").innerText = textInput;
        ul.appendChild(newli);

        // Buat status tercentang dan set default jadi false (belum tercentang)
        newli.status = false;

        // Buat span arrow naik turun
        newli.innerHTML += "<span class='deleteLiBtn' onclick='deleteLi(event)'></span>";
        newli.innerHTML += "<span class='arrowNaik' onclick='naikkanLi(event)'><span class ='naik'></span></span>";
        newli.innerHTML += "<span class='arrowTurun' onclick='turunkanLi(event)'><span class ='turun'></span></span>";

        // tidak jadi
        //newli.style.top = (120 + (liCounter * 32)) + "px";
        // 32 itu tinggi liAdd, 120 itu jarakliAdd pertama itu dari atas

        document.querySelector("#addEntry").value = "";
        ulHeight += 40;
        ul.style.height = ulHeight + "px";
        liCounter += 1;
        if (liCounter % 2 == 0) {
            newli.style.backgroundColor = "#dce0bf";
        }
        // selalu menambah nama class baru di akhir nama class sekarang karena kondisi list yang clong clong karena dihapus
        $("#ulAdd li").each(function (i) {
            $(this).addClass('listAdd_' + i);
            $(this).attr("onclick", "clickAddList(event)");
        });
        $(".openCircle").each(function (i) {
            $(this).addClass('circ' + i);
        });
    }
    else if (textInput == "") {
        alert("Isi dahulu");
    }
}


// Jika klik
let addBtn = document.querySelector("#addBtn")
addBtn.addEventListener("click", function () {
    addList();
})
// Jika enter
let addEntry = document.querySelector("#addEntry")
addEntry.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addList();
    }
})

// ini di call langsung di html onclick liAdd
function clickAddList(e) {
    // mengambil classname dari li
    let tandaClassLi = e.target.className;
    gantiWarna(tandaClassLi);

    // kalau yang di klik bukan li nya, tapi lingkarannya   
    //alert(tandaClassLi)
    if (tandaClassLi.includes("openCircle")) {
        //alert(document.getElementsByClassName(tandaClassLi)[0].parentElement.className)
        gantiWarna(document.getElementsByClassName(tandaClassLi)[0].parentElement.className)
    }
}
function gantiWarna(tandaClassLi) {

    let tanda2 = document.getElementsByClassName(tandaClassLi)[0].getElementsByClassName("openCircle")[0];
    // pakai tanda2 karena masih harus cari child class nya
    try {
        bgColorOpenCircle = getComputedStyle(tanda2).backgroundColor;
    } catch (error) {
        return; // menghentikan fungsi jika error, karena kalau yg di klik arrow naik, liAdd juga ikut mendeteksi karena itu parentnya
        // yang di klik harusnya yang parentnya (liAdd nya, bukan arrownya) jika ingin men centang
    }

    //alert(bgColorOpenCircle)
    if (bgColorOpenCircle == "rgba(0, 0, 0, 0)") {
        tanda2.style.backgroundColor = "rgb(138, 99, 59)";
        //mengubah status menjadi tercentang
        document.getElementsByClassName(tandaClassLi)[0].status = true;
    } else if (bgColorOpenCircle == "rgb(138, 99, 59)") {
        tanda2.style.backgroundColor = "rgba(0, 0, 0, 0)";
        //mengubah status menjadi unchecked (tidak tercentang)
        document.getElementsByClassName(tandaClassLi)[0].status = false;
    }
}
function deleteLi(e) {
    e.target.parentElement.remove()
    // mengurangi tinggi ul (ulHeight itu var global)
    let ulAdd = document.querySelector("#ulAdd")
    ulHeight -= 40;
    ulAdd.style.height = ulHeight + "px";
}

// ini di call langsung di html onclick (karena masih belum tau kpn gak bisa addeventlistener dari span .arrow naik)
function naikkanLi(e) {
    //alert(e.target.parentElement.className)

    // MEMINDAH ISI
    // menyimpan nilai sekarang (previous disini mengakses div yg di dalam li)
    let sementara = e.target.parentElement.querySelector(".liText").innerText; //di stackoverflow ada yg pakai currentNode.nextElementSibling (pelajari)
    // mengubah menjadi seperti atasnya
    e.target.parentElement.querySelector(".liText").innerText = e.target.parentElement.previousElementSibling.querySelector(".liText").innerText;
    // mengubah atasnya menjadi 'sementara'
    e.target.parentElement.previousElementSibling.querySelector(".liText").innerText = sementara;


    // MEMINDAH CHECKED
    //alert(document.getElementsByClassName(e.target.parentElement.previousElementSibling.className)[0].status)
    let statusCentang = document.getElementsByClassName(e.target.parentElement.className)[0].status;
    let statusCentangPrev = document.getElementsByClassName(e.target.parentElement.previousElementSibling.className)[0].status;
    if (statusCentang == true && statusCentangPrev == false ||
        statusCentang == false && statusCentangPrev == true) {
        // memindah
        this.gantiWarna(e.target.parentElement.className)
        this.gantiWarna(e.target.parentElement.previousElementSibling.className)
    } else {
        // tidak memindah
        return;
    }
}

function turunkanLi(e) {
    // menyimpan nilai sekarang
    let sementara = e.target.parentElement.querySelector(".liText").innerText; //di stackoverflow ada yg pakai currentNode.nextElementSibling (pelajari)
    // mengubah menjadi seperti bawahnya
    e.target.parentElement.querySelector(".liText").innerText = e.target.parentElement.nextElementSibling.querySelector(".liText").innerText;
    // mengubah bawahnya menjadi 'sementara'
    e.target.parentElement.nextElementSibling.querySelector(".liText").innerText = sementara;

    // MEMINDAH CHECKED
    //alert(document.getElementsByClassName(e.target.parentElement.previousElementSibling.className)[0].status)
    let statusCentang = document.getElementsByClassName(e.target.parentElement.className)[0].status;
    let statusCentangNext = document.getElementsByClassName(e.target.parentElement.nextElementSibling.className)[0].status;
    if (statusCentang == true && statusCentangNext == false ||
        statusCentang == false && statusCentangNext == true) {
        // memindah
        this.gantiWarna(e.target.parentElement.className);
        this.gantiWarna(e.target.parentElement.nextElementSibling.className);
    } else {
        // tidak memindah
        return;
    }
}