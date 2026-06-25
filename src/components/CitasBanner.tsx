"use client";

import { useEffect, useState } from "react";
import { citas } from "@/lib/site";

const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export default function CitasBanner() {
  // Calculated in the browser so it always shows the visitor's current month.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const year = today?.getFullYear() ?? 0;
  const month = today?.getMonth() ?? 0;
  const todayNum = today?.getDate() ?? 0;
  const daysInMonth = today ? new Date(year, month + 1, 0).getDate() : 0;
  // Number of leading blank cells so day 1 falls on its real weekday (Monday-start grid).
  const leadingBlanks = today ? (new Date(year, month, 1).getDay() + 6) % 7 : 0;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section id="citas" className="py-20 bg-gradient-to-br from-green-800 to-green-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">{citas.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{citas.title}</h2>
            <p className="text-green-100 leading-relaxed mb-6 max-w-lg">{citas.subtitle}</p>

            <div className="flex items-center gap-3 mb-8 text-green-100">
              <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{citas.schedule}</span>
            </div>

            <a
              href={citas.cta.href}
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
            >
              {citas.cta.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="/cronograma-citas"
              className="ml-3 inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Cronograma de citas
            </a>
          </div>

          {/* Calendar visual */}
          <div className="lg:justify-self-end w-full max-w-sm">
            <div className="bg-white rounded-3xl p-6 shadow-2xl text-gray-800">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-green-700 font-bold text-lg leading-none">Consulta Externa</p>
                  <p className="text-gray-400 text-sm mt-1 capitalize">
                    {today ? `${monthNames[month]} ${year}` : "Programación mensual"}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                {weekDays.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {Array.from({ length: leadingBlanks }).map((_, i) => (
                  <span key={`blank-${i}`} />
                ))}
                {days.map((d) => {
                  const isToday = d === todayNum;
                  return (
                    <span
                      key={d}
                      aria-current={isToday ? "date" : undefined}
                      className={`py-1.5 rounded-lg ${isToday ? "bg-green-600 text-white font-bold ring-2 ring-green-300" : "text-gray-600"}`}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded bg-green-600 inline-block" />
                Día de hoy · Atención de lunes a sábado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
