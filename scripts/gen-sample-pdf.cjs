const fs = require("fs");
const path = require("path");

function makePdf(title, subtitle) {
  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>"
  );
  const content =
    "BT /F1 20 Tf 70 760 Td (" +
    title +
    ") Tj /F1 12 Tf 0 -30 Td (" +
    subtitle +
    ") Tj ET";
  objects.push("<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += i + 1 + " 0 obj\n" + obj + "\nendobj\n";
  });
  const xrefStart = pdf.length;
  pdf += "xref\n0 " + (objects.length + 1) + "\n";
  pdf += "0000000000 65535 f \n";
  offsets.forEach((off) => {
    pdf += String(off).padStart(10, "0") + " 00000 n \n";
  });
  pdf +=
    "trailer\n<< /Size " +
    (objects.length + 1) +
    " /Root 1 0 R >>\nstartxref\n" +
    xrefStart +
    "\n%%EOF";
  return Buffer.from(pdf, "latin1");
}

const outDir = path.join(process.cwd(), "public", "convocatorias", "cas-001-2026");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "bases.pdf"),
  makePdf("Bases CAS N 001-2026 (EJEMPLO)", "Reemplazar por el documento oficial.")
);
fs.writeFileSync(
  path.join(outDir, "anexos.pdf"),
  makePdf("Anexos y formatos (EJEMPLO)", "Reemplazar por el documento oficial.")
);

const rrhhDir = path.join(process.cwd(), "public", "oficinas", "recursos-humanos");
fs.mkdirSync(rrhhDir, { recursive: true });
fs.writeFileSync(
  path.join(rrhhDir, "directiva-2026.pdf"),
  makePdf("Directiva de personal 2026 (EJEMPLO)", "Reemplazar por el documento oficial.")
);

console.log("PDFs de ejemplo creados.");

