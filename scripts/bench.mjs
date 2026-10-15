// Lighthouse benchmark across the main routes on two network profiles.
// Usage: node scripts/bench.mjs https://your-deployment.vercel.app
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const routes = ["/", "/projects", "/projects/dancing-in-black-and-white", "/exhibitions", "/about"];

const profiles = {
  // Lighthouse's default mobile run: simulated slow 4G (1.6 Mbps, 150 ms RTT), 4x CPU slowdown
  "Slow 4G": [],
  // Applied throttling, close to DevTools' "Slow 3G": 400 Kbps down, 400 ms per request
  "Slow 3G": [
    "--throttling-method=devtools",
    "--throttling.downloadThroughputKbps=400",
    "--throttling.uploadThroughputKbps=400",
    "--throttling.requestLatencyMs=400",
    "--throttling.cpuSlowdownMultiplier=4",
  ],
};

const dir = mkdtempSync(path.join(tmpdir(), "bench-"));
const rows = [];

for (const [profile, flags] of Object.entries(profiles)) {
  for (const route of routes) {
    const out = path.join(dir, `${profile}-${route.replace(/\W+/g, "_")}.json`);
    execFileSync(
      "npx",
      [
        "--yes",
        "lighthouse@12",
        base + route,
        "--quiet",
        "--only-categories=performance",
        "--chrome-flags=--headless=new",
        "--output=json",
        `--output-path=${out}`,
        ...flags,
      ],
      { stdio: "inherit" },
    );
    const { categories, audits: a } = JSON.parse(readFileSync(out, "utf8"));
    rows.push({
      profile,
      route,
      score: Math.round(categories.performance.score * 100),
      fcp: a["first-contentful-paint"].displayValue,
      lcp: a["largest-contentful-paint"].displayValue,
      tbt: a["total-blocking-time"].displayValue,
      cls: a["cumulative-layout-shift"].displayValue,
      kb: Math.round(a["total-byte-weight"].numericValue / 1024),
    });
  }
}

console.log("\n| Network | Route | Score | FCP | LCP | TBT | CLS | Transferred |");
console.log("| --- | --- | --- | --- | --- | --- | --- | --- |");
for (const r of rows) {
  console.log(`| ${r.profile} | \`${r.route}\` | ${r.score} | ${r.fcp} | ${r.lcp} | ${r.tbt} | ${r.cls} | ${r.kb} KB |`);
}
