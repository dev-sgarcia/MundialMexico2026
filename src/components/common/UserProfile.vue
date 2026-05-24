<!-- <template>
  <UserProfileTop
    v-if="user"
    :user="{
      displayName: user.user_metadata.full_name,
      photoURL: user.user_metadata.avatar_url,
    }"
    :has-notifications="true"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabaseClient";
import UserProfileTop from "@/components/common/UserProfile.vue";

const user = ref(null);

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  user.value = session?.user || null;

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
  });
});
</script> -->
