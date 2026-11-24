import Reveal from "./Reveal";
import { useTilt } from "../hooks";

const FEATURES = [
  { icon: "fa-leaf", title: "100% طبيعي", text: "طحينة طبيعية خالية من المواد الحافظة والإضافات الصناعية، من قلب الطبيعة مباشرة." },
  { icon: "fa-truck-fast", title: "توصيل سريع", text: "خدمة توصيل سريعة إلى باب منزلك في جميع أنحاء الجمهورية خلال 24 ساعة." },
  { icon: "fa-award", title: "جودة مضمونة", text: "منتجاتنا حاصلة على شهادات الجودة العالمية، وضمان استرداد كامل." },
  { icon: "fa-mobile-screen", title: "تطبيق سهل", text: "واجهة استخدام بسيطة وممتعة، اطلب منتجاتك واستمتع بالوصفات الحصرية." },
  { icon: "fa-utensils", title: "وصفات حصرية", text: "مئات الوصفات الشهية باستخدام الطحينة، من أطباق رئيسية إلى حلويات." },
  { icon: "fa-gift", title: "عروض مميزة", text: "خصومات وعروض حصرية لمستخدمي التطبيق، ونظام نقاط مكافآت مجزٍ." },
];

function FeatureCard({ icon, title, text }: (typeof FEATURES)[number]) {
  const ref = useTilt<HTMLDivElement>({ max: 14, speed: 400, glare: true, "max-glare": 0.25 });
  return (
    <div className="feature-card" ref={ref}>
      <div className="feature-icon">
        <i className={`fas ${icon}`} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="section" id="features">
      <Reveal className="section-header">
        <h2>
          لماذا <span>كنوز الطحينة</span>؟
        </h2>
        <p>نقدم لك تجربة فريدة ومميزة مع أفضل ما في عالم الطحينة</p>
      </Reveal>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 90}>
            <FeatureCard {...f} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
