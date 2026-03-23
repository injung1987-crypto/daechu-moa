
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Eye, Calendar, ChevronLeft } from 'lucide-react';
import { postsData, categories } from '@/constants/postsData.js';

function PostDetailPage() {
  const { id } = useParams();
  const post = postsData.find(p => p.id === parseInt(id));

  const getCategoryName = (catId) => categories.find(c => c.id === catId)?.name || catId;

  const categoryBadgeColor = {
    news: 'bg-blue-100 text-blue-700',
    industry: 'bg-purple-100 text-purple-700',
    info: 'bg-green-100 text-green-700',
    faq: 'bg-orange-100 text-orange-700',
    caution: 'bg-red-100 text-red-700',
  };

  // Related posts (same category, excluding current)
  const related = post
    ? postsData.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
          <Link to="/posts" className="inline-block bg-[#1a5fd1] text-white font-semibold px-6 py-3 rounded-lg">
            목록으로
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown-style bold and line breaks to JSX
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <React.Fragment key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - 대출모아</title>
        <meta name="description" content={post.content.substring(0, 120)} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            to="/posts"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-[#1a5fd1] mb-6 transition-colors duration-200"
          >
            <ChevronLeft size={18} />
            금융 정보 목록
          </Link>

          {/* Article */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
            <div className="p-8">
              {/* Category + Title */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${categoryBadgeColor[post.category] || 'bg-gray-100 text-gray-600'}`}>
                  {getCategoryName(post.category)}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </h1>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {post.views.toLocaleString()}
                </span>
              </div>

              {/* Content */}
              <div className="pt-6 text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                {renderContent(post.content)}
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">관련 게시글</h2>
              <div className="space-y-3">
                {related.map(p => (
                  <Link
                    key={p.id}
                    to={`/posts/${p.id}`}
                    className="flex items-center justify-between hover:text-[#1a5fd1] transition-colors duration-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-[#1a5fd1] truncate">{p.title}</span>
                    <span className="shrink-0 text-sm text-gray-400 ml-4">{p.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="text-center mt-8">
            <Link
              to="/posts"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetailPage;
