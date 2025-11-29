const firebaseConfig = {
  apiKey: "AIzaSyAozPqs-YCLBwrWRM_HmDlni77PP1qmr6o",
  authDomain: "chatmadchat.firebaseapp.com",
  projectId: "chatmadchat",
  storageBucket: "chatmadchat.firebasestorage.app",
  messagingSenderId: "168985263237",
  appId: "1:168985263237:web:722e404b412a4f96f13dec",
  measurementId: "G-0MN71K9491"
};
const fetchCSV = (csv, callback, mode) => {
  const rows = csv.split("\n").map((l) => l.trim());
  if (mode !== "schedule") {
    const good = rows
      .filter((l) => l)
      .map((r) => r.split(",").map((c) => c.trim()));
    return callback(transpose(good));
  }
  const blocks = rows.reduce(
    (acc, l) => {
      if (!l) acc.push([]);
      else acc[acc.length - 1].push(l.split(",").map((c) => c.trim()));
      return acc;
    },
    [[]]
  );
  const flatRows = [];
  const labels = [];
  let flag = "morning";
  for (const block of blocks) {
    if (block.length === 0) {
      flag = flag === "morning" ? "evening" : "morning";
      continue;
    }
    for (const r of block) {
      flatRows.push(r);
      labels.push(flag);
    }
    flag = flag === "morning" ? "evening" : "morning";
  }
  const COLS = 3;
  const cols = Array.from({ length: COLS }, () => []);
  for (const r of flatRows) {
    for (let i = 0; i < COLS; i++) cols[i].push(r[i] ?? "");
  }
  callback([...cols, labels]);
};
const transpose = (arr) => {
  if (!arr.length) return [];
  const cols = arr[0].length;
  return Array.from({ length: cols }, (_, i) => arr.map((r) => r[i] ?? ""));
};
let schedule = ``;
let datac = ``;
let other = false;
