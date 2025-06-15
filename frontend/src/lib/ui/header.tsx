import { Star } from "lucide-react";
export default function Header({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-secondary rounded-3xl flex text-secondary-foreground px-2 items-center justify-center font-inter text-sm py-1 font-semibold shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]  ${className}`}
    >
      <Star className="w-3 h-3 text-primary-foreground mr-2" />
      {children}
    </div>
  );
}