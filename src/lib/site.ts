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
  { label: "Oficinas", href: "/oficinas" },
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
    paragraphs: [
      "Hasta los años 1930, Cusco tenía sólo el Hospital de la Almudena que, inaugurado en el siglo XVII, se encontraba ya vetusto. Ante esta situación, la Sociedad de Beneficencia del Cusco, presidida en esos años por Roberto Castañeda Garmendia, impulsó la adquisición de un terreno en la Plazoleta de Belén, distrito de Santiago, para la construcción de un nuevo hospital. Para ello se contó con la participación del entonces alcalde del Cusco coronel César R. Mendiburu, el prefecto, coronel Jorge Vargas, el obispo Pedro Pascual Farfán y otros vecinos. La adjudicación del terreno se formalizó el 30 de mayo de 1933.",
      "El hospital fue denominado «Hospital Mixto del Cuzco» como aún hoy puede apreciarse en el escudo que lleva en la portada de su edificio administrativo y fue durante varios años el principal hospital de la ciudad hasta la construcción del Hospital Regional ubicado en la Avenida de la Cultura en 1964. En el frontis del Hospital se puso con caracteres en alto relieve la frase bíblica «amar a Dios y al prójimo como a ti mismo». Posteriormente, por acuerdo de la Beneficencia, se le puso al Hospital el nombre de Antonio Lorena, en homenaje a la memoria del médico cusqueño Antonio Lorena Rozas.",
      "Desde 1972 el edificio del hospital forma parte de la Zona Monumental del Cusco declarada como Monumento Histórico del Perú. Asimismo, en 1983 al ser parte del casco histórico de la ciudad del Cusco, forma parte de la zona central declarada por la UNESCO como Patrimonio Cultural de la Humanidad.",
      "En el año 2012, se licitó la construcción del nuevo local del hospital. La obra fue adjudicada a favor de la empresa brasileña OAS por un monto mayor a los 197 millones de soles durante la gestión de Jorge Acurio Tito como Presidente regional del Cusco. La obra debió culminarse en octubre del 2014 lo que no sucedió. El sucesor de Acurio, Edwin Licona, resolvió el contrato con la empresa constructora en marzo del 2015 ante el retraso y la existencia de irregularidades en la firma de adendas al contrato por parte del expresidente Acurio y su sucesor René Concha.",
      "En el 2019, dentro del escándalo de corrupción que envuelve a las empresas OAS y Odebrecht, se conoció de declaraciones de la empresa OAS que afirma haber pagado una coima de más de 15 millones de soles al expresidente Acurio para lograr la adjudicación de la obra. En agosto de ese año, el gobierno peruano firmó un convenio con el gobierno regional del Cusco para realizar las acciones necesarias para la culminación del hospital hacia el año 2021 en un proceso libre de corrupción. Hasta la fecha, el hospital aún no es culminado y atiende en el Hospital de Contingencias de la urbanización Huancaro en el distrito de Santiago.",
    ],
  },
  /**
   * Authorities / organizational chart. Replace the placeholder names with
   * the current officials of the hospital.
   */
  authorities: [
    { role: "Dirección General", name: "Nombre por asignar", area: "Órgano de Dirección" },
    { role: "Sub Dirección", name: "Nombre por asignar", area: "Órgano de Dirección" },
    { role: "Oficina de Administración", name: "Nombre por asignar", area: "Órgano de Apoyo" },
    { role: "Oficina de Planeamiento", name: "Nombre por asignar", area: "Órgano de Asesoramiento" },
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
    image: "/images/658156365_1551641510306784_1776806502294376841_n.jpg",
    eyebrow: "Más de 90 años de historia",
    title: "Un legado al servicio",
    highlight: "de la salud cusqueña.",
    text: "Desde 1933 cuidamos la salud de las familias del Cusco, creciendo junto a nuestra ciudad con vocación de servicio público.",
    primary: { label: "Conoce nuestra historia", href: "/#nosotros" },
    secondary: { label: "Especialidades", href: "/#especialidades" },
  },
  {
    image: "/images/514265807_1299139998890271_3743028773946701607_n.jpg",
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
    title: "Correo Institucional",
    desc: "Accede al webmail del personal del Hospital Antonio Lorena.",
    icon: "mail",
    href: site.contact.webmail,
    external: true,
    image: "/images/photo-1.jpg",
  },
  {
    title: "Portal de Transparencia",
    desc: "Documentos normativos, planes y resoluciones de la institución.",
    icon: "documents",
    href: "/documentos-gestion",
    external: false,
    image: "/images/photo-2.jpg",
  },
  {
    title: "Revista Científica",
    desc: "Publicación de investigación en salud del HAL.",
    icon: "journal",
    href: "https://revistacientifica.hospitalantoniolorena.gob.pe/",
    external: true,
    image: "/images/hero.jpeg",
  },
  {
    title: "Libro de Reclamaciones",
    desc: "Registra tu queja o sugerencia de forma virtual.",
    icon: "complaints",
    href: "https://docs.google.com/forms/d/1h5YaZZ_OhtkeQOl4fR5h_T-TjRsaBi9S1aCQ_VuDjaM/preview",
    external: true,
    image: "/images/photo-1.jpg",
  },
  {
    title: "Portal de Transparencia",
    desc: "Consulta la información pública del hospital.",
    icon: "transparency",
    href: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=13471",
    external: true,
    image: "/images/photo-2.jpg",
  },
  {
    title: "Solicitud de Acceso a la Información",
    desc: "Solicita información pública según la Ley de Transparencia.",
    icon: "info",
    href: "https://docs.google.com/forms/d/1ALZN1JWisr477eQG0sCW2MBimHjg12tiZ3P_aGDaexw/preview",
    external: true,
    image: "/images/hero.jpeg",
  },
  {
    title: "Mesa de Partes Virtual",
    desc: "Presenta tus documentos y trámites de forma virtual.",
    icon: "inbox",
    href: "#",
    external: true,
    image: "/images/photo-1.jpg",
  },
  {
    title: "Citas en Línea",
    desc: "Programa tu cita médica en Consulta Externa.",
    icon: "calendar",
    href: "/citas",
    external: false,
    image: "/images/photo-2.jpg",
  },
  {
    title: "Denuncias",
    desc: "Ingresa tu denuncia.",
    icon: "chart",
    href: "https://docs.google.com/forms/d/1xL4vzFPJ-a5xC2e7WfobdL0Mm5ODkr_Alm9o4mjo4l8/preview",
    external: true,
    image: "/images/hero.jpeg",
  },
];

/** Enlaces de interés a instituciones públicas. */
export const enlacesInteres = [
  { name: "MEF", full: "Ministerio de Economía y Finanzas", href: "https://www.gob.pe/mef" },
  { name: "SIS", full: "Seguro Integral de Salud", href: "https://www.gob.pe/sis" },
  { name: "DIGEMID", full: "Dirección General de Medicamentos, Insumos y Drogas", href: "https://www.digemid.minsa.gob.pe/webDigemid/" },
  { name: "DIGEMID Alertas", full: "Alertas y notas informativas DIGEMID", href: "https://www.digemid.minsa.gob.pe/webDigemid/publicaciones/alertas-modificaciones/alertas/" },
  { name: "GORE Cusco", full: "Gobierno Regional del Cusco", href: "https://www.gob.pe/regioncusco" },
  { name: "GERESA Cusco", full: "Gerencia Regional de Salud Cusco", href: "https://www.gob.pe/regioncusco-geresa" },
];

/** Document management categories for the "Portal de Transparencia" page. */
export const documentosGestion = [
  {
    slug: "planeamiento-y-organizacion",
    title: "Planeamiento y Organización",
    desc: "Instrumentos de gestión institucional: PEI, POI, ROF, MOF, CAP y organigramas.",
    icon: "documents",
    documents: [
      { title: "Plan Operativo Institucional (POI) 2024", href: "/documentos/planeamiento/POI-2024-HAL.pdf" },
      { title: "Reglamento de Organización y Funciones (ROF)", href: "/documentos/planeamiento/REGLAMENTO-DE-ORGANIZACION-Y-FUNCIONES-ROF.pdf" },
      { title: "Manual de Organización y Funciones (MOF)", href: "/documentos/planeamiento/NIVEL-2.1.3.0-MANUAL-DE-ORGANIZACIONES-Y-FUNCIONES-MOF.pdf" },
      { title: "MOF — Parte I", href: "/documentos/planeamiento/MOF-PARTE-I.pdf" },
      { title: "MOF — Parte II", href: "/documentos/planeamiento/MOF-PARTE-II-HAL.pdf" },
      { title: "MOF — Parte III", href: "/documentos/planeamiento/MOF-PARTE-III.pdf" },
      { title: "Organigrama", href: "/documentos/planeamiento/ORGANIGRAMA.pdf" },
      { title: "Clasificador de Cargos 2025", href: "/documentos/planeamiento/CLASIFICADOR-DE-CARGO-2025.pdf" },
      { title: "Texto Único de Procedimientos Administrativos (TUPA)", href: "/documentos/planeamiento/TUPA_HAL.pdf" },
      { title: "Tarifario 2024", href: "/documentos/planeamiento/TARIFARIO-2024.pdf" },
      { title: "Mapa de Procesos HAL 2024", href: "/documentos/planeamiento/MAPA_PROCESOS-HAL-2024-3.pdf" },
      { title: "MAPRO — Planeamiento", href: "/documentos/planeamiento/MAPRO-HAL-PLANEAMIENTO.pdf" },
      { title: "MAPRO — Logística", href: "/documentos/planeamiento/MAPRO%20LOGISTICA.pdf" },
      { title: "MAPRO — Calidad", href: "/documentos/planeamiento/MAPRO-CALIDAD.pdf" },
      { title: "MAPRO — Estadística 2025", href: "/documentos/planeamiento/MAPRO-HAL-ESTADISTICA-2025.pdf" },
      { title: "MAPRO — Unidad de Comunicaciones", href: "/documentos/planeamiento/MAPRO-HAL-UNID-COMUNICACIONES.pdf" },
      { title: "MAPRO — Patrimonio 2025", href: "/documentos/planeamiento/MAPRO-PATRIMONIO-2025.pdf" },
      { title: "MAPRO — Anatomía Patológica", href: "/documentos/planeamiento/MAPRO-ANATOMIA-PATOLOGICA.pdf" },
      { title: "MAPRO — Farmacia: Mezclas Oncológicas 2025", href: "/documentos/planeamiento/MAPRO-FARM-MEXC-ONCOLO-2025.pdf" },
      { title: "MAPRO — Farmacia: Preparados Magistrales 2025", href: "/documentos/planeamiento/MAPRO-FARM-PREP.MAGISTR-2025-1.pdf" },
    ] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "presupuesto",
    title: "Presupuesto",
    desc: "Presupuesto institucional de apertura (PIA), modificaciones y ejecución presupuestal.",
    icon: "chart",
    documents: [] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "proyectos-de-inversion-e-infobras",
    title: "Proyectos de Inversión e Infobras",
    desc: "Proyectos de inversión pública, avances de obras y registro Infobras.",
    icon: "transparency",
    documents: [] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "participacion-ciudadana",
    title: "Participación Ciudadana",
    desc: "Mecanismos de participación, audiencias públicas y rendición de cuentas.",
    icon: "complaints",
    documents: [] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "personal",
    title: "Personal",
    desc: "Información del personal, planillas, escala remunerativa y procesos de selección.",
    icon: "mail",
    documents: [
      { title: "Decreto Supremo N° 013-2025-SA", href: "/documentos/recursos-humanos/DECRETO-SUPREMO-N%C2%BA013-2025-SA.pdf" },
      { title: "Resolución Ministerial N° 432-2025-MINSA", href: "/documentos/recursos-humanos/RESOLUCION-MINISTERIAL-N%C2%B0432-2025MINSA.pdf" },
      { title: "Reglamento Interno de los Servidores Civiles (RIS)", href: "/documentos/recursos-humanos/REGLAMENTO-INTERNO-SERVIDORES-CIVILES-RIS.pdf" },
      { title: "Resolución Directoral N° 409-2024-HAL-UGRH", href: "/documentos/recursos-humanos/RESOLUCION-DIRECTORAL-N%C2%B0409-2024-HALUGRH.pdf" },
      { title: "Resolución Directoral N° 361-2024-HAL-UGRH", href: "/documentos/recursos-humanos/RESOLUCION-DIRECTORAL-N%C2%B0361-2024-HALUGRH.pdf" },
      { title: "Resolución Directoral N° 258-2023-HAL-UGRH", href: "/documentos/recursos-humanos/RESOLUCION-DIRECTORAL-N%C2%B0258-2023-HALUGRH.pdf" },
      { title: "Resolución Directoral N° 245-2023-HAL-UGRH", href: "/documentos/recursos-humanos/RESOLUCION-DIRECTORAL-N%C2%B0245-2023-HALUGRH.pdf" },
    ] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "contratacion-de-bienes-y-servicios",
    title: "Contratación de Bienes y Servicios",
    desc: "Plan anual de contrataciones, procesos de selección y órdenes de compra y servicio.",
    icon: "inbox",
    documents: [] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "actividades-oficiales",
    title: "Actividades Oficiales",
    desc: "Agenda y registro de actividades oficiales de los funcionarios del hospital.",
    icon: "calendar",
    documents: [
      { title: "Nota de Prensa N° 001-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N001-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 002-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N002-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 003-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N003-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 004-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N004-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 005-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N005-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 006-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N006-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 007-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N007-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 008-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N008-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 009-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N009-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 010-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N010-2026-UCII-HAL.pdf" },
    ] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "agenda-oficial",
    title: "Agenda Oficial",
    desc: "Agenda oficial de actividades de los funcionarios del hospital.",
    icon: "calendar",
    documents: [
      { title: "Nota de Prensa N° 001-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N001-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 002-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N002-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 003-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N003-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 004-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N004-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 005-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N005-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 006-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N006-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 007-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N007-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 008-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N008-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 009-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N009-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 010-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N010-2026-UCII-HAL.pdf" },
    ] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "comunicados",
    title: "Comunicados",
    desc: "Comunicados oficiales y notas de prensa del hospital.",
    icon: "complaints",
    documents: [
      { title: "Nota de Prensa N° 001-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N001-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 002-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N002-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 003-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N003-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 004-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N004-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 005-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N005-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 006-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N006-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 007-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N007-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 008-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N008-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 009-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N009-2026-UCII-HAL.pdf" },
      { title: "Nota de Prensa N° 010-2026-UCII-HAL", href: "/documentos/NOTICIAS-NOTASPRENSA/NOTA-DE-PRENSA-N010-2026-UCII-HAL.pdf" },
    ] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "acceso-a-la-informacion",
    title: "Acceso a la Información",
    desc: "Solicitudes de acceso a la información pública y funcionario responsable.",
    icon: "info",
    documents: [] as { title: string; date?: string; href: string }[],
  },
  {
    slug: "registro-de-visitas",
    title: "Registro de Visitas",
    desc: "Registro de visitas a los funcionarios públicos de la institución.",
    icon: "journal",
    href: "https://docs.google.com/forms/d/17nkF3ElwVmTN-Si6pc_I8GFvyve1yRfA-2CXnJXvmI4/preview",
    documents: [] as { title: string; date?: string; href: string }[],
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
