import { atom } from "recoil";
import {DocumentData} from 'firebase/firestore'
import {Movie} from '../pages/typing'


export const modalState = atom({
    key: 'modalState',
    default: false
})

export const movieState = atom<Movie | DocumentData| null>({
    key: 'movieState',
    default: null
})