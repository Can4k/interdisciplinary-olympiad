<template>
  <div v-if ="true && showble" class="add-container" :style="`background-color: ${colors[type]}`">
    <img @click="closead" alt="закрыть" src="./close.png" class="close">
    <div class="flex">
      <img alt="картинка" :src="getImgUrl(image_hrefs[type])" class="add-image">
    </div>
    <a target="_blank" :href="link_hrefs[type]">{{ titles[type] }}</a>
  </div>
</template>

<script>
export default {
  name: "ad",
  props: {
    num: Number,
  },
  data() {
    return {
      type: 0,
      showble: true,
      titles: [
        'Котята-британцы. Забирайте, пока не утонули!',
        'Чтобы увеличить оценки, вам нужна простая советская флешка … в компьютере учителя',
        'Метод простого заработка!',
        'Горящие туры по странам СНГ от наших лучших гидов!',
        'Веб-студия «костыль»',
        'Лучшие дачи в Сибири! Нефть так и будет течь из вашей скважины!',
        'Тебе потребуется Tor, чтобы…',
        'Шок! Результаты выборов в Управляющий Совет Пятьдесят Седьмой уже решены! Избрали…',
        'Забирай шпоры к ЕГЭ по математике прямо тут…',
        'Вы чувствуете себя небинарной персоной? Попробуйте найти себя…',
        'Цитаты изменившие мир…',
        'Волнуют цены на бананы? Эксперт-экономист ответит на все ваши вопросы!',
        'Школа техник наруто: от генина до хокаге!',
        'Куда переезжает мавзолей в 2023 году? Мы узнали шокирующие подробности от минстроя…',
        'Как ПОМОЛОДЕТЬ? Источник молодизны МОЛОДЫХ ЛЮДЕЙ раскрыт нашим экспертом!!!',
        'Прирученные ПИТОНЫ, ломающие СЕРВЕРА конкурентов. Заинтересовали? Обращайтесь к нашему оператору!!!',
        'НОВИНКИ НА is57.ru - отвечает наш программист!!!',
        'МУЖЧИНА, который ГОТОВ серьезно озадачиться…',
        'Моей МАМЕ удалось нарушить 57 ФЕДЕРАЛЬНЫХ ЗАКОНОВ и отделаться штрафом, просто ОНА позвонила ЕМУ…'
      ],
      link_hrefs: [
        'https://t.me/startseva_yu',
        'https://wiki.archlinux.org/',
        'https://vos.olimpiada.ru/',
        'https://t.me/sheshonk',
        'https://ilkras.ru/#/',
        'https://istina.msu.ru/profile/MishurinskiiDV/',
        'https://youtu.be/2Cg1P2M_xJk',
        'https://ancap-231df.web.app/management',
        'https://vk.com/bufeeff',
        'https://youtu.be/OeZRAVsfMVo',
        'https://t.me/liberalism57',
        'https://vk.com/suesey',
        'https://t.me/whotegsthatdies',
        'https://t.me/Lenin_na_udalenke',
        'https://vk.com/p.zakharov',
        'https://t.me/vvp81',
        'https://t.me/Can4k',
        'https://t.me/CHUBBY_D',
        'https://t.me/akprf'
      ],
      image_hrefs: [
        'cat.png',
        'usb.png',
        'money.png',
        'sng.png',
        'ilya.png',
        'dacha.png',
        'parashok.png',
        'gosduma.png',
        'ege.png',
        'flag.png',
        'citati.png',
        'banana.png',
        'naruto.png',
        'mavsoley.jpg',
        'i_love_albebra.jpg',
        'python.jpg',
        'guru.png',
        'ilia_searching_girlfriend.png',
        'borya.jpg'
      ],
      colors: [
        '#ff6100',
        'lightblue',
        'lightgray',
        'lightgray',
        'green',
        'lightgreen',
        '#ececec',
        'wheat',
        '#b4852e',
        'yellow',
        'darkgray',
        'wheat',
        'yellow',
        'grey',
        'red',
        'wheat',
        'yellow',
        'white',
        'lightblue'
      ]
    }
  },
  methods: {
    getImgUrl(pic) {
      return require('@/components/ad_component/' + pic);
    },
    closead() {
      this.showble = false;
    }
  },
  mounted() {
    let random = /*() => {return this.titles.length - 1}; */require('@stdlib/random-base-mt19937');
    this.type = (random() + this.num) % this.titles.length;
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.add-container {
  padding: 0 10px 10px 10px;
  z-index: 100;
  box-shadow: 0 0 40px;
  border: 5px solid red;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.add-image {
  width: 100%;
  max-height: 500px;
}

.flex {
  display: flex;
  align-items: center;
  width: 100%;
}

a {
  text-align: center;
  font-weight: 800;
  font-style: italic;
  margin-left: 5px;
  padding: 5px;
}

.close {
  position: relative;
  left: 96%;
  top: 5px;
  width: 20px;
  background-color: white;
  cursor: pointer;
}
</style>