import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MessageCircle, MapPin, Sparkles } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { socials } from "@/lib/socials";

const links = [
  { icon: Github, label: "GitHub", value: "@Rohithpirate", href: socials.github, gradient: "from-foreground to-muted-foreground" },
  { icon: Linkedin, label: "LinkedIn", value: "Rohith K", href: socials.linkedin, gradient: "from-secondary to-primary" },
  { icon: MessageCircle, label: "WhatsApp", value: socials.whatsappDisplay, href: socials.whatsapp, gradient: "from-secondary to-accent" },
  { icon: Instagram, label: "Instagram", value: "@rohith__pirate", href: socials.instagram, gradient: "from-accent to-primary" },
  { icon: Mail, label: "Email", value: socials.email, href: `mailto:${socials.email}`, gradient: "from-primary to-accent" },
];

const Contact = () => {
  return (
    <div className="px-4 max-w-6xl mx-auto">
      <section className="grid lg:grid-cols-2 gap-8 items-center mb-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-primary" /> Let's Connect
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-foreground/80 mb-6">
            Open to internships, freelance projects, and collaborations. Drop a message — I reply fast.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" /> Vellore, Tamil Nadu, India
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="h-[350px] lg:h-[450px]">
          <Scene3D variant="contact" interactive />
        </motion.div>
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-strong rounded-2xl p-6 tilt-card group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${l.gradient} flex items-center justify-center mb-3 shadow-glow group-hover:scale-110 transition-transform`}>
              <l.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{l.label}</div>
            <div className="font-display font-bold text-lg mt-1 truncate">{l.value}</div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
