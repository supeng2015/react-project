class App extends React.Component{
  render(){
    return (
      <div onClick={(e)=>alert(33)}>这里是组件</div>
    )	
  }
}
const Bpp = () => (
  <ul>
    <li>这里是常量定义</li>
  </ul>
)
window.sp = {}
window.sp.App = App
window.sp.Bpp = Bpp