<template>
    <a href="#" class="navbar-brand navbar-brand-autodark">
        <img :src="logoUrl" class="img-fluid" style="width:120px">
    </a>
</template>

<script>
export default {
    data(){
        return {
            namaCompany:process.env.NAMA_COMPANY,
            logoUrl:process.env.LOGO_URL
        }
    }
}
</script>