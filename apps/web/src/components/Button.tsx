import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Controls the button colour theme.
   *
   * - "primary": Uses the teal brand colour.
   * - "secondary": Uses the indigo brand colour.
   */
  variant?: "primary" | "secondary";

  /**
   * Determines whether the button uses a filled or outline style.
   *
   * - true: Solid background colour.
   * - false: Transparent background with a coloured border.
   */
  filled?: boolean;

  /**
   * Optional page destination.
   *
   * When provided, the component renders a Next.js Link instead
   * of a standard HTML button.
   */
  href?: string;

  /** Content displayed inside the button. */
  children: React.ReactNode;
}

/**
 * Reusable button component used throughout the site.
 *
 * The component can render either a standard button or a Next.js
 * Link depending on whether an `href` prop is provided.
 *
 * @param variant - The colour theme of the button.
 * @param filled - Controls whether the button is filled or outlined.
 * @param href - Optional page destination.
 * @param children - Content displayed inside the button.
 * @returns A styled button or link component.
 */
export default function Button({
  variant = "primary",
  filled = false,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer border-2";

  const variantStyles = {
    primary: filled
      ? "border-[var(--color-accent-teal)] bg-[var(--color-accent-teal)] text-[var(--color-bg-primary)] font-bold hover:bg-transparent hover:text-[var(--color-accent-teal)]"
      : "border-[var(--color-accent-teal)] text-white bg-transparent hover:bg-[var(--color-accent-teal)] hover:text-[var(--color-bg-primary)]",
    secondary: filled
      ? "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)] text-[var(--color-bg-primary)] font-bold hover:bg-transparent hover:text-[var(--color-accent-indigo)]"
      : "border-[var(--color-accent-indigo)] text-white bg-transparent hover:bg-[var(--color-accent-indigo)] hover:text-[var(--color-bg-primary)]",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Use Next.js Link for internal navigation to avoid full page reloads.
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}