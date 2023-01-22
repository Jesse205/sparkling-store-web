import { inject, onActivated, onDeactivated } from "vue";
import { useHomeStore } from '@/store/home';


export function useTitle(title) {
    const appName = inject('appName')
    onActivated(() => {
        document.title = title
    })

    onDeactivated(() => {
        document.title = appName
    })
}

export function useHomeTitle(title) {
    // const appName = inject('appName')
    const homeStore = useHomeStore()
    useTitle(title)
    onActivated(() => {
        homeStore.fragmentTitle = title
    })
}
