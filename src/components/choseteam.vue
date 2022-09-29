<template>
  <transition name="fade">
    <div v-show="is">
      <h2 id="timer-logo-2">
        Межпредметная Олимпиада
      </h2>
      <div class="chose">
        <strong>(Выберите отделение)</strong>
      </div>
      <div class="cont">
        <div @click="redirect(i)" v-for="i in 3" v-show="i !== 2" class="item">
          {{i}}
        </div>
      </div>
      <div class="cont">
        <div @click="redirect(0)" class="item-2">
          Все отделения
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "choseteam",
  async mounted() {
    this.is = false;
    let res = await fetch('https://back.is57.ru/date');
    res = await res.text();
    let time_start = new Date(res);
    let time_now = new Date();
    if (time_now < time_start) {
      location.replace('/');
    } else {
      this.is = true;
    }
  },
  methods: {
    redirect(v) {
      location.replace(`/menu/${v}`);
    }
  },
  data() {
    return {
      is: false
    }
  }
}
</script>

<style scoped>
h2 {
  padding: 5px;
}
.cont {
  display: flex;
  align-items: center;
  justify-content: center;
}

strong {
  color: white;
}

.item {
  margin: 40px;
  background-color: white;
  box-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  color: #e52521;
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 60px;
  user-select: none;
  cursor: pointer;
  padding-top: 4px;
  padding-left: 4px;
}
.item-2 {
  margin: 20px;
  background-color: white;
  box-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  color: #e52521;
  width: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-family: 'Press Start 2P', cursive;
  font-size: 40px;
  user-select: none;
  cursor: pointer;
  padding-top: 4px;
  padding-left: 4px;
}
#timer-logo-2 {
  font-size: 60px;
  text-shadow: 0 1px #e52521, 1px 2px #e52521, 2px 3px #e52521, 3px 4px #e52521, 4px 5px #e52521, 8px 9px rgb(0 0 0 / 10%);
  font-family: 'Press Start 2P', cursive;
  color: white;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 80px;
  word-wrap: break-word;
  line-height: 70px;
}
.item:active {
  scale: 0.95;
}
.chose {
  opacity: 0.3;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: white;
}
@media screen and (max-width: 800px){
  #timer-logo-2 {
    font-size: 27px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .cont {
    flex-wrap: wrap;
  }
  .item {
    font-size: 30px;
    height: 80px;
    width: 80px;
  }
  .item-2 {
    font-size: 20px;
    width: 300px;
    height: 70px;
  }
}

@media screen and (max-width: 500px){
  #timer-logo-2 {
    font-size: 20px;
  }
  .item {
    width: 50px;
    height: 50px;
  }
  strong {
    font-size: 15px;
  }
  .item-2 {
    font-size: 12px;
    width: 200px;
    height: 50px;
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