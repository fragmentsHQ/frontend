import React from "react";

const variantClasses = {
  h1: "font-bold text-2xl md:text-[22px] sm:text-xl",
  h2: "font-medium text-lg",
  h3: "text-base",
  h4: "text-sm",
} as const;

export type TextProps = Partial<{
  className: string;
  variant: keyof typeof variantClasses;
  as: React.ElementType;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  variant,
  as,
  ...restProps
}) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variant && variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
