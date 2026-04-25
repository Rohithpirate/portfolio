import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useState } from "react";
import pirateAuraImg from "@/assets/project-pirate-aura.png";
import renugambalImg from "@/assets/project-renugambal.jpg";
import kitchenImg from "@/assets/project-kitchen.jpg";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

const projects = [
  {
    title: "Pirate Aura — AI Chatbot",
    description: "An AI-powered chatbot built with API integration for real-time, intelligent responses. Automates queries and improves user interaction.",
    url: "https://pirate-aura.onrender.com",
    tags: ["AI", "API", "JavaScript", "Web App"],
    gradient: "from-primary to-accent",
    image: pirateAuraImg,
  },
  {
    title: "Renugambal Sweets & Bakery",
    description: "Responsive bakery website with product display, menu features and a user-friendly layout — designed for a real local business.",
    url: "https://rohithgraces.github.io/renugambal/",
    tags: ["HTML", "CSS", "Responsive", "Business Site"],
    gradient: "from-accent to-secondary",
    image: renugambalImg,
  },
  {
    title: "Kitchen Menu Website",
    description: "Clean, structured kitchen menu site focused on UI design and clear content presentation across all devices.",
    url: "https://rohithgraces.github.io/kitchen/",
    tags: ["HTML", "CSS", "UI Design"],
    gradient: "from-secondary to-primary",
    image: kitchenImg,
  },
  {
    title: "Portfolio 3D — This Site",
    description: "Immersive 3D portfolio with React, Three.js, Framer Motion and Tailwind. Glass morphism, cursor trails and animated scenes throughout.",
    url: "https://github.com/Rohithpirate",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind"],
    gradient: "from-primary to-secondary",
    image: "https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&w=900&q=80",
  },
];

const Projects = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto">
      <SEO
        title="Projects — Rohith K | Web Development & AI Apps"
        description="Hand-picked projects by Rohith K — AI chatbots, responsive business websites, and full-stack web apps built with modern tech."
        path="/projects"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-primary" /> Selected Work
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Click any card to open the live project in a new tab.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.title} direction="up" delay={Math.min(i * 0.08, 0.4)}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group block glass-strong rounded-3xl overflow-hidden cursor-pointer hover:shadow-3d preserve-3d"
    >
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} live site preview`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 2 ? "high" : "auto"}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl glass-strong flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
          <ExternalLink className="w-4 h-4" />
        </div>
        <div className="absolute bottom-3 left-4 text-white font-display font-bold text-lg drop-shadow-lg">
          0{index + 1}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-white/60 text-xs font-medium border border-white/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default Projects;
