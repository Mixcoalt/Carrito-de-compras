/// variables 

const carrito = document.querySelector('#carrito')
const contenidoCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []


cargarEventListener()

function cargarEventListener (){
    //Cuando agregas un curso presionado "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = []
        limpiarHTML()
    })
}

//funciones

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado)
    }
    
}

//Elimina un curso del carrito
function eliminarCurso(e){
   if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id')

    //elimina el elemento por data id 
    articulosCarrito = articulosCarrito.filter(curso =>{
        return curso.id !== cursoId
    })
    carritoHtml()
   }
}




// Lee y extrae el contenido del html presionando click
function leerDatosCursos(curso){
    //console.log(curso)
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        nombreCurso : curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        //Actualizamos el carrito
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    //console.log(infoCurso)
    //Agrega elementos al arreglo de carrito de compras

    carritoHtml()
}

//Muestra el carrito de compras en el html

function carritoHtml(){

    //limpiar el html
    limpiarHTML()
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const {imagen, nombreCurso, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${nombreCurso}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

        //Agrega el html del carrito en el tbody
        contenidoCarrito.appendChild(row)
    })
}

//elinmina los cursos del tbody

function limpiarHTML(){
    //FORMA LENTA
   //contenidoCarrito.innerHTML = '';
   while(contenidoCarrito.firstChild){
    contenidoCarrito.removeChild(contenidoCarrito.firstChild)
   }
}