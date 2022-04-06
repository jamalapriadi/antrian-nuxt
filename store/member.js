export const state = () => ({
    judul: 'Member',
    fields:[
        {key:'No', label:'No.', sortable:false, thStyle:{with:'5%'}},
        {key:'first_name', label:'First Name', sortable:false},
        {key:'last_name', label:'Last Name', sortable:false},
        // {key:'address', label:'Alamat', sortable:false},
        {key:'phone', label:'Phone', sortable:false},
        {key:'activemember', label:'Active', sortable:false},
        {key:'qrmember', label:'QRCode', sortable:false, thStyle:{width:'15%'}},
        {key: 'actions',label:'', sortable: false, thStyle:{width:'15%'}}, 
    ],
    addLink: '/member/create',
    btnAction:true,
    btnImport:true,
    edit_data_form: '/member',
    backBtn:'/member',
    lists:[],
    list:{},
    meta:{
        total: null,
        current_page: null,
        per_page: null,
        from: null,
        to: null
    },
    current_page:1,
    per_page:10,
    search:'',
    sortBy:'created_at',
    sortByDesc:false,
    success:false,
    isFinish:0,
    message:"",
    errors:{},
    forms:[
        {
            label:"Type",
            model: 'type',
            name:'type',
            id:'input-nama',
            type:'select',
            placeholder:'Masukkan Type',
            required:true,
            list:[
                {
                    id:'SH',
                    nama:'SH'
                }
            ]
        },
        {
            label:"Title",
            model: 'title',
            name:'title',
            id:'input-nama',
            type:'select',
            placeholder:'Masukkan Title',
            required:true,
            list:[
                {
                    id:'Mr.',
                    nama:'Mr.'
                },
                {
                    id:'Mrs.',
                    nama:'Mrs.'
                }
            ]
        },
        {
            label:"First Name",
            model: 'first_name',
            name:'first_name',
            id:'input-name',
            type:'text',
            placeholder:'Masukkan First Name',
            required:true
        },
        {
            label:"Last Name",
            model: 'last_name',
            name:'last_name',
            id:'input-name',
            type:'text',
            placeholder:'Masukkan last Name',
            required:true
        },
        {
            label:"VIP Level",
            model: 'vip_level',
            name:'vip_level',
            id:'input-vip',
            type:'number',
            placeholder:'Masukkan VIP Level',
            required:true
        },
        {
            label:"Registration Date",
            model: 'registration_date',
            name:'registration_date',
            id:'input-registration_date',
            type:'date',
            placeholder:'Masukkan Registration Date',
            required:true
        },
        {
            label:"Renew Date",
            model: 'renew_date',
            name:'renew_date',
            id:'input-renew_date',
            type:'date',
            placeholder:'Masukkan renew Date',
            required:true
        },
        {
            label:"Valid Until",
            model: 'valid_until',
            name:'valid_until',
            id:'input-valid_until',
            type:'date',
            placeholder:'Masukkan valid until',
            required:true
        },
        {
            label:"Address",
            model: 'address',
            name:'address',
            id:'input-address',
            type:'textarea',
            placeholder:'Masukkan Address',
            required:true
        },
        {
            label:"Phone",
            model: 'phone',
            name:'phone',
            id:'input-phone',
            type:'text',
            placeholder:'Masukkan phone',
            required:true
        },
        {
            label:"Fax",
            model: 'fax',
            name:'fax',
            id:'input-fax',
            type:'text',
            placeholder:'Masukkan fax',
            required:true
        },
        {
            label:"Contact",
            model: 'contact',
            name:'contact',
            id:'input-contact',
            type:'text',
            placeholder:'Masukkan contact',
            required:true
        },
        {
            label:"Email",
            model: 'email',
            name:'email',
            id:'input-email',
            type:'email',
            placeholder:'Masukkan email',
            required:true
        },
        {
            label:"Birthday",
            model: 'birthday',
            name:'birthday',
            id:'input-birthday',
            type:'date',
            placeholder:'Masukkan birthday',
            required:true
        },
        
        {
            label:"Foto",
            model: 'file',
            name:'file',
            id:'input-file',
            type:'image',
            placeholder:'Pilih Image',
            required:true,
            list:[]
        },
    ],
    nmodel:{
        kode:'',
        type:'SH',
        title:'Mr.',
        first_name:'',
        last_name:'',
        vip_level:5,
        registration_date:'',
        renew_date:'',
        valid_until:'',
        address:'',
        phone:'',
        fax:'',
        contact:'',
        email:'',
        birthday:'',
        image:'',
        image_url:''
    },
    alertMessage:"",
    roles:[]
})

export const mutations = {
    SET_ROLES(state,data){
        state.roles = data
    },

    CHANGE_IMAGE(state, file){
        state.nmodel.image = file
    },

    SET_MODEL(state, data){
        state.nmodel = {
            kode: data.id,
            type: data.type,
            title: data.title,
            first_name: data.first_name,
            last_name: data.last_name,
            vip_level:data.vip_level,
            registration_date: data.registration_date,
            renew_date: data.renewal_date,
            valid_until: data.valid_until,
            address: data.address,
            phone: data.phone,
            fax:data.fax,
            contact:data.contact,
            email:data.email,
            birthday:data.birthday,
            image: data.photo,
            image_url: data.photo_url
        }
    },

    SET_RESET_MODEL(state){
        state.nmodel={
            kode:'',
            type:'SH',
            title:'Mr.',
            first_name:'',
            last_name:'',
            vip_level:5,
            registration_date:'',
            renew_date:'',
            valid_until:'',
            address:'',
            phone:'',
            fax:'',
            contact:'',
            email:'',
            birthday:'',
            image:'',
            image_url:''
        }
    },

    SET_SEARCH(state, q){
        state.search = q
    },

    SET_CURRENT_PAGE(state, page){
        state.current_page = page
    },

    SET_PER_PAGE(state, page){
        state.per_page = page
    },

    SET_META_PAGE(state, page){
        state.meta = {
            total: page.total,
            current_page: page.current_page,
            per_page: page.per_page,
            from: null,
            to: null
        }
    },

    SET_LOAD_DATA(state, lists){
        state.lists = lists
    },

    SET_LIST_DATA(state, list){
        state.list = list
    },

    SET_SHOW_DATA(state, list){
        state.list = list
    },

    SET_MESSAGE(state, msg){
        state.message = msg
    },

    SET_SUCCESS(state, sucess){
        state.success = sucess
    },

    SET_ERROR(state, ero){
        state.errors = ero
    },

    SET_FINISH(state, isFinish){
        state.isFinish = isFinish
    },

    REMOVE_ALERT(state){
        state.message = ""
        state.success = false
        state.isFinish = 0
        state.alertMessage = ""
        this.errors={}
    },
}

export const actions = {
    async get_data({commit, state}){
        commit('SET_FINISH',1)
        commit('SET_RESET_MODEL')

        var params={
            per_page: state.per_page,
            page: state.current_page,
            q: state.search,
            sortby: state.sortBy,
            sortbydesc: state.sortByDesc ? 'DESC':'ASC'
        }
        const res = await this.$repositories.member.perPage(params)

        commit('SET_FINISH',2)

        if(res.status == 200 && res.data){
            commit('SET_LOAD_DATA', res.data)
            if(res.data.meta != null)
            {
                commit('SET_META_PAGE', res.data.meta.pagination)
            }
            
        }else{
            //handle error here
        }
    },

    /** fungsi untuk next page databale */
    async change_page({commit, dispatch}, val){
        commit('SET_CURRENT_PAGE',val)

        dispatch('get_data')
    },

    /** fungsi untuk change per_page */
    async change_per_page({commit, dispatch}, val){
        commit('SET_PER_PAGE', val.target.value)

        dispatch('get_data')
    },

    /** ketika search di ketik */
    async change_search_key({commit, dispatch}, val){
        commit('SET_SEARCH', val)
        dispatch('get_data')
    },

    /** menuju halaman edit **/
    goToEdit({state}, val){
        this.$router.push({ path: state.edit_data_form+'/'+val.item.id+"/edit" })
    },

    /** proses simpan data **/
    async save({commit, state}, payload){
        commit('SET_FINISH',1)

        try{
            const res = await this.$repositories.member.save(state.nmodel)
        
            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Data Berhasil disimpan')
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)

                this.$router.replace(state.backBtn)

            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)
            }
        }catch(e){
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false)

            if(e.response.data){
                commit('SET_MESSAGE',e.response.data.message)
                commit('SET_ERROR', e.response.data.errors)
            }

            setTimeout(() => {
                commit('REMOVE_ALERT');
            }, 3000)
            
            return;
        }
    },

    /** menampilkan single data **/
    async show({commit,state}, id){
        commit('SET_FINISH',1)

        const res = await this.$repositories.member.show(id)
        
        commit('SET_MODEL',res.data.data)
        commit('SET_FINISH',2)
    },

    /** update data **/
    async update({commit, state}, payload){
        commit('SET_FINISH',1)

        try{
            const res = await this.$repositories.member.update(state.nmodel.kode, state.nmodel)
        
            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Data Berhasil diupdate')
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)

                this.$router.replace(state.backBtn)

            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)
            }
        }catch(e){
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)

            setTimeout(() => {
                commit('REMOVE_ALERT');
            }, 3000)
            
            return;
        }
    },

    /** menampilkan popup hapus dan hapus data **/
    openDeleteModal({dispatch, commit}, val){
        this.$axios.delete(val.item.links.detail)
            .then(response => {
                if(response.data.success==true){

                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', 'Data Berhasil dihapus')
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)

                    dispatch('get_data')
                }else{
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', 'Data Gagal dihapus')
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)
                }
            })
    },

    changeImage({commit, state}, file){
        commit('CHANGE_IMAGE', file)
    },

    changeHandlePassword({commit}, e){
        commit('SET_PASSWORD')
    },

    
}