/**
 * 能量咒语 - 本地版网页应用
 * 功能：抽语句、录音打卡、文字打卡、默念打卡、今日能量花园、打卡日历、分享卡片
 */

// ===== Supabase 客户端 =====
const SUPABASE_URL = 'https://dcccrxdzokokiqpfakfz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xBqt3ynwyCDOUotKEJfEUg_S2Qtn_tP';
let sb = null;

async function initSupabase() {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    sb = createClient(SUPABASE_URL, SUPABASE_KEY);
}

const DEFAULT_QUOTES = [
    "我好喜欢我自己！",
    "我简直就是个小太阳，走到哪里哪里亮。",
    "我是宇宙限量版，绝版的那种",
    "我怎么这么优秀呀，忍不住给自己鼓掌",
    "我是自己人生剧本里绝对的主角",
    "我值得拥有这世间所有美好",
    "我的存在本身就是一个奇迹",
    "我每一天都在变得更好、更强、更快乐",
    "我对自己充满了无限的信心",
    "我就是我，不一样的烟火",
    "镜子里那个小可爱是谁呀？原来是我！",
    "我爱我的身体，它超级健康又充满活力。",
    "我的笑容是世界上最治愈的武器。",
    "我今天美得冒泡啦！",
    "我爱我的眼睛，因为它们看到了美好的世界。",
    "我的头发丝都在散发着无限魅力。",
    "我由内而外都散发着光芒。",
    "我爱我的每一个细胞，它们都在欢快地跳舞。",
    "我接受我所有的样子，因为那都是可爱的我。",
    "我是行走的荷尔蒙，魅力值满分。",
    "和自己相处真是太开心啦。",
    "我允许自己像孩子一样无忧无虑。",
    "我对自己超级温柔，超级有耐心。",
    "我享受独处的时光，那是和自己约会。",
    "我今天也要宠爱自己多一点。",
    "我活在当下，享受每一秒的喜悦。",
    "我有能力创造我想要的生活。",
    "我不需要讨好任何人，我只需要讨好我自己。",
    "我相信我的直觉，它总是带我去对的地方。",
    "我勇敢地表达自己的需求，这很酷。",
    "我拒绝我不喜欢的事物，这让我感到自由。",
    "我把爱自己刻在了 DNA 里。",
    "我有无限的潜力等待爆发。",
    "任何困难在我面前都是升级打怪的小游戏。",
    "我稳稳地接住了所有的好运气。",
    "我内心充满了安全感，因为我有我自己",
    "我值得被爱，被尊重，被呵护。",
    "我正在吸引着同频的、美好的人事物。",
    "我是丰盛的，我是富足的。",
    "世界因为有我而变得更加精彩。",
    "今天的任务：做一个快乐的小废物",
    "嘿嘿，我今天也是元气弹！",
    "我给自己比个大大的心。",
    "我要把自己宠上天。",
    "谁说我不能既可爱又迷人？",
    "我就是那个让人如沐春风的小可爱。",
    "我要给自己一个大大的拥抱，紧紧的那种。",
    "我是上帝遗落在人间的珍珠",
    "我是自己的头号粉丝，为你打 call！",
    "我是向日葵，永远向着阳光。",
    "我风度翩翩，卓尔不群",
    "我玉树临风，气宇不凡",
    "我出类拔萃",
    "我是旷世奇才",
    "我盖世无双",
    "我是天之骄子",
    "我是人中龙凤",
    "每天吸一口自己，快乐似神仙",
    "报告宇宙，你派来的小可爱正在地球上好好发光",
    "警告警告！前方有个超级可爱的人正在靠近镜子！",
    "哎呀，今早不小心又被自己美醒了",
    "我这无处安放的魅力，真是让人头疼呀",
    "我每天对着镜子给自己磕头",
    "我怎么能这么棒，简直想跟自己谈一场甜甜的恋爱",
    "我宣布，今天我是自己的头号小迷妹。",
    "快乐进度条正在加载中：100%！",
    "我要把自己打包，当成最珍贵的礼物送给明天的自己。",
    "我心即宇宙，宇宙即我心",
    "我的世界我做主，我是自己唯一的王。",
    "别问我为什么这么自信，因为我值得。",
    "讨好别人不如武装自己，我简直超酷的。",
    "我不跟任何人比，我只做无可替代的自己。",
    "我允许自己野蛮生长，光芒万丈。",
    "我不需要任何人来定义。",
    "我这该死的无处安放的才华和魅力啊。",
    "我的存在，就是为了惊艳这个世界。",
    "我走过的路，连风都觉得潇洒。",
    "我的爱很贵，所以我决定全部留给我自己。",
    "实力不允许我低调，我就是这么耀眼。",
    "别拿世俗的标准框住我，我是自由的灵魂。",
    "我站在这里，本身就是一种胜利。",
    "我就是规矩，我爱自己就是最大的规矩。",
    "慢慢来吧，我这朵花有自己的花期。",
    "顺其自然吧，反正好运都在向我奔跑。",
    "允许一切发生，我依然是我，平静且喜悦。",
    "我把生活的节奏调成 0.5 倍速，慢慢品味自己的美好。",
    "阳光洒在我身上，宇宙在轻轻抚摸我。",
    "我是自己漫长岁月里，最温柔的爱人。",
    "我把对宇宙的浪漫幻想，全都倾注在自己身上。",
    "我的每一次心跳，都是在对自己说情话。",
    "我要和自己谈一场永不分手的、轰轰烈烈的恋爱。",
    "我是这世间独一无二的艺术品，值得被细细观赏。",
    "我的灵魂带着香气，那是爱自己的味道。",
    "我与自己共舞，连影子都觉得沉醉。",
    "我把每一天都当成送给自己的情书来拆开。",
    "我爱自己，这是一场终身浪漫的开始。",
    "我眼中的光，是我送给自己的钻石。",
    "我在岁月里酿了一壶酒，敬这独一无二的我。",
    "别人笑我太疯癫，我笑别人不懂我有多好玩。",
    "我这么好，以后谁娶了我，真是祖坟冒青烟。",
    "照照镜子，哎，这人怎么长得跟神仙似的，真让人嫉妒。",
    "别人靠脸吃饭，我靠不要脸地爱自己吃饭。",
    "我今天不仅要发光，我还要发热，烫死那些不开心！",
    "既然做不到让所有人都喜欢，那就让我自己爱死我自己吧。",
    "我不仅长得漂亮，我活得更漂亮，气死那些烦恼。",
    "每天被自己美醒，也是一种甜蜜的负担呢。",
    "我决定今天给自己放个假，理由是：我太可爱了需要休息。",
    "我不仅有好看的皮囊，还有个能吃能睡的有趣灵魂。",
    "别人都有背景，而我，只有迷人的背影和无敌的自信。",
    "我就是一块超级吸铁石，把所有的好运都吸过来啦！",
    "我的能量频率极高，只吸引同频的美好事物。",
    "我对宇宙下了订单：今天我要超级无敌开心！",
    "我金光闪闪，财富和喜悦都在排队走向我。",
    "我张开双臂，接收今天所有的奇迹和惊喜。",
    "我说出口的每一句赞美自己的话，都在变成现实。",
    "我就是锦鲤本鲤，走到哪里都有好运相随。",
    "我的每一个细胞都在高频振动，散发着喜悦的光芒。",
    "我是宇宙的宠儿，所有的好事都轮到我了。",
    "我感恩自己，因为我创造了如此美好的生活",
    "我越爱自己，世界就越爱我，这是一个完美的循环。",
    "我走在铺满鲜花和掌声的红毯上，因为我值得。",
    "我不仅期待奇迹，我本身就是那个奇迹。",
    "我的心境像一汪清泉，倒映出所有的美好。",
    "我对生活说是，生活也对我报以最灿烂的微笑。",
    "我把所有的阻碍都转化成了滋养我成长的肥料。",
    "我深信不疑：我正在走向我人生中最辉煌的时刻。",
    "我就是光，我就是爱，我就是无限的可能！"
];

// 加载后的 quotes 数组（每项是云端 id 对应的文本）
let quotes = [];
// quotes 索引到云端 id 的映射
let quoteIdMap = {};
// 云端 → 本地的反向映射，用于按 id 找索引
let quoteIndexMap = {};
// 云端统计数据缓存（keyed by cloud id）
let cloudQuoteStats = {};

// 一次性把默认语句同步到云端
async function seedDefaultQuotesIfEmpty() {
    const { count, error } = await sb
        .from('quotes')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.warn('检查语句库失败', error);
        return;
    }
    if (count && count > 0) return;

    // 分批插入，避免超出限制
    const batchSize = 50;
    const rows = DEFAULT_QUOTES.map(text => ({ text }));
    for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const { error: insertError } = await sb.from('quotes').insert(batch);
        if (insertError) {
            console.warn('初始化默认语句失败', insertError);
            return;
        }
    }
}

// 从云端加载语句库
async function loadQuotes() {
    await seedDefaultQuotesIfEmpty();
    const { data, error } = await sb
        .from('quotes')
        .select('id, text, draws, likes, dislikes, checkins, source, status')
        .order('id', { ascending: true });
    if (error) {
        console.warn('加载云端语句库失败，使用本地缓存', error);
        const saved = getData(STORAGE_KEYS.QUOTES, null);
        if (Array.isArray(saved) && saved.length > 0) {
            quotes = saved;
        } else {
            quotes = [...DEFAULT_QUOTES];
        }
        return;
    }
    if (data && data.length > 0) {
        quotes = data.map(q => q.text);
        quoteIdMap = {};
        quoteIndexMap = {};
        cloudQuoteStats = {};
        data.forEach((q, i) => {
            quoteIdMap[i] = q.id;
            quoteIndexMap[q.id] = i;
            cloudQuoteStats[q.id] = {
                draws: q.draws || 0,
                likes: q.likes || 0,
                dislikes: q.dislikes || 0,
                checkins: q.checkins || 0,
                source: q.source || 'admin',
                status: q.status || 'active'
            };
        });
        setData(STORAGE_KEYS.QUOTES, quotes);
    } else {
        quotes = [...DEFAULT_QUOTES];
    }
}

// ===== IndexedDB 初始化 =====
const DB_NAME = 'LoveMyselfDB';
const DB_VERSION = 1;
let db = null;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            // 存储录音
            if (!database.objectStoreNames.contains('recordings')) {
                database.createObjectStore('recordings', { keyPath: 'id' });
            }
        };
    });
}

function saveRecording(id, blob, date) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('recordings', 'readwrite');
        const store = tx.objectStore('recordings');
        store.put({ id, blob, date });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function getRecording(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('recordings', 'readonly');
        const store = tx.objectStore('recordings');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function deleteRecording(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('recordings', 'readwrite');
        const store = tx.objectStore('recordings');
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function getAllRecordings() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('recordings', 'readonly');
        const store = tx.objectStore('recordings');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// ===== localStorage 工具 =====
const STORAGE_KEYS = {
    QUOTES: 'lm_quotes',
    CHECKINS: 'lm_checkins',
    THOUGHTS: 'lm_thoughts',
    LAST_QUOTE: 'lm_last_quote',
    LAST_QUOTE_ID: 'lm_last_quote_id',
    GARDEN: 'lm_garden',
    QUOTE_STATS: 'lm_quote_stats',
    QUOTE_STATS_VERSION: 'lm_quote_stats_version',
    USER_PREFS: 'lm_user_prefs',
    SUBMISSIONS: 'lm_submissions',
    SETTINGS: 'lm_settings'
};

function getData(key, defaultVal) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultVal;
    } catch {
        return defaultVal;
    }
}

// ===== 云端辅助 =====
async function uploadAudioToCloud(blob, id) {
    try {
        const path = `audio/${id}.webm`;
        const { error: uploadError } = await sb.storage
            .from('audio')
            .upload(path, blob, { contentType: blob.type || 'audio/webm', upsert: true });
        if (uploadError) throw uploadError;
        const { data } = sb.storage.from('audio').getPublicUrl(path);
        return data.publicUrl;
    } catch (err) {
        console.warn('上传录音失败', err);
        return null;
    }
}

async function fetchCloudGarden() {
    const { data, error } = await sb
        .from('garden_items')
        .select('id, quote_text, type, content, audio_url, created_at')
        .gt('created_at', new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });
    if (error) {
        console.warn('加载能量花园失败', error);
        return [];
    }
    return data || [];
}

// ===== 能量花园评论 =====
async function fetchGardenComments(itemIds) {
    if (!itemIds.length) return {};
    const { data, error } = await sb
        .from('garden_comments')
        .select('id, garden_item_id, type, content, audio_url, author_name, created_at')
        .in('garden_item_id', itemIds)
        .order('created_at', { ascending: true });
    if (error) {
        console.warn('加载评论失败', error);
        return {};
    }
    const grouped = {};
    (data || []).forEach(c => {
        if (!grouped[c.garden_item_id]) grouped[c.garden_item_id] = [];
        grouped[c.garden_item_id].push(c);
    });
    return grouped;
}

async function submitGardenComment(itemId, type, content, audioBlob, authorName) {
    let audioUrl = null;
    if (type === 'voice' && audioBlob) {
        const path = `comments/${itemId}_${Date.now()}.webm`;
        const { error: uploadError } = await sb.storage
            .from('audio')
            .upload(path, audioBlob, { contentType: 'audio/webm', upsert: true });
        if (uploadError) {
            console.warn('上传评论录音失败', uploadError);
            return null;
        }
        const { data } = sb.storage.from('audio').getPublicUrl(path);
        audioUrl = data.publicUrl;
    }
    const { data, error } = await sb
        .from('garden_comments')
        .insert({ garden_item_id: itemId, type, content: content || null, audio_url: audioUrl, author_name: authorName || null })
        .select('id, garden_item_id, type, content, audio_url, author_name, created_at')
        .single();
    if (error) {
        console.warn('提交评论失败', error);
        return null;
    }
    return data;
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadQuotes() {
    const savedQuotes = getData(STORAGE_KEYS.QUOTES, null);
    if (Array.isArray(savedQuotes) && savedQuotes.length > 0) {
        quotes = savedQuotes;
    }
}

function saveQuotes() {
    setData(STORAGE_KEYS.QUOTES, quotes);
}

// ===== 状态 =====
let currentQuote = '';
let lastQuoteId = null;
let mediaRecorder = null;
let recordedChunks = [];
let currentRecordingBlob = null;
let recordingStartTime = 0;
let recordingTimer = null;
let maxRecordSeconds = 20;
let adminSortBy = 'default';
let adminSortOrder = 'desc';
const ADMIN_PASSWORD = 'energy2026';
let adminLoggedIn = false;

// ===== DOM 元素 =====
const els = {
    quoteText: document.getElementById('quoteText'),
    drawBtn: document.getElementById('drawBtn'),
    checkinSection: document.getElementById('checkinSection'),
    recordCheck: document.getElementById('recordCheck'),
    textCheck: document.getElementById('textCheck'),
    recordArea: document.getElementById('recordArea'),
    textArea: document.getElementById('textArea'),
    recordBtn: document.getElementById('recordBtn'),
    recordTimer: document.getElementById('recordTimer'),
    recordResult: document.getElementById('recordResult'),
    recordPlayer: document.getElementById('recordPlayer'),
    reRecordBtn: document.getElementById('reRecordBtn'),
    saveRecordBtn: document.getElementById('saveRecordBtn'),
    gardenCheck: document.getElementById('gardenCheck'),
    gardenTextCheck: document.getElementById('gardenTextCheck'),
    thoughtInput: document.getElementById('thoughtInput'),
    charCount: document.getElementById('charCount'),
    completeBtn: document.getElementById('completeBtn'),
    submitCheckinBtn: document.getElementById('submitCheckinBtn'),
    checkinDone: document.getElementById('checkinDone'),
    shareQuoteBtn: document.getElementById('shareQuoteBtn'),
    shareThoughtBtn: document.getElementById('shareThoughtBtn'),
    todayCount: document.getElementById('todayCount'),
    countNum: document.getElementById('countNum'),
    gardenList: document.getElementById('gardenList'),
    totalCheckins: document.getElementById('totalCheckins'),
    totalDays: document.getElementById('totalDays'),
    streakDays: document.getElementById('streakDays'),
    calTitle: document.getElementById('calTitle'),
    calendarGrid: document.getElementById('calendarGrid'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    voiceHistory: document.getElementById('voiceHistory'),
    thoughtHistory: document.getElementById('thoughtHistory'),
    clearDataBtn: document.getElementById('clearDataBtn'),
    shareModal: document.getElementById('shareModal'),
    shareCard: document.getElementById('shareCard'),
    shareCardQuote: document.getElementById('shareCardQuote'),
    shareCardThought: document.getElementById('shareCardThought'),
    shareCardDate: document.getElementById('shareCardDate'),
    saveCardBtn: document.getElementById('saveCardBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    homeSubtitle: document.getElementById('homeSubtitle'),
    quoteActions: document.getElementById('leftAction'),
    leftAction: document.getElementById('leftAction'),
    rightAction: document.getElementById('rightAction'),
    likeBtn: document.getElementById('likeBtn'),
    dislikeBtn: document.getElementById('dislikeBtn'),
    adminEntry: document.getElementById('adminEntry'),
    adminBackBtn: document.getElementById('adminBackBtn'),
    newQuoteInput: document.getElementById('newQuoteInput'),
    addQuoteBtn: document.getElementById('addQuoteBtn'),
    adminQuoteList: document.getElementById('adminQuoteList'),
    adminQuoteCount: document.getElementById('adminQuoteCount'),
    adminSortBtns: document.querySelectorAll('.admin-sort-btn'),
    adminColSorts: document.querySelectorAll('.admin-col-sort'),
    adminLoginModal: document.getElementById('adminLoginModal'),
    adminPasswordInput: document.getElementById('adminPasswordInput'),
    adminLoginBtn: document.getElementById('adminLoginBtn'),
    adminLoginCancelBtn: document.getElementById('adminLoginCancelBtn'),
    adminLoginHint: document.getElementById('adminLoginHint'),
    adminLoginOverlay: document.getElementById('adminLoginOverlay'),
    submitEntryBtn: document.getElementById('submitEntryBtn'),
    submitModal: document.getElementById('submitModal'),
    submitQuoteInput: document.getElementById('submitQuoteInput'),
    submitCharCount: document.getElementById('submitCharCount'),
    submitQuoteBtn: document.getElementById('submitQuoteBtn'),
    submitCancelBtn: document.getElementById('submitCancelBtn'),
    submitModalOverlay: document.getElementById('submitModalOverlay'),
    themeOptions: document.getElementById('themeOptions'),
    adminTabs: document.querySelectorAll('.admin-tab'),
    adminTabQuotes: document.getElementById('adminTabQuotes'),
    adminTabGarden: document.getElementById('adminTabGarden'),
    adminGardenList: document.getElementById('adminGardenList'),
    adminGardenCount: document.getElementById('adminGardenCount')
};

// ===== 页面导航 =====
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const pageId = btn.dataset.page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        btn.classList.add('active');

        if (pageId === 'page-record') renderRecordPage();
        if (pageId === 'page-garden') renderGarden();
    });
});
// ===== 抽一句话 =====
els.drawBtn.addEventListener('click', async () => {
    try {
        await drawQuote();
    } catch (err) {
        console.error('抽语句出错', err);
        els.quoteText.textContent = '点击下方按钮，开始你的能量咒语之旅';
    }
});

// ===== 喜欢 / 不爱 =====

function getUserPrefs() {
    return getData(STORAGE_KEYS.USER_PREFS, {});
}

function setUserPrefs(prefs) {
    setData(STORAGE_KEYS.USER_PREFS, prefs);
}

async function updateStat(quoteId, field, delta) {
    // 更新云端（直接更新，不依赖 RPC 函数）
    try {
        const { data, error } = await sb
            .from('quotes')
            .select(field)
            .eq('id', quoteId)
            .single();
        if (!error && data) {
            const currentVal = data[field] || 0;
            const newVal = Math.max(0, currentVal + delta);
            await sb.from('quotes').update({ [field]: newVal }).eq('id', quoteId);
        }
    } catch (err) {
        console.warn('更新云端统计失败', err);
    }
    // 更新本地缓存，管理后台立即生效
    if (!cloudQuoteStats[quoteId]) cloudQuoteStats[quoteId] = { draws: 0, likes: 0, dislikes: 0, checkins: 0 };
    cloudQuoteStats[quoteId][field] = Math.max(0, (cloudQuoteStats[quoteId][field] || 0) + delta);
}

// 检查用户投稿是否达到转正/冷宫条件
async function checkSubmissionStatus(quoteId) {
    const entry = cloudQuoteStats[quoteId];
    if (!entry) return;
    // 只处理投稿状态的语句（user=未处理，promoted=已转正，banned=冷宫）
    if (entry.source !== 'user') return;

    if (entry.likes >= 12) {
        // 达到12个赞 → 转正
        const { error } = await sb.from('quotes').update({ source: 'promoted' }).eq('id', quoteId);
        if (!error) entry.source = 'promoted';
    } else if (entry.dislikes >= 7) {
        // 达到7个不爱 → 打入冷宫
        const { error } = await sb.from('quotes').update({ status: 'banned' }).eq('id', quoteId);
        if (!error) entry.status = 'banned';
    }
}

els.likeBtn.addEventListener('click', async () => {
    const prefs = getUserPrefs();
    const prevChoice = prefs[lastQuoteId];

    if (prevChoice === 'like') {
        delete prefs[lastQuoteId];
        await updateStat(lastQuoteId, 'likes', -1);
        setUserPrefs(prefs);
        updateQuoteActionButtons();
        return;
    }
    if (prevChoice === 'dislike') {
        await updateStat(lastQuoteId, 'dislikes', -1);
    }
    prefs[lastQuoteId] = 'like';
    await updateStat(lastQuoteId, 'likes', 1);
    setUserPrefs(prefs);
    updateQuoteActionButtons();
    await checkSubmissionStatus(lastQuoteId);
});

els.dislikeBtn.addEventListener('click', async () => {
    const prefs = getUserPrefs();
    const prevChoice = prefs[lastQuoteId];

    if (prevChoice === 'dislike') {
        delete prefs[lastQuoteId];
        await updateStat(lastQuoteId, 'dislikes', -1);
        setUserPrefs(prefs);
        updateQuoteActionButtons();
        return;
    }
    if (prevChoice === 'like') {
        await updateStat(lastQuoteId, 'likes', -1);
    }
    prefs[lastQuoteId] = 'dislike';
    await updateStat(lastQuoteId, 'dislikes', 1);
    setUserPrefs(prefs);
    updateQuoteActionButtons();
    await checkSubmissionStatus(lastQuoteId);
});

function updateQuoteActionButtons() {
    const prefs = getUserPrefs();
    const choice = prefs[lastQuoteId];

    if (choice === 'like') {
        els.likeBtn.classList.add('liked');
        els.likeBtn.textContent = '❤️';
    } else {
        els.likeBtn.classList.remove('liked');
        els.likeBtn.textContent = '🤍';
    }

    if (choice === 'dislike') {
        els.dislikeBtn.classList.add('disliked');
    } else {
        els.dislikeBtn.classList.remove('disliked');
    }
}

async function drawQuote() {
    // 只从非冷宫语句中抽选
    const activeIndices = [];
    quotes.forEach((_, i) => {
        const id = quoteIdMap[i];
        const entry = cloudQuoteStats[id];
        if (!entry || entry.status !== 'banned') {
            activeIndices.push(i);
        }
    });
    if (activeIndices.length === 0) {
        els.quoteText.textContent = '当前没有可用的语句，请稍后再来';
        return;
    }
    let idx;
    const currentId = lastQuoteId;
    do {
        idx = activeIndices[Math.floor(Math.random() * activeIndices.length)];
    } while (quoteIdMap[idx] === currentId && activeIndices.length > 1);

    lastQuoteId = quoteIdMap[idx];
    currentQuote = quotes[idx];
    await updateStat(lastQuoteId, 'draws', 1);

    els.quoteText.textContent = currentQuote;
    setData(STORAGE_KEYS.LAST_QUOTE, currentQuote);
    setData(STORAGE_KEYS.LAST_QUOTE_ID, lastQuoteId);

    // 显示喜欢/不爱按钮
    els.leftAction.style.visibility = 'visible';
    els.leftAction.style.opacity = '1';
    els.rightAction.style.visibility = 'visible';
    els.rightAction.style.opacity = '1';
    updateQuoteActionButtons();

    // 显示打卡区域
    els.checkinSection.style.display = 'block';
    resetCheckinState();

    // 如果今天已经打卡过，提示
    if (hasCheckedInToday()) {
        els.homeSubtitle.textContent = '今日已完成打卡，可以再抽一句';
    }
}

function resetCheckinState() {
    els.recordCheck.checked = false;
    els.textCheck.checked = false;
    els.recordArea.style.display = 'none';
    els.textArea.style.display = 'none';
    els.completeBtn.style.display = 'none';
    els.submitCheckinBtn.style.display = 'none';
    els.checkinDone.style.display = 'none';
    els.recordResult.style.display = 'none';
    els.thoughtInput.value = '';
    els.charCount.textContent = '0';
    currentRecordingBlob = null;
    els.recordPlayer.src = '';
    els.gardenCheck.checked = true;
    els.gardenTextCheck.checked = true;
    els.recordTimer.textContent = '00:00 / 00:20';
    // 恢复打卡选项的显示
    const options = els.checkinSection.querySelector('.checkin-options');
    if (options) options.style.display = '';
    // 恢复默认按钮状态（显示默念完成按钮）
    updateCheckinUI();
}

// ===== 打卡选项切换 =====
els.recordCheck.addEventListener('change', updateCheckinUI);
els.textCheck.addEventListener('change', updateCheckinUI);

function updateCheckinUI() {
    const hasRecord = els.recordCheck.checked;
    const hasText = els.textCheck.checked;

    els.recordArea.style.display = hasRecord ? 'block' : 'none';
    els.textArea.style.display = hasText ? 'block' : 'none';

    if (hasRecord || hasText) {
        els.completeBtn.style.display = 'none';
        els.submitCheckinBtn.style.display = 'block';
        els.submitCheckinBtn.textContent = '完成打卡';
    } else {
        els.completeBtn.style.display = 'block';
        els.submitCheckinBtn.style.display = 'none';
    }

    // 重置录音状态
    if (!hasRecord) {
        currentRecordingBlob = null;
        els.recordResult.style.display = 'none';
    }
}

// ===== 录音功能 =====
els.recordBtn.addEventListener('click', toggleRecording);

async function toggleRecording() {
    // 如果正在录音，点击则停止
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : MediaRecorder.isTypeSupported('audio/mp4')
                ? 'audio/mp4'
                : '';

        mediaRecorder = new MediaRecorder(stream, { mimeType });
        recordedChunks = [];
        recordingStartTime = Date.now();

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: mimeType || 'audio/webm' });
            currentRecordingBlob = blob;
            const url = URL.createObjectURL(blob);
            els.recordPlayer.src = url;
            els.recordResult.style.display = 'block';
            els.recordBtn.classList.remove('recording');
            els.recordBtn.querySelector('.record-label').textContent = '点击录音';
            stream.getTracks().forEach(t => t.stop());
        };

        mediaRecorder.start();
        els.recordBtn.classList.add('recording');
        els.recordBtn.querySelector('.record-label').textContent = '点击停止';

        // 计时器
        recordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
            const sec = String(elapsed).padStart(2, '0');
            els.recordTimer.textContent = `00:${sec} / 00:20`;
            if (elapsed >= maxRecordSeconds) {
                stopRecording();
            }
        }, 100);
    } catch (err) {
        alert('无法访问麦克风，请检查权限设置：' + err.message);
    }
}

function stopRecording() {
    if (!mediaRecorder || mediaRecorder.state !== 'recording') return;
    clearInterval(recordingTimer);
    mediaRecorder.stop();
}

// 重新录音
els.reRecordBtn.addEventListener('click', () => {
    currentRecordingBlob = null;
    els.recordResult.style.display = 'none';
    els.recordTimer.textContent = '00:00 / 00:30';
});

// 保存录音到手机
els.saveRecordBtn.addEventListener('click', () => {
    if (!currentRecordingBlob) return;
    const url = URL.createObjectURL(currentRecordingBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `能量咒语-${new Date().toISOString().slice(0,10)}.webm`;
    a.click();
    URL.revokeObjectURL(url);
});

// ===== 文字输入计数 =====
els.thoughtInput.addEventListener('input', () => {
    els.charCount.textContent = els.thoughtInput.value.length;
});

// ===== 完成打卡 =====
els.completeBtn.addEventListener('click', () => finishCheckin('silent'));
els.submitCheckinBtn.addEventListener('click', () => {
    const hasRecord = els.recordCheck.checked;
    const hasText = els.textCheck.checked;

    if (hasRecord && !currentRecordingBlob) {
        alert('请先完成录音');
        return;
    }

    let type = 'silent';
    if (hasRecord && hasText) type = 'both';
    else if (hasRecord) type = 'voice';
    else if (hasText) type = 'text';

    finishCheckin(type);
});

async function finishCheckin(type) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = now.toTimeString().slice(0, 5);

    // 保存打卡记录（每次新增一条，不按日期覆盖）
    const checkins = getData(STORAGE_KEYS.CHECKINS, []);

    const checkinData = {
        date: dateStr,
        time: timeStr,
        quote: currentQuote,
        type: type,
        hasVoice: type === 'voice' || type === 'both',
        hasText: type === 'text' || type === 'both'
    };

    checkins.push(checkinData);
    setData(STORAGE_KEYS.CHECKINS, checkins);

    // 更新云端打卡计数
    if (lastQuoteId != null) {
        try {
            const { data, error } = await sb
                .from('quotes')
                .select('checkins')
                .eq('id', lastQuoteId)
                .single();
            if (!error && data) {
                const newVal = (data.checkins || 0) + 1;
                await sb.from('quotes').update({ checkins: newVal }).eq('id', lastQuoteId);
            }
            if (!cloudQuoteStats[lastQuoteId]) cloudQuoteStats[lastQuoteId] = { draws: 0, likes: 0, dislikes: 0, checkins: 0 };
            cloudQuoteStats[lastQuoteId].checkins = (cloudQuoteStats[lastQuoteId].checkins || 0) + 1;
        } catch (err) {
            console.warn('更新云端打卡计数失败', err);
        }
    }

    // 保存录音 & 提交能量花园
    let recordingId = null;
    let audioUrlForGarden = null;
    let thoughtTextForGarden = '';
    if ((type === 'voice' || type === 'both') && currentRecordingBlob) {
        recordingId = `rec_${Date.now()}`;

        // 上传音频到云端（用于能量花园）
        if (els.gardenCheck.checked) {
            audioUrlForGarden = await uploadAudioToCloud(currentRecordingBlob, recordingId);
        }

        // 同时存到本地 IndexedDB
        await saveRecording(recordingId, currentRecordingBlob, dateStr);
        checkinData.recordingId = recordingId;

        // 更新打卡记录中的 recordingId（最新一条就是刚才推送的）
        const updatedCheckins = getData(STORAGE_KEYS.CHECKINS, []);
        if (updatedCheckins.length > 0) {
            updatedCheckins[updatedCheckins.length - 1].recordingId = recordingId;
        }
        setData(STORAGE_KEYS.CHECKINS, updatedCheckins);
    }

    // 保存文字感想 & 准备花园内容
    if ((type === 'text' || type === 'both') && els.thoughtInput.value.trim()) {
        thoughtTextForGarden = els.thoughtInput.value.trim();
        const thoughts = getData(STORAGE_KEYS.THOUGHTS, []);
        thoughts.push({
            date: dateStr,
            time: timeStr,
            quote: currentQuote,
            text: thoughtTextForGarden
        });
        setData(STORAGE_KEYS.THOUGHTS, thoughts);
    }

    // 提交能量花园：如果是 both 类型，合并为一条记录
    const shouldSubmitToGarden = els.gardenCheck.checked || els.gardenTextCheck.checked;
    if (shouldSubmitToGarden && currentQuote) {
        try {
            if (type === 'both') {
                // 同时有录音和文字 → 合并为一条，type 用 voice 并附带文字
                const insertData = { quote_text: currentQuote, type: 'voice' };
                if (audioUrlForGarden) insertData.audio_url = audioUrlForGarden;
                if (thoughtTextForGarden) insertData.content = thoughtTextForGarden;
                await sb.from('garden_items').insert(insertData);
            } else if (type === 'voice' && els.gardenCheck.checked && audioUrlForGarden) {
            await sb.from('garden_items').insert({
                quote_text: currentQuote,
                type: 'voice',
                audio_url: audioUrlForGarden
            });
        } else if (type === 'text' && els.gardenTextCheck.checked && thoughtTextForGarden) {
            await sb.from('garden_items').insert({
                quote_text: currentQuote,
                type: 'text',
                content: thoughtTextForGarden
            });
        }
        } catch (err) {
            console.warn('提交能量花园失败', err);
        }
    }

    // 显示完成状态
    els.checkinSection.querySelector('.checkin-options').style.display = 'none';
    els.recordArea.style.display = 'none';
    els.textArea.style.display = 'none';
    els.completeBtn.style.display = 'none';
    els.submitCheckinBtn.style.display = 'none';
    els.checkinDone.style.display = 'block';

    // 显示分享按钮
    els.shareQuoteBtn.style.display = 'inline-block';
    const hasThought = els.thoughtInput.value.trim().length > 0;
    els.shareThoughtBtn.style.display = hasThought ? 'inline-block' : 'none';

    // 更新今日人数
    await updateTodayCount();

    // 刷新记录页面
    renderRecordPage();
}

function hasCheckedInToday() {
    const today = new Date().toISOString().slice(0, 10);
    const checkins = getData(STORAGE_KEYS.CHECKINS, []);
    return checkins.some(c => c.date === today);
}

async function updateTodayCount() {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const { count, error } = await sb
            .from('garden_items')
            .select('id', { count: 'exact', head: true })
            .gt('created_at', startOfToday.toISOString());
        if (error) throw error;
        els.countNum.textContent = Math.max(count || 0, 1);
        els.todayCount.style.display = 'block';
    } catch (err) {
        console.warn('加载今日人数失败', err);
        els.countNum.textContent = 1;
        els.todayCount.style.display = 'block';
    }
}

// ===== 分享卡片 =====
els.shareQuoteBtn.addEventListener('click', () => showShareCard(false));
els.shareThoughtBtn.addEventListener('click', () => showShareCard(true));
els.closeModalBtn.addEventListener('click', () => els.shareModal.style.display = 'none');
els.saveCardBtn.addEventListener('click', saveShareCard);

function showShareCard(includeThought) {
    els.shareCardQuote.textContent = currentQuote;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    els.shareCardDate.textContent = `${year}年${month}月${day}日`;

    if (includeThought) {
        const thought = els.thoughtInput.value.trim();
        els.shareCardThought.textContent = '我：' + thought;
        els.shareCardThought.style.display = 'block';
    } else {
        els.shareCardThought.style.display = 'none';
    }

    els.shareModal.style.display = 'flex';
}

async function saveShareCard() {
    els.saveCardBtn.textContent = '⏳ 处理中...';
    try {
        // 给一点延迟确保 DOM 完全渲染
        await new Promise(r => setTimeout(r, 200));

        const canvas = await html2canvas(els.shareCard, {
            scale: 3,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: els.shareCard.scrollWidth,
            windowHeight: els.shareCard.scrollHeight
        });

        const dataUrl = canvas.toDataURL('image/png');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // 移动端：在新窗口打开图片，让用户长按保存
            const newWindow = window.open('');
            if (newWindow) {
                newWindow.document.write(`
                    <html>
                    <head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
                    <body style="margin:0;padding:20px;background:#f5f5f5;text-align:center;">
                        <img src="${dataUrl}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
                        <p style="color:#666;font-size:14px;margin-top:16px;font-family:sans-serif;">长按图片保存到相册</p>
                    </body>
                    </html>
                `);
                els.saveCardBtn.textContent = '✅ 已打开';
            } else {
                // 弹窗被阻止，尝试直接下载
                downloadImage(dataUrl);
            }
        } else {
            // 桌面端：直接下载
            downloadImage(dataUrl);
        }
    } catch (err) {
        console.error('html2canvas error:', err);
        els.saveCardBtn.textContent = '❌ 保存失败';
    }
    setTimeout(() => {
        els.saveCardBtn.textContent = '💾 保存图片';
    }, 2000);
}

function downloadImage(dataUrl) {
    const link = document.createElement('a');
    link.download = `能量咒语-${new Date().toISOString().slice(0,10)}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    els.saveCardBtn.textContent = '✅ 已保存';
}

// ===== 今日能量花园 =====
async function renderGarden() {
    els.gardenList.innerHTML = '<div class="empty-garden">加载中…</div>';
    const items = await fetchCloudGarden();

    els.gardenList.innerHTML = '';

    if (items.length === 0) {
        els.gardenList.innerHTML = '<div class="empty-garden">最近72小时还没有人发布能量，来做第一个吧！</div>';
        return;
    }

    // 加载所有评论
    const itemIds = items.map(i => i.id);
    const commentsMap = await fetchGardenComments(itemIds);

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'garden-item';

        const hasAudio = !!item.audio_url;
        const hasText = !!item.content;
        let contentHtml = '';
        if (hasAudio && hasText) {
            contentHtml = `<audio class="garden-item-audio" controls preload="none" src="${item.audio_url}"></audio><div class="garden-item-text" style="margin-top:6px;">${escapeHtml(item.content)}</div>`;
        } else if (hasText) {
            contentHtml = `<div class="garden-item-text">${escapeHtml(item.content)}</div>`;
        } else if (hasAudio) {
            contentHtml = `<audio class="garden-item-audio" controls preload="none" src="${item.audio_url}"></audio>`;
        }

        const timeStr = new Date(item.created_at).toTimeString().slice(0, 5);
        const comments = commentsMap[item.id] || [];
        const commentCount = comments.length;

        div.innerHTML = `
            <div class="garden-item-quote">${escapeHtml(item.quote_text)}</div>
            ${contentHtml}
            <div class="garden-item-footer">
                <span class="garden-item-time">${timeStr}</span>
                <button class="garden-comment-btn" data-id="${item.id}">💬 ${commentCount > 0 ? commentCount : ''}</button>
            </div>
            <div class="garden-comments" id="gardenComments_${item.id}">
                <div class="garden-comments-list" id="gardenCommentsList_${item.id}">
                    ${comments.map(c => {
                        const nameHtml = c.author_name ? `<span class="garden-comment-name">${escapeHtml(c.author_name)}</span>` : '<span class="garden-comment-name garden-comment-name-anon">?</span>';
                        if (c.type === 'text') {
                            return `<div class="garden-comment-item">${nameHtml}<div class="garden-comment-bubble">${escapeHtml(c.content || '')}</div></div>`;
                        } else {
                            return `<div class="garden-comment-item">${nameHtml}<audio class="garden-comment-audio" controls preload="none" src="${c.audio_url || ''}"></audio></div>`;
                        }
                    }).join('')}
                </div>
                <button class="garden-comment-write-btn" id="gardenWriteBtn_${item.id}">评论</button>
                <div class="garden-comment-input-area" id="gardenCommentInputArea_${item.id}" style="display:none;">
                    <div class="garden-comment-name-row">
                        <input class="garden-comment-name-input" id="gardenCommentName_${item.id}" placeholder="昵称" maxlength="3">
                    </div>
                    <div class="garden-comment-mode-tabs">
                        <button class="garden-comment-mode-tab active" data-mode="text" id="gardenModeText_${item.id}">文字</button>
                        <button class="garden-comment-mode-tab" data-mode="voice" id="gardenModeVoice_${item.id}">语音</button>
                    </div>
                    <!-- 文字模式 -->
                    <div class="garden-comment-text-mode" id="gardenTextMode_${item.id}">
                        <textarea class="garden-comment-input" id="gardenCommentInput_${item.id}" placeholder="写评论…" maxlength="200"></textarea>
                        <div class="garden-comment-actions">
                            <span class="garden-comment-charcount" id="gardenCommentChar_${item.id}">0</span>
                            <button class="garden-comment-send" id="gardenSendBtn_${item.id}" data-id="${item.id}">发送</button>
                        </div>
                    </div>
                    <!-- 语音模式 -->
                    <div class="garden-comment-voice-mode" id="gardenVoiceMode_${item.id}" style="display:none;">
                        <div class="garden-comment-voice-idle" id="gardenVoiceIdle_${item.id}">
                            <button class="garden-comment-record-start" id="gardenRecordStart_${item.id}">🎤 开始录音</button>
                        </div>
                        <div class="garden-comment-recording" id="gardenRecording_${item.id}" style="display:none;">
                            <span class="garden-record-timer" id="gardenRecordTimer_${item.id}">00 / 10</span>
                            <button class="garden-record-stop" id="gardenRecordStop_${item.id}">⏹ 停止</button>
                        </div>
                        <div class="garden-comment-voice-done" id="gardenVoiceDone_${item.id}" style="display:none;">
                            <audio class="garden-comment-audio" id="gardenVoicePreview_${item.id}" controls preload="none"></audio>
                            <div class="garden-comment-voice-actions">
                                <button class="garden-comment-re-record" id="gardenReRecord_${item.id}">重新录</button>
                                <button class="garden-comment-send" id="gardenVoiceSend_${item.id}" data-id="${item.id}">发送</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        els.gardenList.appendChild(div);

        // 💬 按钮：折叠/展开评论区
        div.querySelector('.garden-comment-btn').addEventListener('click', () => {
            const commentsDiv = document.getElementById(`gardenComments_${item.id}`);
            commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
        });

        // 评论按钮：切换展开/收回输入区
        document.getElementById(`gardenWriteBtn_${item.id}`).addEventListener('click', () => {
            const area = document.getElementById(`gardenCommentInputArea_${item.id}`);
            area.style.display = area.style.display === 'none' ? 'block' : 'none';
        });

        // 文字/语音模式切换
        let currentCommentMode = 'text';
        const modeText = document.getElementById(`gardenModeText_${item.id}`);
        const modeVoice = document.getElementById(`gardenModeVoice_${item.id}`);
        const textModeDiv = document.getElementById(`gardenTextMode_${item.id}`);
        const voiceModeDiv = document.getElementById(`gardenVoiceMode_${item.id}`);

        modeText.addEventListener('click', () => {
            currentCommentMode = 'text';
            modeText.classList.add('active');
            modeVoice.classList.remove('active');
            textModeDiv.style.display = 'block';
            voiceModeDiv.style.display = 'none';
        });

        modeVoice.addEventListener('click', () => {
            currentCommentMode = 'voice';
            modeVoice.classList.add('active');
            modeText.classList.remove('active');
            textModeDiv.style.display = 'none';
            voiceModeDiv.style.display = 'block';
        });

        // 文字输入计数
        const textarea = document.getElementById(`gardenCommentInput_${item.id}`);
        textarea.addEventListener('input', () => {
            document.getElementById(`gardenCommentChar_${item.id}`).textContent = textarea.value.length;
        });

        // 发送文字评论
        document.getElementById(`gardenSendBtn_${item.id}`).addEventListener('click', async () => {
            const text = textarea.value.trim();
            if (!text) return;
            const name = document.getElementById(`gardenCommentName_${item.id}`).value.trim().slice(0, 3) || null;
            const result = await submitGardenComment(item.id, 'text', text, null, name);
            if (result) renderGarden();
        });

        // 语音评论
        let recMediaRecorder = null;
        let recChunks = [];
        let recStartTime = 0;
        let recTimer = null;
        let currentVoiceBlob = null;
        const recordStartBtn = document.getElementById(`gardenRecordStart_${item.id}`);
        const recordingArea = document.getElementById(`gardenRecording_${item.id}`);
        const voiceIdle = document.getElementById(`gardenVoiceIdle_${item.id}`);
        const voiceDone = document.getElementById(`gardenVoiceDone_${item.id}`);
        const voicePreview = document.getElementById(`gardenVoicePreview_${item.id}`);
        const recordTimer = document.getElementById(`gardenRecordTimer_${item.id}`);
        const stopBtn = document.getElementById(`gardenRecordStop_${item.id}`);
        const reRecordBtn = document.getElementById(`gardenReRecord_${item.id}`);

        async function startVoiceRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                recMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                recChunks = [];
                recStartTime = Date.now();
                currentVoiceBlob = null;
                recMediaRecorder.ondataavailable = e => { if (e.data.size > 0) recChunks.push(e.data); };
                recMediaRecorder.onstop = async () => {
                    currentVoiceBlob = new Blob(recChunks, { type: 'audio/webm' });
                    stream.getTracks().forEach(t => t.stop());
                    voicePreview.src = URL.createObjectURL(currentVoiceBlob);
                    recordingArea.style.display = 'none';
                    voiceDone.style.display = 'block';
                };
                recMediaRecorder.start();
                voiceIdle.style.display = 'none';
                recordingArea.style.display = 'flex';
                recTimer = setInterval(() => {
                    const elapsed = Math.floor((Date.now() - recStartTime) / 1000);
                    recordTimer.textContent = `${String(elapsed).padStart(2,'0')} / 10`;
                    if (elapsed >= 10) {
                        if (recMediaRecorder && recMediaRecorder.state === 'recording') recMediaRecorder.stop();
                        clearInterval(recTimer);
                    }
                }, 200);
            } catch (err) {
                alert('无法访问麦克风：' + err.message);
            }
        }

        recordStartBtn.addEventListener('click', startVoiceRecording);

        stopBtn.addEventListener('click', () => {
            clearInterval(recTimer);
            if (recMediaRecorder && recMediaRecorder.state === 'recording') recMediaRecorder.stop();
        });

        reRecordBtn.addEventListener('click', () => {
            currentVoiceBlob = null;
            voiceDone.style.display = 'none';
            voiceIdle.style.display = 'block';
            if (voicePreview.src) URL.revokeObjectURL(voicePreview.src);
            voicePreview.src = '';
        });

        // 发送语音评论
        document.getElementById(`gardenVoiceSend_${item.id}`).addEventListener('click', async () => {
            if (!currentVoiceBlob) return;
            const name = document.getElementById(`gardenCommentName_${item.id}`).value.trim().slice(0, 3) || null;
            const result = await submitGardenComment(item.id, 'voice', null, currentVoiceBlob, name);
            if (result) renderGarden();
        });
    });
}

// ===== 我的记录 =====
let currentCalMonth = new Date();

function renderRecordPage() {
    const checkins = getData(STORAGE_KEYS.CHECKINS, []);
    const thoughts = getData(STORAGE_KEYS.THOUGHTS, []);

    // 统计：打卡次数、打卡天数、连续几天
    const uniqueDates = new Set(checkins.map(c => c.date));
    els.totalCheckins.textContent = checkins.length;
    els.totalDays.textContent = uniqueDates.size;
    els.streakDays.textContent = calculateStreak(checkins);

    // 日历
    renderCalendar();

    // 声音历史
    renderVoiceHistory(checkins);

    // 感想历史
    renderThoughtHistory(thoughts);
}

function calculateStreak(checkins) {
    if (checkins.length === 0) return 0;
    const dates = checkins.map(c => c.date).sort().reverse();
    let streak = 0;
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    // 如果今天没打卡且昨天也没打卡，连续为0
    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    let checkDate = dates[0] === today ? today : yesterday;
    for (let i = 0; i < dates.length; i++) {
        if (dates[i] === checkDate) {
            streak++;
            const d = new Date(checkDate);
            d.setDate(d.getDate() - 1);
            checkDate = d.toISOString().slice(0, 10);
        } else {
            break;
        }
    }
    return streak;
}

function renderCalendar() {
    const checkins = getData(STORAGE_KEYS.CHECKINS, []);
    const checkedDates = new Set(checkins.map(c => c.date));

    const year = currentCalMonth.getFullYear();
    const month = currentCalMonth.getMonth();
    els.calTitle.textContent = `${year}年${month + 1}月`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(d => {
        html += `<div class="cal-day-header">${d}</div>`;
    });

    // 上月
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="cal-day other-month">${daysInPrevMonth - i}</div>`;
    }

    // 本月
    const today = new Date().toISOString().slice(0, 10);
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isChecked = checkedDates.has(dateStr);
        const isToday = dateStr === today;
        let cls = 'cal-day';
        if (isChecked) cls += ' checked';
        if (isToday) cls += ' today';
        html += `<div class="${cls}">${d}</div>`;
    }

    // 下月
    const remaining = (7 - ((firstDay + daysInMonth) % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
        html += `<div class="cal-day other-month">${d}</div>`;
    }

    els.calendarGrid.innerHTML = html;
}

els.prevMonth.addEventListener('click', () => {
    currentCalMonth.setMonth(currentCalMonth.getMonth() - 1);
    renderCalendar();
});

els.nextMonth.addEventListener('click', () => {
    currentCalMonth.setMonth(currentCalMonth.getMonth() + 1);
    renderCalendar();
});

async function renderVoiceHistory(checkins) {
    els.voiceHistory.innerHTML = '';
    const cutoff = Date.now() - 72 * 60 * 60 * 1000; // 72小时前

    const voiceCheckins = checkins
        .filter(c => {
            if (!c.recordingId) return false;
            const itemTime = new Date(c.date + 'T' + c.time).getTime();
            return itemTime >= cutoff;
        })
        .reverse();

    if (voiceCheckins.length === 0) {
        els.voiceHistory.innerHTML = '<div class="history-item"><div class="history-quote" style="color:#999;">72小时内的录音会在这里显示</div></div>';
        return;
    }

    for (const c of voiceCheckins) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.dataset.recordingId = c.recordingId;
        div.dataset.date = c.date;
        div.innerHTML = `
            <div class="history-header">
                <div class="history-date">${c.date} ${c.time}</div>
                <button class="btn-delete" data-type="voice" data-id="${c.recordingId}" data-date="${c.date}">删除</button>
            </div>
            <div class="history-quote">${escapeHtml(c.quote)}</div>
            <audio class="history-audio" controls preload="none"></audio>
        `;
        els.voiceHistory.appendChild(div);

        const rec = await getRecording(c.recordingId).catch(() => null);
        if (rec && rec.blob) {
            div.querySelector('audio').src = URL.createObjectURL(rec.blob);
        }
    }

    // 绑定删除按钮
    els.voiceHistory.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const recordingId = e.target.dataset.id;
            const date = e.target.dataset.date;
            if (!confirm('确定删除这条录音记录吗？')) return;

            // 从 checkins 中移除
            let allCheckins = getData(STORAGE_KEYS.CHECKINS, []);
            allCheckins = allCheckins.filter(c => !(c.recordingId === recordingId && c.date === date));
            setData(STORAGE_KEYS.CHECKINS, allCheckins);

            // 从 IndexedDB 中删除录音
            await deleteRecording(recordingId).catch(() => {});

            // 重新渲染
            renderRecordPage();
        });
    });
}

function renderThoughtHistory(thoughts) {
    els.thoughtHistory.innerHTML = '';
    const cutoff = Date.now() - 72 * 60 * 60 * 1000; // 72小时前

    const reversed = thoughts
        .filter(t => {
            const itemTime = new Date(t.date + 'T' + t.time).getTime();
            return itemTime >= cutoff;
        })
        .reverse();

    if (reversed.length === 0) {
        els.thoughtHistory.innerHTML = '<div class="history-item"><div class="history-quote" style="color:#999;">72小时内的感想会在这里显示</div></div>';
        return;
    }

    reversed.forEach((t, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.dataset.index = index;
        div.innerHTML = `
            <div class="history-header">
                <div class="history-date">${t.date} ${t.time}</div>
                <button class="btn-delete" data-type="thought" data-index="${index}">删除</button>
            </div>
            <div class="history-quote">${escapeHtml(t.quote)}</div>
            <div class="history-thought">${escapeHtml(t.text)}</div>
        `;
        els.thoughtHistory.appendChild(div);
    });

    // 绑定删除按钮
    els.thoughtHistory.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (!confirm('确定删除这条感想记录吗？')) return;

            // 从 thoughts 中移除（注意：这里用的是过滤后的 reversed 的 index，需要从原始数据中定位）
            let allThoughts = getData(STORAGE_KEYS.THOUGHTS, []);
            const cutoff = Date.now() - 72 * 60 * 60 * 1000;
            const validThoughts = allThoughts.filter(t => {
                const itemTime = new Date(t.date + 'T' + t.time).getTime();
                return itemTime >= cutoff;
            });
            const targetThought = validThoughts[validThoughts.length - 1 - index];

            if (targetThought) {
                allThoughts = allThoughts.filter(t =>
                    !(t.date === targetThought.date && t.time === targetThought.time && t.text === targetThought.text)
                );
                setData(STORAGE_KEYS.THOUGHTS, allThoughts);
            }

            // 重新渲染
            renderRecordPage();
        });
    });
}


// ===== 后台管理 =====
els.adminEntry.addEventListener('click', () => {
    if (!adminLoggedIn) {
        els.adminLoginModal.style.display = 'flex';
        els.adminPasswordInput.value = '';
        els.adminLoginHint.style.display = 'none';
        els.adminPasswordInput.focus();
        return;
    }
    enterAdminPage();
});

function enterAdminPage() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-admin').classList.add('active');
    // 默认切换到语句管理标签页
    els.adminTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.admin-tab[data-tab="quotes"]').classList.add('active');
    els.adminTabQuotes.classList.add('active');
    els.adminTabGarden.classList.remove('active');
    renderAdminQuotes();
}

// 管理员登录
els.adminLoginBtn.addEventListener('click', () => {
    const pwd = els.adminPasswordInput.value;
    if (pwd === ADMIN_PASSWORD) {
        adminLoggedIn = true;
        els.adminLoginModal.style.display = 'none';
        enterAdminPage();
    } else {
        els.adminLoginHint.style.display = 'block';
    }
});

els.adminLoginCancelBtn.addEventListener('click', () => {
    els.adminLoginModal.style.display = 'none';
});

els.adminLoginOverlay.addEventListener('click', () => {
    els.adminLoginModal.style.display = 'none';
});

els.adminPasswordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') els.adminLoginBtn.click();
});

els.adminBackBtn.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-record').classList.add('active');
    document.querySelector('[data-page="page-record"]').classList.add('active');
    renderRecordPage();
});

// 后台管理标签页切换
els.adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        els.adminTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        els.adminTabQuotes.classList.toggle('active', target === 'quotes');
        els.adminTabGarden.classList.toggle('active', target === 'garden');
        if (target === 'garden') renderAdminGarden();
    });
});

// ===== 投稿功能 =====
els.submitEntryBtn.addEventListener('click', () => {
    els.submitQuoteInput.value = '';
    els.submitCharCount.textContent = '0';
    els.submitModal.style.display = 'flex';
    setTimeout(() => els.submitQuoteInput.focus(), 200);
});

els.submitCancelBtn.addEventListener('click', () => {
    els.submitModal.style.display = 'none';
});

els.submitModalOverlay.addEventListener('click', () => {
    els.submitModal.style.display = 'none';
});

els.submitQuoteInput.addEventListener('input', () => {
    els.submitCharCount.textContent = els.submitQuoteInput.value.length;
});

els.submitQuoteBtn.addEventListener('click', async () => {
    const text = els.submitQuoteInput.value.trim();
    if (!text) {
        alert('请输入你的能量咒语');
        return;
    }
    if (text.length > 50) {
        alert('不能超过50个字');
        return;
    }
    // 重复检测：与已有语句相似度超过80%则拒绝
    const dup = quotes.find(existing => {
        const setA = new Set(text);
        const setB = new Set(existing);
        const inter = new Set([...setA].filter(c => setB.has(c)));
        const union = new Set([...setA, ...setB]);
        const ratio = inter.size / union.size;
        return ratio > 0.8;
    });
    if (dup) {
        alert('投稿内容与已有语句过于相似，请换一句');
        return;
    }
    const { data, error } = await sb
        .from('quotes')
        .insert({ text, source: 'user', status: 'active', draws: 0, likes: 0, dislikes: 0, checkins: 0 })
        .select('id, text')
        .single();
    if (error) {
        alert('投稿失败，请稍后重试：' + error.message);
        return;
    }
    // 更新本地数据
    quotes.push(data.text);
    const newIdx = quotes.length - 1;
    quoteIdMap[newIdx] = data.id;
    quoteIndexMap[data.id] = newIdx;
    cloudQuoteStats[data.id] = { draws: 0, likes: 0, dislikes: 0, checkins: 0, source: 'user', status: 'active' };
    setData(STORAGE_KEYS.QUOTES, quotes);

    els.submitModal.style.display = 'none';
    alert('🎉 投稿成功！你的能量咒语已加入公共咒语库');
});

els.addQuoteBtn.addEventListener('click', async () => {
    const text = els.newQuoteInput.value.trim();
    if (!text) {
        alert('请先输入语句');
        return;
    }
    const { data, error } = await sb
        .from('quotes')
        .insert({ text })
        .select('id, text')
        .single();
    if (error) {
        alert('新增失败：' + error.message);
        return;
    }
    quotes.push(data.text);
    quoteIdMap[quotes.length - 1] = data.id;
    quoteIndexMap[data.id] = quotes.length - 1;
    setData(STORAGE_KEYS.QUOTES, quotes);
    els.newQuoteInput.value = '';
    renderAdminQuotes();
    alert('已新增语句');
});

// 表头列排序
els.adminColSorts.forEach(col => {
    col.addEventListener('click', () => {
        const field = col.dataset.sort;
        if (adminSortBy === field) {
            adminSortOrder = adminSortOrder === 'desc' ? 'asc' : 'desc';
        } else {
            adminSortBy = field;
            adminSortOrder = 'desc';
        }
        updateSortIcons();
        renderAdminQuotes();
    });
});

function updateSortIcons() {
    els.adminColSorts.forEach(col => {
        col.classList.remove('active');
        const icon = col.querySelector('.sort-icon');
        icon.textContent = '↕';
    });
    if (adminSortBy !== 'default') {
        const active = document.querySelector(`.admin-col-sort[data-sort="${adminSortBy}"]`);
        if (active) {
            active.classList.add('active');
            const icon = active.querySelector('.sort-icon');
            icon.textContent = adminSortOrder === 'desc' ? '↓' : '↑';
        }
    }
}

// 渲染管理后台语句列表
function renderAdminQuotes() {
    els.adminQuoteCount.textContent = `${quotes.length} 条`;
    els.adminQuoteList.innerHTML = '';

    const rows = quotes.map((quote, index) => {
        const id = quoteIdMap[index];
        const stat = cloudQuoteStats[id] || { draws: 0, likes: 0, dislikes: 0, checkins: 0 };
        return { quote, index, stat };
    });

    if (adminSortBy !== 'default') {
        rows.sort((a, b) => {
            const aVal = a.stat[adminSortBy] || 0;
            const bVal = b.stat[adminSortBy] || 0;
            const diff = aVal - bVal;
            if (diff === 0) return a.index - b.index;
            return adminSortOrder === 'asc' ? diff : -diff;
        });
    }

    rows.forEach(({ quote, index, stat }) => {
        const div = document.createElement('div');
        div.className = 'admin-quote-row';

        // 状态列
        const entry = cloudQuoteStats[quoteIdMap[index]] || {};
        let statusText, statusClass;
        if (entry.status === 'banned') {
            statusText = '冷宫';
            statusClass = 'banned';
        } else if (entry.source === 'user') {
            statusText = '投稿';
            statusClass = 'submitted';
        } else {
            statusText = '正常';
            statusClass = 'normal';
        }

        div.innerHTML = `
            <div class="admin-quote-text">${escapeHtml(quote)}</div>
            <div class="admin-stat-num">${stat.draws || 0}</div>
            <div class="admin-stat-num">${stat.likes || 0}</div>
            <div class="admin-stat-num">${stat.dislikes || 0}</div>
            <div class="admin-stat-num">${stat.checkins || 0}</div>
            <div class="admin-status-cell ${statusClass}">${statusText}</div>
            <div class="admin-actions">
                <button class="btn-small" data-action="edit" data-index="${index}">修改</button>
                <button class="btn-small btn-delete-quote" data-action="delete" data-index="${index}">删除</button>
            </div>
        `;
        els.adminQuoteList.appendChild(div);
    });

    els.adminQuoteList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            if (btn.dataset.action === 'edit') editQuote(index);
            if (btn.dataset.action === 'delete') deleteQuote(index);
        });
    });

    updateSortIcons();
}

async function editQuote(index) {
    const currentText = quotes[index];
    const id = quoteIdMap[index];
    const newText = prompt('修改这条语句：', currentText);
    if (newText === null) return;
    const text = newText.trim();
    if (!text) {
        alert('语句不能为空');
        return;
    }
    const { error } = await sb.from('quotes').update({ text }).eq('id', id);
    if (error) {
        alert('修改失败：' + error.message);
        return;
    }
    quotes[index] = text;
    setData(STORAGE_KEYS.QUOTES, quotes);

    if (id === lastQuoteId) {
        currentQuote = text;
        els.quoteText.textContent = text;
        setData(STORAGE_KEYS.LAST_QUOTE, text);
    }

    renderAdminQuotes();
}

async function deleteQuote(index) {
    if (quotes.length <= 1) {
        alert('至少要保留一条语句');
        return;
    }
    if (!confirm('确定删除这条语句吗？删除后不可恢复。')) return;

    const id = quoteIdMap[index];
    const { error } = await sb.from('quotes').delete().eq('id', id);
    if (error) {
        alert('删除失败：' + error.message);
        return;
    }

    quotes.splice(index, 1);
    quoteIdMap = {};
    quoteIndexMap = {};
    quotes.forEach((text, i) => {
        // 从云端删除后，index 重新映射
    });
    // 删除后云端的 id 列表变了，刷新一次
    await loadQuotes();

    if (id === lastQuoteId) {
        currentQuote = '';
        lastQuoteId = null;
        els.quoteText.textContent = '点击下方按钮，开始你的能量咒语之旅';
        els.checkinSection.style.display = 'none';
        setData(STORAGE_KEYS.LAST_QUOTE, '');
        setData(STORAGE_KEYS.LAST_QUOTE_ID, null);
        els.leftAction.style.visibility = 'hidden';
        els.leftAction.style.opacity = '0';
        els.rightAction.style.visibility = 'hidden';
        els.rightAction.style.opacity = '0';
    }

    renderAdminQuotes();
}

function reindexAfterQuoteDelete(deletedIndex) {
    // 云端模式下不需要重排 stats/prefs（直接用 cloudId 即可）
}

// ===== 后台管理：能量花园 =====
async function renderAdminGarden() {
    els.adminGardenList.innerHTML = '<div class="empty-garden" style="padding:20px;text-align:center;color:#999;">加载中…</div>';
    const items = await fetchCloudGarden();

    els.adminGardenList.innerHTML = '';
    els.adminGardenCount.textContent = `${items.length} 条`;

    if (items.length === 0) {
        els.adminGardenList.innerHTML = '<div class="empty-garden" style="padding:20px;text-align:center;color:#999;">最近72小时没有花园记录</div>';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'admin-garden-item';

        const hasBoth = item.type === 'voice' && item.content;
        const isVoice = item.type === 'voice';
        const typeText = hasBoth ? '融合' : (isVoice ? '录音' : '文字');

        const typeHtml = `<span class="admin-garden-type ${isVoice ? 'voice' : 'text'}">${typeText}</span>`;

        const timeStr = new Date(item.created_at).toTimeString().slice(0, 5);

        div.innerHTML = `
            ${typeHtml}
            <span class="admin-garden-quote">${escapeHtml(item.quote_text)}</span>
            <span class="admin-garden-time">${timeStr}</span>
            <button class="admin-garden-delete" data-id="${item.id}" data-type="${item.type}" data-audiourl="${item.audio_url || ''}">删除</button>
        `;

        // 绑定删除事件
        const deleteBtn = div.querySelector('.admin-garden-delete');
        deleteBtn.addEventListener('click', async () => {
            if (!confirm('确定删除这条能量花园记录吗？')) return;
            const id = deleteBtn.dataset.id;
            const audioUrl = deleteBtn.dataset.audiourl;

            // 从 DB 删除记录
            const { error } = await sb.from('garden_items').delete().eq('id', id);
            if (error) {
                alert('删除失败：' + error.message);
                return;
            }

            // 如果是录音，从 Storage 删除音频文件
            if (item.type === 'voice' && audioUrl) {
                const pathMatch = audioUrl.match(/\/audio\/(.+\.webm)/);
                if (pathMatch) {
                    await sb.storage.from('audio').remove([`audio/${pathMatch[1]}`]);
                }
            }

            renderAdminGarden();
        });

        els.adminGardenList.appendChild(div);
    });
}


// ===== 清除数据 =====
els.clearDataBtn.addEventListener('click', async () => {
    if (!confirm('确定要清除所有本地数据吗？此操作不可恢复。')) return;

    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.CHECKINS);
    localStorage.removeItem(STORAGE_KEYS.THOUGHTS);
    localStorage.removeItem(STORAGE_KEYS.LAST_QUOTE);
    localStorage.removeItem(STORAGE_KEYS.LAST_QUOTE_INDEX);
    localStorage.removeItem(STORAGE_KEYS.GARDEN);
    localStorage.removeItem(STORAGE_KEYS.QUOTE_STATS);
    localStorage.removeItem(STORAGE_KEYS.QUOTE_STATS_VERSION);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFS);

    // 清除 IndexedDB
    const allRecs = await getAllRecordings().catch(() => []);
    for (const rec of allRecs) {
        await deleteRecording(rec.id).catch(() => {});
    }

    alert('数据已清除');
    location.reload();
});

// ===== 工具函数 =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 主题切换 =====
const THEME_GRADIENTS = {
    warm: 'linear-gradient(135deg, #ff9a9e 0%, #ff69b4 33%, #667eea 66%, #764ba2 100%)',
    morandi: 'linear-gradient(135deg, #E8D5D0 0%, #D4C9C0 33%, #BDC8BE 66%, #C5BCC8 100%)',
    dunhuang: 'linear-gradient(135deg, #433721 0%, #F9E3AF 25%, #89AD76 50%, #BE9168 75%, #B44C20 100%)',
    dark: 'linear-gradient(135deg, #4e0909 0%, #38094e 25%, #09114e 50%, #09404e 75%, #4e3409 100%)'
};

function applyTheme(theme) {
    const grad = THEME_GRADIENTS[theme];
    if (!grad) return;
    document.documentElement.style.setProperty('--bg-gradient', grad);
    setData('lm_theme', theme);
    // 更新选中状态
    document.querySelectorAll('.theme-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.theme === theme);
    });
}

// 主题选择点击
if (els.themeOptions) {
    els.themeOptions.addEventListener('click', (e) => {
        const dot = e.target.closest('.theme-dot');
        if (dot) applyTheme(dot.dataset.theme);
    });
}

// ===== 初始化 =====
// ===== 清理过期数据（72小时）=====
async function cleanupOldData() {
    const cutoff = Date.now() - 72 * 60 * 60 * 1000;

    // 清理打卡记录
    let checkins = getData(STORAGE_KEYS.CHECKINS, []);
    const oldCheckins = checkins.filter(c => {
        const itemTime = new Date(c.date + 'T' + c.time).getTime();
        return itemTime < cutoff;
    });
    if (oldCheckins.length > 0) {
        for (const c of oldCheckins) {
            if (c.recordingId) {
                await deleteRecording(c.recordingId).catch(() => {});
            }
        }
        checkins = checkins.filter(c => {
            const itemTime = new Date(c.date + 'T' + c.time).getTime();
            return itemTime >= cutoff;
        });
        setData(STORAGE_KEYS.CHECKINS, checkins);
    }

    // 清理感想
    let thoughts = getData(STORAGE_KEYS.THOUGHTS, []);
    const oldThoughts = thoughts.filter(t => {
        const itemTime = new Date(t.date + 'T' + t.time).getTime();
        return itemTime < cutoff;
    });
    if (oldThoughts.length > 0) {
        thoughts = thoughts.filter(t => {
            const itemTime = new Date(t.date + 'T' + t.time).getTime();
            return itemTime >= cutoff;
        });
        setData(STORAGE_KEYS.THOUGHTS, thoughts);
    }

    // 能量花园现在在云端，按 created_at 过滤，无需本地清理
}

async function init() {
    await initSupabase();
    await initDB();
    await loadQuotes(); // 从云端拉语句库
    await cleanupOldData(); // 启动时清理过期数据

    // 恢复主题
    const savedTheme = getData('lm_theme', 'warm');
    applyTheme(savedTheme);

    // 恢复上次的语句
    const savedQuote = getData(STORAGE_KEYS.LAST_QUOTE, '');
    const savedId = getData(STORAGE_KEYS.LAST_QUOTE_ID, null);
    if (savedQuote && savedId && quoteIndexMap[savedId] !== undefined) {
        currentQuote = savedQuote;
        lastQuoteId = savedId;
        els.quoteText.textContent = currentQuote;
        els.checkinSection.style.display = 'block';
        resetCheckinState();

        // 显示喜欢/不爱按钮
        els.leftAction.style.visibility = 'visible';
        els.leftAction.style.opacity = '1';
        els.rightAction.style.visibility = 'visible';
        els.rightAction.style.opacity = '1';
        updateQuoteActionButtons();

        // 检查今天是否已打卡
        if (hasCheckedInToday()) {
            els.homeSubtitle.textContent = '今日已完成打卡，可以再抽一句';
            // 显示已完成状态
            els.checkinSection.querySelector('.checkin-options').style.display = 'none';
            els.completeBtn.style.display = 'none';
            els.submitCheckinBtn.style.display = 'none';
            els.checkinDone.style.display = 'block';
        }
    }

    // 初始化日历
    renderCalendar();

    // 显示今日人数
    await updateTodayCount();
}

init().catch(console.error);