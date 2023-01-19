import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            name: null,
            nameShow: '未登录',
            loginState: false,
            developerType: null,
            avatar: '/images/icon.svg',
            email: null,
            uid: null,
        }
    },
    getters: {

    },
    actions: {
        login() {
            this.loginState = true
            this.name = 'Jesse205'
            this.nameShow = this.name || '粼光用户'
            this.developerType = ['Android', 'Web', 'Windows']
            this.avatar = 'https://q1.qlogo.cn/g?b=qq&nk=2055675594&s=640'
            this.email = 'jesse205@foxmail.com'
            this.uid = '666666666'
            
        },
        logout() {
            this.loginState = false
            this.name = null
            this.nameShow = '未登录'
            this.developerType = null
            this.avatar = '/images/icon.svg'
            this.email = null
            this.uid = null
        },
    },
});
