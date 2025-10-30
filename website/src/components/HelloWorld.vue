<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocale, useTheme } from 'vuetify'

  const { t, locale } = useI18n()
  const { current } = useLocale()
  const theme = useTheme()
  const prompt = ref<PromptResponse | null>(null)
  const darkMode = ref(theme.current.value.dark)
  const language = ref((navigator.language || 'en').split('-')[0]!)

  interface PromptResponse {
    message: string
    index: number
  }

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
    const qDark = `dark=${darkMode.value}`
    const qLang = `&lang=${language.value}`
    const qIndex = prompt.value ? `&index=${prompt.value.index}` : ''
    const response = await fetch(`/api/prompt?${qDark}${qLang}${qIndex}`)
    const data = await response.json() as PromptResponse
    prompt.value = data
  }

  const imageSrc = computed(() => {
    return darkMode.value
      ? new URL('@/assets/clippy-dark.png', import.meta.url).href
      : new URL('@/assets/clippy.png', import.meta.url).href
  })

  const formattedPrompt = computed(() =>
    prompt.value ? prompt.value.message.replace(/\n/g, '<br>') : '',
  )

  const languageItems = computed(() => [
    { value: 'en', title: t('english') },
    { value: 'fi', title: t('finnish') },
  ])

  const tPrompt = computed(() => t('defaultPrompt'))
  const tNewPrompt = computed(() => t('newPrompt'))
  const tLanguage = computed(() => t('language'))
  const tDarkMode = computed(() => t('darkMode'))
  const tFooter = computed(() => t('footerText'))
  const tFooterLink = computed(() => t('footerLink'))
  const tFeedback = computed(() => t('feedback'))
</script>

<template>
  <v-layout class="fill-height">

    <!-- Main Content -->
    <v-main>
      <v-container
        class="pt-8 d-flex justify-center"
        style="height: 100%"
        width="100%"
      >
        <div style="width: 600px; max-width: 100%">
          <v-sheet
            class="py-4 px-4 d-flex mx-auto"
            elevation="4"
            max-width="600"
            rounded
            width="100%"
          >
            <!-- Header -->
            <v-col align="center" justify="center">
              <v-row flat>
                <v-switch
                  v-model="darkMode"
                  class="ma-4 shrink-card"
                  :label="tDarkMode"
                  rounded
                />
                <v-spacer />
                <v-select
                  v-model="language"
                  class="ma-4 shrink-card"
                  :items="languageItems"
                  :label="tLanguage"
                  rounded
                  style="max-width: 150px"
                  variant="outlined"
                />
              </v-row>
              <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                  <div class="image-box">
                    <img alt="logo" class="py-4 clippy-img" :src="imageSrc" width="256">
                  </div>
                  <a href="https://youtu.be/2_Dtmpe9qaQ" style="text-decoration: none;" target="_blank">
                    <h2
                      class="text-h5 font-weight-bold"
                      style="min-height: 4em; display: flex; align-items: center; justify-content: center"
                    >
                      <span v-if="prompt != null" v-html="formattedPrompt" />
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
            </v-col>
          </v-sheet>
        </div></v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="pa-0 bg-background">
      <v-col class="pa-0">
        <v-row class="ma-0 px-4 pb-2">
          <v-spacer />
          <span class="text-medium-emphasis text-caption">
            {{ tFeedback }}: spam@mitja.fi
          </span>
        </v-row>
        <v-sheet
          class="py-4 d-flex align-center justify-center flex-wrap text-center mx-auto"
          elevation="4"
          width="100%"
        >
          <p class="text-caption text-center ma-0">
            <a
              class="text-error"
              :href="tFooterLink"
              style="text-decoration: none; font-weight: bold;"
              target="_blank"
            >
              {{ tFooter }}
            </a>
          </p>
        </v-sheet>
      </v-col>
    </v-footer>
  </v-layout>
</template>

<style scoped>
.shrink-card {
  display: inline-block;
  max-width: 100%;
}

.image-box {
  width: 128px;
  height: 128px;
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clippy-img {
  width: 256px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
