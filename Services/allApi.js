import serverUrl from './serverUrl'
import commonApi from './commonApi'


// Api for register

export const registerAPI=async(reqBody)=>{
   return await commonApi("POST",`${serverUrl}/register`,reqBody)
}

// Api for login

export const loginAPI=async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody)
 }

 // Api for addProject

 export const addProjectAPI=async(reqBody,reqHeader)=>{
   return await commonApi("POST",`${serverUrl}/add-projects`,reqBody,reqHeader)
}

//Api for GetHomeProjects

export const getHomeProjectAPI=async()=>{
   return await commonApi("GET",`${serverUrl}/get-home-projects`," ")
}

//Api for GetAllProjects

export const getAllProjectAPI=async(searchKey,reqHeader)=>{
   return await commonApi("GET",`${serverUrl}/get-all-projects?search=${searchKey}`,"",reqHeader)
}

//Api for GetUserProjects

export const getUserProjectAPI=async(reqHeader)=>{
   return await commonApi("GET",`${serverUrl}/get-user-projects`,"",reqHeader)
}

//Api for updateProject

export const editProjectAPI=async(pid,reqBody,reqHeader)=>{
   return await commonApi("PUT",`${serverUrl}/edit-project/${pid}`,reqBody,reqHeader,"")
}

//Api for deleteProject

export const deleteProjectAPI=async(pid,reqHeader)=>{
   return await commonApi("DELETE",`${serverUrl}/delete-project/${pid}`,{},reqHeader)
}

//Api for userProfileUpdate
export const editProfileAPI=async(reqBody,reqHeader)=>{
   return await commonApi("PUT",`${serverUrl}/edit-profile`,reqBody,reqHeader,)
}