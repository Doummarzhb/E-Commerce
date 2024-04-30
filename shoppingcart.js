class ShoppingCart {
    constructor(items,totalCost) {
        this.items = items || [];
        this.totalCost = parseFloat(totalCost) || 0;
    }


    addItem(userIndex,users,products) {
        let productId, productIndex, requiredQuantity, productExistIndex
        let idNotExist = true;
        let productNotAvailable = true
        let notValidQuantity = true
        let productExist = false
        let items = users[userIndex].shoppingCart.items
        console.log(items)
        let totalCost = users[userIndex].shoppingCart.totalCost
        productId = parseInt(prompt(`Please provide the Id of the product that you want to buy`), 10);
        // Validate if the product exists and is available
        while (idNotExist) {
            for (let i = 0; i < products.length; i++) {
                if (productId == products[i].id) {
                    idNotExist = false
                    productIndex = i
                    if (products[i].isAvailable == "0") {
                        productNotAvailable = false
                    }
                    break
                }
            }
            if (idNotExist == true) {
                productId = prompt("The id of the product that you provided is not exist in the system\nPlease check it out and try again")
            }
            if (!productNotAvailable) {
                alert("The product that you want is not available right now, Buy another one")
                return users
            }
        }
        // Prompt for the quantity of the product to be added to the cart
        const product = products[productIndex]
        while (notValidQuantity) {
            requiredQuantity = parseInt(prompt(`How many ${product.name} do you want?
make sure to add a number and for sure it has to be more than zero
Be sure that the quantity should be less than ${product.quantity}`), 10);
            if (!isNaN(requiredQuantity) && requiredQuantity > 0 && requiredQuantity < parseInt(product.quantity)) {
                notValidQuantity = false
            }
        }
        // Check if the product already exists in the cart
        for (let i = 0; i < items.length; i++) {
            if (productId == items[i].product.id) {
                productExist = true
                productExistIndex = i
                break
            }
        }
        // Update cart based on whether the product already exists
        if (productExist) {
            items[productExistIndex].requiredQuantity += requiredQuantity
            alert("the product that you want to buy is already exist in your shopping cart so the quantity that yoou want will be added to it")
        }
        else {
            items.push({ product, requiredQuantity })
            alert("The product has been added to your shopping cart")
        }
        totalCost = requiredQuantity * product.price
        users[userIndex].shoppingCart.items = items
        users[userIndex].shoppingCart.totalCost = users[userIndex].shoppingCart.totalCost + totalCost
        return users
    }

    removeItem(userIndex, users) {
        let requiredProducts = users[userIndex].shoppingCart.items;
        let productId = prompt("Please enter the ID of the product that you want to remove");
        const productIndex = requiredProducts.findIndex(item => item.product.id == productId);
        if (productIndex !== -1) {
            const removedProduct = requiredProducts.splice(productIndex, 1)[0];
            alert(`Product with ID ${productId} has been removed from the shopping cart.`);
            users[userIndex].shoppingCart.totalCost -= (removedProduct.product.price * removedProduct.requiredQuantity);
        } else {
            alert(`Product with ID ${productId} does not exist in the shopping cart.`);
        }
        return users
    }

    displayCart(userIndex , users) {
        console.log("Shopping Cart:");
        let items = users[userIndex].shoppingCart.items
        let totalCost = users[userIndex].shoppingCart.totalCost
        if (!checkItemsAvailability(items)) {
            alert("there are no products in the shopping cart yet!")
        }
        else {
            // Prepare the message to display the items and total cost in the shopping cart
            let availabeItems = ""
            for (let item of items) {
                availabeItems += `There is ${item.requiredQuantity} ${item.product.name} with total price ${item.requiredQuantity * item.product.price}
`
            }
            availabeItems += `The total cost in of the products in the shopping cart is ${totalCost}`
            alert(availabeItems)}
        }

    // calculateTotalCost() {
    //     this.totalCost = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    // }

    // applyDiscount(discount) {
    //     this.totalCost -= discount;
    // }

}
// promptAdminActions();
// promptUserActions()
// getUsersFromLocalStorage();
// createUserAccount();
// viewAccountDetailsUser() ;
// deleteUser();
// addProductToCart();
// removeItemFromCart();
// updateQuantityInCart();
// promptLoginOrSignup();