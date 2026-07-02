// Load Patient Records

fetch("/api/patients")
.then(response => response.json())
.then(patients => {

    const table = document.getElementById("patientTable");

    // Agar patientTable nahi hai to return
    if (!table) return;


    patients.forEach(patient => {

        let row = table.insertRow();


        row.insertCell(0).innerHTML =
        patient._id;


        row.insertCell(1).innerHTML =
        patient.fullName;


        row.insertCell(2).innerHTML =
        patient.age;


        row.insertCell(3).innerHTML =
        patient.gender;


        row.insertCell(4).innerHTML =
        patient.registerationDate 


        row.insertCell(5).innerHTML =
        patient.mobile;


        row.insertCell(6).innerHTML =
        patient.address;


        row.insertCell(7).innerHTML =
        patient.disease;


        // Emergency Highlight
        let emergencyCell =
        row.insertCell(8);


        emergencyCell.innerHTML =
        patient.emergencyCase;


        if(patient.emergencyCase === "Yes")
        {
            emergencyCell.style.color = "red";
            emergencyCell.style.fontWeight =
            "bold";
        }


        row.insertCell(9).innerHTML =
        patient.patientStatus;

    });

});



// Search Patient Function

function searchPatient()
{

let input =
document.getElementById("search")
.value.toUpperCase();


let table =
document.getElementById("patientTable");


let rows =
table.getElementsByTagName("tr");


for(let i = 1; i < rows.length; i++)
{

let name =
rows[i].getElementsByTagName("td")[1];


if(name)
{

let text =
name.textContent || name.innerText;


if(text.toUpperCase()
.indexOf(input) > -1)
{

rows[i].style.display = "";

}

else
{

rows[i].style.display =
"none";

}

}

}

}
// Live Date & Time

function updateClock() {
    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString();
}

setInterval(updateClock, 1000);

updateClock();


// Scroll To Top Button

let topBtn = document.getElementById("topBtn");

window.onscroll = function() {

    if (document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";
    }
};


// Click to go top

topBtn.onclick = function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
// Theme Change

let themeBtn = document.getElementById("themeBtn");

if(themeBtn){

    themeBtn.onclick = function(){

        document.body.classList.toggle("light");

    };

}
// Loading Screen

window.addEventListener("load", function(){

    let loader = document.getElementById("loader");

    if(loader){

        setTimeout(function(){

            loader.style.display = "none";

        }, 1200);

    }

});
// Current Date Display

let dateBox = document.getElementById("currentDate");

if(dateBox){

    let today = new Date();

    dateBox.innerHTML =
    today.toDateString();

}
function updateDateTime() {
    let now = new Date();

    let date = now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    let time = now.toLocaleTimeString();

    document.getElementById("currentDate").innerHTML =
        date + " | " + time;
}

setInterval(updateDateTime, 1000);

updateDateTime();