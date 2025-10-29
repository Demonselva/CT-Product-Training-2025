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
import { Admin } from './admin/admin';
import { Addproducts } from './addproducts/addproducts';
import { Productlist } from './productlist/productlist';
import { Component } from '@angular/core';
import { Demo } from './demo/demo';

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
        path:'main',
        component:Mainlayout,
        children:[
            {path:'liveOrders',component:Liveorders},
            {path:'orderHistory',component:OrderHistory},
            {path:'stock',component:Stock},
            {path:'message',component:Message},
            {path:'products',component:Products},
            {path:'offers',component:Offers},
            {path:'demo',component:Demo},
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
