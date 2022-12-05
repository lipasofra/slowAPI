const get_from_cache = () => {
    return new Promise ((resolve, reject) => {
      if(false){
        setTimeout(()=>{
            resolve("get_from_cache good");
        },3000)
        
      } else {
         reject(new Error("get_from_cache bad"))
      }
      
    })
  }
  
  const store_to_cache = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
            resolve("stored to cache");
        },1000)
      
    })
  }
  
  const get_from_DB = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
            resolve("get from the DataBase");
        },5000)
      
    })
  }
  
  async function cache_retrieve(){
    try{
      const retorno = await get_from_cache();
  //     console.log("retorno ", retorno)
      return retorno
    }catch(error){
      throw new Error(error)
    }
  }
  
  async function cache_store(){
    const retorno = await store_to_cache();
    console.log(retorno)
    return retorno
  }
  
  async function slow_function(){
    const retorno = await get_from_DB();
    return retorno
  }


  function memoize(slow_function){
    
    let resolved = false;

    const cached = cache_retrieve()
        .then((result) => {
            if(resolved){
                console.log("cache se demoró")
                return;
            }
            resolved = true;
            console.log("me resolvi cached: ", result)
            return result;
        })
        // .catch((error) => {
        //     // console.log(error)
        //     console.log(error.message)
        // })

    const fresh = slow_function()
        .then((result) => {
            if(resolved){
                console.log("de fresh a cache")
                cache_store(/*result*/)
                return;
            }
            resolved = true;
            console.log("me resolvi fresh")
            cache_store(/*result*/)
            return result;
        })
     
     return Promise.any([cached, fresh])
       
  }

  const res = memoize(slow_function)
    res.then(result => console.log("lolo", result))
