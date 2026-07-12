# Kế hoạch 500 từ khóa NGẮN — Thiên Hoàng Kim

**Ngày lập:** 13/07/2026 · **Batch:** Short-KW (Plan D)

## 1. Mục tiêu

| Chỉ số | Giá trị |
|--------|---------|
| Số từ khóa | **500** |
| Độ dài | **1–4 từ** (head + short-tail) |
| Slug đã có trên site | 1337 |
| File JSON | `keyword-plan-short-500.json` |

**Khác batch 3 (long-tail 4–8 từ):** Tập trung **volume cao**, **brand discovery**, **local pack**, chuyển đổi nhanh (giá, đặt lịch).

## 2. Phân bổ intent

| Intent | Số KW | Mô tả |
|--------|-------|-------|
| short | 381 | |
| local | 63 | |
| price | 31 | |
| head | 25 | |

## 3. Phân bổ độ dài

| Số từ | Số KW |
|-------|-------|
| 1 từ | 25 |
| 2 từ | 233 |
| 3 từ | 187 |
| 4 từ | 55 |

## 4. Chiến lược trang đích

| Loại KW | Trang đích | Ví dụ |
|---------|------------|-------|
| Head 1 từ (nâng mũi, botox) | **Trang dịch vụ** + bài pillar | `/tham-my/nang-mui-hoang-kim` |
| Head + địa phương (nâng mũi q5) | **Bài tin** + CTA đặt lịch | `/tin-tuc/nang-mui-q5` |
| Giá ngắn (giá filler) | **Bảng giá** + bài giá | `/bang-gia` + `/tin-tuc/gia-filler` |
| Brand (thiên hoàng kim) | **Trang chủ / giới thiệu** | `/`, `/gioi-thieu` |
| So sánh ngắn | **Bài kiến thức** | `/tin-tuc/filler-botox` |

**Quy tắc chống cannibalization:**
- Slug trùng dịch vụ chính → **không** tạo `/tin-tuc/` (đã có SKIP_SLUGS)
- Head term → internal link về pillar trong 300 từ đầu
- Title: dùng `buildAttractiveMetaTitle` (intent price/local/head)

## 5. Lộ trình triển khai (10 tuần × 50 KW)

| Tuần | Nhóm | Số bài | Ưu tiên |
|------|------|--------|---------|
| 1 | SK1 + SK2 | 50 | Nâng mũi + Mí head |
| 2 | SK3 + SK4 | 50 | Filler + Botox head |
| 3 | SK5 + SK6 | 50 | Cấy tóc + Trẻ hóa |
| 4 | SK7 + SK8 | 50 | Da + Phun xăm/spa |
| 5 | SK9 + SK10 | 50 | Giá + Quận |
| 6 | SK11 + SK12 | 50 | An Đông + Nam |
| 7 | SK13 + SK14 | 50 | Brand + Mua |
| 8 | SK15 + SK16 | 50 | So sánh + Mụn |
| 9 | SK17 + SK18 | 50 | Nám + Xu hướng |
| 10 | SK19 + SK20 | 50 | Thời điểm + Câu hỏi |

## 6. KPI theo dõi (Search Console)

- Impression tăng trên head term (nâng mũi, filler, botox tphcm)
- CTR meta title ≥ 3% trên nhóm giá & local
- Top 10 trong 90 ngày: 30% nhóm local (q5, an đông)
- Top 20 trong 90 ngày: 50% nhóm giá ngắn

## 7. Cách triển khai kỹ thuật

```bash
# 1. Validate plan
node scripts/build-keyword-plan-short-500.mjs

# 2. Merge vào site (sau khi review)
# Thêm plan-short vào merge-keyword-plans.mjs hoặc plan4

# 3. Build → sinh bài + prerender + IndexNow
npm run build
```

## 8. Danh sách theo nhóm


### SK1 — Head term — Nâng mũi (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 1 | nâng mũi | `nang-mui-sk` | /tham-my/nang-mui-hoang-kim |
| 2 | nâng mũi tphcm | `nang-mui-tphcm-sk` | /tham-my/nang-mui-hoang-kim |
| 3 | nâng mũi giá | `nang-mui-gia-sk` | /tham-my/nang-mui-hoang-kim |
| 4 | nâng mũi uy tín | `nang-mui-uy-tin-sk` | /tham-my/nang-mui-hoang-kim |
| 5 | nâng mũi đẹp | `nang-mui-dep` | /tham-my/nang-mui-hoang-kim |
| 6 | nâng mũi tự nhiên | `nang-mui-tu-nhien-sk` | /tham-my/nang-mui-hoang-kim |
| 7 | nâng mũi cấu trúc | `nang-mui-cau-truc-sk` | /tham-my/nang-mui-hoang-kim |
| 8 | nâng mũi sụn | `nang-mui-sun-sk` | /tham-my/nang-mui-hoang-kim |
| 9 | nâng mũi hàn | `nang-mui-han` | /tham-my/nang-mui-hoang-kim |
| 10 | nâng mũi s line | `nang-mui-s-line-sk` | /tham-my/nang-mui-hoang-kim |
| 11 | phẫu thuật mũi | `phau-thuat-mui-sk` | /tham-my/nang-mui-hoang-kim |
| 12 | mũi đẹp | `mui-dep` | /tham-my/nang-mui-hoang-kim |
| 13 | sửa mũi | `sua-mui-sk` | /tham-my/nang-mui-hoang-kim |
| 14 | mũi hỏng | `mui-hong` | /tham-my/nang-mui-hoang-kim |
| 15 | thu gọn cánh mũi | `thu-gon-canh-mui-sk` | /tham-my/nang-mui-hoang-kim |
| 16 | nâng sống mũi | `nang-song-mui-sk` | /tham-my/nang-mui-hoang-kim |
| 17 | đầu mũi | `dau-mui` | /tham-my/nang-mui-hoang-kim |
| 18 | nâng mũi nam | `nang-mui-nam-sk` | /tham-my/nang-mui-hoang-kim |
| 19 | nâng mũi nữ | `nang-mui-nu-sk` | /tham-my/nang-mui-hoang-kim |
| 20 | nâng mũi an đông | `nang-mui-an-dong-sk` | /tham-my/nang-mui-hoang-kim |
| 21 | nâng mũi q5 | `nang-mui-q5` | /tham-my/nang-mui-hoang-kim |
| 22 | nâng mũi q6 | `nang-mui-q6` | /tham-my/nang-mui-hoang-kim |
| 23 | nâng mũi chợ lớn | `nang-mui-cho-lon-sk` | /tham-my/nang-mui-hoang-kim |
| 24 | clinic nâng mũi | `clinic-nang-mui` | /lien-he |
| 25 | bác sĩ nâng mũi | `bac-si-nang-mui` | /tham-my/nang-mui-hoang-kim |

### SK2 — Head term — Mắt & mí (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 26 | cắt mí | `cat-mi-sk` | /tham-my/cat-mi-phuong-hoang |
| 27 | cắt mí tphcm | `cat-mi-tphcm-sk` | /tham-my/cat-mi-phuong-hoang |
| 28 | cắt mí giá | `cat-mi-gia` | /tham-my/cat-mi-phuong-hoang |
| 29 | cắt mí đẹp | `cat-mi-dep` | /tham-my/cat-mi-phuong-hoang |
| 30 | cắt mí tự nhiên | `cat-mi-tu-nhien-sk` | /tham-my/cat-mi-phuong-hoang |
| 31 | nhấn mí | `nhan-mi-sk` | /tham-my/cat-mi-phuong-hoang |
| 32 | bấm mí | `bam-mi-sk` | /tham-my/cat-mi-phuong-hoang |
| 33 | mí mắt | `mi-mat-sk` | /tham-my/cat-mi-phuong-hoang |
| 34 | mắt to | `mat-to-sk` | /tham-my/cat-mi-phuong-hoang |
| 35 | mở góc mắt | `mo-goc-mat-sk` | /tham-my/cat-mi-phuong-hoang |
| 36 | lấy mỡ mí | `lay-mo-mi-sk` | /tham-my/cat-mi-phuong-hoang |
| 37 | cắt mí nam | `cat-mi-nam-sk` | /tham-my/cat-mi-phuong-hoang |
| 38 | cắt mí nữ | `cat-mi-nu-sk` | /tham-my/cat-mi-phuong-hoang |
| 39 | cắt mí an đông | `cat-mi-an-dong-sk` | /tham-my/cat-mi-phuong-hoang |
| 40 | cắt mí q5 | `cat-mi-q5` | /tham-my/cat-mi-phuong-hoang |
| 41 | phẫu thuật mí | `phau-thuat-mi` | /tham-my/cat-mi-phuong-hoang |
| 42 | sửa mí | `sua-mi` | /tham-my/cat-mi-phuong-hoang |
| 43 | mí lót | `mi-lot-sk` | /tham-my/cat-mi-phuong-hoang |
| 44 | mí một bầu | `mi-mot-bau` | /tham-my/cat-mi-phuong-hoang |
| 45 | mắt sụp | `mat-sup-sk` | /tham-my/cat-mi-phuong-hoang |
| 46 | thâm mắt | `tham-mat-sk` | /tham-my/cat-mi-phuong-hoang |
| 47 | bọng mắt | `bong-mat-sk` | /tham-my/cat-mi-phuong-hoang |
| 48 | cắt mí laser | `cat-mi-laser-sk` | /tham-my/cat-mi-phuong-hoang |
| 49 | cắt mí hàn | `cat-mi-han` | /tham-my/cat-mi-phuong-hoang |
| 50 | cắt mí uy tín | `cat-mi-uy-tin-sk` | /tham-my/cat-mi-phuong-hoang |

### SK3 — Head term — Filler (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 51 | filler | `filler-sk` | /tham-my/filler-tao-hinh |
| 52 | filler tphcm | `filler-tphcm-sk` | /tham-my/filler-tao-hinh |
| 53 | filler giá | `filler-gia-sk` | /tham-my/filler-tao-hinh |
| 54 | tiêm filler | `tiem-filler-sk` | /tham-my/filler-tao-hinh |
| 55 | filler môi | `filler-moi-sk` | /tham-my/filler-tao-hinh |
| 56 | filler mũi | `filler-mui-sk` | /tham-my/filler-tao-hinh |
| 57 | filler cằm | `filler-cam-sk` | /tham-my/filler-tao-hinh |
| 58 | filler má | `filler-ma-sk` | /tham-my/filler-tao-hinh |
| 59 | filler trán | `filler-tran-sk` | /tham-my/filler-tao-hinh |
| 60 | filler mắt | `filler-mat-sk` | /tham-my/filler-tao-hinh |
| 61 | filler nam | `filler-nam-sk` | /tham-my/filler-tao-hinh |
| 62 | filler nữ | `filler-nu-sk` | /tham-my/filler-tao-hinh |
| 63 | filler uy tín | `filler-uy-tin-sk` | /tham-my/filler-tao-hinh |
| 64 | filler đẹp | `filler-dep` | /tham-my/filler-tao-hinh |
| 65 | filler tự nhiên | `filler-tu-nhien-sk` | /tham-my/filler-tao-hinh |
| 66 | filler an đông | `filler-an-dong` | /tham-my/filler-tao-hinh |
| 67 | filler q5 | `filler-q5` | /tham-my/filler-tao-hinh |
| 68 | juvederm | `juvederm` | /tham-my/filler-tao-hinh |
| 69 | restylane | `restylane` | /tham-my/filler-tao-hinh |
| 70 | filler hàn | `filler-han` | /tham-my/filler-tao-hinh |
| 71 | tiêm môi | `tiem-moi-sk` | /tham-my/filler-tao-hinh |
| 72 | tiêm cằm | `tiem-cam` | /tham-my/filler-tao-hinh |
| 73 | môi đẹp | `moi-dep-sk` | /tham-my/filler-tao-hinh |
| 74 | vline filler | `vline-filler` | /tham-my/filler-tao-hinh |
| 75 | full face filler | `full-face-filler` | /tham-my/filler-tao-hinh |

### SK4 — Head term — Botox (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 76 | botox | `botox-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 77 | botox tphcm | `botox-tphcm-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 78 | botox giá | `botox-gia-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 79 | tiêm botox | `tiem-botox-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 80 | botox trán | `botox-tran-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 81 | botox mắt | `botox-mat-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 82 | botox hàm | `botox-ham-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 83 | botox cằm | `botox-cam-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 84 | botox môi | `botox-moi` | /tham-my/botox-xoa-nhan-gon-ham |
| 85 | botox cổ | `botox-co-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 86 | botox nam | `botox-nam-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 87 | botox nữ | `botox-nu-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 88 | botox uy tín | `botox-uy-tin-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 89 | botox đẹp | `botox-dep` | /tham-my/botox-xoa-nhan-gon-ham |
| 90 | botox an đông | `botox-an-dong` | /tham-my/botox-xoa-nhan-gon-ham |
| 91 | botox q5 | `botox-q5` | /tham-my/botox-xoa-nhan-gon-ham |
| 92 | botox allergan | `botox-allergan-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 93 | botox dysport | `botox-dysport-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 94 | xóa nhăn | `xoa-nhan-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 95 | gọn hàm | `gon-ham-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 96 | thon hàm | `thon-ham` | /tham-my/botox-xoa-nhan-gon-ham |
| 97 | vline botox | `vline-botox` | /tham-my/botox-xoa-nhan-gon-ham |
| 98 | botox masseter | `botox-masseter-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 99 | tiêm hàm | `tiem-ham` | /tham-my/botox-xoa-nhan-gon-ham |
| 100 | nếp nhăn | `nep-nhan-sk` | /tham-my/botox-xoa-nhan-gon-ham |

### SK5 — Head term — Cấy tóc (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 101 | cấy tóc | `cay-toc-sk` | /tham-my/cay-toc-tu-than |
| 102 | cấy tóc tphcm | `cay-toc-tphcm-sk` | /tham-my/cay-toc-tu-than |
| 103 | cấy tóc giá | `cay-toc-gia-sk` | /tham-my/cay-toc-tu-than |
| 104 | cấy tóc fue | `cay-toc-fue-sk` | /tham-my/cay-toc-tu-than |
| 105 | cấy tóc fut | `cay-toc-fut-sk` | /tham-my/cay-toc-tu-than |
| 106 | hói đầu | `hoi-dau-sk` | /tham-my/cay-toc-tu-than |
| 107 | rụng tóc | `rung-toc-sk` | /tham-my/cay-toc-tu-than |
| 108 | trị hói | `tri-hoi` | /tham-my/cay-toc-tu-than |
| 109 | cấy tóc nam | `cay-toc-nam-sk` | /tham-my/cay-toc-tu-than |
| 110 | cấy tóc nữ | `cay-toc-nu-sk` | /tham-my/cay-toc-tu-than |
| 111 | cấy tóc uy tín | `cay-toc-uy-tin-sk` | /tham-my/cay-toc-tu-than |
| 112 | cấy tóc an đông | `cay-toc-an-dong` | /tham-my/cay-toc-tu-than |
| 113 | cấy tóc q5 | `cay-toc-q5` | /tham-my/cay-toc-tu-than |
| 114 | ghép tóc | `ghep-toc-sk` | /tham-my/cay-toc-tu-than |
| 115 | mọc tóc | `moc-toc` | /tham-my/cay-toc-tu-than |
| 116 | đường chữ m | `duong-chu-m` | /tham-my/cay-toc-tu-than |
| 117 | hói đỉnh | `hoi-dinh` | /tham-my/cay-toc-tu-than |
| 118 | hói trán | `hoi-tran` | /tham-my/cay-toc-tu-than |
| 119 | prp tóc | `prp-toc-sk` | /tham-my/cay-toc-tu-than |
| 120 | meso tóc | `meso-toc` | /tham-my/cay-toc-tu-than |
| 121 | cấy tóc đẹp | `cay-toc-dep` | /tham-my/cay-toc-tu-than |
| 122 | bác sĩ cấy tóc | `bac-si-cay-toc` | /tham-my/cay-toc-tu-than |
| 123 | clinic cấy tóc | `clinic-cay-toc` | /lien-he |
| 124 | cấy tóc hàn | `cay-toc-han` | /tham-my/cay-toc-tu-than |
| 125 | cấy tóc tự thân | `cay-toc-tu-than-sk` | /tham-my/cay-toc-tu-than |

### SK6 — Head term — Trẻ hóa & căng (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 126 | căng chỉ | `cang-chi-sk` | /tham-my/cang-chi-tre-hoa |
| 127 | căng chỉ tphcm | `cang-chi-tphcm-sk` | /tham-my/cang-chi-tre-hoa |
| 128 | căng chỉ giá | `cang-chi-gia` | /tham-my/cang-chi-tre-hoa |
| 129 | căng da | `cang-da-sk` | /tham-my/cang-chi-tre-hoa |
| 130 | trẻ hóa da | `tre-hoa-da-sk` | /tham-my/cang-chi-tre-hoa |
| 131 | căng nội soi | `cang-noi-soi-sk` | /tham-my/cang-chi-tre-hoa |
| 132 | hifu | `hifu` | /tham-my/cang-chi-tre-hoa |
| 133 | thermage | `thermage` | /tham-my/cang-chi-tre-hoa |
| 134 | ultherapy | `ultherapy` | /tham-my/cang-chi-tre-hoa |
| 135 | nâng cơ mặt | `nang-co-mat-sk` | /tham-my/cang-chi-tre-hoa |
| 136 | pdo thread | `pdo-thread` | /tham-my/cang-chi-tre-hoa |
| 137 | căng mặt | `cang-mat` | /tham-my/cang-chi-tre-hoa |
| 138 | trẻ hóa mặt | `tre-hoa-mat-sk` | /tham-my/cang-chi-tre-hoa |
| 139 | xóa nhăn mặt | `xoa-nhan-mat` | /tham-my/botox-xoa-nhan-gon-ham |
| 140 | săn chắc da | `san-chac-da-sk` | /tham-my/cang-chi-tre-hoa |
| 141 | căng chỉ pdo | `cang-chi-pdo-sk` | /tham-my/cang-chi-tre-hoa |
| 142 | căng chỉ uy tín | `cang-chi-uy-tin` | /tham-my/cang-chi-tre-hoa |
| 143 | căng chỉ an đông | `cang-chi-an-dong` | /tham-my/cang-chi-tre-hoa |
| 144 | căng chỉ q5 | `cang-chi-q5` | /tham-my/cang-chi-tre-hoa |
| 145 | facelift | `facelift` | /tham-my/cang-chi-tre-hoa |
| 146 | mini facelift | `mini-facelift-sk` | /tham-my/cang-chi-tre-hoa |
| 147 | tre hóa tphcm | `tre-hoa-tphcm` | /tham-my/cang-chi-tre-hoa |
| 148 | chống lão hóa | `chong-lao-hoa` | /tham-my/cang-chi-tre-hoa |
| 149 | nếp nhăn mặt | `nep-nhan-mat` | /tham-my/cang-chi-tre-hoa |
| 150 | da chảy xệ | `da-chay-xe-sk` | /spa/cham-soc-da-toan-dien |

### SK7 — Head term — Da & spa (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 151 | trị mụn | `tri-mun-sk` | /spa/cham-soc-da-toan-dien |
| 152 | trị nám | `tri-nam-sk` | /spa/cham-soc-da-toan-dien |
| 153 | trị tàn nhang | `tri-tan-nhang-sk` | /spa/cham-soc-da-toan-dien |
| 154 | trị thâm | `tri-tham` | /spa/cham-soc-da-toan-dien |
| 155 | trị sẹo | `tri-seo` | /spa/cham-soc-da-toan-dien |
| 156 | chăm sóc da | `cham-soc-da-sk` | /spa/cham-soc-da-toan-dien |
| 157 | peel da | `peel-da-sk` | /spa/cham-soc-da-toan-dien |
| 158 | laser da | `laser-da` | /spa/cham-soc-da-toan-dien |
| 159 | facial | `facial-sk` | /spa/cham-soc-da-toan-dien |
| 160 | hydrafacial | `hydrafacial-sk` | /spa/cham-soc-da-toan-dien |
| 161 | soi da | `soi-da` | /spa/cham-soc-da-toan-dien |
| 162 | da đẹp | `da-dep` | /spa/cham-soc-da-toan-dien |
| 163 | trắng da | `trang-da` | /spa/cham-soc-da-toan-dien |
| 164 | sáng da | `sang-da-sk` | /spa/cham-soc-da-toan-dien |
| 165 | mụn ẩn | `mun-an-sk` | /spa/cham-soc-da-toan-dien |
| 166 | nám da | `nam-da-sk` | /spa/cham-soc-da-toan-dien |
| 167 | melasma | `melasma-sk` | /spa/cham-soc-da-toan-dien |
| 168 | tàn nhang | `tan-nhang-sk` | /spa/cham-soc-da-toan-dien |
| 169 | lỗ chân lông | `lo-chan-long-sk` | /spa/cham-soc-da-toan-dien |
| 170 | da dầu | `da-dau-sk` | /spa/cham-soc-da-toan-dien |
| 171 | da khô | `da-kho-sk` | /spa/cham-soc-da-toan-dien |
| 172 | da nhạy cảm | `da-nhay-cam-sk` | /spa/cham-soc-da-toan-dien |
| 173 | spa da | `spa-da` | /spa/massage-body-thu-gian |
| 174 | điều trị da | `dieu-tri-da-sk` | /spa/cham-soc-da-toan-dien |
| 175 | skincare tphcm | `skincare-tphcm` | /spa/cham-soc-da-toan-dien |

### SK8 — Head term — Phun xăm & spa body (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 176 | phun mày | `phun-may-sk` | /spa/phun-xam-tham-my |
| 177 | phun môi | `phun-moi-sk` | /spa/phun-xam-tham-my |
| 178 | phun mí | `phun-mi-sk` | /spa/phun-xam-tham-my |
| 179 | xăm mày | `xam-may-sk` | /spa/phun-xam-tham-my |
| 180 | xăm môi | `xam-moi-sk` | /spa/phun-xam-tham-my |
| 181 | phun xăm | `phun-xam` | /spa/phun-xam-tham-my |
| 182 | phun xăm tphcm | `phun-xam-tphcm-sk` | /spa/phun-xam-tham-my |
| 183 | phun xăm giá | `phun-xam-gia` | /spa/phun-xam-tham-my |
| 184 | điêu khắc mày | `dieu-khac-may-sk` | /spa/phun-xam-tham-my |
| 185 | điêu khắc môi | `dieu-khac-moi` | /spa/phun-xam-tham-my |
| 186 | xóa xăm | `xoa-xam-sk` | /spa/phun-xam-tham-my |
| 187 | xóa phun | `xoa-phun` | /spa/phun-xam-tham-my |
| 188 | eyeliner phun | `eyeliner-phun-sk` | /spa/phun-xam-tham-my |
| 189 | phun mày nam | `phun-may-nam-sk` | /spa/phun-xam-tham-my |
| 190 | phun môi nam | `phun-moi-nam-sk` | /spa/phun-xam-tham-my |
| 191 | massage body | `massage-body-sk` | /spa/massage-body-thu-gian |
| 192 | massage mặt | `massage-mat-sk` | /spa/massage-body-thu-gian |
| 193 | spa tphcm | `spa-tphcm` | /spa/massage-body-thu-gian |
| 194 | spa q5 | `spa-q5` | /spa/massage-body-thu-gian |
| 195 | spa an đông | `spa-an-dong-sk` | /spa/massage-body-thu-gian |
| 196 | ủ đá muối | `u-da-muoi-sk` | /spa/massage-body-thu-gian |
| 197 | himalaya spa | `himalaya-spa-sk` | /spa/massage-body-thu-gian |
| 198 | gội đầu dưỡng | `goi-dau-duong` | /spa/massage-body-thu-gian |
| 199 | body spa | `body-spa` | /spa/phun-xam-tham-my |
| 200 | thư giãn spa | `thu-gian-spa` | /spa/phun-xam-tham-my |

### SK9 — Giá ngắn — Thẩm mỹ (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 201 | giá nâng mũi | `gia-nang-mui-sk` | /bang-gia |
| 202 | giá cắt mí | `gia-cat-mi-sk` | /bang-gia |
| 203 | giá filler | `gia-filler-sk` | /bang-gia |
| 204 | giá botox | `gia-botox-sk` | /bang-gia |
| 205 | giá cấy tóc | `gia-cay-toc-sk` | /bang-gia |
| 206 | giá căng chỉ | `gia-cang-chi-sk` | /bang-gia |
| 207 | giá hifu | `gia-hifu-sk` | /bang-gia |
| 208 | giá phun mày | `gia-phun-may-sk` | /bang-gia |
| 209 | giá phun môi | `gia-phun-moi-sk` | /bang-gia |
| 210 | giá trị mụn | `gia-tri-mun` | /bang-gia |
| 211 | giá trị nám | `gia-tri-nam` | /bang-gia |
| 212 | giá peel | `gia-peel` | /bang-gia |
| 213 | giá laser | `gia-laser` | /bang-gia |
| 214 | giá massage | `gia-massage-sk` | /bang-gia |
| 215 | giá spa | `gia-spa` | /bang-gia |
| 216 | bảng giá thẩm mỹ | `bang-gia-tham-my-sk` | /bang-gia |
| 217 | báo giá nâng mũi | `bao-gia-nang-mui` | /bang-gia |
| 218 | báo giá filler | `bao-gia-filler` | /bang-gia |
| 219 | báo giá botox | `bao-gia-botox` | /bang-gia |
| 220 | chi phí nâng mũi | `chi-phi-nang-mui-sk` | /bang-gia |
| 221 | chi phí cắt mí | `chi-phi-cat-mi-sk` | /bang-gia |
| 222 | chi phí filler | `chi-phi-filler-sk` | /bang-gia |
| 223 | chi phí botox | `chi-phi-botox-sk` | /bang-gia |
| 224 | giá thẩm mỹ | `gia-tham-my` | /bang-gia |
| 225 | giá làm đẹp | `gia-lam-dep` | /bang-gia |

### SK10 — Local ngắn — Quận TP.HCM (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 226 | thẩm mỹ q1 | `tham-my-q1` | /lien-he |
| 227 | thẩm mỹ q3 | `tham-my-q3` | /lien-he |
| 228 | thẩm mỹ q5 | `tham-my-q5` | /lien-he |
| 229 | thẩm mỹ q6 | `tham-my-q6` | /lien-he |
| 230 | thẩm mỹ q7 | `tham-my-q7` | /lien-he |
| 231 | thẩm mỹ q8 | `tham-my-q8` | /lien-he |
| 232 | thẩm mỹ q10 | `tham-my-q10` | /lien-he |
| 233 | thẩm mỹ q11 | `tham-my-q11` | /lien-he |
| 234 | thẩm mỹ tân bình | `tham-my-tan-binh-sk` | /lien-he |
| 235 | thẩm mỹ tân phú | `tham-my-tan-phu-sk` | /lien-he |
| 236 | thẩm mỹ bình tân | `tham-my-binh-tan-sk` | /lien-he |
| 237 | thẩm mỹ phú nhuận | `tham-my-phu-nhuan-sk` | /lien-he |
| 238 | thẩm mỹ gò vấp | `tham-my-go-vap-sk` | /lien-he |
| 239 | spa q6 | `spa-q6` | /spa/massage-body-thu-gian |
| 240 | spa q10 | `spa-q10` | /spa/massage-body-thu-gian |
| 241 | spa chợ lớn | `spa-cho-lon` | /spa/massage-body-thu-gian |
| 242 | clinic q5 | `clinic-q5` | /lien-he |
| 243 | clinic q6 | `clinic-q6` | /lien-he |
| 244 | phòng khám q5 | `phong-kham-q5` | /lien-he |

### SK11 — Local ngắn — An Đông & lân cận (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 245 | thẩm mỹ an đông | `tham-my-an-dong-sk` | /lien-he |
| 246 | phun xăm an đông | `phun-xam-an-dong` | /spa/phun-xam-tham-my |
| 247 | clinic an đông | `clinic-an-dong` | /lien-he |
| 248 | làm đẹp an đông | `lam-dep-an-dong-sk` | /lien-he |
| 249 | phòng khám an đông | `phong-kham-an-dong-sk` | /lien-he |
| 250 | thẩm mỹ chợ lớn | `tham-my-cho-lon-sk` | /lien-he |
| 251 | cắt mí chợ lớn | `cat-mi-cho-lon-sk` | /tham-my/cat-mi-phuong-hoang |
| 252 | thẩm mỹ hùng vương | `tham-my-hung-vuong-sk` | /lien-he |
| 253 | spa hùng vương | `spa-hung-vuong-sk` | /spa/massage-body-thu-gian |
| 254 | clinic hùng vương | `clinic-hung-vuong-sk` | /lien-he |
| 255 | thẩm mỹ q4 | `tham-my-q4` | /lien-he |
| 256 | spa q4 | `spa-q4` | /spa/massage-body-thu-gian |
| 257 | làm đẹp q5 | `lam-dep-q5` | /lien-he |
| 258 | làm đẹp q6 | `lam-dep-q6` | /lien-he |
| 259 | thẩm mỹ gần đây | `tham-my-gan-day-sk` | /lien-he |
| 260 | spa gần đây | `spa-gan-day-sk` | /spa/massage-body-thu-gian |
| 261 | clinic tphcm | `clinic-tphcm` | /lien-he |

### SK12 — Thẩm mỹ nam ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 262 | thẩm mỹ nam | `tham-my-nam-sk` | /lien-he |
| 263 | làm đẹp nam | `lam-dep-nam` | /lien-he |
| 264 | hói đầu nam | `hoi-dau-nam-sk` | /tham-my/cay-toc-tu-than |
| 265 | trị mụn nam | `tri-mun-nam-sk` | /spa/cham-soc-da-toan-dien |
| 266 | spa nam | `spa-nam` | /spa/massage-body-thu-gian |
| 267 | gọn hàm nam | `gon-ham-nam-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 268 | vline nam | `vline-nam` | /tham-my/nang-mui-hoang-kim |
| 269 | skincare nam | `skincare-nam-sk` | /spa/cham-soc-da-toan-dien |
| 270 | grooming nam | `grooming-nam` | /tham-my/nang-mui-hoang-kim |
| 271 | chú rể đẹp | `chu-re-dep` | /tham-my/nang-mui-hoang-kim |
| 272 | nam tphcm | `nam-tphcm` | /spa/cham-soc-da-toan-dien |
| 273 | thẩm mỹ nam tphcm | `tham-my-nam-tphcm-sk` | /lien-he |
| 274 | làm đẹp nam tphcm | `lam-dep-nam-tphcm` | /lien-he |
| 275 | botox hàm nam | `botox-ham-nam-sk` | /tham-my/botox-xoa-nhan-gon-ham |
| 276 | filler hàm nam | `filler-ham-nam` | /tham-my/filler-tao-hinh |
| 277 | trị sẹo nam | `tri-seo-nam` | /tham-my/nang-mui-hoang-kim |
| 278 | laser nam | `laser-nam` | /spa/cham-soc-da-toan-dien |
| 279 | massage nam | `massage-nam-sk` | /spa/massage-body-thu-gian |
| 280 | thẩm mỹ nam q5 | `tham-my-nam-q5` | /lien-he |

### SK13 — Thương hiệu & uy tín ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 281 | thiên hoàng kim | `thien-hoang-kim-sk` | /lien-he |
| 282 | thk clinic | `thk-clinic` | /lien-he |
| 283 | thk spa | `thk-spa` | /lien-he |
| 284 | thk thẩm mỹ | `thk-tham-my` | /lien-he |
| 285 | clinic thiên hoàng kim | `clinic-thien-hoang-kim` | /lien-he |
| 286 | spa thiên hoàng kim | `spa-thien-hoang-kim-sk` | /spa/massage-body-thu-gian |
| 287 | thẩm mỹ uy tín | `tham-my-uy-tin-sk` | /lien-he |
| 288 | spa uy tín | `spa-uy-tin` | /spa/massage-body-thu-gian |
| 289 | clinic uy tín | `clinic-uy-tin` | /lien-he |
| 290 | phòng khám uy tín | `phong-kham-uy-tin-sk` | /lien-he |
| 291 | bác sĩ thẩm mỹ | `bac-si-tham-my-sk` | /lien-he |
| 292 | thẩm mỹ tphcm | `tham-my-tphcm-sk` | /lien-he |
| 293 | phòng khám tphcm | `phong-kham-tphcm` | /lien-he |
| 294 | làm đẹp tphcm | `lam-dep-tphcm` | /lien-he |
| 295 | thẩm mỹ việt nam | `tham-my-viet-nam` | /lien-he |
| 296 | aesthetic clinic | `aesthetic-clinic-sk` | /lien-he |
| 297 | medical spa | `medical-spa` | /lien-he |
| 298 | beauty clinic | `beauty-clinic` | /lien-he |
| 299 | phòng khám đẹp | `phong-kham-dep` | /lien-he |
| 300 | spa đẹp | `spa-dep` | /spa/massage-body-thu-gian |
| 301 | đặt lịch thẩm mỹ | `dat-lich-tham-my-sk` | /lien-he |

### SK14 — Intent mua — ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 302 | tư vấn miễn phí | `tu-van-mien-phi-sk` | /lien-he |
| 303 | đặt lịch spa | `dat-lich-spa-sk` | /lien-he |
| 304 | hotline spa | `hotline-spa` | /lien-he |
| 305 | liên hệ spa | `lien-he-spa` | /lien-he |
| 306 | báo giá nhanh | `bao-gia-nhanh` | /bang-gia |
| 307 | khuyến mãi spa | `khuyen-mai-spa` | /lien-he |
| 308 | ưu đãi thẩm mỹ | `uu-dai-tham-my` | /lien-he |
| 309 | combo spa | `combo-spa` | /bang-gia |
| 310 | combo thẩm mỹ | `combo-tham-my` | /bang-gia |
| 311 | voucher spa | `voucher-spa` | /lien-he |
| 312 | trả góp thẩm mỹ | `tra-gop-tham-my-sk` | /lien-he |
| 313 | thanh toán spa | `thanh-toan-spa` | /lien-he |
| 314 | zalo spa | `zalo-spa` | /lien-he |
| 315 | inbox spa | `inbox-spa` | /lien-he |
| 316 | đặt lịch hôm nay | `dat-lich-hom-nay` | /lien-he |
| 317 | tư vấn nâng mũi | `tu-van-nang-mui` | /lien-he |
| 318 | tư vấn filler | `tu-van-filler` | /lien-he |
| 319 | tư vấn botox | `tu-van-botox` | /lien-he |
| 320 | tư vấn cắt mí | `tu-van-cat-mi` | /lien-he |
| 321 | khám miễn phí | `kham-mien-phi` | /lien-he |
| 322 | soi da miễn phí | `soi-da-mien-phi` | /lien-he |
| 323 | đặt lịch tphcm | `dat-lich-tphcm` | /lien-he |

### SK15 — So sánh ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 324 | filler botox | `filler-botox` | /tham-my/filler-tao-hinh |
| 325 | nâng mũi filler | `nang-mui-filler` | /tham-my/nang-mui-hoang-kim |
| 326 | cắt mí nhấn | `cat-mi-nhan` | /tham-my/cat-mi-phuong-hoang |
| 327 | hifu căng chỉ | `hifu-cang-chi` | /tham-my/cang-chi-tre-hoa |
| 328 | peel laser | `peel-laser` | /spa/cham-soc-da-toan-dien |
| 329 | botox filler | `botox-filler` | /tham-my/botox-xoa-nhan-gon-ham |
| 330 | nâng mũi cắt | `nang-mui-cat` | /tham-my/nang-mui-hoang-kim |
| 331 | spa clinic | `spa-clinic` | /spa/massage-body-thu-gian |
| 332 | bác sĩ spa | `bac-si-spa` | /tin-tuc |
| 333 | giá rẻ uy | `gia-re-uy` | /bang-gia |
| 334 | nước ngoài việt | `nuoc-ngoai-viet` | /tin-tuc |
| 335 | tiêm phẫu | `tiem-phau` | /tin-tuc |
| 336 | một lần nhiều | `mot-lan-nhieu` | /tin-tuc |
| 337 | online trực | `online-truc` | /tin-tuc |
| 338 | botox mỹ | `botox-my` | /tham-my/botox-xoa-nhan-gon-ham |
| 339 | spa thẩm | `spa-tham` | /spa/massage-body-thu-gian |
| 340 | trị nám laser | `tri-nam-laser-sk` | /spa/cham-soc-da-toan-dien |
| 341 | mụn peel | `mun-peel` | /spa/cham-soc-da-toan-dien |
| 342 | cấy prp | `cay-prp` | /tin-tuc |
| 343 | massage facial | `massage-facial-sk` | /spa/massage-body-thu-gian |
| 344 | phun tiêm | `phun-tiem` | /spa/phun-xam-tham-my |

### SK16 — Mụn & da trẻ ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 345 | mụn viêm | `mun-viem-sk` | /spa/cham-soc-da-toan-dien |
| 346 | mụn mủ | `mun-mu-sk` | /spa/cham-soc-da-toan-dien |
| 347 | mụn đầu | `mun-dau` | /spa/cham-soc-da-toan-dien |
| 348 | mụn nội | `mun-noi` | /spa/cham-soc-da-toan-dien |
| 349 | mụn hormonal | `mun-hormonal` | /spa/cham-soc-da-toan-dien |
| 350 | mụn nam | `mun-nam` | /spa/cham-soc-da-toan-dien |
| 351 | mụn nữ | `mun-nu` | /spa/cham-soc-da-toan-dien |
| 352 | trị mụn tphcm | `tri-mun-tphcm-sk` | /spa/cham-soc-da-toan-dien |
| 353 | spa trị mụn | `spa-tri-mun` | /spa/massage-body-thu-gian |
| 354 | mụn q5 | `mun-q5` | /spa/cham-soc-da-toan-dien |
| 355 | mụn an đông | `mun-an-dong` | /spa/cham-soc-da-toan-dien |
| 356 | điều trị mụn | `dieu-tri-mun` | /spa/cham-soc-da-toan-dien |
| 357 | xử lý mụn | `xu-ly-mun` | /spa/cham-soc-da-toan-dien |
| 358 | lấy mụn | `lay-mun` | /spa/cham-soc-da-toan-dien |
| 359 | mụn lưng | `mun-lung-sk` | /spa/cham-soc-da-toan-dien |
| 360 | mụn cằm | `mun-cam-sk` | /spa/cham-soc-da-toan-dien |
| 361 | mụn trán | `mun-tran` | /spa/cham-soc-da-toan-dien |
| 362 | mụn miệng | `mun-mieng` | /spa/cham-soc-da-toan-dien |
| 363 | sẹo mụn | `seo-mun-sk` | /spa/cham-soc-da-toan-dien |
| 364 | thâm mụn | `tham-mun-sk` | /spa/cham-soc-da-toan-dien |
| 365 | mụn tái | `mun-tai` | /spa/cham-soc-da-toan-dien |
| 366 | accutane | `accutane` | /spa/cham-soc-da-toan-dien |
| 367 | tretinoin | `tretinoin` | /spa/cham-soc-da-toan-dien |
| 368 | niacinamide | `niacinamide` | /spa/cham-soc-da-toan-dien |

### SK17 — Nám & sắc tố ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 369 | nám mảng | `nam-mang-sk` | /spa/cham-soc-da-toan-dien |
| 370 | nám đốm | `nam-dom-sk` | /spa/cham-soc-da-toan-dien |
| 371 | nám sâu | `nam-sau` | /spa/cham-soc-da-toan-dien |
| 372 | nám tphcm | `nam-tphcm-sk` | /spa/cham-soc-da-toan-dien |
| 373 | nám q5 | `nam-q5` | /spa/cham-soc-da-toan-dien |
| 374 | nám an đông | `nam-an-dong` | /spa/cham-soc-da-toan-dien |
| 375 | đồi mồi | `doi-moi-sk` | /spa/cham-soc-da-toan-dien |
| 376 | thâm nám | `tham-nam-sk` | /spa/cham-soc-da-toan-dien |
| 377 | sạm da | `sam-da` | /spa/cham-soc-da-toan-dien |
| 378 | vết thâm | `vet-tham-sk` | /spa/cham-soc-da-toan-dien |
| 379 | tăng sắc | `tang-sac` | /spa/cham-soc-da-toan-dien |
| 380 | laser nám | `laser-nam-sk` | /spa/cham-soc-da-toan-dien |
| 381 | peel nám | `peel-nam` | /spa/cham-soc-da-toan-dien |
| 382 | trị tàn | `tri-tan` | /spa/cham-soc-da-toan-dien |
| 383 | trị đồi | `tri-doi` | /spa/cham-soc-da-toan-dien |
| 384 | nám nam | `nam-nam` | /spa/cham-soc-da-toan-dien |
| 385 | nám nữ | `nam-nu` | /spa/cham-soc-da-toan-dien |
| 386 | nám mặt | `nam-mat` | /spa/cham-soc-da-toan-dien |
| 387 | nám tay | `nam-tay` | /spa/cham-soc-da-toan-dien |
| 388 | nám nách | `nam-nach` | /spa/cham-soc-da-toan-dien |

### SK18 — Xu hướng & công nghệ ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 389 | glass skin | `glass-skin-sk` | /tin-tuc |
| 390 | dolphin skin | `dolphin-skin-sk` | /tin-tuc |
| 391 | skin booster | `skin-booster` | /tin-tuc |
| 392 | rejuran | `rejuran` | /tin-tuc |
| 393 | profhilo | `profhilo` | /tin-tuc |
| 394 | exosome | `exosome` | /tin-tuc |
| 395 | pdrn | `pdrn` | /tin-tuc |
| 396 | stem cell | `stem-cell` | /tin-tuc |
| 397 | picosure | `picosure` | /tin-tuc |
| 398 | pico laser | `pico-laser` | /tin-tuc |
| 399 | morpheus8 | `morpheus8-sk` | /tin-tuc |
| 400 | potenza | `potenza` | /tin-tuc |
| 401 | bbl laser | `bbl-laser-sk` | /tin-tuc |
| 402 | rf microneedling | `rf-microneedling` | /tin-tuc |
| 403 | aquapeel | `aquapeel-sk` | /tin-tuc |
| 404 | dermapen | `dermapen-sk` | /tin-tuc |
| 405 | oxygen facial | `oxygen-facial-sk` | /tin-tuc |
| 406 | led therapy | `led-therapy` | /tin-tuc |
| 407 | 3d scan | `3d-scan` | /tin-tuc |
| 408 | ai da | `ai-da` | /tin-tuc |
| 409 | xu hướng 2026 | `xu-huong-2026` | /tin-tuc |
| 410 | làm đẹp 2026 | `lam-dep-2026` | /lien-he |
| 411 | thẩm mỹ 2026 | `tham-my-2026-sk` | /lien-he |
| 412 | spa 2026 | `spa-2026` | /spa/massage-body-thu-gian |
| 413 | công nghệ mới | `cong-nghe-moi` | /tin-tuc |

### SK19 — Thời điểm & đối tượng ngắn (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 414 | làm đẹp tết | `lam-dep-tet` | /lien-he |
| 415 | thẩm mỹ tết | `tham-my-tet` | /lien-he |
| 416 | spa tết | `spa-tet` | /spa/massage-body-thu-gian |
| 417 | cưới đẹp | `cuoi-dep` | /tin-tuc |
| 418 | cô dâu | `co-dau` | /tin-tuc |
| 419 | chú rể | `chu-re` | /tin-tuc |
| 420 | kỳ yếu | `ky-yeu` | /tin-tuc |
| 421 | dự tiệc | `du-tiec` | /tin-tuc |
| 422 | phỏng vấn | `phong-van` | /tin-tuc |
| 423 | đi làm | `di-lam` | /tin-tuc |
| 424 | tuổi 20 | `tuoi-20` | /tin-tuc |
| 425 | tuổi 30 | `tuoi-30` | /tin-tuc |
| 426 | tuổi 40 | `tuoi-40` | /tin-tuc |
| 427 | tuổi 50 | `tuoi-50` | /tin-tuc |
| 428 | sau sinh | `sau-sinh` | /tin-tuc |
| 429 | cho con bú | `cho-con-bu` | /tin-tuc |
| 430 | mang thai | `mang-thai` | /tin-tuc |
| 431 | mùa hè | `mua-he` | /tin-tuc |
| 432 | mùa đông | `mua-dong` | /tin-tuc |
| 433 | mùa mưa | `mua-mua` | /tin-tuc |
| 434 | trước tết | `truoc-tet` | /tin-tuc |
| 435 | sau tết | `sau-tet` | /tin-tuc |
| 436 | cuối tuần | `cuoi-tuan` | /tin-tuc |
| 437 | nghỉ lễ | `nghi-le` | /tin-tuc |
| 438 | nghỉ phép | `nghi-phep` | /tin-tuc |

### SK20 — Câu hỏi ngắn — high intent (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 439 | có đau không | `co-dau-khong` | /tin-tuc |
| 440 | bao lâu đẹp | `bao-lau-dep` | /tin-tuc |
| 441 | bao nhiêu tiền | `bao-nhieu-tien` | /tin-tuc |
| 442 | có an toàn | `co-an-toan` | /tin-tuc |
| 443 | có nên không | `co-nen-khong` | /tin-tuc |
| 444 | bao lâu hồi | `bao-lau-hoi` | /tin-tuc |
| 445 | mất bao lâu | `mat-bao-lau` | /tham-my/cat-mi-phuong-hoang |
| 446 | có sưng không | `co-sung-khong` | /tin-tuc |
| 447 | có để sẹo | `co-de-seo` | /tin-tuc |
| 448 | có uy tín | `co-uy-tin` | /tin-tuc |
| 449 | ở đâu đẹp | `o-dau-dep` | /tin-tuc |
| 450 | ở đâu tốt | `o-dau-tot` | /tin-tuc |
| 451 | chỗ nào uy | `cho-nao-uy` | /tin-tuc |
| 452 | nên làm gì | `nen-lam-gi` | /tin-tuc |
| 453 | làm gì đầu | `lam-gi-dau` | /tin-tuc |
| 454 | có tốt không | `co-tot-khong` | /tin-tuc |
| 455 | có hiệu quả | `co-hieu-qua` | /tin-tuc |
| 456 | có phụ phí | `co-phu-phi` | /tin-tuc |
| 457 | giá bao nhiêu | `gia-bao-nhieu` | /bang-gia |
| 458 | đau không | `dau-khong` | /tin-tuc |
| 459 | sưng bao lâu | `sung-bao-lau` | /tin-tuc |
| 460 | ăn gì được | `an-gi-duoc` | /tin-tuc |
| 461 | kiêng gì | `kieng-gi` | /tin-tuc |
| 462 | tái khám khi | `tai-kham-khi` | /tin-tuc |
| 463 | bảo hành không | `bao-hanh-khong` | /tin-tuc |

### SK21 — Bổ sung head — dịch vụ mở rộng (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 464 | hút mỡ | `hut-mo-sk` | /tham-my |
| 465 | hút mỡ bụng | `hut-mo-bung-sk` | /tham-my |
| 466 | hút mỡ mặt | `hut-mo-mat-sk` | /tham-my |
| 467 | hút mỡ tay | `hut-mo-tay` | /tham-my |
| 468 | hút mỡ đùi | `hut-mo-dui-sk` | /tham-my |
| 469 | cấy mỡ | `cay-mo` | /tham-my |
| 470 | cấy mỡ mông | `cay-mo-mong-sk` | /tham-my |
| 471 | cấy mỡ má | `cay-mo-ma-sk` | /tham-my |
| 472 | tiêm meso | `tiem-meso` | /tham-my |
| 473 | tiêm vitamin | `tiem-vitamin` | /tham-my |
| 474 | tiêm trắng | `tiem-trang` | /tham-my |
| 475 | mesotherapy | `mesotherapy` | /tham-my |
| 476 | prp da | `prp-da` | /tham-my |
| 477 | prp mặt | `prp-mat` | /tham-my |
| 478 | laser co2 | `laser-co2-sk` | /spa/cham-soc-da-toan-dien |
| 479 | laser fractional | `laser-fractional-sk` | /spa/cham-soc-da-toan-dien |
| 480 | ipl trị | `ipl-tri` | /tham-my |
| 481 | rf trị | `rf-tri` | /tham-my |
| 482 | microblading | `microblading` | /tham-my |
| 483 | ombre brows | `ombre-brows` | /tham-my |
| 484 | lip blush | `lip-blush` | /tham-my |
| 485 | lip tint | `lip-tint` | /tham-my |
| 486 | scalp spa | `scalp-spa` | /tham-my |
| 487 | gội cỏ | `goi-co` | /spa/massage-body-thu-gian |
| 488 | detox body | `detox-body` | /tham-my |

### SK22 — Bổ sung local — đường & landmark (25)

| # | Từ khóa | Slug | Pillar |
|---|---------|------|--------|
| 489 | thẩm mỹ bình phú | `tham-my-binh-phu` | /lien-he |
| 490 | spa bình phú | `spa-binh-phu` | /spa/massage-body-thu-gian |
| 491 | thẩm mỹ hưng vương | `tham-my-hung-vuong-kw` | /lien-he |
| 492 | spa hưng vương | `spa-hung-vuong-kw` | /spa/massage-body-thu-gian |
| 493 | clinic hưng vương | `clinic-hung-vuong-kw` | /lien-he |
| 494 | thẩm mỹ châu văn | `tham-my-chau-van` | /lien-he |
| 495 | spa châu văn | `spa-chau-van` | /spa/massage-body-thu-gian |
| 496 | thẩm mỹ nguyễn | `tham-my-nguyen` | /lien-he |
| 497 | spa nguyễn trãi | `spa-nguyen-trai` | /spa/massage-body-thu-gian |
| 498 | clinic nguyễn trãi | `clinic-nguyen-trai` | /lien-he |
| 499 | thẩm mỹ lê văn | `tham-my-le-van` | /lien-he |
| 500 | spa lê văn | `spa-le-van` | /spa/massage-body-thu-gian |

---
*Skipped 37 entries (trùng slug/focus hoặc đã có trên site).*
