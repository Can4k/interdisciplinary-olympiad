<template>
  <transition name="fade">
    <div id="center" v-show="showble">
      <h2 id="timer-logo">
        Межпредметная Олимпиада
      </h2>
      <h2 id="timer">
        {{ getTimeString(counter) }}
      </h2>
    </div>
  </transition>
</template>

<script>
export default {
  name: "timer",
  async mounted () {
    let res = await fetch('https://back.is57.ru/date');
    res = await res.text();
    let time_start = new Date(res);
    let time_now = new Date();
    this.counter = Math.max(0, Math.floor((time_start - time_now) / 1000));
    if (this.counter !== 0) {
      this.showble = true;
    }
    setInterval(() => this.counter--, 1000);
  },
  data() {
    return {
      counter: 57,
      showble: false
    }
  },
  methods: {
    getTimeString(count) {
      if (this.counter === 0) {
        location.replace('/menu');
      }
      count = Math.max(count, 0);
      let ans = "";
      let hours = Math.floor(count / 3600);
      if (hours === 0) {
        ans = "00";
      } else if (hours < 10) {
        ans += "0" + hours;
      } else {
        ans += hours;
      }
      ans += ':';
      count %= 3600;
      let minutes = Math.floor(count / 60);
      if (minutes === 0) {
        ans += "00";
      } else if (minutes < 10) {
        ans += "0" + minutes;
      } else {
        ans += minutes;
      }
      ans += ':';
      count %= 60;
      if (count === 0) {
        ans += "00";
      } else if (count < 10) {
        ans += "0" + count;
      } else {
        ans += count;
      }
      return ans;
    },
  },
}
</script>

<style scoped>
#center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

#timer {
  font-size: 40px;
  text-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  margin-top: 30px;
  padding: 20px;
}

h2 {
  word-wrap: break-word;
  line-height: 65px;
}

#timer-logo {
  font-size: 50px;
  text-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  margin-top: 30px;
}

@media screen and (max-width: 660px) {
  #timer-logo {
    font-size: 28px;
  }

  #center {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  #timer {
    font-size: 30px;
    margin-top: 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>