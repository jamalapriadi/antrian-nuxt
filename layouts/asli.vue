<template>
    <div class="container">
        <div class="text-center mb-4">
            <Logo />
        </div>
        <nuxt />
    </div>
</template>

<script>
export default {
    head:{
        bodyAttrs:{
            class:'border-top-wide border-primary d-flex flex-column'
        }
    },
    data(){
        return {
            
        }
    }
}
</script>