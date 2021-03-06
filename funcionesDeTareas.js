let tareas = require("./app-tareas/tareas.json")
let fs = require("fs"); // Requiero el módulo File System.
let guardarJSON = (datos) => fs.writeFileSync("./app-tareas/tareas.json", JSON.stringify(datos,null, 4), "utf-8"); // Necesario para guargar nuevos objetos en mi arreglo.

module.exports = {
    listar: tareas,
    listarTareas:() => {
        tareas.forEach((tarea, i) => {
            console.log(`Posición ${i}. Tarea ${i + 1}: ${tarea.titulo}`);
        })
    },
    mostrarTareas: () => { // Función para mostras las tareas y su estado.
        tareas.forEach((tarea, i) => {
            console.log("------------------------------------------------")
            console.log(`Tarea ${i + 1}: ${tarea.titulo} \nEstado: ${tarea.estado}`);
        })
        console.log("------------------------------------------------")
    },
    categorizarTareas : () => {
        tareas.forEach((tarea, i) =>  {
            console.log(`Tarea:${i+1} - "${tarea.titulo}" está clasificada como "${tarea.categoria}"`); 
        })
    },
    filtrarPorEstado: (estado) => { // Función para mostrar las tareas que tengan un estado específico.
        let tareasFiltradas = tareas.filter(filtrar => filtrar.estado.toLowerCase() === estado.toLowerCase());
        if (tareasFiltradas[0] === undefined) {
            console.log(`Actualmente no tienes tareas en estado "${estado}"`)
        };
        tareasFiltradas.forEach((tarea, i) => {
            return console.log(`${i + 1}. ${tarea.titulo} --> ${tarea.estado}.`)
        });
    },
    filtrarPorCategoria: (categoria) => { // Función para mostrar las tareas que tengan un estado específico.
        let categoriasFiltradas = tareas.filter(filtrar => filtrar.categoria.toLowerCase() === categoria.toLowerCase());
        if (categoriasFiltradas[0] === undefined) {
            console.log(`Actualmente no tienes tareas con categoría "${categoria}"`)
        };
        categoriasFiltradas.forEach((tarea, i) => {
            return console.log(`${i + 1}. ${tarea.titulo} --> ${tarea.estado}.`)
        });
    },
    modificarTarea: (indice, titulo, estado, categoria) => {
        let tareaAnterior = tareas[indice].titulo;
        for (let i = 0; i < tareas.length; i++) {
            if (Number(indice) === i) {
                tareas[i].titulo = titulo;
                tareas[i].estado = estado;
                tareas[i].categoria = categoria;
            } 
        }
        guardarJSON(tareas);
        return console.log(`La tarea ${tareaAnterior} ha sido actualizada como Título: ${titulo} Estado: ${estado} Categoría: ${categoria}`);
    },
    cambiarEstado: (i, estadoNuevo) => {
        if(tareas[i].estado){
            tareas[i].estado = estadoNuevo;
        }
        guardarJSON(tareas);
        return (`\n[La tarea "${tareas[i].titulo}" ha cambiado su estado a "${estadoNuevo}"]`)
    },
    cambiarTitulo: (i, tituloNuevo) => {
        let titAnterior = tareas[i].titulo;
        if (tareas[i].titulo) {
            tareas[i].titulo = tituloNuevo;
        }
        guardarJSON(tareas);
        return (`\n[La tarea con título "${titAnterior}" ha cambiado su título a "${tituloNuevo}"]`)
    },
    cambiarCategoria: (i, categoriaNueva) => {
        let catAnterior = tareas[i].categoria;
        if (tareas[i].categoria) {
            tareas[i].categoria = categoriaNueva;
        }
        guardarJSON(tareas);
        return (`\n[La tarea con título "${tareas[i].titulo}" ha cambiado su categoría "${catAnterior}" por una nueva llamada "${categoriaNueva}"]`)
    },
    agregarTarea: (titulo, estado) => { // Función para agregar una nueva tarea.
        let nuevaTarea = { // Definición de la tarea y su estado.
            titulo,
            estado
        }
        tareas.push(nuevaTarea); // Coloco la nueva tarea creada al final del arreglo.
        guardarJSON(tareas); // Actualizo el archivo .json con la nueva tarea.
        return tareas;
    },
    borrarTarea: (posicion, cant) => {  //indexOf - releer
        tareas.splice(posicion, 1) // Método de array para borrar una tarea específica.
        guardarJSON(tareas)
    },
    borrarPrimerTarea: () => {
        tareas.shift() // Método de array para borrar la primer tarea.
        guardarJSON(tareas)
    },
    borrarUltimaTarea: () => {
        tareas.pop() // Método de array para borrar última tarea.
        guardarJSON(tareas)
    }
}