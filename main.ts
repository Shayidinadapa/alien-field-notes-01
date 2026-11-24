import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original line: an alien tourist's review of planet Earth.
const ENTRY_TEXT =
  "Visited Earth. The locals invented a machine for walking nowhere, then queue to use it while staring at a wall. 4/5, admirable commitment.";

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";

if (!outputDir || outputDir === ".") {
  throw new Error("refusing to write into the current directory");
}

const chars = [...ENTRY_TEXT];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${chars.length}`,
  );
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, ENTRY_TEXT, "utf8");

const back = readFileSync(target, "utf8");
if (back !== ENTRY_TEXT) {
  throw new Error("read-back mismatch: entry.txt does not match the entry text");
}

console.log(ENTRY_TEXT);
console.log(
  `wrote ${target} (${chars.length} chars, ${Buffer.byteLength(ENTRY_TEXT, "utf8")} bytes, no trailing newline)`,
);
