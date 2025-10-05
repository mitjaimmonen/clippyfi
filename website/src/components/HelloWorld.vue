<script setup lang="ts">
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const prompt = ref(null)
  const darkMode = ref(theme.current.value.dark)
  const language = ref(navigator.language || 'en')

  onMounted(async () => {
    fetchPrompt()
  })

  // Sync Vuetify theme with darkMode
  watch(darkMode, val => {
    theme.global.name.value = val ? 'dark' : 'light'
    fetchPrompt()
  })

  async function fetchPrompt () {
    console.log(`Fetching prompt for darkMode=${darkMode.value}, language=${language.value}`)
    const response = await fetch(`/api/prompt?dark=${darkMode.value}&lang=${language.value}`)
    const data = await response.json()
    prompt.value = data['message']
  }

  const imageSrc = computed(() => {
    return darkMode.value
      ? new URL('@/assets/clippy-dark.png', import.meta.url).href
      : new URL('@/assets/clippy.png', import.meta.url).href
  })

</script>

<template>
  <v-row>
    <v-switch
      v-model="darkMode"
      class="ma-4 shrink-card"
      inset
      label="Dark mode"
    />
    <v-spacer />
    <v-select
      v-model="language"
      class="ma-4 shrink-card"
      :items="['en', 'fi']"
      label="Language"
      rounded
      style="max-width: 150px"
    />
  </v-row>

  <v-container class="fill-height fluid">
    <v-sheet
      class="py-8 d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      elevation="4"
      max-width="600"
      rounded
      width="100%"
    >
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <a href="https://youtu.be/2_Dtmpe9qaQ?feature=shared" style="text-decoration: none;" target="_blank">
            <img alt="logo" class="py-4" :src="imageSrc" width="128">
            <h2 class="text-h5 font-weight-bold">
              <span v-if="prompt != null">{{ prompt }}</span>
              <span v-else> Clippy is kind.</span>
            </h2>
          </a>

          <v-btn
            class="ma-4 shrink-card"
            color="primary"
            rounded
            @click="fetchPrompt"
          >
            New Prompt
          </v-btn>
        </v-col>
      </v-row>

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
