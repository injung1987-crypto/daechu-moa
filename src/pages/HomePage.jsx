
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Search, Users, Building2, MessageCircle, AlertTriangle, Shield, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import CompanyCard from '@/components/CompanyCard.jsx';
import { companiesData, regions, loanProducts } from '@/constants/companiesData.js';

function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedProduct, setSelectedProduct] = useState("전체");

  const featuredCompanies = companiesData.filter(c => c.featured);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedRegion !== "전체") params.set('region', selectedRegion);
    if (selectedProduct !== "전체") params.set('product', selectedProduct);
    window.location.href = `/companies?${params.toString()}`;
  };

  return (
    <>
      <Helmet>
        <title>대출모아 - 내 조건에 맞는 대출업체 한번에 찾기</title>
        <meta name="description" content="전국 등록 대출업체 실시간 연결. 지역별, 상품별 대출 비교 및 상담 서비스" />
      </Helmet>

      <div className="min-h-screen">
        <section 
          className="relative min-h-[100dvh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1697638164340-6c5fc558bdf2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em', textBalance: 'balance' }}
            >
              내 조건에 맞는 대출업체,<br />한번에 찾기
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-12"
            >
              전국 등록 대출업체 실시간 연결
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                    지역 선택
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                    대출상품 선택
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    {loanProducts.map((product) => (
                      <option key={product} value={product}>{product}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-bold py-4 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
              >
                <Search size={24} />
                업체 검색
              </button>
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Users className="text-[#1a5fd1]" size={24} />
                <span className="text-gray-700 font-medium">오늘 방문자: <strong className="text-gray-900">1,284명</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="text-[#1a5fd1]" size={24} />
                <span className="text-gray-700 font-medium">누적 업체수: <strong className="text-gray-900">320개</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="text-[#1a5fd1]" size={24} />
                <span className="text-gray-700 font-medium">누적 상담수: <strong className="text-gray-900">12,400건</strong></span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" style={{ textBalance: 'balance' }}>
              이달의 추천 업체
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CompanyCard company={company} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/companies"
                className="inline-block bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
              >
                전체 업체 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" style={{ textBalance: 'balance' }}>
              빠른 검색
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">지역별 빠른 검색</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {regions.filter(r => r !== "전체").map((region) => (
                    <Link
                      key={region}
                      to={`/companies?region=${region}`}
                      className="bg-white hover:bg-[#1a5fd1] hover:text-white text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 text-center transition-all duration-200 active:scale-[0.98]"
                    >
                      {region}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">상품별 빠른 검색</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {loanProducts.filter(p => p !== "전체").map((product) => (
                    <Link
                      key={product}
                      to={`/companies?product=${product}`}
                      className="bg-white hover:bg-[#f5a623] hover:text-white text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 text-center transition-all duration-200 active:scale-[0.98]"
                    >
                      {product}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12" style={{ textBalance: 'balance' }}>
              안전한 이용을 위한 주의사항
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">선입금 요구 주의</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  대출 실행 전 수수료나 보증금을 요구하는 업체는 불법입니다. 절대 송금하지 마세요.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">등록업체 확인</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  대부업 등록번호를 반드시 확인하고, 금융감독원 사이트에서 정식 등록 여부를 조회하세요.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FileCheck className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">계약서 확인</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  대출 계약 시 금리, 상환 조건 등을 꼼꼼히 확인하고 계약서를 반드시 보관하세요.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-red-800 font-semibold text-center">
                ⚠️ 중개수수료를 요구하는 업체는 즉시 신고하세요. 대출모아는 중개수수료를 받지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
