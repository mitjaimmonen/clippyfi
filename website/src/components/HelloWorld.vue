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
    <v-sheet
      class="py-8 d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      elevation="4"
      max-width="600"
      rounded
      width="100%"
    >
      <a href="https://youtu.be/2_Dtmpe9qaQ?feature=shared" style="text-decoration: none;" target="_blank">
        <v-row align="center" justify="center">
          <v-col align="center" justify="center">
            <img alt="logo" class="py-4" src="@/assets/clippy.png" width="100">
            <h2 class="text-h5 font-weight-bold">
              <span v-if="prompt != null">{{ prompt }}</span>
              <span v-else> Clippy is kind.</span>
            </h2>
          </v-col>
        </v-row>
      </a>

    </v-sheet>
  </v-container>
</template>

<style scoped>
.shrink-card {
  display: inline-block; /* shrink-wrap width */
  /* optionally add max-width to prevent it growing too big */
  max-width: 100%;
}

</style>
