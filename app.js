async function renderMyHistory(checkins, thoughts) {
    els.myHistoryList.innerHTML = '';
    const cutoff = Date.now() - 72 * 60 * 60 * 1000;

    const sorted = [...checkins].sort((a, b) => {
        const ta = new Date(a.date + 'T' + a.time).getTime();
        const tb = new Date(b.date + 'T' + b.time).getTime();
        return tb - ta;
    }).filter(c => {
        const itemTime = new Date(c.date + 'T' + c.time).getTime();
        return itemTime >= cutoff;
    });

    if (sorted.length === 0) {
        els.myHistoryList.innerHTML = '<div class="history-item"><div class="history-quote" style="color:#999;">72小时内的打卡记录会在这里显示</div></div>';
        return;
    }

    for (const c of sorted) {
        const div = document.createElement('div');
        div.className = 'history-item';

        const thought = thoughts.find(t =>
            t.date === c.date && t.time === c.time && t.quote === c.quote
        );

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

        if (c.recordingId) {
            html += `<audio class="history-audio" id="myAudio_${c.recordingId}" controls preload="none"></audio>`;
        }

        if (thought) {
            html += `<div class="history-thought">${escapeHtml(thought.text)}</div>`;
        }

        if (c.imageId) {
            html += `<div class="my-history-image" id="myImage_${c.imageId}"></div>`;
        }

        html += `<div style="text-align:right;margin-top:4px;"><button class="btn-delete" data-recordingid="${c.recordingId || ''}" data-date="${c.date}" data-time="${c.time}" data-quote="${escapeHtml(c.quote)}" data-imageid="${c.imageId || ''}">删除</button></div>`;

        div.innerHTML = html;
        els.myHistoryList.appendChild(div);

        if (c.recordingId) {
            const rec = await getRecording(c.recordingId).catch(() => null);
            if (rec && rec.blob) {
                document.getElementById(`myAudio_${c.recordingId}`).src = URL.createObjectURL(rec.blob);
            }
        }

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

// 删除打卡记录事件（只绑定一次）
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;
    if (!btn.closest('#myHistoryList')) return;
    const recordingId = btn.dataset.recordingid;
    const date = btn.dataset.date;
    const time = btn.dataset.time;
    const quote = btn.dataset.quote;
    if (!confirm('确定删除这条记录吗？')) return;

    let allCheckins = getData(STORAGE_KEYS.CHECKINS, []);
    allCheckins = allCheckins.filter(c => !(c.recordingId === recordingId && c.date === date));
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