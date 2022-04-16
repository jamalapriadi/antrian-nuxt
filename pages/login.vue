<template>
    <div>
        <div class="card card-md bg-hijau">
            <div class="card-body">
                <h2 class="card-title text-center mb-4 text-white">Login ke akun anda</h2>

                <message :finish="isFinish" :success="success" :message="message" />
                
                <form-generator :list="form" :btnText="'Login'" :btnClass="'btn btn-warning w-100'" @submit="handleSubmit" :errors="errors" />

                <!-- <div class="hr-text">or</div>

                <a href="#" class="btn btn-google w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path></svg>
                    Login with Google
                </a> -->
            </div>
        </div>
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
            form:[
                {
                    label:"Email",
                    model: 'username',
                    name:'username',
                    id:'input-username',
                    type:'text',
                    placeholder:'Email',
                    required:true,
                    kelas:'username-email'
                },
                {
                    label:"Password",
                    model: 'password',
                    name:'password',
                    id:'input-password',
                    type:'password',
                    placeholder:'Password',
                    required:true,
                    kelas:'username-email',
                }
            ]
        }
    },
    methods:{

        onReset(){

        },
        handleInput(l,val){
            this.state[l] = val
        },

        loginWithGoogle(){
            window.location.href = `${process.env.LARAVEL_ENDPOINT}/api/auth/redirect/google?source=login`;
        },

        async handleSubmit(val){
            this.loading = true
            this.isFinish = 1
            this.$nuxt.$loading.start()

            try {
                await this.$auth.loginWith('laravelJWT', {
                    data: {
                        username: val.username,
                        password: val.password,
                        source: 'login'
                    }
                }).then(response => {
                    this.loading = false
                    this.isFinish = 2

                    if(response.data.success == true)
                    {
                        this.message = response.data.message
                        this.success = true
                        this.$router.replace("/home");
                    }else{
                        this.success = false
                        this.messageclass = "alert alert-danger";
                        this.message = response.data.message
                    }
                })
            } catch (e) {
                if(e.response.status == 401)
                {
                    this.isFinish = 2
                    this.loading = false;
                    this.success = false
                    this.message = e.response.data.message;
                    this.errors = e.response.data.errors;
                }

                if(e.response.status == 422)
                {
                    this.isFinish = 2
                    this.loading = false;
                    this.success = false
                    this.message = e.response.data.message;
                    this.errors = e.response.data.errors;
                }
            }
        }
    }
}
</script>

<style>
body{
    background-color:#133a1e !important;
}

.bg-hijau{
    background-color: #419f64;
}

.text-white{
    color:#fff;
}
</style>