export default function Separator() {
  return (
    <svg
      width="2"
      height="16"
      viewBox="0 0 2 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: '0 8px',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <path
        d="M1 0v32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
