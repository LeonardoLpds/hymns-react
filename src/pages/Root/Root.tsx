import { useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { channel, initServiceworker, messageCallback } from "../../libs/setup";

export default function Root() {
  const cn = useMemo(channel, []);
  useEffect(() => {
    messageCallback(cn);
    initServiceworker();
  }, []);

  return (
    <section className="p-4 h-screen flex flex-col items-center justify-center">
      <Outlet />
    </section>
  );
}
