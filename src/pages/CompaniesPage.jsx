
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, Phone } from 'lucide-react';
import CompanyCard from '@/components/CompanyCard.jsx';
import { companiesData, regions, loanProducts } from '@/constants/companiesData.js';

// Recent companies: last 12 by id (highest id = most recently added)
const recentCompanies = [...companiesData].sort((a, b) => b.id - a.id).slice(0, 12);

function FraudSearch() {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = phone.trim().replace(/\s/g, '');
    if (!q) return;
    const found = companiesData.find(c => c.phone.replace(/-/g, '') === q.replace(/-/g, ''));
    setResult(found ? 'registered' : 'not_registered');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#1a5fd1] px-4 py-3">
        <h3 className="text-white font-bold text-sm">사기번호 검색</h3>
        <p className="text-blue-200 text-xs mt-0.5">전화번호로 등록업체 여부 확인</p>
      </div>
      <div className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setResult(null); }}
            placeholder="010-0000-0000"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5fd1] focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="bg-[#1a5fd1] hover:bg-[#1552b8] text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Search size={16} />
          </button>
        </form>
        {result === 'registered' && (
          <p className="mt-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            ✅ 대출모아 등록 업체입니다.
          </p>
        )}
        {result === 'not_registered' && (
          <p className="mt-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            ⚠️ 미등록 번호입니다. 주의하세요.
          </p>
        )}
      </div>
    </div>
  );
}

function RecentCompanies() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-900 text-sm">최근 등록 업체</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {recentCompanies.map(c => (
          <li key={c.id}>
            <Link
              to={`/companies/${c.id}`}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700 truncate">{c.name}</span>
              <span className="flex-shrink-0 ml-2 text-[10px] font-bold bg-[#f5a623] text-white px-1.5 py-0.5 rounded-sm">N</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompaniesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '전체');
  const [selectedProduct, setSelectedProduct] = useState(searchParams.get('product') || '전체');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    if (sortBy === 'rate-low') return a.interestRateMin - b.interestRateMin;
    if (sortBy === 'rate-high') return b.interestRateMax - a.interestRateMax;
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

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar */}
            <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-5">
              <FraudSearch />
              <RecentCompanies />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-md p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="text-[#1a5fd1]" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">검색 필터</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">대출상품</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
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

              <div className="mb-5">
                <p className="text-gray-600">
                  총 <strong className="text-[#1a5fd1]">{sortedCompanies.length}개</strong>의 업체가 검색되었습니다.
                </p>
              </div>

              {paginatedCompanies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
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

                      {(() => {
                        const delta = 4;
                        const start = Math.max(1, currentPage - delta);
                        const end = Math.min(totalPages, currentPage + delta);
                        return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
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
                        ));
                      })()}

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
        </div>
      </div>
    </>
  );
}

export default CompaniesPage;
