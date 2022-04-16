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
            class:'bg-main border-top-wide border-primary d-flex flex-column'
        }
    },
    data(){
        return {

        }
    }
}
</script>

<style>
.bg-main{
    background-color:#fff !important;
}
.card{
    border:none;
    border-radius:0;
    /* border-top:1px solid #419f64; */
    border-bottom: 4px solid #133a1e;
}

.btn-primary{
    background:#133a1e;
    border: none;
}

.btn-primary:hover{
    background-color: #419f64;
    border:none;
}

table{
    border-left: 1px solid #133a1e !important;
    border-right: 1px solid #133a1e !important;
}

table tbody tr{
    border-bottom: 1px solid #133a1e !important;
}
.markdown>table thead th, .table thead th {
    background: #133a1e !important;
    color: #fff;
    border-radius: 0;
}

.form-control{
    border:1px solid #133a1e;
}

.form-select{
    border:1px solid #133a1e;
}

h2.page-title{
    color:#133a1e;
    font-weight: bold;
}
/* .wrapper{
    background-color:#fff !important;
} */
</style>