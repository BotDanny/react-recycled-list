import { Switch, Route } from 'react-router-dom'
import React from 'react'
import './root.css'
import SideNav, { components, examples, introductions } from './SideNav'

const App = () => {
  return (
    <div className='root-content'>
      <SideNav />
      <main>
        <Switch>
          {examples.map(({ route, component }) => {
            const Page = component as any
            return (
              <Route path={route} exact>
                <Page />
              </Route>
            )
          })}
          {introductions.map(({ route, component }) => {
            const Page = component as any
            return (
              <Route path={route} exact>
                <Page />
              </Route>
            )
          })}
          {components.map(({ route, component }) => {
            const Page = component as any
            return (
              <Route path={route} exact>
                <Page />
              </Route>
            )
          })}
        </Switch>
      </main>
    </div>
  )
}

export default App
