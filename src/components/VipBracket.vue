<template>
<div class="bracket-wrapper">

    <div class="bracket">
        <svg class="bracket-lines">

        <path
            d="M200 124 H320"
            class="bracket-line"
        />
        <path
            d="M200 326 H320"
            class="bracket-line"
        />
        <path
            d="M321 125 V325"
            class="bracket-line"
        />
        <path
            d="M250 225 H340"
            class="bracket-line"
        />

        <path
            d="M200 524 H320"
            class="bracket-line"
        />
        <path
            d="M200 726 H320"
            class="bracket-line"
        />
        <path
            d="M321 525 V725"
            class="bracket-line"
        />
        <path
            d="M250 625 H335"
            class="bracket-line"
        />

        <path
            d="M425 219 H549"
            class="bracket-line"
        />
        <path
            d="M425 621 H549"
            class="bracket-line"
        />
        <path
            d="M550 220 V620"
            class="bracket-line"
        />
        <path
            d="M495 390 H620"
            class="bracket-line"
        />


        <path
            d="M655 410 H673"
            class="bracket-line"
        />
        <path
            d="M820 410 H870"
            class="bracket-line"
        />
        <!-- <path
            d="M675 420 V390"
            class="bracket-line"
        /> -->
        <!-- <path
            d="M676 620 H820"
            class="bracket-line"
        /> -->

        <!-- Finales -->
        <!-- <path
            d="M955 490 H906"
            class="bracket-line"
        /> -->
        <!-- <path
            d="M820 620 H903"
            class="bracket-line"
        /> -->
        <!-- <path
            d="M904 420 V390"
            class="bracket-line"
        /> -->
        <!-- <path
            d="M676 520 H820"
            class="bracket-line"
        /> -->


        <path
            d="M1235 220 H961"
            class="bracket-line"
        />
        <path
            d="M1235 620 H961"
            class="bracket-line"
        />
        <path
            d="M960 220 V620"
            class="bracket-line"
        />
        <!-- <path
            d="M1087 390 H1065"
            class="bracket-line"
        />         -->



        <path
            d="M1211 135 H1380"
            class="bracket-line"
        />
        <path
            d="M1211 325 H1380"
            class="bracket-line"
        />
        <path
            d="M1210 135 V324"
            class="bracket-line"
        />
        <!-- <path
            d="M1245 217 H1279"
            class="bracket-line"
        /> -->



        <path
            d="M1211 525 H1390"
            class="bracket-line"
        />
        <path
            d="M1211 725 H1380"
            class="bracket-line"
        />
        <path
            d="M1210 525 V725"
            class="bracket-line"
        />
        <!-- <path
            d="M1268 625 H1200"
            class="bracket-line"
        /> -->

        <path
            v-for="(line,index) in svgPaths"
            :key="index"
            :d="line.d"
            class="bracket-line"
        />
    </svg>
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
        <h6>Final</h6>
        <BracketMatch
            v-if="finalMatch"
            :match="finalMatch"
            @mounted="registerCard"
        />
    </div>

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
    height:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#FFC107;
    font-weight:700;
}

.bracket-column{
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    z-index:2;
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

.bracket-lines{
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    pointer-events:none;
    z-index:0;
}

.bracket-line{
    fill:none;
    stroke:#FFC107;
    stroke-width:3;
    stroke-linecap:round;
    stroke-linejoin:round;
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
