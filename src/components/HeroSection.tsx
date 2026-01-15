import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowDown, Users, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import CircuitBackground from "./CircuitBackground";
import { useEffect } from "react";

/* ===============================
   Helper: Animated Number
================================ */
const AnimatedNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
};

/* ===============================
   Hero Section
================================ */
const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <CircuitBackground />

      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Organisasi Mahasiswa Aktif
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            Himpunan Mahasiswa Jurusan{" "}
            <span className="text-gradient">Teknik Informatika</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Bersama membangun generasi teknologi yang inovatif, kreatif, dan
            berdaya saing tinggi untuk masa depan Indonesia yang lebih baik.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("#structure")}
            >
              Jelajahi Struktur
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("#programs")}
            >
              Program Kerja
            </Button>
          </motion.div>

          {/* ===============================
              Stats (Animated, Hero Size)
          ================================ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            <div className="stat-card">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                <AnimatedNumber value={150} />+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Anggota Aktif
              </p>
            </div>

            <div className="stat-card">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                <AnimatedNumber value={20} />+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Program Tahunan
              </p>
            </div>

            <div className="stat-card">
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                <AnimatedNumber value={10} />+
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Prestasi
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("#about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
