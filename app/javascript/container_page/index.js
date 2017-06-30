import React from 'react'
import {main as ContainerPage} from './components/page'

document.addEventListener('DOMContentLoaded', () => {
  ContainerPage.initialize()
})

document.addEventListener('turbolinks:before-render', () => {
  ContainerPage.uninitialize()
})

document.addEventListener('turbolinks:render', () => {
  ContainerPage.initialize()
})
