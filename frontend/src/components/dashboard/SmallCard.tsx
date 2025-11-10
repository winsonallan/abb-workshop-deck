import type { ReactNode } from "react";

export default function SmallCard({
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
        background: "var(--reseda-green-gradient)",
        boxSizing: "border-box",
      }}
      className="w-full rounded-lg p-4 text-lg text-(--floral-white) font-semibold flex justify-center border border-gray-400"
    >
      <div className="w-full text-lg text-(--floral-white) font-semibold flex flex-col justify-center ">
        {title}

        <div className="text-2xl font-bold text-(--floral-white)">{number}</div>
      </div>
      <div className="h-full my-auto" style={{ alignItems: "center" }}>
        {icon}
      </div>
    </div>
  );
}
