import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#features", label: "المميزات" },
  { href: "#download", label: "التطبيق" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="logo">
          <img src="https://i.ibb.co/SXYPn7Wf/Logo.png" alt="لوجو كنوز الطحينة" />
          <span>كنوز الطحينة</span>
        </a>
        <ul className={`nav-links ${open ? "active" : ""}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#download" className="btn-3d" style={{ padding: "10px 24px", fontSize: 14 }}>
          حمّل التطبيق
        </a>
        <button className="menu-toggle" aria-label="القائمة" onClick={() => setOpen((o) => !o)}>
          <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </nav>
    </>
  );
}
