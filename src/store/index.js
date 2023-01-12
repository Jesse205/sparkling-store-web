import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useStore = defineStore('main', () => {
    // SnackBar
    const snackbar = ref(false)
    const snackbarText = ref(null)
    function showSnackBar(text) {
        snackbar.value = true
        snackbarText.value = text
    }
    return {
        snackbar, snackbarText, showSnackBar
    }
})
