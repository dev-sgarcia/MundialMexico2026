<template>
    <div
        class="match-card"
        ref="cardRef"
    >
    <div
        class="team"
        :class="{
            eliminated:
                match.status === 'finished' &&
                match.home_score < match.away_score,

            winner:
                match.status === 'finished' &&
                match.home_score > match.away_score
        }"
    >    
        <img
            v-if="match.home_team_code"
            :src="`https://flagcdn.com/w40/${match.home_team_code}.png`"
            class="flag"
        >
        <div>
            <div class="team-name">
                <span class="team-title">
                    {{ match.home_team }}
                </span>
            </div>
            <small class="player-name">
                {{ match.home_player }}
            </small>            
        </div>
    </div>

    <div class="divider"></div>
    <div
        class="team"
        :class="{
            eliminated:
                match.status === 'finished' &&
                match.away_score < match.home_score,

            winner:
                match.status === 'finished' &&
                match.away_score > match.home_score
        }"
    >    
        <img
            v-if="match.away_team_code"
            :src="`https://flagcdn.com/w40/${match.away_team_code}.png`"
            class="flag"
        >
        <div>
            <div class="team-name">
                <span class="team-title">
                    {{ match.away_team }}                    
                </span>
            </div>            
            <small class="player-name">
                {{ match.away_player }}
            </small>
        </div>
    </div>
</div>
</template>



<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
    match: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["mounted"]);

const cardRef = ref(null);

onMounted(() => {
    emit("mounted", {
        id: props.match.id,
        element: cardRef.value
    });
});
</script>

<style scoped>
.match-card{
    background:#262626;
    border-radius:12px;
    border:1px solid #444;
    width:200px;
    height:120px;
    padding:12px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    box-sizing:border-box;
}

.match-card{
    transition:
        transform .25s,
        box-shadow .25s,
        border-color .25s;
    cursor:pointer;
}

.match-card:hover{
    transform:translateY(-4px);
    border-color:#FFC107;
    box-shadow:
        0 0 20px rgba(255,193,7,.25);
}



.team{
    display:flex;
    gap:10px;
    align-items:center;
    flex:1;    
}

.team > div{
    flex:1;
    min-width:0;
}


.flag{
    width:28px;
}

.divider{
    height:1px;
    background:#444;
    margin:8px 0;
}

.team small{
    display:block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}

.team-name{
    color:white;
    font-weight:600;
}

small{
    color:#9ca3af;
}

.match-card{
transition:.25s;
cursor:pointer;
}

.match-card:hover{
    transform:translateY(-4px);
    border-color:#FFC107;
    box-shadow:0 0 18px rgba(255,193,7,.30);
}

.eliminated{
    opacity:.35;
    filter:grayscale(100%);
    transition:.3s;
}

/* .winner{
    background: rgba(40,167,69,.18);
    border-left:4px solid #28a745;
    border-radius:8px;
    padding:4px 6px;
    transition:.3s;
} */

.match-card{
    transition:.25s;
    cursor:pointer;
}


.player-name{
    display:block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color:#9ca3af;
    font-size:.80rem;
}

.team-title{
    display:block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
</style>