import React, { useRef } from 'react';

interface GlassyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  surfaceColor?: string;
  children: React.ReactNode;
  href?: string;
}

export default function GlassyButton({ 
  children, 
  className,
  surfaceColor,
  ...props 
}: GlassyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = event.clientX - rect.left - centerX;
    const offsetY = event.clientY - rect.top - centerY;

    button.style.setProperty("--_x-motion", `${offsetX}px`);
    button.style.setProperty("--_y-motion", `${offsetY}px`);
  };

  const style = surfaceColor ? { '--_surface': surfaceColor } as React.CSSProperties : undefined;

  if (props.href) {
    const { ...rest } = props as any;
    return (
      <a
        ref={buttonRef as any}
        onMouseMove={handleMouseMove}
        className={`glassy-button group inline-flex items-center justify-center ${className || ''}`}
        style={style}
        {...rest}
      >
        <span className="inline-flex items-center justify-center gap-2.5">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={`glassy-button group inline-flex items-center justify-center ${className || ''}`}
      style={style}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2.5">{children}</span>
    </button>
  );
}
