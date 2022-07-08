import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore'
import { AuthService } from './auth.service';
import { IncomingExpenses } from '../models/incomingexpenses.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
    
export class IncomingExpensesService {

    constructor(
        private firestore: AngularFirestore,
        private authService: AuthService,
    ) { }

    createIncomingExpense(incomingExpense: IncomingExpenses) { 

        delete incomingExpense.id;
        return this.firestore.doc(`${this.authService.user.uid}/incoming-expenses`)
            .collection('items')
            .add({ ...incomingExpense })
    }

    initIncomingExpensesListener(uid: string) {
         return this.firestore.collection(`${uid}/incoming-expenses/items`)
            .snapshotChanges()
            .pipe(
                map(snapshot => {
                    return snapshot.map(doc => (
                        {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data() as IncomingExpenses
                        }
                    ))
                })
                
            )

    }

    deleteIncomingExpense(id: string) { 
        return this.firestore.doc(`${this.authService.user.uid}/incoming-expenses/items/${id}`).delete();
    }

    
}