// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
      // '@vite-pwa/nuxt',
      '@vueuse/nuxt',
      '@nuxt/content',
  ],

  // pwa: {
  //     manifest: {
  //         name: 'K0OZK, Rich Clingman',
  //         short_name: "K0OZK",
  //         description: "K0OZK in Ozark, Missouri, USA",
  //
  //         id: "/", // starting url
  //         icons: [
  //             {
  //                 src: "/icons/icon.svg",
  //                 sizes: "any",
  //             },
  //             {
  //                 src: "/icons/icon_192x192.png",
  //                 sizes: "192x192",
  //                 type: "image/png",
  //             },
  //         ]
  //     },
  //     workbox: {
  //         navigateFallback: '/',
  //     },
  //     devOptions: {
  //         enabled: true,
  //         type: "module",
  //     }
  // },
  devtools: {enabled: true},

  // @ts-ignore
  css: [
      "@/assets/style/main.sass",
  ],

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  vite: {
      css: {
          preprocessorOptions: {
              sass: {
                  // allows $primary, etc., to be used in any style/vue<style>
                  additionalData: '@use "@/assets/style/_colors.sass" as *\n'
              }
          }
      }
  },

  compatibilityDate: "2024-07-19",
})