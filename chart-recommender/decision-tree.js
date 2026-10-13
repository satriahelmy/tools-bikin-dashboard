/* V1 question and rule data mirror docs/source/chart-recommender/DECISION_TREE.md. */
window.BDChartRecommenderTree = {
  "rootId": "ROOT-01",
  "intentLabels": {
    "comparison": "Perbandingan",
    "trend": "Tren",
    "distribution": "Sebaran",
    "relationship": "Hubungan",
    "composition": "Komposisi"
  },
  "questions": {
    "ROOT-01": {
      "id": "ROOT-01",
      "intent": null,
      "context": "Tujuan analisis",
      "question": "Apa yang ingin kamu tunjukkan dengan datamu?",
      "helper": "Pilih tujuan yang paling mendekati. Kamu bisa kembali dan mengubah jawaban kapan saja.",
      "answers": [
        {
          "id": "ROOT-CMP",
          "label": "Perbandingan",
          "helper": "Membandingkan nilai antar kategori, target, atau periode.",
          "next": "CMP-01"
        },
        {
          "id": "ROOT-TRD",
          "label": "Tren",
          "helper": "Melihat perubahan dari waktu ke waktu.",
          "next": "TRD-01"
        },
        {
          "id": "ROOT-DST",
          "label": "Sebaran",
          "helper": "Melihat bagaimana nilai tersebar.",
          "next": "DST-01"
        },
        {
          "id": "ROOT-REL",
          "label": "Hubungan",
          "helper": "Melihat hubungan antar variabel.",
          "next": "REL-01"
        },
        {
          "id": "ROOT-COM",
          "label": "Komposisi",
          "helper": "Melihat bagian dari suatu keseluruhan.",
          "next": "COM-01"
        }
      ]
    },
    "CMP-01": {
      "id": "CMP-01",
      "intent": "comparison",
      "context": "Perbandingan",
      "question": "Apa yang ingin kamu bandingkan?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-CATEGORIES",
          "label": "Nilai antar kategori",
          "next": "CMP-02",
          "helper": "Contoh: Sales antar outlet atau jumlah pelanggan per kota."
        },
        {
          "id": "CMP-BENCHMARK",
          "label": "Nilai dengan target atau benchmark",
          "next": "RULE-CMP-BULLET",
          "helper": "Contoh: Actual Sales dibanding Target Sales."
        },
        {
          "id": "CMP-TWO-PERIODS",
          "label": "Perubahan antara dua periode",
          "next": "CMP-06",
          "helper": "Contoh: Revenue 2025 dibanding 2026 untuk beberapa product category."
        },
        {
          "id": "CMP-CONTRIBUTION",
          "label": "Bagaimana beberapa kenaikan dan penurunan membentuk nilai akhir",
          "next": "RULE-CMP-WATERFALL",
          "helper": "Contoh: bagaimana Revenue, Cost, dan Expenses membentuk Profit."
        }
      ]
    },
    "CMP-02": {
      "id": "CMP-02",
      "intent": "comparison",
      "context": "Perbandingan › Kategori",
      "question": "Apakah lokasi geografis penting untuk memahami pola datanya?",
      "helper": "Pilih Ya jika posisi atau wilayah merupakan bagian penting dari insight, bukan hanya nama kategori.",
      "answers": [
        {
          "id": "CMP-GEO-YES",
          "label": "Ya, lokasi penting.",
          "next": "CMP-03"
        },
        {
          "id": "CMP-GEO-NO",
          "label": "Tidak, saya hanya ingin membandingkan kategorinya.",
          "next": "CMP-04"
        }
      ]
    },
    "CMP-03": {
      "id": "CMP-03",
      "intent": "comparison",
      "context": "Perbandingan › Lokasi",
      "question": "Data lokasimu berupa apa?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-GEO-REGION",
          "label": "Wilayah administratif",
          "next": "RULE-CMP-MAP-REGION",
          "helper": "Contoh: negara, provinsi, kota, atau kabupaten."
        },
        {
          "id": "CMP-GEO-POINT",
          "label": "Titik atau lokasi individual",
          "next": "RULE-CMP-MAP-POINT",
          "helper": "Contoh: outlet, cabang, fasilitas, atau koordinat latitude/longitude."
        }
      ]
    },
    "CMP-04": {
      "id": "CMP-04",
      "intent": "comparison",
      "context": "Perbandingan › Kategori",
      "question": "Berapa nilai (measure) yang ingin dibandingkan?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-MEASURE-ONE",
          "label": "Satu nilai",
          "next": "CMP-05",
          "helper": "Contoh: Sales."
        },
        {
          "id": "CMP-MEASURE-MULTIPLE",
          "label": "Lebih dari satu nilai",
          "next": "CMP-07",
          "helper": "Contoh: Sales dan Profit."
        }
      ]
    },
    "CMP-05": {
      "id": "CMP-05",
      "intent": "comparison",
      "context": "Perbandingan › Kategori",
      "question": "Berapa banyak kategori yang ingin dibandingkan?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-CAT-FEW",
          "label": "Sedikit",
          "next": "RULE-CMP-BAR-FEW",
          "helper": "Sekitar 2–5 kategori."
        },
        {
          "id": "CMP-CAT-SEVERAL",
          "label": "Beberapa",
          "next": "RULE-CMP-BAR-SEVERAL",
          "helper": "Sekitar 6–15 kategori."
        },
        {
          "id": "CMP-CAT-MANY",
          "label": "Banyak",
          "next": "RULE-CMP-BAR-MANY",
          "helper": "Lebih dari 15 kategori."
        }
      ]
    },
    "CMP-06": {
      "id": "CMP-06",
      "intent": "comparison",
      "context": "Perbandingan › Dua periode",
      "question": "Apakah perubahan ingin dibandingkan untuk satu nilai utama atau beberapa kategori?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-TWO-SINGLE",
          "label": "Satu nilai utama",
          "next": "RULE-CMP-TWO-SINGLE",
          "helper": "Contoh: total Revenue 2025 vs 2026."
        },
        {
          "id": "CMP-TWO-MULTIPLE",
          "label": "Beberapa kategori",
          "next": "RULE-CMP-SLOPE",
          "helper": "Contoh: Revenue 2025 vs 2026 untuk setiap product category."
        }
      ]
    },
    "CMP-07": {
      "id": "CMP-07",
      "intent": "comparison",
      "context": "Perbandingan › Beberapa nilai",
      "question": "Apakah nilai yang dibandingkan menggunakan unit atau skala yang sejenis?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-UNIT-SAME",
          "label": "Ya",
          "next": "CMP-08",
          "helper": "Contoh: Sales 2025 dan Sales 2026, keduanya dalam Rupiah."
        },
        {
          "id": "CMP-UNIT-DIFFERENT",
          "label": "Tidak",
          "next": "RULE-CMP-MULTI-DIFFERENT",
          "helper": "Contoh: Revenue dalam Rupiah dan Profit Margin dalam persen."
        }
      ]
    },
    "CMP-08": {
      "id": "CMP-08",
      "intent": "comparison",
      "context": "Perbandingan › Beberapa nilai",
      "question": "Berapa banyak kategori yang ingin dibandingkan?",
      "helper": "",
      "answers": [
        {
          "id": "CMP-MULTI-FEW",
          "label": "Sedikit",
          "next": "RULE-CMP-BAR-GROUPED"
        },
        {
          "id": "CMP-MULTI-MANY",
          "label": "Banyak",
          "next": "RULE-CMP-DOT-MULTI"
        }
      ]
    },
    "TRD-01": {
      "id": "TRD-01",
      "intent": "trend",
      "context": "Tren",
      "question": "Berapa banyak periode waktu yang ingin ditampilkan?",
      "helper": "",
      "answers": [
        {
          "id": "TRD-TWO",
          "label": "Hanya dua periode",
          "next": "TRD-02",
          "helper": "Contoh: 2025 vs 2026."
        },
        {
          "id": "TRD-FEW",
          "label": "Beberapa periode",
          "next": "TRD-03",
          "helper": "Contoh: Q1, Q2, Q3, Q4."
        },
        {
          "id": "TRD-MANY",
          "label": "Banyak periode",
          "next": "TRD-04",
          "helper": "Contoh: data bulanan selama beberapa tahun."
        }
      ]
    },
    "TRD-02": {
      "id": "TRD-02",
      "intent": "trend",
      "context": "Tren › Dua periode",
      "question": "Apakah kamu melihat satu nilai utama atau beberapa kategori?",
      "helper": "",
      "answers": [
        {
          "id": "TRD-TWO-SINGLE",
          "label": "Satu nilai utama",
          "next": "RULE-TRD-KPI"
        },
        {
          "id": "TRD-TWO-MULTIPLE",
          "label": "Beberapa kategori",
          "next": "RULE-TRD-SLOPE"
        }
      ]
    },
    "TRD-03": {
      "id": "TRD-03",
      "intent": "trend",
      "context": "Tren › Beberapa periode",
      "question": "Apa yang lebih ingin kamu tonjolkan?",
      "helper": "",
      "answers": [
        {
          "id": "TRD-FEW-PATTERN",
          "label": "Pola perubahan dari waktu ke waktu",
          "next": "RULE-TRD-LINE-FEW"
        },
        {
          "id": "TRD-FEW-COMPARE",
          "label": "Perbandingan nilai antarperiode",
          "next": "RULE-TRD-BAR"
        }
      ]
    },
    "TRD-04": {
      "id": "TRD-04",
      "intent": "trend",
      "context": "Tren › Banyak periode",
      "question": "Berapa banyak series yang ingin ditampilkan?",
      "helper": "Series dapat berupa product, region, outlet, atau metric yang memiliki garis masing-masing.",
      "answers": [
        {
          "id": "TRD-SERIES-ONE",
          "label": "Satu",
          "next": "TRD-05"
        },
        {
          "id": "TRD-SERIES-FEW",
          "label": "Beberapa",
          "next": "TRD-06"
        },
        {
          "id": "TRD-SERIES-MANY",
          "label": "Banyak",
          "next": "RULE-TRD-LINE-MANY"
        }
      ]
    },
    "TRD-05": {
      "id": "TRD-05",
      "intent": "trend",
      "context": "Tren › Satu series",
      "question": "Apakah area atau volume keseluruhan penting untuk ditonjolkan?",
      "helper": "",
      "answers": [
        {
          "id": "TRD-VOLUME-NO",
          "label": "Tidak, fokus pada pola perubahan.",
          "next": "RULE-TRD-LINE"
        },
        {
          "id": "TRD-VOLUME-YES",
          "label": "Ya.",
          "next": "RULE-TRD-AREA"
        }
      ]
    },
    "TRD-06": {
      "id": "TRD-06",
      "intent": "trend",
      "context": "Tren › Beberapa series",
      "question": "Apakah kamu ingin melihat bagaimana proporsi terhadap total berubah dari waktu ke waktu?",
      "helper": "",
      "answers": [
        {
          "id": "TRD-SHARE-YES",
          "label": "Ya",
          "next": "COM-03",
          "redirect": true
        },
        {
          "id": "TRD-SHARE-NO",
          "label": "Tidak",
          "next": "RULE-TRD-MULTILINE"
        }
      ]
    },
    "DST-01": {
      "id": "DST-01",
      "intent": "distribution",
      "context": "Sebaran",
      "question": "Data apa yang ingin kamu lihat distribusinya?",
      "helper": "",
      "answers": [
        {
          "id": "DST-CATEGORICAL",
          "label": "Kategori",
          "next": "RULE-DST-BAR",
          "helper": "Contoh: Product Category, Region, Payment Method."
        },
        {
          "id": "DST-NUMERIC",
          "label": "Nilai angka",
          "next": "DST-02",
          "helper": "Contoh: Sales, Age, Delivery Time."
        }
      ]
    },
    "DST-02": {
      "id": "DST-02",
      "intent": "distribution",
      "context": "Sebaran › Nilai numerik",
      "question": "Apa yang ingin kamu pahami dari nilai tersebut?",
      "helper": "",
      "answers": [
        {
          "id": "DST-SHAPE",
          "label": "Bentuk distribusinya",
          "next": "RULE-DST-HISTOGRAM",
          "helper": "Apakah nilai menumpuk pada rentang tertentu, miring, atau memiliki beberapa puncak?"
        },
        {
          "id": "DST-SPREAD",
          "label": "Spread dan potential outlier",
          "next": "RULE-DST-BOX",
          "helper": "Seberapa lebar variasinya dan apakah ada nilai yang jauh berbeda?"
        },
        {
          "id": "DST-GROUPS",
          "label": "Membandingkan distribusi antar kelompok",
          "next": "RULE-DST-BOX-GROUP",
          "helper": "Contoh: Delivery Time untuk beberapa region."
        }
      ]
    },
    "REL-01": {
      "id": "REL-01",
      "intent": "relationship",
      "context": "Hubungan",
      "question": "Data apa yang ingin kamu hubungkan?",
      "helper": "",
      "answers": [
        {
          "id": "REL-TWO-NUMERIC",
          "label": "Dua nilai angka",
          "next": "REL-02",
          "helper": "Contoh: Advertising Spend dan Sales."
        },
        {
          "id": "REL-NUM-CAT",
          "label": "Nilai angka dengan kategori",
          "next": "REL-03",
          "helper": "Contoh: Salary dan Department."
        },
        {
          "id": "REL-TWO-CAT",
          "label": "Dua kategori",
          "next": "REL-04",
          "helper": "Contoh: Membership Type dan Churn Status."
        },
        {
          "id": "REL-MANY-NUMERIC",
          "label": "Banyak nilai angka",
          "next": "RULE-REL-HEATMAP",
          "helper": "Contoh: Sales, Profit, Discount, Quantity, dan Cost."
        }
      ]
    },
    "REL-02": {
      "id": "REL-02",
      "intent": "relationship",
      "context": "Hubungan › Dua nilai numerik",
      "question": "Apakah ada nilai angka ketiga yang penting untuk ditampilkan?",
      "helper": "",
      "answers": [
        {
          "id": "REL-THIRD-NO",
          "label": "Tidak",
          "next": "RULE-REL-SCATTER"
        },
        {
          "id": "REL-THIRD-YES",
          "label": "Ya",
          "next": "RULE-REL-BUBBLE",
          "helper": "Contoh: X = Advertising Spend, Y = Sales, ukuran titik = Profit."
        }
      ]
    },
    "REL-03": {
      "id": "REL-03",
      "intent": "relationship",
      "context": "Hubungan › Nilai dan kategori",
      "question": "Apa yang ingin kamu lihat?",
      "helper": "",
      "answers": [
        {
          "id": "REL-NUMCAT-COMPARE",
          "label": "Membandingkan nilai antar kategori",
          "next": "CMP-04",
          "helper": "Contoh: Average Salary per Department.",
          "redirect": true
        },
        {
          "id": "REL-NUMCAT-DISTRIBUTION",
          "label": "Membandingkan distribusi antar kategori",
          "next": "RULE-DST-BOX-GROUP",
          "helper": "Contoh: sebaran Salary pada setiap Department."
        }
      ]
    },
    "REL-04": {
      "id": "REL-04",
      "intent": "relationship",
      "context": "Hubungan › Dua kategori",
      "question": "Berapa banyak kombinasi kategori yang perlu dibandingkan?",
      "helper": "",
      "answers": [
        {
          "id": "REL-CAT-FEW",
          "label": "Sedikit",
          "next": "RULE-REL-STACKED"
        },
        {
          "id": "REL-CAT-MANY",
          "label": "Banyak",
          "next": "RULE-REL-HEATMAP-CAT"
        }
      ]
    },
    "COM-01": {
      "id": "COM-01",
      "intent": "composition",
      "context": "Komposisi",
      "question": "Apakah kategori yang kamu punya benar-benar merupakan bagian dari satu keseluruhan?",
      "helper": "Contoh: persentase sales setiap kategori dari total sales.",
      "answers": [
        {
          "id": "COM-WHOLE-YES",
          "label": "Ya",
          "next": "COM-02"
        },
        {
          "id": "COM-WHOLE-NO",
          "label": "Tidak / tidak yakin",
          "next": "CMP-04",
          "redirect": true
        }
      ]
    },
    "COM-02": {
      "id": "COM-02",
      "intent": "composition",
      "context": "Komposisi › Rentang waktu",
      "question": "Apakah komposisinya ingin dilihat pada satu periode atau berubah sepanjang waktu?",
      "helper": "",
      "answers": [
        {
          "id": "COM-SINGLE",
          "label": "Satu periode",
          "next": "COM-04"
        },
        {
          "id": "COM-TIME",
          "label": "Berubah sepanjang waktu",
          "next": "COM-03"
        }
      ]
    },
    "COM-03": {
      "id": "COM-03",
      "intent": "composition",
      "context": "Komposisi › Perubahan komposisi",
      "question": "Apa yang ingin kamu lihat sepanjang waktu?",
      "helper": "",
      "answers": [
        {
          "id": "COM-ABSOLUTE",
          "label": "Nilai aktual setiap bagian sekaligus totalnya",
          "next": "COM-06"
        },
        {
          "id": "COM-SHARE",
          "label": "Persentase kontribusi setiap bagian terhadap total",
          "next": "COM-07"
        }
      ]
    },
    "COM-04": {
      "id": "COM-04",
      "intent": "composition",
      "context": "Komposisi › Jumlah bagian",
      "question": "Berapa banyak bagian yang membentuk keseluruhan?",
      "helper": "",
      "answers": [
        {
          "id": "COM-PART-FEW",
          "label": "Sedikit",
          "next": "COM-05",
          "helper": "Sekitar 2–5 bagian."
        },
        {
          "id": "COM-PART-SEVERAL",
          "label": "Beberapa",
          "next": "RULE-COM-BAR",
          "helper": "Sekitar 6–10 bagian."
        },
        {
          "id": "COM-PART-MANY",
          "label": "Banyak",
          "next": "COM-08",
          "helper": "Lebih dari 10 bagian."
        }
      ]
    },
    "COM-05": {
      "id": "COM-05",
      "intent": "composition",
      "context": "Komposisi › Prioritas",
      "question": "Apa yang lebih penting?",
      "helper": "",
      "answers": [
        {
          "id": "COM-CONTRIBUTION",
          "label": "Menunjukkan kontribusi setiap bagian terhadap total",
          "next": "RULE-COM-DONUT"
        },
        {
          "id": "COM-PRECISION",
          "label": "Membandingkan ukuran setiap bagian secara lebih presisi",
          "next": "RULE-COM-BAR-PRECISE"
        }
      ]
    },
    "COM-06": {
      "id": "COM-06",
      "intent": "composition",
      "context": "Komposisi › Nilai aktual",
      "question": "Berapa banyak periode waktu yang ingin ditampilkan?",
      "helper": "",
      "answers": [
        {
          "id": "COM-ABS-FEW",
          "label": "Beberapa periode",
          "next": "RULE-COM-STACKED"
        },
        {
          "id": "COM-ABS-MANY",
          "label": "Banyak periode",
          "next": "RULE-COM-AREA"
        }
      ]
    },
    "COM-07": {
      "id": "COM-07",
      "intent": "composition",
      "context": "Komposisi › Persentase",
      "question": "Berapa banyak periode waktu yang ingin ditampilkan?",
      "helper": "",
      "answers": [
        {
          "id": "COM-SHARE-FEW",
          "label": "Beberapa periode",
          "next": "RULE-COM-STACKED-100"
        },
        {
          "id": "COM-SHARE-MANY",
          "label": "Banyak periode",
          "next": "RULE-COM-AREA-100"
        }
      ]
    },
    "COM-08": {
      "id": "COM-08",
      "intent": "composition",
      "context": "Komposisi › Banyak bagian",
      "question": "Apa yang lebih penting untuk banyak kategori tersebut?",
      "helper": "",
      "answers": [
        {
          "id": "COM-MANY-OVERVIEW",
          "label": "Melihat gambaran kontribusi atau hierarchy",
          "next": "RULE-COM-TREEMAP"
        },
        {
          "id": "COM-MANY-PRECISE",
          "label": "Membandingkan nilai secara lebih presisi",
          "next": "RULE-COM-BAR-MANY"
        }
      ]
    }
  },
  "rules": {
    "RULE-CMP-BULLET": {
      "ruleId": "RULE-CMP-BULLET",
      "intent": "comparison",
      "recommended": "Bullet Chart",
      "variant": "",
      "why": "Kamu ingin membandingkan nilai aktual terhadap target atau benchmark. Bullet Chart membuat hubungan antara actual, target, dan performance range terlihat secara ringkas.",
      "tips": [
        "tampilkan actual sebagai nilai utama;",
        "gunakan marker yang jelas untuk target;",
        "gunakan performance range hanya jika memiliki arti bisnis;",
        "pertahankan skala yang konsisten saat membandingkan beberapa item."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Jangan menambahkan terlalu banyak performance bands jika tidak memiliki definisi yang jelas.",
      "guide": "bullet-chart"
    },
    "RULE-CMP-WATERFALL": {
      "ruleId": "RULE-CMP-WATERFALL",
      "intent": "comparison",
      "recommended": "Waterfall Chart",
      "variant": "",
      "why": "Kamu ingin menjelaskan bagaimana beberapa kenaikan dan penurunan berkontribusi terhadap nilai akhir.",
      "tips": [
        "mulai dari nilai awal yang jelas;",
        "pisahkan kontribusi positif dan negatif;",
        "tampilkan subtotal hanya jika membantu;",
        "akhiri dengan nilai akhir yang jelas."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Waterfall kurang efektif jika kontribusinya tidak memiliki urutan atau hubungan additive yang jelas.",
      "guide": "waterfall-chart"
    },
    "RULE-CMP-MAP-REGION": {
      "ruleId": "RULE-CMP-MAP-REGION",
      "intent": "comparison",
      "recommended": "Map",
      "variant": "Choropleth Map",
      "why": "Lokasi geografis merupakan bagian penting dari insight dan datamu mewakili wilayah administratif.",
      "tips": [
        "gunakan geographic boundaries yang sesuai;",
        "gunakan sequential color scale untuk magnitude;",
        "tampilkan legend yang jelas;",
        "pertimbangkan rate atau normalized value ketika ukuran wilayah/populasi berbeda."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Jika tujuan utamanya hanya mencari wilayah tertinggi atau terendah, Bar Chart biasanya lebih mudah dibandingkan secara presisi.",
      "guide": "map"
    },
    "RULE-CMP-MAP-POINT": {
      "ruleId": "RULE-CMP-MAP-POINT",
      "intent": "comparison",
      "recommended": "Map",
      "variant": "Point / Symbol Map",
      "why": "Kamu ingin melihat pola lokasi dari titik individual seperti outlet, cabang, atau fasilitas.",
      "tips": [
        "gunakan posisi geografis sebagai encoding utama;",
        "gunakan ukuran simbol hanya jika mewakili nilai yang meaningful;",
        "gunakan transparency jika banyak titik saling bertumpuk;",
        "pertahankan basemap tetap sederhana."
      ],
      "alternative": "Scatter Plot",
      "watchOut": "Terlalu banyak titik dapat menyebabkan overlap dan menyembunyikan pola.",
      "guide": "map"
    },
    "RULE-CMP-BAR-FEW": {
      "ruleId": "RULE-CMP-BAR-FEW",
      "intent": "comparison",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Bar Chart memberikan perbandingan yang sederhana dan presisi untuk sejumlah kecil kategori.",
      "tips": [
        "gunakan baseline zero;",
        "gunakan warna secara konsisten;",
        "highlight hanya kategori yang penting;",
        "gunakan data labels jika exact value diperlukan."
      ],
      "alternative": "Dot Plot",
      "watchOut": "",
      "guide": "bar-chart"
    },
    "RULE-CMP-BAR-SEVERAL": {
      "ruleId": "RULE-CMP-BAR-SEVERAL",
      "intent": "comparison",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Kamu membandingkan satu nilai pada beberapa kategori dan panjang bar masih mudah dibandingkan.",
      "tips": [
        "pertimbangkan orientasi horizontal jika label panjang;",
        "urutkan berdasarkan nilai jika ranking relevan;",
        "gunakan baseline zero;",
        "hindari warna berbeda untuk setiap kategori tanpa alasan."
      ],
      "alternative": "Dot Plot",
      "watchOut": "Pie atau Donut Chart akan semakin sulit dibandingkan ketika jumlah kategori bertambah.",
      "guide": "bar-chart"
    },
    "RULE-CMP-BAR-MANY": {
      "ruleId": "RULE-CMP-BAR-MANY",
      "intent": "comparison",
      "recommended": "Bar Chart",
      "variant": "Horizontal Bar Chart",
      "why": "Kamu memiliki banyak kategori. Orientasi horizontal memberikan ruang lebih besar untuk label dan membuat ranking lebih mudah dibaca.",
      "tips": [
        "gunakan horizontal orientation;",
        "sort berdasarkan nilai jika ranking penting;",
        "pertimbangkan Top N jika kategori terlalu banyak;",
        "highlight hanya kategori yang perlu perhatian."
      ],
      "alternative": "Dot Plot",
      "watchOut": "Jangan mencoba membedakan puluhan kategori menggunakan puluhan warna.",
      "guide": "bar-chart"
    },
    "RULE-CMP-TWO-SINGLE": {
      "ruleId": "RULE-CMP-TWO-SINGLE",
      "intent": "comparison",
      "recommended": "KPI / Big Number",
      "variant": "",
      "why": "Kamu hanya membandingkan satu nilai utama antara dua periode. Perubahan dapat disampaikan lebih langsung tanpa chart penuh.",
      "tips": [
        "tampilkan current value;",
        "tampilkan previous value atau percentage change;",
        "gunakan direction indicator jika relevan;",
        "berikan period context yang jelas."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Jangan menggunakan Line Chart hanya untuk dua titik jika tidak ada pola waktu yang perlu ditunjukkan.",
      "guide": ""
    },
    "RULE-CMP-SLOPE": {
      "ruleId": "RULE-CMP-SLOPE",
      "intent": "comparison",
      "recommended": "Slope Chart",
      "variant": "",
      "why": "Slope Chart membantu menunjukkan arah dan besarnya perubahan antar dua periode untuk beberapa kategori.",
      "tips": [
        "gunakan hanya dua titik waktu;",
        "gunakan direct labels;",
        "highlight perubahan penting;",
        "batasi jumlah series jika visual menjadi padat."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Terlalu banyak garis yang saling silang dapat membuat chart sulit dibaca.",
      "guide": "slope-chart"
    },
    "RULE-CMP-BAR-GROUPED": {
      "ruleId": "RULE-CMP-BAR-GROUPED",
      "intent": "comparison",
      "recommended": "Bar Chart",
      "variant": "Grouped Bar Chart",
      "why": "Beberapa nilai dengan unit sejenis dapat dibandingkan berdampingan untuk sejumlah kecil kategori.",
      "tips": [
        "pertahankan urutan series yang konsisten;",
        "batasi jumlah measure;",
        "gunakan baseline zero;",
        "gunakan legend atau direct labels yang jelas."
      ],
      "alternative": "Dot Plot",
      "watchOut": "Grouped Bar menjadi padat jika jumlah kategori atau measure terlalu banyak.",
      "guide": "bar-chart"
    },
    "RULE-CMP-DOT-MULTI": {
      "ruleId": "RULE-CMP-DOT-MULTI",
      "intent": "comparison",
      "recommended": "Dot Plot",
      "variant": "",
      "why": "Dot Plot dapat mengurangi visual weight ketika beberapa nilai dibandingkan pada banyak kategori.",
      "tips": [
        "gunakan axis yang sama;",
        "gunakan simbol atau warna secara konsisten;",
        "sort kategori jika ranking penting;",
        "gunakan horizontal layout untuk label panjang."
      ],
      "alternative": "Bar Chart",
      "watchOut": "",
      "guide": "dot-plot"
    },
    "RULE-CMP-MULTI-DIFFERENT": {
      "ruleId": "RULE-CMP-MULTI-DIFFERENT",
      "intent": "comparison",
      "recommended": "Separate Views",
      "variant": "",
      "why": "Nilai dengan unit atau skala berbeda lebih aman ditampilkan dalam visual terpisah daripada dipaksakan ke satu axis.",
      "tips": [
        "gunakan chart terpisah dengan alignment yang konsisten;",
        "pertahankan time/category context yang sama;",
        "letakkan visual berdekatan;",
        "gunakan clear titles dan units."
      ],
      "alternative": "Bar Chart / Line Chart, tergantung analytical context.",
      "watchOut": "Dual-axis chart dapat menghasilkan visual relationship yang tampak lebih kuat atau lemah tergantung skala axis.",
      "guide": ""
    },
    "RULE-TRD-KPI": {
      "ruleId": "RULE-TRD-KPI",
      "intent": "trend",
      "recommended": "KPI / Big Number",
      "variant": "",
      "why": "Hanya ada satu nilai utama pada dua periode sehingga perubahan dapat disampaikan lebih langsung sebagai current value dan change.",
      "tips": [],
      "alternative": "Bar Chart",
      "watchOut": "",
      "guide": ""
    },
    "RULE-TRD-SLOPE": {
      "ruleId": "RULE-TRD-SLOPE",
      "intent": "trend",
      "recommended": "Slope Chart",
      "variant": "",
      "why": "Dua periode dengan beberapa kategori cocok ditampilkan sebagai perubahan arah antar dua titik.",
      "tips": [],
      "alternative": "Bar Chart",
      "watchOut": "",
      "guide": "slope-chart"
    },
    "RULE-TRD-LINE-FEW": {
      "ruleId": "RULE-TRD-LINE-FEW",
      "intent": "trend",
      "recommended": "Line Chart",
      "variant": "",
      "why": "Fokusmu adalah pola perubahan antar beberapa periode, sehingga continuity antar titik waktu penting.",
      "tips": [
        "pertahankan chronological order;",
        "gunakan time interval yang konsisten;",
        "highlight perubahan penting;",
        "jangan memotong atau mengacak urutan waktu."
      ],
      "alternative": "Bar Chart",
      "watchOut": "",
      "guide": "line-chart"
    },
    "RULE-TRD-BAR": {
      "ruleId": "RULE-TRD-BAR",
      "intent": "trend",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Kamu lebih ingin membandingkan nilai antarperiode daripada menekankan continuity dari trend.",
      "tips": [
        "pertahankan urutan waktu;",
        "gunakan baseline zero;",
        "gunakan label periode yang jelas."
      ],
      "alternative": "Line Chart",
      "watchOut": "",
      "guide": "bar-chart"
    },
    "RULE-TRD-LINE": {
      "ruleId": "RULE-TRD-LINE",
      "intent": "trend",
      "recommended": "Line Chart",
      "variant": "",
      "why": "Line Chart efektif untuk menunjukkan pola perubahan satu series pada banyak titik waktu.",
      "tips": [
        "gunakan chronological axis;",
        "gunakan interval waktu yang konsisten;",
        "gunakan annotation untuk event penting;",
        "hindari unnecessary markers jika titik sangat banyak."
      ],
      "alternative": "Area Chart",
      "watchOut": "",
      "guide": "line-chart"
    },
    "RULE-TRD-AREA": {
      "ruleId": "RULE-TRD-AREA",
      "intent": "trend",
      "recommended": "Area Chart",
      "variant": "",
      "why": "Selain trend, kamu ingin menekankan magnitude atau volume sepanjang waktu.",
      "tips": [
        "gunakan baseline zero;",
        "pertahankan chronological axis;",
        "hindari terlalu banyak overlapping areas;",
        "gunakan Line Chart jika precise trend lebih penting daripada volume."
      ],
      "alternative": "Line Chart",
      "watchOut": "",
      "guide": "area-chart"
    },
    "RULE-TRD-MULTILINE": {
      "ruleId": "RULE-TRD-MULTILINE",
      "intent": "trend",
      "recommended": "Line Chart",
      "variant": "Multi-Line Chart",
      "why": "Beberapa series dengan time axis yang sama dapat dibandingkan melalui beberapa garis.",
      "tips": [
        "batasi jumlah warna;",
        "gunakan direct labels jika memungkinkan;",
        "highlight series utama;",
        "pertimbangkan filter jika series bertambah."
      ],
      "alternative": "Small Multiples",
      "watchOut": "Terlalu banyak garis dapat menghasilkan spaghetti chart.",
      "guide": "line-chart"
    },
    "RULE-TRD-LINE-MANY": {
      "ruleId": "RULE-TRD-LINE-MANY",
      "intent": "trend",
      "recommended": "Line Chart",
      "variant": "Filtered / Highlighted Multi-Line",
      "why": "Trend tetap menjadi analytical goal, tetapi banyak series tidak efektif jika semuanya diberi emphasis yang sama.",
      "tips": [
        "highlight series penting;",
        "gunakan filter atau interaction;",
        "tampilkan context series secara muted jika diperlukan;",
        "pertimbangkan small multiples."
      ],
      "alternative": "Small Multiples",
      "watchOut": "Jangan memberi warna berbeda yang sama kuatnya untuk puluhan garis.",
      "guide": "line-chart"
    },
    "RULE-DST-BAR": {
      "ruleId": "RULE-DST-BAR",
      "intent": "distribution",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Untuk data categorical, jumlah atau proporsi setiap kategori lebih mudah dibandingkan menggunakan panjang bar.",
      "tips": [],
      "alternative": "Dot Plot",
      "watchOut": "Histogram digunakan untuk numeric ranges, bukan categorical frequency.",
      "guide": "bar-chart"
    },
    "RULE-DST-HISTOGRAM": {
      "ruleId": "RULE-DST-HISTOGRAM",
      "intent": "distribution",
      "recommended": "Histogram",
      "variant": "",
      "why": "Histogram menunjukkan bagaimana nilai numerik tersebar ke dalam beberapa interval.",
      "tips": [
        "pilih bin size yang masuk akal;",
        "perhatikan skewness, cluster, gap, dan tails;",
        "tampilkan axis dengan unit yang jelas;",
        "coba beberapa bin size jika pola berubah drastis."
      ],
      "alternative": "Box Plot",
      "watchOut": "Bin yang terlalu sedikit atau terlalu banyak dapat menyembunyikan pola.",
      "guide": "histogram"
    },
    "RULE-DST-BOX": {
      "ruleId": "RULE-DST-BOX",
      "intent": "distribution",
      "recommended": "Box Plot",
      "variant": "",
      "why": "Box Plot merangkum median, spread, dan potential outlier secara compact.",
      "tips": [
        "jelaskan median jika audience belum familiar;",
        "gunakan skala yang konsisten;",
        "periksa potential outlier dalam konteks data;",
        "kombinasikan dengan raw points jika dataset kecil."
      ],
      "alternative": "Histogram",
      "watchOut": "Titik di luar whisker merupakan potential outlier dan tidak otomatis berarti data salah.",
      "guide": "box-plot"
    },
    "RULE-DST-BOX-GROUP": {
      "ruleId": "RULE-DST-BOX-GROUP",
      "intent": "distribution",
      "recommended": "Box Plot",
      "variant": "",
      "why": "Box Plot memudahkan perbandingan median, spread, dan potential outlier antar kelompok.",
      "tips": [
        "gunakan axis yang sama;",
        "sort groups jika meaningful;",
        "batasi jumlah groups;",
        "gunakan horizontal orientation jika labels panjang."
      ],
      "alternative": "Dot Plot",
      "watchOut": "Terlalu banyak groups akan membuat perbandingan sulit dibaca.",
      "guide": "box-plot"
    },
    "RULE-REL-SCATTER": {
      "ruleId": "RULE-REL-SCATTER",
      "intent": "relationship",
      "recommended": "Scatter Plot",
      "variant": "",
      "why": "Scatter Plot menunjukkan pola hubungan antara dua variabel numerik.",
      "tips": [
        "gunakan satu titik untuk satu observation;",
        "gunakan trend line hanya jika membantu;",
        "perhatikan cluster dan potential outlier;",
        "gunakan transparency jika titik sangat padat."
      ],
      "alternative": "",
      "watchOut": "Hubungan atau korelasi tidak otomatis menunjukkan sebab-akibat.",
      "guide": "scatter-plot"
    },
    "RULE-REL-BUBBLE": {
      "ruleId": "RULE-REL-BUBBLE",
      "intent": "relationship",
      "recommended": "Bubble Chart",
      "variant": "",
      "why": "Bubble Chart menambahkan nilai numerik ketiga melalui ukuran simbol pada hubungan dua variabel numerik.",
      "tips": [
        "gunakan bubble size hanya untuk nilai yang meaningful;",
        "batasi range ukuran;",
        "gunakan transparency jika overlap;",
        "tetap prioritaskan posisi X dan Y sebagai encoding utama."
      ],
      "alternative": "Scatter Plot",
      "watchOut": "Manusia lebih sulit membandingkan area bubble secara presisi dibanding posisi pada axis.",
      "guide": "bubble-chart"
    },
    "RULE-REL-STACKED": {
      "ruleId": "RULE-REL-STACKED",
      "intent": "relationship",
      "recommended": "Stacked Bar Chart",
      "variant": "100% Stacked Bar Chart",
      "why": "Untuk dua categorical variables dengan sedikit kombinasi, proporsi antar kelompok dapat dibandingkan secara compact.",
      "tips": [
        "gunakan 100% stacked jika fokus pada proportion;",
        "pertahankan urutan segment;",
        "batasi jumlah warna;",
        "gunakan labels jika proporsi penting."
      ],
      "alternative": "Heatmap",
      "watchOut": "Segment di tengah stacked bar lebih sulit dibandingkan secara presisi.",
      "guide": "stacked-bar-chart"
    },
    "RULE-REL-HEATMAP-CAT": {
      "ruleId": "RULE-REL-HEATMAP-CAT",
      "intent": "relationship",
      "recommended": "Heatmap",
      "variant": "",
      "why": "Heatmap lebih scalable ketika terdapat banyak kombinasi antara dua categorical variables.",
      "tips": [
        "gunakan color scale yang jelas;",
        "sort rows/columns jika membantu menemukan pola;",
        "tampilkan labels hanya jika masih readable;",
        "gunakan tooltip jika implementasi interaktif tersedia."
      ],
      "alternative": "Stacked Bar Chart",
      "watchOut": "",
      "guide": "heatmap"
    },
    "RULE-REL-HEATMAP": {
      "ruleId": "RULE-REL-HEATMAP",
      "intent": "relationship",
      "recommended": "Heatmap",
      "variant": "Correlation Heatmap",
      "why": "Correlation Heatmap membantu mengeksplorasi pola hubungan di antara banyak variabel numerik sekaligus.",
      "tips": [
        "gunakan consistent diverging scale jika correlation mencakup negatif dan positif;",
        "pertahankan scale yang simetris;",
        "tampilkan correlation values jika masih readable;",
        "gunakan clustering/order hanya jika meaningful."
      ],
      "alternative": "Scatter Plot untuk mengeksplorasi pasangan variabel tertentu.",
      "watchOut": "Correlation tidak membuktikan causation.",
      "guide": "heatmap"
    },
    "RULE-COM-DONUT": {
      "ruleId": "RULE-COM-DONUT",
      "intent": "composition",
      "recommended": "Donut Chart",
      "variant": "",
      "why": "Kamu memiliki sedikit bagian dan ingin menekankan kontribusi setiap bagian terhadap keseluruhan.",
      "tips": [
        "batasi jumlah slices;",
        "urutkan slices secara meaningful;",
        "tampilkan percentage atau value jika diperlukan;",
        "gunakan warna dengan restraint."
      ],
      "alternative": "Pie Chart · Secondary alternative: · Bar Chart",
      "watchOut": "Jika ukuran antarbagian sangat mirip dan precise comparison penting, Bar Chart lebih mudah dibaca.",
      "guide": "donut-chart"
    },
    "RULE-COM-BAR-PRECISE": {
      "ruleId": "RULE-COM-BAR-PRECISE",
      "intent": "composition",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Walaupun datamu merupakan part-to-whole, panjang bar lebih mudah dibandingkan secara presisi daripada sudut atau area.",
      "tips": [],
      "alternative": "Donut Chart",
      "watchOut": "",
      "guide": "bar-chart"
    },
    "RULE-COM-BAR": {
      "ruleId": "RULE-COM-BAR",
      "intent": "composition",
      "recommended": "Bar Chart",
      "variant": "",
      "why": "Jumlah bagian mulai cukup banyak sehingga perbandingan menggunakan panjang bar lebih mudah daripada Pie atau Donut.",
      "tips": [],
      "alternative": "Treemap",
      "watchOut": "Pie/Donut dengan banyak slices akan sulit dibaca dan dibandingkan.",
      "guide": "bar-chart"
    },
    "RULE-COM-BAR-MANY": {
      "ruleId": "RULE-COM-BAR-MANY",
      "intent": "composition",
      "recommended": "Bar Chart",
      "variant": "Sorted Horizontal Bar Chart",
      "why": "Untuk banyak bagian dengan kebutuhan precise comparison, Bar Chart memberikan baseline yang konsisten.",
      "tips": [
        "sort berdasarkan contribution;",
        "gunakan horizontal layout;",
        "pertimbangkan Top N + Others;",
        "gunakan labels yang jelas."
      ],
      "alternative": "Treemap",
      "watchOut": "",
      "guide": "bar-chart"
    },
    "RULE-COM-TREEMAP": {
      "ruleId": "RULE-COM-TREEMAP",
      "intent": "composition",
      "recommended": "Treemap",
      "variant": "",
      "why": "Treemap dapat menunjukkan relative contribution dari banyak bagian dan sangat berguna ketika terdapat hierarchy.",
      "tips": [
        "gunakan hierarchy yang meaningful;",
        "jangan menggunakan terlalu banyak level;",
        "gunakan labels hanya pada area yang cukup besar;",
        "gunakan warna untuk grouping atau meaningful metric, bukan dekorasi."
      ],
      "alternative": "Bar Chart",
      "watchOut": "Treemap kurang cocok jika user perlu membandingkan nilai yang sangat mirip secara presisi.",
      "guide": "treemap"
    },
    "RULE-COM-STACKED": {
      "ruleId": "RULE-COM-STACKED",
      "intent": "composition",
      "recommended": "Stacked Bar Chart",
      "variant": "",
      "why": "Kamu ingin melihat nilai aktual setiap bagian sekaligus perubahan total pada beberapa periode.",
      "tips": [
        "pertahankan urutan segment;",
        "gunakan warna yang konsisten;",
        "batasi jumlah categories;",
        "tempatkan segment terpenting pada baseline jika memungkinkan."
      ],
      "alternative": "Area Chart",
      "watchOut": "Segment yang tidak memiliki baseline yang sama lebih sulit dibandingkan antarperiode.",
      "guide": "stacked-bar-chart"
    },
    "RULE-COM-STACKED-100": {
      "ruleId": "RULE-COM-STACKED-100",
      "intent": "composition",
      "recommended": "Stacked Bar Chart",
      "variant": "100% Stacked Bar Chart",
      "why": "Kamu ingin melihat bagaimana persentase kontribusi setiap bagian berubah antarperiode.",
      "tips": [
        "setiap bar harus merepresentasikan 100%;",
        "pertahankan segment order;",
        "gunakan percentage labels jika membantu;",
        "batasi jumlah categories."
      ],
      "alternative": "Area Chart",
      "watchOut": "100% stacked chart menyembunyikan perubahan pada total absolute value.",
      "guide": "stacked-bar-chart"
    },
    "RULE-COM-AREA": {
      "ruleId": "RULE-COM-AREA",
      "intent": "composition",
      "recommended": "Area Chart",
      "variant": "Stacked Area Chart",
      "why": "Kamu ingin menunjukkan perubahan nilai aktual dari beberapa bagian sekaligus totalnya pada banyak titik waktu.",
      "tips": [
        "gunakan chronological axis;",
        "batasi jumlah layers;",
        "pertahankan layer order;",
        "gunakan Line Chart jika individual trend lebih penting daripada composition."
      ],
      "alternative": "Stacked Bar Chart",
      "watchOut": "Terlalu banyak layers membuat pola individual sulit diikuti.",
      "guide": "area-chart"
    },
    "RULE-COM-AREA-100": {
      "ruleId": "RULE-COM-AREA-100",
      "intent": "composition",
      "recommended": "Area Chart",
      "variant": "100% Stacked Area Chart",
      "why": "Kamu ingin melihat bagaimana share setiap bagian terhadap total berubah sepanjang banyak titik waktu.",
      "tips": [
        "normalize setiap periode menjadi 100%;",
        "pertahankan layer order;",
        "batasi jumlah categories;",
        "gunakan clear legend atau direct labels."
      ],
      "alternative": "Stacked Bar Chart",
      "watchOut": "Chart ini menunjukkan perubahan share, bukan perubahan absolute total.",
      "guide": "area-chart"
    }
  }
};
