import { useRef, useState } from "react";
import { useTilt } from "../hooks";

const TABS = [
  {
    label: "المتجر",
    cards: [
      { icon: "fa-star", title: "جودة ملكية فاخرة", desc: "من أجود محاصيل السمسم" },
      { icon: "fa-jar", title: "طحينة سمسم صافي", desc: "طبيعية 100% بدون إضافات" },
    ],
  },
  {
    label: "الوصفات",
    cards: [
      { icon: "fa-utensils", title: "أشهى الوصفات الشرقية", desc: "أطباق رئيسية ومقبلات بالطحينة" },
      { icon: "fa-bowl-food", title: "حلويات صحية ومغذية", desc: "أفكار مبتكرة لمائدتك يومياً" },
    ],
  },
  {
    label: "العروض",
    cards: [
      { icon: "fa-gift", title: "خصومات حصرية 25%", desc: "للطلب الأول عبر التطبيق" },
      { icon: "fa-coins", title: "نظام نقاط ومكافآت", desc: "اجمع النقاط واستبدلها بمنتجات" },
    ],
  },
];

function PhoneMockup() {
  const [tab, setTab] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const sceneRef = useTilt<HTMLDivElement>({ max: 18, speed: 400, perspective: 1400 });

  const switchTab = (i: number) => {
    if (i === tab) return;
    setFading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setTab(i);
      setFading(false);
    }, 220);
  };

  return (
    <div className="hero-image">
      <div className="phone-float-wrapper">
        <div className="phone-stage">
          <div className="phone-scale">
            <div className="scene-3d" ref={sceneRef}>
              <div className="phone-extrusion-layer layer-1" />
              <div className="phone-extrusion-layer layer-2" />
              <div className="phone-extrusion-layer layer-3" />
              <div className="phone-extrusion-layer layer-4" />

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
                  <p>أجود أنواع الطحينة الطبيعية</p>

                  <div className="phone-tabs-3d">
                    {TABS.map((t, i) => (
                      <button
                        key={t.label}
                        type="button"
                        className={`phone-tab-btn ${i === tab ? "active" : ""}`}
                        onClick={() => switchTab(i)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className={`phone-cards-container ${fading ? "fading" : ""}`}>
                    {TABS[tab].cards.map((c) => (
                      <div className="phone-ui-card" key={c.title}>
                        <i className={`fas ${c.icon}`} />
                        <div>
                          <strong>{c.title}</strong>
                          <span>{c.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="phone-floor-shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" />
      <div className="hero-content">
        <span className="hero-badge">✨ التطبيق الأول من نوعه في العالم العربي</span>
        <h1>
          اكتشف <span>كنوز الطحينة</span> في كل وجبة
        </h1>
        <p>
          تطبيق كنوز الطحينة يقدم لك أجود أنواع الطحينة الطبيعية 100%، مع وصفات حصرية وأطباق شهية
          تناسب كل الأذواق. جودة لا مثيل لها من قلب الطبيعة إلى مائدتك.
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
      <PhoneMockup />
    </section>
  );
}
