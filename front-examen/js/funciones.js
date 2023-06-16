const urlcolegio = 'http://localhost:8085/api/colegios' 
 
const listarColegios = async() => {
    let body = document.getElementById('contenidoApi')
    if(body){
        let mensaje = ''
        fetch(urlcolegio)
        .then(res => res.json() )
        .then(function (data) {
            let listarColegios = data.colegios
            listarColegios.map((colegio) => {
                mensaje +=  `<td> ${colegio.direccion}</td>` +
                            `<td> ${colegio.latitud}</td>` +
                            `<td> ${colegio.longitud}</td>` +
                            `<td> ${colegio.fechaReporte}</td>` +
                            `<td> ${colegio.descripcion}</td>` +
                            `<td><a href="editarcolegio.html?${colegio._id}" onclick='editarColegio(${JSON.stringify(colegio)})'><i class="material-icons">border_color</i></a>
                                 <a class="btn-floating btn-large pulse" onclick='eliminarColegio("${colegio._id}")'><i class="material-icons">delete</i></a>
                            </td></tr>`
                            body.innerHTML = mensaje
            })
        })
    }
}

listarColegios()

const registrarColegios = async() => {
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    // let fechaReporte = document.getElementById('fechaReporte').value
    let descripcion = document.getElementById('descripcion').value

    let colegio = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        // fechaReporte: fechaReporte,
        descripcion: descripcion
    }

    fetch(urlcolegio, {
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify(colegio),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json() )
    .then(json => {
        alert(json.mensaje)
    })
}

const editarColegio = async() => {

    const queryString = window.location.search;

    const idcolegio = queryString.substring(1, queryString.length)

    const colegios = await fetch(urlcolegio)

    const data = await colegios.json()

    const editarRegistro = data.colegios.filter(colegio => colegio._id == idcolegio)

    const colegio = editarRegistro[0]
    
    document.getElementById('_id').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('fechaReporte').value = ''
    document.getElementById('descripcion').value = ''

    document.getElementById('_id').value = colegio._id
    document.getElementById('direccion').value = colegio.direccion
    document.getElementById('latitud').value = colegio.latitud
    document.getElementById('longitud').value = colegio.longitud
    document.getElementById('fechaReporte').value = colegio.fechaReporte
    document.getElementById('descripcion').value = colegio.descripcion
}

const actualizarColegio = async() => {

    let direccion = document.getElementById('direccion').value 
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value 
    let fechaReporte = document.getElementById('fechaReporte').value 
    let descripcion = document.getElementById('descripcion').value 

    let colegio = {
        _id: document.getElementById('_id').value,
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        fechaReporte: fechaReporte,
        descripcion: descripcion
    }
    fetch(urlcolegio, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(colegio),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json() )
    .then(json => {
        alert(json.mensaje)
    })
}

const eliminarColegio = (_id) => {
    if(confirm('¿Está seguro de eliminar este registro?') == true){
        let colegio = {
            _id: _id
        }
        fetch(urlcolegio, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(colegio),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json() )
        .then(json => {
            alert(json.mensaje)
        })
    }
}

if(document.querySelector('#btn-crearCole')) 
    {
        document.querySelector('#btn-crearCole')
        .addEventListener('click', registrarColegios)
    }

if(document.querySelector('#btn-actualizarCole')) 
    {
        document.querySelector('#btn-actualizarCole')
        .addEventListener('click', actualizarColegio )
    }    

const editarRegistro = document.querySelector('#editarRegistro')

editarRegistro?.addEventListener('load', editarColegio())
