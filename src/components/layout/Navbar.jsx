import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'منتجاتنا', path: '/products' },
  { name: 'العروض والخصومات', path: '/discounts' },
  { name: 'من نحن', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 mt-[-30px] left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12',
        scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/images/logo.png" alt="اللمسات الفنية" className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-bold transition-all duration-300 hover:text-accent relative group py-2',
                location.pathname === link.path ? 'text-accent' : 'text-primary'
              )}
            >
              {link.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full",
                location.pathname === link.path ? "w-full" : "w-0"
              )} />
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center gap-6">
          <button className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-accent transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/10 hover:scale-105 active:scale-95">
            <Phone size={18} />
            تواصل معنا
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white absolute top-full left-0 right-0 border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-xl font-black py-2',
                    location.pathname === link.path ? 'text-accent' : 'text-primary'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-primary text-white w-full py-5 rounded-2xl font-black mt-4 text-lg">
                تواصل معنا
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
