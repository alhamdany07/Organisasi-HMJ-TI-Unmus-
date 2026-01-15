import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    title: "Workshop Machine Learning Batch 3",
    excerpt: "Pelatihan intensif machine learning untuk mahasiswa dengan mentor dari industri.",
    date: "15 Jan 2025",
    readTime: "5 min",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
  },
  {
    title: "HMJ TI Raih Juara 1 Hackathon Nasional",
    excerpt: "Tim HMJ berhasil memenangkan kompetisi hackathon tingkat nasional dengan inovasi aplikasi edutech.",
    date: "10 Jan 2025",
    readTime: "3 min",
    category: "Prestasi",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  },
  {
    title: "Pelantikan Pengurus Baru 2025",
    excerpt: "Serah terima jabatan dan pelantikan pengurus HMJ TI periode 2025/2026.",
    date: "5 Jan 2025",
    readTime: "4 min",
    category: "Kegiatan",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
];

const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="news" className="relative py-20 lg:py-32 bg-secondary/20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />

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
              Berita & Kegiatan
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4">
              Berita <span className="text-gradient">Terbaru</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Update terkini tentang kegiatan dan prestasi HMJ Teknik Informatika
            </p>
          </div>

          <Button variant="outline" className="w-fit">
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* News grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group rounded-2xl bg-gradient-card border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {news.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.readTime}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {news.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
