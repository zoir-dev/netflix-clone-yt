import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, } from '../pages/firebase';
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router';


interface AuthProviderProps {
    children: React.ReactNode
}
interface IAuth {
    user: User | null,
    SignUp: (email: string, password: string) => Promise<void>
    SignIn: (email: string, password: string) => Promise<void>
    LogOut: () => Promise<void>
    error: string | null,
    loading: boolean
}
const AuthContext = createContext<IAuth>({
    user: null,
    SignUp: async () => { },
    SignIn: async () => { },
    LogOut: async () => { },
    error: null,
    loading: false
})
export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [intitialLoading, setInitialLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const SignUp = async (email: string, password: string) => {
        setLoading(true)
        await auth.createUserWithEmailAndPassword(email, password)
            .then((user: any) => {
                setUser(user)
                console.log(user);
                router.push('/')
                setLoading(false)
            }).catch(error => console.log(error.message)).finally(() => setLoading(false));

    }
    const SignIn = async (email: string, password: string) => {
        setLoading(true)
        await auth.signInWithEmailAndPassword(email, password)
            .then((user: any) => {
                setUser(user)
                console.log(user);
                router.push('/')
                setLoading(false)
            }).catch(error => console.log(error.message)).finally(() => setLoading(false));

    }
    const LogOut = async () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null)
        }).catch(error => console.log(error.message)).finally(() => setLoading(false));

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(true)
                router.push('/login')
            }
            setInitialLoading(false)
        })
    }, [auth])
    const memoedValue = useMemo(() => ({
        user, SignUp, SignIn, LogOut, loading, error
    }), [user, loading])
    return <AuthContext.Provider value={memoedValue}>{!intitialLoading && children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}