import type { ReactNode } from "react";

export default function StatsCard({
  title,
  number,
  icon,
}: {
  title: string;
  number: string;
  icon: ReactNode;
}) {
  return (
    <div
      style={{
        height: "max-content",
        background: "var(--oceanic-blue-gradient)",
        boxSizing: "border-box",
      }}
      className="w-full rounded-lg p-4 text-lg text-white font-semibold flex justify-center "
    >
      <div className="w-full text-lg text-white font-semibold flex flex-col justify-center ">
        {title}

        <div className="text-2xl font-bold text-white">{number}</div>
      </div>
      <div className="h-full my-auto" style={{ alignItems: "center" }}>
        {icon}
      </div>
    </div>
  );
}
