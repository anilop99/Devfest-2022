    // time block
    var startingMinutes = document.getElementById('setTime').value;
    var time = startingMinutes * 60;
    var timeLeft = 0;
    var minutes; //global variable
    var seconds;
        // setup
        const data = {
          labels: ['Timer', 'Progress!'],
          datasets: [{
            label: 'Timer',
            data: [0, 12],
            backgroundColor: [
              'rgba(157, 67, 114, 1)',
              'rgba(182, 163, 201, 1)',
            ],
            borderColor: [
              'rgba(0,0,0,0.0)',
            ],
            cutout: '94%'
          }]
        };
   
        // pomodoroTimer block
        const pomodoroTimer = {
          id: 'pomodoroTimer',
          beforeDraw(chart, args, options) {
            const {ctx, chartArea: {width, height}} = chart
            ctx.save();
   
            // check if time is assigned or undefined
            if(minutes === undefined && seconds === undefined){
              minutes = startingMinutes;
              if(startingMinutes < 10){
                minutes = '0' + startingMinutes;
              }
              seconds = '00';
            }
   
            ctx.font = 'bolder 60px Arial';
            ctx.fillStyle = 'rgba(86, 102, 122, 1)';
            ctx.textAlign = 'center';
            ctx.fillText(`${minutes}:${seconds}`, width/2, height/2)
            ctx.restore();
            if(time >= 0){
              ctx.font = 'bolder 30px Courier';
              ctx.fillStyle = 'rgba(86, 102, 122, 1)';
              ctx.textAlign = 'center';
              ctx.fillText('WORK', width/2, height/2 + 60);
            }
            if(time < 0){
              ctx.font = 'bolder 30px Courier';
              ctx.fillStyle = 'rgba(86, 102, 122, 1)';
              ctx.textAlign = 'center';
              ctx.fillText("Time's up", width/2, height/2 + 60);
            }
            ctx.restore();
          }
        }
        // config
        const config = {
          type: 'doughnut',
          data,
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          },
          plugins: [pomodoroTimer]
        };
   
        // render init block
        const myChart = new Chart(
          document.getElementById('myChart'),
          config
        );
        function updateCountDown(){
          minutes = Math.floor(time/60);
          seconds = time % 60;
          seconds = seconds < 10 ? '0' + seconds : seconds ;
          minutes = minutes < 10 ? '0' + minutes : minutes ;
          time --; //transparent bar
          timeLeft ++; //red bar
         
   
          // update chart
          myChart.config.data.datasets[0].data[0] = timeLeft;
          myChart.config.data.datasets[0].data[1] = time;
          myChart.update();
   
          // stop loop
          console.log(time)
          if(time < 0) {
            stopTimer();
          }
        }
    //updateCountDown();
 
    // start button
    document.getElementById('start').addEventListener('click', () => {
      if(document.getElementById('setTime').disabled === false) {
        startingMinutes = document.getElementById('setTime').value;
        time = startingMinutes * 60;
      }
     
     
      clear = setInterval(updateCountDown, 1000)
      document.getElementById('setTime').disabled = true;
      document.getElementById('start').disabled = true;
      document.getElementById('stop').disabled = false;
      document.getElementById('reset').disabled = false;
    });
   
    // stop button
    document.getElementById('stop').addEventListener('click', () => {
      clearInterval(clear);
      clearTimeout(clear);
      document.getElementById('start').disabled = false;
      document.getElementById('stop').disabled = true;
      document.getElementById('reset').disabled = false;
    });
 
    function stopTimer(){
      document.getElementById('stop').disabled = true;
      document.getElementById('start').disabled = true;
      clearInterval(clear);
      clearTimeout(clear);
    }
 
    // reset button
    document.getElementById('reset').addEventListener('click', () => {
      document.getElementById('setTime').disabled = false;
      document.getElementById('start').disabled = false;
      document.getElementById('stop').disabled = true;
      time = startingMinutes * 60;
      timeLeft = 0;
      minutes = Math.floor(time/60);
      seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds ;
      minutes = minutes < 10 ? '0' + minutes : minutes ;
      clearInterval(clear);
      clearTimeout(clear);
      myChart.config.data.datasets[0].data = [0, time];
      myChart.update();
    });