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
const DB_VERSION = 2;
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
            // 存储图片
            if (!database.objectStoreNames.contains('images')) {
                database.createObjectStore('images', { keyPath: 'id' });
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

function saveImage(id, blob, date) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('images', 'readwrite');
        const store = tx.objectStore('images');
        store.put({ id, blob, date });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function getImage(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('images', 'readonly');
        const store = tx.objectStore('images');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function deleteImage(id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('images', 'readwrite');
        const store = tx.objectStore('images');
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function getAllImages() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('images', 'readonly');
        const store = tx.objectStore('images');
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
    SETTINGS: 'lm_settings',
    WEEKLY_RECORDS: 'lm_weekly_records',
    WEEKLY_NAME: 'lm_weekly_name'
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
        .select('id, quote_text, type, content, audio_url, image_url, created_at')
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

// ===== 设备标识 =====
function getDeviceId() {
    let id = localStorage.getItem('lm_device_id');
    if (!id) {
        id = 'dev_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
        localStorage.setItem('lm_device_id', id);
    }
    return id;
}

// ===== 能量花园点赞 =====
async function fetchGardenLikes(gardenItemIds) {
    if (!gardenItemIds.length) return {};
    const { data, error } = await sb
        .from('garden_likes')
        .select('garden_item_id, device_id')
        .in('garden_item_id', gardenItemIds);
    if (error) {
        console.warn('加载点赞失败', error);
        return {};
    }
    const deviceId = getDeviceId();
    const result = {};
    (data || []).forEach(l => {
        if (!result[l.garden_item_id]) result[l.garden_item_id] = { count: 0, liked: false };
        result[l.garden_item_id].count++;
        if (l.device_id === deviceId) result[l.garden_item_id].liked = true;
    });
    gardenItemIds.forEach(id => { if (!result[id]) result[id] = { count: 0, liked: false }; });
    return result;
}

async function toggleGardenLike(gardenItemId, currentlyLiked) {
    const deviceId = getDeviceId();
    if (currentlyLiked) {
        await sb.from('garden_likes').delete().eq('garden_item_id', gardenItemId).eq('device_id', deviceId);
    } else {
        await sb.from('garden_likes').insert({ garden_item_id: gardenItemId, device_id: deviceId });
    }
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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
let currentImageBlob = null;
let isCheckinInProgress = false;
let recordingStartTime = 0;
let recordingTimer = null;
let maxRecordSeconds = 20;
let adminSortBy = 'default';
let adminSortOrder = 'desc';
const ADMIN_PASSWORD = 'energy2026';
let adminLoggedIn = false;
let isCustomMode = false;

// ===== 周主题状态 =====
let weeklyThemes = [];
let currentThemeId = null;
let weeklyMediaRecorder = null;
let weeklyRecordedChunks = [];
let weeklyRecordingBlob = null;
let weeklyRecordingStartTime = 0;
let weeklyRecordingTimer = null;

// ===== DOM 元素 =====
const els = {
    quoteText: document.getElementById('quoteText'),
    drawBtn: document.getElementById('drawBtn'),
    checkinSection: document.getElementById('checkinSection'),
    recordCheck: document.getElementById('recordCheck'),
    recordHintText: document.getElementById('recordHintText'),
    imageInput: document.getElementById('imageInput'),
    imageUploadBtn: document.getElementById('imageUploadBtn'),
    imagePreview: document.getElementById('imagePreview'),
    imagePreviewImg: document.getElementById('imagePreviewImg'),
    imageRemoveBtn: document.getElementById('imageRemoveBtn'),
    imageArea: document.getElementById('imageArea'),
    gardenOptWrap: document.getElementById('gardenOptWrap'),
    gardenGuideLink: document.getElementById('gardenGuideLink'),
    recordArea: document.getElementById('recordArea'),
    textArea: document.getElementById('textArea'),
    recordBtn: document.getElementById('recordBtn'),
    recordTimer: document.getElementById('recordTimer'),
    recordResult: document.getElementById('recordResult'),
    recordPlayer: document.getElementById('recordPlayer'),
    reRecordBtn: document.getElementById('reRecordBtn'),
    saveRecordBtn: document.getElementById('saveRecordBtn'),
    gardenCheck: document.getElementById('gardenCheck'),
    thoughtInput: document.getElementById('thoughtInput'),
    charCount: document.getElementById('charCount'),
    completeBtn: document.getElementById('completeBtn'),
    submitCheckinBtn: document.getElementById('submitCheckinBtn'),
    checkinDone: document.getElementById('checkinDone'),
    shareQuoteBtn: document.getElementById('shareQuoteBtn'),
    shareThoughtBtn: document.getElementById('shareThoughtBtn'),
    shareImageBtn: document.getElementById('shareImageBtn'),
    todayCount: document.getElementById('todayCount'),
    countNum: document.getElementById('countNum'),
    gardenList: document.getElementById('gardenList'),
    totalCheckins: document.getElementById('totalCheckins'),
    totalDays: document.getElementById('totalDays'),
    streakDays: document.getElementById('streakDays'),
    totalDraws: document.getElementById('totalDraws'),
    calTitle: document.getElementById('calTitle'),
    calendarGrid: document.getElementById('calendarGrid'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    voiceHistory: document.getElementById('voiceHistory'),
    thoughtHistory: document.getElementById('thoughtHistory'),
    myHistoryList: document.getElementById('myHistoryList'),
    clearDataBtn: document.getElementById('clearDataBtn'),
    shareModal: document.getElementById('shareModal'),
    shareCard: document.getElementById('shareCard'),
    shareCardQuote: document.getElementById('shareCardQuote'),
    shareCardThought: document.getElementById('shareCardThought'),
    shareCardImage: document.getElementById('shareCardImage'),
    shareCardDate: document.getElementById('shareCardDate'),
    saveCardBtn: document.getElementById('saveCardBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    homeSubtitle: document.getElementById('homeSubtitle'),
    actionBar: document.getElementById('actionBar'),
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
    customCorner: document.getElementById('customCorner'),
    customInput: document.getElementById('customInput'),
    customCharCount: document.getElementById('customCharCount'),
    themeOptions: document.getElementById('themeOptions'),
    adminTabs: document.querySelectorAll('.admin-tab'),
    adminTabQuotes: document.getElementById('adminTabQuotes'),
    adminTabGarden: document.getElementById('adminTabGarden'),
    adminGardenList: document.getElementById('adminGardenList'),
    adminGardenCount: document.getElementById('adminGardenCount'),
    // 周主题
    weeklySubtitle: document.getElementById('weeklySubtitle'),
    weeklyThemeTitle: document.getElementById('weeklyThemeTitle'),
    weeklyThemeDesc: document.getElementById('weeklyThemeDesc'),
    weeklyNameInput: document.getElementById('weeklyNameInput'),
    weeklyTextInput: document.getElementById('weeklyTextInput'),
    weeklyCharCount: document.getElementById('weeklyCharCount'),
    weeklyRecordCheck: document.getElementById('weeklyRecordCheck'),
    weeklyRecordArea: document.getElementById('weeklyRecordArea'),
    weeklyRecordTimer: document.getElementById('weeklyRecordTimer'),
    weeklyRecordBtn: document.getElementById('weeklyRecordBtn'),
    weeklyRecordResult: document.getElementById('weeklyRecordResult'),
    weeklyRecordPlayer: document.getElementById('weeklyRecordPlayer'),
    weeklyReRecordBtn: document.getElementById('weeklyReRecordBtn'),
    weeklyPublicCheck: document.getElementById('weeklyPublicCheck'),
    weeklySubmitBtn: document.getElementById('weeklySubmitBtn'),
    weeklyList: document.getElementById('weeklyList'),
    myWeeklyList: document.getElementById('myWeeklyList'),
    // 周主题管理
    adminTabWeekly: document.getElementById('adminTabWeekly'),
    weeklyThemeTitleInput: document.getElementById('weeklyThemeTitleInput'),
    weeklyThemeDescInput: document.getElementById('weeklyThemeDescInput'),
    weeklyThemePlaceholderInput: document.getElementById('weeklyThemePlaceholderInput'),
    addWeeklyThemeBtn: document.getElementById('addWeeklyThemeBtn'),
    adminWeeklyList: document.getElementById('adminWeeklyList'),
    adminWeeklyCount: document.getElementById('adminWeeklyCount'),
    // 周主题编辑模态框
    weeklyEditModal: document.getElementById('weeklyEditModal'),
    weeklyEditOverlay: document.getElementById('weeklyEditOverlay'),
    editWeeklyTitle: document.getElementById('editWeeklyTitle'),
    editWeeklyDesc: document.getElementById('editWeeklyDesc'),
    editWeeklyPlaceholder: document.getElementById('editWeeklyPlaceholder'),
    saveWeeklyEditBtn: document.getElementById('saveWeeklyEditBtn'),
    cancelWeeklyEditBtn: document.getElementById('cancelWeeklyEditBtn'),
    adminWeeklyThemeSelect: document.getElementById('adminWeeklyThemeSelect'),
    adminWeeklySubmissions: document.getElementById('adminWeeklySubmissions')
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
        if (pageId === 'page-weekly') initWeeklyPage();
    });
});

// 花园引导链接
els.gardenGuideLink.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-garden').classList.add('active');
    document.querySelector('[data-page="page-garden"]').classList.add('active');
    renderGarden();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 抽一句话 =====
els.drawBtn.addEventListener('click', async () => {
    try {
        if (isCustomMode) exitCustomMode();
        await drawQuote();
    } catch (err) {
        console.error('抽语句出错', err);
        els.quoteText.textContent = '点击下方按钮，开始你的能量咒语之旅';
    }
});

// 自定义角落点击
els.customCorner.addEventListener('click', () => {
    if (isCustomMode) {
        exitCustomMode();
    } else {
        enterCustomMode();
    }
});

function enterCustomMode() {
    isCustomMode = true;
    // 隐藏整个操作栏（抽一句、喜欢、不爱）
    els.actionBar.style.display = 'none';
    // 显示输入框，隐藏引文
    els.quoteText.style.display = 'none';
    els.customInput.style.display = 'block';
    els.customInput.value = '';
    els.customCharCount.style.display = 'block';
    els.customCharCount.textContent = '0/50';
    els.customCorner.textContent = '抽一句▸';
    // 重置打卡状态
    els.checkinSection.style.display = 'block';
    resetCheckinState();
    // 清空当前语句
    currentQuote = '';
    lastQuoteId = null;
    setTimeout(() => els.customInput.focus(), 200);
}

function exitCustomMode() {
    isCustomMode = false;
    // 恢复操作栏
    els.actionBar.style.display = '';
    // 显示引文
    els.quoteText.style.display = '';
    els.customInput.style.display = 'none';
    els.customInput.value = '';
    els.customCharCount.style.display = 'none';
    els.customCorner.textContent = '自定义▸';
    // 恢复到没有语句的状态
    currentQuote = '';
    lastQuoteId = null;
    els.quoteText.textContent = '点击下方按钮，开始你的能量咒语之旅';
    els.checkinSection.style.display = 'none';
    resetCheckinState();
}

// 自定义输入字数统计
els.customInput.addEventListener('input', () => {
    const len = els.customInput.value.length;
    els.customCharCount.textContent = `${len}/50`;
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
    // 记录用户自己的抽选次数
    const prevDraws = getData('lm_draws', 0);
    setData('lm_draws', prevDraws + 1);

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
    els.recordCheck.checked = true;
    els.recordArea.style.display = 'none';
    els.textArea.style.display = '';
    els.completeBtn.style.display = 'none';
    els.submitCheckinBtn.style.display = 'none';
    els.checkinDone.style.display = 'none';
    els.gardenGuideLink.style.display = 'none';
    els.recordResult.style.display = 'none';
    els.thoughtInput.value = '';
    els.charCount.textContent = '0';
    currentRecordingBlob = null;
    currentImageBlob = null;
    els.recordPlayer.src = '';
    els.gardenCheck.checked = true;
    els.recordTimer.textContent = '00:00 / 00:20';
    els.imageArea.style.display = 'block';
    els.imageUploadBtn.style.display = 'inline-block';
    els.imagePreview.style.display = 'none';
    els.imagePreviewImg.src = '';
    els.gardenOptWrap.style.display = 'none';
    // 恢复打卡选项的显示
    const options = els.checkinSection.querySelector('.checkin-options');
    if (options) options.style.display = '';
    // 恢复默认按钮状态
    updateCheckinUI();
}

// ===== 打卡选项切换 =====
els.recordCheck.addEventListener('change', updateCheckinUI);

function updateCheckinUI() {
    const hasRecord = els.recordCheck.checked;
    const hasText = els.thoughtInput.value.trim().length > 0;
    const hasImage = currentImageBlob !== null;

    els.recordArea.style.display = hasRecord ? 'block' : 'none';
    els.recordHintText.style.display = hasRecord ? 'block' : 'none';

    if (hasRecord) {
        els.completeBtn.style.display = 'none';
        els.submitCheckinBtn.style.display = 'block';
        els.submitCheckinBtn.textContent = '完成打卡';
    } else {
        els.completeBtn.style.display = 'block';
        els.submitCheckinBtn.style.display = 'none';
    }

    // 传递到花园：有录音/文字/图片时才显示
    els.gardenOptWrap.style.display = (hasRecord || hasText || hasImage) ? 'flex' : 'none';

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
    updateCheckinUI();
});

// ===== 图片上传 =====
els.imageUploadBtn.addEventListener('click', () => els.imageInput.click());

els.imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // 压缩图片
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            if (width > 1200) { height = Math.round(height * 1200 / width); width = 1200; }
            if (height > 1200) { width = Math.round(width * 1200 / height); height = 1200; }
            canvas.width = width; canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                currentImageBlob = blob;
                els.imagePreviewImg.src = URL.createObjectURL(blob);
                els.imagePreview.style.display = 'block';
                updateCheckinUI();
            }, 'image/jpeg', 0.8);
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    els.imageInput.value = '';
});

els.imageRemoveBtn.addEventListener('click', () => {
    currentImageBlob = null;
    els.imagePreview.style.display = 'none';
    els.imagePreviewImg.src = '';
    updateCheckinUI();
});

// ===== 完成打卡 =====
els.completeBtn.addEventListener('click', () => {
    if (isCheckinInProgress) return;
    isCheckinInProgress = true;
    // 不勾朗读时，检测是否有文字或图片，有则传递类型
    const hasText = els.thoughtInput.value.trim().length > 0;
    const hasImage = currentImageBlob !== null;
    let checkType = 'silent';
    if (hasText && hasImage) checkType = 'text';
    else if (hasText) checkType = 'text';
    else if (hasImage) checkType = 'text'; // 用 text 类型但图片通过 imageUrl 附带
    finishCheckin(checkType).finally(() => { isCheckinInProgress = false; });
});
els.submitCheckinBtn.addEventListener('click', () => {
    if (isCheckinInProgress) return;
    isCheckinInProgress = true;
    const hasRecord = els.recordCheck.checked;
    const hasText = els.thoughtInput.value.trim().length > 0;
    const hasImage = currentImageBlob !== null;

    if (hasRecord && !currentRecordingBlob) {
        alert('请先完成录音');
        isCheckinInProgress = false;
        return;
    }

    let type = 'silent';
    if (hasRecord && hasText) type = 'both';
    else if (hasRecord) type = 'voice';
    else if (hasText) type = 'text';

    finishCheckin(type).finally(() => { isCheckinInProgress = false; });
});

async function finishCheckin(type) {
    // 自定义模式：从输入框获取内容
    if (isCustomMode) {
        const customText = els.customInput.value.trim();
        if (!customText) {
            alert('请先输入你要朗读的内容');
            return;
        }
        currentQuote = customText;
    }
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
        hasText: type === 'text' || type === 'both',
        hasImage: currentImageBlob !== null,
        imageId: currentImageBlob ? `img_${Date.now()}` : null,
        isCustom: isCustomMode
    };

    checkins.push(checkinData);
    setData(STORAGE_KEYS.CHECKINS, checkins);

    // 保存图片到本地
    if (currentImageBlob && checkinData.imageId) {
        await saveImage(checkinData.imageId, currentImageBlob, dateStr);
    }

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

    // 上传图片到云端
    let imageUrlForGarden = null;
    if (currentImageBlob && els.gardenCheck.checked) {
        const imgPath = `images/${Date.now()}.jpg`;
        const { error: imgUploadError } = await sb.storage
            .from('images')
            .upload(imgPath, currentImageBlob, { contentType: 'image/jpeg', upsert: true });
        if (!imgUploadError) {
            const { data } = sb.storage.from('images').getPublicUrl(imgPath);
            imageUrlForGarden = data.publicUrl;
        }
    }

    // 提交能量花园：合并为一条记录
    if (els.gardenCheck.checked && currentQuote) {
        try {
            const insertData = { quote_text: currentQuote, type: 'voice' };
            if (audioUrlForGarden) insertData.audio_url = audioUrlForGarden;
            if (thoughtTextForGarden) insertData.content = thoughtTextForGarden;
            if (imageUrlForGarden) insertData.image_url = imageUrlForGarden;
            await sb.from('garden_items').insert(insertData);
        } catch (err) {
            console.warn('提交能量花园失败', err);
        }
    }

    // 显示完成状态
    els.checkinSection.querySelector('.checkin-options').style.display = 'none';
    els.recordArea.style.display = 'none';
    els.recordHintText.style.display = 'none';
    els.textArea.style.display = 'none';
    els.imageArea.style.display = 'none';
    els.imageUploadBtn.style.display = 'none';
    els.imagePreview.style.display = 'none';
    els.gardenOptWrap.style.display = 'none';
    els.gardenGuideLink.style.display = els.gardenCheck.checked ? 'inline-block' : 'none';
    els.completeBtn.style.display = 'none';
    els.submitCheckinBtn.style.display = 'none';
    els.checkinDone.style.display = 'block';

    // 显示分享按钮
    els.shareQuoteBtn.style.display = 'inline-block';
    const hasThought = els.thoughtInput.value.trim().length > 0;
    els.shareThoughtBtn.style.display = hasThought ? 'inline-block' : 'none';
    els.shareImageBtn.style.display = currentImageBlob ? 'inline-block' : 'none';

    // 更新今日人数
    await updateTodayCount();

    // 刷新记录页面
    renderRecordPage();
    isCheckinInProgress = false;
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
els.shareImageBtn.addEventListener('click', () => showShareCard('image'));
els.closeModalBtn.addEventListener('click', () => els.shareModal.style.display = 'none');
els.saveCardBtn.addEventListener('click', saveShareCard);

function showShareCard(includeThought) {
    els.shareCardQuote.textContent = currentQuote;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    els.shareCardDate.textContent = `${year}年${month}月${day}日`;

    if (includeThought === 'image') {
        els.shareCardThought.style.display = 'none';
        els.shareCardImage.style.display = 'block';
        els.shareCardImage.src = els.imagePreviewImg.src;
    } else {
        els.shareCardImage.style.display = 'none';
        els.shareCardImage.src = '';
        if (includeThought) {
            const thought = els.thoughtInput.value.trim();
            els.shareCardThought.textContent = '我：' + thought;
            els.shareCardThought.style.display = 'block';
        } else {
            els.shareCardThought.style.display = 'none';
        }
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

    // 加载所有评论和点赞
    const itemIds = items.map(i => i.id);
    const commentsMap = await fetchGardenComments(itemIds);
    const likesMap = await fetchGardenLikes(itemIds);

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'garden-item';

        const hasAudio = !!item.audio_url;
        const hasText = !!item.content;
        const hasImage = !!item.image_url;
        let contentHtml = '';
        if (hasAudio && hasText) {
            contentHtml = `<audio class="garden-item-audio" controls preload="none" src="${item.audio_url}"></audio><div class="garden-item-text" style="margin-top:6px;">💭 此刻感受<br>${escapeHtml(item.content)}</div>`;
        } else if (hasText) {
            contentHtml = `<div class="garden-item-text">💭 此刻感受<br>${escapeHtml(item.content)}</div>`;
        } else if (hasAudio) {
            contentHtml = `<audio class="garden-item-audio" controls preload="none" src="${item.audio_url}"></audio>`;
        }
        if (hasImage) {
            contentHtml += `<img class="garden-item-image" src="${item.image_url}" alt="打卡图片" onclick="window.open('${item.image_url}','_blank')">`;
        }

        const dt = new Date(item.created_at);
        const dateStr = `${dt.getMonth()+1}月${dt.getDate()}日`;
        const timeStr = dateStr + ' ' + dt.toTimeString().slice(0, 5);
        const comments = commentsMap[item.id] || [];
        const commentCount = comments.length;
        const likeInfo = likesMap[item.id] || { count: 0, liked: false };

        div.innerHTML = `
            <div class="garden-item-quote">${escapeHtml(item.quote_text)}</div>
            ${contentHtml}
            <div class="garden-item-footer">
                <span class="garden-item-time">${timeStr}</span>
                <div class="garden-item-actions">
                    <button class="garden-like-btn" data-id="${item.id}">${likeInfo.liked ? '💗' : '🤍'}${likeInfo.count > 0 ? ' ' + likeInfo.count : ''}</button>
                    <button class="garden-comment-btn" data-id="${item.id}">💬 ${commentCount > 0 ? commentCount : ''}</button>
                </div>
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

    // 点赞按钮事件代理
    els.gardenList.addEventListener('click', async (e) => {
        const btn = e.target.closest('.garden-like-btn');
        if (!btn) return;
        const gardenItemId = parseInt(btn.dataset.id);
        const currentlyLiked = btn.textContent.includes('💗');
        await toggleGardenLike(gardenItemId, currentlyLiked);
        renderGarden();
    });
}

// ===== 我的记录 =====
let currentCalMonth = new Date();

function renderRecordPage() {
    const checkins = getData(STORAGE_KEYS.CHECKINS, []);
    const thoughts = getData(STORAGE_KEYS.THOUGHTS, []);

    // 统计：抽选次数（本地）、打卡次数、打卡天数、连续几天
    const localDraws = getData('lm_draws', 0);
    els.totalDraws.textContent = localDraws;
    const uniqueDates = new Set(checkins.map(c => c.date));
    els.totalCheckins.textContent = checkins.length;
    els.totalDays.textContent = uniqueDates.size;
    els.streakDays.textContent = calculateStreak(checkins);

    // 日历
    renderCalendar();

    // 打卡记录
    renderMyHistory(checkins, thoughts);

    // 周主题记录
    renderMyWeeklyHistory();
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

async function renderMyHistory(checkins, thoughts) {
    els.myHistoryList.innerHTML = '';
    const cutoff = Date.now() - 72 * 60 * 60 * 1000;

    // 按时间倒序排列
    const sorted = [...checkins].sort((a, b) => {
        const ta = new Date(a.date + 'T' + a.time).getTime();
        const tb = new Date(b.date + 'T' + b.time).getTime();
        return tb - ta;
    }).filter(c => {
        const itemTime = new Date(c.date + 'T' + c.time).getTime();
        return itemTime >= cutoff;
    });

    if (sorted.length === 0) {
        els.myHistoryList.innerHTML = '<div class="history-item"><div class="history-quote" style="color:#999;">7天内的打卡记录会在这里显示</div></div>';
        return;
    }

    for (const c of sorted) {
        const div = document.createElement('div');
        div.className = 'history-item';

        // 找到匹配的感想
        const thought = thoughts.find(t =>
            t.date === c.date && t.time === c.time && t.quote === c.quote
        );

        // 类型标签
        let typeLabels = '';
        if (c.isCustom) typeLabels += '<span class="my-type-badge custom">自定义</span> ';
        if (c.hasVoice) typeLabels += '<span class="my-type-badge voice">朗读</span> ';
        if (c.hasText) typeLabels += '<span class="my-type-badge text">文字</span> ';
        if (c.hasImage) typeLabels += '<span class="my-type-badge image">图片</span> ';

        let html = `
            <div class="history-header">
                <div class="history-date">${c.date} ${c.time}</div>
                <div>${typeLabels}</div>
            </div>
            <div class="history-quote">${escapeHtml(c.quote)}</div>
        `;

        // 音频
        if (c.recordingId) {
            html += `<audio class="history-audio" id="myAudio_${c.recordingId}" controls preload="none"></audio>`;
        }

        // 感想文字
        if (thought) {
            html += `<div class="history-thought">${escapeHtml(thought.text)}</div>`;
        }

        // 图片
        if (c.imageId) {
            html += `<div class="my-history-image" id="myImage_${c.imageId}"></div>`;
        }

        // 删除按钮
        html += `<div style="text-align:right;margin-top:4px;"><button class="btn-delete" data-recordingid="${c.recordingId || ''}" data-date="${c.date}" data-time="${c.time}" data-quote="${escapeHtml(c.quote)}" data-imageid="${c.imageId || ''}">删除</button></div>`;

        div.innerHTML = html;
        els.myHistoryList.appendChild(div);

        // 加载音频
        if (c.recordingId) {
            const rec = await getRecording(c.recordingId).catch(() => null);
            if (rec && rec.blob) {
                document.getElementById(`myAudio_${c.recordingId}`).src = URL.createObjectURL(rec.blob);
            }
        }

        // 加载图片
        if (c.imageId) {
            const imgRec = await getImage(c.imageId).catch(() => null);
            if (imgRec && imgRec.blob) {
                const img = document.createElement('img');
                img.className = 'my-history-img';
                img.src = URL.createObjectURL(imgRec.blob);
                document.getElementById(`myImage_${c.imageId}`).appendChild(img);
            }
        }
    }
}

// 删除打卡记录事件（只绑定一次，用 document 代理）
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;
    if (!btn.closest('#myHistoryList')) return;
    const recordingId = btn.dataset.recordingid;
    const date = btn.dataset.date;
    const time = btn.dataset.time;
    const quote = btn.dataset.quote;
    if (!confirm('确定删除这条记录吗？')) return;

    // 按 date+time+quote 匹配删除（比 recordingId 更可靠）
    let allCheckins = getData(STORAGE_KEYS.CHECKINS, []);
    allCheckins = allCheckins.filter(c => !(c.date === date && c.time === time && c.quote === quote));
    setData(STORAGE_KEYS.CHECKINS, allCheckins);

    if (quote) {
        let allThoughts = getData(STORAGE_KEYS.THOUGHTS, []);
        allThoughts = allThoughts.filter(t => !(t.date === date && t.time === time && t.quote === quote));
        setData(STORAGE_KEYS.THOUGHTS, allThoughts);
    }

    if (recordingId) {
        await deleteRecording(recordingId).catch(() => {});
    }

    const imageId = btn.dataset.imageid;
    if (imageId) {
        await deleteImage(imageId).catch(() => {});
    }

    renderRecordPage();
});


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
        els.adminTabWeekly.classList.toggle('active', target === 'weekly');
        if (target === 'garden') renderAdminGarden();
        if (target === 'weekly') renderAdminWeekly();
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

// 批量导入
document.getElementById('batchImportBtn').addEventListener('click', async () => {
    const text = document.getElementById('batchImportInput').value.trim();
    if (!text) { alert('请先粘贴要导入的语句'); return; }
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) { alert('没有有效的语句'); return; }
    const batchSize = 50;
    let success = 0;
    for (let i = 0; i < lines.length; i += batchSize) {
        const batch = lines.slice(i, i + batchSize).map(text => ({ text }));
        const { error } = await sb.from('quotes').insert(batch);
        if (error) { alert('导入失败：' + error.message); return; }
        success += batch.length;
    }
    document.getElementById('batchImportInput').value = '';
    await loadQuotes();
    renderAdminQuotes();
    alert(`✅ 成功导入 ${success} 条语句`);
});

// 导出语句
document.getElementById('exportQuotesBtn').addEventListener('click', () => {
    // 生成 CSV 格式，包含所有统计数据
    const BOM = '﻿'; // UTF-8 BOM for Excel
    const header = '语句内容,抽中次数,喜欢次数,不爱次数,打卡次数,状态,来源';
    const rows = quotes.map((q, i) => {
        const id = quoteIdMap[i];
        const stat = cloudQuoteStats[id] || {};
        const status = stat.status === 'banned' ? '冷宫' : (stat.source === 'user' ? '投稿' : '正常');
        const source = stat.source === 'user' ? '用户投稿' : (stat.source === 'promoted' ? '已转正' : '管理员');
        const draws = stat.draws || 0;
        const likes = stat.likes || 0;
        const dislikes = stat.dislikes || 0;
        const checkins = stat.checkins || 0;
        // 转义引号
        const text = q.replace(/"/g, '""');
        return `"${text}",${draws},${likes},${dislikes},${checkins},${status},${source}`;
    }).join('\n');
    const csv = BOM + header + '\n' + rows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `能量咒语库_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// 导出纯文本（仅语句内容）
document.getElementById('exportTextBtn').addEventListener('click', () => {
    const text = quotes.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `能量咒语_文本_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

        const hasAudio = !!item.audio_url;
        const hasText = !!item.content;
        const hasImage = !!item.image_url;
        let typeText, typeClass;
        if (hasImage && (hasAudio || hasText)) {
            typeText = '融合'; typeClass = 'voice';
        } else if (hasImage) {
            typeText = '图片'; typeClass = 'voice';
        } else if (hasAudio && hasText) {
            typeText = '融合'; typeClass = 'voice';
        } else if (hasAudio) {
            typeText = '录音'; typeClass = 'voice';
        } else {
            typeText = '文字'; typeClass = 'text';
        }
        const typeHtml = `<span class="admin-garden-type ${typeClass}">${typeText}</span>`;

        const dt = new Date(item.created_at);
        const timeStr = `${dt.getMonth()+1}月${dt.getDate()}日 ${dt.toTimeString().slice(0, 5)}`;

        div.innerHTML = `
            ${typeHtml}
            <span class="admin-garden-quote">${escapeHtml(item.quote_text)}</span>
            <span class="admin-garden-time">${timeStr}</span>
            <button class="admin-garden-delete" data-id="${item.id}" data-type="${item.type}" data-audiourl="${item.audio_url || ''}" data-imageurl="${item.image_url || ''}">删除</button>
        `;

        // 绑定删除事件
        const deleteBtn = div.querySelector('.admin-garden-delete');
        deleteBtn.addEventListener('click', async () => {
            if (!confirm('确定删除这条能量花园记录吗？')) return;
            const id = deleteBtn.dataset.id;
            const audioUrl = deleteBtn.dataset.audiourl;
            const imageUrl = deleteBtn.dataset.imageurl;

            // 从 DB 删除记录
            const { error } = await sb.from('garden_items').delete().eq('id', id);
            if (error) {
                alert('删除失败：' + error.message);
                return;
            }

            // 从 Storage 删除文件
            if (audioUrl) {
                const pathMatch = audioUrl.match(/\/audio\/(.+)/);
                if (pathMatch) await sb.storage.from('audio').remove([pathMatch[1]]);
            }
            if (imageUrl) {
                const imgMatch = imageUrl.match(/\/images\/(.+)/);
                if (imgMatch) await sb.storage.from('images').remove([imgMatch[1]]);
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
    localStorage.removeItem('lm_draws');

    // 清除 IndexedDB
    const allRecs = await getAllRecordings().catch(() => []);
    for (const rec of allRecs) {
        await deleteRecording(rec.id).catch(() => {});
    }
    const allImgs = await getAllImages().catch(() => []);
    for (const img of allImgs) {
        await deleteImage(img.id).catch(() => {});
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
// ===== 清理过期数据（7天）=====
async function cleanupOldData() {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

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
            if (c.imageId) {
                await deleteImage(c.imageId).catch(() => {});
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

// ===== 云端过期数据物理清理（72小时）=====
async function cleanupCloudData() {
    const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    try {
        // 查出要删除的旧花园记录 ID
        const { data: oldItems } = await sb
            .from('garden_items')
            .select('id, audio_url, image_url')
            .lt('created_at', cutoff);
        if (!oldItems || oldItems.length === 0) return;

        const oldIds = oldItems.map(i => i.id);

        // 查出这些花园记录下的评论音频
        const { data: oldComments } = await sb
            .from('garden_comments')
            .select('audio_url')
            .in('garden_item_id', oldIds)
            .not('audio_url', 'is', null);

        // 收集所有要删除的音频文件路径
        const allPaths = [];
        oldItems.forEach(i => {
            const m = i.audio_url?.match(/\/audio\/(.+)/);
            if (m) allPaths.push(m[1]);
            const img = i.image_url?.match(/\/images\/(.+)/);
            if (img) allPaths.push(img[1]);
        });
        (oldComments || []).forEach(c => {
            const m = c.audio_url?.match(/\/audio\/(.+)/);
            if (m) allPaths.push(m[1]);
        });

        if (allPaths.length > 0) {
            await sb.storage.from('audio').remove(allPaths);
        }

        // 删除旧记录（评论因 ON DELETE CASCADE 自动清除）
        await sb.from('garden_items').delete().in('id', oldIds);
    } catch (err) {
        console.warn('清理云端过期数据失败', err);
    }
}

// ===== 周主题功能 =====

// 生成随机匿名名称
function generateWeeklyName() {
    const prefixes = ['能量', '光之', '星辰', '清风', '暖阳', '月光', '彩虹', '晨露'];
    const suffixes = ['旅人', '使者', '精灵', '守护', '行者', '漫步', '探索'];
    return prefixes[Math.floor(Math.random() * prefixes.length)] +
           suffixes[Math.floor(Math.random() * suffixes.length)] +
           '#' + Math.floor(1000 + Math.random() * 9000);
}

// 获取本周一日期
function getWeekStart(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
}

// 计算当前应该显示的主题
function getCurrentThemeIndex(themes) {
    const activeThemes = themes.filter(t => t.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
    if (activeThemes.length === 0) return -1;
    const weekStart = getWeekStart();
    const refDate = new Date('2025-01-06T00:00:00'); // 2025年第一个周一作为基准
    const weekDiff = Math.floor((weekStart - refDate) / (7 * 24 * 60 * 60 * 1000));
    return weekDiff % activeThemes.length;
}

// 加载周主题
async function loadWeeklyThemes() {
    const { data, error } = await sb
        .from('weekly_themes')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) {
        console.warn('加载周主题失败', error);
        return [];
    }
    weeklyThemes = data || [];
    return weeklyThemes;
}

// 初始化周主题页面
async function initWeeklyPage() {
    if (weeklyThemes.length === 0) {
        await loadWeeklyThemes();
    }
    if (weeklyThemes.length === 0) {
        els.weeklyThemeTitle.textContent = '暂无主题';
        els.weeklyThemeDesc.textContent = '';
        els.weeklyList.innerHTML = '<div class="empty-garden">还没有周主题</div>';
        return;
    }

    const idx = getCurrentThemeIndex(weeklyThemes);
    const activeThemes = weeklyThemes.filter(t => t.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
    const theme = activeThemes[idx];
    if (!theme) return;
    currentThemeId = theme.id;

    els.weeklyThemeTitle.textContent = theme.title;
    els.weeklyThemeDesc.textContent = theme.description;
    els.weeklyTextInput.placeholder = theme.placeholder || '';
    els.weeklySubtitle.textContent = theme.title;

    // 恢复匿名名称
    let savedName = getData(STORAGE_KEYS.WEEKLY_NAME, '');
    if (!savedName) {
        savedName = generateWeeklyName();
        setData(STORAGE_KEYS.WEEKLY_NAME, savedName);
    }
    els.weeklyNameInput.value = savedName;

    // 重置输入
    els.weeklyTextInput.value = '';
    els.weeklyCharCount.textContent = '0';
    els.weeklyRecordCheck.checked = true;
    els.weeklyRecordArea.style.display = 'block';
    els.weeklyRecordResult.style.display = 'none';
    weeklyRecordingBlob = null;

    // 加载公开分享区
    await renderWeeklyList();
}

// 渲染公开分享区
async function renderWeeklyList() {
    els.weeklyList.innerHTML = '<div class="empty-garden">加载中…</div>';
    if (!currentThemeId) return;

    const { data, error } = await sb
        .from('weekly_submissions')
        .select('id, author_name, content, created_at')
        .eq('theme_id', currentThemeId)
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        console.warn('加载周主题分享失败', error);
        els.weeklyList.innerHTML = '<div class="empty-garden">加载失败</div>';
        return;
    }

    if (!data || data.length === 0) {
        els.weeklyList.innerHTML = '<div class="empty-garden">还没有人分享，来做第一个吧！</div>';
        return;
    }

    // 加载点赞
    const ids = data.map(d => d.id);
    const likesMap = await fetchWeeklyLikes(ids);

    els.weeklyList.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'weekly-item';
        const dt = new Date(item.created_at);
        const timeStr = `${dt.getMonth()+1}月${dt.getDate()}日 ${dt.toTimeString().slice(0, 5)}`;
        const likeInfo = likesMap[item.id] || { count: 0, liked: false };
        div.innerHTML = `
            <div class="weekly-item-name">${escapeHtml(item.author_name)}</div>
            <div class="weekly-item-content">${escapeHtml(item.content)}</div>
            <div class="weekly-item-footer">
                <span class="weekly-item-time" style="font-size:0.8rem;color:rgba(255,255,255,0.5);margin-right:auto;">${timeStr}</span>
                <button class="weekly-like-btn" data-id="${item.id}">${likeInfo.liked ? '💗' : '🤍'}${likeInfo.count > 0 ? ' ' + likeInfo.count : ''}</button>
            </div>
        `;
        els.weeklyList.appendChild(div);
    });

    // 绑定点赞
    els.weeklyList.querySelectorAll('.weekly-like-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = parseInt(btn.dataset.id);
            const liked = btn.textContent.includes('💗');
            await toggleWeeklyLike(id, liked);
            await renderWeeklyList();
        });
    });
}

// 周主题点赞
async function fetchWeeklyLikes(submissionIds) {
    if (!submissionIds.length) return {};
    const { data, error } = await sb
        .from('weekly_likes')
        .select('submission_id, device_id')
        .in('submission_id', submissionIds);
    if (error) return {};
    const deviceId = getDeviceId();
    const result = {};
    (data || []).forEach(l => {
        if (!result[l.submission_id]) result[l.submission_id] = { count: 0, liked: false };
        result[l.submission_id].count++;
        if (l.device_id === deviceId) result[l.submission_id].liked = true;
    });
    submissionIds.forEach(id => { if (!result[id]) result[id] = { count: 0, liked: false }; });
    return result;
}

async function toggleWeeklyLike(submissionId, currentlyLiked) {
    const deviceId = getDeviceId();
    if (currentlyLiked) {
        await sb.from('weekly_likes').delete().eq('submission_id', submissionId).eq('device_id', deviceId);
    } else {
        await sb.from('weekly_likes').insert({ submission_id: submissionId, device_id: deviceId });
    }
}

// 周主题录音
els.weeklyRecordCheck.addEventListener('change', () => {
    els.weeklyRecordArea.style.display = els.weeklyRecordCheck.checked ? 'block' : 'none';
    if (!els.weeklyRecordCheck.checked) {
        weeklyRecordingBlob = null;
        els.weeklyRecordResult.style.display = 'none';
    }
});

els.weeklyRecordBtn.addEventListener('click', async () => {
    if (weeklyMediaRecorder && weeklyMediaRecorder.state === 'recording') {
        weeklyMediaRecorder.stop();
        return;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        weeklyRecordedChunks = [];
        weeklyMediaRecorder = new MediaRecorder(stream);
        weeklyMediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) weeklyRecordedChunks.push(e.data);
        };
        weeklyMediaRecorder.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            weeklyRecordingBlob = new Blob(weeklyRecordedChunks, { type: 'audio/webm' });
            els.weeklyRecordPlayer.src = URL.createObjectURL(weeklyRecordingBlob);
            els.weeklyRecordResult.style.display = 'block';
            els.weeklyRecordBtn.querySelector('.record-label').textContent = '重新朗读';
            clearInterval(weeklyRecordingTimer);
        };
        weeklyMediaRecorder.start();
        els.weeklyRecordBtn.querySelector('.record-label').textContent = '停止';
        els.weeklyRecordResult.style.display = 'none';

        weeklyRecordingStartTime = Date.now();
        const maxSec = 30;
        weeklyRecordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - weeklyRecordingStartTime) / 1000);
            if (elapsed >= maxSec) {
                if (weeklyMediaRecorder.state === 'recording') weeklyMediaRecorder.stop();
                return;
            }
            const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
            const ss = String(elapsed % 60).padStart(2, '0');
            els.weeklyRecordTimer.textContent = `${mm}:${ss} / 00:30`;
        }, 200);
    } catch (err) {
        alert('无法访问麦克风：' + err.message);
    }
});

els.weeklyReRecordBtn.addEventListener('click', () => {
    weeklyRecordingBlob = null;
    els.weeklyRecordResult.style.display = 'none';
    els.weeklyRecordBtn.querySelector('.record-label').textContent = '点击朗读';
});

// 文字计数
els.weeklyTextInput.addEventListener('input', () => {
    els.weeklyCharCount.textContent = els.weeklyTextInput.value.length;
});

// 匿名名称保存
els.weeklyNameInput.addEventListener('blur', () => {
    setData(STORAGE_KEYS.WEEKLY_NAME, els.weeklyNameInput.value.trim() || generateWeeklyName());
});

// 提交周主题
els.weeklySubmitBtn.addEventListener('click', async () => {
    const content = els.weeklyTextInput.value.trim();
    if (!content) {
        alert('请写下你想说的话');
        return;
    }
    if (!currentThemeId) {
        alert('当前没有主题');
        return;
    }

    let authorName = els.weeklyNameInput.value.trim();
    if (!authorName) {
        authorName = generateWeeklyName();
        els.weeklyNameInput.value = authorName;
    }
    setData(STORAGE_KEYS.WEEKLY_NAME, authorName);

    const isPublic = els.weeklyPublicCheck.checked;

    els.weeklySubmitBtn.disabled = true;
    els.weeklySubmitBtn.textContent = '提交中…';

    try {
        let audioUrl = null;
        let audioId = null;

        // 如果有录音，上传
        if (els.weeklyRecordCheck.checked && weeklyRecordingBlob) {
            audioId = 'weekly_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
            audioUrl = await uploadAudioToCloud(weeklyRecordingBlob, audioId);
            // 保存到 IndexedDB
            await saveRecording(audioId, weeklyRecordingBlob, new Date().toISOString());
        }

        // 如果公开，提交到云端
        if (isPublic) {
            const { error } = await sb.from('weekly_submissions').insert({
                theme_id: currentThemeId,
                device_id: getDeviceId(),
                author_name: authorName,
                content: content,
                audio_url: null  // 公开区不保存语音
            });
            if (error) console.warn('提交周主题到公开区失败', error);
        }

        // 保存到本地"我的"
        const records = getData(STORAGE_KEYS.WEEKLY_RECORDS, []);
        const theme = weeklyThemes.find(t => t.id === currentThemeId);
        records.unshift({
            themeTitle: theme ? theme.title : '',
            content: content,
            audioId: audioId,
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toTimeString().slice(0, 8)
        });
        // 最多保留15条
        if (records.length > 15) {
            // 删除被移除记录的录音
            const removed = records.slice(15);
            for (const r of removed) {
                if (r.audioId) await deleteRecording(r.audioId).catch(() => {});
            }
            records.splice(15);
        }
        setData(STORAGE_KEYS.WEEKLY_RECORDS, records);

        // 重置输入
        els.weeklyTextInput.value = '';
        els.weeklyCharCount.textContent = '0';
        els.weeklyRecordCheck.checked = true;
        els.weeklyRecordArea.style.display = 'block';
        els.weeklyRecordResult.style.display = 'none';
        weeklyRecordingBlob = null;

        // 刷新公开区
        if (isPublic) await renderWeeklyList();

        alert('提交成功！');
    } catch (err) {
        console.error('提交周主题失败', err);
        alert('提交失败，请重试');
    } finally {
        els.weeklySubmitBtn.disabled = false;
        els.weeklySubmitBtn.textContent = '提交';
    }
});

// 渲染"我的"周主题记录
async function renderMyWeeklyHistory() {
    const records = getData(STORAGE_KEYS.WEEKLY_RECORDS, []);
    els.myWeeklyList.innerHTML = '';

    if (records.length === 0) {
        els.myWeeklyList.innerHTML = '<div class="history-item"><div class="history-quote" style="color:#999;">周主题记录会在这里显示</div></div>';
        return;
    }

    for (const r of records) {
        const div = document.createElement('div');
        div.className = 'weekly-history-item';

        let audioHtml = '';
        if (r.audioId) {
            const rec = await getRecording(r.audioId).catch(() => null);
            if (rec) {
                const url = URL.createObjectURL(rec.blob);
                audioHtml = `<audio class="record-player" controls preload="none" src="${url}" style="margin-top:8px;width:100%;"></audio>`;
            }
        }

        div.innerHTML = `
            <div class="weekly-history-header">
                <span class="weekly-history-theme">${escapeHtml(r.themeTitle)}</span>
                <span class="weekly-history-time">${r.date} ${r.time.slice(0, 5)}</span>
            </div>
            <div class="weekly-history-content">${escapeHtml(r.content)}</div>
            ${audioHtml}
        `;
        els.myWeeklyList.appendChild(div);
    }
}

// ===== 周主题管理 =====

// 渲染周主题管理
async function renderAdminWeekly() {
    await loadWeeklyThemes();
    els.adminWeeklyCount.textContent = `${weeklyThemes.length} 条`;
    els.adminWeeklyList.innerHTML = '';

    const activeThemes = weeklyThemes.filter(t => t.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
    const currentIdx = getCurrentThemeIndex(weeklyThemes);
    const currentTheme = activeThemes[currentIdx];

    weeklyThemes.sort((a, b) => a.sort_order - b.sort_order).forEach(theme => {
        const isCurrent = currentTheme && theme.id === currentTheme.id;
        const div = document.createElement('div');
        div.className = 'admin-weekly-row' + (isCurrent ? ' current' : '');
        div.innerHTML = `
            <div class="admin-weekly-info">
                <div class="admin-weekly-row-title">
                    ${escapeHtml(theme.title)}
                    ${isCurrent ? '<span class="admin-weekly-badge">本周</span>' : ''}
                </div>
                <div class="admin-weekly-row-desc">${escapeHtml(theme.description)}</div>
                <div class="admin-weekly-row-meta">
                    排序: <input class="admin-weekly-order-input" data-id="${theme.id}" value="${theme.sort_order}">
                    | 状态: ${theme.status === 'active' ? '启用' : '停用'}
                </div>
            </div>
            <div class="admin-weekly-actions">
                <button class="btn-small" data-action="edit" data-id="${theme.id}">编辑</button>
                <button class="btn-small" data-action="toggle" data-id="${theme.id}">${theme.status === 'active' ? '停用' : '启用'}</button>
                <button class="btn-small btn-delete-quote" data-action="delete" data-id="${theme.id}">删除</button>
            </div>
        `;
        els.adminWeeklyList.appendChild(div);
    });

    // 绑定操作
    els.adminWeeklyList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            if (action === 'edit') await editWeeklyTheme(id);
            if (action === 'toggle') await toggleWeeklyThemeStatus(id);
            if (action === 'delete') await deleteWeeklyTheme(id);
        });
    });

    // 绑定排序输入
    els.adminWeeklyList.querySelectorAll('.admin-weekly-order-input').forEach(input => {
        input.addEventListener('change', async () => {
            const id = parseInt(input.dataset.id);
            const order = parseInt(input.value) || 0;
            await sb.from('weekly_themes').update({ sort_order: order }).eq('id', id);
            renderAdminWeekly();
        });
    });

    // 填充主题选择下拉框
    els.adminWeeklyThemeSelect.innerHTML = '<option value="">选择主题…</option>';
    weeklyThemes.sort((a, b) => a.sort_order - b.sort_order).forEach(theme => {
        const opt = document.createElement('option');
        opt.value = theme.id;
        opt.textContent = theme.title + (currentTheme && theme.id === currentTheme.id ? '（本周）' : '');
        els.adminWeeklyThemeSelect.appendChild(opt);
    });
}

// 加载某个主题的提交记录
els.adminWeeklyThemeSelect.addEventListener('change', async () => {
    const themeId = parseInt(els.adminWeeklyThemeSelect.value);
    if (!themeId) {
        els.adminWeeklySubmissions.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">选择主题查看提交</div>';
        return;
    }
    els.adminWeeklySubmissions.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">加载中…</div>';

    const { data, error } = await sb
        .from('weekly_submissions')
        .select('id, author_name, content, created_at')
        .eq('theme_id', themeId)
        .order('created_at', { ascending: false });

    if (error) {
        els.adminWeeklySubmissions.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">加载失败</div>';
        return;
    }

    if (!data || data.length === 0) {
        els.adminWeeklySubmissions.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">暂无提交记录</div>';
        return;
    }

    els.adminWeeklySubmissions.innerHTML = '';
    data.forEach(item => {
        const dt = new Date(item.created_at);
        const timeStr = `${dt.getMonth()+1}月${dt.getDate()}日 ${dt.toTimeString().slice(0, 5)}`;
        const div = document.createElement('div');
        div.className = 'admin-garden-item';
        div.innerHTML = `
            <div style="font-weight:600;color:#333;margin-bottom:4px;">${escapeHtml(item.author_name)}</div>
            <div style="color:#555;line-height:1.6;margin-bottom:4px;">${escapeHtml(item.content)}</div>
            <div style="font-size:0.8rem;color:#999;">${timeStr}</div>
        `;
        els.adminWeeklySubmissions.appendChild(div);
    });
});

// 新增主题
els.addWeeklyThemeBtn.addEventListener('click', async () => {
    const title = els.weeklyThemeTitleInput.value.trim();
    const description = els.weeklyThemeDescInput.value.trim();
    const placeholder = els.weeklyThemePlaceholderInput.value.trim();
    if (!title) {
        alert('请输入主题标题');
        return;
    }
    const maxOrder = weeklyThemes.reduce((max, t) => Math.max(max, t.sort_order), 0);
    const { error } = await sb.from('weekly_themes').insert({
        title, description, placeholder,
        sort_order: maxOrder + 1
    });
    if (error) {
        alert('新增失败：' + error.message);
        return;
    }
    els.weeklyThemeTitleInput.value = '';
    els.weeklyThemeDescInput.value = '';
    els.weeklyThemePlaceholderInput.value = '';
    renderAdminWeekly();
});

let editingThemeId = null;

async function editWeeklyTheme(id) {
    const theme = weeklyThemes.find(t => t.id === id);
    if (!theme) return;
    editingThemeId = id;
    els.editWeeklyTitle.value = theme.title;
    els.editWeeklyDesc.value = theme.description;
    els.editWeeklyPlaceholder.value = theme.placeholder;
    els.weeklyEditModal.style.display = 'flex';
}

els.saveWeeklyEditBtn.addEventListener('click', async () => {
    if (!editingThemeId) return;
    const title = els.editWeeklyTitle.value.trim();
    if (!title) {
        alert('请输入主题标题');
        return;
    }
    const { error } = await sb.from('weekly_themes').update({
        title: title,
        description: els.editWeeklyDesc.value.trim(),
        placeholder: els.editWeeklyPlaceholder.value.trim()
    }).eq('id', editingThemeId);
    if (error) {
        alert('修改失败：' + error.message);
        return;
    }
    els.weeklyEditModal.style.display = 'none';
    editingThemeId = null;
    renderAdminWeekly();
});

els.cancelWeeklyEditBtn.addEventListener('click', () => {
    els.weeklyEditModal.style.display = 'none';
    editingThemeId = null;
});

els.weeklyEditOverlay.addEventListener('click', () => {
    els.weeklyEditModal.style.display = 'none';
    editingThemeId = null;
});

async function toggleWeeklyThemeStatus(id) {
    const theme = weeklyThemes.find(t => t.id === id);
    if (!theme) return;
    const newStatus = theme.status === 'active' ? 'inactive' : 'active';
    await sb.from('weekly_themes').update({ status: newStatus }).eq('id', id);
    renderAdminWeekly();
}

async function deleteWeeklyTheme(id) {
    if (!confirm('确定删除这个主题吗？')) return;
    await sb.from('weekly_themes').delete().eq('id', id);
    renderAdminWeekly();
}

// 清理过期公开区数据（主题切换时清除上周提交）
async function cleanupWeeklySubmissions() {
    try {
        const weekStart = getWeekStart();
        const { error } = await sb.from('weekly_submissions')
            .delete()
            .lt('created_at', weekStart.toISOString());
        if (error) console.warn('清理周主题公开区失败', error);

        // 同时清理孤儿点赞
        await sb.from('weekly_likes')
            .delete()
            .lt('created_at', weekStart.toISOString());
    } catch (err) {
        console.warn('清理周主题数据失败', err);
    }
}

async function init() {
    await initSupabase();
    await initDB();
    await loadQuotes(); // 从云端拉语句库
    await loadWeeklyThemes(); // 加载周主题
    await cleanupOldData(); // 启动时清理过期本地数据
    await cleanupCloudData(); // 清理云端过期花园记录
    await cleanupWeeklySubmissions(); // 清理过期周主题公开区

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
        // 确保打卡选项可见
        const co = els.checkinSection.querySelector('.checkin-options');
        if (co) co.style.display = 'flex';

        // 显示喜欢/不爱按钮
        els.leftAction.style.visibility = 'visible';
        els.leftAction.style.opacity = '1';
        els.rightAction.style.visibility = 'visible';
        els.rightAction.style.opacity = '1';
        updateQuoteActionButtons();
    }

    // 初始化日历
    renderCalendar();

    // 显示今日人数
    await updateTodayCount();
}

init().catch(console.error);