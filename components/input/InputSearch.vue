<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <div class="input-icon mb-3">
            <input type="text" class="form-control" placeholder="Search…">
            <span class="input-icon-addon">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
            </span>
        </div>
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