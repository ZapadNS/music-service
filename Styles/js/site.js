// Получение элементов чарта
const chart = {
    rows: document.querySelectorAll('.chart-list > .chart-track'),
}

/**
 * Обработчик клика на строчку track
 * @param {any} event - событие клика
 */
const clickOnTrEventHandler = (event) => {
    const isActive = event.currentTarget.classList.contains('active');

    player.main.classList.add('hide');
    clearActiveTr();

    event.currentTarget.classList.add('active');
    player.main.classList.remove('hide');

    if (!isActive) {
        player.playMusicButtonIco.classList.add('fa-pause');
        player.playMusicButtonIco.classList.remove('fa-play');

        player.progressBarFill.style.width = 0 + '%';
        addTrackToPlayer();
        songPlayback();
    } else {
        clickOnPlayMusicEventHandler();
    }
};

/**
 * Очищает активные строки таблицы
 */
const clearActiveTr = () => {
    for (let element of chart.rows) {
        element.classList.remove('active');
    };
};

for (let element of chart.rows) {
    element.addEventListener('click', clickOnTrEventHandler);
};