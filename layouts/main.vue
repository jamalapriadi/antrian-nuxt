<template>
    <div class="wrapper">
        <Header />
        <Navigation />

        <div class="page-wrapper">
            <slot name="pageheader"></slot>

            <div class="page-body">
                <div class="container-xl">
                    <!-- Content here -->
                    <nuxt />
                </div>
            </div>

            <Footer />
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