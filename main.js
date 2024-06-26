function main(){
    //Initialize local storage if not already initialized
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('productId')) {
        localStorage.setItem('productId', JSON.stringify(0));
    }
    if (!localStorage.getItem('userId')) {
        localStorage.setItem('userId', JSON.stringify(0));
    }

    const user = new User("name","email", "password");
    while(true){
        let users = getItemsFromLocalStorage("users");
        const choice = prompt("Welcome to our E-Commerce\n1. Log in\n2. Sign up");
        switch(choice){
            case "1":
                let loggedInUser = user.logIn(users);
                promptUserActions(loggedInUser);
                break;
            case "2":
                user.signUp(users);
                break;
            default:
                alert("Invalid Choice,Please try again 1 ||  2");
        }
    }
    function promptUserActions(user) {
        let continueSession = true
        while (continueSession) {
            let users = getItemsFromLocalStorage("users")
            let products = getItemsFromLocalStorage("products")
            const product = new Product();
            let choice
            if (user.type == "admin") {
                const admin = new Admin("Username", "Email", "Password", "accessLevel");
                choice = prompt("Admin:\n1. Add Product\n2. Show all Products\n3. Edit  Product\n4. Delete a Product\n5. View existing Users\n6. Delete User\n7.to Log out\n")
                switch (choice) {
                    case "1":
                        products = admin.addProduct(products)
                        break;
                    case "2":
                        product.displayProducts(products)
                        break;
                    case "3":
                        products = admin.editProduct(products)
                        break;
                    case "4":
                        products = admin.deleteProduct(products)
                        break
                    case "5":
                        admin.displayUsers(users)
                        break
                    case "6":
                        users = admin.deleteUser(users)
                        break
                    case "7":
                        alert("ciaoo Admin...")
                        continueSession = false
                        break
                    default:
                        alert("Invalid choice. try again and choose from 1->7");
                }
            }
            else {
                const userObject = new User(0, "Username", "Email", "Password", "accessLevel");
                const shoppingCart = new ShoppingCart([], 0)
                choice = prompt("User:\n1. Show all the Products\n2. Add a product to your Cart\n3. show your shopping cart's items\n4.see your account Details\n5. Delete a product \n6.Log out")
                switch (choice) {
                    case "1":
                        product.displayProducts(products)
                        break
                    case "2":
                        users = shoppingCart.addItem(user.userIndex, users, products)
                        break
                    case "3":
                        shoppingCart.displayCart(user.userIndex, users)
                        break
                    case "4":
                        userObject.browseInfo(user)
                        break
                    case "5":
                        users = shoppingCart.removeProductFromCart(user.userIndex, users)
                        break
                    case "6":
                        alert("ciaoo");
                        continueSession = false
                        break
                    default:
                        alert("Invalid choice,try again and choose from 1->7")
                }
            }
            setItemsToLocalStorage(users, "users")
            setItemsToLocalStorage(products, "products")
        }
    }
}

main();