export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  roles: Roles;
}

export interface Roles { 
  subscriber?: boolean;
  admin?: boolean;
}

export interface Item {  
  id:string;
  Name:string;
  upvote:number;
  downvote:number;
  type:string;
  description:string;
  image:string;
}