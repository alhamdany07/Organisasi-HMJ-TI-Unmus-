import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Code2, Users, Briefcase, GraduationCap, 
  Megaphone, Handshake, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Code2,
    title: "Pelatihan Coding",
    category: "PSDM",
    description: "Workshop dan bootcamp pemrograman untuk meningkatkan skill teknis mahasiswa.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Seminar Teknologi",
    category: "PTKP",
    description: "Seminar dan talkshow dengan praktisi industri teknologi terkemuka.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Career Day",
    category: "Bistra",
    description: "Job fair dan networking dengan perusahaan teknologi untuk peluang karir.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Bakti Sosial",
    category: "Kesma",
    description: "Kegiatan sosial untuk berbagi ilmu teknologi kepada masyarakat.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Megaphone,
    title: "IT Competition",
    category: "Humas",
    description: "Kompetisi programming dan hackathon tingkat regional dan nasional.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Handshake,
    title: "Study Visit",
    category: "PTKP",
    description: "Kunjungan industri ke perusahaan teknologi untuk pengalaman nyata.",
    color: "from-pink-500 to-rose-500",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 3;
  const maxSlide = Math.max(0, programs.length - slidesPerView);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <section id="programs" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-primary font-display font-semibold text-sm uppercase tracking-wider">
              Program Kerja
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4">
              Program Kerja <span className="text-gradient">Unggulan</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Berbagai program inovatif yang dirancang untuk mengembangkan potensi mahasiswa.
            </p>
          </div>

          {/* Carousel controls - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className="disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Programs grid - Mobile */}
        <div className="grid sm:grid-cols-2 gap-6 lg:hidden">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold bg-secondary rounded-full text-muted-foreground">
                    {program.category}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Programs carousel - Desktop */}
        <div className="hidden lg:block overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentSlide * (100 / slidesPerView + 2) + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex-shrink-0 w-[calc(33.333%-1rem)] p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold bg-secondary rounded-full text-muted-foreground">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel indicators */}
        <div className="hidden lg:flex justify-center gap-2 mt-8">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-primary" : "bg-secondary hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
