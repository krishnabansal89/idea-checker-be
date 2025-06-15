export default function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-primary rounded-3xl text-secondary-foreground px-4  py-3 font-inter  hover:bg-primary/90 transition-colors font-semibold shadow-[0px_4px_10px_0px_rgba(0,_0,_0,_0.1)]  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}