/**
 * Central site configuration for Hospital Antonio Lorena del Cusco.
 * Real institutional data sourced from hospitalantoniolorena.gob.pe
 */

export const site = {
  name: "Hospital Antonio Lorena",
  shortName: "HAL",
  fullName: "Hospital Antonio Lorena del Cusco",
  tagline: "Celebramos nuestra historia, cuidamos tu salud",
  description:
    "Hospital público de referencia en el sur del Perú. Atención especializada, emergencias las 24 horas y compromiso con la salud de la población cusqueña.",
  location: "Cusco - Perú",
  emergencyLabel: "Emergencias 24 horas",

  contact: {
    phone: "084 224841",
    phoneRaw: "084224841",
    address: "Urb. Primavera S/N - Santiago, Cusco",
    contingency: "Hospital de Contingencias - Urb. Huancaro, Santiago",
    consultas: "Consulta Externa: Lunes a Sábado",
    emergencias: "Emergencias: 24 horas, todos los días",
    webmail: "https://webmail.hospitalantoniolorena.gob.pe/",
  },

  socials: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "X", href: "https://www.twitter.com/" },
  ],
};

export const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Citas", href: "/citas" },
  { label: "Convocatorias", href: "/convocatorias" },
  {
    label: "Nosotros",
    href: "/nosotros",
    children: [
      { label: "La organización", href: "/nosotros" },
      { label: "Historia", href: "/nosotros/historia" },
      { label: "Autoridades", href: "/nosotros/autoridades" },
    ],
  },
  { label: "Noticias", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

/**
 * Institutional content for the "Nosotros" pages
 * (/nosotros, /nosotros/historia, /nosotros/autoridades).
 * Edit these texts freely to keep the information up to date.
 */
export const nosotros = {
  intro:
    "El Hospital Antonio Lorena del Cusco es un establecimiento de salud público de referencia para la macrorregión sur del país, comprometido con una atención humana, segura y de calidad para la población.",
  mision:
    "Brindar atención integral de salud de mediana y alta complejidad a la población, con calidad, calidez y equidad, contribuyendo a mejorar la calidad de vida de las personas en la región Cusco.",
  vision:
    "Ser un hospital moderno, acreditado y reconocido como referente regional por la excelencia de sus servicios, la investigación en salud y el trato humano centrado en el paciente.",
  valores: [
    { title: "Vocación de servicio", text: "Ponemos a la persona y su salud en el centro de nuestro trabajo." },
    { title: "Calidad y seguridad", text: "Mejoramos continuamente nuestros procesos para una atención segura." },
    { title: "Equidad", text: "Atendemos a todos con igualdad de trato y oportunidades." },
    { title: "Compromiso", text: "Trabajamos con responsabilidad y ética por la comunidad cusqueña." },
  ],
  history: {
    intro:
      "Con más de 90 años de historia, el Hospital Antonio Lorena forma parte del patrimonio histórico y social del Cusco.",
    milestones: [
      {
        year: "1933",
        title: "Adjudicación del terreno",
        text: "El 30 de mayo de 1933 se adjudica el terreno en la Plazoleta de Belén, distrito de Santiago, dando origen al «Hospital Mixto del Cusco».",
      },
      {
        year: "1933",
        title: "Homenaje al Dr. Antonio Lorena Rozas",
        text: "El hospital es renombrado en honor al destacado médico cusqueño Antonio Lorena Rozas.",
      },
      {
        year: "1972",
        title: "Zona Monumental del Cusco",
        text: "El hospital pasa a integrar la Zona Monumental del Cusco.",
      },
      {
        year: "1983",
        title: "Patrimonio de la Humanidad",
        text: "Forma parte del casco histórico del Cusco declarado Patrimonio de la Humanidad por la UNESCO.",
      },
      {
        year: "Actualidad",
        title: "Hospital de referencia",
        text: "Es uno de los principales hospitales de referencia del sur del país, con servicios de creciente complejidad.",
      },
    ],
  },
  /**
   * Authorities / organizational chart. Replace the placeholder names with
   * the current officials of the hospital.
   */
  authorities: [
    { role: "Dirección General", name: "Nombre por asignar", area: "Órgano de Dirección" },
    { role: "Dirección Ejecutiva Adjunta", name: "Nombre por asignar", area: "Órgano de Dirección" },
    { role: "Oficina de Administración", name: "Nombre por asignar", area: "Órgano de Apoyo" },
    { role: "Oficina de Planeamiento Estratégico", name: "Nombre por asignar", area: "Órgano de Asesoramiento" },
    { role: "Oficina de Gestión de la Calidad", name: "Nombre por asignar", area: "Órgano de Asesoramiento" },
    { role: "Oficina de Recursos Humanos", name: "Nombre por asignar", area: "Órgano de Apoyo" },
  ],
};


/**
 * Slides for the homepage hero carousel. Each slide can highlight a
 * different message, image and pair of call-to-action buttons.
 * Add, remove or reorder slides freely to customize the homepage.
 */
export const heroSlides = [
  {
    image: "/images/photo-2.jpg",
    eyebrow: "Hospital Antonio Lorena del Cusco · Cusco - Perú",
    title: "Celebramos nuestra historia,",
    highlight: "cuidamos tu salud.",
    text: "Hospital público de referencia en el sur del Perú. Atención especializada, emergencias las 24 horas y compromiso con la salud de la población cusqueña.",
    primary: { label: "Cómo llegar", href: "/#contacto" },
    secondary: { label: "Nuestros servicios", href: "/#servicios" },
  },
  {
    image: "/images/photo-1.jpg",
    eyebrow: "Más de 90 años de historia",
    title: "Un legado al servicio",
    highlight: "de la salud cusqueña.",
    text: "Desde 1933 cuidamos la salud de las familias del Cusco, creciendo junto a nuestra ciudad con vocación de servicio público.",
    primary: { label: "Conoce nuestra historia", href: "/#nosotros" },
    secondary: { label: "Especialidades", href: "/#especialidades" },
  },
  {
    image: "/images/hero.jpeg",
    eyebrow: "Atención especializada",
    title: "Más de 30 especialidades",
    highlight: "a tu disposición.",
    text: "Consulta externa de lunes a sábado con profesionales de la salud comprometidos con tu bienestar y el de tu familia.",
    primary: { label: "Programar una cita", href: "/citas" },
    secondary: { label: "Ver convocatorias", href: "/convocatorias" },
  },
];

/** Appointment ("Citas") information for the banner and /citas page. */
export const citas = {
  eyebrow: "Consulta Externa",
  title: "Programa tu cita médica",
  subtitle:
    "Conoce el proceso para obtener una cita en Consulta Externa del Hospital Antonio Lorena. Atención de lunes a sábado por orden de llegada y citas programadas.",
  schedule: "Lunes a Sábado · 7:00 a.m. – 1:00 p.m.",
  cta: { label: "Conoce el proceso de citas", href: "/citas" },
  steps: [
    {
      title: "Acércate o llámanos",
      desc: "Solicita tu cita en el módulo de Admisión de Consulta Externa o por teléfono al 084 224841.",
    },
    {
      title: "Presenta tu documento",
      desc: "Ten a la mano tu DNI y, de contar con él, tu Seguro Integral de Salud (SIS) o documento de referencia.",
    },
    {
      title: "Elige especialidad y fecha",
      desc: "Selecciona la especialidad que necesitas y la fecha disponible según la programación médica.",
    },
    {
      title: "Asiste a tu cita",
      desc: "Lléga 20 minutos antes de la hora indicada al consultorio asignado para tu atención.",
    },
  ],
  notes: [
    "Las emergencias se atienden las 24 horas, sin necesidad de cita previa.",
    "La atención por SIS es gratuita para los asegurados.",
    "Los pacientes referidos deben presentar su hoja de referencia.",
  ],
};

export const stats = [
  { num: "1933", label: "Año de fundación" },
  { num: "24/7", label: "Emergencias todos los días" },
  { num: "+30", label: "Especialidades médicas" },
  { num: "Cusco", label: "Referente del sur del país" },
];

export const services = [
  {
    title: "Emergencias 24 horas",
    desc: "Atención de urgencias y emergencias médicas todos los días del año, sin interrupción.",
    icon: "emergency",
    image: "/images/photo-2.jpg",
  },
  {
    title: "Consulta Externa",
    desc: "Atención ambulatoria de lunes a sábado en más de 30 especialidades médicas.",
    icon: "stethoscope",
    image: "/images/photo-1.jpg",
  },
  {
    title: "Neumología",
    desc: "Atención especializada en enfermedades respiratorias, incluyendo terapias biológicas avanzadas.",
    icon: "lungs",
    image: "/images/hero.jpeg",
  },
  {
    title: "Oncología",
    desc: "Diagnóstico y tratamiento integral del cáncer con un equipo médico multidisciplinario.",
    icon: "ribbon",
    image: "/images/photo-1.jpg",
  },
  {
    title: "Gineco-Obstetricia",
    desc: "Control prenatal, atención del parto y salud de la mujer en todas las etapas de su vida.",
    icon: "maternity",
    image: "/images/photo-2.jpg",
  },
  {
    title: "Planificación Familiar",
    desc: "Métodos anticonceptivos seguros y gratuitos, orientación y consejería responsable.",
    icon: "family",
    image: "/images/hero.jpeg",
  },
  {
    title: "Vacunación",
    desc: "Inmunización para niñas, niños y adultos según el esquema nacional de vacunación.",
    icon: "vaccine",
    image: "/images/photo-1.jpg",
  },
  {
    title: "Epidemiología",
    desc: "Vigilancia, prevención y control de enfermedades para proteger la salud pública.",
    icon: "shield",
    image: "/images/photo-2.jpg",
  },
  {
    title: "Investigación y Docencia",
    desc: "Revista Científica institucional e investigación para el desarrollo de la salud.",
    icon: "book",
    image: "/images/hero.jpeg",
  },
];

export const specialties = [
  "Medicina Interna", "Cirugía General", "Pediatría", "Gineco-Obstetricia",
  "Neumología", "Oncología", "Cardiología", "Traumatología",
  "Oftalmología", "Otorrinolaringología", "Dermatología", "Urología",
  "Gastroenterología", "Neurología", "Psiquiatría", "Endocrinología",
  "Anestesiología", "Medicina Física y Rehabilitación",
];

/** Online services / institutional quick links. */
export const onlineServices = [
  { title: "Correo Institucional", desc: "Acceso al webmail del personal del hospital.", href: site.contact.webmail },
  { title: "Reporte Epidemiológico", desc: "Información de vigilancia epidemiológica.", href: "/#" },
  { title: "Documentos de Gestión", desc: "Documentos normativos y de gestión institucional.", href: "/#" },
  { title: "Revista Científica", desc: "Publicación de investigación en salud del HAL.", href: "/#" },
  { title: "Libro de Reclamaciones", desc: "Registra tu queja o sugerencia.", href: "/#" },
  { title: "Portal de Transparencia", desc: "Acceso a la información pública del hospital.", href: "/#" },
];

/** Insurance and agreements (public hospital — no pricing). */
export const insurance = {
  title: "Seguros y Convenios",
  intro:
    "El Hospital Antonio Lorena atiende a la población a través de diversos seguros y convenios, garantizando el acceso a la salud para todos.",
  items: [
    "SIS — Seguro Integral de Salud",
    "Atención a pacientes referidos de la región",
    "Convenios con instituciones públicas",
    "Oficina de Convenios, Seguros y Referencias",
    "Atención preferente para gestantes y niños",
    "Orientación al usuario y SOAT",
  ],
};
