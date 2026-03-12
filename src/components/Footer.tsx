import Link from 'next/link';

const socialLinks = [
  { label: 'GitHub', href: '#', icon: '🐙' },
  { label: 'LinkedIn', href: '#', icon: '💼' },
  { label: 'Twitter', href: '#', icon: '🐦' },
  { label: 'Email', href: 'mailto:alex@example.com', icon: '📧' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold gradient-text mb-3">&lt;Alex /&gt;</div>
            <p className="text-slate-400 text-sm max-w-xs">
              Full-stack developer passionate about building beautiful and
              functional web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-300">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-300">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{social.icon}</span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} Alex Johnson. All rights reserved.
            Built with Next.js &amp; TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
