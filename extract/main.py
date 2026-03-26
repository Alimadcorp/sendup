import pdfplumber
import pandas as pd
import re

pdf_path = "input.pdf"
start_page = 10
end_page = 61

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
            data = t.extract()
            for row in data:
                if not row:
                    continue
                cleaned = [clean(c) for c in row]
                trimmed = [c for c in cleaned if c != ""]
                if len(trimmed) >= 5:
                    all_rows.append(trimmed[:5])

df = pd.DataFrame(all_rows, columns=["col1","col2","col3","col4","col5","col6","col7"])
df.to_csv("raw_out.csv", index=False)
