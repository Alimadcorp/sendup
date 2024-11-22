let dates, days;
let firsubs, secsubs;
let ranges, mins, maxes;
let fsubjects, ssubjects, centers;
let ICS1 = "I Comp. Sc. I English I Math I Isl Std. I Urdu I Physics I Al Quran";
let PE1 = "I Chem I English I Math I Isl Std. I Urdu I Physics I Al Quran";
let PM1 = "I Chem I English I Biology I Isl Std. I Urdu I Physics I Al Quran";

let ICS2 = "II Comp. Sc. II English II Math II Pak. St. II Urdu II Physics II Al Quran";
let PE2 = "II Chem II English II Math II Pak. St. II Urdu II Physics II Al Quran";
let PM2 = "II Chem II English II Biology II Pak. St. II Urdu II Physics II Al Quran";

let ICSA1, ICSA2, PEA1, PEA2, PMA1, PMA2;
function mapdata() {
  fsubjects = datac[0];
  fsubjects = markAsNull(fsubjects, " II");
  ssubjects = datac[0];
  for (let i = 0; i < ssubjects.length; i++) {
    if (fsubjects[i] != null) {
      ssubjects[i] = null;
    }
  }
  fsubjects = rem(fsubjects);
  ssubjects = rem(ssubjects);
  ranges = datac[1];
  centers = datac[2];
  mins = ranges.map((range) => parseRange(range).min);
  maxes = ranges.map((range) => parseRange(range).max);
}

function mapschedule() {
  dates = schedule[0];
  days = schedule[1];
  let sec = schedule[2];
  secsubs = sec.map((item) => saparator(item, "II "));
  let fir = schedule[3];
  firsubs = fir.map((item) => saparator(item, "I "));
  
  ICSA1 = saparator(ICS1, "I ");
  PEA1 = saparator(PE1, "I ");
  PMA1 = saparator(PM1, "I ");
  ICSA2 = saparator(ICS2, "II ");
  PEA2 = saparator(PE2, "II ");
  PMA2 = saparator(PM2, "II ");
}

function saparator(input, delimiter) {
  return input
    .split(delimiter)
    .map((item) => item.trim())
    .map((item) => item.replace(/"/g, ""))
    .filter((item) => item !== "");
}

function parseRange(input) {
  if (input === "All Students") {
    return { min: 0, max: 0 };
  }

  const parts = input.split("-");
  if (parts.length === 2) {
    const min = parseInt(parts[0], 10);
    const max = parseInt(parts[1], 10);
    return { min, max };
  }
  return { min: NaN, max: NaN };
}

function markAsNull(arr, destroyer) {
  return arr.map((item) => {
    if (item && item.endsWith(destroyer)) {
      return null;
    }
    return item;
  });
}
function rem(arr) {
  return arr.map((item) => {
    if (item != null) {
      if (item.endsWith(" II")) {
        return item.slice(0, -3);
      } else if (item.endsWith(" I")) {
        return item.slice(0, -2);
      }
      return item;
    } else {
      return null;
    }
  });
}
function extract(inputString) {
  const parts = inputString.split("-");
  if (parts.length >= 2) {
    const rollNo = parseInt(parts[0], 10);
    const grade = parseInt(parts[1], 10);
    return { rollNo, grade };
  }
  return null;
}
function validate(inputs) {
  const inputValue = inputs;
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = "";

  const table = document.getElementById("scheduleTable");
  if (inputValue.trim() === "") {
    errorMessageElement.textContent = "Input cannot be empty.";
    table.style.display = "none";
    return false;
  }

  if (/[a-zA-Z]/.test(inputValue)) {
    errorMessageElement.textContent = "Input cannot contain alphabets.";
    table.style.display = "none";
    return false;
  }
  const regex = /^\d{1,4}-\d{1,2}(-\d{2})?$/;

  if (!regex.test(inputValue)) {
    errorMessageElement.textContent =
      'Invalid format. Please enter in "XXXX-X-XX"';
    table.style.display = "none";
    return false;
  }
  if(extract(inputValue).grade > 2 || extract(inputValue).grade < 1){
    errorMessageElement.textContent =
      'You must be either 1st year or 2nd year';
    table.style.display = "none";
    return false;
  }
  errorMessageElement.textContent = "";
  return true;
}