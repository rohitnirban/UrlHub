export const getNameInitials = (name:string) =>{
    const nameFirstPart = name.split(' ')[0];
    const nameSecondPart = name.split(' ')[1];
    if(nameSecondPart){
        return `${nameFirstPart[0]+nameSecondPart[0]}`
    }
    else{
        return `${nameFirstPart[0]}`
    }
}