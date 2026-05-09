import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}
