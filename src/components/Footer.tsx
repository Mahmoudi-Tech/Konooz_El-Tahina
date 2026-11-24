import { WA_LINK } from "./Contact";

export function FloatingWhatsApp() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" className="whatsapp-float" aria-label="تواصل معنا على واتساب">
      <i className="fab fa-whatsapp" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <img src="https://i.ibb.co/SXYPn7Wf/Logo.png" alt="لوجو كنوز الطحينة" />
            <span>كنوز الطحينة</span>
          </div>
          <p>تطبيقك الأول لأجود أنواع الطحينة الطبيعية والمنتجات الصحية. جودة من قلب الطبيعة.</p>
          <div className="social-links">
            <a href="#" aria-label="فيسبوك"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="إنستجرام"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="تويتر"><i className="fab fa-twitter" /></a>
            <a href="https://wa.me/201211372060" target="_blank" rel="noopener" className="wa" aria-label="واتساب">
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#features">المميزات</a></li>
            <li><a href="#download">تحميل التطبيق</a></li>
            <li><a href="#contact">اتصل بنا</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>المنتجات</h4>
          <ul>
            <li><a href="#">طحينة السمسم</a></li>
            <li><a href="#">حلاوة طحينية</a></li>
            <li><a href="#">زيت السمسم</a></li>
            <li><a href="#">عروض خاصة</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>الدعم</h4>
          <ul>
            <li><a href="#">الأسئلة الشائعة</a></li>
            <li><a href="#">سياسة الخصوصية</a></li>
            <li><a href="#">شروط الاستخدام</a></li>
            <li><a href="refund-policy.html">سياسة الاسترجاع</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          جميع الحقوق محفوظة 2026 -{" "}
          <a href="http://mahmouditech.is-a.dev/" target="_blank" rel="noopener">MahmoudiTech</a>
        </p>
      </div>
    </footer>
  );
}
