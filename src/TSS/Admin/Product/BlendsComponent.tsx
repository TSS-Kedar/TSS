import React from 'react'
import { connect } from 'react-redux'
import Composition from './common/Compositiontype'
import Difference from './common/Difference'
import Percentage from './common/Percentage'
import Tolerance from './common/Tolerance'

export const BlendsComponent = ({currdoc,modifydoc}:any) => {
  return (
    <div className="grid">
      <div className="row">
        <Composition currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Composition 1"} section="composition1"/>
        <Percentage  currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Percentage 1"} section="percentage1"/>
        <div className={"col-3"}></div>        
        <div className={"col-3"}></div>
      </div>
      <div className="row">
      <Composition currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Composition 2"} section="composition2"/>
        <Percentage  currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Percentage 2"} section="percentage2"/>
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
      <div className="row">
      <Tolerance currdoc={currdoc} modifydoc={modifydoc} wd={3}/>
      <Difference currdoc={currdoc} modifydoc={modifydoc} wd={3}/>
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BlendsComponent)