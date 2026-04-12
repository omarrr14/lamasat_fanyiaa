import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-24 pb-12 relative overflow-hidden">
      {/* Decorative SVG Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/images/logo.png" alt="اللمسات الفنية" className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-white/60 leading-loose max-w-xs text-sm">
              خبرة ممتدة في تصميم وتصنيع الأثاث الخشبي عالي الجودة والديكورات الداخلية التي تجمع بين الأصالة والحداثة.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 cursor-pointer">f</div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 cursor-pointer">in</div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 cursor-pointer">tw</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white text-lg font-bold relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/" text="الصفحة الرئيسية" />
              <FooterLink to="/products" text="منتجاتنا المميزة" />
              <FooterLink to="/discounts" text="أحدث العروض" />
              <FooterLink to="/about" text="من نحن" />
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            <h4 className="text-white text-lg font-bold relative inline-block">
              أقسامنا
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/products?cat=غرف نوم" text="غرف النوم" />
              <FooterLink to="/products?cat=مطابخ" text="المطابخ" />
              <FooterLink to="/products?cat=غرف جلوس" text="غرف الجلوس" />
              <FooterLink to="/products?cat=ديكورات" text="الديكورات الداخلية" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-white text-lg font-bold relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-accent rounded-full" />
            </h4>
            <div className="space-y-5">
              <ContactItem 
                icon={<Phone className="text-accent" size={20} />} 
                title="اتصل بنا" 
                text="+966 54 409 9765" 
              />
              <ContactItem 
                icon={<Mail className="text-accent" size={20} />} 
                title="البريد الإلكتروني" 
                text="lamasatfanyaa4@gmail.com" 
              />
              <ContactItem 
                icon={<MapPin className="text-accent" size={20} />} 
                title="الموقع" 
                text="الرياض، المملكة العربية السعودية"
                href="https://www.google.com/maps/place/24%C2%B037'35.3%22N+46%C2%B052'05.2%22E/@24.6264801,46.8655281,17z"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-white/40">
            © {currentYear} شركة اللمسات الفنية للصناعات الخشبية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-8 text-white/40">
            <button className="hover:text-accent transition-colors">سياسة الخصوصية</button>
            <button className="hover:text-accent transition-colors">الشروط والأحكام</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300">
      {icon}
    </button>
  );
}

function FooterLink({ to, text }) {
  return (
    <li>
      <Link to={to} className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
        {text}
      </Link>
    </li>
  );
}

function ContactItem({ icon, title, text, href }) {
  const content = (
    <div className="flex gap-4 group cursor-pointer">
      <div className="mt-1 transition-transform duration-300 group-hover:scale-110">{icon}</div>
      <div>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className={`text-sm font-medium transition-colors duration-200 ${href ? 'text-white/80 group-hover:text-accent' : 'text-white/80'}`}>{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}
