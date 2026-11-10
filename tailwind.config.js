/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg-primary)',
        bgSecondary: 'var(--bg-secondary)',
        surfaceCard: 'var(--surface-card)',
        brandOlive: 'var(--brand-olive)',
        brandSage: 'var(--brand-sage)',
        accentGold: 'var(--accent-gold)',
        accentTerracotta: 'var(--accent-terracotta)',
        textPrimary: 'var(--text-primary)',
        textMuted: 'var(--text-muted)',
        borderSubtle: 'var(--border-subtle)',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        sans: ["'Plus Jakarta Sans'", '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  plugins: [],
};

