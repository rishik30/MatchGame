var HELPER = {

    emptyArray: (array) => {
        while(array.length) {
            array.pop()
        }
    },

    randomize: (arr) => {
        for(var i = arr.length-1; i > 0; i--) {
            let j = Math.floor(Math.random()*arr.length)
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
        return arr
    }

}

export default HELPER
