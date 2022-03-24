<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />
        <nuxt-crud-form-generator :list="forms" :errors="errors" :title="title" :nmodel="nmodel" :btnText="btnText" :backBtn="backBtn" @submit="handleSubmit"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    computed:{
        ...mapState('merchant',{
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
            title:"Create New Merchant",
            btnText: "Save",
        }
    },
    methods:{
        ...mapActions('merchant',['save']),

        handleSubmit(val){
            this.save(val)
        }
    }
}
</script>