export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lightning bolt icon */}
      <path
        d="M30 10L20 30H28L26 50L36 30H28L30 10Z"
        fill="currentColor"
        className="text-accent"
      />
      
      {/* Circle background */}
      <circle
        cx="28"
        cy="30"
        r="22"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-accent"
        fill="none"
      />
      
      {/* Company name - BOLD */}
      <text
        x="60"
        y="30"
        fontFamily="var(--font-serif)"
        fontSize="22"
        fontWeight="900"
        fill="currentColor"
        className="text-primary"
      >
        ERIC ELECTRICAL
      </text>
      
      <text
        x="60"
        y="46"
        fontFamily="var(--font-sans)"
        fontSize="10"
        fontWeight="700"
        fill="currentColor"
        className="text-secondary"
        letterSpacing="0.1em"
      >
        TECH SOLUTIONS
      </text>
    </svg>
  );
}

// Alternative compact logo for smaller spaces
export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle background */}
      <circle
        cx="28"
        cy="28"
        r="26"
        stroke="currentColor"
        strokeWidth="3"
        className="text-accent"
        fill="none"
      />
      
      {/* Lightning bolt - thicker */}
      <path
        d="M30 14L20 28H28L26 42L36 28H28L30 14Z"
        fill="currentColor"
        className="text-accent"
        strokeWidth="1"
        stroke="currentColor"
      />
    </svg>
  );
}
