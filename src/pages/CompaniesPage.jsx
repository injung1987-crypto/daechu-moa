
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import CompanyCard from '@/components/CompanyCard.jsx';
import { companiesData, regions, loanProducts } from '@/constants/companiesData.js';

function CompaniesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '전체');
  const [selectedProduct, setSelectedProduct] = useState(searchParams.get('product') || '전체');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const region = searchParams.get('region');
    const product = searchParams.get('product');
    if (region) setSelectedRegion(region);
    if (product) setSelectedProduct(product);
  }, [searchParams]);

  const filteredCompanies = companiesData.filter((company) => {
    const regionMatch = selectedRegion === '전체' || company.region === selectedRegion;
    const productMatch = selectedProduct === '전체' || company.loanTypes.includes(selectedProduct);
    return regionMatch && productMatch;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'rate-low') {
      return a.interestRateMin - b.interestRateMin;
    } else if (sortBy === 'rate-high') {
      return b.interestRateMax - a.interestRateMax;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = sortedCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (selectedRegion !== '전체') params.set('region', selectedRegion);
    if (selectedProduct !== '전체') params.set('product', selectedProduct);
    setSearchParams(params);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedRegion, selectedProduct]);

  return (
    <>
      <Helmet>
        <title>대출업체 찾기 - 대출모아</title>
        <meta name="description" content="지역별, 상품별 대출업체 검색 및 비교" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style={{ textBalance: 'balance' }}>
            대출업체 찾기
          </h1>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="text-[#1a5fd1]" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">검색 필터</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대출상품
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {loanProducts.map((product) => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  정렬
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="latest">최신순</option>
                  <option value="rate-low">금리 낮은순</option>
                  <option value="rate-high">금리 높은순</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              총 <strong className="text-[#1a5fd1]">{sortedCompanies.length}개</strong>의 업체가 검색되었습니다.
            </p>
          </div>

          {paginatedCompanies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 font-medium"
                  >
                    이전
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        currentPage === page
                          ? 'bg-[#1a5fd1] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 font-medium"
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">검색 결과가 없습니다.</p>
              <p className="text-gray-500">다른 조건으로 검색해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CompaniesPage;
