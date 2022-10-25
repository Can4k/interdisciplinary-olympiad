<template>
  <transition name="fade">
    <div v-if="show" class="cont">
      <h2 :style="styleTimer" id="timer-logo" @click="back">
        Межпредметная Олимпиада
      </h2>
      <button @click="this.show_info = true" class="do">ПОМОЩЬ</button>
      <stats :balance="lastBalance" :is-keked="isKeked" @closedialog="closeDialog" :team="last"/>
      <div class="info" v-show="show_info"></div>
      <div :style="marioStyle" class="mario" :class="this.moving_class"></div>
      <div v-show="show_info" class="info-window">
        <h5>Справка</h5>
        <div class="tac">
          Чтобы вернуться к выбору отделения нажми на надпись "Межпредметная олимпиада".
        </div>
        <div style="margin-top: 10px" class="tac">
          Чтобы найти нужную команду переместитесь к нужной колонне, нажимая на другие колонны или делая свайпы в нужную сторону.
        </div>
        <button class="cls" @click="show_info = false">Закрыть</button>
      </div>
      <div class="field">
        <div :style="styleGrass" class="grass"></div>
        <div :style="styleBottoms" class="bottom"></div>
        <strong v-show="!showField">Идёт загрузка</strong>
        <strong v-show="showField && !this.teamsList.length">Команд пока нет. Попробуйте перезагрузить страницу.</strong>
        <transition name="animation">
          <div :style="styleColumns" class="columns" v-show="showField">
            <pipe
                :max_height="maxHeight"
                :show_stat="show_button && i === last"
                @opendialog="opendialog(i)"
                @chagepos="move(i)"
                v-for="i in this.teamsList"
                :name="i.name" :balance="balanceList[i.id] || 0"
                :object="i">
            </pipe>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import Pipe from "@/components/pipe_component/pipe";
import Stats from "@/components/statistics-window";

export default {
  name: "teams",
  components: {Stats, Pipe},
  methods: {
    opendialog(i) {
      if (this.is) {
        return;
      }
      this.is = true;
      this.isKeked = true;
      this.styleBottoms.height = "700px";
      this.styleGrass.bottom = "700px";
      this.styleColumns.transform = `translateY(-600px) translateX(${-this.last.num * 130}px`;
      this.styleTimer.transform = "translateY(-600px)";
      this.styleHelp.transform = "translateY(-600px)";
      this.marioStyle.transform = "translate(-54px, -600px)"
    },
    closeDialog() {
      this.is = false;
      this.isKeked = false;
      this.styleBottoms.height = "100px";
      this.styleGrass.bottom = "100px";
      this.styleColumns.transform = `translateX(${-this.last.num * 130}px`;
      this.styleTimer.transform = "";
      this.styleHelp.transform = "";
      this.marioStyle.transform = "translate(-54px)"
    },
    move(i) {
      if (i.id !== this?.last?.id) {
        this.show_button = false;
      }
      let flag = true;
      let prev = this.marioStyle.backgroundPositionX;
      prev = prev.slice(0, -2);
      for (let i = 0; i < 30; i++) {
        this.marioStyle.backgroundPositionX = "0px";
        this.marioStyle.backgroundPositionX = "32px";
        this.marioStyle.backgroundPositionX = "62px";
      }
      if (this.is) {
        return;
      }
      let last_tmp = this.last.num || -1;

      if (last_tmp < i.num) {
        this.moving_class = 'walk-right';
      } else if (last_tmp > i.num) {
        this.moving_class = 'walk-left';
      }

      this.last = i;
      this.last_to = i.num;

      setTimeout(() => {
        if (i.num === this.last_to) {
          this.moving_class = '';
          this.lastBalance = this.balanceList[i.id];
          this.show_button = true;
        }
      }, 800);
      this.styleColumns.transform = `translateX(${-i.num * 130}px) `;
      this.styleGrass.backgroundPositionX = `${-i.num * 130}px`;
      this.styleBottoms.backgroundPositionX = `${-i.num * 130}px`;
    },
    back() {
      location.replace('/menu');
    }
  },
  data() {
    return {
      last: {num: 0},
      is: false,
      isKeked: false,
      teamsList: [],
      resultList: [],
      balanceList: {},
      showField: false,
      show: false,
      moving_class: '',
      last_to: '',
      show_button: false,
      styleBottoms: {
        height: "",
        backgroundPositionX: "",
      },
      styleGrass: {
        height: "",
        backgroundPositionX: "",
        bottom: "",
      },
      styleColumns: {
        transform: "",
      },
      styleTimer: {
        height: "",
        transform: "",
      },
      styleHelp: {
        height: "",
        transform: "",
      },
      marioStyle: {
        transform: "",
        backgroundPositionX: "64px",
        backgroundPositionY: "0px",
      },
      maxHeight: 0,
      lastBalance: 0,
      show_info: false
    }
  },
  async mounted() {
    let touchstartX = 0
    let touchendX = 0

    let checkDirection = () => {
      if (touchendX < touchstartX && Math.abs(touchendX - touchstartX) >= 30) return -1;
      if (touchendX > touchstartX && Math.abs(touchendX - touchstartX) >= 30) return 1;
      return 0;
    }

    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    })

    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      if (this.teamsList[this.last.num - 2] && checkDirection() === 1) {
        this.move(this.teamsList[this.last.num - 2]);
      } else if (this.teamsList[this.last.num] && checkDirection() === -1) {
        this.move(this.teamsList[this.last.num]);
      }
    })

    this.show = true;

    this.teamsList = require('../offline_data/teams.json')
    this.resultList = require('../offline_data/res.json')
    let balanceListTmp = {};
    for (let i of this.teamsList) {
      for (let j of this.resultList[i.id].results) {
        i.id in balanceListTmp ? balanceListTmp[i.id] += j.result : balanceListTmp[i.id] = j.result;
      }
    }
    for (let i in balanceListTmp) {
      this.maxHeight = Math.max(this.maxHeight, balanceListTmp[i]);
    }
    this.teamsList.sort((b, a) => {
      let c = balanceListTmp[a.id] || 0;
      let d = balanceListTmp[b.id] || 0;
      return c < d ? -1 : c === d ? 0 : 1;
    });
    let building = +location.href[location.href.length - 1];
    this.teamsList = this.teamsList.filter((e) => {
      return building === 0 || e.building === building;
    });
    let num = 1;
    for (let i of this.teamsList) {
      i.num = num++;
    }
    this.showField = true;
    setTimeout(() => this.balanceList = balanceListTmp, 50);
  },
}
</script>

<style scoped>
.grass {
  height: 32px;
  bottom: 100px;
  width: 100%;
  background-image: url("@/assets/grass.png");
  position: fixed;
  transition-duration: .9s;
}

.bottom {
  height: 100px;
  width: 100%;
  background-image: url("@/assets/ground.png");
  position: fixed;
  bottom: 0;
  transition-duration: .9s;
}

.columns {
  left: 50%;
  position: fixed;
  width: 100%;
  bottom: 132px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  padding-right: 10px;
  transition-duration: .9s;
  z-index: -1;
}


.columns::-webkit-scrollbar {
  height: 0;
}

h2 {
  font-size: 40px;
  text-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  margin-top: 30px;
  word-wrap: break-word;
  line-height: 50px;
  cursor: pointer;
}

h3 {
  font-size: 15px;
  text-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  word-wrap: break-word;
  line-height: 10px;
  z-index: 1;
}

@media screen and (max-width: 540px) {
  #timer-logo {
    font-size: 25px;
  }
}

.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.2s ease;
}

.animation-enter-from,
.animation-leave-to {
  opacity: 0;
}

strong {
  font-family: 'Press Start 2P', cursive;
  color: white;
  position: fixed;
  bottom: 180px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  z-index: 15;
  text-shadow: 0 0 10px black;
  line-height: 19px;
}

@media screen and (max-width: 320px){
  #timer-logo {
    font-size: 15px;
  }
}

#timer-logo {
  transition-duration: .9s;
}
.cont {
  transition-duration: .9s;
}
* {
  transition-duration: .9s;
}

.do {
  position: absolute;
  left: 5px;
  top: 5px;
  padding: 4px 8px;
  color: white;
  background-color: #e52521;
  border-radius: 0;
  border: 1px solid white;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  cursor: pointer;
}
.info {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.info-window {
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 21;
  padding: 6px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  line-height: 12px;
  width: 250px;

}
h5 {
  text-align: center;
  font-size: 10px;
  margin: 5px;
}
.cls {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  padding: 4px 8px;
  color: white;
  background-color: #e52521;
  border-radius: 0;
  border: 1px solid white;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  cursor: pointer;
  margin-top: 5px;
}
.tac {
  text-align: center;
}
.mario {
  position: absolute;
  left: 50%;
  bottom: 132px;
  transform: translateX(-54px);
  width: 32px;
  height: 48px;
  background-image: url("@/assets/mario.png");
  z-index: 10;
}

@-webkit-keyframes walk-left-loop {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -64px;
  }
}
@keyframes walk-left-loop {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -64px;
  }
}
@-webkit-keyframes walk-right-loop {
  0% {
    background-position: -128px;
  }
  100% {
    background-position: -192px;
  }
}
@keyframes walk-right-loop {
  0% {
    background-position: -128px;
  }
  100% {
    background-position: -192px;
  }
}

.mario.walk-left {
  -webkit-animation: walk-left-loop 0.22s steps(2) infinite;
  animation: walk-left-loop 0.22s steps(2) infinite;
}
.mario.walk-right {
  -webkit-animation: walk-right-loop 0.22s steps(2) infinite;
  animation: walk-right-loop 0.22s steps(2) infinite;
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