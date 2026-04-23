import { motion } from "framer-motion";
import ResumeTilt from "@/components/three/ResumeTilt";
import { Download, FileText, Code2, BarChart3 } from "lucide-react";
import fullStackImg from "@/assets/resume-fullstack.jpg";
import dataAnalystImg from "@/assets/resume-dataanalyst.jpg";
import SEO from "@/components/SEO";

const resumes = [
  {
    title: "Full Stack Developer",
    icon: Code2,
    img: fullStackImg,
    file: "/resumes/Rohith_K_Full_Stack_Developer.pdf",
    blurb: "Frontend + backend, API integration, deployed real-world apps.",
    gradient: "from-primary to-accent",
  },
  {
    title: "Data Analyst",
    icon: BarChart3,
    img: dataAnalystImg,
    file: "/resumes/Rohith_K_Data_Analyst.pdf",
    blurb: "Excel, SQL, Python, EDA, Power BI — completed Tata, Deloitte & Quantium simulations.",
    gradient: "from-secondary to-primary",
  },
];

const Resume = () => {
  return (
    <div className="px-4 max-w-6xl mx-auto">
      <SEO
        title="Resume — Rohith K | Download CV"
        description="Download Rohith K's resumes — Full Stack Developer and Data Analyst editions. PDF format, ATS-friendly."
        path="/resume"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FileText className="w-4 h-4 text-primary" /> Two Tracks
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          My <span className="gradient-text">Resume</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pick the role you're hiring for — preview or download the PDF.
        </p>
      </motion.div>

      <div className="space-y-16">
        {resumes.map((r, i) => (
          <motion.section
            key={r.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`grid lg:grid-cols-[1fr_2fr] gap-8 items-start`}>
              <div className="lg:sticky lg:top-28 space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center shadow-glow`}>
                  <r.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl font-bold">{r.title}</h2>
                <p className="text-muted-foreground">{r.blurb}</p>
                <a
                  href={r.file}
                  download
                  className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-1"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
              </div>

              <ResumeTilt>
                <div className="glass-strong rounded-3xl p-4 sm:p-6 shadow-3d">
                  <a href={r.file} download className="block">
                    <img src={r.img} alt={`${r.title} resume preview`} loading="lazy" className="w-full h-auto rounded-xl shadow-elegant" />
                  </a>
                </div>
              </ResumeTilt>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Resume;
