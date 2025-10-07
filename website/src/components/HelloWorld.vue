<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocale, useTheme } from 'vuetify'

  const { t, locale } = useI18n()
  const { current } = useLocale()
  const theme = useTheme()
  const prompt = ref(null)
  const darkMode = ref(theme.current.value.dark)
  const language = ref((navigator.language || 'en').split('-')[0]!)

  function changeLocale (loc: string) {
    current.value = loc
    locale.value = loc
  }

  onMounted(async () => {
    changeLocale(language.value)
    fetchPrompt()
  })

  // Sync Vuetify theme with darkMode
  watch(darkMode, val => {
    theme.global.name.value = val ? 'dark' : 'light'
    fetchPrompt()
  })

  watch(language, val => {
    changeLocale(val)
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

  const languageItems = computed(() => [
    { value: 'en', title: t('english') },
    { value: 'fi', title: t('finnish') },
  ])

  const tPrompt = computed(() => t('defaultPrompt'))
  const tNewPrompt = computed(() => t('newPrompt'))
  const tLanguage = computed(() => t('language'))
  const tDarkMode = computed(() => t('darkMode'))
</script>

<template>
  <v-row>
    <v-switch
      v-model="darkMode"
      class="ma-4 shrink-card"
      inset
      :label="tDarkMode"
    />
    <v-spacer />
    <v-select
      v-model="language"
      class="ma-4 shrink-card"
      :items="languageItems"
      :label="tLanguage"
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
              <span v-else> {{ tPrompt }}</span>
            </h2>
          </a>

          <v-btn
            class="ma-4 shrink-card"
            color="primary"
            rounded
            @click="fetchPrompt"
          >
            {{ tNewPrompt }}
          </v-btn>
        </v-col>
      </v-row>

    </v-sheet>
  </v-container>
</template>

<style scoped>
.shrink-card {
  display: inline-block;
  max-width: 100%;
}

</style>
