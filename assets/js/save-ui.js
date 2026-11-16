const transferInput = document.querySelector("#importSaveFile");
const transferStatus = document.querySelector("#transferStatus");
function reportTransfer(message) { transferStatus.textContent = message; }
function downloadSave(value) {
  const blob = new Blob([SaveTransfer.encode(value)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `人生存档-${value.character.name.replace(/[^\p{L}\p{N}_-]/gu, "_")}-${value.turn}月.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
document.querySelector("#exportSaveButton").addEventListener("click", () => {
  try { if (!state) throw new Error("请先开始一段人生。"); downloadSave(state); reportTransfer("已发起下载，请在浏览器下载列表中保存 JSON 文件。"); }
  catch (error) { reportTransfer(error.message); }
});
document.querySelector("#importSaveButton").addEventListener("click", () => { transferInput.value = ""; transferInput.click(); });
document.querySelector("#restoreSaveButton").addEventListener("click", () => {
  try {
    const previous = localStorage.getItem(STORAGE_KEY + "-before-import");
    if (!previous) throw new Error("尚无导入前备份。");
    importSaveText(previous);
  } catch (error) { reportTransfer(error.message); }
});
transferInput.addEventListener("change", async () => {
  const file = transferInput.files[0];
  if (!file) return;
  try {
    if (file.size > SaveTransfer.MAX_BYTES) throw new Error("存档文件不能超过 2 MB。");
    importSaveText(await file.text());
  } catch (error) { reportTransfer(error.message); }
  finally { transferInput.value = ""; }
});
function importSaveText(text) {
  const candidate = normalizeSavedGame(SaveTransfer.decode(text));
  if (!candidate) throw new Error("存档无法迁移，当前进度未改变。");
  SaveTransfer.validate(candidate);
  const summary = `即将导入：${candidate.character.name} · 已走过 ${candidate.turn} 个月。\n${state ? "将替换当前人生，并保留一份导入前备份。" : "将在这台设备继续此人生。"}\n仅导入你信任的存档。是否继续？`;
  if (!confirm(summary)) { reportTransfer("已取消导入，当前进度未改变。"); return false; }
  const previousState = state;
  const previous = localStorage.getItem(STORAGE_KEY);
  const oldBackup = localStorage.getItem(STORAGE_KEY + "-before-import");
  try {
    state = candidate;
    eventModal.classList.add("hidden");
    showGame();
    if (previous) localStorage.setItem(STORAGE_KEY + "-before-import", previous);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));
    reportTransfer("导入成功，已恢复月份、关系和待处理剧情。恢复备份可撤回最近一次导入。");
    return true;
  } catch {
    state = previousState;
    try {
      if (previous === null) localStorage.removeItem(STORAGE_KEY); else localStorage.setItem(STORAGE_KEY, previous);
      if (oldBackup === null) localStorage.removeItem(STORAGE_KEY + "-before-import"); else localStorage.setItem(STORAGE_KEY + "-before-import", oldBackup);
    } catch { /* Keep original in-memory state if browser storage is unavailable. */ }
    eventModal.classList.add("hidden");
    if (state) showGame(); else showSetup();
    throw new Error("导入失败：存档结构不兼容或浏览器存储不足，未替换当前人生。");
  }
}
