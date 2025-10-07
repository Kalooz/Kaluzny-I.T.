import * as React from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({
  children,
  className = "",
}: LayoutProps): React.ReactElement {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
