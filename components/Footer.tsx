export default function Footer() {
  return (
    <footer className="foot-bar">
      <div className="foot">
        <div className="foot-name">ARUN</div>
        <div className="foot-links">
          <a
            href="https://www.linkedin.com/in/aruntheja-vakulabharanam/"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
          <a href="mailto:aruntheja0212@gmail.com" className="foot-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
            Email
          </a>
        </div>
        <div className="foot-copy">© Aruntheja Vakulabharanam</div>
      </div>
    </footer>
  );
}
