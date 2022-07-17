import React,{useState} from 'react'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
import Header from '../common/Header'
import { SideBar } from '../Buyer/BuyerMenu'
function SupplierDashboard(props:any) {
    const {systemsRedirect}=props
    const [displayComponent, setDisplayComponent] = useState('Dashboard')
    return (!props.displaySystem ?
      <Rounter>
        <SideBar selectcomponent={setDisplayComponent}  systemsRedirect={systemsRedirect}/>
        <div className="main-content">
          <Header title={displayComponent}/>
          
          <main>
            <Switch>
              <Route exact path="/manageBid">
                <></>
              </Route>
              <Route exact path="/managePassword">
              <></>
              </Route>              
            </Switch>
          </main>
        </div>
        </Rounter>:<></>
    )
}

export default SupplierDashboard