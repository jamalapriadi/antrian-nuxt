<template>
    <div class="mb-3">
        <label class="form-check">
            <input type="checkbox" class="form-check-input"/>
            <span class="form-check-label">{{label}}</span>
        </label>
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