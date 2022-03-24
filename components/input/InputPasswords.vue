<template>
    <div class="mb-2">
        <label class="form-label">{{label}}</label>
        <div class="input-group input-group-flat">
            <input type="password" class="form-control"  placeholder="Password" autocomplete="off">
            <span class="input-group-text">
                <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
                </a>
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