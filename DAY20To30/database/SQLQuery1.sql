--create database;

CREATE DATABASE Bringova;

--creating user table


CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    dob DATE,
    gender NVARCHAR(10),
    mobile_number VARCHAR(15),
    user_added_date DATETIME DEFAULT GETDATE()
);

--Creating Products table
CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,      
    product_name NVARCHAR(255) NOT NULL,
    product_description NVARCHAR(MAX) NULL,         
    offer_price DECIMAL(10,2) NULL,                 
    price DECIMAL(10,2) NOT NULL,                   
    stock NVARCHAR(20) NOT NULL,                   
    product_added_date DATETIME DEFAULT GETDATE(),  
    product_edited_date DATETIME NULL              
);

--Creating orders table

CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(user_id) ON DELETE CASCADE,
    product_id INT FOREIGN KEY REFERENCES Products(product_id) ON DELETE CASCADE,
    address NVARCHAR(255),
    payment_method NVARCHAR(50),
    payment_status NVARCHAR(50),
    delivery_status NVARCHAR(50),
    message NVARCHAR(255),
    message_date DATETIME,
    order_date DATETIME DEFAULT GETDATE(),
    total_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
);

