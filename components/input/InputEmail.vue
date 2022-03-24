<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <input type="email" class="form-control" placeholder="Enter email">
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