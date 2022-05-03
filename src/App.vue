<template>
  <article class="prose m-5">
    <h2>{{ flv ? 'flv' : 'rtc' }}</h2>
  </article>
  <div class="divider text-lg mx-5">视频地址</div>
  <div class="form-control flex-row flex-wrap mx-5">
    <input type="text" placeholder="视频地址" class="sm:w-1/3 w-full mb-5 input input-bordered focus:outline-none focus:border-sky-500" v-model="url">
    <button class="btn btn-primary sm:w-1/12 sm:ml-5 w-full text-white" @click="play">播放</button>
  </div>
  <div class="px-5 sm:mx-40 flex justify-center">
    <div id="dplayer" v-if="flv"></div>
    <video id="video-webrtc" controls v-else></video>
  </div>
</template>
<script setup>
  import DPlayer from 'dplayer';
  import {onMounted, ref} from "vue";
  const url = ref('')
  let dp
  const flv = ref(true)
  onMounted(() => {
    dp = new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay: true, // 自动播放
      video: {
        url: url.value,
      },
      customType: {
        customFlv: function (video) {
          const flvPlayer = FlvJs.createPlayer({
            type: 'flv',
            url: video.src,
          });
          flvPlayer.attachMediaElement(video);
          flvPlayer.load();
        },
      },
    });

  })
  const play = () => {
    if (url.value.indexOf("http://") !== -1) {
      flv.value = true
      // bug: https://github.com/bilibili/flv.js/issues/600
      dp.destroy()
      dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true, // 自动播放
        video: {
          url: url.value,
        },
        customType: {
          customFlv: function (video) {
            const flvPlayer = FlvJs.createPlayer({
              type: 'flv',
              url: video.src,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          },
        },
      });
    } else {
      dp.destroy()
      flv.value = false
      const video = document.getElementById('video-webrtc');
      const player = new JSWebrtc.Player(url.value, { video: video, autoplay: true, onPlay: (obj) => { console.log("start play") } });
    }
  }
</script>
