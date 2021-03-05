export default {
    methods: {
        generateYearsList() {
            const startYear = new Date().getFullYear()
            const endYear = 1895
            let years = []

            for (let i = startYear; i >= endYear; --i) {
                if (i) years.push(i)
            }

            return years
        }
    }
}