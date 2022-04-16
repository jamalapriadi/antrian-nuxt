<template>
    <div class="page page-center">
        <div class="container-tight py-4">
            <div class="text-center mb-4">
                <Logo />
            </div>
            <nuxt />
        </div>
    </div>
</template>

<script>
export default {
    head:{
        bodyAttrs:{
            class:''
        }
    },
    data(){
        return {
            
        }
    }
}
</script>