
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CompaniesPage from './pages/CompaniesPage.jsx';
import CompanyDetailPage from './pages/CompanyDetailPage.jsx';
import ConsultationPage from './pages/ConsultationPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
              <a
                href="/"
                className="inline-block bg-[#1a5fd1] hover:bg-[#1552b8] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98]"
              >
                홈으로 돌아가기
              </a>
            </div>
          </div>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
