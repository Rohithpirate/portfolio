import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MessageCircle, MapPin, Sparkles } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import { socials } from "@/lib/socials";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { Send, Briefcase } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", value: "@Rohithpirate", href: socials.github, gradient: "from-foreground to-muted-foreground" },
  { icon: Linkedin, label: "LinkedIn", value: "Rohith K", href: socials.linkedin, gradient: "from-secondary to-primary" },
  { icon: MessageCircle, label: "WhatsApp", value: socials.whatsappDisplay, href: socials.whatsapp, gradient: "from-secondary to-accent" },
  { icon: Instagram, label: "Instagram", value: "@rohith__pirate", href: socials.instagram, gradient: "from-accent to-primary" },
  { icon: Mail, label: "Email", value: socials.email, href: `mailto:${socials.email}`, gradient: "from-primary to-accent" },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Invalid email").max(255),
    projectType: z.string().trim().min(1, "Project type is required").max(100),
    budget: z.string().trim().max(50).optional().or(z.literal("")),
    timeline: z.string().trim().max(50).optional().or(z.literal("")),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check the form",
        description: result.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    const subject = `Freelance Inquiry: ${form.projectType} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project Type: ${form.projectType}`,
      `Budget: ${form.budget || "Not specified"}`,
      `Timeline: ${form.timeline || "Not specified"}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    const mailto = `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast({ title: "Opening your email app", description: "Your message is ready to send." });
    setTimeout(() => setSending(false), 1200);
  };

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

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-3xl p-6 sm:p-8 mt-12 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Hire Me — <span className="gradient-text">Freelance</span></h2>
            <p className="text-sm text-muted-foreground">Tell me about your project and I'll get back within 24h.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <Input id="projectType" name="projectType" value={form.projectType} onChange={handleChange} placeholder="Web app, Dashboard, Data analysis…" maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (optional)</Label>
            <Input id="budget" name="budget" value={form.budget} onChange={handleChange} placeholder="$500 - $2000" maxLength={50} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="timeline">Timeline (optional)</Label>
            <Input id="timeline" name="timeline" value={form.timeline} onChange={handleChange} placeholder="2-3 weeks" maxLength={50} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="message">Project Details *</Label>
            <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Describe what you need built, key features, and any references…" rows={5} maxLength={2000} />
          </div>
          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Opens your email app with details prefilled.</p>
            <Button type="submit" disabled={sending} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow">
              <Send className="w-4 h-4 mr-2" />
              {sending ? "Opening…" : "Send Inquiry"}
            </Button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default Contact;
