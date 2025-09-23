<script setup lang="ts">
  const prompt = ref(null)

  onMounted(async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    prompt.value = data['message']
  })
</script>

<template>
  <v-container class="fill-height fluid">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <img alt="logo" class="py-4" src="@/assets/clippy.png" width="80">
        <div>
          <v-card
            class="py-4 my-4 shrink-card"
            color="surface-variant"
            rounded="lg"
            variant="tonal"
          >
            <v-card-title>
              <h2 class="text-h5 font-weight-bold">
                <span v-if="prompt != null">{{ prompt }}</span>
                <span v-else> Clippy is not happy about the state of the world.</span>
              </h2>
            </v-card-title>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.shrink-card {
  display: inline-block; /* shrink-wrap width */
  /* optionally add max-width to prevent it growing too big */
  max-width: 100%;
}

</style>
