
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const institutions = [
  {
    name: '금융위원회',
    url: 'https://www.fsc.go.kr',
    abbr: '금융위원회',
    logo: 'https://www.google.com/s2/favicons?domain=fsc.go.kr&sz=128',
  },
  {
    name: '금융감독원',
    url: 'https://www.fss.or.kr',
    abbr: '금융감독원',
    logo: 'https://www.google.com/s2/favicons?domain=fss.or.kr&sz=128',
  },
  {
    name: '신용회복위원회',
    url: 'https://www.ccrs.or.kr',
    abbr: '신용회복위원회',
    logo: 'https://www.ccrs.or.kr/type/www/images/logo/logo.svg',
  },
  {
    name: '한국대부금융협회',
    url: 'https://www.clfa.or.kr',
    abbr: 'CLFA',
    logo: 'https://www.clfa.or.kr/images/logo.png',
  },
  {
    name: 'NICE지키미',
    url: 'https://www.credit.co.kr',
    abbr: 'NICE지키미',
    logo: 'https://img.credit.co.kr/resource/img/zkm/rzm/common/logo/logo_a11y.png',
  },
];

function InstitutionLogo({ inst }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={inst.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
      title={inst.name}
    >
      <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2 group-hover:border-[#1a5fd1] group-hover:shadow-md transition-all duration-200">
        {!imgFailed ? (
          <img
            src={inst.logo}
            alt={inst.name}
            className="w-full h-full object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-xs font-bold text-gray-500 text-center leading-tight px-1">{inst.abbr}</span>
        )}
      </div>
      <span className="text-sm text-gray-600 group-hover:text-[#1a5fd1] transition-colors text-center font-medium">{inst.name}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Institution logos bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14">
            {institutions.map((inst) => (
              <InstitutionLogo key={inst.name} inst={inst} />
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
