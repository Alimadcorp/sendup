import pdfplumber
import pandas as pd
import re

pdf_path = "input.pdf"
start_page = 11
end_page = 11

def clean(v):
    if not v:
        return ""
    return re.sub(r"\s+", " ", v).strip()

all_rows = []

with pdfplumber.open(pdf_path) as pdf:
    for p in range(start_page - 1, end_page):
        page = pdf.pages[p]

        tables = page.find_tables(table_settings={
            "vertical_strategy": "lines",
            "horizontal_strategy": "lines",
            "snap_tolerance": 3,
            "join_tolerance": 3,
            "edge_min_length": 10,
        })

        for t in tables:
            for row, cells in zip(t.rows, t.cells):
                # get bounding box for column 3
                col3_cell = cells[2]
                if not col3_cell:
                    continue
                top = col3_cell
                bottom = next_col3_cell
                key = (round(top, 1), round(bottom, 1))

                text_row = [clean(c) for c in row]
                all_rows.append((key, text_row))

# group by row-height key
grouped = {}
for key, row in all_rows:
    grouped.setdefault(key, []).append(row)

final = []
for key, rows in grouped.items():
    merged = []
    for col in range(7):
        merged_text = " ".join(clean(r[col]) for r in rows if r[col])
        merged.append(clean(merged_text))
    final.append(merged)

df = pd.DataFrame(final, columns=["col1","col2","col3","col4","col5","col6","col7"])
df.to_csv("sked.csv", index=False)
