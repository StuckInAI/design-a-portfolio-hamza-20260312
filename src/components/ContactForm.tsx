'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  body?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Message is required';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', body: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg flex items-start gap-3">
          <span className="text-green-500 text-xl">✅</span>
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300">
              Message sent!
            </h3>
            <p className="text-green-700 dark:text-green-400 text-sm">
              Thanks for reaching out. I&apos;ll get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg flex items-start gap-3">
          <span className="text-red-500 text-xl">❌</span>
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-300">
              Failed to send
            </h3>
            <p className="text-red-700 dark:text-red-400 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name
                  ? 'border-red-400 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-600'
              } bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.email
                  ? 'border-red-400 dark:border-red-500'
                  : 'border-slate-300 dark:border-slate-600'
              } bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.subject
                ? 'border-red-400 dark:border-red-500'
                : 'border-slate-300 dark:border-slate-600'
            } bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Message *
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me about your project..."
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.body
                ? 'border-red-400 dark:border-red-500'
                : 'border-slate-300 dark:border-slate-600'
            } bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-none`}
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-500">{errors.body}</p>
          )}
          <p className="mt-1 text-xs text-slate-400">
            {formData.body.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
