import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { useTilt } from "../hooks";

const WA_NUMBER = "201211372060";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن منتجات كنوز الطحينة")}`;

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useTilt<HTMLFormElement>({ max: 5, speed: 500 });

  const send = (e: FormEvent) => {
    e.preventDefault();
    let text = `مرحباً، أنا ${name.trim()}\n`;
    if (phone.trim()) text += `رقم هاتفي: ${phone.trim()}\n`;
    text += `\n${message.trim()}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <Reveal className="section-header">
          <h2>
            تواصل <span>معنا</span> عبر واتساب
          </h2>
          <p>نحن هنا للإجابة على استفساراتك عبر واتساب على مدار الساعة</p>
        </Reveal>
        <div className="contact-container">
          <div className="contact-info">
            <h3>دعنا نتحدث على واتساب! 💬</h3>
            <p>
              إذا كان لديك أي سؤال أو استفسار عن المنتجات أو الطلبات أو سياسة الاسترجاع، تواصل معنا
              مباشرة عبر واتساب وسنرد عليك في أسرع وقت.
            </p>
            <Reveal>
              <div className="contact-item">
                <i className="fab fa-whatsapp wa-icon" />
                <div>
                  <strong>واتساب</strong>
                  <span className="phone-number" dir="ltr">+20 12 11372060</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="contact-item">
                <i className="fas fa-envelope" />
                <div>
                  <strong>البريد الإلكتروني</strong>
                  <span dir="ltr">karas33999@gmail.com</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="contact-item">
                <i className="fas fa-location-dot" />
                <div>
                  <strong>العنوان</strong>
                  <span>الشرقية - الزقازيق - شارع الزراعة</span>
                </div>
              </div>
            </Reveal>
            <Reveal style={{ marginTop: 30 }}>
              <a href={WA_LINK} target="_blank" rel="noopener" className="whatsapp-btn-3d">
                <i className="fab fa-whatsapp" style={{ fontSize: 22 }} />
                ابدأ محادثة واتساب الآن
              </a>
            </Reveal>
          </div>
          <Reveal>
            <form className="contact-form" onSubmit={send} ref={formRef}>
              <div className="form-group">
                <label htmlFor="waName">الاسم الكامل</label>
                <input id="waName" type="text" placeholder="أدخل اسمك" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="waPhone">رقم الهاتف (اختياري)</label>
                <input id="waPhone" type="tel" placeholder="01xxxxxxxxx" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="waMessage">رسالتك</label>
                <textarea id="waMessage" placeholder="اكتب رسالتك هنا..." required value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <button type="submit" className="whatsapp-btn-3d w-100">
                <i className="fab fa-whatsapp" style={{ fontSize: 22 }} />
                إرسال عبر واتساب
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { WA_LINK };
