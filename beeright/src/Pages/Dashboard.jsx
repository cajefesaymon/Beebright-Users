import React, { useState } from "react";
import {
  HiHome,
  HiAcademicCap,
  HiUserGroup,
  HiCalendar,
  HiCurrencyDollar,
  HiCog,
} from "react-icons/hi";

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    ["dashboard", "Dashboard", HiHome],
    ["tutors", "Tutors", HiAcademicCap],
    ["students", "Students", HiUserGroup],
    ["schedules", "Schedules", HiCalendar],
    ["payments", "Payments", HiCurrencyDollar],
    ["settings", "Settings", HiCog],
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f7f9] text-[#1f2937]">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-[#ececec]">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="text-2xl">🐝</div>
          <span className="font-extrabold">BeeBright</span>
        </div>

        <ul className="px-2 space-y-1">
          {navItems.map(([id, label, Icon]) => (
            <li
              key={id}
              onClick={() => setActive(id)}
              className={[
                "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition",
                active === id
                  ? "bg-[#fff7d4] shadow-[0_6px_16px_rgba(0,0,0,.07)]"
                  : "hover:bg-[#f4f5f7]",
              ].join(" ")}
            >
              <Icon className="w-5 h-5 opacity-70" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <section className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="h-16 bg-[#F4BE2C] border-b-[3px] border-[#e0a900] flex items-center justify-between px-5">
          <div />
          <div className="flex items-center gap-4">
            <span className="text-2xl">🔔</span>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-[0_6px_16px_rgba(0,0,0,.07)]">
              <span className="text-lg">👤</span>
              <div className="leading-none">
                <div className="font-bold">John</div>
                <div className="text-xs text-[#6b7280]">Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <h1 className="text-[30px] font-extrabold mb-4">Dashboard</h1>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-5">
            <StatCard label="Total Tutorials" value="50" />
            <StatCard label="Total Students" value="240" />
            <StatCard label="Total Tutors" value="16" />
          </div>

          {/* Charts */}
          <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] mb-5">
            <Card title="Customers">
              <LineChart />
            </Card>

            <Card title="Programs">
              <div className="flex items-center justify-center gap-4">
                <PieChart
                  values={[24, 18, 20, 16, 22]}
                  labels={[
                    "Toddlers Playgroup",
                    "Academic Tutorial",
                    "Reading Program",
                    "SPED Tutorial",
                    "Exam Prep",
                  ]}
                />
              </div>
            </Card>
          </div>

          {/* Recent */}
          <Card title="Recent Transactions">
            <div className="h-[220px] bg-[#f4f5f7] rounded-lg" />
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ---------- pieces ---------- */

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,.07)] p-4">
      <div className="text-[#6b7280] font-semibold">{label}</div>
      <div className="mt-2 text-[40px] font-extrabold text-[#111]">{value}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,.07)] p-4">
      <div className="font-bold mb-2">{title}</div>
      {children}
    </div>
  );
}

/* ------- Charts (SVG, no libs) ------- */

function LineChart() {
  const data = [20, 28, 25, 40, 32, 60];
  const max = Math.max(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 300;
      const y = 120 - (d / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 320 140" className="w-full h-[180px] block">
      {/* Axes */}
      <line x1="10" y1="120" x2="310" y2="120" stroke="#e5e7eb" strokeWidth="2" />
      <line x1="10" y1="20" x2="10" y2="120" stroke="#e5e7eb" strokeWidth="2" />
      {/* Line */}
      <polyline
        points={`10,120 ${points} 310,120`}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="rgba(59,130,246,.08)"
      />
      {/* X ticks */}
      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", ""].map((t, i) => (
        <text key={i} x={10 + i * 60} y={135} fontSize="10" fill="#9ca3af">
          {t}
        </text>
      ))}
    </svg>
  );
}

function PieChart({ values, labels }) {
  const total = values.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const colors = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  return (
    <div className="flex gap-4 items-center">
      <svg viewBox="0 0 32 32" className="w-[150px] h-[150px]">
        {values.map((v, i) => {
          const start = (cumulative / total) * 2 * Math.PI;
          const slice = (v / total) * 2 * Math.PI;
          cumulative += v;

          const x1 = 16 + 16 * Math.cos(start);
          const y1 = 16 + 16 * Math.sin(start);
          const x2 = 16 + 16 * Math.cos(start + slice);
          const y2 = 16 + 16 * Math.sin(start + slice);
          const large = slice > Math.PI ? 1 : 0;

          return (
            <path
              key={i}
              d={`M16,16 L${x1},${y1} A16,16 0 ${large} 1 ${x2},${y2} Z`}
              fill={colors[i]}
              stroke="#fff"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      <ul className="text-[#6b7280] text-[14px]">
        {labels.map((label, i) => (
          <li key={i} className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: colors[i] }}
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
