const SaveTransfer = (() => {
  const MAX_BYTES = 2 * 1024 * 1024;
  const FORMAT = "thirteen-years-after-save";
  function validate(data) {
    let nodes = 0;
    function walk(value, depth = 0) {
      if (++nodes > 60000 || depth > 60) throw new Error("存档结构过大或层级过深。");
      if (typeof value === "number" && !Number.isFinite(value)) throw new Error("存档含无效数值。");
      if (typeof value === "string" && (value.length > 100000 || /[<>]/.test(value))) throw new Error("存档含不支持的文本内容。");
      if (value && typeof value === "object") for (const key of Object.keys(value)) {
        if (["__proto__", "prototype", "constructor"].includes(key)) throw new Error("存档含不安全字段。");
        walk(value[key], depth + 1);
      }
    }
    walk(data);
    const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
    if (!object(data) || !object(data.character) || !object(data.stats) || !Array.isArray(data.memories)) throw new Error("这不是有效的人生模拟器存档。");
    if (data.version != null && (!Number.isInteger(data.version) || data.version < 1 || data.version > 17)) throw new Error("此存档版本暂不支持，请使用对应或更新版本的游戏。");
    if (!Number.isSafeInteger(data.turn) || data.turn < 0 || data.turn > 100000) throw new Error("存档月份无效。");
    for (const key of ["name", "city", "parent", "school", "personality"]) if (typeof data.character[key] !== "string" || !data.character[key].trim()) throw new Error("人物资料不完整。");
    if (!object(data.character.family) || !object(data.character.talent)) throw new Error("家庭或天赋资料不完整。");
    if (data.character.identity != null && !["boy", "girl"].includes(data.character.identity)) throw new Error("人物身份无效。");
    for (const key of ["study", "health", "mood", "social", "family", "money"]) {
      if (typeof data.stats[key] !== "number" || !Number.isFinite(data.stats[key])) throw new Error("人物属性不完整。");
      if (key !== "money" && (data.stats[key] < 0 || data.stats[key] > 100)) throw new Error("人物属性超出范围。");
    }
    for (const key of ["friends", "projects", "goals", "pendingScenes"]) if (data[key] != null && (!Array.isArray(data[key]) || !data[key].every(object))) throw new Error("存档列表结构无效。");
    for (const key of ["education", "economy", "investments", "career", "balance", "relationships", "risks", "skills", "lifeStats"]) if (data[key] != null && !object(data[key])) throw new Error("存档状态结构无效。");
    for (const friend of data.friends ?? []) {
      if (typeof friend.id !== "string" || typeof friend.name !== "string") throw new Error("朋友资料不完整。");
      if (friend.story != null && (!object(friend.story) || !["dream", "responsibility", "distance"].includes(friend.story.kind) || !Number.isInteger(friend.story.chapter) || friend.story.chapter < 0 || friend.story.chapter > 3 || !Array.isArray(friend.story.choices) || !Number.isFinite(friend.story.dueTurn))) throw new Error("朋友故事进度无效。");
      if (friend.sharedMoments != null && (!Array.isArray(friend.sharedMoments) || !friend.sharedMoments.every(moment => object(moment) && typeof moment.text === "string" && Number.isFinite(moment.turn)))) throw new Error("共同经历无效。");
    }
    if (!data.memories.every(item => object(item) && typeof item.text === "string" && typeof item.stage === "string")) throw new Error("人生记录不完整。");
    function scene(item) {
      if (!object(item) || typeof item.title !== "string" || !Array.isArray(item.choices) || !item.choices.length) throw new Error("待处理剧情不完整。");
      for (const choice of item.choices) {
        if (!object(choice) || typeof choice.label !== "string" || typeof choice.result !== "string" || !object(choice.effects)) throw new Error("剧情选项不完整。");
        for (const [key, value] of Object.entries(choice.effects)) if (!["study", "health", "mood", "social", "family", "money"].includes(key) || typeof value !== "number") throw new Error("剧情属性无效。");
        if (choice.followUp) scene(choice.followUp);
        if (choice.followUps) { if (!Array.isArray(choice.followUps)) throw new Error("后续剧情无效。"); choice.followUps.forEach(scene); }
      }
    }
    (data.pendingScenes ?? []).forEach(scene);
    if (data.pendingScene) scene(data.pendingScene);
    return data;
  }
  function decode(text) {
    if (new TextEncoder().encode(text).length > MAX_BYTES) throw new Error("存档文件不能超过 2 MB。");
    let file;
    try { file = JSON.parse(text.replace(/^\uFEFF/, "")); } catch { throw new Error("无法读取 JSON，请选择导出的存档文件。"); }
    if (file?.format && file.format !== FORMAT) throw new Error("文件类型不匹配。");
    return validate(file?.format === FORMAT ? file.state : file);
  }
  function encode(state) {
    validate(state);
    const text = JSON.stringify({ format: FORMAT, exportedAt: new Date().toISOString(), state }, null, 2);
    if (new TextEncoder().encode(text).length > MAX_BYTES) throw new Error("存档超过 2 MB，暂时无法导出。");
    return text;
  }
  return { MAX_BYTES, validate, decode, encode };
})();
