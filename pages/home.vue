<template>
    <div>
        <div v-for="(l,idx) in $auth.user.data.role" :key="'per'+idx">
            <operation v-if="l.name == 'Operation'" />
        </div>

        <!-- <pre>{{$auth.user.data}}</pre> -->

        
    </div>
</template>

<script>
export default {
    layout:'main'
}
</script>