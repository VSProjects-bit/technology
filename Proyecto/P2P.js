function generarNumeroSeguimiento() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    const numeros = '0123456789';   
    let numeroSeguimiento = '';

    for (let i = 0; i < 7; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        numeroSeguimiento += caracteres.charAt(aleatorio); 
    }

    for (let i = 0; i < 4; i++) {
        const aleatorio = Math.floor(Math.random() * numeros.length);
        numeroSeguimiento += numeros.charAt(aleatorio); 
    }

    return numeroSeguimiento;
}

function mostrarRetiros() {
    let telefono = localStorage.getItem("telefono");
    if (!telefono) {
        alert("No se encontró un teléfono válido. Inicia sesión.");
        window.location.href = "index.html";
        return;
    }

    let retirosRealizados = JSON.parse(localStorage.getItem("retirosRealizados_" + telefono)) || [];
    let listaRetiros = document.getElementById("retirosList");
    listaRetiros.innerHTML = '';

    if (retirosRealizados.length === 0) {
        listaRetiros.innerHTML = "<p>No has realizado retiros aún.</p>";
    } else {
        retirosRealizados.forEach(function(retiro, index) {
            if (!retiro.numeroSeguimiento) {
                retiro.numeroSeguimiento = generarNumeroSeguimiento();
            }
            
            let item = document.createElement("div");
            item.classList.add("retiro-item");

            let info = document.createElement("div");
            info.classList.add("info");
            info.innerHTML = `Monto: Mex$${retiro.monto.toFixed(2)}<br>Fecha: ${retiro.fecha}<br><strong>Número de seguimiento:</strong> ${retiro.numeroSeguimiento}`;

            let estado = document.createElement("div");
            estado.classList.add("estado");
            
            switch(retiro.estado) {
                case "Confirmado":
                    estado.style.backgroundColor = "#28a745";
                    estado.innerText = "✔";
                    break;
                case "En proceso":
                    estado.style.backgroundColor = "#6c757d";
                    estado.innerText = "⏳";
                    break;
                case "Rechazado":
                    estado.style.backgroundColor = "#dc3545";
                    estado.innerText = "✖";
                    break;
            }

            item.appendChild(info);
            item.appendChild(estado);
            listaRetiros.appendChild(item);
        });
        
        // Guardar cambios en localStorage para evitar duplicados en la actualización
        localStorage.setItem("retirosRealizados_" + telefono, JSON.stringify(retirosRealizados));
    }
}

document.addEventListener("DOMContentLoaded", mostrarRetiros);
