import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileI } from '../models/file.interface';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  private filePath: string;


  constructor(private afAuth: AngularFireAuth, private storage: 
    AngularFireStorage) { 
    this.userData$ = afAuth.authState;
    }

    registerUser(user:UserI) {
      const { email, password } = user;
      return new Promise ((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => resolve(userData),
        err => reject(err));
      });
    }
    getuser(){
      var user=this.afAuth.auth.currentUser;
      return user;
    }

    loginByEmail(user:UserI) {
    const { email, password } = user;
    return new Promise ((resolve, reject) =>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }
  preSaveUserProfile(user: UserI, image?: FileI): void{
    if(image){
      this.uploadImage(user, image);
    }else{
        this.saveUserProfile(user);
      }
  }

  private uploadImage(user: UserI, image: FileI): void{
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(()=> {
        fileRef.getDownloadURL().subscribe( urlImage=>{
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      })
      ).subscribe();
  }

  private saveUserProfile(user: UserI){
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
    .then( ()=> console.log('User updated'))
    .catch(err => console.log('Error', err));
    
  }
}
