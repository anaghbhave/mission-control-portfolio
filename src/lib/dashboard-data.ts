export const kpis = [
  { id: "mipr", label: "MIPR Intake Volume", value: 1284, unit: "docs", delta: 12.4, trend: "up", spark: [40, 52, 48, 61, 70, 78, 84, 92, 88, 96, 104, 118] },
  { id: "idp", label: "Items Extracted by IDP", value: 11642, unit: "fields", delta: 8.1, trend: "up", spark: [820, 880, 910, 940, 990, 1020, 1080, 1120, 1180, 1210, 1260, 1300] },
  { id: "validation", label: "Awaiting Validation", value: 87, unit: "items", delta: -6.2, trend: "down", spark: [120, 118, 110, 108, 104, 100, 96, 92, 90, 88, 87, 87] },
  { id: "approvals", label: "Approvals Pending", value: 42, unit: "in Action Center", delta: -3.5, trend: "down", spark: [60, 58, 55, 52, 50, 48, 47, 46, 45, 44, 43, 42] },
  { id: "erp", label: "ERP Updates Completed", value: 3891, unit: "this quarter", delta: 22.7, trend: "up", spark: [200, 230, 260, 290, 320, 350, 380, 420, 460, 500, 540, 580] },
  { id: "exceptions", label: "Exceptions / Rework", value: 34, unit: "open", delta: 4.1, trend: "up", spark: [22, 24, 26, 25, 28, 30, 31, 32, 33, 33, 34, 34] },
  { id: "cycle", label: "Avg Cycle Time", value: 4.2, unit: "days", delta: -14.6, trend: "down", spark: [7.1, 6.8, 6.4, 6.0, 5.6, 5.3, 5.0, 4.8, 4.6, 4.4, 4.3, 4.2] },
  { id: "straight", label: "Straight-Through Rate", value: 78.4, unit: "%", delta: 5.2, trend: "up", spark: [64, 66, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78] },
] as const;

export const throughput = [
  { week: "W1", intake: 240, extracted: 2100, erp: 620 },
  { week: "W2", intake: 268, extracted: 2380, erp: 690 },
  { week: "W3", intake: 291, extracted: 2540, erp: 740 },
  { week: "W4", intake: 312, extracted: 2790, erp: 810 },
  { week: "W5", intake: 305, extracted: 2820, erp: 840 },
  { week: "W6", intake: 340, extracted: 3010, erp: 910 },
  { week: "W7", intake: 358, extracted: 3220, erp: 980 },
  { week: "W8", intake: 384, extracted: 3480, erp: 1060 },
];

export const automationMix = [
  { name: "Document-Led", value: 58, color: "var(--chart-1)" },
  { name: "AI-Led", value: 27, color: "var(--chart-2)" },
  { name: "Agent-Led", value: 15, color: "var(--chart-3)" },
];

export const miprQueue = [
  { id: "MIPR-2049", program: "Fleet Logistics – NAVSUP", value: "$2.14M", stage: "Extraction", confidence: 96, sla: "On track", status: "processing" },
  { id: "MIPR-2048", program: "Depot Sustainment – AMC", value: "$840K", stage: "Validation", confidence: 82, sla: "On track", status: "validating" },
  { id: "MIPR-2047", program: "Cyber Range Refresh", value: "$1.62M", stage: "Approval", confidence: 91, sla: "At risk", status: "approval" },
  { id: "MIPR-2046", program: "ISR Sensor Buy", value: "$5.30M", stage: "ERP Handoff", confidence: 98, sla: "On track", status: "erp" },
  { id: "MIPR-2045", program: "Training Systems – TRADOC", value: "$412K", stage: "Extraction", confidence: 71, sla: "Review", status: "lowconf" },
  { id: "MIPR-2044", program: "Rotary Wing Spares", value: "$1.05M", stage: "Approval", confidence: 88, sla: "Overdue", status: "overdue" },
];

export const hrRequests = [
  { id: "HR-8821", type: "PCS Orders Amendment", requester: "SFC Ramirez", recommendation: "Auto-approve (policy match)", sla: "2h left", status: "recommended" },
  { id: "HR-8820", type: "Tuition Assistance", requester: "MAJ Chen", recommendation: "Route to supervisor", sla: "4h left", status: "routed" },
  { id: "HR-8819", type: "Leave Reclassification", requester: "SSG Patel", recommendation: "Auto-approve", sla: "1h left", status: "recommended" },
  { id: "HR-8818", type: "Special Duty Pay", requester: "LT Okafor", recommendation: "Needs clarification", sla: "Overdue", status: "escalated" },
  { id: "HR-8817", type: "Dependent Update", requester: "CPT Nguyen", recommendation: "Auto-approve", sla: "6h left", status: "recommended" },
];

export const contracts = [
  { id: "CT-5501", vendor: "Northgate Defense", flag: "Fund expiring < 30d", fund: "O&M FY25", action: "Deobligate residual", audit: "Complete" },
  { id: "CT-5502", vendor: "Halcyon Systems", flag: "Under-execution 22%", fund: "RDT&E FY25", action: "Rescope Mod P00007", audit: "Pending SME" },
  { id: "CT-5503", vendor: "Ironline Logistics", flag: "Justification missing", fund: "Procurement FY24", action: "Collect JOFOC", audit: "In progress" },
  { id: "CT-5504", vendor: "Vertex Analytics", flag: "Fund healthy", fund: "O&M FY25", action: "Monitor", audit: "Complete" },
  { id: "CT-5505", vendor: "Blue Ridge Cyber", flag: "Overrun risk 8%", fund: "RDT&E FY25", action: "Cost review", audit: "In progress" },
];

export const exceptions = [
  { id: "EX-3311", kind: "Low confidence", severity: "high", item: "MIPR-2045 · Line 4 – UoM missing", owner: "IDP Reviewer", age: "3h" },
  { id: "EX-3310", kind: "Missing field", severity: "med", item: "MIPR-2043 · Fund cite blank", owner: "Contracting", age: "5h" },
  { id: "EX-3309", kind: "Rejected", severity: "high", item: "HR-8801 · Policy conflict", owner: "HR Ops", age: "8h" },
  { id: "EX-3308", kind: "Overdue approval", severity: "high", item: "MIPR-2044 · Approver: J. Reeves", owner: "Action Center", age: "1d" },
  { id: "EX-3307", kind: "Escalation", severity: "med", item: "CT-5502 · SME sign-off", owner: "Program Office", age: "6h" },
  { id: "EX-3306", kind: "Low confidence", severity: "low", item: "MIPR-2039 · Vendor CAGE mismatch", owner: "IDP Reviewer", age: "12h" },
];
