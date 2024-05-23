
async function deleteUser(email) {

    Swal.fire({
        title: `Esta seguro que quiere eliminar el usuario ${email}?`,
        text: "El usuario eliminado no se podra recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar!"
    }).then(async (result) => {
        if (result.isConfirmed) {

            const deleted = await fetch(`http://localhost:8080/api/users/deleteUser/${email}`, { method: 'DELETE' });;
            console.log(deleted);

            if (deleted.status === 200) {

                Swal.fire({
                    title: "Borrado!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    timer: 2000
                });

                location.reload();
            } else {
                Swal.fire(
                    'Error!',
                    'Error al borrar usuario',
                    'error'
                );
            }

        }
    });

};

async function ChangeOfRole(email, role) {

    console.log('role', role)
    const { value: newRole } = await Swal.fire({
        title: "Seleccione nuevo role",
        input: "select",
        cancelButtonColor: "#d33",
        inputOptions: {
            usuario: "usuario",
            premium: "premium",
            admin: "admin"
        },
        inputPlaceholder: `${role}`,
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value) {
                    resolve();
                } else {
                    resolve("You need to select a role");
                }
            });
        }
    });
    if (newRole) {
        Swal.fire(`Seleccionaste: ${newRole}`);
    
        try {
            const response = await fetch(`http://localhost:8080/api/users/updateRole/${email}/${newRole}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, role: newRole })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                Swal.fire('Success', result.message, 'success');
                location.reload();
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            Swal.fire('Error', 'Could not update role', 'error');
        }
    }
};

