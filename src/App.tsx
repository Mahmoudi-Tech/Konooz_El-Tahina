import React, { useEffect, useRef, useState } from 'react';

interface PhoneScreenData {
  icon1: string;
  title1: string;
  desc1: string;
  icon2: string;
  title2: string;
  desc2: string;
}

const phoneScreensData: PhoneScreenData[] = [
  {
    icon1: 'fa-star',
    title1: 'جودة ملكية فاخرة',
    desc1: 'من أجود محاصيل السمسم',
    icon2: 'fa-jar',
    title2: 'طحينة سمسم صافي',
    desc2: 'طبيعية 100% بدون إضافات',
  },
  {
    icon1: 'fa-utensils',
    title1: 'أشهى الوصفات الشرقية',
    desc1: 'أطباق رئيسية ومقبلات بالطحينة',
    icon2: 'fa-bowl-food',
    title2: 'حلويات صحية ومغذية',
    desc2: 'أفكار مبتكرة لمائدتك يومياً',
  },
  {
    icon1: 'fa-gift',
    title1: 'خصومات حصرية 25%',
    desc1: 'للطلب الأول عبر التطبيق',
    icon2: 'fa-coins',
    title2: 'نظام نقاط ومكافآت',
    desc2: 'اجمع النقاط واستبدلها بمنتجات',
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [cardsAnimating, setCardsAnimating] = useState(false);

  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waMessage, setWaMessage] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phoneSceneRef = useRef<HTMLDivElement | null>(null);

  const handleTabSwitch = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
    setCardsAnimating(true);
    setTimeout(() => {
      setDisplayedTab(index);
      setCardsAnimating(false);
    }, 200);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = waName.trim();
    const phone = waPhone.trim();
    const message = waMessage.trim();
    const whatsappNumber = '201211372060';
    let text = `مرحباً، أنا ${name}\n`;
    if (phone) {
      text += `رقم هاتفي: ${phone}\n`;
    }
    text += `\n${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
    setWaName('');
    setWaPhone('');
    setWaMessage('');
  };

  // Scroll progress, navbar state, mouse parallax, and 3D particle canvas
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let pointerX = 0;
    let pointerY = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentScroll - lastScrollY) * 0.15, 6);
      lastScrollY = currentScroll;

      setScrolled(currentScroll > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
      setScrollProgress(pct);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--mouse-x', pointerX.toFixed(3));
      document.documentElement.style.setProperty('--mouse-y', pointerY.toFixed(3));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Canvas 3D particles
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle3D {
      x = 0;
      y = 0;
      z = 1;
      size = 5;
      speedY = 0.5;
      speedX = 0;
      opacity = 0.2;
      angle = 0;
      spin = 0.01;

      constructor(w: number, h: number) {
        this.reset(w, h);
        this.y = Math.random() * h;
      }

      reset(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = h + 30;
        this.z = Math.random() * 2.2 + 0.5;
        this.size = (Math.random() * 6 + 3.5) * this.z;
        this.speedY = (Math.random() * 0.7 + 0.3) * this.z;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.35 + 0.12;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.025;
      }

      update(w: number, h: number) {
        this.y -= this.speedY + scrollVelocity * 0.35 * this.z;
        this.x += this.speedX + Math.sin(this.angle) * 0.3 - pointerX * 0.4 * this.z;
        this.angle += this.spin;
        if (this.y < -40) this.reset(w, h);
        if (this.x < -40) this.x = w + 30;
        if (this.x > w + 40) this.x = -30;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        const grad = context.createRadialGradient(
          -this.size * 0.2,
          -this.size * 0.2,
          1,
          0,
          0,
          this.size
        );
        grad.addColorStop(0, `rgba(255, 223, 80, ${this.opacity + 0.15})`);
        grad.addColorStop(0.6, `rgba(212, 160, 23, ${this.opacity})`);
        grad.addColorStop(1, `rgba(139, 69, 19, 0)`);
        context.fillStyle = grad;
        context.beginPath();
        context.ellipse(0, 0, this.size, this.size * 0.62, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const particleCount = window.innerWidth < 768 ? 24 : 48;
    const particles: Particle3D[] = [];
    if (canvas) {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle3D(canvas.width, canvas.height));
      }
    }

    const animateParticles = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scrollVelocity *= 0.92;
        particles.forEach((p) => {
          p.update(canvas.width, canvas.height);
          p.draw(ctx);
        });
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 70);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal-3d').forEach((el) => {
      observer.observe(el);
    });

    // Desktop-only smooth 3D tilt (prevents mobile gyroscope from breaking 3D phone alignment)
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const tiltElements = document.querySelectorAll<HTMLElement>('[data-Desktop-tilt]');

    const handleCardMouseMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxTilt = parseFloat(el.dataset.tiltMax || '12');
      const rotateY = ((x / rect.width - 0.5) * 2 * maxTilt).toFixed(2);
      const rotateX = (((0.5 - y / rect.height) * 2) * maxTilt).toFixed(2);
      el.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleCardMouseLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      if (el.classList.contains('scene-3d')) {
        el.style.transform = '';
      } else {
        el.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
      }
    };

    if (isDesktopPointer) {
      tiltElements.forEach((el) => {
        el.addEventListener('mousemove', handleCardMouseMove);
        el.addEventListener('mouseleave', handleCardMouseLeave);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (isDesktopPointer) {
        tiltElements.forEach((el) => {
          el.removeEventListener('mousemove', handleCardMouseMove);
          el.removeEventListener('mouseleave', handleCardMouseLeave);
        });
      }
    };
  }, []);

  const currentPhoneData = phoneScreensData[displayedTab];

  return (
    <>
      {/* شريط تقدم التمرير 3D */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* خلفية الجزيئات الذهبية التفاعلية 3D */}
      <canvas id="bg-canvas" ref={canvasRef} />

      {/* شريط التنقل */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#home" className="logo">
          <img src="https://i.ibb.co/SXYPn7Wf/Logo.png" alt="لوجو كنوز الطحينة" />
          <span>كنوز الطحينة</span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
          <li>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              الرئيسية
            </a>
          </li>
          <li>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              المميزات
            </a>
          </li>
          <li>
            <a href="#download" onClick={() => setMenuOpen(false)}>
              التطبيق
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              تواصل معنا
            </a>
          </li>
        </ul>
        <a
          href="#download"
          className="btn-3d"
          style={{ padding: '10px 24px', fontSize: '14px' }}
        >
          حمّل التطبيق
        </a>
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="القائمة"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <i className="fas fa-bars" />
        </button>
      </nav>

      {/* القسم الرئيسي 3D */}
      <section className="hero" id="home">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="hero-badge">✨ التطبيق الأول من نوعه في العالم العربي</span>
          <h1>
            اكتشف <span>كنوز الطحينة</span> في كل وجبة
          </h1>
          <p>
            تطبيق كنوز الطحينة يقدم لك أجود أنواع الطحينة الطبيعية 100%، مع وصفات حصرية
            وأطباق شهية تناسب كل الأذواق. جودة لا مثيل لها من قلب الطبيعة إلى مائدتك.
          </p>
          <div className="hero-buttons">
            <a href="#download" className="btn-3d">
              <i className="fas fa-download" />
              حمّل التطبيق الآن
            </a>
            <a href="#features" className="btn-3d btn-3d-secondary">
              <i className="fas fa-cube" />
              استكشف المميزات
            </a>
          </div>
          {/* شريط إحصائيات ثلاثي الأبعاد */}
          <div className="hero-stats-3d">
            <div className="stat-pill-3d">
              <i className="fas fa-seedling" />
              <div>
                <strong>100% نقي</strong>
                <span>سمسم طبيعي فاخر</span>
              </div>
            </div>
            <div className="stat-pill-3d">
              <i className="fas fa-bolt" />
              <div>
                <strong>24 ساعة</strong>
                <span>توصيل سريع لباب البيت</span>
              </div>
            </div>
          </div>
        </div>

        {/* مجسم الهاتف ثلاثي الأبعاد التفاعلي المتناسق على الكمبيوتر والجوال */}
        <div className="hero-image">
          <div className="phone-scale-wrapper">
            <div className="phone-float-wrapper">
              <div
                className="scene-3d"
                id="phoneTiltScene"
                ref={phoneSceneRef}
                data-desktop-tilt="true"
                data-tilt-max="14"
              >
                {/* طبقات السُمك المعدني الخلفي للهاتف 3D */}
                <div className="phone-extrusion-layer layer-1" />
                <div className="phone-extrusion-layer layer-2" />
                <div className="phone-extrusion-layer layer-3" />
                <div className="phone-extrusion-layer layer-4" />

                {/* شارات عائمة في الفضاء 3D */}
                <div className="floating-badge-3d fb-1">
                  <i className="fas fa-leaf" />
                  <span>سمسم طبيعي 100%</span>
                </div>
                <div className="floating-badge-3d fb-2">
                  <i className="fas fa-truck-fast" />
                  <span>توصيل سريع لباب البيت</span>
                </div>
                <div className="floating-badge-3d fb-3">
                  <i className="fas fa-award" />
                  <span>جودة مضمونة</span>
                </div>

                <div className="phone-3d">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <img
                      src="https://i.ibb.co/SXYPn7Wf/Logo.png"
                      alt="لوجو كنوز الطحينة"
                      className="app-logo"
                    />
                    <h3>كنوز الطحينة</h3>
                    <p className="phone-subtitle">أجود أنواع الطحينة الطبيعية</p>

                    {/* تبويبات تفاعلية داخل شاشة الهاتف 3D */}
                    <div className="phone-tabs-3d">
                      <button
                        type="button"
                        className={`phone-tab-btn ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => handleTabSwitch(0)}
                      >
                        المتجر
                      </button>
                      <button
                        type="button"
                        className={`phone-tab-btn ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabSwitch(1)}
                      >
                        الوصفات
                      </button>
                      <button
                        type="button"
                        className={`phone-tab-btn ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => handleTabSwitch(2)}
                      >
                        العروض
                      </button>
                    </div>

                    {/* بطاقات بارزة من داخل الشاشة تتغير تفاعلياً */}
                    <div
                      className="phone-cards-container"
                      id="phoneCardsContainer"
                      style={{
                        opacity: cardsAnimating ? 0 : 1,
                        transform: cardsAnimating ? 'scale(0.92)' : 'scale(1)',
                      }}
                    >
                      <div className="phone-ui-card">
                        <i className={`fas ${currentPhoneData.icon1}`} id="cardIcon1" />
                        <div>
                          <strong id="cardTitle1">{currentPhoneData.title1}</strong>
                          <span id="cardDesc1">{currentPhoneData.desc1}</span>
                        </div>
                      </div>
                      <div className="phone-ui-card">
                        <i className={`fas ${currentPhoneData.icon2}`} id="cardIcon2" />
                        <div>
                          <strong id="cardTitle2">{currentPhoneData.title2}</strong>
                          <span id="cardDesc2">{currentPhoneData.desc2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="phone-floor-shadow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم المميزات 3D */}
      <section className="section" id="features">
        <div className="section-header reveal-3d">
          <h2>
            لماذا <span>كنوز الطحينة</span>؟
          </h2>
          <p>نقدم لك تجربة فريدة ومميزة مع أفضل ما في عالم الطحينة</p>
        </div>
        <div className="features-grid">
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-leaf" />
              </div>
              <h3>100% طبيعي</h3>
              <p>
                طحينة طبيعية خالية من المواد الحافظة والإضافات الصناعية، من قلب الطبيعة
                مباشرة.
              </p>
            </div>
          </div>
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-truck-fast" />
              </div>
              <h3>توصيل سريع</h3>
              <p>
                خدمة توصيل سريعة إلى باب منزلك في جميع أنحاء الجمهورية خلال 24 ساعة.
              </p>
            </div>
          </div>
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-award" />
              </div>
              <h3>جودة مضمونة</h3>
              <p>منتجاتنا حاصلة على شهادات الجودة العالمية، وضمان استرداد كامل.</p>
            </div>
          </div>
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-mobile-screen" />
              </div>
              <h3>تطبيق سهل</h3>
              <p>واجهة استخدام بسيطة وممتعة، اطلب منتجاتك واستمتع بالوصفات الحصرية.</p>
            </div>
          </div>
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-utensils" />
              </div>
              <h3>وصفات حصرية</h3>
              <p>مئات الوصفات الشهية باستخدام الطحينة، من أطباق رئيسية إلى حلويات.</p>
            </div>
          </div>
          <div className="reveal-3d">
            <div className="feature-card" data-desktop-tilt="true" data-tilt-max="10">
              <div className="feature-icon">
                <i className="fas fa-gift" />
              </div>
              <h3>عروض مميزة</h3>
              <p>خصومات وعروض حصرية لمستخدمي التطبيق، ونظام نقاط مكافآت مجزٍ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم تحميل التطبيق 3D */}
      <div className="download-wrapper reveal-3d" id="download">
        <section className="download" data-desktop-tilt="true" data-tilt-max="4">
          <div className="download-orb-3d" />
          <h2>حمّل تطبيق كنوز الطحينة الآن</h2>
          <p>متوفر للتحميل المباشر للأندرويد - وقريباً على App Store</p>
          <div className="store-buttons">
            <div className="store-btn coming-soon">
              <i className="fab fa-apple" />
              <div>
                <small>قريباً على</small>
                <strong>App Store</strong>
              </div>
              <span className="soon-badge">قريباً</span>
            </div>
            <a
              href="https://github.com/Mahmoudi-Tech/Konooz_El-Tahina/releases/download/v1.3.0/Konooz_El-Tahina-V1.3.0.apk"
              className="store-btn"
            >
              <i className="fab fa-google-play" />
              <div>
                <small>حمّل الآن (APK)</small>
                <strong>Android App</strong>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* قسم التواصل 3D */}
      <section className="section" id="contact">
        <div className="contact">
          <div className="section-header reveal-3d">
            <h2>
              تواصل <span>معنا</span> عبر واتساب
            </h2>
            <p>نحن هنا للإجابة على استفساراتك عبر واتساب على مدار الساعة</p>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              <h3>دعنا نتحدث على واتساب! 💬</h3>
              <p>
                إذا كان لديك أي سؤال أو استفسار عن المنتجات أو الطلبات أو سياسة
                الاسترجاع، تواصل معنا مباشرة عبر واتساب وسنرد عليك في أسرع وقت.
              </p>
              <div className="reveal-3d">
                <div className="contact-item">
                  <i className="fab fa-whatsapp wa-icon" />
                  <div>
                    <strong>واتساب</strong>
                    <span className="phone-number" dir="ltr">
                      +20 12 11372060
                    </span>
                  </div>
                </div>
              </div>
              <div className="reveal-3d">
                <div className="contact-item">
                  <i className="fas fa-envelope" />
                  <div>
                    <strong>البريد الإلكتروني</strong>
                    <span dir="ltr">karas33999@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="reveal-3d">
                <div className="contact-item">
                  <i className="fas fa-location-dot" />
                  <div>
                    <strong>العنوان</strong>
                    <span>الشرقية - الزقازيق - شارع الزراعة</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '30px' }} className="reveal-3d">
                <a
                  href="https://wa.me/201211372060?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D9%83%D9%86%D9%88%D8%B2%20%D8%A7%D9%84%D8%B7%D8%AD%D9%8A%D9%86%D8%A9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn-3d"
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '22px' }} />
                  ابدأ محادثة واتساب الآن
                </a>
              </div>
            </div>
            <div className="reveal-3d">
              <form
                className="contact-form"
                onSubmit={handleWhatsAppSubmit}
                data-desktop-tilt="true"
                data-tilt-max="4"
              >
                <div className="form-group">
                  <label>الاسم الكامل</label>
                  <input
                    type="text"
                    id="waName"
                    placeholder="أدخل اسمك"
                    required
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>رقم الهاتف (اختياري)</label>
                  <input
                    type="tel"
                    id="waPhone"
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>رسالتك</label>
                  <textarea
                    id="waMessage"
                    placeholder="اكتب رسالتك هنا..."
                    required
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                  />
                </div>
                <button type="submit" className="whatsapp-btn-3d w-100">
                  <i className="fab fa-whatsapp" style={{ fontSize: '22px' }} />
                  إرسال عبر واتساب
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* زر واتساب عائم 3D */}
      <a
        href="https://wa.me/201211372060?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D9%83%D9%86%D9%88%D8%B2%20%D8%A7%D9%84%D8%B7%D8%AD%D9%8A%D9%86%D8%A9"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="تواصل معنا على واتساب"
      >
        <i className="fab fa-whatsapp" />
      </a>

      {/* التذييل */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="https://i.ibb.co/SXYPn7Wf/Logo.png" alt="لوجو كنوز الطحينة" />
              <span>كنوز الطحينة</span>
            </div>
            <p>
              تطبيقك الأول لأجود أنواع الطحينة الطبيعية والمنتجات الصحية. جودة من قلب
              الطبيعة.
            </p>
            <div className="social-links">
              <a href="#home" aria-label="فيسبوك">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#home" aria-label="إنستجرام">
                <i className="fab fa-instagram" />
              </a>
              <a href="#home" aria-label="تويتر">
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://wa.me/201211372060"
                target="_blank"
                rel="noopener noreferrer"
                className="wa"
                aria-label="واتساب"
              >
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <ul>
              <li>
                <a href="#home">الرئيسية</a>
              </li>
              <li>
                <a href="#features">المميزات</a>
              </li>
              <li>
                <a href="#download">تحميل التطبيق</a>
              </li>
              <li>
                <a href="#contact">اتصل بنا</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>المنتجات</h4>
            <ul>
              <li>
                <a href="#features">طحينة السمسم</a>
              </li>
              <li>
                <a href="#features">حلاوة طحينية</a>
              </li>
              <li>
                <a href="#features">زيت السمسم</a>
              </li>
              <li>
                <a href="#features">عروض خاصة</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>الدعم</h4>
            <ul>
              <li>
                <a href="#contact">الأسئلة الشائعة</a>
              </li>
              <li>
                <a href="#contact">سياسة الخصوصية</a>
              </li>
              <li>
                <a href="#contact">شروط الاستخدام</a>
              </li>
              <li>
                <a href="refund-policy.html">سياسة الاسترجاع</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            جميع الحقوق محفوظة 2026 -{' '}
            <a
              href="http://mahmouditech.is-a.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MahmoudiTech
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
