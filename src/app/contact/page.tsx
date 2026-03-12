import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | My Portfolio',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <section className="section-padding bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you!
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Let&apos;s Connect
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  I&apos;m currently available for freelance work and open to
                  discussing new projects, creative ideas, or opportunities to
                  be part of your vision.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: '📧',
                    label: 'Email',
                    value: 'alex@example.com',
                    href: 'mailto:alex@example.com',
                  },
                  {
                    icon: '💼',
                    label: 'LinkedIn',
                    value: 'linkedin.com/in/alexjohnson',
                    href: '#',
                  },
                  {
                    icon: '🐙',
                    label: 'GitHub',
                    value: 'github.com/alexjohnson',
                    href: '#',
                  },
                  {
                    icon: '🐦',
                    label: 'Twitter',
                    value: '@alexjohnson_dev',
                    href: '#',
                  },
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all duration-200 group"
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {contact.label}
                      </div>
                      <div className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                  Response Time
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  I typically respond within 24-48 hours. For urgent matters,
                  feel free to reach out directly via email.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
