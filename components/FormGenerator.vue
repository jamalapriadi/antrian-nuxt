<template>
    <form @submit.prevent="onSubmit" @reset="onReset">
        <div v-for="(l,idx) in list" :key="'f'+idx" class="mb-3">
            <label class="form-label required text-white">{{l.label}}</label>
            <input v-if="l.type == 'text'" class="form-control" :class="{'is-invalid': errors[l.model]}" type="text" v-model="state[l.model]" :placeholder="l.placeholder"/>

            <input-password v-if="l.type =='password'" @input="handleInput" :list="l" v-model="state[l.model]" />

            <!-- <span v-if="l.type == 'password'" style="font-size:10px;font-weight:bold" class="text-white">Password harus berisi minimal 8 karakter dan 1 angka</span> -->
            
            <span v-if="errors">
                <p class="text-danger" v-if="errors[l.model]">{{ errors[l.model][0] }}</p>
            </span>
            
        </div>

        <div class="form-action">
            <button :class="btnClass" type="submit">{{btnText}}</button>
        </div>
    </form>
</template>

<script>
export default {
    props:{
        btnText:{
            type:String,
        },
        list:{
            type:Array,
            requred: true,
            default:[]
        },
        errors:{
            type:Object,
            default:{}
        },
        btnClass:{
            type:String,
        }
    },
    data(){
        return{
            state:[]
        }
    },
    methods:{
        onSubmit(){
            this.$emit('submit', this.state)
        },
        onReset(){

        },
        handleInput(l,val){
            this.state[l] = val
        },
    }
}
</script>