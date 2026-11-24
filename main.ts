// Last Text at One Percent — make.fun entry (program/v1).
//
// The entry is a single text message written in the voice of a phone at
// 1% battery, spending its last breath on something utterly mundane:
// relaying the Wi-Fi password to Dave. The joke is the mismatch — the
// phone is dying, and what it dies doing is a password errand, while
// its own unfulfilled dreams (128 gigabytes of them) go unmentioned
// until the last sentence.
//
// Deterministic, stdlib only, no network, no model calls. Writes exactly
// one line to OUTPUT_PATH (default /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "1% left. my final act is texting dave the wifi password: TACOS2024. i had dreams, dave. 128 gigabytes of them.";

function main(): void {
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No control characters: the file must be clean UTF-8 text, one line.
  for (const ch of LINE) {
    if (ch.codePointAt(0)! < 0x20 && ch !== "\t") {
      throw new Error("entry must not contain control characters");
    }
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
