/**
 * 能量故事 - 视频数据与渲染
 * 只存哔哩哔哩视频编号，视频本体与流量都走对方平台，本站不存储任何视频文件。
 * 新增故事：在 STORIES 数组顶部加一条（bvid 从视频链接 BVxxxx 里取），改 stories.js?v= 版本号即可。
 */

const STORIES = [
    {
        bvid: 'BV1CfKo6DEYv',
        title: '王潮歌：先成为自己，再成为别的',
        summary: '王潮歌，中国最具创造力的导演之一。她身上最动人的是那股不按别人规则活的劲。她说大多数人擅长观察别人，却从没认真研究过自己，而这是被忽视的顶级能力；女性在成为妻子、母亲之前，先得是自己。她把天赋的定义放宽：做饭好吃、情绪稳定、让人愿意亲近，都算天赋，不必换成钱。她不信原生家庭那套归因，只讲“不看来处、只看去处”。'
    },
    {
        bvid: 'BV1Xrxq6FE1b',
        title: '赵家驹：意志力不是天赋，是练出来的',
        summary: '赵家驹是极限越野跑运动员，拿了巨人之旅 330 公里的冠军。他早年做过炸鸡排、送外卖、电子厂工人、保安等无数份底层工作，月薪2000块。前女友因嫌他“给不了安全感”，而离开他。之后7年，他把每份工作都当训练场：送外卖不骑车，全程跑着送；后厨下班后，他绕河道跑10公里。2017年，他拿到第一个越野跑冠军。第二次挑战330公里巨人之旅，他60多个小时没合眼，跑到流鼻血也没放弃，最终夺冠。他说：意志力不是天赋，是普通人摸爬滚打练出来的。'
    }
];

function escapeStoryText(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderStories() {
    const list = document.getElementById('storyList');
    if (!list) return;
    if (list.dataset.rendered === '1') return;

    if (!STORIES.length) {
        list.innerHTML = '<div class="empty-garden">还没有故事，敬请期待</div>';
        return;
    }

    list.innerHTML = STORIES.map(item => `
        <article class="story-card">
            <div class="story-video">
                <iframe src="//player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(item.bvid)}&p=1&autoplay=0"
                        scrolling="no" border="0" frameborder="no" framespacing="0"
                        allowfullscreen="true" loading="lazy"
                        title="${escapeStoryText(item.title)}"></iframe>
            </div>
            <div class="story-body">
                <h3 class="story-title">${escapeStoryText(item.title)}</h3>
                <p class="story-summary">${escapeStoryText(item.summary)}</p>
                <button class="story-more" type="button">展开</button>
                <p class="story-src">哔哩哔哩 · 转载</p>
            </div>
        </article>
    `).join('');

    list.dataset.rendered = '1';

    list.querySelectorAll('.story-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const summary = btn.previousElementSibling;
            const expanded = summary.classList.toggle('expanded');
            btn.textContent = expanded ? '收起' : '展开';
        });
    });

    // 简介不足两行时不需要“展开”按钮（等排版稳定后再量）
    requestAnimationFrame(() => {
        list.querySelectorAll('.story-summary').forEach(p => {
            if (p.scrollHeight <= p.clientHeight + 2) {
                const btn = p.nextElementSibling;
                if (btn && btn.classList.contains('story-more')) btn.style.display = 'none';
            }
        });
    });
}
