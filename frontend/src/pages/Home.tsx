import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

interface Journal {
  id: number;
  title: string;
  updatedAt: string;
  excerpt?: string;
  content: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journals')
      .then(res => res.json())
      .then(data => {
        setJournals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch journals', err);
        setLoading(false);
      });
  }, []);

  return (
    <PageTransition>
      <div className="flex flex-col space-y-12 pb-24">
        <header className="mb-12 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white/90"
          >
            K Notebook
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-white/40 mt-4 text-xs md:text-sm tracking-[0.2em] uppercase font-light"
          >
            明鏡止水 — Clear mirror, still water
          </motion.p>
        </header>

        <div className="grid gap-6">
          {loading ? (
            <div className="text-white/50 text-sm tracking-widest uppercase">Loading observations...</div>
          ) : journals.length === 0 ? (
            <div className="text-white/30 text-sm tracking-widest uppercase">No thoughts recorded in orbit.</div>
          ) : (
            journals.map((journal, i) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => navigate(`/read/${journal.id}`)}
                className="glass p-6 md:p-8 cursor-pointer group hover:shadow-[0_0_40px_rgba(144,202,249,0.15)] hover:-translate-y-2 hover:border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2">
                  <h2 className="text-xl md:text-2xl font-medium text-white/80 group-hover:text-white transition-colors duration-500">
                    {journal.title}
                  </h2>
                  <span className="text-xs text-white/30 font-mono tracking-wider">
                    {new Date(journal.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/50 leading-relaxed font-light text-sm md:text-base line-clamp-3">
                  {journal.excerpt || journal.content}
                </p>
              </motion.div>
            ))
          )}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-20 flex justify-center"
        >
          <Link to="/admin" className="opacity-20 hover:opacity-80 transition-opacity duration-500">
            <Lock className="w-4 h-4 text-white" />
          </Link>
        </motion.footer>
      </div>
    </PageTransition>
  );
};
