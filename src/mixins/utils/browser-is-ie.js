export default {
    methods: {
        isIE() {
            const inBrowser = typeof window !== "undefined"
            const browser_UA = inBrowser && window.navigator.userAgent.toLowerCase()
            const browser_isIE = browser_UA && /msie|trident/.test(browser_UA)
            
            if (browser_isIE) return true
            else return false 
        }
    }
} 