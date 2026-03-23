
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '지역별대출', path: '/companies?filter=region' },
    { name: '상품별대출', path: '/companies?filter=product' },
    { name: '금융정보', path: '/posts' },
    { name: '실시간상담', path: '/consultation' },
    { name: '업체찾기', path: '/companies' }
  ];

  const isActive = (path) => {
    const pathname = path.split('?')[0];
    if (pathname === '/companies') {
      return (location.pathname === '/companies' || location.pathname.startsWith('/companies/')) && !path.includes('?filter=');
    }
    return location.pathname === pathname;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-[#1a5fd1] hover:opacity-80 transition-opacity duration-200">
            대출모아
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-[#1a5fd1] font-semibold'
                    : 'text-gray-700 hover:text-[#1a5fd1]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/register"
              className="bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              업체등록
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#1a5fd1] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-[#1a5fd1] font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-[#f5a623] hover:bg-[#e09615] text-white font-semibold px-6 py-2 rounded-lg text-center transition-all duration-200"
              >
                업체등록
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
