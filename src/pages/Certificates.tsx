import { motion } from "framer-motion";
import { Download, Award, Sparkles, X } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

import aiWorkshop from "@/assets/cert-ai-workshop.jpg";
import courseraExcel from "@/assets/cert-coursera-excel.jpg";
import tata from "@/assets/cert-tata.jpg";
import deloitte from "@/assets/cert-deloitte.jpg";
import powerQuery from "@/assets/cert-power-query.jpg";
import infosys from "@/assets/cert-infosys.jpg";
import excelBasic from "@/assets/cert-excel-basic.jpg";
import quantium from "@/assets/cert-quantium.jpg";
import embedded from "@/assets/cert-embedded.jpg";
import uxDesign from "@/assets/cert-ux-design.jpg";

const certificates = [
  { title: "GenAI Powered Data Analytics", issuer: "Tata · Forage", img: tata, file: "/certificates/Tata_Data_Analytics.pdf" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte · Forage", img: deloitte, file: "/certificates/Deloitte_Data_Analytics.pdf" },
  { title: "Data Analytics Job Simulation", issuer: "Quantium · Forage", img: quantium, file: "/certificates/Quantium_Data_Analyst.pdf" },
  { title: "UX Design Job Simulation", issuer: "Lloyds Banking · Forage", img: uxDesign, file: "/certificates/UX_Design.pdf" },
  { title: "Bring AI to Work Workshop", issuer: "Google Workspace", img: aiWorkshop, file: "/certificates/AI_Workshop.pdf" },
  { title: "Artificial Intelligence for All", issuer: "Infosys Springboard", img: infosys, file: "/certificates/Infosys_AI.pdf" },
  { title: "Getting Started with Excel", issuer: "Coursera", img: courseraExcel, file: "/certificates/Coursera_Excel_Microsoft.pdf" },
  { title: "Basic Formulas in Excel", issuer: "Coursera", img: excelBasic, file: "/certificates/Microsoft_Excel_Basic.pdf" },
  { title: "Learn Power Query in 40 Minutes", issuer: "Exegi Champs", img: powerQuery, file: "/certificates/Excel_Power_Query.pdf" },
  { title: "Advanced Embedded Systems", issuer: "Caliber Embedded Internship", img: embedded, file: "/certificates/Embedded_Systems_Internship.pdf" },
];

const Certificates = () => {
  const [zoom, setZoom] = useState<typeof certificates[0] | null>(null);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <SEO
        title="Certificates — Rohith K | 10 Professional Certifications"
        description="Explore Rohith K's 10 certifications in Data Analytics, AI, Excel, Power Query, UX Design and more — from Tata, Deloitte, Quantium, Google & Infosys."
        path="/certificates"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Award className="w-4 h-4 text-primary" /> 10 Certifications
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          My <span className="gradient-text">Certificates</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Each certificate is framed in 3D — click to enlarge or download the PDF.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((c, i) => (
          <Reveal key={c.title + i} direction="up" delay={Math.min(i * 0.06, 0.4)} className="group">
            <div className="cert-frame tilt-card">
              <button onClick={() => setZoom(c)} className="block w-full" aria-label={`Open ${c.title}`}>
                <img
                  src={c.img}
                  alt={c.title}
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i < 3 ? "high" : "auto"}
                  className="w-full h-auto rounded-md aspect-[4/3] object-cover"
                />
              </button>
            </div>
            <div className="mt-4 px-2">
              <h3 className="font-display font-bold text-base leading-tight">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{c.issuer}</p>
              <div className="flex gap-2 mt-3">
                <a
                  href={c.file}
                  download
                  className="inline-flex items-center gap-1.5 bg-gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg shadow-elegant hover:shadow-glow transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={() => setZoom(c)}
                  className="inline-flex items-center gap-1.5 glass-strong text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white/80 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> View
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {zoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] bg-foreground/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-4xl w-full">
            <button onClick={() => setZoom(null)} className="absolute -top-12 right-0 w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <div className="cert-frame">
              <img src={zoom.img} alt={zoom.title} className="w-full h-auto rounded-md" />
            </div>
            <div className="mt-4 flex items-center justify-between glass-strong rounded-2xl px-5 py-3">
              <div>
                <div className="font-display font-bold">{zoom.title}</div>
                <div className="text-sm text-muted-foreground">{zoom.issuer}</div>
              </div>
              <a
                href={zoom.file}
                download
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold shadow-elegant"
              >
                <Download className="w-4 h-4" /> Download
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Certificates;
