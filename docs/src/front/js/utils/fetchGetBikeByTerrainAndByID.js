import swal from 'sweetalert2';

const fetchGetBikeByTerrainAndByID =(terrain, ID, bikeSetter)=>{

  return fetch(process.env.REACT_APP_API + "bikes/"+terrain+"/"+ID,
  {method: 'GET' })
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
      return res.json()
  })
  .then((data)=>{
    bikeSetter(data);
      
  })
    .catch((err)=>console.log(err))

}

export default fetchGetBikeByTerrainAndByID;