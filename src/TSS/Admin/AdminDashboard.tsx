import React,{useState} from 'react'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
import Header from '../common/Header'
import { SideBar } from './AdminMenu'
import Supplier from '../Supplier/Supplier'
import UserListComponent from '../../User/UserListComponent'
import UserComponent from '../../User/UserComponent'
import RecommendationList from '../recommendation/RecommendationList'
import Product from './Product/Product'
function AdminDashboard(props:any) {
    const {systemsRedirect}=props
    const [displayComponent, setDisplayComponent] = useState('Dashboard')
    return (!props.displaySystem ?
      <Rounter>
        <SideBar selectcomponent={setDisplayComponent}  systemsRedirect={systemsRedirect}/>
        <div className="main-content">
          <Header title={displayComponent} />
          
          <main>
            <Switch>
              <Route exact path="/userManagement">
                <UserListComponent {...props}/>
              </Route>
              <Route exact path="/useredit">
                <UserComponent {...props}/>
              </Route>
              <Route exact path="/supplierManagement">
                <Supplier/>
              </Route>
              <Route exact path="/productMangement">
                <Product {...props}/>
              </Route>
              <Route exact path="/bidderManagement">
              <></>
              </Route>
              <Route exact path="/supplierBuyerMapping">
              <></>
              </Route>
              
            </Switch>
          </main>
        </div>
        </Rounter>:<></>
    )
}

export default AdminDashboard