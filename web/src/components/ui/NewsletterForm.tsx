'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with newsletter service
    alert('Gracias por suscribirte. Próximamente tendrás novedades.');
    setEmail('');
  };

  return (
    <form className="flex max-w-md mx-auto gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <button
        type="submit"
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
      >
        Suscribirme
      </button>
    </form>
  );
}
