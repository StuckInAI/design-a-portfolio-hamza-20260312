import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm text-blue-300 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for work
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Alex Johnson
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-6 font-light">
            Full-Stack Developer &amp; Open Source Enthusiast
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            I craft modern, scalable web applications with a focus on
            performance, accessibility, and exceptional user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="btn-primary text-base py-3 px-8"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>

          {/* Tech Stack Icons */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span>Built with</span>
            {['Next.js', 'TypeScript', 'Tailwind CSS', 'SQLite'].map((tech) => (
              <span
                key={tech}
                className="text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs">Scroll down</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
