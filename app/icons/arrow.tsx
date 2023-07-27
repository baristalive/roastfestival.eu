const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    style={{ display: "inline-block" }}
  >
    <g>
      <line
        x1="25"
        x2="25"
        y1="15"
        y2="35"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M16,25,25,35,34,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="25" cy="25" r="25" stroke="none" />
      <circle cx="25" cy="25" r="24.5" fill="none" />
    </g>
  </svg>
);

export default ArrowIcon;
