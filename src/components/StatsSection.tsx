import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, Calendar, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: 150,
    suffix: "+",
    label: "Anggota Aktif",
  },
  {
    icon: Calendar,
    value: 20,
    suffix: "+",
    label: "Program Tahunan",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Prestasi",
  },
];

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
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div
        ref={ref}
        className="section-container relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -8 }}
            className="relative group rounded-2xl bg-gradient-card border border-border/50 p-8 text-center overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <stat.icon className="w-10 h-10 mx-auto text-primary mb-4" />

              <h3 className="text-4xl font-display font-bold text-primary">
                {isInView && <AnimatedNumber value={stat.value} />}
                {stat.suffix}
              </h3>

              <p className="text-muted-foreground mt-2">
                {stat.label}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
