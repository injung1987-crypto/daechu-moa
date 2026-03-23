
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { motion } from 'framer-motion';

function CompanyCard({ company }) {
  const regionColors = {
    "서울": "bg-blue-100 text-blue-700",
    "경기": "bg-green-100 text-green-700",
    "인천": "bg-cyan-100 text-cyan-700",
    "부산": "bg-orange-100 text-orange-700",
    "대구": "bg-purple-100 text-purple-700",
    "울산": "bg-teal-100 text-teal-700",
    "광주": "bg-rose-100 text-rose-700",
    "대전": "bg-pink-100 text-pink-700",
    "세종": "bg-indigo-100 text-indigo-700",
    "강원": "bg-lime-100 text-lime-700",
    "충북": "bg-amber-100 text-amber-700",
    "충남": "bg-yellow-100 text-yellow-700",
    "전북": "bg-emerald-100 text-emerald-700",
    "전남": "bg-sky-100 text-sky-700",
    "경북": "bg-violet-100 text-violet-700",
    "경남": "bg-fuchsia-100 text-fuchsia-700",
    "제주": "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
    >
      {company.featured && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#f5a623] text-white text-xs font-bold px-2 py-1 rounded-full">
          <Star size={11} fill="white" />
          추천
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${regionColors[company.region] || 'bg-gray-100 text-gray-700'}`}>
              {company.region}
            </span>
          </div>
        </div>

        {company.bannerTitle && (
          <p className="text-sm font-semibold text-[#1a5fd1] mb-1">{company.bannerTitle}</p>
        )}
        {company.desc && (
          <p className="text-xs text-gray-500 mb-3">{company.desc}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {company.loanTypes.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-2xl font-bold text-[#1a5fd1]">
            연 {company.interestRateMin}% ~ {company.interestRateMax}%
          </p>
          <p className="text-sm text-gray-500 mt-1">금리 범위</p>
        </div>

        <div className="flex gap-3">
          <a
            href={`tel:${company.phone}`}
            className="flex-1 bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            전화
          </a>
          <Link
            to={`/companies/${company.id}`}
            className="flex-1 bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            상세보기
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default CompanyCard;
