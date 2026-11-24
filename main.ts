// One Line of Earned Pride — make.fun bounty u-mang-one-line-of-earned-pride-a0138557
// Writes a single line (1–240 characters) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "He mopped the same floor for thirty years, and on his last night the new kid asked him to show him how.";

// The gate, as the bounty states it: 1–240 characters, not only whitespace,
// and one line — the pride has to land in a single read.
function checkGate(text: string): number {
  const chars = [...text].length;
  if (chars < 1 || chars > 240) throw new Error(`gate failed: ${chars} characters`);
  if (text.trim().length === 0) throw new Error("gate failed: only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry is not one line");
  }
  return chars;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Read back and verify: the file must be byte-identical to the entry.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
const chars = checkGate(back);
if (back !== ENTRY) throw new Error("read-back mismatch");
console.log(
  `wrote ${outDir}/entry.txt (${chars} code points, single line), verified: ${JSON.stringify(back)}`,
);
