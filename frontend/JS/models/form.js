//Création d'une classe pour le fonctionnement du formulaire
export class FormService {
    constructor() {}
//Création de la fonction pour récupérer et traiter les infos du formulaire au click de la validation de commande
displayForm() {
    const sendFormBtn = document.querySelector(".order__button");
    sendFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
    //Variable pour définir les données à récupérer dans le formulaire
    let formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
//Création de variables contenant des règles RegEx pour respecter les critères du formulaire, et d'un message d'erreur si ce n'est pas le cas
    const formError = (value) => {
        return `${value}: Veuillez respecter les critères du formulaire`
    };

    const regexNameAndCity = (value) => {
        return /^[a-zA-Z\-]+$/.test(value);
    };

    const regexAddress = (value) => {
        return /^([0-9]*) ?([a-zA-Z,\. ]*)$/.test(value);
    };

    const regexEmail = (value) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    };

    function firstNameCheck(formData) {
        const firstNameValidation = formData.firstName;
        if (regexNameAndCity(firstNameValidation)) {
            return true;
        } else {
            alert(formError("Prénom"));
            return false;
        };
    }


    function lastNameCheck(formData) {
        const lastNameValidation = formData.lastName;
        if (regexNameAndCity(lastNameValidation)) {
            return true;
        } else {
            alert(formError("Nom"));
            return false;
        };
    }

    function addressCheck(formData) {
        const addressValidation = formData.address;
        if (regexAddress(addressValidation)) {
            return true;
        } else {
            alert(formError("Adresse"));
            return false;
        };
    }

    function cityCheck(formData) {
        const cityValidation = formData.city;
        if (regexNameAndCity(cityValidation)) {
            return true;
        } else {
            alert(formError("Ville"));
            return false;
        };
    }

    function emailCheck(formData) {
        const emailValidation = formData.email;
        if (regexEmail(emailValidation)) {
            return true;
        } else {
            alert(formError("Email"));
            return false;
        };
    }
    if (firstNameCheck(formData) && lastNameCheck(formData) && addressCheck(formData) && cityCheck(formData) && emailCheck(formData)) {
        localStorage.setItem("formData", JSON.stringify(formData));
        } else {
        return false;
        }

    function sendOrder() {
        const LOCAL_STORAGE_KEY = "object";
        let localStorageObject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        const DataToSend = {
            products: localStorageObject.map((object) => object.id),
            contact: formData
        }

        const POST = fetch("http://localhost:3000/api/furniture/order", {
            method: "POST",
            body: JSON.stringify(DataToSend),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const localStorageFinalPrice = JSON.parse(localStorage.getItem("finalPrice"));
            window.location.href = "confirmation.html?orderId=" + data.orderId;
            if (localStorageObject == 0) {
                window.location.href = "panier.html";
            }
        })
        .catch(function(error) {
            alert(error);
        })
    }
    sendOrder();
})
}
}