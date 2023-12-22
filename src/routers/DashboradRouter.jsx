import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { AccountScreen } from '../components/account/AccountScreen'
import { DashboardScreen } from '../components/dashboard/DashboardScreen'
import { FilesScreen } from '../components/files/FilesScreen'
import { Footer } from '../components/ui/Footer'
import { Header } from '../components/ui/Header'
import { Sidebar } from '../components/ui/Sidebar'
import { AdminClientsScreen } from '../components/files/AdminClientsScreen'
import { ProjectsScreen } from '../components/projects/ProjectsScreen'
import { Project } from '../components/projects/Project'
import { Client } from '../components/files/Client'

export const DashboradRouter = () => {

    const {open} = useSelector(state => state.ui);
    const user = useSelector(state => state.auth);

    return (
        <div className="dashboard__container">
            <Header />
            <Sidebar />
            <div className={open ? 'main__container open' : 'main__container'}>
                <Routes>
                    <Route path='*' element={<Navigate to='/' />} />

                    {
                        user.role === 'admin' 
                        && 
                            <>
                            <Route path='/representantes' element={<AdminClientsScreen/>}  />
                            <Route end path='/representante/:clientID' element={<Client/>} />
                            </>
                    }
                    <Route path='/formularios' element={<ProjectsScreen/>}  />
                    <Route end path='/cliente/:projectID' element={<Project/>} />
                    <Route path='/files' element={<FilesScreen/>}  />
                    <Route path='/account' element={<AccountScreen/>}  />
                    <Route end path='/' element={<DashboardScreen/>}  />
                    <Route path='/:clientID' element={<DashboardScreen/>}  />

                </Routes>
            </div>
            <Footer />
        </div>            
    )
}
