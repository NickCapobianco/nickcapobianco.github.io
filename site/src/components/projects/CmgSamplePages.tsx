"use client";

import { useState } from "react";
import { Check, FileSpreadsheet, FileText, Image as ImageIcon, UploadCloud } from "lucide-react";

/**
 * Extra pages for the CMG platform preview. Every name, number and message
 * here is invented; none of it comes from the real business.
 */

export const panel = "rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800";
export const head = "border-b border-slate-200 px-3 py-2 text-[11px] font-semibold dark:border-slate-700";
const muted = "text-slate-500 dark:text-slate-400";

/** A compact table with a title bar. `right` lists the column indexes to right-align (numbers). */
export function SampleTable({
  title,
  columns,
  rows,
  right = [],
}: {
  title: string;
  columns: string[];
  rows: React.ReactNode[][];
  right?: number[];
}) {
  return (
    <div className={`${panel} overflow-hidden`}>
      <p className={head}>{title}</p>
      <table className="w-full text-left text-[10.5px]">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
          <tr>
            {columns.map((c, i) => (
              <th key={c} className={`px-3 py-1.5 font-medium ${right.includes(i) ? "text-right" : ""}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, i) => (
                <td key={i} className={`px-3 py-1.5 ${right.includes(i) ? "text-right tabular-nums" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "green" | "blue" | "amber" | "rose" | "violet" | "slate";
  children: React.ReactNode;
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  };
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Tasks() {
  const [mode, setMode] = useState<"general" | "routine">("general");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const lists = {
    general: [
      ["Send October statements", "Nov 18", "Alex"],
      ["Confirm freight quote", "Nov 19", "Sam"],
      ["Follow up on short shipment", "Nov 20", "Alex"],
    ],
    routine: [
      ["Monthly price sheet", "Dec 1", "Team"],
      ["Reconcile bank accounts", "Nov 30", "Alex"],
      ["Contractor commission run", "Dec 5", "Alex"],
    ],
  };
  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800">
        {(["general", "routine"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full px-2.5 py-1 capitalize ${mode === m ? "bg-[#0F1830] text-white" : muted}`}
          >
            {m} <span className="ml-1 rounded-full bg-[#EF4444] px-1 text-white">3</span>
          </button>
        ))}
      </div>
      <ul className={`${panel} divide-y divide-slate-100 dark:divide-slate-700`}>
        {lists[mode].map(([task, due, who]) => {
          const isDone = !!done[task];
          return (
            <li key={task}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => setDone((d) => ({ ...d, [task]: !isDone }))}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[10.5px]"
              >
                <span
                  className={`grid size-4 shrink-0 place-items-center rounded border ${
                    isDone ? "border-[#2452C2] bg-[#2452C2] text-white" : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isDone ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : null}
                </span>
                <span className={`flex-1 ${isDone ? "text-slate-400 line-through" : ""}`}>{task}</span>
                <span className={muted}>{who}</span>
                <span className={`w-12 text-right ${muted}`}>{due}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Customers() {
  return (
    <SampleTable
      title="Customers"
      columns={["Name", "Location", "Terms", "Open AR"]}
      right={[3]}
      rows={[
        ["Northwind Foods", "Portland, OR", "Net 30", "$42,180"],
        ["Harbor Grocers", "San Diego, CA", "Net 21", "$31,940"],
        ["Bluewater Market", "Tucson, AZ", "Net 30", "$12,600"],
        ["Summit Valley Co-op", "Boise, ID", "Net 15", "$9,490"],
      ]}
    />
  );
}

export function Vendors() {
  return (
    <SampleTable
      title="Vendors"
      columns={["Name", "Type", "Open bills", "Balance"]}
      right={[2, 3]}
      rows={[
        [
          "Valley Creamery",
          <Pill key="t" tone="violet">
            Manufacturer
          </Pill>,
          "6",
          "$58,210",
        ],
        [
          "Ridgeline Dairy",
          <Pill key="t" tone="violet">
            Manufacturer
          </Pill>,
          "3",
          "$27,450",
        ],
        [
          "Coastline Freight",
          <Pill key="t" tone="blue">
            Carrier
          </Pill>,
          "4",
          "$6,100",
        ],
        [
          "Mesa Logistics",
          <Pill key="t" tone="blue">
            Carrier
          </Pill>,
          "2",
          "$2,950",
        ],
      ]}
    />
  );
}

export function Pricing() {
  return (
    <div className="space-y-3">
      <SampleTable
        title="December price sheet"
        columns={["Product", "Cost / lb", "Markup", "Price / lb", "Change"]}
        right={[1, 2, 3, 4]}
        rows={[
          [
            "Aged Cheddar",
            "$2.14",
            "12%",
            "$2.40",
            <span key="c" className="text-emerald-600">
              +$0.06
            </span>,
          ],
          [
            "Mozzarella",
            "$1.88",
            "10%",
            "$2.07",
            <span key="c" className="text-rose-600">
              −$0.03
            </span>,
          ],
          [
            "Feta Crumbles",
            "$3.05",
            "14%",
            "$3.48",
            <span key="c" className="text-emerald-600">
              +$0.11
            </span>,
          ],
          [
            "Pepper Jack",
            "$2.22",
            "12%",
            "$2.49",
            <span key="c" className={muted}>
              $0.00
            </span>,
          ],
        ]}
      />
      <p className={`text-[10px] ${muted}`}>Formula: market price + freight per pound + markup. Updated monthly.</p>
    </div>
  );
}

export function Products() {
  return (
    <SampleTable
      title="Products"
      columns={["SKU", "Description", "Pack", "Basis"]}
      rows={[
        [
          <span key="s" className="font-mono">
            CH-1040
          </span>,
          "Aged Cheddar",
          "1 × 40 lb",
          <Pill key="b" tone="slate">
            lb
          </Pill>,
        ],
        [
          <span key="s" className="font-mono">
            MZ-0610
          </span>,
          "Mozzarella Loaf",
          "6 × 10 lb",
          <Pill key="b" tone="slate">
            case
          </Pill>,
        ],
        [
          <span key="s" className="font-mono">
            FT-0405
          </span>,
          "Feta Crumbles",
          "4 × 5 lb",
          <Pill key="b" tone="slate">
            case
          </Pill>,
        ],
        [
          <span key="s" className="font-mono">
            PJ-1040
          </span>,
          "Pepper Jack",
          "1 × 40 lb",
          <Pill key="b" tone="slate">
            lb
          </Pill>,
        ],
      ]}
    />
  );
}

export function Messages() {
  const thread: [string, string, boolean][] = [
    ["Sam", "Freight quote for the Harbor load came in at $1,450.", false],
    ["You", "Thanks. Go ahead and book it for Thursday.", true],
    ["Sam", "Booked. BOL is uploaded to Documents.", false],
  ];
  return (
    <div className={`${panel} flex h-[300px] flex-col`}>
      <p className={head}># operations</p>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {thread.map(([who, text, mine], i) => (
          <div key={i} className={`flex ${mine ? "justify-end" : ""}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[10.5px] ${
                mine ? "bg-[#2452C2] text-white" : "bg-slate-100 dark:bg-slate-700"
              }`}
            >
              {!mine ? <p className="text-[9px] font-semibold opacity-70">{who}</p> : null}
              {text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 p-2 dark:border-slate-700">
        <div className={`rounded-full border border-slate-200 px-3 py-1 text-[10px] dark:border-slate-600 ${muted}`}>
          Message #operations
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <SampleTable
      title="Feature requests & bugs"
      columns={["Title", "Type", "Status"]}
      rows={[
        [
          "Export P&L to PDF",
          <Pill key="t" tone="violet">
            Feature
          </Pill>,
          <Pill key="s" tone="green">
            Shipped
          </Pill>,
        ],
        [
          "Bulk-edit product prices",
          <Pill key="t" tone="violet">
            Feature
          </Pill>,
          <Pill key="s" tone="amber">
            In progress
          </Pill>,
        ],
        [
          "Date picker off by a day",
          <Pill key="t" tone="rose">
            Bug
          </Pill>,
          <Pill key="s" tone="green">
            Fixed
          </Pill>,
        ],
        [
          "Dark mode for reports",
          <Pill key="t" tone="violet">
            Feature
          </Pill>,
          <Pill key="s" tone="slate">
            Planned
          </Pill>,
        ],
      ]}
    />
  );
}

export function UploadPage() {
  return (
    <div className="space-y-3">
      <div className={`${panel} flex flex-col items-center gap-1.5 border-dashed p-5 text-center`}>
        <UploadCloud className="size-6 text-[#0D9488]" aria-hidden="true" />
        <p className="text-[11px] font-semibold">Drop a purchase order PDF</p>
        <p className={`text-[10px] ${muted}`}>The parser reads the PO number, dates and line items.</p>
      </div>
      <SampleTable
        title="Recent uploads"
        columns={["File", "Parsed", "Status"]}
        rows={[
          [
            "PO-NW-10482.pdf",
            "4 lines",
            <Pill key="s" tone="green">
              Order created
            </Pill>,
          ],
          [
            "PO-HG-7730.pdf",
            "6 lines",
            <Pill key="s" tone="amber">
              Needs review
            </Pill>,
          ],
        ]}
      />
    </div>
  );
}

export function PendingReview() {
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const items: [string, string][] = [
    ["PO HG-7730", "Harbor Grocers · 6 lines"],
    ["PO SV-0415", "Summit Valley Co-op · 2 lines"],
  ];
  return (
    <ul className={`${panel} divide-y divide-slate-100 dark:divide-slate-700`}>
      {items.map(([title, sub]) => (
        <li key={title} className="flex items-center gap-3 px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold">{title}</p>
            <p className={`text-[10px] ${muted}`}>{sub}</p>
          </div>
          {approved[title] ? (
            <Pill tone="green">Approved</Pill>
          ) : (
            <button
              type="button"
              onClick={() => setApproved((a) => ({ ...a, [title]: true }))}
              className="rounded-full bg-[#2452C2] px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-[#1F439C]"
            >
              Approve
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Documents() {
  const docs: [string, typeof FileText, string, string][] = [
    ["BOL-Harbor-1114.pdf", FileText, "Bill of lading", "Nov 14"],
    ["Price-sheet-December.xlsx", FileSpreadsheet, "Pricing", "Nov 12"],
    ["Pallet-photo.jpg", ImageIcon, "Order photo", "Nov 10"],
    ["Invoice-NW-10479.pdf", FileText, "Invoice", "Nov 08"],
  ];
  return (
    <ul className={`${panel} divide-y divide-slate-100 dark:divide-slate-700`}>
      {docs.map(([name, Icon, kind, date]) => (
        <li key={name} className="flex items-center gap-2.5 px-3 py-2 text-[10.5px]">
          <span className="grid size-6 place-items-center rounded-md bg-amber-50 text-[#CA8A04] dark:bg-amber-500/15">
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 truncate">{name}</span>
          <span className={muted}>{kind}</span>
          <span className={`w-10 text-right ${muted}`}>{date}</span>
        </li>
      ))}
    </ul>
  );
}

export function UsersPage() {
  return (
    <SampleTable
      title="Users"
      columns={["Name", "Role", "Last active"]}
      rows={[
        [
          "Alex Morgan",
          <Pill key="r" tone="blue">
            Admin
          </Pill>,
          "Just now",
        ],
        [
          "Sam Lee",
          <Pill key="r" tone="blue">
            Admin
          </Pill>,
          "2 hours ago",
        ],
        [
          "J. Rivera",
          <Pill key="r" tone="violet">
            Partner
          </Pill>,
          "Yesterday",
        ],
        [
          "M. Chen",
          <Pill key="r" tone="violet">
            Partner
          </Pill>,
          "3 days ago",
        ],
      ]}
    />
  );
}
