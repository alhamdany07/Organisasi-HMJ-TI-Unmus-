import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Target, Lightbulb, Users2, Rocket } from "lucide-react";

/* ===============================
   Features Data
================================ */
const features = [
  {
    icon: Target,
    title: "Fokus & Terarah",
    description:
      "Menjalankan program kerja dengan fokus dan target yang jelas untuk kemajuan anggota.",
  },
  {
    icon: Lightbulb,
    title: "Inovatif",
    description:
      "Mengembangkan ide-ide baru dan solusi kreatif dalam setiap kegiatan organisasi.",
  },
  {
    icon: Users2,
    title: "Kolaboratif",
    description:
      "Membangun kerjasama yang solid antar anggota dan dengan pihak eksternal.",
  },
  {
    icon: Rocket,
    title: "Progresif",
    description:
      "Selalu bergerak maju dan berkembang mengikuti perkembangan teknologi.",
  },
];

/* ===============================
   Animated Number (SMOOTH)
   ✔ count up
   ✔ delay per kolom
   ✔ pulse on finish
   ✔ restart on scroll
================================ */
const AnimatedNumber = ({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const scale = useMotionValue(1);

  useEffect(() => {
    motionValue.set(0);

    const controls = animate(motionValue, value, {
      duration: 1.8,
      delay,
      ease: "easeOut",
      onComplete: () => {
        // pulse once
        animate(scale, [1, 1.08, 1], {
          duration: 0.25,
          ease: "easeOut",
        });
      },
    });

    return controls.stop;
  }, [value, delay, motionValue, scale]);

  return (
    <motion.span style={{ scale }}>
      {rounded}
    </motion.span>
  );
};

/* ===============================
   About Section
================================ */
const AboutSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-120px",
  });

  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-wider">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            Mengenal Lebih Dekat{" "}
            <span className="text-gradient">HMJ Teknik Informatika</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Himpunan Mahasiswa Jurusan Teknik Informatika adalah wadah bagi
            mahasiswa untuk berkembang, berkolaborasi, dan berkontribusi.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* ===============================
            STATS BAR – SMOOTH
        ================================ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-card border border-border/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 2001, label: "Tahun Berdiri", suffix: "" },
              { value: 5, label: "Departemen", suffix: "" },
              { value: 30, label: "Pengurus Inti", suffix: "+" },
              { value: 100, label: "Dedikasi", suffix: "%" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center relative">
                {/* Soft glow (static) */}
                <div className="absolute inset-0 bg-primary/10 blur-xl opacity-30 pointer-events-none" />

                <p className="relative text-3xl sm:text-4xl font-display font-bold text-gradient">
                  {isInView && (
                    <>
                      <AnimatedNumber
                        value={stat.value}
                        delay={index * 0.25}
                      />
                      {stat.suffix}
                    </>
                  )}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
