import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: 'What does the Global Minds Expense Calculator do?',
      answer:
        'It helps you estimate your monthly cost of studying abroad based on your selected country, lifestyle preferences, and course details — all in just a few quick steps.',
    },
    {
      question: 'How do I use the calculator?',
      answer:
        'Simply choose your destination country and answer a series of straightforward questions covering accommodation, food, transport, leisure, and mobile usage. The interface is smooth, with each question appearing automatically after you answer the previous one.',
    },
    {
      question: 'What is a German grade calculator?',
      answer:
        'A German grade calculator converts your existing GPA or percentage marks into the German 1.0–4.0 scale using a standard formula such as the Modified Bavarian Formula, where lower values indicate better performance. [web:3][web:22]',
    },
    {
      question: 'How does the German grading scale work?',
      answer:
        'Most German universities use a numeric scale from 1.0 (very good) to 4.0 (sufficient/pass), with anything above 4.0 counted as a fail, often using decimals like 1.3 or 2.7 for more precision. [web:4][web:23]',
    },
    {
      question: 'Why do I need a German grade calculator for applications?',
      answer:
        'When you apply to German universities, they often ask for your grades in the German scale, so a calculator helps convert your home grades into the format admissions teams expect. [web:4][web:22]',
    },
    {
      question: 'Which is the best European country for Indian students?',
      answer:
        "It depends on your priorities. Germany offers low tuition and high-quality education. Ireland has strong job opportunities post-study. The UK is ideal for short-duration master's programs. Netherlands and Spain offer a great cultural experience and English-taught programs.",
    },
    {
      question: 'How much is the cost of living in Germany?',
      answer:
        'For international students, the average monthly cost of living in Germany is around €850 to €1,200, depending on the city and lifestyle. Cities like Munich are more expensive, while Leipzig or Dresden are more affordable. [web:5]',
    },
    {
      question: 'Can Indian students work while studying in Europe?',
      answer:
        'Yes, most European countries allow international students to work part-time. In Germany, students can work up to 120 full or 240 half days per year. In the UK, students on a student visa can usually work up to 20 hours per week during term time. [web:12]',
    },
    {
      question: 'How do ECTS credits relate to the German grade calculator?',
      answer:
        'ECTS credits indicate the workload of each course, and when combined with your German grades they are used to compute a weighted German GPA for university evaluation or applications. [web:21][web:28]',
    },
    {
      question: 'Can I convert my Indian percentage directly to a German grade?',
      answer:
        'Yes, many tools let you input your maximum, minimum passing, and obtained marks to convert an Indian percentage or GPA into a German grade using the Modified Bavarian Formula. [web:2][web:27]',
    },
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const handleToggleView = () => {
    setShowAll((prev) => !prev);
    setOpenFaq(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* subtle glow background similar to hero illustration */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/15 to-accent/15 rounded-3xl blur-3xl"
          />

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center mb-10 sm:mb-12 text-foreground">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {visibleFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-card/90 backdrop-blur border border-border/70 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left font-semibold flex justify-between items-center gap-4 text-foreground hover:bg-muted/40 transition-colors"
                >
                  <span className="text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`min-w-[1.25rem] min-h-[1.25rem] sm:w-5 sm:h-5 text-primary transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground bg-muted/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleToggleView}
              className="inline-flex items-center justify-center px-8 py-3 text-sm sm:text-base font-semibold rounded-full border-2 border-primary text-primary bg-background/60 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md transition-all"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
