
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageSquare, MessageCircle, MapPin, Building2, AlertTriangle } from 'lucide-react';
import { companiesData } from '@/constants/companiesData.js';

function CompanyDetailPage() {
  const { id } = useParams();
  const company = companiesData.find((c) => c.id === parseInt(id));

  if (!company) {
    return (
      <>
        <Helmet>
          <title>업체를 찾을 수 없습니다 - 대출모아</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">업체를 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-8">요청하신 업체 정보가 존재하지 않습니다.</p>
            <Link
              to="/companies"
              className="inline-block bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              업체 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${company.name} - 대출모아`}</title>
        <meta name="description" content={`${company.name} 대출 상품 정보 및 상담`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#1a5fd1] to-[#1552b8] p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ textBalance: 'balance' }}>
                {company.name}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{company.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  <span>등록번호: {company.registrationNumber}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">업체 정보</h2>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">사업자등록번호:</span> {company.businessNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">대부중개업등록번호:</span> {company.registrationNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">연락처:</span> {company.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">취급 상품</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.loanTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-[#1a5fd1] mt-4">
                    연 {company.interestRateMin}% ~ {company.interestRateMax}%
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">대출 상품</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">상품명</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">금리</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">한도</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">대상</th>
                      </tr>
                    </thead>
                    <tbody>
                      {company.loanProducts.map((product, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">{product.name}</td>
                          <td className="px-4 py-3 text-sm text-[#1a5fd1] font-semibold">{product.rate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{product.limit}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <a
                  href={`tel:${company.phone}`}
                  className="bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  전화 상담
                </a>
                <button
                  className="bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-semibold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  문자 상담
                </button>
                <button
                  className="bg-[#FEE500] hover:bg-[#e5ce00] text-gray-900 font-semibold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  카톡 상담
                </button>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-yellow-900 mb-2">중개수수료 요구 시 신고하세요</p>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      대출 실행 전 중개수수료나 선입금을 요구하는 것은 불법입니다. 
                      이러한 요구를 받으시면 금융감독원(1332) 또는 경찰(112)에 즉시 신고하시기 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/companies"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyDetailPage;
