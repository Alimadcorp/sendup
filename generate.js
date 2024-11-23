let initialhtm;
document.addEventListener("DOMContentLoaded", function () {
  const roll = localStorage.getItem("roll");
  const xtra = localStorage.getItem("xtra");
  if (roll) document.getElementById("rollNoInput").value = roll;
  if (xtra === "yes") document.getElementById("extra").checked = true;
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", () => {
    back();
    history.pushState(null, null, location.href);
  });
});
function downloadAsPNG() {
  const rollNo = document.getElementById("rollNoInput").value || "Schedule";
  const fileName = `${rollNo}_Schedule.png`;
  const table = document.getElementById("scheduleTable");
  const timeElement = document.getElementById("time");

  if (!table || !timeElement || timeElement.innerText.trim() === "") {
    alert("Please generate the schedule before downloading!");
    return;
  }

  // Wrap table and time in a temporary container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.background = "white";
  container.style.padding = "20px";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = `${table.offsetWidth}px`;

  // Clone the table and time into the container
  container.appendChild(table.cloneNode(true));
  container.appendChild(timeElement.cloneNode(true));

  document.body.appendChild(container); // Temporarily add to DOM

  // Use html2canvas with height to capture the full content
  html2canvas(container, {
    backgroundColor: null,
    scrollX: 0,
    scrollY: 0,
    useCORS: true,
    scale: 2, // For high-quality output
  }).then((canvas) => {
    const croppedCanvas = document.createElement("canvas");
    const ctx = croppedCanvas.getContext("2d");

    // Set the canvas size to the content height
    croppedCanvas.width = canvas.width;
    croppedCanvas.height = canvas.height;

    // Draw the full content onto the new canvas
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.href = croppedCanvas.toDataURL("image/png");
    link.download = fileName;
    link.click();

    // Clean up the temporary container
    document.body.removeChild(container);
  });
}
window.onload = () => {
  const savedOption = localStorage.getItem("selectedSubject") || "ICS";
  document.querySelector(`input[name="subject"][value="${savedOption}"]`).checked = true;
};

document.querySelectorAll('input[name="subject"]').forEach((radio) =>
  radio.addEventListener("change", function () {
    localStorage.setItem("selectedSubject", this.value);
  })
);

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

function back() {
  document.getElementById("log").innerHTML = "";
  document.getElementById("scheduleTable").style.display = "none";
  document.getElementById("bb").style.display = "none";
  document.getElementById("down").style.display = "none";
  document.getElementById("rest").style.display = "inline";
  document.getElementById("time").innerHTML = "";
}
async function generateSchedule() {
  const inputElement = document.getElementById("rollNoInput");
  const table = document.getElementById("scheduleTable");
  const other = document.getElementById("rest");
  const bb = document.getElementById("bb");
  const extra = document.getElementById("extra");
  const log = document.getElementById("log");
  let rollNoInput = inputElement.value;
  let extras = extra.checked;
  let logs = "&nbsp&nbsp1.52.4vMS";
  localStorage.setItem("xtra", extra.checked ? "yes" : "no");
  if (validate(rollNoInput)) {
    bb.style.display = "inline";
    document.getElementById("down").style.display = "inline";
    let rollNo, grade;
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;
    logs = logs + rollNo.toString() + grade.toString();
    logs += extras ? "Y" : "N";
    let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
    let newadd = "I";
    if(selected.value!="ICS") {
      if(selected.value=="PE") { newadd = "E"; } 
      if(selected.value=="PM") {newadd = "M";} 
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
  setTimeout(() => {
        newRow.classList.add("visible");
      }, 10);
                     }
