let initialhtm;
let generating = false;
let v = "1.8.9b";
function setversion(ver) {
  v = ver + "v";
  document.getElementById("logg").innerHTML = "&nbsp&nbsp" + v;

  if (log.style.display != "none") {
    const inputElement = document.getElementById("rollNoInput");
    let rollNoInput = inputElement.value;
    let extras = extra.checked;
    let rollNo, grade;
    let logs = "&nbsp&nbsp" + v + "MS";
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;
    logs = logs + rollNo.toString() + grade.toString();
    logs += extras ? "Y" : "N";
    const art = document.getElementById("ART").checked;
    const com = document.getElementById("COM").checked;
    const gs = document.getElementById("GS").checked;
    let selected = document.querySelector('input[name="subject"]:checked');
    let newadd = "I";
    if (selected.value != "ICS") {
      if (selected.value == "PE") {
        newadd = "E";
      }
      if (selected.value == "PM") {
        newadd = "M";
      }
    }
    if (art) {
      newadd += "A";
    }
    if (com) {
      newadd += "C";
    }
    if (gs) {
      newadd += "G";
    }
    logs += newadd;
    log.innerHTML = logs;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  fetch("/data.csv").then((r)=>r.text()).then(data=>{datac=data; if(other) doo(); other = true;});
  fetch("/schedule.csv").then((r)=>r.text()).then(data=>{schedule=data; if(other) doo(); other = true});

  function doo(){
    fetchCSV(schedule, (data) => {
      schedule = data;
      mapschedule();
    });

    fetchCSV(datac, (data) => {
      datac = data;
      mapdata();
    });
  }

  document.getElementById("logg").innerHTML = "&nbsp&nbsp" + v;
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", () => {
    back();
    history.pushState(null, null, location.href);
  });
});

function download() {
  const rollNo = document.getElementById("rollNoInput").value || "Schedule";
  const fileName = `${rollNo}_Schedule.png`;
  const table = document.getElementById("scheduleTable");
  const log = document.getElementById("log");
  const timeElement = document.getElementById("time");

  if (!table || !log || !timeElement || timeElement.innerText.trim() === "") {
    alert("Please generate the schedule before downloading!");
    return;
  }

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.background = "#040409";
  container.style.padding = "20px";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = `${table.offsetWidth}px`;

  container.appendChild(log.cloneNode(true));
  container.appendChild(table.cloneNode(true));
  container.appendChild(timeElement.cloneNode(true));
  document.body.appendChild(container);

  html2canvas(container, {
    backgroundColor: null,
    scrollX: 0,
    scrollY: 0,
    useCORS: true,
    scale: 2,
  }).then((canvas) => {
    // Generate a Blob from the canvas
    canvas.toBlob((blob) => {
      const url = window.URL.createObjectURL(blob); // Create URL from Blob
      saveFile(fileName, url); // Use the saveFile function
    }, "image/png");

    document.body.removeChild(container);
  });
}

// saveFile function
function saveFile(fileName, urlFile) {
  let a = document.createElement("a");
  a.style = "display: none";
  document.body.appendChild(a);
  a.href = urlFile;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(urlFile); // Revoke the created URL
  a.remove();
}

function nullCheck() {
  const table = document.getElementById("scheduleTable");
  if (table.style.display != "none") {
    let n = table.rows.length;
    if (n <= 1) {
      generateSchedule();
    }
  }
}
setInterval(nullCheck, 500);
window.onload = () => {
  const savedOption = localStorage.getItem("selectedSubject") || "ICS";
  document.querySelector(
    `input[name="subject"][value="${savedOption}"]`
  ).checked = true;
};

document.querySelectorAll('input[name="subject"]').forEach((radio) =>
  radio.addEventListener("change", function () {
    localStorage.setItem("selectedSubject", this.value);
  })
);

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

function back() {
  document.getElementById("log").style.display = "none";
  document.getElementById("scheduleTable").style.display = "none";
  document.getElementById("bb").style.display = "none";
  document.getElementById("clean").style.display = "none";
  document.getElementById("down").style.display = "none";
  document.getElementById("more").style.display = "inline";
  document.getElementById("rest").style.display = "inline";
  document.getElementById("time").innerHTML = "";
  document.getElementById("logg").style.display = "inline";
}
async function generateSchedule() {
  const inputElement = document.getElementById("rollNoInput");
  let rollNoInput = inputElement.value;
  if (validate(rollNoInput)) {
    if (generating) return;
    generating = true;
    const table = document.getElementById("scheduleTable");
    const other = document.getElementById("rest");
    const bb = document.getElementById("bb");
    const extra = document.getElementById("extra");
    const log = document.getElementById("log");
    const art = document.getElementById("ART").checked;
    const com = document.getElementById("COM").checked;
    const gs = document.getElementById("GS").checked;
    localStorage.setItem("art", art);
    localStorage.setItem("com", com);
    localStorage.setItem("gs", gs);

    let extras = extra.checked;
    let logs = "&nbsp&nbsp" + v + "MS";
    localStorage.setItem("xtra", extra.checked ? "yes" : "no");
    bb.style.display = "inline";
    document.getElementById("logg").style.display = "none";
    document.getElementById("log").style.display = "inline";
    document.getElementById("down").style.display = "inline";

    document.getElementById("more").style.display = "none";
    let rollNo, grade;
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;
    logs = logs + rollNo.toString() + grade.toString();
    logs += extras ? "Y" : "N";
    let selected = document.querySelector('input[name="subject"]:checked');
    let newadd = "I";
    if (selected.value != "ICS") {
      if (selected.value == "PE") {
        newadd = "E";
      }
      if (selected.value == "PM") {
        newadd = "M";
      }
    }
    if (art) {
      newadd += "A";
    }
    if (com) {
      newadd += "C";
    }
    if (gs) {
      newadd += "G";
    }
    logs += newadd;
    log.innerHTML = logs;
    localStorage.setItem("roll", rollNoInput);
    let time = "Unavailable";
    if (grade == 2) {
      time = "9 AM to 12 PM";
    } else if (grade == 1) {
      time = "1 PM to 4 PM";
    }
    document.getElementById("time").innerHTML = "Exam Time: " + time;
    table.style.display = "table";
    other.style.display = "none";
    if (initialhtm == null) {
      initialhtm = table.innerHTML;
    }
    table.innerHTML = initialhtm;

    if (grade == 1) {
      let n = 0;
      for (let i = 0; i < fsubjects.length; i++) {
        if (fsubjects[i] != null) {
          if (mins[i] == 0 && extras) {
            let room = centers[i];
            let sub = fsubjects[i];
            let da, dat;
            for (let i = 0; i < firsubs.length; i++) {
              for (let j = 0; j < firsubs[i].length; j++) {
                if (firsubs[i][j] == sub) {
                  da = days[i].slice(0, 3);
                  dat = formatDate(dates[i]);
                  await delay(20);
                  break;
                }
              }
            }
            n++;
            addRow(n, da, dat, sub, room, time);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = fsubjects[i];
              let da, dat;

              let elig = false;
              let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
              if (!extras) {
                if (selected.value == "ICS") {
                  for (let i = 0; i < ICSA1.length; i++) {
                    if (sub == ICSA1[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PE") {
                  for (let i = 0; i < PEA1.length; i++) {
                    if (sub == PEA1[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PM") {
                  for (let i = 0; i < PMA1.length; i++) {
                    if (sub == PMA1[i]) {
                      elig = true;
                    }
                  }
                }
                if (art) {
                  for (let i = 0; i < ARTA1.length; i++) {
                    if (sub == ARTA1[i]) {
                      elig = true;
                    }
                  }
                }
                if (com) {
                  for (let i = 0; i < COMA1.length; i++) {
                    if (sub == COMA1[i]) {
                      elig = true;
                    }
                  }
                }
                if (gs) {
                  for (let i = 0; i < GSA1.length; i++) {
                    if (sub == GSA1[i]) {
                      elig = true;
                    }
                  }
                }
                if (!elig) {
                  continue;
                }
              }
              for (let i = 0; i < firsubs.length; i++) {
                for (let j = 0; j < firsubs[i].length; j++) {
                  if (firsubs[i][j] == sub) {
                    da = days[i].slice(0, 3);
                    dat = formatDate(dates[i]);
                    await delay(20);
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
            }
          }
        }
      }
    } else if (grade == 2) {
      let n = 0;
      for (let i = 0; i < ssubjects.length; i++) {
        if (ssubjects[i] != null) {
          if (mins[i] == 0 && extras) {
            let room = centers[i];
            let sub = ssubjects[i];
            let da, dat;
            for (let i = 0; i < secsubs.length; i++) {
              for (let j = 0; j < secsubs[i].length; j++) {
                if (secsubs[i][j] == sub) {
                  da = days[i].slice(0, 3);
                  dat = formatDate(dates[i]);
                  await delay(20);
                  break;
                }
              }
            }
            n++;
            addRow(n, da, dat, sub, room, time);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = ssubjects[i];
              let da, dat;
              let elig = false;
              let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
              if (!extras) {
                if (selected.value == "ICS") {
                  for (let i = 0; i < ICSA2.length; i++) {
                    if (sub == ICSA2[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PE") {
                  for (let i = 0; i < PEA2.length; i++) {
                    if (sub == PEA2[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PM") {
                  for (let i = 0; i < PMA2.length; i++) {
                    if (sub == PMA2[i]) {
                      elig = true;
                    }
                  }
                }
                if (art) {
                  for (let i = 0; i < ARTA2.length; i++) {
                    if (sub == ARTA2[i]) {
                      elig = true;
                    }
                  }
                }
                if (com) {
                  for (let i = 0; i < COMA2.length; i++) {
                    if (sub == COMA2[i]) {
                      elig = true;
                    }
                  }
                }
                if (gs) {
                  for (let i = 0; i < GSA2.length; i++) {
                    if (sub == GSA2[i]) {
                      elig = true;
                    }
                  }
                }
                if (!elig) {
                  continue;
                }
              }
              for (let i = 0; i < secsubs.length; i++) {
                for (let j = 0; j < secsubs[i].length; j++) {
                  if (secsubs[i][j] == sub) {
                    da = days[i].slice(0, 3);
                    dat = formatDate(dates[i]);
                    await delay(20);
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
            }
          }
        }
      }
    }
  }
  document
    .querySelectorAll("th")
    .forEach(
      (th) =>
        (th.style.background = "linear-gradient(135deg, #223566, #1b2c4a)")
    );
  generating = false;
}
function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [day, month] = inputDate.split("-");
  return `${day} ${months[parseInt(month) - 1]}`;
}
function addRow(number, day, date, subject, room, time) {
  if (number > 7) {
    document.getElementById("clean").style.display = "inline";
  }
  const tableBody = document.querySelector("#scheduleTable tbody");
  const newRow = document.createElement("tr");

  const newCell1 = document.createElement("td");
  newCell1.textContent = number;
  newRow.appendChild(newCell1);

  const newCell2 = document.createElement("td");
  newCell2.textContent = day;
  newRow.appendChild(newCell2);

  const newCell3 = document.createElement("td");
  newCell3.textContent = date;
  newRow.appendChild(newCell3);

  const newCell4 = document.createElement("td");
  newCell4.textContent = subject;
  newRow.appendChild(newCell4);

  const newCell5 = document.createElement("td");
  newCell5.textContent = room;
  newRow.appendChild(newCell5);
  newRow.classList.add("new-row"); // Initially invisible

  /*const newCell6 = document.createElement("td");
  newCell6.textContent = time;
  newRow.appendChild(newCell6);*/

  tableBody.appendChild(newRow);
  document
    .querySelectorAll("th")
    .forEach(
      (th) =>
        (th.style.background = "linear-gradient(135deg, #663522, #4a2c1b)")
    );
  setTimeout(() => {
    newRow.classList.add("visible");
  }, 10);
}
