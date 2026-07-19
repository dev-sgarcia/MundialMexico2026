<template>
  <!-- <div class="share-podium"> -->

  <div
    ref="sharePodiumRef"
    class="share-podium"
  >    
    <div class="share-glow"></div>
    <div class="share-header">
    <img
        src="@/assets/logofl.png"
        class="share-logo"
        alt="FansLeague"
    />
    <div class="share-title">
        SALÓN DE LA FAMA
    </div>

<div
    class="share-subtitle"
    :style="{ color: color }"
>
    {{ titulo }}
</div>

    <div
        class="share-badge"
        :class="tipo === 'VIP' ? 'vip' : 'free'"
    >
        {{ tipo }}
    </div>
    <!-- AQUÍ -->

    <div class="share-description">
      Los mejores pronosticadores
    </div>    
    </div>

<div class="share-body">

  <div class="podium">

    <!-- Segundo -->
    <div class="podium-place second">
<PhMedal
    size="54"
    weight="fill"
    class="text-light mb-2"
/>
      <img
        :src="segundo?.avatar_url || AvatarNull"      
        class="podium-avatar"
      >

      <div class="podium-name">
        {{ segundo?.nombre }}
      </div>

      <div class="podium-points">
        {{ segundo?.puntos }} pts
      </div>
<div class="podium-stats">
  <div>Aciertos: <strong>{{ primero?.aciertos }}</strong></div>
  <div>Exactos: <strong>{{ primero?.exactos }}</strong></div>
</div>      

      <div class="pedestal silver"></div>

    </div>

    <!-- Primero -->

    <div class="podium-place first">
<PhCrown
    size="70"
    weight="fill"
    class="text-warning mb-3"
/>
      <!-- <div class="crown">
        👑
      </div> -->

      <img
        :src="primero?.avatar_url || AvatarNull"
        class="podium-avatar champion"
      >

      <div class="podium-name champion-name">
        {{ primero?.nombre }}
      </div>

      <div class="podium-points">
        {{ primero?.puntos }} pts
      </div>
<div class="podium-stats">
  <div>Aciertos: <strong>{{ primero?.aciertos }}</strong></div>
  <div>Exactos: <strong>{{ primero?.exactos }}</strong></div>
</div>      

      <div class="pedestal gold"></div>

    </div>

    <!-- Tercero -->

    <div class="podium-place third">
<PhMedal
    size="54"
    weight="fill"
    class="text-light mb-2"
/>
      <img
        :src="tercero?.avatar_url || AvatarNull"        
        class="podium-avatar"
      >

      <div class="podium-name">
        {{ tercero?.nombre }}
      </div>

      <div class="podium-points">
        {{ tercero?.puntos }} pts
      </div>
<div class="podium-stats">
  <div>Aciertos: <strong>{{ primero?.aciertos }}</strong></div>
  <div>Exactos: <strong>{{ primero?.exactos }}</strong></div>
</div>
      <div class="pedestal bronze"></div>

    </div>

  </div>

</div>
    <div class="share-footer">
      fansleague.com.mx
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";
import AvatarNull from "@/assets/avatar-null.png";
import {
    PhCrown,
    PhMedal
} from "@phosphor-icons/vue";

const sharePodiumRef = ref(null);

const props = defineProps({
    titulo:String,
    tipo:String,
    jugadores:Array,
    color:{
        type:String,
        default:"#38bdf8"
    }
});

defineExpose({
  sharePodiumRef,
  
});


const primero = computed(() =>
  props.jugadores?.find(j => j.posicion === 1)
)

const segundo = computed(() =>
  props.jugadores?.find(j => j.posicion === 2)
)

const tercero = computed(() =>
  props.jugadores?.find(j => j.posicion === 3)
)
</script>

<style scoped>
.share-podium {
    position: fixed;
    left: -99999px;
    top: 0;
    width: 1080px;
    height: 1350px;
    background:
        radial-gradient(circle at top,#1d2f26 0%,#121212 45%,#0b0b0b 100%);
    color:white;
    overflow:hidden;
    font-family:Arial, Helvetica, sans-serif;
}

.share-header{
    text-align:center;
    padding-top:80px;
}

.share-logo{
    width:340px;
}


.share-title{
    font-size:68px;
    font-weight:800;
    letter-spacing:6px;
    color:white;
}

.share-subtitle{
    /*margin-top:20px;
    font-size:44px;
    font-weight:700;*/
    color:#38bdf8;
}

.share-badge{
    display:inline-block;
    margin-top:30px;
    padding:14px 42px;
    border-radius:40px;
    font-size:34px;
    font-weight:bold;
}

.free{
    background:#0d6efd;
}

.vip{
    background:#C9A227;
    color:#111;
}




.share-body{
    margin-top:90px;
    height:700px;
    display:flex;
    align-items:center;
    justify-content:center;
}

.share-footer{
    position:absolute;
    bottom:45px;
    width:100%;
    text-align:center;
    color:#7dd3fc;
    font-size:28px;
    letter-spacing:3px;
}



.podium{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    gap:50px;
}

.podium-place{
    width:250px;
    text-align:center;
}

.first{
    margin-bottom:0;
}

.second{
    margin-bottom:70px;
}

.third{
    margin-bottom:40px;
}

.podium-avatar{
    width:130px;
    height:130px;
    border-radius:50%;
    object-fit:cover;
    border:5px solid white;
}

.champion{
    border-color:#FFD700;
}

.podium-name{
    margin-top:18px;
    font-size:30px;
    font-weight:bold;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    padding:0 15px;
}

.champion-name{
    color:#FFD700;
}

.podium-points{
    color:#7dd3fc;
    margin-top:8px;
    font-size:24px;
}

.crown{
    font-size:50px;
    margin-bottom:10px;
}

.pedestal{
    margin:30px auto 0;
    border-radius:18px 18px 0 0;
}


.gold{
    background:linear-gradient(
        to bottom,
        #f9d94a,
        #c99d16
    );
    box-shadow:
        0 0 35px rgba(255,215,0,.35);
}

.silver{

    background:linear-gradient(
        to bottom,
        #ececec,
        #aeb5bd
    );

}

.bronze{

    background:linear-gradient(
        to bottom,
        #d49a5c,
        #9c6532
    );

}

.podium-stats{
    margin-top:12px;
    font-size:20px;
    color:#d1d5db;
    line-height:1.7;
}

.podium-avatar{
    margin-bottom:15px;
}

.share-footer{
    color:white;
    opacity:.75;
    letter-spacing:6px;
}
</style>