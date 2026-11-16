/* Persistent friend stories. No monthly effects occur merely by opening the panel. */
const FRIEND_STORIES = {
  dream: { name: "那本没给别人看的画册", goal: "完成一份自己的创作", trouble: "想认真创作，又担心自己的作品不够好", chapters: [
    { title: "没发出去的作品", text: "发来一张画了一半的图，又很快撤回，说想做一份自己的作品，却怕被人笑话。", options: [
      ["认真看完，问对方最想表达什么", "你没有急着打分。对方愿意把未完成的部分留给你看。", 7, "倾听创作想法"],
      ["坦诚说自己不懂画，但愿意听", "你没有装作专家。对方松了口气，开始讲起画里那个人物。", 4, "诚实表达支持"] ] },
    { title: "意见不一样的时候", text: "认真修改后，把你随口说过的建议全加了进去，却觉得作品越来越不像自己。", options: [
      ["说明建议不是命令，请对方保留自己的风格", "你们划清了建议和决定的边界。作品未必更讨喜，却重新属于创作者。", 7, "尊重创作边界"],
      ["一起比较两版，把喜欢与不喜欢说具体", "讨论并不轻松，但你们第一次不靠客套话结束分歧。", 5, "一起核对分歧"] ] },
    { title: "终于按下发布键", text: "终于把那份作品放到了公开展示页。有人喜欢，也有人不理解，消息里的语气仍有点紧张。", options: [
      ["庆祝这次完成，不用别人的评价定义它", "作品没有一夜成名，但对方开始准备下一份创作。你们记住了这次勇敢。", 8, "见证第一份作品"],
      ["认真聊聊哪些反馈值得留下", "对方把反馈分成建议和情绪，决定继续画下去。你们多了一种可以坦诚讨论的默契。", 5, "一起整理真实反馈"] ] }
  ] },
  responsibility: { name: "总说没时间的那个人", goal: "在家事与自己的安排之间留出空间", trouble: "承担不少家事，却不习惯向别人求助", chapters: [
    { title: "又一次取消的约定", text: "又一次临时取消约定，解释说家里有事要帮忙，末尾还补了一句“你别等我”。", options: [
      ["先问实际困难，不急着责怪", "原来许多临时变动不是不在乎。对方说起家里的安排，也承认自己很累。", 7, "听见忙碌背后的原因"],
      ["说明自己也会失落，商量提前告知", "你没有把理解变成无限等待。你们约好以后尽早说明变化。", 4, "约定提前沟通"] ] },
    { title: "帮忙也需要边界", text: "想把一件原本答应别人的事交给你处理，却不愿说具体需要花多久。你也有自己的安排。", options: [
      ["只答应自己能完成的一小部分", "你们把事情拆开，对方另找了能接手剩余部分的人。帮助不再等于谁替谁扛下一切。", 6, "明确帮助的边界"],
      ["这次不能代办，但一起列出可求助的人", "你没有做超出精力的承诺。对方最终主动寻求了更多支持。", 4, "一起寻找其他支持"] ] },
    { title: "终于留给自己的时间", text: "发来一张空出一晚的日程，说家人已经重新分担事务，自己终于能做一点一直搁置的事。", options: [
      ["把安排交给对方，认真赴约", "你们的见面不再是谁挤出最后一点时间。对方开始练习为自己的生活做决定。", 8, "见证重新分担家事"],
      ["不必补偿以前，先选一个舒服的小安排", "你们没有清算过去的每次取消，而是从一件都愿意的小事重新建立约定。", 5, "建立不勉强的约定"] ] }
  ] },
  distance: { name: "不同方向的两个人", goal: "在生活变化后找到合适的联系节奏", trouble: "生活安排正在改变，担心关系慢慢变远", chapters: [
    { title: "即将改变的日常", text: "说接下来要随生活安排换一个常活动的地方，担心以后见面越来越难。", options: [
      ["商量低压力的联系方式，不承诺每天在线", "你们约好有空时认真回复，比起每天打卡，更希望彼此不必为忙碌内疚。", 7, "商量新的联系节奏"],
      ["先好好道别，把之后留给真实生活", "没有永远不变的保证，但这次告别没有被一句随便联系草草带过。", 4, "认真面对生活变化"] ] },
    { title: "迟迟没有回复的消息", text: "很久才回复你的消息，近况和你原先想象的已经不一样。对方也以为你不再想联系。", options: [
      ["说清误会，问问彼此现在的生活", "忙碌曾被误读成冷淡。你们重新认识了如今的对方，而不是只谈从前。", 7, "解释失联后的误会"],
      ["承认关系需要变慢，但不急着给它判结束", "你们接受了联系频率的变化，留下了彼此都能承担的空间。", 4, "接受更慢的联系"] ] },
    { title: "重新坐到一张桌前", text: "终于有机会与你见面。两个人都多了新的经历，熟悉中又有一点陌生。", options: [
      ["从现在的近况聊起，也分享自己的变化", "你们没有回到某个过去，却在新的生活里再次认识彼此。关系有了新的位置。", 8, "在变化后重新相识"],
      ["感谢曾经的陪伴，保留偶尔问候的关系", "你们不再要求对方扮演从前的角色。偶尔的问候依然真诚，这也是一种继续。", 3, "保留轻松的问候"] ] }
  ] }
};
const FRIEND_STORY_KINDS = Object.keys(FRIEND_STORIES);
function normalizeFriendStory(friend, turn = 0) {
  const hash = [...String(friend.id ?? friend.name ?? "")].reduce((n, c) => n + c.codePointAt(0), 0);
  const kind = FRIEND_STORIES[friend.story?.kind] ? friend.story.kind : FRIEND_STORIES[friend.storyKind] ? friend.storyKind : FRIEND_STORY_KINDS[hash % 3];
  return { ...friend, sharedMoments: Array.isArray(friend.sharedMoments) ? friend.sharedMoments.slice(-12) : [], story: { kind, chapter: 0, dueTurn: turn + 2, lastQueuedTurn: -1, choices: [], completedAt: null, ...(friend.story ?? {}), kind } };
}
function getPreferredFriend() {
  return state.friends.find(friend => friend.id === state.relationships?.preferredFriendId) ?? null;
}
function createFriendChapter(friend) {
  const arc = FRIEND_STORIES[friend.story.kind];
  const chapter = arc.chapters[friend.story.chapter];
  const previous = friend.story.choices.length ? `上一次，你们选择了“${friend.story.choices.at(-1)}”。` : "";
  const reserved = /不太爱|说话很慢|细心/.test(friend.trait ?? "");
  const voice = reserved ? "消息删改了几次才发出来。" : "这次没有用玩笑把话题带过去。";
  return { id: createId(), icon: "🫂", title: `${friend.name} · ${chapter.title}`, story: `${previous}${friend.name}${chapter.text}${voice}`, friendStory: { friendId: friend.id, chapter: friend.story.chapter }, choices: chapter.options.map(([label, result, closeness, moment], index) => ({ label, effects: { social: index === 0 ? 3 : 2, mood: index === 0 ? 1 : 2 }, result: `${friend.name}：${result}`, special: { type: "friendChapter", friendId: friend.id, chapter: friend.story.chapter, kind: friend.story.kind, choice: index, moment, closeness, pressure: reserved && index === 0 ? -6 : -3 } })) };
}
function updateFriendStories() {
  if (state.relationships.lastFriendStoryTurn === state.turn) return [];
  const pendingIds = new Set((state.pendingScenes ?? []).filter(scene => scene.friendStory).map(scene => scene.friendStory.friendId));
  const candidates = state.friends.filter(friend => friend.story.chapter < 3 && friend.story.dueTurn <= state.turn && friend.story.lastQueuedTurn !== state.turn && !pendingIds.has(friend.id));
  candidates.sort((a, b) => a.story.dueTurn - b.story.dueTurn);
  if (!candidates.length) return [];
  const friend = candidates[0];
  friend.story.lastQueuedTurn = state.turn;
  state.relationships.lastFriendStoryTurn = state.turn;
  return [createFriendChapter(friend)];
}
function applyFriendChapter(special) {
  const friend = state.friends.find(item => item.id === special.friendId);
  if (!friend || friend.story.chapter !== special.chapter || friend.story.kind !== special.kind || friend.story.chapter >= 3) return;
  friend.closeness = clampValue(friend.closeness + special.closeness);
  friend.pressure = clampValue(friend.pressure + special.pressure);
  friend.mood = clampValue(friend.mood + 3);
  friend.monthsSinceContact = 0;
  friend.sharedMoments.push({ turn: state.turn, text: special.moment });
  friend.sharedMoments = friend.sharedMoments.slice(-12);
  friend.story.choices.push(special.moment);
  friend.story.chapter += 1;
  friend.story.dueTurn = state.turn + (special.choice === 0 ? 2 : 3);
  if (friend.story.chapter === 3) friend.story.completedAt = state.turn;
}
function renderFriendPanel() {
  const list = document.querySelector("#friendList");
  const hint = document.querySelector("#friendPanelHint");
  const preferred = getPreferredFriend();
  hint.textContent = preferred ? `已选择${preferred.name}。后续“经营友情 / 经营大学关系 / 经营人脉 / 经营职场关系”会持续优先联系，可随时取消，不会立即增加属性。` : "选择优先联系对象后，后续经营关系时生效，直到取消。查看面板不消耗月份，也不会增加属性。";
  if (!state.friends.length) { list.textContent = "还没有认识的朋友。通过经营友情或大学关系，开始一段有名字的相识。"; return; }
  list.replaceChildren(...state.friends.map(friend => {
    const arc = FRIEND_STORIES[friend.story.kind];
    const card = document.createElement("details"); card.className = "friend-card";
    const summary = document.createElement("summary");
    summary.textContent = `${friend.name} · 亲近 ${friend.closeness} · ${friend.monthsSinceContact ? friend.monthsSinceContact + "个月未联系" : "最近联系"}`;
    const info = document.createElement("p"); info.textContent = `性格：${friend.trait}。相识：${friend.metAt ?? "旧档未记录"}。心情 ${friend.mood} · 压力 ${friend.pressure}`;
    const goal = document.createElement("p"); goal.textContent = `个人目标：${arc.goal}。${friend.story.chapter === 3 ? "这段经历已告一段落，关系仍会继续变化。" : "近况：" + (friend.story.chapter ? arc.chapters[friend.story.chapter].title : arc.trouble) + "。"}`;
    const progress = document.createElement("p"); progress.className = "friend-story-progress"; progress.textContent = `共同故事：${arc.name} · ${friend.story.chapter}/3 幕`;
    const moments = document.createElement("ul");
    friend.sharedMoments.slice(-3).forEach(moment => { const li = document.createElement("li"); li.textContent = `第${moment.turn}个月 · ${moment.text}`; moments.append(li); });
    if (!friend.sharedMoments.length) { const li = document.createElement("li"); li.textContent = "你们的共同经历会从接下来的选择开始记录。"; moments.append(li); }
    const button = document.createElement("button"); button.type = "button"; button.className = "button ghost"; button.textContent = preferred?.id === friend.id ? "取消优先联系" : "下次优先联系";
    button.addEventListener("click", () => {
      if (state.pendingScenes.length || !eventModal.classList.contains("hidden")) return;
      state.relationships.preferredFriendId = preferred?.id === friend.id ? null : friend.id; saveGame(); renderFriendPanel();
    });
    card.append(summary, info, goal, progress, moments, button); return card;
  }));
}
