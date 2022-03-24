<template>
    <div class="mb-3">
        <label class="form-label">{{label}} <span class="form-label-description">{{inputNumber}}/{{maxNumber}}</span></label>
        <textarea class="form-control" rows="6" placeholder="Content..">

        </textarea>
    </div>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            required: true
        },
        inputNumber:{
            type:Number,
            default:0
        },
        maxNumber:{
            type:Number,
            default:0
        },
    }
}
</script>