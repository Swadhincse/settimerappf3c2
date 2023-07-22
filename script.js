const timers = [];

function updateTimerDisplay(timer) {
  const timerDisplay = timer.container.querySelector('span');
  const { hours, minutes, seconds } = timer.time;

  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(timer) {
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
  }

  timer.intervalId = setInterval(() => {
    if (timer.time.totalSeconds <= 0) {
      clearInterval(timer.intervalId);
      timer.container.classList.add('ended');
      timer.container.querySelector('.time-up').style.display = 'inline';
      const audio = new Audio('alert.mp3');
      audio.play();
    } else {
      timer.time.totalSeconds--;
      const { hours, minutes, seconds } = timer.time;
      updateTimerDisplay(timer);
    }
  }, 1000);
}

function stopTimer(timer) {
  clearInterval(timer.intervalId);
  timer.container.classList.remove('ended');
  timer.container.querySelector('.time-up').style.display = 'none';
  timer.time = { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  updateTimerDisplay(timer);
}

function createTimer() {
  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer');

  const hoursInput = document.createElement('input');
  hoursInput.type = 'number';
  hoursInput.min = '0';
  hoursInput.value = '0';

  const minutesInput = document.createElement('input');
  minutesInput.type = 'number';
  minutesInput.min = '0';
  minutesInput.max = '59';
  minutesInput.value = '0';

  const secondsInput = document.createElement('input');
  secondsInput.type = 'number';
  secondsInput.min = '0';
  secondsInput.max = '59';
  secondsInput.value = '0';

  const startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
      const timer = {
        container: timerContainer,
        time: { hours, minutes, seconds, totalSeconds },
        intervalId: null
      };
      timers.push(timer);
      startTimer(timer);
    }
  });

  const stopButton = document.createElement('button');
  stopButton.textContent = 'Stop';
  stopButton.addEventListener('click', () => {
    const index = timers.indexOf(timer);
    if (index !== -1) {
      timers.splice(index, 1);
      stopTimer(timer);
    }
  });

  const timerDisplay = document.createElement('span');
  timerDisplay.textContent = '00:00:00';

  const timeUpMsg = document.createElement('span');
  timeUpMsg.textContent = 'Time\'s Up!';
  timeUpMsg.classList.add('time-up');

  timerContainer.appendChild(hoursInput);
  timerContainer.appendChild(document.createTextNode(':'));
  timerContainer.appendChild(minutesInput);
  timerContainer.appendChild(document.createTextNode(':'));
  timerContainer.appendChild(secondsInput);
  timerContainer.appendChild(startButton);
  timerContainer.appendChild(stopButton);
  timerContainer.appendChild(timerDisplay);
  timerContainer.appendChild(timeUpMsg);

  document.querySelector('.container').appendChild(timerContainer);
}

document.getElementById('add-timer').addEventListener('click', createTimer);
