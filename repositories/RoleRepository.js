const resource = '/api/auth/role'

export default ($axios) =>({
    perPage(data){
        return $axios.get(`${resource}`, {params:data})
    },

    all(){
        return $axios.get('/api/auth/all-role')
    },

    save(payload){
        return $axios.post(`${resource}`, {
            kode:'',
            nama: payload.nama
        })
    },
    
    show(id){
        return $axios.get(`${resource}/${id}`)
    },

    update(id, payload){
        return $axios.put(`${resource}/${id}`, {nama:payload});
    },

    delete(id){
        return $axios.delete(`${resource}/${id}`)
    }
}) 