<template>
    <div>
        <h1>Tampil Layar</h1>
    </div>
</template>

<script>
export default {
    auth:false,
    layout:'auth',
    data(){
        return {
            isFinish:0,
            success:false,
            errors:{},
            state:[],
            loading: false,
            messageclass: "",
            message: "",
        }
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>