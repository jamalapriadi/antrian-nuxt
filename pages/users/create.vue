<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />
        <nuxt-crud-form-generator 
        :list="forms" :errors="errors" :title="title" :nmodel="nmodel" :btnText="btnText" :backBtn="backBtn" 
        @submit="handleSubmit"
        @changeImage="handleChangeImage"
        @handleInputPassword="changeHandleInputPassword" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    computed:{
        ...mapState('user',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel
        })
    },
    data(){
        return {
            title:"Create New User",
            btnText: "Save",
        }
    },
    methods:{
        ...mapActions('user',['save','changeImage','changeHandlePassword']),

        handleSubmit(val){
            this.save(val)
        },

        handleChangeImage(e){
            this.changeImage(e)
        },

        changeHandleInputPassword(e){
            this.changeHandlePassword(e)
        }
    }
}
</script>