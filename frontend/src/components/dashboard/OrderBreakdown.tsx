"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function OrderBreakdown({ width = 250, height = 250 }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const data = [
      { label: "Repairs", value: 70 },
      { label: "Replacements", value: 30 },
    ];

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2;

    // Create tooltip
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(53, 92, 125, 0.9)")
      .style("color", "var(--floral-white)")
      .style("padding", "6px 10px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("transition", "opacity 0.2s ease");

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(["url(#gradientRepairs)", "url(#gradientReplacements)"]);

    const defs = svg.append("defs");

    const gradientRepairs = defs
      .append("linearGradient")
      .attr("id", "gradientRepairs")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    gradientRepairs
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#355c7d");
    gradientRepairs
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6c5b7b");

    const gradientReplacements = defs
      .append("linearGradient")
      .attr("id", "gradientReplacements")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    gradientReplacements
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffb88c");
    gradientReplacements
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#de6262");

    const g = svg
      .attr("width", width)
      .attr("height", height + 70)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>().value((d) => d.value);
    const arc = d3
      .arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label)!)
      .style("stroke", "var(--floral-white)")
      .style("stroke-width", "2px")
      .on("mousemove", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.data.label}</strong><br/>${d.data.value}% of total`,
          )
          .style("left", event.offsetX + 20 + "px")
          .style("top", event.offsetY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const legend = svg
      .append("g")
      .attr("transform", `translate(20, ${height - 30})`);

    data.forEach((d, i) => {
      const xOffset = i * 100;
      legend
        .append("rect")
        .attr("x", xOffset + 20)
        .attr("y", 50)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(d.label)!);
      legend
        .append("text")
        .attr("x", xOffset + 35)
        .attr("y", 60)
        .text(d.label)
        .style("font-size", "12px")
        .style("fill", "var(--prussian-blue)");
    });
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className="p-4 rounded-lg flex flex-col items-center justify-center relative"
      style={{
        background: "var(--floral-white)",
      }}
    >
      <h2
        className="text-lg font-bold mb-3"
        style={{ color: "var(--prussian-blue)" }}
      >
        Order Breakdown
      </h2>
      <svg ref={ref}></svg>
    </div>
  );
}
