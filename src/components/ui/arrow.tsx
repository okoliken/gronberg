// The design's thin arrow: a 30px shaft with a 7x14 chevron
export function Arrow({ className = "", external = false }: { className?: string; external?: boolean }) {
  return (
    <svg
      viewBox="0 0 31 14"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${external ? "-rotate-45" : ""} ${className}`}
    >
      <path d="M0 7h30M23.5 0.5 30 7l-6.5 6.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ScrollArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 164" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 154L18.607 152.57L11 160.15L11 0L9 0L9 160.15L1.427 152.57L0 154L10 164L20 154Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 51 51" fill="none" aria-hidden="true" className={className}>
      <path
        d="M15.2775 0C5.61674 0 0 4.94273 0 14.8282V51H19.7709V19.9956H11.0088V14.6035C11.0088 10.5595 12.5815 9.88547 15.5022 9.88547H19.9956V0H15.2775ZM46.2819 0C36.6211 0 31.0044 4.94273 31.0044 14.8282V51H50.7753V19.9956H42.0132V14.6035C42.0132 10.5595 43.3612 9.88547 46.5066 9.88547H51V0H46.2819Z"
        fill="currentColor"
      />
    </svg>
  );
}
