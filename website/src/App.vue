<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  theme.themes.value.light = {
    ...theme.themes.value.light,
    colors: {
      ...theme.themes.value.light.colors,
      background: '#f0f3f5ff', // soft off-white color
    },
  }
</script>
