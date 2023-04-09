// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],
    headlessui: {
        prefix: "Headless",
    },
    // @ts-ignore
    app: {},
    runtimeConfig: {
        FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    },
})
