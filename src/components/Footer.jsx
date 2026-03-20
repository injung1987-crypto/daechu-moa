
import React from 'react';
import { Link } from 'react-router-dom';

const institutions = [
  { name: '금융위원회', url: 'https://www.fsc.go.kr', abbr: '금융위' },
  { name: '금융감독원', url: 'https://www.fss.or.kr', abbr: '금감원' },
  { name: '신용회복위원회', url: 'https://www.ccrs.or.kr', abbr: '신복위' },
  { name: '한국대부금융협회', url: 'https://www.clfa.or.kr', abbr: '대부협회' },
  { name: 'NICE지키미', url: 'https://www.credit.co.kr', abbr: 'NICE' },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Institution logos bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {institutions.map((inst) => (
              <a
                key={inst.name}
                href={inst.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group"
                title={inst.name}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-600 text-center leading-tight px-1">{inst.abbr}</span>
                </div>
                <span className="text-[11px] text-gray-500 group-hover:text-[#1a5fd1] transition-colors text-center">{inst.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg font-semibold text-white mb-2">대출모아</p>
            <p className="text-sm mb-1">사업자등록번호: 000-00-00000</p>
            <p className="text-sm mb-1">대부중개업등록번호: 0000-서울강남-0000</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-white mb-2">고객센터</p>
            <p className="text-sm mb-1">전화: 1599-0000</p>
            <p className="text-sm">평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              이용약관
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors duration-200 font-semibold">
              개인정보처리방침
            </Link>
            <span className="text-gray-600">|</span>
            <a
              href="https://www.fss.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              불법사금융신고
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="https://www.fss.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              금융감독원
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400 leading-relaxed">
            본 사이트는 광고 플랫폼이며 대출을 직접 취급하지 않습니다.
            대출 상담 및 계약은 등록된 각 업체와 직접 진행되며,
            대출모아는 중개 수수료를 받지 않습니다.
            과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © 2026 대출모아. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
