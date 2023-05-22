// Получение элементов player
const player = {
  main: document.getElementById('player'),
  progressBar: document.querySelector('#player > .progress'),
  progressBarFill: document.querySelector('#player > .progress > .progress-bar'),
  activeSong: document.querySelector('#player > .active-song'),
  playMusicButton: document.querySelector('#player > .player-menu > .play-music'),
  playMusicButtonIco: document.querySelector('#player > .player-menu > .play-music > .fa'),
  audioPlayer: document.querySelector('#player > .audio-player'),
  volumeSong: document.querySelector('#player > .setting-song > .dropup > .dropdown-menu > .volume-setting > .range-volume'),
  playMusic: document.querySelector('#player > .player-menu > .play-music'),
  nextTrack: document.querySelector('#player > .player-menu > .next-track'),
  lastTrack: document.querySelector('#player > .player-menu > .last-track'),
  loopTrack: document.querySelector('#player > .player-menu > .loop-track'),
  repeatTrack: document.querySelector('#player > .player-menu > .repeat-track'),
  rowsArray: Array.from(chart.rows),
}

/**
 * Заполнение progressBar новым значением
 * @param {any} event - событие клика
 */
const clickOnProgressMusicEventHandler = (event) => {
  // Получение ширины полоски прогресса
  const progressBarWidth = player.progressBar.offsetWidth;

  // Получение позиции клика относительно полоски прогресса
  const clickPosition = event.pageX - player.progressBar.getBoundingClientRect().left;

  // Вычисление новой ширины полоски
  const fillWidthPercent = (clickPosition / progressBarWidth) * 100;

  // Заполнение новой ширины полоски
  player.progressBarFill.style.width = fillWidthPercent + '%';
  switchingTrackProgress(fillWidthPercent);
};

/**
 * Обработчик клика на паузу
 * @param {any} event - событие клика
 */
const clickOnPlayMusicEventHandler = (event) => {
  const isPause = player.playMusicButtonIco.classList.contains('fa-pause');

  if (isPause) {
    player.playMusicButtonIco.classList.remove('fa-pause');
    player.playMusicButtonIco.classList.add('fa-play');
    player.audioPlayer.pause();
  } else {
    player.playMusicButtonIco.classList.remove('fa-play');
    player.playMusicButtonIco.classList.add('fa-pause');
    player.audioPlayer.play();
  }
};


/**
 * Обработчик клика на изменение звука
 * @param {any} event - событие клика
 */
const clickSongVolumeEventHandler = (event) => {
  player.audioPlayer.volume = parseFloat(player.volumeSong.value) / 10;
};

/**
 * Обработчик клика на кнопку следующей песни
 * @param {any} event - событие клика
 */
const clickNextTrackEventHandler = (event) => {
  for (let i = 0; i < player.rowsArray.length; i++) {
    if (player.rowsArray[i].classList.contains('active')) {
      let nextElement = player.rowsArray[i + 1];

      if (!nextElement) {
        nextElement = player.rowsArray[0];
      }

      if (player.repeatTrack.classList.contains('active')) {
        const randomTrack = Math.floor(Math.random() * (player.rowsArray.length - 0) + 0);
        if(i === randomTrack) {
          randomTrack++;
        }
        nextElement = player.rowsArray[randomTrack];
      }

      if (nextElement) {
        switchingTrack(nextElement, player.rowsArray[i]);
      }

      break;
    }
  }
};

/**
 * Обработчик клика на кнопку предыдущей песни
 * @param {any} event - событие клика
 */
const clickLastTrackEventHandler = (event) => {
  for (let i = 0; i < player.rowsArray.length; i++) {
    if (player.rowsArray[i].classList.contains('active')) {
      let lastElement = player.rowsArray[i - 1];

      if (!lastElement) {
        lastElement = player.rowsArray[0];
      }

      if (lastElement) {
        switchingTrack(lastElement, player.rowsArray[i]);
      }

      if (player.rowsArray[i] === player.rowsArray[0]) {
        lastElement.classList.add('active');
      }

      break;
    }
  }
};

/**
 * Обработчик клика на кнопку повтор песни
 * @param {any} event - событие клика
 */
const clickLoopTrackEventHandler = (event) => {
  if (!event.currentTarget.classList.contains('active')) {
    player.loopTrack.classList.add('active');
    player.audioPlayer.loop = true;
    return;
  }

  player.loopTrack.classList.remove('active');
  player.audioPlayer.loop = false;
}

/**
 * Обработчик клика на кнопку рандом песня
 * @param {any} event - событие клика
 */
const clickRandomTrackEventHandler = (event) => {
  if (!event.currentTarget.classList.contains('active')) {
    player.repeatTrack.classList.add('active');
    return;
  }

  player.repeatTrack.classList.remove('active');
}

/**
 * Функция на переключение трека вперёд, назад
 * @param newTrack - новый трек
 * @param oldTrack - переключающий трек
 */
const switchingTrack = (newTrack, oldTrack) => {
  newTrack.classList.add('active');
  oldTrack.classList.remove('active');

  player.playMusicButtonIco.classList.add('fa-pause');
  player.playMusicButtonIco.classList.remove('fa-play');

  player.activeSong.querySelector('.track-name').textContent = newTrack.querySelector('.track-name').textContent;
  player.activeSong.querySelector('.track-executor').textContent = newTrack.querySelector('.track-executor').textContent;
  player.activeSong.querySelector('.albom-photo > img').src = newTrack.querySelector('.track-albom > img').getAttribute('src');

  player.audioPlayer.src = `Source/Tracks/${newTrack.querySelector('.track-name').textContent}.mp3`;
  player.audioPlayer.volume = parseFloat(player.volumeSong.value) / 10;
  player.audioPlayer.play();
};

/**
 * Добавление характерестик трека
 */
const addTrackToPlayer = () => {
  const activeTrack = document.querySelector('.chart-list > .chart-track.active');

  // Заполнение плеера
  player.activeSong.querySelector('.track-name').textContent = activeTrack.querySelector('.track-name').textContent;
  player.activeSong.querySelector('.track-executor').textContent = activeTrack.querySelector('.track-executor').textContent;
  player.activeSong.querySelector('.albom-photo > img').src = activeTrack.querySelector('.track-albom > img').getAttribute('src');
};

/**
 * Запуск трека
 */
const songPlayback = (next) => {
  player.audioPlayer.src = `Source/Tracks/${player.activeSong.querySelector('.track-name').textContent}.mp3`;
  player.audioPlayer.volume = parseFloat(player.volumeSong.value) / 10;
  player.audioPlayer.play();
};

/**
 * Переключение трека по полоске
 * @param fillWidthPercent - процент заполнение полоски
 */
const switchingTrackProgress = (fillWidthPercent) => {
  const activeTrack = document.querySelector('.chart-list > .chart-track.active');
  const activeTime = activeTrack.querySelector('.track-time').textContent;

  const [minutes, seconds] = activeTime.split(':');
  const currentTimeSeconds = (fillWidthPercent / 100) * (parseInt(minutes) * 60 + parseInt(seconds));
  player.audioPlayer.currentTime = currentTimeSeconds;
};

/**
 * Обновление полоски в зависимости от трека
 */
const updateTrackProgress = () => {
  const progressPercent = (player.audioPlayer.currentTime / player.audioPlayer.duration) * 100;
  player.progressBarFill.style.width = progressPercent + '%';
};

player.progressBar.addEventListener('click', clickOnProgressMusicEventHandler);
player.playMusicButton.addEventListener('click', clickOnPlayMusicEventHandler);
player.nextTrack.addEventListener('click', clickNextTrackEventHandler);
player.lastTrack.addEventListener('click', clickLastTrackEventHandler);
player.loopTrack.addEventListener('click', clickLoopTrackEventHandler);
player.repeatTrack.addEventListener('click', clickRandomTrackEventHandler);
player.volumeSong.addEventListener('input', clickSongVolumeEventHandler);
player.audioPlayer.addEventListener('timeupdate', updateTrackProgress);