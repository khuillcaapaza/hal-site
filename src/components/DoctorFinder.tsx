"use client";

import { useState } from "react";
import { specialties } from "@/lib/site";

export default function DoctorFinder() {
  const [query, setQuery] = useState("");

  const filtered = specialties.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="especialidades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Atención Especializada</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Encuentra tu especialidad</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Atendemos en más de 30 especialidades médicas a través de Consulta Externa, de lunes a sábado.
          </p>
        </div>

        {/* Search control */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar especialidad..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 bg-white"
            />
          </div>
        </div>

        {/* Specialties grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.length > 0 ? (
            filtered.map((spec) => (
              <div
                key={spec}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-green-200 transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">{spec}</p>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400 py-8">No se encontró esa especialidad.</p>
          )}
        </div>

        <div className="text-center mt-10">
          <a href="#contacto" className="inline-block border-2 border-green-700 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-700 hover:text-white transition-colors">
            Solicitar una cita
          </a>
        </div>
      </div>
    </section>
  );
}
