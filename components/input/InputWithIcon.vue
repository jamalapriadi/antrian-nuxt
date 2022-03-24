<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <div class="input-icon mb-3">
            <span class="input-icon-addon">
                <span v-html="iconSvg"></span>
            </span>
            <input type="text" class="form-control" :placeholder="label">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            required: true
        },
        iconSvg:{
            type:String,
            required: true
        }
    }
}
</script>