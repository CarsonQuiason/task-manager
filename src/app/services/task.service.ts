import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/tasks';

  tutorialsRef: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Task> {
    return this.tutorialsRef;
  }

  create(tutorial: Task): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
