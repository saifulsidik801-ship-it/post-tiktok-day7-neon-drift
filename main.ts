// Entry point for the post-tiktok-day-one-day-seven video entry.
// The entry itself is the TikTok video URL stored in VIDEO.json; this
// program copies that file into the grader output directory so the
// entry can be found and checked.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const entry = JSON.parse(readFileSync("VIDEO.json", "utf8"));
if (!entry.url || typeof entry.url !== "string") {
  throw new Error("VIDEO.json must contain a url string");
}
copyFileSync("VIDEO.json", `${outDir}/VIDEO.json`);
console.log("VIDEO.json copied to " + outDir + " (" + entry.url + ")");

// Small check used by tooling around this entrypoint: a TikTok video URL
// should live on tiktok.com and carry a numeric video id after /video/.
// Pure string test only — it never touches the network or the filesystem.
export function isTikTokVideoUrl(candidate: string): boolean {
  return /^https:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+$/.test(candidate);
}
