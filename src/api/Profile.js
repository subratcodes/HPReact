
const baseUrl='https://fakerapi.it/api/v1/users?_quantity=1';


  export async function getdummyUser(){

    try {
        let data=await fetch(baseUrl);
        let json= await data.json()
        console.log(json.data);
        return new APIResponsse(false,json.data[0]);

    } catch (error) {

        return new APIResponsse(true,null);
    }


}




class APIResponsse{

constructor(error,data){
    this.error=error;
    this.data=data;
}


}

