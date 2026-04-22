import { motion } from "framer-motion";
import {
  GraduationCap, Briefcase, Sparkles, Code, Database, PenTool,
  Trophy, Target, Heart, Lightbulb, Globe, Rocket, Coffee,
  MapPin, Calendar, Mail, Award, BookOpen, Zap,
  Smartphone, BarChart3, Bot, Palette, Headphones, Music,
  Gamepad2, Camera, Quote, CheckCircle2, Wrench
} from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { Link } from "react-router-dom";

const skills = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
  Backend: ["API Integration", "Server Handling", "REST APIs"],
  "Data & Analytics": ["MS Excel", "Google Sheets", "Python", "SQL", "Power BI", "EDA", "Data Cleaning"],
  Tools: ["GitHub", "VS Code", "WordPress", "Canva", "Figma"],
  "Soft Skills": ["Problem Solving", "Debugging", "Logical Thinking", "Quick Learner", "Team Player"],
};

const journey = [
  { year: "2021", title: "Higher Secondary Completed", desc: "Finished 12th from Seventh Day Adventist HSS, Vellore.", icon: BookOpen },
  { year: "2023", title: "Started B.E. ECE", desc: "Joined Thanthai Periyar Government Institute of Technology, Vellore.", icon: GraduationCap },
  { year: "2025", title: "First Real-World Projects", desc: "Built & deployed bakery website, kitchen menu site, and AI chatbot.", icon: Rocket },
  { year: "2025", title: "Embedded Systems Internship", desc: "Completed advanced embedded systems internship at Caliber Embedded.", icon: Zap },
  { year: "2025–2026", title: "10+ Certifications Earned", desc: "Tata, Deloitte, Quantium, Lloyds, Infosys, Google, Coursera & more.", icon: Award },
  { year: "Now", title: "Building & Learning", desc: "Pursuing internships in Full Stack Development & Data Analytics.", icon: Target },
];

const facts = [
  { icon: Coffee, label: "Fueled by", value: "Curiosity & coffee" },
  { icon: Globe, label: "Languages", value: "English, Tamil" },
  { icon: Heart, label: "Loves", value: "Building real, useful apps" },
  { icon: Lightbulb, label: "Motto", value: "Learn. Build. Ship. Repeat." },
];

const About = () => {
  return (
    <div className="px-4 max-w-6xl mx-auto">
      {/* HERO */}
      <section className="grid lg:grid-cols-2 gap-8 items-center mb-20">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-primary" /> About Me
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="gradient-text">Rohith K</span> 👋
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            I'm a passionate <strong>Full Stack Developer</strong> and aspiring <strong>Data Analyst</strong> from <strong>Vellore, Tamil Nadu</strong>. Currently in my third year of B.E. Electronics & Communication Engineering at <strong>Thanthai Periyar Government Institute of Technology</strong>.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            I love turning ideas into living, breathing products — from AI chatbots and bakery websites to Power Query dashboards. Every line of code I write is an opportunity to learn something new and ship something real.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Vellore, Tamil Nadu
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <Calendar className="w-3.5 h-3.5 text-primary" /> B.E. ECE · 2023–2027
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <Mail className="w-3.5 h-3.5 text-primary" /> Open to Internships
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="h-[400px] lg:h-[500px]">
          <Scene3D variant="about" interactive />
        </motion.div>
      </section>

      {/* MY STORY */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-3xl p-8 sm:p-10 mb-20 tilt-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold">My <span className="gradient-text">Story</span></h2>
        </div>
        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p>
            My journey into tech started with a simple question — <em>"How do websites actually work?"</em> That curiosity quickly turned into late-night coding sessions, broken layouts, and the thrill of finally seeing a button do exactly what I wanted it to do.
          </p>
          <p>
            As an Electronics & Communication Engineering student, I learned circuits and signals by day, but found my real passion in front of a screen — building <strong>responsive websites</strong>, integrating <strong>APIs</strong>, and bringing static designs to life. I deployed my first real project for a local <strong>bakery in Vellore</strong>, and seeing real customers use it was the moment I knew this was for me.
          </p>
          <p>
            Soon I expanded into <strong>data analytics</strong> — completing rigorous job simulations from <strong>Tata, Deloitte, and Quantium</strong>, and getting hands-on with Excel, Power Query, Python, and SQL. I love the duality of being able to <strong>build the product</strong> AND <strong>understand the data</strong> behind it.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new tools, taking online courses (10+ certifications and counting!), or experimenting with AI to solve everyday problems — like the <strong>Pirate Aura chatbot</strong> I built and deployed.
          </p>
        </div>
      </motion.section>

      {/* QUICK FACTS */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-10"
        >
          Quick <span className="gradient-text">Facts</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 text-center tilt-card"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center mb-3 shadow-glow">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{f.label}</div>
              <div className="font-display font-bold">{f.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-center mb-10">
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([cat, items], i) => {
            const icons: Record<string, typeof Code> = {
              Frontend: Code,
              Backend: Code,
              "Data & Analytics": Database,
              Tools: PenTool,
              "Soft Skills": Sparkles,
            };
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

      {/* JOURNEY TIMELINE */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-10"
        >
          My <span className="gradient-text">Journey</span>
        </motion.h2>
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary sm:hidden" />
          <div className="space-y-6">
            {journey.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-4 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className={`hidden sm:block sm:w-1/2 ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                  <div className="glass-strong rounded-2xl p-5 inline-block tilt-card text-left">
                    <div className="text-xs uppercase tracking-wider text-primary font-bold mb-1">{j.year}</div>
                    <div className="font-display font-bold text-lg mb-1">{j.title}</div>
                    <div className="text-sm text-muted-foreground">{j.desc}</div>
                  </div>
                </div>

                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <j.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>

                <div className="flex-1 sm:hidden">
                  <div className="glass-strong rounded-2xl p-5 tilt-card">
                    <div className="text-xs uppercase tracking-wider text-primary font-bold mb-1">{j.year}</div>
                    <div className="font-display font-bold text-lg mb-1">{j.title}</div>
                    <div className="text-sm text-muted-foreground">{j.desc}</div>
                  </div>
                </div>

                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-display font-bold text-center mb-10"
        >
          By the <span className="gradient-text">Numbers</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { v: "10+", l: "Certifications", i: Award },
            { v: "4+", l: "Live Projects", i: Rocket },
            { v: "95–99%", l: "Data Accuracy", i: Target },
            { v: "2", l: "Career Tracks", i: Trophy },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 text-center tilt-card"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center mb-3 shadow-glow">
                <s.i className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION + EXPERIENCE */}
      <section className="grid md:grid-cols-2 gap-6 mb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 tilt-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold">Education</h3>
          </div>
          <ul className="space-y-4">
            <li className="border-l-2 border-primary/40 pl-4">
              <div className="font-semibold">B.E. Electronics & Communication Engineering</div>
              <div className="text-sm text-muted-foreground">Thanthai Periyar Government Institute of Technology, Vellore</div>
              <div className="text-xs text-primary font-medium mt-1">2023–2027 · Currently pursuing</div>
            </li>
            <li className="border-l-2 border-primary/40 pl-4">
              <div className="font-semibold">Higher Secondary (12th – State Board)</div>
              <div className="text-sm text-muted-foreground">Seventh Day Adventist HSS, Vellore</div>
              <div className="text-xs text-primary font-medium mt-1">2021–2022</div>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-strong rounded-3xl p-8 tilt-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold">Experience</h3>
          </div>
          <ul className="space-y-4">
            <li className="border-l-2 border-accent/40 pl-4">
              <div className="font-semibold">Embedded Systems Intern</div>
              <div className="text-sm text-muted-foreground">Caliber Embedded Technologies India Pvt Ltd</div>
              <div className="text-xs text-primary font-medium mt-1">Jul 2025 · Advanced Embedded Systems</div>
            </li>
            <li className="border-l-2 border-accent/40 pl-4">
              <div className="font-semibold">Data Analytics Job Simulations</div>
              <div className="text-sm text-muted-foreground">Tata · Deloitte · Quantium · Lloyds Banking (via Forage)</div>
              <div className="text-xs text-primary font-medium mt-1">Dec 2025 – Apr 2026</div>
            </li>
            <li className="border-l-2 border-accent/40 pl-4">
              <div className="font-semibold">Self-driven Web Projects</div>
              <div className="text-sm text-muted-foreground">Built & deployed AI chatbot, bakery & kitchen sites</div>
              <div className="text-xs text-primary font-medium mt-1">Ongoing</div>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* CORE VALUES */}
      <section className="mb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-center mb-10">
          What I <span className="gradient-text">Stand For</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: CheckCircle2, title: "Ship It", desc: "Done > perfect. I deploy real projects, get user feedback, and iterate fast." },
            { icon: Lightbulb, title: "Stay Curious", desc: "Every bug is a lesson. I read docs, watch tutorials, and break things to learn." },
            { icon: Heart, title: "Build For Humans", desc: "Code is just the means — solving real problems for real people is the goal." },
            { icon: Target, title: "Own The Outcome", desc: "I take responsibility from first commit to last bug fix in production." },
            { icon: Zap, title: "Move Fast, Test Fast", desc: "Quick prototypes, honest validation, no over-engineering." },
            { icon: Globe, title: "Open To Learn", desc: "Feedback from seniors and teammates is gold — I actively seek it." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-6 tilt-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 shadow-glow">
                <v.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT I CAN BUILD FOR YOU */}
      <section className="mb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-center mb-10">
          What I Can <span className="gradient-text">Build For You</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Smartphone, title: "Responsive Websites", desc: "Business sites, landing pages, portfolios — fast and mobile-first." },
            { icon: Bot, title: "AI Chatbots", desc: "Custom chatbots with API integration for support or automation." },
            { icon: BarChart3, title: "Data Dashboards", desc: "Excel, Power BI, and Python dashboards turning raw data into insight." },
            { icon: Wrench, title: "Web App Features", desc: "Forms, auth, APIs, and full-stack features end-to-end." },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 tilt-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center mb-3 shadow-glow">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-base mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURRENTLY */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-3xl p-8 sm:p-10 mb-20 tilt-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold">Currently <span className="gradient-text">Up To</span></h2>
        </div>
        <ul className="grid sm:grid-cols-2 gap-4 text-foreground/80">
          <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" /> <span><strong>Studying:</strong> Advanced React patterns and SQL window functions for analytics roles.</span></li>
          <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0 animate-pulse" /> <span><strong>Building:</strong> A Power BI sales dashboard from scratch using Quantium-style data.</span></li>
          <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 animate-pulse" /> <span><strong>Reading:</strong> Designing Data-Intensive Applications and Refactoring UI.</span></li>
          <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" /> <span><strong>Looking for:</strong> Summer 2026 internship in Full Stack or Data Analytics.</span></li>
        </ul>
      </motion.section>

      {/* BEYOND CODE */}
      <section className="mb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-center mb-10">
          Beyond <span className="gradient-text">The Code</span>
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { icon: Music, label: "Music", value: "Lo-fi & Tamil hits" },
            { icon: Gamepad2, label: "Gaming", value: "FPS & strategy" },
            { icon: Camera, label: "Photography", value: "Street & nature" },
            { icon: Palette, label: "Design", value: "Figma tinkerer" },
          ].map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-5 text-center tilt-card"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center mb-2 shadow-glow">
                <h.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{h.label}</div>
              <div className="font-display font-semibold text-sm mt-1">{h.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-3xl p-8 sm:p-12 mb-20 text-center tilt-card relative overflow-hidden"
      >
        <Quote className="w-12 h-12 mx-auto mb-4 text-primary opacity-60" />
        <p className="text-xl sm:text-2xl font-display italic max-w-3xl mx-auto leading-relaxed mb-4">
          "I don't just want to write code that works — I want to build things that <span className="gradient-text">people actually use</span> and come back to."
        </p>
        <div className="text-sm text-muted-foreground">— My personal mission</div>
      </motion.section>

      {/* WHAT I'M LOOKING FOR + CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 mb-20 bg-gradient-aurora text-primary-foreground text-center shadow-3d"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="relative z-10">
          <Target className="w-12 h-12 mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">What I'm Looking For</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-primary-foreground/95">
            Internship & freelance opportunities in <strong>Full Stack Development</strong> or <strong>Data Analytics</strong>. I'm eager to join a team where I can contribute, learn from senior engineers, and ship products that real people use.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/projects" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold shadow-elegant hover:shadow-glow hover:-translate-y-1 transition-all">
              <Rocket className="w-4 h-4" /> See My Work
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 glass-strong text-foreground px-6 py-3 rounded-xl font-semibold hover:-translate-y-1 transition-all">
              <Mail className="w-4 h-4" /> Get in Touch
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
