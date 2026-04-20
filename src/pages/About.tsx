import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Sparkles, Code, Database, PenTool } from "lucide-react";
import Scene3D from "@/components/Scene3D";

const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  Backend: ["API Integration", "Server Handling"],
  Data: ["Excel", "Google Sheets", "Python", "SQL", "Power BI", "EDA"],
  Tools: ["GitHub", "VS Code", "WordPress", "Canva"],
  Core: ["Problem Solving", "Debugging", "Logical Thinking", "UI Design"],
};

const About = () => {
  return (
    <div className="px-4 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-8 items-center mb-20">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-primary" /> About Me
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Building, learning, <span className="gradient-text">shipping</span>.
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            I'm <strong>Rohith K</strong>, an Electronics & Communication Engineering student at Thanthai Periyar Government Institute of Technology, Vellore. I work across the stack — designing interfaces, integrating APIs, deploying web apps, and analyzing data.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            I love turning ideas into live products. From AI chatbots to bakery websites and Power Query dashboards, I treat every project as a chance to learn something new and ship something real.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="h-[400px] lg:h-[500px]">
          <Scene3D variant="about" interactive />
        </motion.div>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-center mb-10">
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([cat, items], i) => {
            const icons: Record<string, typeof Code> = { Frontend: Code, Backend: Code, Data: Database, Tools: PenTool, Core: Sparkles };
            const Icon = icons[cat] || Code;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-6 tilt-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/60 text-xs font-medium border border-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Education + Experience */}
      <section className="grid md:grid-cols-2 gap-6 mb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold">Education</h3>
          </div>
          <ul className="space-y-4">
            <li>
              <div className="font-semibold">B.E. Electronics & Communication Engineering</div>
              <div className="text-sm text-muted-foreground">Thanthai Periyar Government Institute of Technology, Vellore · 2023–2027</div>
            </li>
            <li>
              <div className="font-semibold">Higher Secondary (12th – State Board)</div>
              <div className="text-sm text-muted-foreground">Seventh Day Adventist HSS, Vellore · 2021–2022</div>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold">Experience</h3>
          </div>
          <ul className="space-y-4">
            <li>
              <div className="font-semibold">Embedded Systems Internship</div>
              <div className="text-sm text-muted-foreground">Caliber Embedded Technologies · Jul 2025</div>
            </li>
            <li>
              <div className="font-semibold">Data Analytics Job Simulations</div>
              <div className="text-sm text-muted-foreground">Tata · Deloitte · Quantium (via Forage)</div>
            </li>
            <li>
              <div className="font-semibold">Self-driven Web Projects</div>
              <div className="text-sm text-muted-foreground">Built & deployed AI chatbot, bakery & kitchen sites</div>
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
