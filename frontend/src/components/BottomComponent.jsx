import { Link } from "react-router-dom";
export function BottomComponent({ label, linkText, to }) {
  return (
    <div className="flex justify-center py-2 text-sm">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {linkText}
      </Link>
    </div>
  );
}
