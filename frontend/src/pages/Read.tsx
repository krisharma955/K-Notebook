import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Journal {
  id: number;
  title: string;
  updatedAt: string;
  content: string;
}

export const Read = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/journals/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.98 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 bg-[#000000] z-[-1]"
      />
      
      <PageTransition>
        <div className="max-w-2xl mx-auto pt-10 pb-40 min-h-screen">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onClick={() => navigate('/')}
            className="flex items-center text-white/40 hover:text-white transition-colors duration-300 text-sm mb-16 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            return
          </motion.button>

          {loading ? (
            <div className="text-center text-white/50 text-sm tracking-widest uppercase mt-32">Loading record...</div>
          ) : !article ? (
            <div className="text-center text-white/50 text-sm tracking-widest uppercase mt-32">Record not found.</div>
          ) : (
            <article>
              <header className="mb-16 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  <div className="text-white/30 font-mono text-sm tracking-widest mb-6">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90 leading-tight">
                    {article.title}
                  </h1>
                </motion.div>
              </header>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="space-y-8"
              >
                {article.content.trim().split('\n').map((paragraph, idx) => (
                  paragraph.trim() ? (
                    <p key={idx} className="text-white/70 leading-relaxed font-light text-lg md:text-xl md:leading-loose text-justify text-center">
                      {paragraph.trim()}
                    </p>
                  ) : <br key={idx} />
                ))}
              </motion.div>
            </article>
          )}
        </div>
      </PageTransition>
    </>
  );
};
