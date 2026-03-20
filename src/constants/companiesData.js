
export const companiesData = [
  {
    id: 1,
    name: "서울금융",
    region: "서울",
    phone: "02-1234-5678",
    registrationNumber: "2023-서울강남-0001",
    businessNumber: "123-45-67890",
    featured: true,
    loanTypes: ["직장인대출", "신용대출"],
    interestRateMin: 5.5,
    interestRateMax: 12.9,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 5.5% ~ 9.8%", limit: "최대 5,000만원", target: "재직 6개월 이상" },
      { name: "급여담보대출", rate: "연 6.2% ~ 10.5%", limit: "최대 3,000만원", target: "정규직 근로자" },
      { name: "소액신용대출", rate: "연 8.5% ~ 12.9%", limit: "최대 1,000만원", target: "신용등급 6등급 이상" }
    ]
  },
  {
    id: 2,
    name: "경기대출",
    region: "경기",
    phone: "031-2345-6789",
    registrationNumber: "2023-경기수원-0002",
    businessNumber: "234-56-78901",
    featured: true,
    loanTypes: ["사업자대출", "담보대출"],
    interestRateMin: 6.2,
    interestRateMax: 14.5,
    loanProducts: [
      { name: "개인사업자대출", rate: "연 6.2% ~ 11.8%", limit: "최대 1억원", target: "사업자등록 1년 이상" },
      { name: "부동산담보대출", rate: "연 7.5% ~ 12.5%", limit: "최대 3억원", target: "부동산 소유자" },
      { name: "법인사업자대출", rate: "연 8.2% ~ 14.5%", limit: "최대 2억원", target: "법인사업자" }
    ]
  },
  {
    id: 3,
    name: "부산신용",
    region: "부산",
    phone: "051-3456-7890",
    registrationNumber: "2023-부산해운대-0003",
    businessNumber: "345-67-89012",
    featured: true,
    loanTypes: ["무직자대출", "소액대출"],
    interestRateMin: 8.5,
    interestRateMax: 18.9,
    loanProducts: [
      { name: "무직자 소액대출", rate: "연 12.5% ~ 18.9%", limit: "최대 500만원", target: "만 20세 이상" },
      { name: "주부대출", rate: "연 10.8% ~ 16.5%", limit: "최대 800만원", target: "배우자 소득 있음" },
      { name: "긴급생활자금", rate: "연 8.5% ~ 14.2%", limit: "최대 300만원", target: "긴급자금 필요자" }
    ]
  },
  {
    id: 4,
    name: "대구금융",
    region: "대구",
    phone: "053-4567-8901",
    registrationNumber: "2023-대구중구-0004",
    businessNumber: "456-78-90123",
    featured: true,
    loanTypes: ["직장인대출", "전세대출"],
    interestRateMin: 5.8,
    interestRateMax: 13.2,
    loanProducts: [
      { name: "직장인 전세대출", rate: "연 5.8% ~ 9.5%", limit: "최대 2억원", target: "재직 1년 이상" },
      { name: "신용대출", rate: "연 7.2% ~ 11.8%", limit: "최대 4,000만원", target: "신용등급 5등급 이상" },
      { name: "중금리대출", rate: "연 9.5% ~ 13.2%", limit: "최대 2,000만원", target: "신용등급 7등급 이상" }
    ]
  },
  {
    id: 5,
    name: "인천대출",
    region: "인천",
    phone: "032-5678-9012",
    registrationNumber: "2023-인천남동-0005",
    businessNumber: "567-89-01234",
    featured: true,
    loanTypes: ["신용대출", "담보대출"],
    interestRateMin: 6.0,
    interestRateMax: 15.0,
    loanProducts: [
      { name: "일반신용대출", rate: "연 6.0% ~ 10.5%", limit: "최대 3,500만원", target: "재직자" },
      { name: "자동차담보대출", rate: "연 8.5% ~ 13.2%", limit: "최대 2,000만원", target: "차량 소유자" },
      { name: "예적금담보대출", rate: "연 7.2% ~ 15.0%", limit: "최대 1,500만원", target: "예적금 보유자" }
    ]
  },
  {
    id: 6,
    name: "대전신용",
    region: "대전",
    phone: "042-6789-0123",
    registrationNumber: "2023-대전서구-0006",
    businessNumber: "678-90-12345",
    featured: true,
    loanTypes: ["사업자대출", "소액대출"],
    interestRateMin: 7.2,
    interestRateMax: 16.8,
    loanProducts: [
      { name: "소상공인대출", rate: "연 7.2% ~ 12.5%", limit: "최대 8,000만원", target: "소상공인" },
      { name: "긴급운영자금", rate: "연 9.8% ~ 14.8%", limit: "최대 3,000만원", target: "사업자등록 6개월 이상" },
      { name: "소액사업자대출", rate: "연 11.5% ~ 16.8%", limit: "최대 1,000만원", target: "개인사업자" }
    ]
  },
  {
    id: 7,
    name: "광주파이낸스",
    region: "광주",
    phone: "062-7890-1234",
    registrationNumber: "2023-광주서구-0007",
    businessNumber: "789-01-23456",
    featured: false,
    loanTypes: ["직장인대출", "신용대출"],
    interestRateMin: 6.5,
    interestRateMax: 13.5,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 6.5% ~ 11.2%", limit: "최대 4,000만원", target: "재직 6개월 이상" },
      { name: "주택담보대출", rate: "연 7.8% ~ 13.5%", limit: "최대 2억원", target: "주택 소유자" },
      { name: "소액대출", rate: "연 10.5% ~ 13.0%", limit: "최대 800만원", target: "신용등급 무관" }
    ]
  },
  {
    id: 8,
    name: "울산대출",
    region: "울산",
    phone: "052-8901-2345",
    registrationNumber: "2023-울산남구-0008",
    businessNumber: "890-12-34567",
    featured: false,
    loanTypes: ["담보대출", "사업자대출"],
    interestRateMin: 7.0,
    interestRateMax: 14.8,
    loanProducts: [
      { name: "개인사업자대출", rate: "연 7.0% ~ 12.0%", limit: "최대 5,000만원", target: "사업자등록 6개월 이상" },
      { name: "자동차담보대출", rate: "연 8.0% ~ 13.5%", limit: "최대 3,000만원", target: "차량 소유자" },
      { name: "부동산담보대출", rate: "연 9.0% ~ 14.8%", limit: "최대 1억원", target: "부동산 소유자" }
    ]
  },
  {
    id: 9,
    name: "강원금융",
    region: "강원",
    phone: "033-9012-3456",
    registrationNumber: "2023-강원춘천-0009",
    businessNumber: "901-23-45678",
    featured: false,
    loanTypes: ["소액대출", "무직자대출"],
    interestRateMin: 9.0,
    interestRateMax: 19.0,
    loanProducts: [
      { name: "긴급소액대출", rate: "연 9.0% ~ 15.5%", limit: "최대 500만원", target: "만 19세 이상" },
      { name: "무직자대출", rate: "연 12.0% ~ 18.0%", limit: "최대 300만원", target: "소득증빙 가능자" },
      { name: "생활비대출", rate: "연 13.5% ~ 19.0%", limit: "최대 200만원", target: "긴급자금 필요자" }
    ]
  },
  {
    id: 10,
    name: "충남대출",
    region: "충남",
    phone: "041-0123-4567",
    registrationNumber: "2023-충남천안-0010",
    businessNumber: "012-34-56789",
    featured: false,
    loanTypes: ["직장인대출", "신용대출"],
    interestRateMin: 6.8,
    interestRateMax: 14.2,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 6.8% ~ 11.5%", limit: "최대 3,000만원", target: "재직 1년 이상" },
      { name: "중금리 신용대출", rate: "연 9.5% ~ 14.2%", limit: "최대 2,000만원", target: "신용등급 7등급 이상" },
      { name: "공무원대출", rate: "연 5.5% ~ 8.5%", limit: "최대 5,000만원", target: "공무원·교직원" }
    ]
  },
  {
    id: 11,
    name: "충북파이낸스",
    region: "충북",
    phone: "043-1234-5670",
    registrationNumber: "2023-충북청주-0011",
    businessNumber: "111-22-33444",
    featured: false,
    loanTypes: ["사업자대출", "담보대출"],
    interestRateMin: 7.5,
    interestRateMax: 15.5,
    loanProducts: [
      { name: "소상공인 운영자금", rate: "연 7.5% ~ 13.0%", limit: "최대 1억원", target: "사업자등록 1년 이상" },
      { name: "부동산담보대출", rate: "연 8.5% ~ 14.0%", limit: "최대 2억원", target: "부동산 소유자" },
      { name: "법인대출", rate: "연 9.0% ~ 15.5%", limit: "최대 5억원", target: "법인사업자" }
    ]
  },
  {
    id: 12,
    name: "전북신용",
    region: "전북",
    phone: "063-2345-6701",
    registrationNumber: "2023-전북전주-0012",
    businessNumber: "222-33-44555",
    featured: false,
    loanTypes: ["신용대출", "소액대출"],
    interestRateMin: 8.0,
    interestRateMax: 17.0,
    loanProducts: [
      { name: "일반신용대출", rate: "연 8.0% ~ 13.5%", limit: "최대 2,000만원", target: "신용등급 5등급 이상" },
      { name: "긴급생활비대출", rate: "연 11.0% ~ 17.0%", limit: "최대 500만원", target: "긴급자금 필요자" },
      { name: "주부대출", rate: "연 10.5% ~ 15.5%", limit: "최대 1,000만원", target: "배우자 소득 있음" }
    ]
  },
  {
    id: 13,
    name: "전남대출",
    region: "전남",
    phone: "061-3456-7802",
    registrationNumber: "2023-전남여수-0013",
    businessNumber: "333-44-55666",
    featured: false,
    loanTypes: ["직장인대출", "무직자대출"],
    interestRateMin: 8.2,
    interestRateMax: 16.5,
    loanProducts: [
      { name: "직장인대출", rate: "연 8.2% ~ 12.8%", limit: "최대 3,000만원", target: "재직 6개월 이상" },
      { name: "무직자소액대출", rate: "연 12.0% ~ 16.5%", limit: "최대 500만원", target: "만 20세 이상" },
      { name: "중금리대출", rate: "연 10.0% ~ 14.5%", limit: "최대 1,500만원", target: "신용등급 무관" }
    ]
  },
  {
    id: 14,
    name: "경북금융",
    region: "경북",
    phone: "054-4567-8903",
    registrationNumber: "2023-경북포항-0014",
    businessNumber: "444-55-66777",
    featured: false,
    loanTypes: ["담보대출", "사업자대출"],
    interestRateMin: 7.2,
    interestRateMax: 14.0,
    loanProducts: [
      { name: "개인사업자대출", rate: "연 7.2% ~ 12.0%", limit: "최대 8,000만원", target: "사업자등록 1년 이상" },
      { name: "부동산담보대출", rate: "연 8.0% ~ 13.5%", limit: "최대 3억원", target: "부동산 소유자" },
      { name: "농업인대출", rate: "연 9.0% ~ 14.0%", limit: "최대 5,000만원", target: "농업종사자" }
    ]
  },
  {
    id: 15,
    name: "경남파이낸스",
    region: "경남",
    phone: "055-5678-9004",
    registrationNumber: "2023-경남창원-0015",
    businessNumber: "555-66-77888",
    featured: false,
    loanTypes: ["신용대출", "전세대출"],
    interestRateMin: 6.5,
    interestRateMax: 13.8,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 6.5% ~ 11.0%", limit: "최대 4,000만원", target: "재직 6개월 이상" },
      { name: "전세자금대출", rate: "연 7.0% ~ 12.5%", limit: "최대 2억원", target: "전세 거주자" },
      { name: "중금리 신용대출", rate: "연 9.5% ~ 13.8%", limit: "최대 2,000만원", target: "신용등급 7등급 이상" }
    ]
  },
  {
    id: 16,
    name: "제주대출",
    region: "제주",
    phone: "064-6789-0105",
    registrationNumber: "2023-제주시-0016",
    businessNumber: "666-77-88999",
    featured: false,
    loanTypes: ["직장인대출", "소액대출"],
    interestRateMin: 7.8,
    interestRateMax: 16.0,
    loanProducts: [
      { name: "직장인대출", rate: "연 7.8% ~ 12.5%", limit: "최대 3,000만원", target: "재직 1년 이상" },
      { name: "소액대출", rate: "연 10.5% ~ 16.0%", limit: "최대 500만원", target: "만 19세 이상" },
      { name: "관광업대출", rate: "연 9.0% ~ 14.5%", limit: "최대 5,000만원", target: "관광업 종사자" }
    ]
  },
  {
    id: 17,
    name: "세종금융",
    region: "세종",
    phone: "044-7890-1206",
    registrationNumber: "2023-세종시-0017",
    businessNumber: "777-88-99000",
    featured: false,
    loanTypes: ["사업자대출", "신용대출"],
    interestRateMin: 6.2,
    interestRateMax: 13.5,
    loanProducts: [
      { name: "개인사업자대출", rate: "연 6.2% ~ 11.5%", limit: "최대 1억원", target: "사업자등록 6개월 이상" },
      { name: "신용대출", rate: "연 7.5% ~ 13.0%", limit: "최대 3,000만원", target: "신용등급 5등급 이상" },
      { name: "공무원 신용대출", rate: "연 5.5% ~ 8.5%", limit: "최대 5,000만원", target: "공무원·준공무원" }
    ]
  },
  {
    id: 18,
    name: "수원파이낸스",
    region: "경기",
    phone: "031-8901-2307",
    registrationNumber: "2023-경기수원-0018",
    businessNumber: "888-99-00111",
    featured: false,
    loanTypes: ["담보대출", "전세대출"],
    interestRateMin: 5.9,
    interestRateMax: 12.8,
    loanProducts: [
      { name: "부동산담보대출", rate: "연 5.9% ~ 10.5%", limit: "최대 5억원", target: "부동산 소유자" },
      { name: "전세자금대출", rate: "연 6.5% ~ 11.5%", limit: "최대 3억원", target: "전세 거주자" },
      { name: "경락잔금대출", rate: "연 7.5% ~ 12.8%", limit: "최대 2억원", target: "경매 낙찰자" }
    ]
  },
  {
    id: 19,
    name: "부천대출",
    region: "경기",
    phone: "032-9012-3408",
    registrationNumber: "2023-경기부천-0019",
    businessNumber: "999-00-11222",
    featured: false,
    loanTypes: ["직장인대출", "무직자대출"],
    interestRateMin: 7.5,
    interestRateMax: 17.5,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 7.5% ~ 12.8%", limit: "최대 3,000만원", target: "재직 6개월 이상" },
      { name: "무직자소액대출", rate: "연 13.0% ~ 17.5%", limit: "최대 500만원", target: "만 20세 이상" },
      { name: "주부대출", rate: "연 11.0% ~ 15.5%", limit: "최대 800만원", target: "배우자 소득 있음" }
    ]
  },
  {
    id: 20,
    name: "마포금융",
    region: "서울",
    phone: "02-0123-4509",
    registrationNumber: "2023-서울마포-0020",
    businessNumber: "100-11-22333",
    featured: false,
    loanTypes: ["신용대출", "사업자대출"],
    interestRateMin: 6.8,
    interestRateMax: 14.5,
    loanProducts: [
      { name: "직장인 신용대출", rate: "연 6.8% ~ 11.5%", limit: "최대 4,000만원", target: "재직 6개월 이상" },
      { name: "개인사업자대출", rate: "연 8.5% ~ 13.8%", limit: "최대 8,000만원", target: "사업자등록 1년 이상" },
      { name: "소상공인대출", rate: "연 9.5% ~ 14.5%", limit: "최대 5,000만원", target: "소상공인" }
    ]
  }
];

export const regions = [
  "전체", "서울", "경기", "인천", "부산", "대구", "울산", "광주", "대전", "세종",
  "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

export const loanProducts = [
  "전체",
  "직장인대출",
  "신용대출",
  "사업자대출",
  "담보대출",
  "무직자대출",
  "소액대출",
  "전세대출"
];
