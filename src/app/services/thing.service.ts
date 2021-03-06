import { Injectable } from '@angular/core';
import { Thing } from '../models/thing';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ThingService {

  things: Observable<any[]>;
  thingsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.thingsRef = this.db.list('Things');
    this.things = this.thingsRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }

  addThing(thing: Thing) {
    return this.thingsRef.push(thing);
  }

  updateThing(key, update) {
    return this.db.object(`Things/${key}`).update(update);
  }

  getThing(key) {
    return this.db.object(`Things/${key}`).snapshotChanges().pipe(
      map(c => c.payload.val() === null ? null : { key: c.payload.key, ...c.payload.val() })
    );
  }

  removeThing(key) {
    return this.thingsRef.remove(key);
  }

  uploadImage(image, imageFilename) {
    return this.storage.upload(`images/things/${imageFilename}`, image);
  }

}
