import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ChevronDown,
  Moon,
  Cross,
  Church,
  Users,
  Megaphone,
  Radio,
  Briefcase,
  Wallet,
  Star,
} from "lucide-react";
import { BPH, DIVISI } from "@/data/structureData";

/* =====================
   ICON MAP DIVISI
===================== */
const divisiIcons: Record<string, any> = {
  "Kerohanian Islam": Moon,
  "Kerohanian Kristen Protestan": Cross,
  "Kerohanian Khatolik": Church,
  "Organisasi dan Kekeluargaan": Users,
  "Hubungan Masyarakat": Megaphone,
  "Komunikasi & Informasi": Radio,
  "Keprofesian dan Skill": Briefcase,
  "Usaha Dana": Wallet,
  "Minat dan Bakat": Star,
};

/* =====================
   ANIMATION
===================== */
const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const StructureSection = () => {
  const [activeDivisi, setActiveDivisi] = useState<string | null>(null);
  const divisiRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section
      id="structure"
      className="relative py-24 lg:py-32 bg-secondary/20 overflow-hidden"
    >
      <div className="section-container relative z-10">

        {/* ================= HEADER ================= */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Struktur <span className="text-gradient">Organisasi</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Kepengurusan HMJ Teknik Informatika
          </p>
        </motion.div>

        {/* ================= BPH ================= */}
        <div className="relative mb-32">
          <h3 className="text-xl font-display font-semibold text-center mb-14">
            Badan Pengurus Harian
          </h3>

          {/* Ketua & Wakil */}
          <div className="relative flex flex-col md:flex-row justify-center gap-10 mb-20">
            {[BPH.ketua, BPH.wakil].map((p, i) => (
              <motion.div
                key={p.role}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative w-full max-w-md p-8 rounded-3xl
                           bg-gradient-card border border-primary/30 text-center"
              >
                <span className="inline-block px-4 py-1 mb-3 bg-primary/20
                                 text-primary rounded-full text-sm">
                  {p.role}
                </span>
                <h4 className="text-2xl font-display font-bold">{p.name}</h4>
                <p className="text-muted-foreground text-sm">
                  Angkatan {p.angkatan}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sekretaris & Bendahara */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[...BPH.sekretaris, ...BPH.bendahara].map((p, i) => (
              <motion.div
                key={p.name}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-card border
                           border-border/50 text-center"
              >
                <span className="inline-block px-3 py-1 mb-2
                                 bg-secondary rounded-full text-xs">
                  {p.role}
                </span>
                <h5 className="font-semibold text-lg">{p.name}</h5>
                <p className="text-muted-foreground text-sm">
                  Angkatan {p.angkatan}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= DIVISI ================= */}
        <h3 className="text-xl font-display font-semibold text-center mb-14">
          Divisi
        </h3>

        <div className="space-y-6 max-w-5xl mx-auto">
          {DIVISI.map((d, i) => {
            const Icon = divisiIcons[d.name] || Users;
            const isActive = activeDivisi === d.name;

            return (
              <div
                key={d.name}
                ref={(el) => (divisiRefs.current[d.name] = el)}
                className="rounded-2xl bg-gradient-card border border-border/50"
              >
                {/* HEADER CARD */}
                <button
                  onClick={() => {
                    const next = isActive ? null : d.name;
                    setActiveDivisi(next);

                    if (!isActive) {
                      setTimeout(() => {
                        divisiRefs.current[d.name]?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      }, 120);
                    }
                  }}
                  className="w-full flex items-center justify-between p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15
                                    flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">{d.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {d.anggota.length} anggota
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DETAIL (AUTO SCROLL DEKAT) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      {/* Koordinator */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-primary/10">
                          <p className="text-xs text-muted-foreground">
                            Koordinator
                          </p>
                          <p className="font-semibold">
                            {d.koordinator.name}
                          </p>
                          <p className="text-xs">
                            Angkatan {d.koordinator.angkatan}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-secondary">
                          <p className="text-xs text-muted-foreground">
                            Wakil Koordinator
                          </p>
                          <p className="font-semibold">
                            {d.wakilKoordinator.name}
                          </p>
                          <p className="text-xs">
                            Angkatan {d.wakilKoordinator.angkatan}
                          </p>
                        </div>
                      </div>

                      {/* Anggota */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {d.anggota.map((a) => (
                          <div
                            key={a.name}
                            className="p-3 rounded-lg bg-secondary/60 text-sm"
                          >
                            <p className="font-medium">{a.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Angkatan {a.angkatan}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
