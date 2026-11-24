import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let scrollVelocity = 0;
    let lastY = window.scrollY;
    let pointerX = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
      x = 0; y = 0; z = 1; size = 5; speedY = 0.5; speedX = 0; opacity = 0.2; angle = 0; spin = 0;
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 30;
        this.z = Math.random() * 2.2 + 0.5;
        this.size = (Math.random() * 6 + 3.5) * this.z;
        this.speedY = (Math.random() * 0.7 + 0.3) * this.z;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.35 + 0.12;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.025;
      }
      update() {
        this.y -= this.speedY + scrollVelocity * 0.35 * this.z;
        this.x += this.speedX + Math.sin(this.angle) * 0.3 - pointerX * 0.4 * this.z;
        this.angle += this.spin;
        if (this.y < -40) this.reset();
        if (this.x < -40) this.x = canvas.width + 30;
        if (this.x > canvas.width + 40) this.x = -30;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const g = ctx.createRadialGradient(-this.size * 0.2, -this.size * 0.2, 1, 0, 0, this.size);
        g.addColorStop(0, `rgba(255, 223, 80, ${this.opacity + 0.15})`);
        g.addColorStop(0.6, `rgba(212, 160, 23, ${this.opacity})`);
        g.addColorStop(1, "rgba(139, 69, 19, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.62, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const count = window.innerWidth < 768 ? 22 : 48;
    const particles = Array.from({ length: count }, () => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scrollVelocity *= 0.92;
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onScroll = () => {
      scrollVelocity = Math.min(Math.abs(window.scrollY - lastY) * 0.15, 6);
      lastY = window.scrollY;
    };
    const onMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      const pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      const root = document.documentElement.style;
      root.setProperty("--mouse-x", pointerX.toFixed(3));
      root.setProperty("--mouse-y", pointerY.toFixed(3));
    };
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}
