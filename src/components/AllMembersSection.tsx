import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BPH, DIVISI } from "@/data/structureData";

/* ================= TYPE ================= */
type Member = {
  name: string;
  role: string;
  angkatan?: number;
  divisi?: string;
};

/* ================= UTIL ================= */
const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "-");

const getPhoto = (name: string) =>
  `/pengurus/${slugify(name)}.jpg`;

/* ================= COMPONENT ================= */
const AllMembersSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedDivisi, setSelectedDivisi] = useState("BPH");
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  /* ================= ALL MEMBERS ================= */
  const allMembers: Member[] = [
    {
      name: BPH.ketua.name,
      role: BPH.ketua.role,
      angkatan: BPH.ketua.angkatan,
      divisi: "BPH",
    },
    {
      name: BPH.wakil.name,
      role: BPH.wakil.role,
      angkatan: BPH.wakil.angkatan,
      divisi: "BPH",
    },
    ...BPH.sekretaris.map((m) => ({ ...m, divisi: "BPH" })),
    ...BPH.bendahara.map((m) => ({ ...m, divisi: "BPH" })),
    ...DIVISI.flatMap((d) =>
      d.anggota.map((a) => ({
        name: a.name,
        role: "Anggota",
        angkatan: a.angkatan,
        divisi: d.name,
      }))
    ),
  ];

  /* ================= FILTER ================= */
  const members = useMemo(
    () => allMembers.filter((m) => m.divisi === selectedDivisi),
    [selectedDivisi]
  );

  const active = members[activeIndex];

  /* ================= RESET SAAT GANTI DIVISI ================= */
  useEffect(() => {
    setActiveIndex(0);
    sliderRef.current?.scrollTo({ left: 0 });
  }, [selectedDivisi]);

  /* ================= AUTO CENTER KE AKTIF ================= */
  useEffect(() => {
    if (!sliderRef.current) return;
    const child = sliderRef.current.children[activeIndex] as HTMLElement;
    if (!child) return;

    sliderRef.current.scrollTo({
      left:
        child.offsetLeft -
        sliderRef.current.offsetWidth / 2 +
        child.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  if (!active) return null;

  /* ================= NAVIGATION ================= */
  const prev = () =>
    setActiveIndex((i) => Math.max(i - 1, 0));

  const next = () =>
    setActiveIndex((i) => Math.min(i + 1, members.length - 1));

  const divisiOptions = ["BPH", ...DIVISI.map((d) => d.name)];

  return (
    <section className="py-24 bg-background">
      <div className="section-container">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Profil <span className="text-gradient">Pengurus</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Geser atau klik panah untuk berpindah anggota
          </p>
        </div>

        {/* ================= FILTER ================= */}
        <div className="flex justify-center mb-12">
          <select
            value={selectedDivisi}
            onChange={(e) => setSelectedDivisi(e.target.value)}
            className="
              px-5 py-2 rounded-full
              bg-secondary border border-border
              text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          >
            {divisiOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* ================= MAIN CARD ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="
              max-w-md sm:max-w-lg mx-auto mb-14
              rounded-2xl sm:rounded-3xl
              p-4 sm:p-6
              bg-gradient-card border border-border/50
              text-center cursor-pointer
            "
            onClick={() => setOpenModal(true)}
          >
            <div
              className="
                relative mx-auto mb-5 overflow-hidden
                w-44 h-44 sm:w-56 sm:h-56
                rounded-xl sm:rounded-2xl
              "
            >
              <img
                src={getPhoto(active.name)}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "/images/default-profile.jpg")
                }
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg sm:text-2xl font-display font-bold">
              {active.name}
            </h3>
            <p className="text-primary text-sm sm:text-base">
              {active.role}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {active.divisi}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ================= SLIDER ================= */}
        <div className="relative max-w-full sm:max-w-3xl mx-auto">

          {/* LEFT (DESKTOP ONLY) */}
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="
              hidden md:flex
              absolute -left-6 top-1/2 -translate-y-1/2
              w-10 h-10 rounded-full
              bg-secondary border border-border
              items-center justify-center
              disabled:opacity-30
            "
          >
            <ChevronLeft />
          </button>

          {/* THUMBNAILS */}
          <div
            ref={sliderRef}
            className="
              flex gap-4 sm:gap-6
              px-4 sm:px-6
              overflow-x-auto
              scroll-smooth
              scrollbar-hide
            "
          >
            {members.map((m, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={m.name}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 transition
                    ${isActive ? "scale-110" : "opacity-60 hover:opacity-100"}
                  `}
                >
                  <div
                    className={`
                      w-16 h-16 sm:w-20 sm:h-20
                      rounded-lg sm:rounded-xl
                      overflow-hidden border-2
                      ${isActive ? "border-primary" : "border-border"}
                    `}
                  >
                    <img
                      src={getPhoto(m.name)}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/images/default-profile.jpg")
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs mt-2 w-20 sm:w-24 line-clamp-2">
                    {m.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT (DESKTOP ONLY) */}
          <button
            onClick={next}
            disabled={activeIndex === members.length - 1}
            className="
              hidden md:flex
              absolute -right-6 top-1/2 -translate-y-1/2
              w-10 h-10 rounded-full
              bg-secondary border border-border
              items-center justify-center
              disabled:opacity-30
            "
          >
            <ChevronRight />
          </button>
        </div>

        {/* ================= MODAL ================= */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
              onClick={() => setOpenModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-2xl p-6 max-w-md w-full text-center"
              >
                <img
                  src={getPhoto(active.name)}
                  className="w-36 h-36 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-xl font-bold">{active.name}</h4>
                <p className="text-primary">{active.role}</p>
                <p className="text-sm">Divisi: {active.divisi}</p>
                <p className="text-sm">Angkatan: {active.angkatan}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AllMembersSection;
