import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { login } from '../actions/authActions'
import { startLoadFiles } from '../actions/filesActions'
import { ActionEmailScreen } from '../components/auth/ActionEmailScreen'
import { Loading } from '../components/ui/Loading'
import { AuthRouter } from './AuthRouter'
import { DashboradRouter } from './DashboradRouter'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'
import { Route, Routes } from 'react-router'
import axios from "axios";
import { startLoadClients } from '../actions/clientsActions'
import { startLoadProjects } from '../actions/projectsActions'
import { SearchScreen } from '../components/auth/SearchScreen'

const _baseUrlRealTime = 'https://bera-fadiku-ref-default-rtdb.firebaseio.com/';


export const AppRouter = () => {

    const [cheking, setCheking] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                const roleData = await axios.get(
                    `${_baseUrlRealTime}/users-data/${user.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`
                );
                let role = 'user';
                if(roleData.data !== null) {
                    for (const [, value] of Object.entries(roleData.data)) {
                        role = value.role;
                    }
                }
                dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified, role));

                dispatch(startLoadFiles());
                dispatch(startLoadProjects(user.uid));

                if(role === 'admin') {
                    dispatch(startLoadClients());
                }

            }
            setCheking(false);
        });

    }, [dispatch]);

    if(cheking) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Routes>


                <Route path='/auth/action' element={<ActionEmailScreen />} />
                <Route path='/buscar' element={<SearchScreen/>} />
                <Route path='/auth/*' element={
                    <PublicRouter>
                        <AuthRouter />
                    </PublicRouter>
                } />

                <Route path='/*' element={
                    <PrivateRouter>
                        <DashboradRouter />
                    </PrivateRouter>
                } />

                
            </Routes>
        </BrowserRouter>
    )
}
