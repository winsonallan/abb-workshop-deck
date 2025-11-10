"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function BarTrend({
  width = 1140,
  height = 300,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 50,
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  type MonthData = {
    month: string;
    repairs: number;
    replacements: number;
  };

  type BarData = {
    key: "Repairs" | "Replacements";
    value: number;
  };

  useEffect(() => {
    if (!width) return;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = months.map((month) => ({
      month,
      replacements: Math.floor(Math.random() * 50) + 20,
      repairs: Math.floor(Math.random() * 50) + 50,
    }));

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    // ===== Scales =====
    const x0 = d3
      .scaleBand()
      .domain(months)
      .range([0, innerWidth])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["Repairs", "Replacements"])
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.repairs, d.replacements))! * 1.1,
      ])
      .nice()
      .range([innerHeight, 0]);

    // ===== Gradients =====
    const defs = svg.append("defs");

    // Blue gradient for Repairs
    const gradientRepairs = defs
      .append("linearGradient")
      .attr("id", "gradientRepairs")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradientRepairs
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#355c7d"); // dusty blue-green
    gradientRepairs
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6c5b7b"); // muted lavender

    // Orange gradient for Replacements
    const gradientReplacements = defs
      .append("linearGradient")
      .attr("id", "gradientReplacements")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradientReplacements
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffb88c"); // soft coral
    gradientReplacements
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#de6262"); // terracotta

    // Update the color scale to reference gradient IDs
    const color = d3
      .scaleOrdinal()
      .domain(["Repairs", "Replacements"])
      .range(["url(#gradientRepairs)", "url(#gradientReplacements)"]);

    // ===== Axes =====
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .style("font-size", "12px");

    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d}M`),
      )
      .selectAll("text")
      .style("font-size", "12px");

    // ===== Bars =====
    const monthGroups = g
      .selectAll<SVGGElement, MonthData>(".month-group")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d.month)},0)`);

    monthGroups
      .selectAll<SVGRectElement, BarData>("rect")
      .data((d) => [
        { key: "Repairs", value: d.repairs },
        { key: "Replacements", value: d.replacements },
      ])
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.key)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", (d) => color(d.key) as string);

    // ===== Tooltip =====
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(53, 92, 125, 0.9)")
      .style("color", "#f8f8f8")
      .style("padding", "6px 10px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("transition", "opacity 0.2s ease");

    monthGroups
      .selectAll<SVGRectElement, BarData>("rect")
      .on("mouseenter", function (event: MouseEvent, d: BarData) {
        const [xPos, yPos] = d3.pointer(event);
        tooltip
          .style("opacity", 1)
          .style("left", `${xPos + marginLeft + 10}px`)
          .style("top", `${yPos + marginTop}px`)
          .html(`
            <strong>${d.key}</strong><br/>
            Value: ${d.value}M IDR
          `);
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
        d3.select(this).attr("opacity", 1);
      });

    // ===== Legend =====
    const legend = g.append("g").attr("transform", `translate(0, -10)`);

    ["Repairs", "Replacements"].forEach((key, i) => {
      const xOffset = i * 120;
      legend
        .append("rect")
        .attr("x", xOffset)
        .attr("y", -15)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(key) as string)
        .style("margin-bottom", "1rem");
      legend
        .append("text")
        .attr("x", xOffset + 15)
        .attr("y", -6)
        .text(key.charAt(0).toUpperCase() + key.slice(1))
        .style("font-size", "1.2rem")
        .attr("alignment-baseline", "middle")
        .style("margin-bottom", "1rem");
    });

    return () => {
      tooltip.remove();
    };
  }, [width, height, marginTop, marginRight, marginBottom, marginLeft]);

  return (
    <>
      <h2
        className="text-lg font-bold mb-3"
        style={{ color: "var(--prussian-blue)" }}
      >
        Monthly Order Trends
      </h2>
      <div
        ref={containerRef}
        className="relative overflow-x-auto justify-center py-4 rounded-lg w-full"
        style={{
          background: "var(--floral-white)",
        }}
      >
        <svg ref={ref} className="m-auto">
          <title>Order Trends Chart</title>
        </svg>
      </div>
    </>
  );
}
