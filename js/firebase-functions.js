import { collection, query, getDocs, getFirestore,addDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { app } from "/js/firebase.js"

var notas ="";
const db = getFirestore(app);
const getAllNoteFire = async () => {
    const q = query(collection(db, "notas"));

    const querySnapshot = await getDocs(q);
    notas = document.getElementById('txtNote');
    
    querySnapshot.forEach((doc) => {
        
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        notas.innerHTML+=`

        <div class="card mt-2">
        <div class="card-body">
          <div class="row">
            
            <div class="col text-truncate">
            ${doc.data().text}
            </div>
          </div>
        </div>
      </div>
      `;
        
    });

};

const createNoteFire = async (note) => {
    try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "notas"), note);
        return docRef.id;
    } catch (error) {
        return 'no-create';
    }

}

export {
    getAllNoteFire, createNoteFire
}