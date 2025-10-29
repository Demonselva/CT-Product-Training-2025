import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Mainlayout } from './mainlayout/mainlayout';
import { Liveorders } from './liveorders/liveorders';
import { OrderHistory } from './order-history/order-history';
import { Stock } from './stock/stock';
import { Message } from './message/message';
import { Products } from './products/products';
import { Offers } from './offers/offers';
import { Admin } from './admincom/admin/admin';
import { Addproducts } from './admincom/addproducts/addproducts';
import { Productlist } from './admincom/productlist/productlist';
import { Component } from '@angular/core';
import { Demo } from './demo/demo';
import { Updateprofile } from './updateprofile/updateprofile';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
         
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'register',
        component:Register
    },
    {
        path:'main/:id',
        component:Mainlayout,
        children:[
            {path:'liveOrders',component:Liveorders},
            {path:'orderHistory',component:OrderHistory},
            {path:'stock',component:Stock},
            {path:'message',component:Message},
            {path:'products',component:Products},
            {path:'offers',component:Offers},
            {path:'demo',component:Demo},
            {path:'update-profile',component:Updateprofile},
        ]
    },
      {
        path:'admin',
        component:Admin,
        children:[
            {path:'Addproduct',component:Addproducts},
            {path:'ProductList',component:Productlist},
            
        ]
    },
    
    

];
