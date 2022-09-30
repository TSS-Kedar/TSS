import React,{useState} from 'react'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
import Header from '../common/Header'
import { SideBar } from './AdminMenu'
import Supplier from './Supplier/Supplier'
import SupplierList from '../Admin/Supplier/SupplierList'
import UserListComponent from '../../User/UserListComponent'
import UserComponent from '../../User/UserComponent'
import Product from './Product/Product'
import ProductList from './Product/ProductList'
import RequirementList from './Product/RequirementList'
import {handleSignoutUsernameJWT,checkCurrentUsernameJWT,ActionToDispatch,ActionToRedirect} from '../../TSS/Redux/reducers/actions'
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
                <SupplierList {...props}/>
              </Route>
              <Route exact path="/supplieredit">
                <Supplier {...props}/>
              </Route>
              <Route exact path="/productManagement">
                <ProductList {...props}/>
              </Route>
              <Route exact path="/productedit">
                <Product {...props}/>
              </Route>
              <Route exact path="/requirementManagement">
                <RequirementList {...props}/>
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