/*if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js');
}

function getAllNotes()

if(window.caches){
    console.log("Tienes soporte para Cache :D");
    caches.open('cache1'); //Crea un Cache
    caches.open('cache2');//Crea un Cache
    caches.open('cache3');//Crea un Cache

    caches.keys().then((keys)=>{ //Realiza un arreglo de los caché y los imprime
        console.log(keys) 
    })

    caches.has('cache2').then((resp)=>{ //busca un caché y arroja un TRUE si existe
        console.log('has',resp);
    })
    


    caches.delete('cache3') //Elimina un caché 
    
    caches.open('cache1').then((cache)=>{
        //cache.add('/index.html') //agregar un archivo html al caché
        //cache.add('/css/style.css') //agregar un archivo css al caché
        //cache.add('/js/app.js') //agregar un archivo js al caché

        //agregar Varios tipos de archivos en un array
        cache.addAll(
            [   
                '/index.html',
                '/css/style.css',
                '/js/app.js',
                '/images/desayuno3.jpg'
            ]
        ).then(()=>{
            cache.delete('/css/style.css');
        });

        cache.match('/index.html').then((resp)=>{
            resp.text().then((text)=>{
                console.log(text);
            })
        })
    })
}*/

import {getAllNoteFire, createNoteFire} from "/js/firebase-functions.js"
const getAllNote = ()=>{
    const txt = document.getElementById('txtNote')
    txt.innerHTML='';
    const generatedText = getAllNoteFire()
    const txtNote = document.getElementById('txtNote');
    
    
   
        
}

const saveNote = async ()=>{
    const nota = {
        text:'',
        create_at:new Date()
    }
    const txtNote = document.getElementById('note');
    nota.text = txtNote.value
    const generatedId = await createNoteFire(nota);
    if(generatedId !== 'no-create'){
        txtNote.value='';
        alert('Nota creada')
        getAllNote();
    }else{
        alert('Ocurrió un error')
    }
}

getAllNote()

//listeners
const btnSave = document.getElementById('btnSave');
btnSave.addEventListener('click', saveNote)



