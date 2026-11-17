"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import {
  Archive,
  BarChart3,
  Boxes,
  Check,
  DollarSign,
  Folder,
  Gauge,
  Link2,
  ListChecks,
  Loader2,
  MessageSquare,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Truck,
  Upload,
  UserCog,
  Users,
} from "lucide-react";
import {
  Customers,
  Documents,
  Features,
  Messages,
  PendingReview,
  Pricing,
  Products,
  Tasks,
  UploadPage,
  UsersPage,
  Vendors,
  head,
  panel,
} from "./CmgSamplePages";

/**
 * Clickable mock of the CMG operations platform, styled after the real
 * portal (light card rail, colour-tiled icons, navy active item). Every
 * name and number here is made up.
 */
type View =
  | "dashboard"
  | "tasks"
  | "orders"
  | "customers"
  | "vendors"
  | "pricing"
  | "products"
  | "reports"
  | "messages"
  | "features"
  | "upload"
  | "pending"
  | "documents"
  | "users"
  | "qboSetup"
  | "qbo";

type NavItem = { label: string; icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string; view?: View };

/** The portal's full side panel. Items with a `view` open a page in this preview. */
const NAV: NavItem[] = [
  { label: "Dashboard", icon: Gauge, tone: "#2563EB", view: "dashboard" },
  { label: "Tasks", icon: ListChecks, tone: "#D97706", view: "tasks" },
  { label: "Orders", icon: ShoppingCart, tone: "#059669", view: "orders" },
  { label: "Customers", icon: Users, tone: "#7C3AED", view: "customers" },
  { label: "Vendors", icon: Truck, tone: "#EA580C", view: "vendors" },
  { label: "Pricing", icon: DollarSign, tone: "#16A34A", view: "pricing" },
  { label: "Products", icon: Boxes, tone: "#0284C7", view: "products" },
  { label: "Reports", icon: BarChart3, tone: "#4F46E5", view: "reports" },
  { label: "Messages", icon: MessageSquare, tone: "#DB2777", view: "messages" },
  { label: "Features/Bugs", icon: Sparkles, tone: "#C026D3", view: "features" },
  { label: "Upload", icon: Upload, tone: "#0D9488", view: "upload" },
  { label: "Pending Review", icon: Archive, tone: "#E11D48", view: "pending" },
  { label: "Documents", icon: Folder, tone: "#CA8A04", view: "documents" },
  { label: "Users", icon: UserCog, tone: "#475569", view: "users" },
  { label: "QBO Setup", icon: Link2, tone: "#2CA01C", view: "qboSetup" },
  { label: "QBO Sync", icon: RefreshCw, tone: "#2CA01C", view: "qbo" },
];

const MONTHS: [string, number][] = [
  ["Jun", 0.58],
  ["Jul", 0.66],
  ["Aug", 0.61],
  ["Sep", 0.74],
  ["Oct", 0.83],
  ["Nov", 0.92],
];

const ORDERS: [string, string, string, string, "Shipped" | "Invoiced" | "Open"][] = [
  ["NW-10482", "Northwind Foods", "Nov 14", "$18,420.00", "Invoiced"],
  ["BM-2291", "Bluewater Market", "Nov 13", "$9,612.50", "Shipped"],
  ["HG-7730", "Harbor Grocers", "Nov 12", "$24,980.00", "Invoiced"],
  ["SV-0415", "Summit Valley Co-op", "Nov 18", "$6,305.75", "Open"],
  ["NW-10479", "Northwind Foods", "Nov 08", "$17,960.00", "Invoiced"],
];

const COMMISSIONS: [string, string, string, string][] = [
  ["J. Rivera", "$142,300", "3.0%", "$4,269"],
  ["M. Chen", "$98,750", "3.0%", "$2,963"],
  ["A. Patel", "$61,200", "2.5%", "$1,530"],
];

const STATUS_STYLE = {
  Invoiced: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Shipped: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Open: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
};

function Dashboard() {
  const kpis: [string, string, string][] = [
    ["Revenue (MTD)", "$412,380", "+8.2%"],
    ["Gross margin", "18.4%", "+0.6 pt"],
    ["Open AR", "$96,210", "14 invoices"],
    ["Orders", "128", "this month"],
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {kpis.map(([label, value, note]) => (
          <div key={label} className={`${panel} p-2.5`}>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums">{value}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{note}</p>
          </div>
        ))}
      </div>
      <div className={panel}>
        <p className={head}>Monthly revenue</p>
        <div className="flex h-28 items-end gap-3 px-4 pt-3 pb-2">
          {MONTHS.map(([m, h], i) => (
            <div key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span
                className={`w-full rounded-t ${i === MONTHS.length - 1 ? "bg-[#2452C2]" : "bg-[#2452C2]/30"}`}
                style={{ height: `${h * 100}%` }}
              />
              <span className="text-[9px] text-slate-400">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div className={`${panel} overflow-hidden`}>
      <p className={head}>Recent orders</p>
      <table className="w-full text-left text-[10.5px]">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
          <tr>
            <th className="px-3 py-1.5 font-medium">PO</th>
            <th className="px-3 py-1.5 font-medium">Customer</th>
            <th className="hidden px-3 py-1.5 font-medium sm:table-cell">Ship</th>
            <th className="px-3 py-1.5 text-right font-medium">Total</th>
            <th className="px-3 py-1.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {ORDERS.map(([po, customer, ship, total, status]) => (
            <tr key={po}>
              <td className="px-3 py-1.5 font-mono text-[10px]">{po}</td>
              <td className="px-3 py-1.5">{customer}</td>
              <td className="hidden px-3 py-1.5 text-slate-500 sm:table-cell dark:text-slate-400">{ship}</td>
              <td className="px-3 py-1.5 text-right tabular-nums">{total}</td>
              <td className="px-3 py-1.5">
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${STATUS_STYLE[status]}`}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Reports() {
  return (
    <div className="space-y-3">
      <div className={`${panel} overflow-hidden`}>
        <p className={head}>Contractor commissions · October</p>
        <table className="w-full text-left text-[10.5px]">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
            <tr>
              <th className="px-3 py-1.5 font-medium">Contractor</th>
              <th className="px-3 py-1.5 text-right font-medium">Sales</th>
              <th className="px-3 py-1.5 text-right font-medium">Rate</th>
              <th className="px-3 py-1.5 text-right font-medium">Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 tabular-nums dark:divide-slate-700">
            {COMMISSIONS.map(([name, sales, rate, comm]) => (
              <tr key={name}>
                <td className="px-3 py-1.5">{name}</td>
                <td className="px-3 py-1.5 text-right">{sales}</td>
                <td className="px-3 py-1.5 text-right">{rate}</td>
                <td className="px-3 py-1.5 text-right font-semibold">{comm}</td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-semibold dark:bg-slate-900/40">
              <td className="px-3 py-1.5">Total</td>
              <td className="px-3 py-1.5 text-right">$302,250</td>
              <td />
              <td className="px-3 py-1.5 text-right">$8,762</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`${panel} grid grid-cols-3 divide-x divide-slate-200 text-center dark:divide-slate-700`}>
        {(
          [
            ["Revenue", "$1.21M"],
            ["COGS", "$0.98M"],
            ["Gross profit", "$226K"],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="p-2.5">
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{k}</p>
            <p className="text-sm font-semibold tabular-nums">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QboSetup() {
  const mappings: [string, string, string][] = [
    ["Customer", "Northwind Foods", "154"],
    ["Customer", "Harbor Grocers", "171"],
    ["Vendor", "Valley Creamery", "88"],
    ["Product", "Aged Cheddar 40 lb", "312"],
  ];
  const accounts: [string, string][] = [
    ["COGS account", "5000 Cost of Goods Sold"],
    ["Pallet account", "5120 Pallets"],
    ["Fuel account", "5130 Fuel Surcharge"],
  ];
  return (
    <div className="space-y-3">
      <div className={`${panel} flex items-center gap-3 p-3`}>
        <span className="grid size-8 place-items-center rounded-lg bg-[#2CA01C] text-white">
          <Link2 className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold">Sample Company LLC</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Primary books · connected</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          Connected
        </span>
      </div>
      <div className={`${panel} overflow-hidden`}>
        <p className={head}>Entity mapping</p>
        <table className="w-full text-left text-[10.5px]">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
            <tr>
              <th className="px-3 py-1.5 font-medium">Type</th>
              <th className="px-3 py-1.5 font-medium">Name</th>
              <th className="px-3 py-1.5 font-medium">QBO ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {mappings.map(([type, name, id]) => (
              <tr key={name}>
                <td className="px-3 py-1.5 text-slate-500 dark:text-slate-400">{type}</td>
                <td className="px-3 py-1.5">{name}</td>
                <td className="px-3 py-1">
                  <span className="inline-block w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-600 dark:bg-slate-900">
                    {id}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={panel}>
        <p className={head}>Vendor bill accounts</p>
        <ul className="divide-y divide-slate-100 text-[10.5px] dark:divide-slate-700">
          {accounts.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-2 px-3 py-1.5">
              <span className="text-slate-500 dark:text-slate-400">{k}</span>
              <span className="truncate font-medium">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QboSync() {
  const [state, setState] = useState<"idle" | "syncing" | "done">("idle");
  const sync = () => {
    if (state === "syncing") return;
    setState("syncing");
    setTimeout(() => setState("done"), 1400);
  };
  const rows: [string, number][] = [
    ["Invoices", 42],
    ["Vendor bills", 31],
    ["Payments", 18],
    ["Customers", 6],
  ];
  return (
    <div className="space-y-3">
      <div className={`${panel} flex items-center gap-3 p-3`}>
        <span className="grid size-8 place-items-center rounded-lg bg-[#2CA01C] text-white">
          <Link2 className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold">QuickBooks Online</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Connected · last synced {state === "done" ? "just now" : "6 hours ago"}
          </p>
        </div>
        <button
          type="button"
          onClick={sync}
          className="flex items-center gap-1.5 rounded-full bg-[#2452C2] px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-[#1F439C]"
        >
          {state === "syncing" ? (
            <Loader2 className="size-3 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="size-3" aria-hidden="true" />
          )}
          {state === "syncing" ? "Syncing…" : "Sync now"}
        </button>
      </div>
      <div className={panel}>
        <p className={head}>Last sync</p>
        <ul className="divide-y divide-slate-100 text-[10.5px] dark:divide-slate-700">
          {rows.map(([label, n]) => (
            <li key={label} className="flex items-center gap-2 px-3 py-1.5">
              <Check className="size-3 text-[#2CA01C]" aria-hidden="true" />
              <span className="flex-1">{label}</span>
              <span className="text-slate-500 tabular-nums dark:text-slate-400">
                {state === "done" ? n + 3 : n} synced
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const VIEWS: Record<View, () => React.JSX.Element> = {
  dashboard: Dashboard,
  orders: Orders,
  reports: Reports,
  tasks: Tasks,
  customers: Customers,
  vendors: Vendors,
  pricing: Pricing,
  products: Products,
  messages: Messages,
  features: Features,
  upload: UploadPage,
  pending: PendingReview,
  documents: Documents,
  users: UsersPage,
  qboSetup: QboSetup,
  qbo: QboSync,
};

export function BrowserShowcase() {
  const [view, setView] = useState<View>("dashboard");
  const Current = VIEWS[view];
  const title = NAV.find((n) => n.view === view)!.label;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[640px] overflow-hidden rounded-xl border border-line-strong bg-white shadow-float dark:bg-slate-900">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[10px] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            portal.example.com/
            {view === "qboSetup"
              ? "qbo/setup"
              : view === "qbo"
                ? "qbo/sync"
                : view === "pending"
                  ? "pending-approval"
                  : view === "features"
                    ? "feature-requests"
                    : view}
          </span>
        </div>

        <div className="flex h-[440px] text-slate-900 dark:text-slate-100">
          {/* Sidebar rail */}
          <nav
            aria-label="Preview pages"
            className="flex w-12 shrink-0 [scrollbar-width:none] flex-col gap-1 overflow-y-auto border-r border-slate-200 bg-slate-50 p-1.5 sm:w-36 dark:border-slate-700 dark:bg-slate-900/60"
          >
            {NAV.map(({ label, icon: Icon, tone, view: target }) => {
              const active = target === view;
              return (
                <button
                  key={label}
                  type="button"
                  disabled={!target}
                  onClick={() => target && setView(target)}
                  aria-pressed={target ? active : undefined}
                  aria-label={target ? label : `${label} (not in this preview)`}
                  title={target ? undefined : "Not in this preview"}
                  className={`flex h-8 shrink-0 items-center gap-2 rounded-lg px-1.5 text-left text-[11px] font-medium shadow-sm transition-colors ${
                    active
                      ? "bg-[#0F1830] text-white"
                      : target
                        ? "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        : "cursor-default bg-white/70 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-md text-white ${target ? "" : "opacity-60"}`}
                    style={{ background: tone }}
                  >
                    <Icon className="size-3" aria-hidden="true" />
                  </span>
                  <span className="hidden truncate sm:inline">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Page */}
          <div
            key={view}
            aria-live="polite"
            className="min-w-0 flex-1 animate-fade-in overflow-y-auto bg-slate-50/60 p-3 dark:bg-slate-900"
          >
            <p className="mb-2.5 text-sm font-semibold tracking-tight">{title}</p>
            <Current />
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-subtle">
        Click any page in the side panel. All names and numbers are sample data.
      </p>
    </div>
  );
}
