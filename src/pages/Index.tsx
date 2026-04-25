import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, BarChart3, Sparkles, Download } from "lucide-react";
import RKGlobe from "@/components/three/RKGlobe";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="px-4">
      <SEO
        title="Rohith K — Full Stack Developer & Data Analyst Portfolio"
        description="Immersive 3D portfolio of Rohith K — Full Stack Developer and Data Analyst. Explore projects, certificates, and resume."
        path="/"
      />
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Available for opportunities
          </motion.div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="gradient-text">Rohith K</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground">
            Full Stack Developer · Data Analyst · Problem Solver
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl">
            I craft responsive web experiences and turn data into stories. Currently pursuing B.E. ECE while shipping real-world apps and AI tools.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-elegant hover:shadow-glow transition-all hover:-translate-y-1"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 glass-strong px-6 py-3 rounded-xl font-semibold hover:bg-white/80 transition-all hover:-translate-y-1"
            >
              <Download className="w-4 h-4" />
              Resume
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
            {[
              { v: "10+", l: "Certificates" },
              { v: "4+", l: "Projects" },
              { v: "2", l: "Tracks" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-center tilt-card metal-shine">
                <div className="text-2xl font-bold gradient-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          <RKGlobe interactive />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20 pointer-events-none" />
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-12"
        >
          What I <span className="gradient-text">do</span>
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Code2,
              title: "Full Stack Development",
              desc: "HTML, CSS, JavaScript, API integration. Building responsive, scalable web apps from idea to deployment.",
              gradient: "from-primary to-accent",
            },
            {
              icon: BarChart3,
              title: "Data Analytics",
              desc: "Excel, Python, SQL & Power BI. Cleaning, validating and turning raw data into clear insights.",
              gradient: "from-secondary to-primary",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-strong rounded-3xl p-8 tilt-card metal-shine"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-glow`}>
                <card.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
