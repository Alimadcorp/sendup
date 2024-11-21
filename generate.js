let initialhtm;

document.getElementById("extra").addEventListener("change", function () {
  generateSchedule();
});
function generateSchedule() {
  const inputElement = document.getElementById("rollNoInput");
  const table = document.getElementById("scheduleTable");
  const extra = document.getElementById("extra");
  let rollNoInput = inputElement.value;
  let extras = extra.checked;
  if (validate(rollNoInput)) {
    let rollNo, grade;
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;
    let time = "Unavailable";
    if (grade == 2) {
      time = "9 AM to 12 PM";
    } else if (grade == 1) {
      time = "1 PM to 4 PM";
    }
    table.style.display = "table";
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
              for(let i = 0; i < firsubs.length; i++){
                for(let j = 0; j < firsubs[i].length; j++){
                  if(firsubs[i][j] == sub){
                    da = days[i];
                    dat = dates[i];
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
              console.log(fsubjects[i]);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = fsubjects[i];
              let da, dat;
              for(let i = 0; i < firsubs.length; i++){
                for(let j = 0; j < firsubs[i].length; j++){
                  if(firsubs[i][j] == sub){
                    da = days[i];
                    dat = dates[i];
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
              console.log(fsubjects[i]);
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
              for(let i = 0; i < secsubs.length; i++){
                for(let j = 0; j < secsubs[i].length; j++){
                  if(secsubs[i][j] == sub){
                    da = days[i];
                    dat = dates[i];
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
              console.log(ssubjects[i]);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = ssubjects[i];
              let da, dat;
              for(let i = 0; i < secsubs.length; i++){
                for(let j = 0; j < secsubs[i].length; j++){
                  if(secsubs[i][j] == sub){
                    da = days[i];
                    dat = dates[i];
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
              console.log(ssubjects[i]);
            }
          }
        }
      }
    }
  }
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

  const newCell6 = document.createElement("td");
  newCell6.textContent = time;
  newRow.appendChild(newCell6);

  tableBody.appendChild(newRow);
}
