function memoize(slow_function){
    
    let resolved = false;

    const cached = cache_retrieve(/*input.key*/)
        .then((result) => {
            if(resolved){
                return;
            }
            resolved = true;
            return result;
        })
        

    const fresh = slow_function(/*input*/)
        .then((result) => {
            if(resolved){
                cache_store(/*key, result*/)
                return;
            }
            resolved = true;
            cache_store(/*key, result*/)
            return result;
        })

     
    return Promise.any([cached, fresh])
       
}