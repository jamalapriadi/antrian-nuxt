<template>
    <div class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar navbar-light bg-success">
                <div class="container-xl">
                    <ul class="navbar-nav">
                        <li v-for="(l,idx) in menus" :key="'menu'+idx" v-bind:class="getClass(l)">
                            <nuxt-link :to="l.to" v-bind:class="getClassMenu(l)" v-if="l.type == 'menu' && l.access == true" style="color:white !important">
                                <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                                <span class="nav-link-title" v-html="l.title"></span>
                            </nuxt-link>

                            <nuxt-link v-if="l.type == 'dropdown' && l.access == true" :to="l.to" v-bind:class="getClassMenu(l)" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" style="color:white !important">
                                <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                                <span class="nav-link-title" v-html="l.title"></span>
                            </nuxt-link>

                            <div v-if="l.type == 'dropdown'" class="dropdown-menu">
                                <nuxt-link v-for="(k,ix) in l.submenu" :key="'sub'+ix" :to="k.to" class="dropdown-item">
                                    {{k.title}}
                                </nuxt-link>
                            </div>
                        </li>
                    </ul>
                    <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menus:[
                {
                    to:'/home',
                    type:'menu',
                    title:'Home',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>',
                    class:'active',
                    permission:'Show Home',
                    access:false,
                    submenu:[]
                },
                {
                    to:'/pelayanan',
                    type:'menu',
                    title:'Pelayanan',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 11l2 2l4 -4" /></svg>',
                    class:'',
                    permission:'Show Pelayanan',
                    submenu:[]
                },
                {
                    to:'/receptionist',
                    type:'menu',
                    title:'Receptionist',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg>',
                    class:'',
                    permission:'Show Receptionist',
                    access:false,
                    submenu:[]
                },
                {
                    to:'/keperluan',
                    type:'menu',
                    title:'Keperluan',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3" /><path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3" /></svg>',
                    class:'',
                    permission:'Show Keperluan',
                    access:false,
                    submenu:[]
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'User Management',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>',
                    class:'',
                    permission:'Show User Management',
                    access:false,
                    submenu:[
                        {
                            to:'/users',
                            title:'User'
                        },
                        {
                            to:'/roles',
                            title:'Roles'
                        },
                        {
                            to:'/permissions',
                            title:'Permission'
                        },
                    ]
                }
            ]
        }
    },
    mounted(){
        this.getAccess()
    },
    methods:{
        getAccess(){
            for(var a=0; a<this.$auth.user.data.permissions.length; a++)
            {
                for(var b=0; b<this.menus.length; b++)
                {
                    if(this.menus[b].permission == this.$auth.user.data.permissions[a].name)
                    {
                        this.menus[b].access = true
                    }
                }
            }
        },
        getClass(l){
            if(l.submenu.length > 0){
                return 'nav-item dropdown'
            }else{
                return 'nav-item'
            }
        },

        getClassMenu(l){
            if(l.type == 'menu')
            {
                return 'nav-link'
            }else if(l.type == 'dropdown'){
                return 'nav-link dropdown-toggle'
            }
        }
    }
}
</script>