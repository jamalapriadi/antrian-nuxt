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
            class:'border-top-wide border-primary d-flex flex-column'
        }
    },
    data(){
        return {
            
        }
    }
}
</script>