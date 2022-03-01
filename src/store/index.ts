import { createStore } from 'vuex';
import { auth, provider, signInWithPopup, db } from '../firebase/config';
import { useRouter } from 'vue-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
let router = useRouter()
export const store = createStore({
  state: {
    user: null,
    isReady: false,
    score: 0,
    load: false,
    name: '',
    email: '',
    scores: [],
    photo: 'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg',
  },

  actions: {

    async userData() {
      await setDoc(doc(db, "Users", store.state.email), {
        score: store.state.score,
        name: store.state.name,
        email: store.state.email
      });
    },
    async setScore() {
      store.state.load = true
      let mail = store.state.user.email
      await setDoc(doc(db, "Users", mail), {
        score: store.state.score
      }, { merge: true });
      store.state.load = false
    },


    async signup(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit('setUser', res.user);
        store.state.email = email
        store.state.score = 0
        console.log(store.state.user)
        store.dispatch(`userData`)
      } else {
        throw new Error('Could not complete request');
      }
    },

    async signin(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit('setUser', res.user);
        store.state.email = email
        const docRef = doc(db, "Users", `${email}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          store.state.name = docSnap.data().name
        } else {
          console.log("No such document!");
        }

        setTimeout(() => {
          store.dispatch(`userData`)
        }, 2000);

      } else {
        throw new Error('Could not complete request');
      }
    },
    async googleSignIn() {
      await signInWithPopup(auth, provider)
        .then(async (result: any) => {
          const user = result.user;
          store.state.name = user.displayName
          store.state.email = user.email
          const docRef = doc(db, "Users", `${store.state.email}`);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            store.state.name = docSnap.data().name
          } else {
            console.log("No such document!");
          }
          console.log("user mail done")
        }
        ).catch((error: any) => {
          const errorCode = error.code;
          console.log(errorCode)
        });
    },



    async signOut(context) {
      await signOut(auth);
      context.commit('setUser', null);
    },
  },

  mutations: {
    plus(state, payload) {
      state.score += payload
    },
    less(state, payload) {
      if (state.score >= 1) {

        state.score -= payload
      }
    },
    reset(state, payload) {
      state.score = payload
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setAuth(state, payload) {
      state.isReady = payload;
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuth', true);
  store.commit('setUser', user);
  unsub();
});

