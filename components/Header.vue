<template>
    <header class="navbar navbar-expand-md navbar-light d-print-none">
        <div class="container-xl">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href=".">
                <LogoTemplate />
                </a>
            </h1>
            <div class="navbar-nav flex-row order-md-last">
            
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span class="avatar avatar-sm" style="background-image: url('~/assets/static/avatars/000m.jpg')"></span>
                        <div class="d-none d-xl-block ps-2">
                            <div>{{$auth.user.data.name}}</div>
                            <!-- <div class="mt-1 small text-muted">UI Designer</div> -->
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <!-- <a href="#" class="dropdown-item">Set status</a>
                        <a href="#" class="dropdown-item">Profile & account</a>
                        <a href="#" class="dropdown-item">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">Settings</a> -->
                        <a @click.prevent="logout" href="#" class="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods:{
        logout() {
            this.$swal({
                title: 'Keluar?',
                text: 'Apakah anda yakin ingin keluar?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Keluar',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.$auth.logout();
                    this.$router.replace("/login");
                }
            })
        }
    }
}
</script>