<template>
  <div class="colorado">
    <transition name="animation">
      <p @click="open" v-show="show_stat" id="stat">ПОДРОБНАЯ СТАТИСТИКА</p>
    </transition>
    <div @click="pos" class="pos">
      <p><strong>{{ name.substring(0, 2) }}</strong>{{ name.substring(2, name.length) }}</p>
      <p id="balance">{{ balance }}</p>
      <div class="up"></div>
      <div class="cont" :style="get()"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "colorado",
  props: {
    name: String,
    balance: Number,
    show_stat: Boolean,
    max_height: Number,
    object: Object
  },
  methods: {
    get() {
      let style = {
        height: ''
      }
      if (screen.height < 1000) {
        style.height = (Math.floor(200 * (this.balance / this.max_height))) + 'px';
      } else {
        style.height = (Math.floor(400 * (this.balance / this.max_height))) + 'px';
      }
      return style;
    },
    pos() {
      this.$emit('chagepos');
    },
    open() {
      this.$emit('opendialog');
    }
  },
}
</script>

<style scoped>
.cont {
  width: 50px;
  background-clip: padding-box;
  background-image: url("@/assets/piece_of_pipe_mid .png");
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  transition-duration: .9s;
}

.up {
  width: 50px;
  height: 24px;
  background-clip: padding-box;
  background-image: url("@/assets/piece_of_pipe .png");
}

.colorado {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  margin-left: 50px;
}

p {
  margin-bottom: 10px;
  width: 80px;
  line-height: 13px;
  word-wrap: break-word;
  text-shadow: 0 0 5px white;
  font-size: 8px;
}

strong {
  font-size: 10px;
}

#balance {
  color: #ffffff;
  text-shadow: black 0 0 3px;
  font-size: 15px;
  font-weight: 1000;
}

#stat {
  font-size: 7px;
  background-color: red;
  color: white;
  padding: 1px;
  margin-bottom: 10px;
}

#stat:hover {
  transform: scale(1.4);
}

.pos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
}

.animation-enter-active {
  transition: opacity 0.5s ease;
}
.animation-leave-active {
  transition: opacity;
}

.animation-enter-from,
.animation-leave-to {
  opacity: 0;
}

.medal {
  width: 56px;
  margin-bottom: -61px;
  z-index: 5;
  opacity: 1;
}
</style>