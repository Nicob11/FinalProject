import swal from 'sweetalert2'

const fetchSingup = (data)=>{

    return fetch(process.env.REACT_APP_API  + "signup",
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)})
        .then((res)=>{
          if (res.status != 200) {
            // swal.fire({
            //   confirmButtonColor: '#ffd102',
            //   icon: 'error',
            //   title: 'Bike4U',
            //   text: `Error: ${res?.data?.msg}`,
            // })
            throw new Error("Error en la petición");
          } 
          //console.log(res);
          return true;
        })
        .catch((err)=>{
          console.log(err)
          return false;
        })

}

export default fetchSingup
