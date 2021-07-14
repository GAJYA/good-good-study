import myInput from '../' //导入的是index.js

export default {
    title: 'input',
    component: myInput
}

export const Text = () => ({
   components: {myInput},
    template: '<my-input v-model="value"></my-input>',
    data(){
    return {
        value: 'admin'
    }
}
})

export const Password =  () => ({
   components: {myInput},
    template: '<my-input type="password" v-model="value"></my-input>',
    data(){
    return {
        value: 'admin'
    }
}
})