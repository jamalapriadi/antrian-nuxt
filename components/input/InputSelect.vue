<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <select class="form-select" >
            <option v-for="(l,idx) in list" :key="idx" :value="l.id">{{l.text}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            required: true
        },
        list:{
            type:Object,
            required:true
        }
    }
}
</script>