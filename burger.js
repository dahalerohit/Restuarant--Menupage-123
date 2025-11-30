
const menuURL = "https://storage.googleapis.com/acciojob-open-file-collections/appsmith-uploads/bb3807e9b0bc49958d39563eb1759406.json";


async function getMenu() {
    try {
        const res = await fetch(menuURL);
        if (!res.ok) throw new Error("Failed to fetch menu JSON");

        const data = await res.json();

       
        const randomItems = getRandomItems(data, 3);

        displayMenu(randomItems);

        return randomItems;

    } catch (error) {
        console.error("Menu loading error:", error);
        return [];
    }
}


function displayMenu(items) {
    const menuBox = document.getElementById("Menu-img");
    if (!menuBox) return;

    menuBox.innerHTML = ""; 

    items.forEach(item => {
        const img = document.createElement("img");

   
        img.src = item.image || item.imgSrc || "";
        img.alt = item.name || "Food Item";
        img.className = "burger-food";

        menuBox.appendChild(img);
    });
}


function getRandomItems(arr, count) {
    const copy = [...arr];
    const selected = [];

    while (selected.length < count && copy.length > 0) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        selected.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }
    return selected;
}


function takeOrder(menuItems = []) {
    return new Promise((resolve, reject) => {
        if (!menuItems.length) return reject("No menu items available to take order!");

        setTimeout(() => {
            const order = {
                items: getRandomItems(menuItems, 3)
            };
            console.log("Order Received:", order);
            resolve(order);
        }, 2500);
    });
}


function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}


function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}


function thankyouFnc() {
    alert("Thank you for eating with us today!");
}


async function startProcess() {
    try {
        console.log("Fetching menu...");
        const menu = await getMenu();

        if (!menu.length) throw new Error("No menu items loaded. Cannot take order.");

        console.log("Taking order...");
        const order = await takeOrder(menu);

        console.log("Preparing order...");
        const prepStatus = await orderPrep();
        console.log("Order prepared:", prepStatus);

        console.log("Processing payment...");
        const payment = await payOrder();
        console.log("Payment status:", payment);

        if (payment.paid) {
            thankyouFnc();
        }

    } catch (error) {
        console.error("Error during order process:", error);
    }
}


window.onload = startProcess;
