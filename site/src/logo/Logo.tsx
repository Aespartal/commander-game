export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="64"
      viewBox="0 0 180 64"
      fill="none"
    >
      <text
        x="10"
        y="50%"
        dominantBaseline="middle"
        fontFamily="Helvetica, sans-serif"
        fontSize="18"
        fill="#ffffff"
        fontWeight="bold"
      >
        C
      </text>

      <g transform="translate(25, 16)">
        <polygon
          points="12,0 15,8 24,9 17,15 19,24 12,19 5,24 7,15 0,9 9,8"
          fill="#FFD700" 
        />
      </g>

      <text
        x="50"
        y="50%"
        dominantBaseline="middle"
        fontFamily="Helvetica, sans-serif"
        fontSize="18"
        fill="#ffffff"
        fontWeight="bold"
      >
        MMANDER
      </text>
    </svg>
  );
};
