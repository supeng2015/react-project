import React from 'react'
import Header from '../common/Header'
let lbl = [];
let rbl = [];
let t = '阅读'
const Read=()=>(
	<section>
	  <Header leftBottonList={lbl} rightBottonList text={t}/>
    <ul>这里是Read</ul>
  </section>
)
export default Read