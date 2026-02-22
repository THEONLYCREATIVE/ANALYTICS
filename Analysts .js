// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
// No7 Widget (Small) — reads JSON from iCloud Drive/Scriptable/no7_widget.json

const fm = FileManager.iCloud();
const dir = fm.documentsDirectory();
const path = fm.joinPath(dir, "no7_widget.json");

if (!fm.fileExists(path)) {
  const w = new ListWidget();
  w.addText("No7 Widget").font = Font.boldSystemFont(14);
  w.addText("no7_widget.json missing").font = Font.systemFont(11);
  w.addText("Export from PWA first.").font = Font.systemFont(11);
  Script.setWidget(w);
  Script.complete();
  return;
}

await fm.downloadFileFromiCloud(path);
const data = JSON.parse(fm.readString(path));

const w = new ListWidget();
w.setPadding(12, 12, 12, 12);

const title = w.addText(`No7 · Wk ${data.weekNum} ${data.day}`);
title.font = Font.boldSystemFont(14);

w.addSpacer(6);

const line1 = w.addText(`Sales: AED ${data.sales} (${data.achPct}%)`);
line1.font = Font.systemFont(12);

const line2 = w.addText(`TRN: ${data.trn} | ATV: ${data.atv}`);
line2.font = Font.systemFont(12);

const line3 = w.addText(`No7: AED ${data.no7} (${data.no7Pct}%)`);
line3.font = Font.systemFont(12);

const line4 = w.addText(`AURA: ${data.aura} (${data.auraPct}%)`);
line4.font = Font.systemFont(12);

w.addSpacer();
const ts = w.addText(`Updated: ${data.updatedAt}`);
ts.font = Font.systemFont(10);
ts.textOpacity = 0.7;

Script.setWidget(w);
Script.complete();DataView(buffer, byteOffset?, byteLength?)