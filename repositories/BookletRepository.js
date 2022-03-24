const resource = '/api/auth/booklet'

export default ($axios) =>({
    perPage(data){
        return $axios.get(`${resource}`, {params:data})
    },
    
    all(){
        return $axios.get('/api/auth/booklet-all')
    },

    save(payload){
        return $axios.post(`${resource}`, payload)
    },
    
    show(id){
        return $axios.get(`${resource}/${id}`)
    },

    update(id, payload){
        return $axios.put(`${resource}/${id}`, payload);
    },

    delete(id){
        return $axios.delete(`${resource}/${id}`)
    },
}) 