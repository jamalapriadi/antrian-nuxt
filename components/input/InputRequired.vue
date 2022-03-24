<template>
    <div class="mb-3">
        <label class="form-label required">{{label}}</label>
        <input type="text" class="form-control" placeholder="Required..." >
    </div>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            required: true
        }
    }
}
</script>