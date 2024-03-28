



const headerPage = document.getElementById('headerProduct');
if(userRole === 'admin'){
   headerPage.className = "d-flex justify-content-center bg-danger flex-column";

};

function updateNumber(value, id) {
   const numberInput = document.getElementById(`quantity${id}`);
   const currentNumber = parseInt(numberInput.value, 10) || 0;
   let newNumber = currentNumber + value;


   newNumber = Math.max(newNumber, 1);

   numberInput.value = newNumber;
}


async function addCart(id, title) {

   try {
      const numberInput = document.getElementById(`quantity${id}`);
      const quantity = parseInt(numberInput.value, 10);

      const addProduct = await fetch(`http://localhost:8080/api/carts/65a06fc45629c9a8fe35066a/product/${id}`, {
         body: JSON.stringify({
            quantity: quantity
         }),
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         }

      });

      if (addProduct.status === 200) {
         const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
            }
         });
         Toast.fire({
            icon: "success",
            title: `${title} X${quantity} agregado al carrito`
         });
      } else {
         const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
               toast.onmouseenter = Swal.stopTimer;
               toast.onmouseleave = Swal.resumeTimer;
            }
         });
         Toast.fire({
            icon: "error",
            title: `${title} X${quantity} no se agrego`
         });
      }
   } catch (error) {
      console.error(error);
      const Toast = Swal.mixin({
         toast: true,
         position: "top-end",
         showConfirmButton: false,
         timer: 2000,
         didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
         }
      });
      Toast.fire({
         icon: "error",
         title: `${title} X${quantity} no se agrego`

      });
   }

}

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {

  const result = await fetch('http://localhost:8080/api/session//logout', {
      method: 'post',
      headers: {
         'Content-Type': 'application/json'
      }
   })

   const { redirect } = await result.json();
   window.location.href = redirect
});


