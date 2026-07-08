<template>
<div class="bracket-wrapper">
    <div class="bracket">
    <div class="bracket-column octavos">       
        <h6>Octavos</h6>
        <BracketMatch
            v-for="match in leftOctavos"
            :key="match.id"
            :match="match"
            class="match-card-spacing octavos"
            @mounted="registerCard"
        />
    </div>

    <div class="bracket-column cuartos">
        <h6>Cuartos</h6>
        <BracketMatch
            v-for="match in leftCuartos"
            :key="match.id"
            :match="match"
            class="match-card-spacing cuartos"
            @mounted="registerCard"
        />
    </div>

    <div class="bracket-column">
        <h6>Semifinal</h6>
        <BracketMatch
            v-for="match in leftSemis"
            :key="match.id"
            :match="match"
            class="match-card-spacing semifinal"
            @mounted="registerCard"
        />
    </div>

<div class="bracket-column final">
    <h6>🏆 Final</h6>

    <BracketMatch
        v-if="finalMatch"
        :match="finalMatch"
        @mounted="registerCard"
    />

    <h6 class="third-place-title">
        🥉 Tercer Lugar
    </h6>

    <BracketMatch
        v-if="thirdPlaceMatch"
        :match="thirdPlaceMatch"
        class="third-place-card"
        @mounted="registerCard"
    />
</div>    
    <!-- <div class="bracket-column final">
        <h6>Final</h6>

        <BracketMatch
            v-if="finalMatch"
            :match="finalMatch"
            @mounted="registerCard"
        />

        <h6 class="third-title">
            3er Lugar
        </h6>

        <BracketMatch
            v-if="thirdPlaceMatch"
            :match="thirdPlaceMatch"
            class="third-place-card"
            @mounted="registerCard"
        />
    </div> -->

    <div class="bracket-column">
        <h6>Semifinal</h6>
        <BracketMatch
            v-for="match in rightSemis"
            :key="match.id"
            :match="match"
            class="match-card-spacing semifinal"
            @mounted="registerCard"
        />
    </div>

    <div class="bracket-column cuartos">
        <h6>Cuartos</h6>
        <BracketMatch
            v-for="match in rightCuartos"
            :key="match.id"
            :match="match"

            class="match-card-spacing cuartos"
            @mounted="registerCard"
        />
    </div>

    <div class="bracket-column octavos">
        <h6>Octavos</h6>
        <BracketMatch
            v-for="match in rightOctavos"
            :key="match.id"
            :match="match"

            class="match-card-spacing octavos"
            @mounted="registerCard"
        />
    </div>
    </div>

</div>
</template>

<script setup>
import { computed, ref, nextTick, onMounted } from "vue";
import BracketMatch from "@/components/BracketMatch.vue";

const cardPositions = ref({});

const leftOctavos = computed(() =>
    props.matches.filter(
        m => m.stage === "Octavos de final" && m.bracket_side === "LEFT"
    )
);

function registerCard(data) {
    console.log("Registrando:", data.id);
    cardPositions.value[data.id] = data.element;
}

const svgPaths = ref([]);

const leftCuartos = computed(() =>
    props.matches.filter(m =>
        m.stage === "Cuartos de final" &&
        m.bracket_side === "LEFT"
    )
)

const leftSemis = computed(() =>
    props.matches.filter(m =>
        m.stage === "Semifinal" &&
        m.bracket_side === "LEFT"
    )
)

const finalMatch = computed(() =>
    props.matches.find(m =>
        m.stage === "Final"
    )
)

const thirdPlaceMatch = computed(() =>
    props.matches.find(m =>
        m.stage === "Tercer lugar"
    )
)

const rightSemis = computed(() =>
    props.matches.filter(m =>
        m.stage === "Semifinal" &&
        m.bracket_side === "RIGHT"
    )
)

const rightCuartos = computed(() =>
    props.matches.filter(m =>
        m.stage === "Cuartos de final" &&
        m.bracket_side === "RIGHT"
    )
)

const rightOctavos = computed(() =>
    props.matches.filter(m =>
        m.stage === "Octavos de final" &&
        m.bracket_side === "RIGHT"
    )
)


const props = defineProps({
    matches: {
        type: Array,
        default: () => []
    }
})

function drawLines(){
    svgPaths.value=[];
}

onMounted(async () => {
    await nextTick();
    // Espera a que todas las tarjetas se pinten
    setTimeout(() => {
        console.log(cardPositions.value);        
        drawLines();
    }, 200);
});
</script>

<style scoped>
.bracket-container{
    width:100%;
    padding:20px;
}

.match-card{
    background:#242424;
    border:1px solid #404040;
    border-radius:12px;
    padding:14px;
    margin-bottom:22px;

    width:100%;
    max-width:210px;    
}

.team{
    color:white;
    font-weight:600;
    display:flex;
    flex-direction:column;
}

.team small{
    color:#9ca3af;
    font-size:.8rem;
    margin-top:2px;
}

.vs{
    text-align:center;
    margin:8px 0;
    color:#ffc107;
    font-weight:bold;
}

.bracket{
    display:grid;

    grid-template-columns:
        minmax(170px,1fr)
        minmax(170px,1fr)
        minmax(170px,1fr)
        minmax(150px,.8fr)
        minmax(170px,1fr)
        minmax(170px,1fr)
        minmax(170px,1fr);
    column-gap:16px;
    align-items:start;
    /* width:100%; */
    position:relative;
    padding:20px 10px;

    width:max-content;
    min-width:1450px;    
}

.bracket-wrapper{
    width:100%;
    overflow-x:auto;
    overflow-y:hidden;
    -webkit-overflow-scrolling:touch;
    touch-action:pan-x;

    width:100%;
    overflow-x:auto;
    overflow-y:hidden;
    background:#000;
    -webkit-overflow-scrolling:touch;    
}

.test-match{
    position:absolute;
    left:20px;
    top:20px;
    width:270px;
}

.center-column{
    display:flex;
    flex-direction:column;
    align-items:center;
}

.column h5{
    color:#FFC107;
    text-align:center;
    margin-bottom:30px;
    font-weight:700;
}

.column{
    min-width:220px;
}

.column h5{
    text-align:center;
    color:#ffc107;
    margin-bottom:20px;
    font-weight:bold;
}

.center{
    min-width:260px;
}

.bracket-column h6{
    color:#FFC107;
    font-weight:700;
    font-size:1rem;
    letter-spacing:.5px;
    text-transform:uppercase;
    margin-bottom:22px;
}

/* .bracket-column h6{
    height:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#FFC107;
    font-weight:700;
} */

.bracket-column{
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    z-index:2;    
}

.bracket-column::after{
    content:"";
    position:absolute;
    top:60px;
    bottom:30px;
    right:-10px;
    width:1px;
    background:linear-gradient(
        to bottom,
        transparent,
        rgba(255,255,255,.12),
        rgba(255,255,255,.12),
        transparent
    );
}

.match-card-spacing.octavos{
    margin-bottom:80px;
}

.match-card-spacing.cuartos{
    margin-top:90px;
    margin-bottom:200px;
}

.match-card-spacing.semifinal{
    margin-top:260px;
}

.bracket-column.final{
    padding-top:310px;
}

.bracket-column h6::after{
    content:"";
    display:block;

    width:42px;
    height:2px;

    margin:8px auto 0;

    background:#FFC107;
    opacity:.45;
    border-radius:10px;
}

.third-place-title{
    margin-top:70px;
    margin-bottom:18px;
}

.third-place-card{
    margin-top:0;
}


/* Solo móviles y tablets */
@media (max-width:1100px){
    .bracket-wrapper{
        overflow-x:auto;
        overflow-y:hidden;
        -webkit-overflow-scrolling:touch;
    }
    .bracket{
        min-width:1450px;
    }
}

@media (min-width:1101px){
    .bracket-wrapper{
        overflow-x:hidden;
    }
    .bracket{
        min-width:0;
        width:100%;
    }
}
</style>
