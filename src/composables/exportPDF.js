import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const useExportPDF = () => {
  const renderToCanvas = async (element) => {
    return await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
  };

  const exportarPDF = async (
    partidosAgrupados,
    formatDate,
    getFlagCode,
    nombreLiga,
  ) => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 32;
    let currentY = margin;
    let isFirstPage = true;

    const addElementToPDF = async (htmlElement) => {
      document.body.appendChild(htmlElement);
      const canvas = await renderToCanvas(htmlElement);
      document.body.removeChild(htmlElement);

      const imgData = canvas.toDataURL("image/png");
      const imgW = pageWidth - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      if (!isFirstPage && currentY + imgH > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
      }

      pdf.addImage(imgData, "PNG", margin, currentY, imgW, imgH);
      currentY += imgH + 12;
      isFirstPage = false;
    };

    const header = document.createElement("div");
    header.style.cssText = offscreenStyle(pageWidth - margin * 2);
    header.innerHTML = `
      <div style="text-align:center; padding-bottom:16px; border-bottom:3px solid #198754;">
        <h1 style="margin:0; font-size:24px; color:#111;">⚽ FIFA World Cup 2026</h1>
        <p style="margin:6px 0 0; color:#888; font-size:13px;">${nombreLiga} · Calendario de partidos</p>
      </div>
    `;
    await addElementToPDF(header);

    for (const grupo of partidosAgrupados) {
      const fechaEl = document.createElement("div");
      fechaEl.style.cssText = offscreenStyle(pageWidth - margin * 2);
      fechaEl.innerHTML = `
        <div style="
          background:#198754; color:white; font-weight:bold;
          font-size:13px; padding:8px 14px; border-radius:6px;
          font-family:Arial,sans-serif;
        ">
          📅 ${formatDate(grupo.fecha)}
        </div>
      `;
      await addElementToPDF(fechaEl);

      for (const match of grupo.partidos) {
        const card = document.createElement("div");
        card.style.cssText = offscreenStyle(pageWidth - margin * 2);
        card.innerHTML = `
          <div style="
            display:flex; align-items:center; justify-content:space-between;
            padding:10px 16px; border:1px solid #dee2e6;
            border-radius:8px; background:#f8f9fa;
            font-family:Arial,sans-serif;
          ">
            <!-- LOCAL -->
            <div style="flex:1; display:flex; align-items:center; justify-content:flex-end; gap:10px;">
              <span style="font-weight:700; font-size:13px;">${match.homeTeam}</span>
              <div style="width:28px;height:28px;border:2px solid #198754;border-radius:4px;background:white;"></div>
            </div>

            <!-- CENTRO -->
            <div style="text-align:center; padding:0 14px; min-width:100px;">
              <div style="font-weight:700; font-size:15px; color:#333;">${match.time}</div>
              <div style="font-size:10px; color:#999; margin-top:2px;">Grupo ${match.group}</div>
              <div style="font-size:10px; color:#bbb; margin-top:1px;">${match.stadium || ""}</div>
            </div>

            <!-- VISITANTE -->
            <div style="flex:1; display:flex; align-items:center; justify-content:flex-start; gap:10px;">
              <div style="width:28px;height:28px;border:2px solid #198754;border-radius:4px;background:white;"></div>
              <span style="font-weight:700; font-size:13px;">${match.awayTeam}</span>
            </div>
          </div>
        `;
        await addElementToPDF(card);
      }
    }
    pdf.save(`WorldCup2026_${nombreLiga}.pdf`);
  };

  const offscreenStyle = (width) => `
    width: ${width}px;
    position: absolute;
    left: -9999px;
    top: 0;
    background: #ffffff;
  `;

  return { exportarPDF };
};
