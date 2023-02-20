import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <section className="p-4 h-screen flex flex-col items-center justify-center">
      <Outlet />
    </section>
  );
}
