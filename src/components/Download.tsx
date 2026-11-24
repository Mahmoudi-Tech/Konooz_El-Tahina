import Reveal from "./Reveal";
import { useTilt } from "../hooks";

export default function Download() {
  const ref = useTilt<HTMLElement>({ max: 5, speed: 600, perspective: 1800 });
  return (
    <Reveal className="download-wrapper" id="download">
      <section className="download" ref={ref}>
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
    </Reveal>
  );
}
