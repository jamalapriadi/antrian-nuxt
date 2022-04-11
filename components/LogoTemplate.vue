<template>
    <a href="#" class="navbar-brand navbar-brand-autodark">
        <img :src="logoUrl" style="height:90px">
    </a>
</template>

<script>
export default {
    data(){
        return {
            namaCompany:process.env.NAMA_COMPANY,
            logoUrl:process.env.LOGO_URL_GEDE
        }
    }
}
</script>