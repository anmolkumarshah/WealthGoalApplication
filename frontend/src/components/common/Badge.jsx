const Badge = ({ color, children }) => {
  color = color == null || color === "" ? "yellow" : color;
  return (
    <span
      className={`inline-block px-1.5 rounded-full bg-${color}-100 mx-1 text-gray-600 border-2 font-semibold border-gray-300 text-xs`}
    >
      {children}
    </span>
  );
};

export default Badge;
