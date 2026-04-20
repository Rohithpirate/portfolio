import { Github, Linkedin, Instagram, Mail, MessageCircle } from "lucide-react";
import { socials } from "@/lib/socials";

const Footer = () => {
  return (
    <footer className="mt-24 pb-8 px-4">
      <div className="glass-strong max-w-6xl mx-auto rounded-2xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="gradient-text font-semibold">Rohith K</span> — Crafted with passion.
        </p>
        <div className="flex items-center gap-3">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform">
            <Github className="w-4 h-4" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform">
            <MessageCircle className="w-4 h-4" />
          </a>
          <a href={`mailto:${socials.email}`} aria-label="Email" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
