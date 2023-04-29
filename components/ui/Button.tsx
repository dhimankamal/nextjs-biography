import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  let className =
    "rounded-md px-4 py-3 text-sm font-bold shadow-sm focus:outline-none ";
  if (variant === "primary") {
    className += "bg-cyan-200 text-gray-600 ";
  } else {
    className +=
      "text-gray-900 hover:text-gray-700 focus:ring-gray-500 focus:ring-offset-2 focus:ring-opacity-50";
  }

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
