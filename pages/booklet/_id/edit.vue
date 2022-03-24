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
        ...mapState('booklet',{
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
            title:"Update Booklet",
            btnText: "Save",
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('booklet',['update','show','changeImage','changeHandlePassword']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.show(id)
        },

        handleSubmit(val){
            this.update(val)
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