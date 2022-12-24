import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // import auth from firebase
  constructor(private auth: Auth) {}

  // login method
  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  // login with google method
  loginGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // logout using auth
  logOut() {
    return this.auth.signOut();
  }

  // register
  register(newUser: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      newUser.email,
      newUser.password
    );
  }
}
