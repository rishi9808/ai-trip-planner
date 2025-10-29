import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/80 py-10 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
        <span className="text-xs uppercase tracking-[0.4em] text-primary">
          AI Trip Planner
        </span>
        <p className="text-base font-medium text-foreground">
          © {new Date().getFullYear()} Travel Buddy. Crafted for explorers
          worldwide.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with ❤️ by {""}
          <a
            href="https://www.github.com/rishi9808"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Rishi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
