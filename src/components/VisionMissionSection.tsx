import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target, CheckCircle2 } from "lucide-react";

const missions = [
  "Meningkatkan kualitas akademik dan soft skill mahasiswa Teknik Informatika",
  "Membangun networking dan kerjasama dengan berbagai pihak",
  "Mengembangkan kreativitas dan inovasi dalam bidang teknologi",
  "Menciptakan lingkungan organisasi yang kondusif dan produktif",
  "Mengadakan kegiatan yang bermanfaat bagi mahasiswa dan masyarakat",
];

const VisionMissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="relative py-20 lg:py-32 bg-secondary/20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="section-container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Visi</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Menjadi Organisasi <span className="text-gradient">Terdepan</span> dalam Pengembangan Mahasiswa
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Mewujudkan HMJ Teknik Informatika sebagai organisasi yang unggul, inovatif, 
              dan mampu mencetak lulusan yang kompeten di bidang teknologi informasi serta 
              memiliki integritas tinggi untuk kemajuan bangsa.
            </p>

            {/* Decorative element */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-1 w-20 bg-gradient-primary rounded-full" />
              <div className="h-1 w-10 bg-primary/50 rounded-full" />
              <div className="h-1 w-5 bg-primary/30 rounded-full" />
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Misi</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8">
              Langkah Nyata Menuju <span className="text-gradient">Visi</span>
            </h3>

            <div className="space-y-4">
              {missions.map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{mission}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
