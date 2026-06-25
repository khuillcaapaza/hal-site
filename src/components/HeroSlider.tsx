"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { heroSlides, stats } from "@/lib/site";

const quickLinks = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
    title: "Emergencias 24 horas",
    desc: "Atención de urgencias todos los días del año.",
    cta: "Cómo llegar →",
    href: "/#contacto",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Consulta Externa",
    desc: "Atención de lunes a sábado por especialidad.",
    cta: "Programar cita →",
    href: "/citas",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-14h10m-10 4h10m-7 4h4" />
      </svg>
    ),
    title: "Convocatorias",
    desc: "Procesos de selección y oportunidades laborales.",
    cta: "Ver convocatorias →",
    href: "/convocatorias",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [total]);

  const slide = heroSlides[current];

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background slides */}
      <div className="absolute inset-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.image + i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== current}
          >
            <Image
              src={s.image}
              alt={s.eyebrow}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-800/35" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slide text */}
          <div key={current} className="animate-[fadeInUp_0.6s_ease]">
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest mb-4">
              {slide.eyebrow}
            </p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {slide.title}<br />
              <span className="text-green-200">{slide.highlight}</span>
            </h1>
            <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
              {slide.text}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={slide.primary.href}
                className="bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
              >
                {slide.primary.label}
              </a>
              <a
                href={slide.secondary.href}
                className="border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                {slide.secondary.label}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-white text-4xl font-bold">{stat.num}</p>
                <p className="text-green-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slider controls */}
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.image + i}
                onClick={() => goTo(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick access cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all group"
            >
              <div className="text-white mb-3">{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-green-200 text-sm mb-3">{item.desc}</p>
              <span className="text-green-200 text-sm group-hover:text-white transition-colors">{item.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
