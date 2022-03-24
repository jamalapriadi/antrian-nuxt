<template>
    <div>
        <client-only placeholder="loading...">
            <ckeditor-nuxt :config="editorConfig"  />
        </client-only>
    </div>
</template>

<script>
export default {
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    data(){
        return {
            editorConfig: {
                simpleUpload: {
                    uploadUrl: process.env.LARAVEL_ENDPOINT+'/api/uploads',
                    headers: {
                        // 'Authorization': 'optional_token'
                        'accept': 'application/json'
                    }
                },
                removePlugins: [
                    'Title',
                    'Code',
                    'Superscript',
                    'Subscript',
                    'PageBreak',
                    'MathType'
                ],
            },
        }
    }
}
</script>

<style>
    .ck-editor__editable {
        min-height: 150px;
    }
</style>