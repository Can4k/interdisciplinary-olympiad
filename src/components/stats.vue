<template>
  <div :style="[isKeked? 'bottom: 100px' : 'transform: translate(-50%)']" class="stat-cont">
    <h3>{{ team?.name}}</h3>
    <div class="stat">
      <div class="info-block" v-for="i in this.result[this.team?.id]?.results" v-show="i.result">
        <div>
          <strong style="text-transform: uppercase; font-size: 10px">
            {{i.taskInfo.subject}}
          </strong>
        </div>
        <strong>
          {{ i.taskInfo.name }}
        </strong>
        <div>
          <strong>
            -> {{ i.result }}
          </strong>
        </div>
      </div>
      <b style="margin-top: 10px">ИТОГО: {{balance}}</b>
    </div>
    <button @click="close()">Закрыть</button>
  </div>
</template>

<script>
export default {
  name: "stats",
  props: {
    team: Object,
    isKeked: Boolean,
    balance: Number
  },
  data() {
    return {
      result: {},
    }
  },
  async mounted() {
    let res = await fetch('https://back.is57.ru/results');
    this.result = await res.json();
  },
  methods: {
    close() {
      this.$emit('closedialog');
    }
  }
}
</script>

<style scoped>
.stat-cont {
  position: fixed;
  left: 50%;
  bottom: -500px;
  transform: translate(-50%);
  transition-duration: .9s;
  width: 600px;
  background-color: #000000;
  color: white;
  z-index: 5;
  padding: 15px;
  font-family: 'Press Start 2P', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.stat {
  height: 350px;
  width: 570px;
  margin-top: 10px;
  overflow-y: scroll;
  background-color: white;
  color: black;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  line-height: 20px;
}

.stat::-webkit-scrollbar {
  color: white;
}

.stat::-webkit-scrollbar-thumb {
  background-color: black;
}

button {
  margin-top: 15px;
  background-color: white;
  border: none;
  padding: 5px;
  font-size: 15px;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition-duration: .2s;
}

button:hover {
  transform: scale(1.1);
}

strong {
  font-size: 8px;
  line-height: 20px;
}

@media screen and (max-width: 630px) {
  .stat {
    width: 300px;
  }

  .stat-cont {
    width: 350px;
  }
}

#pyth {
  margin-top: 5px;
  margin-bottom: 5px;

}

.info-block {
  margin-bottom: 20px;
}

strong {
  text-align: left;
}
h3 {
  word-break: break-word;
  line-height: 25px;
  text-align: left;
  color: white;
}
</style>