"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/site";

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
        <div className="max-w-2xl">
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
      </div>
    </section>
  );
}
