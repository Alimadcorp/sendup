const fetchCSV = (csv, callback) => {
  callback(transposeArray(csvToArray(csv)));
};

const csvToArray = (csv) =>
  csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));
const transposeArray = (arr) => arr[0].map((_, i) => arr.map((row) => row[i])); 

let schedule = `
02-12-2024,Monday,II English,I Arabic I Comp. Sc. I English Lit. I Persian I Principles of Econ. I Punjabi
03-12-2024,Tuesday,II Arabic II Comp. Sc. II English Lit. II French II Principles of Banking II Punjabi II Urdu Adv. II Urdu Advance,I English
04-12-2024,Wednesday,II Business Math II Fine Arts II Geog II Islamiyat Elective,I Biology I H. & P. Edu. I Math
05-12-2024,Thursday,II Biology II H. & P. Edu.,I Business Math I Fine Arts I Geog I Islamiyat Elective
06-12-2024,Friday,II Math,I History of Pakistan I History of Muslim India
09-12-2024,Monday,II Pak. St.,I Econ I Principles of Comm.
10-12-2024,Tuesday,II Comm. Geo. II Economics,I Isl Std. I Ethics
11-12-2024,Wednesday,II History of Muslim India II History of Pakistan II Statistics,I Chem I Psy
12-12-2024,Thursday,II Physics II Civics II Persian,I Stat
13-12-2024,Friday,II Pakistan Culture II Urdu,I Edu I Phil. I Princ. of Account.
16-12-2024,Monday,II Edu II Phil. II Princ. of Account.,I Pak Culture I Urdu
17-12-2024,Tuesday,II Chem II Psy,I Civics I French I Physics I Urdu Advance I Urdu Adv.
18-12-2024,Wednesday,II Al Quran,I Al Quran
`;

let datac = `
English II,001-171,Basement       
English II,172-210,NB-101 
English II,211-240,NB-102 
English II,241-279,NB-103 
English II,280-309,NB-105 
English II,310-333,NB-106 
English II,334-356,NB-107 
English II,357-398,NB-113 
English II,399-444,NB-114 
English II,445-513,NB-201 
English II,514-552,NB-202 
English II,553-598,NB-203 
English II,599-637,NB-204 
English II,638-677,NB-205 
English II,678-704,NB-206 
English II,705-728,NB-207 - A 
English II,729-758,NB-208 - A 
English II,759-800,NB-209 
English II,801-830,NB-210 
English II,831-872,NB-213 
English II,873-914,NB-214 
English II,915- 934,NB-301 
English II,935- 976,NB-302 
English II,977- 1018,NB-303 
English II,1019- 1063,NB-304 
English II,1064- 1108,NB-305 
English II,1109- 1150,NB-306 
English II,1151- 1184,NB-307 
English II,1185- 1206,NB-308 
English II,1207- 1246,NB-310 
English II,1247- 1291,NB-311 
English II,1292- 1341,NB-312 
English II,1342- 1518,NB-313 
English II,1519- 1567,NB-314 
English II,1568- 1725,NB-315 
English II,1726- 1773,NB-316 
English II,1774- 1827,NB-318 
English II,1828- 1857,NB-319 
English II,1858- 1894,NB-320 
English II,1895- 2042,PHY Seminar Room 
English II,2043- 2137,PHY Jr. Theatre  
English II,2138- 3408,EE Room 214 Seminar Hall 
Comp. Sc. I,519-1145,Basement       
Comp. Sc. I,1146-1187,NB-113 
Comp. Sc. I,1188-1230,NB-114 
Comp. Sc. I,1231-1269,NB-202 
Comp. Sc. I,1270-1936,NB-203 
Comp. Sc. I,1949-3628,NB-204 
Comp. Sc. I,3629-3668,NB-205 
Comp. Sc. I,3669-3710,NB-209 
Comp. Sc. I,3712-3741,NB-210 
Comp. Sc. I,3742-3788,NB-213 
Comp. Sc. I,3789-3816,NB-214 
English Lit. I,All Students,NB-318  
Arabic I,All Students,NB-302
Persian I,All Students,NB-302
Punjabi I,All Students,NB-302
Principles of Econ. I,1041-1547,NB-304 
Principles of Econ. I,1548-1595,NB-305 
Principles of Econ. I,1596-3757,NB-306 
Comp. Sc. II,081-1067,Basement       
Comp. Sc. II,1068-1106,NB-101 
Comp. Sc. II,1107-1136,NB-102 
Comp. Sc. II,1137-1176,NB-103 
Comp. Sc. II,1177-1207,NB-105 
Comp. Sc. II,1208-1231,NB-106 
Comp. Sc. II,1232-1257,NB-107 
Comp. Sc. II,1258-1300,NB-113 
Comp. Sc. II,1301-1355,NB-114 
Comp. Sc. II,1356-2020,NB-201B 
Comp. Sc. II,2022-3408,NB-202 
Arabic II,All Students,NB-203
French II,All Students,NB-203
Punjabi II,All Students,NB-203
Urdu Adv. II,All Students,NB-203
English Lit. II,All Students,NB-315 
Principles of Banking II,984-1545,NB-304 
Principles of Banking II,1546- 1603,NB-305 
English I,001-170,Basement     
English I,171-209,NB-101 
English I,210-239,NB-102 
English I,240-278,NB-103 
English I,279-308,NB-105 
English I,309-332,NB-106 
English I,333-354,NB-107 
English I,355-524,NB-113 
English I,525-566,NB-114 
English I,567-604,NB-201b 
English I,605-643,NB-202 
English I,644-688,NB-203 
English I,689-727,NB-204 
English I,728-767,NB-205 
English I,768-794,NB-206 
English I,795-818,NB-207A  
English I,819-848,NB-208A 
English I,849-1019,NB-209 
English I,1020- 1049,NB-210 
English I,1050- 1091,NB-213 
English I,1092- 1133,NB-214 
English I,1134- 1153,NB-301 
English I,1154- 1195,NB-302 
English I,1196- 1237,NB-303 
English I,1238- 1282,NB-304 
English I,1283- 1514,NB-305 
English I,1515- 1556,NB-306 
English I,1557- 1589,NB-307 
English I,1590- 1611,NB-308 
English I,1612- 1731,NB-310 
English I,1732- 1925,NB-311 
English I,1926- 1973,NB-312 
English I,1974-2019,NB-313 
English I,2020-2067,NB-314  
English I,2068-3004,NB-315 
English I,3005- 3052,NB-316 
English I,3053- 3106,NB-318 
English I,3107- 3135,NB-319 
English I,3136- 3165,NB-320 
English I,3166- 3220,Chem. Deptt Seminar Hall 1st Floor 
English I,3221- 3302,CNLT 
English I,3303- 3357,PHY Seminar Room 
English I,3358- 3418,PHY Jr. Theatre 
English I,3419- 3510,BJLT 
English I,3511- 3621,BOT Lr. Room 2 
English I,3622- 3656,BOT Lr. Room 7 
English I,3657- 3706,EE Room 214 Seminar Hall 
English I,3707- 3741,EE Room 216 
English I,3742- 3777,BioTech Class Room IIB-1 
English I,3779- 3816,BioTech Class Room IIB-2  
Business Math II,All Students,Basement (Row 1-5)   
Islamiyat Elective II,All Students,Basement (Row 6-8)  
Geog II,1704-1788,NB-113 
Geog II,1795-2145,NB-114 
Fine Arts II,All Students,NB-101  
Math I,120-670,Basement       
Math I,671-711,NB-101 
Math I,712-743,NB-102 
Math I,744-784,NB-103 
Math I,785-814,NB-105 
Math I,815-838,NB-106 
Math I,839-860,NB-107 
Math I,861-1031,NB-113 
Math I,1032-1074,NB-114 
Math I,1075- 1112,NB-201B 
Math I,1113-1151,NB-202 
Math I,1152-1196,NB-203 
Math I,1197-1236,NB-204 
Math I,1237-1276,NB-205 
Math I,1277-1315,NB-206 
Math I,1316-1716,NB-207A 
Math I,1717- 1752,NB-208A 
Math I,1904-3308,NB-209 
Math I,3309-3338,NB-210 
Math I,3340-3382,NB-213 
Math I,3383-3425,NB-214 
Math I,3426-3445,NB-301 
Math I,3446- 3497,NB-302 
Math I,3498-3610,NB-303 
Math I,3611-3655,NB-304 
Math I,3656-3700,NB-305 
Math I,3701-3742,NB-306 
Math I,3743-3779,NB-307 
Math I,3781- 3816,NB-310 
Biology I,001-022,NB-308 
Biology I,023-067,NB-311  
Biology I,068-115,NB-312 
Biology I,116-161,NB-313 
Biology I,162-210,NB-314 
Biology I,211-261,NB-315 
Biology I,262-309,NB-316 
Biology I,310-365,NB-318 
Biology I,366-3002,NB-319 
Biology I,3003- 3033,NB-320 
Biology I,3034- 3082,CNLT 
Biology I,3083- 3167,BJLT  
Biology I,3168- 3233,PHY JR. Theatre 
Biology I,3234- 3749,EE Seminar Roll 214 
H. & P. Edu. I,All Students,PHY Seminar Room  
Biology II,001-172,Basement       
Biology II,173-214,NB-113  
Biology II,215-256,NB-114  
Biology II,257-295,NB-202 
Biology II,296-338,NB-203  
Biology II,339-381,NB-204 
Biology II,382-422,NB-205 
Biology II,424-453,NB-206 
Biology II,454-3005,NB- 208A 
H. & P. Edu. II,1322-1886,NB-213 
H. & P. Edu. II,1893-2089,NB-214 
Business Math I,All Students,Basement Row (1-6)    
Islamiyat Elective I,All Students,Basement Row (6-8)  
Geog I,1289-2024,NB-113  
Geog I,2025-3247,NB-114 
Fine Arts I,All Students,NB-114
Math II,081-670,Basement       
Math II,671-710,NB-101 
Math II,711-740,NB-102 
Math II,741-779,NB-103 
Math II,780-809,NB-105 
Math II,810-851,NB-113 
Math II,852-883,NB-114 
Math II,884-922,NB-202 
Math II,923-967,NB-203 
Math II,968- 1007,NB-204 
Math II,1008- 1047,NB-205 
Math II,1048- 1089,NB-209 
Math II,1090- 1119,NB-210  
Math II,1120- 1161,NB-213 
Math II,1162- 1205,NB-214 
Math II,1206- 1251,NB-302 
Math II,1252- 1294,NB-303 
Math II,1295- 1341,NB-304  
Math II,1342- 1758,NB-305  
Math II,1760- 2024,NB-306 
Math II,2025- 2105,NB-311 
Math II,2106- 3408,NB-312 
History of Pakistan I,All Students,Basement (Row 1-5)
History of Muslim India I,All Students,Basement (Row 6-8)
Pak. St. II,001-171,Basement       
Pak. St. II,172-210,NB-101 
Pak. St. II,211-240,NB-102 
Pak. St. II,241-279,NB-103 
Pak. St. II,280-309,NB-105 
Pak. St. II,310-333,NB-106 
Pak. St. II,334-356,NB-107 
Pak. St. II,357-398,NB-113 
Pak. St. II,399-444,NB-114 
Pak. St. II,445-513,NB-201 
Pak. St. II,514-552,NB-202 
Pak. St. II,553-598,NB-203  
Pak. St. II,599-637,NB-204 
Pak. St. II,638-677,NB-205 
Pak. St. II,678-704,NB-206 
Pak. St. II,705-728,NB-207 -A 
Pak. St. II,729-758,NB-208 -A 
Pak. St. II,759-800,NB-209 
Pak. St. II,801-830,NB-210 
Pak. St. II,831-872,NB-213 
Pak. St. II,873-914,NB-214 
Pak. St. II,915-934,NB-301 
Pak. St. II,935-976,NB-302 
Pak. St. II,977- 1018,NB-303 
Pak. St. II,1019- 1063,NB-304 
Pak. St. II,1064- 1108,NB-305 
Pak. St. II,1109-1150,NB-306 
Pak. St. II,1151-1184,NB-307  
Pak. St. II,1185-1206,NB-308 
Pak. St. II,1207-1246,NB-310 
Pak. St. II,1247-1291,NB-311 
Pak. St. II,1292-1341,NB-312 
Pak. St. II,1342-1518,NB-313 
Pak. St. II,1519-1567,NB-314 
Pak. St. II,1568-1725,NB-315 
Pak. St. II,1726-1773,NB-316 
Pak. St. II,1774-1827,NB-318 
Pak. St. II,1828- 1857,NB-319 
Pak. St. II,1858- 1894,NB-320 
Pak. St. II,1895- 2042,PHY Seminar Room 
Pak. St. II,2043- 2137,PHY Jr. Theatre  
Pak. St. II,2138- 3408,EE Room 214 Seminar Hall 
Principles of Comm. I,All Students,Basement
Econ I,1594- 1751,NB-113
Econ I,1752-3247,NB-114
Comm. Geo. II,All Students,Basement (Row 1-4)
Economics II,All Students,Basement (Row 5-8)
Isl Std. I,001-170,Basement    
Ethics I,All Students,Basement
Isl Std. I,171-209,NB-101 
Isl Std. I,210-239,NB-102 
Isl Std. I,240-278,NB-103 
Isl Std. I,279-308,NB-105 
Isl Std. I,309-332,NB-106 
Isl Std. I,333-354,NB-107 
Isl Std. I,355-524,NB-113 
Isl Std. I,525-566,NB-114 
Isl Std. I,567-604,NB-201b 
Isl Std. I,605-643,NB-202 
Isl Std. I,644-688,NB-203 
Isl Std. I,689-727,NB-204 
Isl Std. I,728-767,NB-205  
Isl Std. I,768-794,NB-206 
Isl Std. I,795-818,NB-207A 
Isl Std. I,819-848,NB-208A 
Isl Std. I,849-1019,NB-209 
Isl Std. I,1020-1049,NB-210 
Isl Std. I,1050-1091,NB-213 
Isl Std. I,1092-1133,NB-214 
Isl Std. I,1134-1153,NB-301 
Isl Std. I,1154-1195,NB-302 
Isl Std. I,1196-1237,NB-303 
Isl Std. I,1238-1282,NB-304 
Isl Std. I,1283-1514,NB-305 
Isl Std. I,1515-1556,NB-306 
Isl Std. I,1557-1589,NB-307 
Isl Std. I,1590-1611,NB-308 
Isl Std. I,1612-1731,NB-310  
Isl Std. I,1732-1925,NB-311 
Isl Std. I,1926-1973,NB-312 
Isl Std. I,1974-2019,NB-313 
Isl Std. I,2020-2067,NB-314 
Isl Std. I,2068-3004,NB-315 
Isl Std. I,3005-3052,NB-316 
Isl Std. I,3053-3106,NB-318 
Isl Std. I,3107-3135,NB-319 
Isl Std. I,3136-3165,NB-320 
Isl Std. I,3166-3220,Chem. Deptt Seminar Hall 1st Floor 
Isl Std. I,3221-3302,CNLT 
Isl Std. I,3303-3357,PHY Seminar Room 
Isl Std. I,3358-3418,PHY Jr. Theatre 
Isl Std. I,3419-3510,BJLT 
Isl Std. I,3511-3621,BOT Lr. Room 2  
Isl Std. I,3622-3656,BOT Lr. Room 7 
Isl Std. I,3657-3706,EE Room 214 Seminar Hall 
Isl Std. I,3707-3741,EE Room 216 
Isl Std. I,3742-3777,BioTech Class Room IIB-1 
Isl Std. I,3779-3816,BioTech Class Room IIB-2 
,Subject,
History of Pakistan II,All Students,Basement (Row 1-5) 
History of Muslim India II,All Students,Basement (Row 6-7) 
Statistics II,All Students,Basement (Row 7-8)    
Chem I,001-170,Basement       
Chem I,171-209,NB-101 
Chem I,210-239,NB-102 
Chem I,240-278,NB-103 
Chem I,279-308,NB-105 
Chem I,309-332,NB-106 
Chem I,333-354,NB-107 
Chem I,355-527,NB-113 
Chem I,528-573,NB-114 
Chem I,574-614,NB-201B 
Chem I,615-657,NB-202 
Chem I,658-708,NB-203 
Chem I,709-750,NB-204 
Chem I,751-792,NB-205  
Chem I,793-821,NB-206 
Chem I,822-845,NB-207A 
Chem I,846- 1531,NB-208A 
Chem I,1712- 3031,NB-209 
Chem I,3032- 3062,NB-210 
Chem I,3063- 3104,NB-213 
Chem I,3105- 3149,NB-214 
Chem I,3150- 3169,NB-301 
Chem I,3170- 3217,NB-302 
Chem I,3218- 3263,NB-303 
Chem I,3264- 3340,NB-304 
Chem I,3341- 3388,NB-305 
Chem I,3389- 3431,NB-306 
Chem I,3432- 3468,NB-307 
Chem I,3470- 3498,NB-308 
Chem I,3499- 3749,NB-310 
Psy I,All Students,NB-311 
Physics II,001-171,Basement       
Physics II,172-211,NB-101 
Physics II,212-241,NB-102 
Physics II,242-279,NB-103 
Physics II,280-310,NB-105 
Physics II,311-332,NB-106 
Physics II,333-356,NB-107 
Physics II,357-398,NB-113 
Physics II,399-444,NB-114 
Physics II,445-513,NB-201 
Physics II,514-552,NB-202 
Physics II,553-598,NB-203 
Physics II,599-638,NB-204 
Physics II,639-678,NB-205  
Physics II,679-705,NB-206 
Physics II,706-729,NB-207 A 
Physics II,730-759,NB-208 A 
Physics II,760-801,NB-209  
Physics II,802-831,NB-210 
Physics II,832-873,NB-213 
Physics II,874-915,NB-214 
Physics II,916-935,NB-301 
Physics II,936-977,NB-302 
Physics II,978-1020,NB-303 
Physics II,1021-1065,NB-304 
Physics II,1066-1110,NB-305 
Physics II,1111-1152,NB-306 
Physics II,1153-1186,NB-307  
Physics II,1187-1208,NB-308 
Physics II,1209-1248,NB-310 
Physics II,1249-1294,NB-311  
Physics II,1295-2043,NB-312 
Physics II,2048-3408,NB-315 
Civics II,1322-1762,NB-313  
Civics II,1763-1837,NB-314 
Civics II,1840-2145,NB-316
Persian II,All Students,NB-316
Stat I,All Students,Basement       
Urdu II,001-171,Basement
Pak Culture II,All Students,Basement
Urdu II,172-210,NB-101 
Urdu II,211-240,NB-102 
Urdu II,241-279,NB-103 
Urdu II,280-309,NB-105 
Urdu II,310-333,NB-106 
Urdu II,334-356,NB-107 
Urdu II,357-398,NB-113 
Urdu II,399-444,NB-114 
Urdu II,445-513,NB-201 
Urdu II,514-552,NB-202 
Urdu II,553-598,NB-203 
Urdu II,599-637,NB-204  
Urdu II,638-677,NB-205 
Urdu II,678-704,NB-206 
Urdu II,705-728,NB-207 - A 
Urdu II,729-758,NB-208 - A 
Urdu II,759-800,NB-209 
Urdu II,801-830,NB-210 
Urdu II,831-872,NB-213 
Urdu II,873-914,NB-214 
Urdu II,915-934,NB-301 
Urdu II,935-976,NB-302 
Urdu II,977-1018,NB-303 
Urdu II,1019- 1063,NB-304 
Urdu II,1064- 1108,NB-305 
Urdu II,1109-1150,NB-306 
Urdu II,1151-1184,NB-307 
Urdu II,1185-1206,NB-308  
Urdu II,1207-1246,NB-310 
Urdu II,1247-1291,NB-311 
Urdu II,1292-1341,NB-312 
Urdu II,1342-1518,NB-313 
Urdu II,1519-1567,NB-314 
Urdu II,1568-1725,NB-315 
Urdu II,1726-1773,NB-316 
Urdu II,1774-1827,NB-318 
Urdu II,1828- 1857,NB-319 
Urdu II,1858- 1894,NB-320 
Urdu II,1895- 2042,PHY Seminar Room 
Urdu II,2043- 2137,PHY Jr. Theatre  
Urdu II,2138- 3408,EE Room 214 Seminar Hall  
Princ. of Account. I,All Students,Basement Row No (1-6)  
Phil. I,All Students,Basement Row No (7)    
Edu I,All Students,NB-113  
Princ. of Account. II,All Students,Basement     
Edu II,All Students,NB-203 
Phil. II,All Students,NB-204  
Urdu I,001-170,Basement    
Pak Culture I,All Students,Basement
Urdu I,171-209,NB-101 
Urdu I,210-239,NB-102 
Urdu I,240-278,NB-103 
Urdu I,279-308,NB-105 
Urdu I,309-332,NB-106 
Urdu I,333-354,NB-107 
Urdu I,355-524,NB-113 
Urdu I,525-566,NB-114 
Urdu I,567-604,NB-201b 
Urdu I,605-643,NB-202 
Urdu I,644-688,NB-203 
Urdu I,689-727,NB-204 
Urdu I,728-767,NB-205 
Urdu I,768-794,NB-206  
Urdu I,795-818,NB-207A 
Urdu I,819-848,NB-208A 
Urdu I,849-1019,NB-209 
Urdu I,1020- 1049,NB-210 
Urdu I,1050- 1091,NB-213 
Urdu I,1092- 1133,NB-214 
Urdu I,1134- 1153,NB-301 
Urdu I,1154- 1195,NB-302 
Urdu I,1196- 1237,NB-303 
Urdu I,1238- 1282,NB-304 
Urdu I,1283- 1514,NB-305 
Urdu I,1515- 1556,NB-306 
Urdu I,1557- 1589,NB-307 
Urdu I,1590- 1611,NB-308 
Urdu I,1612- 1731,NB-310 
Urdu I,1732- 1925,NB-311 
Urdu I,1926- 1973,NB-312 
Urdu I,1974-2019,NB-313 
Urdu I,2020-2067,NB-314  
Urdu I,2068-3004,NB-315 
Urdu I,3005- 3052,NB-316 
Urdu I,3053- 3106,NB-318 
Urdu I,3107- 3135,NB-319 
Urdu I,3136- 3165,NB-320 
Urdu I,3166- 3220,Chem. Deptt Seminar Hall 1st Floor 
Urdu I,3221- 3302,CNLT 
Urdu I,3303- 3357,PHY Seminar Room 
Urdu I,3358- 3418,PHY Jr. Theatre 
Urdu I,3419- 3510,BJLT 
Urdu I,3511- 3621,BOT Lr. Room 2 
Urdu I,3622- 3656,BOT Lr. Room 7 
Urdu I,3657- 3706,EE Room 214 Seminar Hall 
Urdu I,3707- 3741,EE Room 216 
Urdu I,3742- 3777,BioTech Class Room IIB-1 
Urdu I,3779- 3816,BioTech Class Room IIB-2 
Chem II,001-172,Basement       
Chem II,173-211,NB-101 
Chem II,212-241,NB-102 
Chem II,242-280,NB-103 
Chem II,281-310,NB-105 
Chem II,311-353,NB-113 
Chem II,354-395,NB-114 
Chem II,396-438,NB-201B 
Chem II,439-507,NB-202 
Chem II,508-552,NB-203 
Chem II,553-592,NB-204 
Chem II,593-633,NB-205 
Chem II,634-675,NB-209  
Chem II,676-705,NB-210 
Chem II,706-747,NB-213 
Chem II,748-789,NB-214 
Chem II,790-834,NB-302 
Chem II,835-877,NB-303 
Chem II,878-2049,NB-304 
Chem II,2050- 3205,NB-305 
Psy II,All Students,NB-306  
Physics I,001-170,Basement       
Physics I,171-209,NB-101 
Physics I,210-239,NB-102 
Physics I,240-278,NB-103 
Physics I,279-308,NB-105 
Physics I,309-332,NB-106 
Physics I,333-354,NB-107 
Physics I,355-524,NB-113 
Physics I,525-566,NB-114 
Physics I,567-604,NB- 201B 
Physics I,605-643,NB-202 
Physics I,644-688,NB-203 
Physics I,689-727,NB-204 
Physics I,728-767,NB-205  
Physics I,768-794,NB-206 
Physics I,795-818,NB- 207A 
Physics I,819-848,NB- 208A 
Physics I,849- 1019,NB-209 
Physics I,1020- 1050,NB-210 
Physics I,1051- 1093,NB-213 
Physics I,1094- 1135,NB-214 
Physics I,1136- 155,NB-301 
Physics I,1156- 1197,NB-302 
Physics I,1198- 1239,NB-303 
Physics I,1240- 1285,NB-304 
Physics I,1286- 2003,NB-305 
Physics I,2013- 3041,NB-306 
Physics I,3042-3074,NB-307 
Physics I,7075-3096,NB-308 
Physics I,3097-3134,NB-310 
Physics I,3135-3179,NB-311 
Physics I,3180-3233,NB-312  
Physics I,3234-3312,NB-313 
Physics I,3313-3361,NB-314 
Physics I,3362- 3414,NB-315 
Physics I,3415- 3465,NB-316 
Physics I,3466- 3526,NB-318 
Physics I,3527-3625,NB-319 
Physics I,3626-3655,NB-320 
Physics I,3656-3715,PHY Jr. Lect Theatre 
Physics I,3716-3771,PHY Seminar Hall 
Physics I,3772-3816,BJLT
Civics I,1289-1931,BJLT
Civics I,1934-2025,Chem Seminar Hall 
Civics I,2026-3385,EE Room 214 Seminar Hall 
Urdu Advance I,All Students,BJLT 
French I,All Students,BJLT
Al Quran II,001-171,Basement       
Al Quran II,172-210,NB-101 
Al Quran II,211-240,NB-102 
Al Quran II,241-279,NB-103 
Al Quran II,280-309,NB-105 
Al Quran II,310-333,NB-106 
Al Quran II,334-356,NB-107 
Al Quran II,357-398,NB-113 
Al Quran II,399-444,NB-114 
Al Quran II,445-513,NB-201 
Al Quran II,514-552,NB-202 
Al Quran II,553-598,NB-203  
Al Quran II,599-637,NB-204 
Al Quran II,638-677,NB-205 
Al Quran II,678-704,NB-206 
Al Quran II,705-728,NB-207 -A 
Al Quran II,729-758,NB-208 -A 
Al Quran II,759-800,NB-209 
Al Quran II,801-830,NB-210 
Al Quran II,831-872,NB-213 
Al Quran II,873-914,NB-214 
Al Quran II,915- 934,NB-301 
Al Quran II,935- 976,NB-302 
Al Quran II,977- 1018,NB-303 
Al Quran II,1019- 1063,NB-304 
Al Quran II,1064- 1108,NB-305 
Al Quran II,1109- 1150,NB-306 
Al Quran II,1151- 1184,NB-307  
Al Quran II,1185- 1206,NB-308 
Al Quran II,1207- 1246,NB-310 
Al Quran II,1247- 1291,NB-311 
Al Quran II,1292- 1341,NB-312 
Al Quran II,1342- 1518,NB-313 
Al Quran II,1519- 1567,NB-314 
Al Quran II,1568- 1725,NB-315 
Al Quran II,1726- 1773,NB-316 
Al Quran II,1774- 1827,NB-318 
Al Quran II,1828- 1857,NB-319 
Al Quran II,1858- 1894,NB-320 
Al Quran II,1895- 2042,PHY Seminar Room 
Al Quran II,2043- 2137,PHY Jr. Theatre  
Al Quran II,2138- 3408,EE Room 214 Seminar Hall  
Al Quran I,001-170,Basement    
Ethics I,All Students,Basement
Al Quran I,171-209,NB-101 
Al Quran I,210-239,NB-102 
Al Quran I,240-278,NB-103 
Al Quran I,279-308,NB-105 
Al Quran I,309-332,NB-106 
Al Quran I,333-354,NB-107 
Al Quran I,355-524,NB-113 
Al Quran I,525-566,NB-114 
Al Quran I,567-604,NB-201b 
Al Quran I,605-643,NB-202  
Al Quran I,644-688,NB-203 
Al Quran I,689-727,NB-204 
Al Quran I,728-767,NB-205 
Al Quran I,768-794,NB-206 
Al Quran I,795-818,NB-207A 
Al Quran I,819-848,NB-208A 
Al Quran I,849-1019,NB-209 
Al Quran I,1020- 1049,NB-210 
Al Quran I,1050- 1091,NB-213 
Al Quran I,1092- 1133,NB-214 
Al Quran I,1134- 1153,NB-301 
Al Quran I,1154- 1195,NB-302 
Al Quran I,1196- 1237,NB-303 
Al Quran I,1238- 1282,NB-304  
Al Quran I,1283- 1514,NB-305 
Al Quran I,1515- 1556,NB-306 
Al Quran I,1557- 1589,NB-307 
Al Quran I,1590- 1611,NB-308 
Al Quran I,1612- 1731,NB-310 
Al Quran I,1732- 1925,NB-311 
Al Quran I,1926- 1973,NB-312 
Al Quran I,1974-2019,NB-313 
Al Quran I,2020-2067,NB-314 
Al Quran I,2068-3004,NB-315 
Al Quran I,3005- 3052,NB-316 
Al Quran I,3053- 3106,NB-318 
Al Quran I,3107- 3135,NB-319 
Al Quran I,3136- 3165,NB-320  
Al Quran I,3166- 3220,Chem. Deptt Seminar Hall 1st Floor 
Al Quran I,3221- 3302,CNLT 
Al Quran I,3303- 3357,PHY Seminar Room 
Al Quran I,3358- 3418,PHY Jr. Theatre 
Al Quran I,3419- 3510,BJLT 
Al Quran I,3511- 3621,BOT Lr. Room 2 
Al Quran I,3622- 3656,BOT Lr. Room 7 
Al Quran I,3657- 3706,EE Room 214 Seminar Hall 
Al Quran I,3707- 3741,EE Room 216 
Al Quran I,3742- 3777,BioTech Class Room IIB-1 
Al Quran I,3779- 3816,BioTech Class Room IIB-2 
`;
