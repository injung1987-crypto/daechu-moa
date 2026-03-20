
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, ChevronRight } from 'lucide-react';
import { postsData, categories } from '@/constants/postsData.js';

function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = selectedCategory === 'all'
    ? postsData
    : postsData.filter(p => p.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategory = (id) => {
    setSelectedCategory(id);
    setCurrentPage(1);
    if (id === 'all') setSearchParams({});
    else setSearchParams({ category: id });
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || id;

  const categoryBadgeColor = {
    news: 'bg-blue-100 text-blue-700',
    industry: 'bg-purple-100 text-purple-700',
    info: 'bg-green-100 text-green-700',
    faq: 'bg-orange-100 text-orange-700',
    caution: 'bg-red-100 text-red-700',
  };

  return (
    <>
      <Helmet>
        <title>금융 정보 게시판 - 대출모아</title>
        <meta name="description" content="대출 관련 금융 뉴스, 대부업 소식, 대출 정보 안내, FAQ를 확인하세요." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">금융 정보</h1>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1a5fd1] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1a5fd1] hover:text-[#1a5fd1]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Post List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {paginated.length > 0 ? paginated.map((post, idx) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className={`flex items-center justify-between px-6 py-4 hover:bg-blue-50 transition-colors duration-200 ${
                  idx < paginated.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${categoryBadgeColor[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {getCategoryName(post.category)}
                  </span>
                  <span className="text-gray-900 font-medium truncate">{post.title}</span>
                </div>
                <div className="shrink-0 flex items-center gap-4 ml-4 text-sm text-gray-400">
                  <span className="hidden sm:flex items-center gap-1">
                    <Eye size={14} />
                    {post.views.toLocaleString()}
                  </span>
                  <span>{post.date}</span>
                  <ChevronRight size={16} />
                </div>
              </Link>
            )) : (
              <div className="py-16 text-center text-gray-500">게시글이 없습니다.</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
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
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostsPage;
