<template>
    <div>
        <div v-if="finish == 1" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-if="success == true && finish == 2" class="alert alert-success" role="alert">
            <div class="text-muted" v-html="message"></div>
        </div>

        <div v-if="success == false && finish == 2 && message" class="alert alert-danger" role="alert">
            <div class="text-muted" v-html="message"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        success:{
            type:Boolean,
            default: false
        },
        message:{
            type:String,
            default:""
        },
        finish:{
            default:1
        }
    }
}
</script>